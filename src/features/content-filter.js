import {
    BLOCK_ACTION_ITEM_CLASS,
    BLOCKED_ITEM_CLASS,
    BLOCKED_REVEALED_CLASS
} from '../shared/constants.js';
import {
    buildSearchFilterBlockReasons,
    buildTopicBlockReasons,
    softHideElement,
    unhideElement
} from '../core/filtering.js';
import { getSearchResultText, parseSearchFilterRule } from '../core/search-query.js';

export function createContentFilterFeature({ store, runtime, page, profile, searchFilter, blockControls }) {
    function createPageRun({ bumpToken = false } = {}) {
        const pageKey = page.getCurrentPageKey();
        const pageChanged = runtime.currentPageKey !== pageKey;

        if (pageChanged) {
            runtime.currentPageKey = pageKey;
            if (runtime.debounceTimer) {
                clearTimeout(runtime.debounceTimer);
                runtime.debounceTimer = null;
            }
        }

        if (pageChanged || bumpToken || runtime.startToken === 0) {
            runtime.startToken += 1;
        }

        return { token: runtime.startToken, pageKey };
    }

    function isPageRunCurrent(run) {
        return Boolean(
            run &&
            runtime.startToken === run.token &&
            runtime.currentPageKey === run.pageKey &&
            page.getCurrentPageKey() === run.pageKey
        );
    }

    function applyBlockedState(element, shouldBlock, reasons = []) {
        if (!element) return false;

        if (!shouldBlock) {
            element.classList.remove(BLOCKED_ITEM_CLASS, BLOCKED_REVEALED_CLASS, BLOCK_ACTION_ITEM_CLASS);
            unhideElement(element);
            blockControls.setBlockReasons(element, []);
            return false;
        }

        element.classList.add(BLOCKED_ITEM_CLASS, BLOCK_ACTION_ITEM_CLASS);
        blockControls.setBlockReasons(element, reasons);

        if (blockControls.isRevealBlockedResults()) {
            element.classList.add(BLOCKED_REVEALED_CLASS);
            unhideElement(element);
        } else {
            element.classList.remove(BLOCKED_REVEALED_CLASS);
            softHideElement(element);
            blockControls.hideFloatingButtonIfItemMatches(element);
        }

        return true;
    }

    function getItemData(item) {
        if (typeof profile?.getItemData === 'function') {
            return profile.getItemData(item);
        }
        return {
            titleText: '',
            categoryText: '',
            tagList: []
        };
    }

    function filterContentItems() {
        const settings = store.getSnapshot();
        const items = typeof profile?.getContentItems === 'function'
            ? profile.getContentItems(document)
            : Array.from(document.querySelectorAll('tr.topic-list-item'));
        let blockedCount = 0;

        items.forEach((item) => {
            const itemData = getItemData(item);

            const reasons = buildTopicBlockReasons({
                settings,
                categoryText: itemData.categoryText || '',
                tagList: Array.isArray(itemData.tagList) ? itemData.tagList : [],
                titleText: itemData.titleText || ''
            });

            if (applyBlockedState(item, reasons.length > 0, reasons)) {
                blockedCount += 1;
            }
            blockControls.ensureBlockActionButton(item);
        });

        blockControls.updateBlockToggleUI(blockedCount);
    }

    function filterSearchResults() {
        const searchTerm = searchFilter.getCurrentSearchTerm();
        const parsed = parseSearchFilterRule(store.getSearchFilterRule(searchTerm));
        const hasSearchFilter = (
            parsed.blacklistArray.length > 0 ||
            parsed.whitelistArray.length > 0 ||
            parsed.regexArray.length > 0
        );

        const results = typeof profile?.getSearchItems === 'function'
            ? profile.getSearchItems(document)
            : Array.from(document.querySelectorAll('.fps-result'));
        let blockedCount = 0;

        results.forEach((result) => {
            let reasons = [];
            if (profile?.features?.searchUsesContentRules) {
                const itemData = getItemData(result);
                reasons = buildTopicBlockReasons({
                    settings: store.getSnapshot(),
                    categoryText: itemData.categoryText || '',
                    tagList: Array.isArray(itemData.tagList) ? itemData.tagList : [],
                    titleText: itemData.titleText || ''
                });
            }
            if (hasSearchFilter) {
                const titleElement = typeof profile?.getSearchResultTitleElement === 'function'
                    ? profile.getSearchResultTitleElement(result)
                    : result.querySelector('.topic-title');
                const { raw, normalized } = getSearchResultText(result, titleElement);
                reasons = reasons.concat(buildSearchFilterBlockReasons(raw, normalized, parsed));
            }

            if (applyBlockedState(result, reasons.length > 0, reasons)) {
                blockedCount += 1;
            }
            blockControls.ensureBlockActionButton(result);
        });

        blockControls.updateBlockToggleUI(blockedCount);
    }

    function filterContent() {
        if (page.isSearchPage()) {
            searchFilter.ensureUI();
            searchFilter.syncSearchFilterUIForCurrentTerm();
            filterSearchResults();
            return;
        }

        searchFilter.removeUI();
        filterContentItems();
    }

    function disconnectDomObserver() {
        if (runtime.domObserver) {
            runtime.domObserver.disconnect();
            runtime.domObserver = null;
        }
        runtime.domObserverRoot = null;
    }

    function runFilterForCurrentPage(run, { refreshObserver = false } = {}) {
        if (!isPageRunCurrent(run)) return;

        filterContent();

        if (!isPageRunCurrent(run)) return;
        if (refreshObserver) {
            observeDomChanges();
        }
    }

    function ensureContentFilterHook() {
        if (typeof window.triggerContentFilter !== 'function') {
            window.triggerContentFilter = () => {
                const run = createPageRun();
                runFilterForCurrentPage(run);
            };
        }
    }

    function resetAndReapplyFilter() {
        const items = typeof profile?.getAllFilterItems === 'function'
            ? profile.getAllFilterItems(document)
            : Array.from(document.querySelectorAll('tr.topic-list-item, .fps-result'));
        items.forEach((item) => {
            unhideElement(item);
        });

        const run = createPageRun();
        runFilterForCurrentPage(run);
    }

    function debounceFilter() {
        if (runtime.debounceTimer) {
            clearTimeout(runtime.debounceTimer);
        }

        const run = createPageRun();
        runtime.debounceTimer = setTimeout(() => {
            runtime.debounceTimer = null;
            runFilterForCurrentPage(run);
        }, 100);
    }

    function observeDomChanges() {
        const mainContainer = page.getObserverRoot();
        if (!mainContainer) {
            disconnectDomObserver();
            return;
        }

        if (runtime.domObserver && runtime.domObserverRoot === mainContainer) {
            return;
        }

        disconnectDomObserver();

        runtime.domObserver = new MutationObserver((mutations) => {
            const hasSignificantChange = mutations.some(
                (mutation) => mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0
            );
            if (hasSignificantChange) {
                debounceFilter();
            }
        });
        runtime.domObserverRoot = mainContainer;

        runtime.domObserver.observe(mainContainer, {
            childList: true,
            subtree: true
        });
    }

    function start() {
        ensureContentFilterHook();
        const run = createPageRun({ bumpToken: true });
        runFilterForCurrentPage(run, { refreshObserver: true });
    }

    return {
        filterContent,
        filterSearchResults,
        resetAndReapplyFilter,
        start
    };
}
