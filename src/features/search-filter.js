import { getCurrentSearchTerm } from '../core/search-query.js';
import { SEARCH_FILTER_STYLE_ID } from '../shared/constants.js';
import { ensureStyle } from '../platform/styles.js';
import {
    adjustTextareaHeight,
    createSearchFilterWrapper,
    formatSearchFilterDisplayValue,
    getSearchFilterFieldElements,
    getSearchFilterRuleValues,
    getSearchFilterWrapper,
    setupSearchFilterToggle
} from './search-filter-dom.js';
import { createSearchFilterEditManagers } from './search-filter-editors.js';
import { SEARCH_FILTER_CSS } from './search-filter-styles.js';

export function resolveSearchFilterSaveContext({
    explicitSearchTerm = '',
    editingSearchTerm = '',
    currentSearchTerm = ''
} = {}) {
    const normalizedExplicitSearchTerm = String(explicitSearchTerm || '').trim();
    const normalizedEditingSearchTerm = String(editingSearchTerm || '').trim();
    const normalizedCurrentSearchTerm = String(currentSearchTerm || '').trim();
    const searchTerm = normalizedExplicitSearchTerm || normalizedEditingSearchTerm || normalizedCurrentSearchTerm;

    return {
        searchTerm,
        shouldTriggerFilter: Boolean(searchTerm) && searchTerm === normalizedCurrentSearchTerm
    };
}

export function createSearchFilterFeature({ store, runtime, page }) {
    let onFilterRequested = () => {};
    const editManagers = [];

    function setOnFilterRequested(callback) {
        onFilterRequested = typeof callback === 'function' ? callback : () => {};
    }

    function hasOpenEditors() {
        return editManagers.some((manager) => manager.isEditing());
    }

    function clearEditingTermIfIdle() {
        if (!hasOpenEditors()) {
            runtime.searchFilterEditingTerm = null;
        }
    }

    function persistSearchFilterRule(searchTerm, values, { triggerFilter = true } = {}) {
        const normalizedSearchTerm = String(searchTerm || '').trim();
        if (!normalizedSearchTerm) return false;

        store.setSearchFilterRule(normalizedSearchTerm, {
            blacklist: values?.blacklist || '',
            whitelist: values?.whitelist || '',
            regex: values?.regex || ''
        });
        runtime.lastSyncedSearchTerm = null;

        if (triggerFilter) {
            onFilterRequested();
        }

        return true;
    }

    function saveCurrentSearchFilterRule({ explicitSearchTerm = '' } = {}) {
        const wrapper = getSearchFilterWrapper();
        if (!wrapper) return false;

        const currentSearchTerm = getCurrentSearchTerm();
        const { searchTerm, shouldTriggerFilter } = resolveSearchFilterSaveContext({
            explicitSearchTerm,
            editingSearchTerm: runtime.searchFilterEditingTerm,
            currentSearchTerm
        });
        if (!searchTerm) return false;

        return persistSearchFilterRule(searchTerm, getSearchFilterRuleValues(wrapper), {
            triggerFilter: shouldTriggerFilter
        });
    }

    function closeAllEditModes({ save = false } = {}) {
        editManagers.forEach((manager) => {
            manager.exitEditMode(save);
        });
    }

    function syncSearchFilterUIForCurrentTerm() {
        const wrapper = getSearchFilterWrapper();
        if (!wrapper) return;

        const searchTerm = getCurrentSearchTerm();
        const uiSearchTerm = runtime.searchFilterEditingTerm || runtime.lastSyncedSearchTerm;
        if (uiSearchTerm && searchTerm === uiSearchTerm) return;

        if (hasOpenEditors()) {
            const pendingSearchTerm = runtime.searchFilterEditingTerm || runtime.lastSyncedSearchTerm;
            if (pendingSearchTerm && pendingSearchTerm !== searchTerm) {
                saveCurrentSearchFilterRule({ explicitSearchTerm: pendingSearchTerm });
            }
            closeAllEditModes({ save: false });
        } else if (searchTerm === runtime.lastSyncedSearchTerm) {
            return;
        }

        const keywords = store.getSearchFilterRule(searchTerm);
        const {
            blacklistDisplay,
            blacklistInput,
            whitelistDisplay,
            whitelistInput,
            regexDisplay,
            regexInput
        } = getSearchFilterFieldElements(wrapper);

        if (blacklistDisplay) {
            blacklistDisplay.textContent = formatSearchFilterDisplayValue(keywords.blacklist || '');
            blacklistDisplay.title = keywords.blacklist || '';
        }
        if (blacklistInput) {
            blacklistInput.value = keywords.blacklist || '';
            adjustTextareaHeight(blacklistInput);
        }

        if (whitelistDisplay) {
            whitelistDisplay.textContent = formatSearchFilterDisplayValue(keywords.whitelist || '');
            whitelistDisplay.title = keywords.whitelist || '';
        }
        if (whitelistInput) {
            whitelistInput.value = keywords.whitelist || '';
            adjustTextareaHeight(whitelistInput);
        }

        if (regexDisplay) {
            regexDisplay.textContent = formatSearchFilterDisplayValue(keywords.regex || '');
            regexDisplay.title = keywords.regex || '';
        }
        if (regexInput) {
            regexInput.value = keywords.regex || '';
            adjustTextareaHeight(regexInput);
        }

        runtime.lastSyncedSearchTerm = searchTerm;
        runtime.searchFilterEditingTerm = null;
    }

    function setupSearchFilterUIInteractions(wrapper) {
        editManagers.length = 0;
        editManagers.push(...createSearchFilterEditManagers({
            wrapper,
            runtime,
            getCurrentSearchTerm,
            saveCurrentSearchFilterRule,
            clearEditingTermIfIdle
        }));
    }

    function ensureUI() {
        if (!page.isSearchPage()) return false;
        if (getSearchFilterWrapper()) return true;

        ensureStyle(SEARCH_FILTER_STYLE_ID, SEARCH_FILTER_CSS);

        const searchTerm = getCurrentSearchTerm();
        const savedKeywords = store.getSearchFilterRule(searchTerm);
        const wrapper = createSearchFilterWrapper(savedKeywords);

        document.body.appendChild(wrapper);
        setupSearchFilterUIInteractions(wrapper);
        setupSearchFilterToggle(wrapper);
        runtime.lastSyncedSearchTerm = null;
        syncSearchFilterUIForCurrentTerm();
        return true;
    }

    function removeUI() {
        const wrapper = getSearchFilterWrapper();
        if (wrapper && typeof wrapper._linuxdoSearchFilterCleanup === 'function') {
            wrapper._linuxdoSearchFilterCleanup();
        }
        closeAllEditModes({ save: false });
        if (wrapper) wrapper.remove();
        editManagers.length = 0;
        runtime.lastSyncedSearchTerm = null;
        runtime.searchFilterEditingTerm = null;
    }

    function invalidateSync() {
        runtime.lastSyncedSearchTerm = null;
    }

    return {
        ensureUI,
        removeUI,
        syncSearchFilterUIForCurrentTerm,
        invalidateSync,
        getCurrentSearchTerm,
        setOnFilterRequested
    };
}
