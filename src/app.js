import { createPageService } from './platform/page.js';
import { createUserscriptApi } from './platform/gm.js';
import { createNotifier } from './platform/notifier.js';
import { createContentFilterFeature } from './features/content-filter.js';
import { createBlockControlsFeature } from './features/block-controls.js';
import { createSearchFilterFeature } from './features/search-filter.js';
import { createSettingsDialogFeature } from './features/settings-dialog.js';
import { createRuntimeState } from './state/runtime-state.js';
import { createSettingsStore } from './state/settings-store.js';

const HISTORY_NAVIGATION_EVENT = 'content-blocker:navigation';
const HISTORY_NAVIGATION_PATCH_FLAG = '__contentBlockerHistoryNavigationPatched';

function patchHistoryNavigation() {
    const historyObject = globalThis.history;
    const windowObject = globalThis.window;
    if (!historyObject || !windowObject || globalThis[HISTORY_NAVIGATION_PATCH_FLAG]) return;

    ['pushState', 'replaceState'].forEach((methodName) => {
        const originalMethod = historyObject[methodName];
        if (typeof originalMethod !== 'function') return;

        historyObject[methodName] = function patchedHistoryMethod(...args) {
            const result = originalMethod.apply(this, args);
            windowObject.dispatchEvent(new Event(HISTORY_NAVIGATION_EVENT));
            return result;
        };
    });

    globalThis[HISTORY_NAVIGATION_PATCH_FLAG] = true;
}

export function bootContentBlocker(profile) {
    const gm = createUserscriptApi(globalThis);
    const runtime = createRuntimeState();
    const store = createSettingsStore(gm, { storageKeys: profile.storageKeys });
    store.load();

    const notifier = createNotifier();
    const page = createPageService({ runtime, store, profile });
    const searchFilter = createSearchFilterFeature({ store, runtime, page });
    const blockControls = createBlockControlsFeature({
        store,
        runtime,
        notifier,
        profile,
        isSearchPage: () => page.isSearchPage(),
        getCurrentSearchTerm: () => searchFilter.getCurrentSearchTerm()
    });
    const settingsDialog = createSettingsDialogFeature({ store, runtime, notifier, profile });
    const contentFilter = createContentFilterFeature({
        store,
        runtime,
        page,
        profile,
        searchFilter,
        blockControls
    });

    const onPersistentSettingsChanged = ({ refreshDialog = true } = {}) => {
        searchFilter.invalidateSync();
        if (refreshDialog) {
            settingsDialog.refreshIfOpen();
        }
        contentFilter.resetAndReapplyFilter();
    };

    searchFilter.setOnFilterRequested(() => {
        contentFilter.filterSearchResults();
    });

    blockControls.setCallbacks({
        onFilterRequested: () => {
            contentFilter.filterContent();
        },
        onSettingsChanged: onPersistentSettingsChanged
    });

    settingsDialog.setCallbacks({
        onSettingsChanged: onPersistentSettingsChanged
    });

    function init() {
        contentFilter.start();
    }

    function scheduleInit() {
        const run = () => {
            init();
        };

        if (typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(() => {
                window.setTimeout(run, 0);
            });
            return;
        }

        window.setTimeout(run, 0);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    patchHistoryNavigation();

    window.addEventListener(HISTORY_NAVIGATION_EVENT, scheduleInit);
    window.addEventListener('popstate', scheduleInit);
    window.addEventListener('pageshow', scheduleInit);

    const menuFlag = profile.menuRegisteredFlag || '__contentBlockerMenuRegistered';
    if (!globalThis[menuFlag]) {
        gm.registerMenuCommand(profile.labels?.settingsTitle || '⚙️ 屏蔽设置', settingsDialog.show);
        globalThis[menuFlag] = true;
    }
}
