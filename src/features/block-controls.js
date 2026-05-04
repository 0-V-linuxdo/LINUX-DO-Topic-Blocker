import {
    BLOCK_ACTION_REASON_DATA,
    BLOCK_ACTION_STYLE_ID
} from '../shared/constants.js';
import { ensureStyle } from '../platform/styles.js';
import { BLOCK_ACTION_CSS } from './block-control-styles.js';
import { createBlockActionButtonController } from './block-action-button.js';
import { createBlockDialogs } from './block-dialogs.js';
import { createBlockToggleController } from './block-toggle.js';

export function createBlockControlsFeature({ store, runtime, notifier, profile, isSearchPage, getCurrentSearchTerm }) {
    const callbacks = {
        onFilterRequested: () => {},
        onSettingsChanged: () => {}
    };

    const profileLabels = profile?.labels || {};
    const getLabel = (key, fallback) => profileLabels[key] || fallback;
    const getDialogLabel = (key, fallback) => `${getLabel(key, fallback)}：`;

    function setCallbacks(nextCallbacks = {}) {
        if (typeof nextCallbacks.onFilterRequested === 'function') {
            callbacks.onFilterRequested = nextCallbacks.onFilterRequested;
        }
        if (typeof nextCallbacks.onSettingsChanged === 'function') {
            callbacks.onSettingsChanged = nextCallbacks.onSettingsChanged;
        }
    }

    function ensureBlockActionStyles() {
        ensureStyle(BLOCK_ACTION_STYLE_ID, BLOCK_ACTION_CSS);
    }

    function setBlockReasons(element, reasons) {
        if (!element) return;
        if (Array.isArray(reasons) && reasons.length > 0) {
            element.dataset[BLOCK_ACTION_REASON_DATA] = JSON.stringify(reasons);
        } else {
            delete element.dataset[BLOCK_ACTION_REASON_DATA];
        }
    }

    function getBlockReasonsFromElement(element) {
        if (!element) return [];
        const raw = element.dataset[BLOCK_ACTION_REASON_DATA];
        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('解析屏蔽原因失败:', error);
            return [];
        }
    }

    function getBlockActionHost(item) {
        if (!item) return null;
        if (typeof profile?.getBlockActionHost === 'function') {
            return profile.getBlockActionHost(item);
        }
        if (item.tagName === 'TR') {
            return item.querySelector('td.main-link') || item.querySelector('td') || null;
        }
        return item;
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

    function getTopicTitleFromItem(item) {
        if (!item) return '';
        const itemData = getItemData(item);
        if (itemData.titleText) return itemData.titleText;
        const titleElement = item.querySelector('a.title, a.topic-title, .topic-title, a.raw-topic-link');
        if (!titleElement) return '';
        return (titleElement.getAttribute('title') || titleElement.textContent || '').trim();
    }

    function getCategoryTextFromItem(item) {
        if (!item) return '';
        const itemData = getItemData(item);
        if (itemData.categoryText) return itemData.categoryText;
        const categoryElement = item.querySelector(
            'div.link-bottom-line a.badge-category__wrapper span.badge-category__name, a.badge-category__wrapper span.badge-category__name, span.badge-category__name'
        );
        return categoryElement?.textContent?.trim() || '';
    }

    function getTagListFromItem(item) {
        if (!item) return [];
        const itemData = getItemData(item);
        if (Array.isArray(itemData.tagList) && itemData.tagList.length > 0) {
            return itemData.tagList;
        }

        const tagNodes = item.querySelectorAll('.discourse-tags a, a.discourse-tag, .tag-name');
        const tags = [];
        const seen = new Set();

        tagNodes.forEach((node) => {
            const tagText = (node.getAttribute('data-tag-name') || node.textContent || '').trim();
            if (tagText && !seen.has(tagText)) {
                seen.add(tagText);
                tags.push(tagText);
            }
        });

        return tags;
    }

    function getTagTextFromItem(item) {
        return getTagListFromItem(item)[0] || '';
    }

    function getBlockTargetForItem(item) {
        if (!item) return null;

        const isSearchContext = Boolean(
            item.classList?.contains('fps-result') ||
            (typeof isSearchPage === 'function' && isSearchPage())
        );

        if (isSearchContext) {
            const titleText = getTopicTitleFromItem(item);
            if (!titleText) {
                const tagText = getTagTextFromItem(item);
                if (tagText) return { kind: 'tag_keyword', value: tagText };
                return null;
            }

            const searchTerm = getCurrentSearchTerm();
            if (!searchTerm) return null;
            return { kind: 'search_blacklist', value: titleText, searchTerm };
        }

        const titleText = getTopicTitleFromItem(item);
        if (titleText) return { kind: 'title_keyword', value: titleText };

        const categoryText = getCategoryTextFromItem(item);
        if (categoryText) return { kind: 'category_keyword', value: categoryText };

        const tagText = getTagTextFromItem(item);
        if (tagText) return { kind: 'tag_keyword', value: tagText };

        return null;
    }

    function notifySettingsChanged() {
        callbacks.onSettingsChanged();
    }

    function applyBlockTarget(target) {
        if (!target || !target.kind) return false;

        const value = typeof target.value === 'string' ? target.value.trim() : '';
        if (!value) return false;

        let changed = false;
        store.mutate((draft) => {
            switch (target.kind) {
                case 'title_keyword': {
                    const lowerValue = value.toLowerCase();
                    const exists = draft.blockedTitles.some((item) => String(item).toLowerCase() === lowerValue);
                    if (!exists) {
                        draft.blockedTitles.push(value);
                        changed = true;
                    }
                    break;
                }
                case 'category_keyword':
                    if (!draft.blockedCategories.includes(value)) {
                        draft.blockedCategories.push(value);
                        changed = true;
                    }
                    break;
                case 'tag_keyword':
                    if (!draft.blockedTags.includes(value)) {
                        draft.blockedTags.push(value);
                        changed = true;
                    }
                    break;
                case 'search_blacklist': {
                    const searchTerm = typeof target.searchTerm === 'string' ? target.searchTerm.trim() : getCurrentSearchTerm();
                    if (!searchTerm) break;
                    const current = draft.searchFilterMap[searchTerm] || { blacklist: '', whitelist: '', regex: '' };
                    const blacklistArray = current.blacklist
                        ? current.blacklist.split(',').map((item) => item.trim()).filter(Boolean)
                        : [];
                    const lowerSet = new Set(blacklistArray.map((item) => item.toLowerCase()));
                    if (!lowerSet.has(value.toLowerCase())) {
                        blacklistArray.push(value);
                        draft.searchFilterMap[searchTerm] = {
                            blacklist: blacklistArray.join(', '),
                            whitelist: current.whitelist || '',
                            regex: current.regex || ''
                        };
                        changed = true;
                    }
                    break;
                }
                default:
                    break;
            }
        });

        if (changed) {
            notifySettingsChanged();
        }

        return changed;
    }

    function applyUnblockFromReasons(reasons) {
        const reasonList = Array.isArray(reasons) ? reasons : [];
        if (reasonList.length === 0) return false;

        const removeTitleKeywords = new Set();
        const removeCategoryKeywords = new Set();
        const removeTagKeywords = new Set();
        const removeTitleRegex = new Set();
        const removeCategoryRegex = new Set();
        const removeTagRegex = new Set();
        const removeSearchBlacklist = new Set();
        const removeSearchRegex = new Set();
        let clearSearchWhitelist = false;

        reasonList.forEach((reason) => {
            if (!reason || !reason.kind) return;
            switch (reason.kind) {
                case 'title_keyword':
                    if (reason.value) removeTitleKeywords.add(reason.value);
                    break;
                case 'category_keyword':
                    if (reason.value) removeCategoryKeywords.add(reason.value);
                    break;
                case 'tag_keyword':
                    if (reason.value) removeTagKeywords.add(reason.value);
                    break;
                case 'title_regex':
                    if (reason.pattern) removeTitleRegex.add(reason.pattern);
                    break;
                case 'category_regex':
                    if (reason.pattern) removeCategoryRegex.add(reason.pattern);
                    break;
                case 'tag_regex':
                    if (reason.pattern) removeTagRegex.add(reason.pattern);
                    break;
                case 'search_blacklist':
                    if (reason.value) removeSearchBlacklist.add(reason.value);
                    break;
                case 'search_regex':
                    if (reason.pattern) removeSearchRegex.add(reason.pattern);
                    break;
                case 'search_whitelist_missing':
                    clearSearchWhitelist = true;
                    break;
                default:
                    break;
            }
        });

        let changed = false;
        store.mutate((draft) => {
            if (removeTitleKeywords.size > 0) {
                const lowerSet = new Set(Array.from(removeTitleKeywords).map((item) => item.toLowerCase()));
                const nextTitles = draft.blockedTitles.filter((item) => !lowerSet.has(String(item).toLowerCase()));
                if (nextTitles.length !== draft.blockedTitles.length) {
                    draft.blockedTitles = nextTitles;
                    changed = true;
                }
            }

            if (removeCategoryKeywords.size > 0) {
                const nextCategories = draft.blockedCategories.filter((item) => !removeCategoryKeywords.has(item));
                if (nextCategories.length !== draft.blockedCategories.length) {
                    draft.blockedCategories = nextCategories;
                    changed = true;
                }
            }

            if (removeTagKeywords.size > 0) {
                const nextTags = draft.blockedTags.filter((item) => !removeTagKeywords.has(item));
                if (nextTags.length !== draft.blockedTags.length) {
                    draft.blockedTags = nextTags;
                    changed = true;
                }
            }

            if (removeTitleRegex.size > 0) {
                const nextEntries = draft.titleRegexList.filter((entry) => !removeTitleRegex.has(entry.pattern));
                if (nextEntries.length !== draft.titleRegexList.length) {
                    draft.titleRegexList = nextEntries;
                    changed = true;
                }
            }

            if (removeCategoryRegex.size > 0) {
                const nextEntries = draft.categoryRegexList.filter((entry) => !removeCategoryRegex.has(entry.pattern));
                if (nextEntries.length !== draft.categoryRegexList.length) {
                    draft.categoryRegexList = nextEntries;
                    changed = true;
                }
            }

            if (removeTagRegex.size > 0) {
                const nextEntries = draft.tagRegexList.filter((entry) => !removeTagRegex.has(entry.pattern));
                if (nextEntries.length !== draft.tagRegexList.length) {
                    draft.tagRegexList = nextEntries;
                    changed = true;
                }
            }

            if (removeSearchBlacklist.size > 0 || removeSearchRegex.size > 0 || clearSearchWhitelist) {
                const searchTerm = getCurrentSearchTerm();
                if (searchTerm) {
                    const current = draft.searchFilterMap[searchTerm] || { blacklist: '', whitelist: '', regex: '' };
                    const originalBlacklistArray = current.blacklist
                        ? current.blacklist.split(',').map((item) => item.trim()).filter(Boolean)
                        : [];
                    const originalRegexArray = current.regex
                        ? current.regex.split('\n').map((item) => item.trim()).filter(Boolean)
                        : [];

                    const blacklistLowerSet = new Set(Array.from(removeSearchBlacklist).map((item) => item.toLowerCase()));
                    const nextBlacklistArray = originalBlacklistArray.filter((item) => !blacklistLowerSet.has(item.toLowerCase()));
                    const regexSet = new Set(removeSearchRegex);
                    const nextRegexArray = originalRegexArray.filter((pattern) => !regexSet.has(pattern));
                    const nextWhitelist = clearSearchWhitelist ? '' : (current.whitelist || '').trim();
                    const nextRule = {
                        blacklist: nextBlacklistArray.join(', '),
                        whitelist: nextWhitelist,
                        regex: nextRegexArray.join('\n')
                    };

                    if (
                        nextRule.blacklist !== current.blacklist ||
                        nextRule.regex !== current.regex ||
                        nextRule.whitelist !== (current.whitelist || '').trim()
                    ) {
                        draft.searchFilterMap[searchTerm] = nextRule;
                        changed = true;
                    }
                }
            }
        });

        if (changed) {
            notifySettingsChanged();
        }

        return changed;
    }

    function isRevealBlockedResults() {
        return runtime.revealBlockedResults;
    }

    const blockToggle = createBlockToggleController({
        runtime,
        onFilterRequested: () => callbacks.onFilterRequested()
    });

    const blockDialogs = createBlockDialogs({
        runtime,
        notifier,
        profileLabels,
        getLabel,
        getDialogLabel,
        ensureBlockActionStyles,
        getTopicTitleFromItem,
        getCategoryTextFromItem,
        getTagListFromItem,
        applyBlockTarget,
        applyUnblockFromReasons
    });

    const blockActionButton = createBlockActionButtonController({
        runtime,
        store,
        profile,
        ensureBlockActionStyles,
        getBlockActionHost,
        getBlockReasonsFromElement,
        getBlockTargetForItem,
        showBlockedItemDialog: blockDialogs.showBlockedItemDialog,
        showBlockConfirmDialog: blockDialogs.showBlockConfirmDialog
    });

    return {
        setCallbacks,
        ensureBlockActionButton: blockActionButton.ensureBlockActionButton,
        updateBlockToggleUI: blockToggle.updateBlockToggleUI,
        setBlockReasons,
        getBlockReasonsFromElement,
        hideBlockActionButton: blockActionButton.hideBlockActionButton,
        hideFloatingButtonIfItemMatches: blockActionButton.hideFloatingButtonIfItemMatches,
        isRevealBlockedResults,
        closeBlockedItemDialog: blockDialogs.closeBlockedItemDialog
    };
}
