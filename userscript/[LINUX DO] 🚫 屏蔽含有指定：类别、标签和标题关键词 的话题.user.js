// ==UserScript==
// @name         [LINUX DO] 🚫 屏蔽含有指定：类别、标签和标题关键词 的话题 [20260119] v2.1.0
// @namespace    https://github.com/0-V-linuxdo/LINUX-DO-Topic-Blocker
// @description  功能：按标题/类别/标签关键词与正则在话题列表隐藏内容；搜索页提供屏蔽/必含/正则过滤器并按搜索词保存；悬浮屏蔽按钮与选择器/确认弹窗快速添加关键词；支持临时显示被屏蔽项、配置导入导出、即时生效。
//
// @version      [20260119] v2.1.0
// @update-log   [20260119] v2.1.0 屏蔽选择器优化标题关键词快速添加/取消、文案字号与对齐层级调整；确认弹窗精简为纯文本并在打开时隐藏底层弹窗。
//
// @match        https://linux.do/*
//
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
//
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGlnaHRTYWJlckdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjM2IwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNyIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM4YjAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM2IwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNyIvPgogICAgICA8L2xpbmVhckdyYWRpZW50PgoKICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJtZXRhbFRleHR1cmUiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMmMyYzJjIi8+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz4KICAgICAgPC9saW5lYXJHcmFkaWVudD4KCiAgICAgIDxmaWx0ZXIgaWQ9ImxpZ2h0c2FiZXJHbG93Ij4KICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiIC8+CiAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMSAwIDAgMCAwLjYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCAxIDAgMCAwCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgMCAxIDAgMAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDAgMCAwLjcgMCIvPgogICAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CgogIDxjbGlwUGF0aCBpZD0iYSI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNDciLz48L2NsaXBQYXRoPgogIDxjaXJjbGUgZmlsbD0iI2YwZjBmMCIgY3g9IjYwIiBjeT0iNjAiIHI9IjUwIi8+CiAgPHJlY3QgZmlsbD0iIzFjMWMxZSIgY2xpcC1wYXRoPSJ1cmwoI2EpIiB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiLz4KICA8cmVjdCBmaWxsPSIjZjBmMGYwIiBjbGlwLXBhdGg9InVybCgjYSkiIHg9IjEwIiB5PSI0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIvPgogIDxyZWN0IGZpbGw9IiNmZmIwMDMiIGNsaXAtcGF0aD0idXJsKCNhKSIgeD0iMTAiIHk9IjgwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIi8+CgogIDxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDYwIDYwKSI+CiAgICAgIDxnPgogICAgICAgICAgPHBhdGggCiAgICAgICAgICAgICAgZD0iTTU3LDE1IAogICAgICAgICAgICAgICBMNjMsMTUgCiAgICAgICAgICAgICAgIEw2MywzMCAKICAgICAgICAgICAgICAgUTYxLDMxIDU5LDMwIAogICAgICAgICAgICAgICBMNTcsMzAgWiIgCiAgICAgICAgICAgICAgZmlsbD0idXJsKCNtZXRhbFRleHR1cmUpIiAKICAgICAgICAgICAgICBzdHJva2U9IiMwMDAiIAogICAgICAgICAgICAgIHN0cm9rZS13aWR0aD0iMC41Ii8+CiAgICAgICAgICAKICAgICAgICAgIDxwYXRoIAogICAgICAgICAgICAgIGQ9Ik01Ni41LDE1LjUgTDU3LjUsMTUuNSBMNTcuNSwyOS41IEw1Ni41LDI5LjUgWiIgCiAgICAgICAgICAgICAgZmlsbD0iIzExMSIvPgogICAgICAgICAgPHBhdGggCiAgICAgICAgICAgICAgZD0iTTYzLjUsMTUuNSBMNjIuNSwxNS41IEw2Mi41LDI5LjUgTDYzLjUsMjkuNSBaIiAKICAgICAgICAgICAgICBmaWxsPSIjMTExIi8+CiAgICAgICAgICAKICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwIDIyKSI+CiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9IjAiIAogICAgICAgICAgICAgICAgICBjeT0iLTIiIAogICAgICAgICAgICAgICAgICByPSIxLjUiIAogICAgICAgICAgICAgICAgICBmaWxsPSIjMjIyIiAKICAgICAgICAgICAgICAgICAgc3Ryb2tlPSIjMDAwIiAKICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPSIwLjMiLz4KICAgICAgICAgICAgICAKICAgICAgICAgICAgICA8Y2lyY2xlIAogICAgICAgICAgICAgICAgICBjeD0iLTIiIAogICAgICAgICAgICAgICAgICBjeT0iMCIgCiAgICAgICAgICAgICAgICAgIHI9IjAuOCIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiMzMzMiLz4KICAgICAgICAgICAgICA8Y2lyY2xlIAogICAgICAgICAgICAgICAgICBjeD0iMiIgCiAgICAgICAgICAgICAgICAgIGN5PSIwIiAKICAgICAgICAgICAgICAgICAgcj0iMC44IiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzMzMyIvPgogICAgICAgICAgPC9nPgogICAgICAgICAgCiAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCAzMikiPgogICAgICAgICAgICAgIDxyZWN0IAogICAgICAgICAgICAgICAgICB4PSItMy41IiAKICAgICAgICAgICAgICAgICAgeT0iMCIgCiAgICAgICAgICAgICAgICAgIHdpZHRoPSI3IiAKICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIyIiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzFjMWMxYyIgCiAgICAgICAgICAgICAgICAgIHJ4PSIwLjUiIAogICAgICAgICAgICAgICAgICByeT0iMC41Ii8+CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9Ii0yIiAKICAgICAgICAgICAgICAgICAgY3k9IjEiIAogICAgICAgICAgICAgICAgICByPSIwLjUiIAogICAgICAgICAgICAgICAgICBmaWxsPSIjNDQ0Ii8+CiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9IjIiIAogICAgICAgICAgICAgICAgICBjeT0iMSIgCiAgICAgICAgICAgICAgICAgIHI9IjAuNSIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiM0NDQiLz4KICAgICAgICAgIDwvZz4KCiAgICAgICAgICA8Zz4KICAgICAgICAgICAgICA8cmVjdCAKICAgICAgICAgICAgICAgICAgeD0iNTkiIAogICAgICAgICAgICAgICAgICB5PSIxMyIgCiAgICAgICAgICAgICAgICAgIHdpZHRoPSIyIiAKICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIxIiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzExMSIgCiAgICAgICAgICAgICAgICAgIHJ4PSIwLjMiIAogICAgICAgICAgICAgICAgICByeT0iMC4zIi8+CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgPHJlY3QgCiAgICAgICAgICAgICAgICAgIHg9IjU5IiAKICAgICAgICAgICAgICAgICAgeT0iMzQiIAogICAgICAgICAgICAgICAgICB3aWR0aD0iMiIgCiAgICAgICAgICAgICAgICAgIGhlaWdodD0iMSIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiMyMjIiIAogICAgICAgICAgICAgICAgICByeD0iMC4zIiAKICAgICAgICAgICAgICAgICAgcnk9IjAuMyIvPgogICAgICAgICAgPC9nPgogICAgICA8L2c+CgogICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDM1KSI+CiAgICAgICAgICA8cGF0aCAKICAgICAgICAgICAgICBkPSJNNTUsMCBMNjUsMCBMNjUsNjUgTDU1LDY1IFoiIAogICAgICAgICAgICAgIGZpbGw9InVybCgjbGlnaHRTYWJlckdyYWRpZW50KSIgCiAgICAgICAgICAgICAgZmlsdGVyPSJ1cmwoI2xpZ2h0c2FiZXJHbG93KSI+CiAgICAgICAgICAgICAgPGFuaW1hdGUgCiAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU9ImQiIAogICAgICAgICAgICAgICAgICB2YWx1ZXM9Ik01NSwwIEw2NSwwIEw2NSw2NSBMNTUsNjUgWjsKICAgICAgICAgICAgICAgICAgICAgICAgICBNNTMsMCBMNjcsMCBMNjcsNjUgTDUzLDY1IFo7CiAgICAgICAgICAgICAgICAgICAgICAgICAgTTU1LDAgTDY1LDAgTDY1LDY1IEw1NSw2NSBaIiAKICAgICAgICAgICAgICAgICAgZHVyPSIycyIgCiAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICA8L3BhdGg+CiAgICAgIDwvZz4KICA8L2c+CgogIDxjaXJjbGUgCiAgICAgIGN4PSI2MCIgCiAgICAgIGN5PSI2MCIgCiAgICAgIHI9IjU1IiAKICAgICAgZmlsbD0ibm9uZSIgCiAgICAgIHN0cm9rZT0iI2ZmMDAwMCIgCiAgICAgIHN0cm9rZS13aWR0aD0iNiIgCiAgICAgIHN0cm9rZS1kYXNoYXJyYXk9IjE1IDEwIj4KICAgICAgPGFuaW1hdGUgCiAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgCiAgICAgICAgICB2YWx1ZXM9IjI1OzA7LTI1IiAKICAgICAgICAgIGR1cj0iMnMiIAogICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KPC9zdmc+
// ==/UserScript==

(function() {
    'use strict';

    // ================================
    // ========== 默认数据区 ==========
    // ================================

    // 默认屏蔽的类别、标签和标题关键词列表
    let blockedTitles = [];
    let blockedCategories = [];
    let blockedTtags = [];

    // 正则表达式存储
    let titleRegexList = [];
    let categoryRegexList = [];
    let tagRegexList = [];
    let titleRegexEntries = [];
    let categoryRegexEntries = [];
    let tagRegexEntries = [];
    let regexFloatingButton = null;
    let regexFloatingButtonDialog = null;
    let regexFloatingButtonResizeHandler = null;
    let savedBodyOverflow = null;
    let savedHtmlOverflow = null;
    let blockDialogEscapeHandler = null;
    let blockDialogSavedBodyOverflow = null;
    let blockDialogSavedHtmlOverflow = null;
    let blockDialogSelectedText = '';
    const regexSubcontentTypeMap = {
        'regex-titles': 'title',
        'regex-categories': 'category',
        'regex-ttags': 'tag'
    };
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // ================================
    // ========== 软隐藏关键逻辑 ========
    // ================================

    function softHideElement(elem) {
        if (!elem) return;

        // 如果是表格行：
        if (elem.tagName === 'TR') {
            if (isSafari) {
                // Safari 对 collapse 支持不稳定，改用绝对定位软隐藏
                elem.style.visibility = 'hidden';
                elem.style.position = 'absolute';
                elem.style.left = '-9999px';
            } else {
                elem.style.visibility = 'collapse';
            }
        } else {
            elem.style.display = 'none';
        }
    }

    function unhideElement(elem) {
        if (!elem) return;
        // 恢复样式
        if (elem.tagName === 'TR') {
            elem.style.visibility = '';
            if (isSafari) {
                elem.style.position = '';
                elem.style.left = '';
            }
        } else {
            elem.style.display = '';
        }
    }

    // ================================
    // ========== 搜索页可见过滤器 ======
    // ================================

    const SEARCH_FILTER_STORAGE_KEY = 'linux_do_search_filter_keywords_map';
    const SEARCH_FILTER_STYLE_ID = 'linux_do_search_filter_styles';
    const SEARCH_FILTER_WRAPPER_ID = 'linux_do_search_filter_wrapper';

    const SEARCH_FILTER_BLACKLIST_DISPLAY_ID = 'linux_do_search_filter_blacklist_display';
    const SEARCH_FILTER_BLACKLIST_INPUT_ID = 'linux_do_search_filter_blacklist_input';
    const SEARCH_FILTER_WHITELIST_DISPLAY_ID = 'linux_do_search_filter_whitelist_display';
    const SEARCH_FILTER_WHITELIST_INPUT_ID = 'linux_do_search_filter_whitelist_input';
    const SEARCH_FILTER_REGEX_DISPLAY_ID = 'linux_do_search_filter_regex_display';
    const SEARCH_FILTER_REGEX_INPUT_ID = 'linux_do_search_filter_regex_input';

    const BLOCK_TOGGLE_STYLE_ID = 'linux_do_block_toggle_styles';
    const BLOCK_TOGGLE_WRAPPER_ID = 'linux_do_block_toggle_wrapper';
    const BLOCK_TOGGLE_BUTTON_ID = 'linux_do_block_toggle_button';
    const BLOCK_TOGGLE_COUNT_ID = 'linux_do_block_toggle_count';

    const BLOCKED_ITEM_CLASS = 'linuxdo-blocked-item';
    const BLOCKED_REVEALED_CLASS = 'linuxdo-blocked-revealed';
    const BLOCK_ACTION_STYLE_ID = 'linuxdo_block_action_styles';
    const BLOCK_ACTION_ITEM_CLASS = 'linuxdo-block-item';
    const BLOCK_ACTION_BUTTON_CLASS = 'linuxdo-block-button';
    const BLOCK_ACTION_DIALOG_OVERLAY_ID = 'linuxdo_block_dialog_overlay';
    const BLOCK_ACTION_DIALOG_ID = 'linuxdo_block_dialog';
    const BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID = 'linuxdo_block_dialog_sub_overlay';
    const BLOCK_ACTION_SUB_DIALOG_ID = 'linuxdo_block_dialog_sub';
    const BLOCK_ACTION_REASON_DATA = 'linuxdoBlockReasons';
    const BLOCK_ACTION_VISIBLE_CLASS = 'is-visible';
    const BLOCK_ACTION_BUTTON_SIZE = 24;
    const BLOCK_ACTION_BUTTON_OFFSET_TOP = 8;
    const BLOCK_ACTION_BUTTON_OFFSET_RIGHT = 10;
    const SUMMARY_SCRIPT_ENABLED_KEY = 'linux_do_summary_script_enabled';

    let lastSyncedSearchTerm = null;
    let revealBlockedResults = false;
    let blockActionFloatingButton = null;
    let blockActionFloatingItem = null;
    let blockActionPositionRaf = null;
    const blockActionHoverBoundItems = new WeakSet();
    let summaryScriptEnabled = true;
    const SUMMARY_READY_TIMEOUT_MS = 2000;
    let summaryReadyWaiter = null;

    function isSearchPage() {
        return window.location.pathname.includes('/search');
    }

    function isListPage() {
        return /^https:\/\/linux\.do\/(latest|categories|unseen|bookmarks|c\/|tags\/|u\/|search|top)/.test(window.location.href);
    }

    function isSummaryUiPresent() {
        return Boolean(document.querySelector('.topic-summary-button') || document.getElementById('summary-sidebar'));
    }

    function waitForSummaryReady() {
        if (!summaryScriptEnabled || !isListPage()) {
            return Promise.resolve(false);
        }
        if (isSummaryUiPresent()) return Promise.resolve(true);
        if (summaryReadyWaiter) return summaryReadyWaiter.promise;

        let resolveWait = null;
        const promise = new Promise(resolve => {
            resolveWait = resolve;
        });

        const finish = (ready) => {
            if (!summaryReadyWaiter) return;
            if (summaryReadyWaiter.observer) summaryReadyWaiter.observer.disconnect();
            if (summaryReadyWaiter.timer) clearTimeout(summaryReadyWaiter.timer);
            summaryReadyWaiter = null;
            if (resolveWait) resolveWait(ready);
        };

        const root = document.body || document.documentElement;
        if (root) {
            const observer = new MutationObserver(() => {
                if (isSummaryUiPresent()) finish(true);
            });
            observer.observe(root, { childList: true, subtree: true });
            const timer = setTimeout(() => finish(false), SUMMARY_READY_TIMEOUT_MS);
            summaryReadyWaiter = { promise, observer, timer };
            if (isSummaryUiPresent()) finish(true);
        } else {
            const timer = setTimeout(() => finish(false), SUMMARY_READY_TIMEOUT_MS);
            summaryReadyWaiter = { promise, observer: null, timer };
        }

        return promise;
    }

    function getCurrentSearchQueryRaw() {
        const urlParams = new URLSearchParams(window.location.search);
        return (urlParams.get('q') || '').trim();
    }

    function tokenizeSearchQuery(query) {
        const tokens = [];
        let token = '';
        let inQuotes = false;
        let quoteChar = '';

        for (let i = 0; i < query.length; i++) {
            const ch = query[i];

            if (ch === '"' || ch === "'") {
                if (!inQuotes) {
                    inQuotes = true;
                    quoteChar = ch;
                    continue;
                }
                if (quoteChar === ch) {
                    inQuotes = false;
                    quoteChar = '';
                    continue;
                }
            }

            if (!inQuotes && /\s/.test(ch)) {
                if (token) {
                    tokens.push(token);
                    token = '';
                }
                continue;
            }

            token += ch;
        }

        if (token) tokens.push(token);
        return tokens;
    }

    function isSearchDirectiveToken(token) {
        if (!token) return false;
        const lower = token.toLowerCase();
        if (lower.startsWith('http://') || lower.startsWith('https://')) {
            return false;
        }
        return /^[a-z_]+:[^\s]+$/i.test(token);
    }

    function extractPrimarySearchTerm(rawQuery) {
        const query = (rawQuery || '').trim();
        if (!query) return '';

        const tokens = tokenizeSearchQuery(query);
        const keywordTokens = tokens.filter(t => !isSearchDirectiveToken(t));
        const keyword = keywordTokens.join(' ').trim();
        return keyword || query;
    }

    function getCurrentSearchTerm() {
        return extractPrimarySearchTerm(getCurrentSearchQueryRaw());
    }

    function getAllSearchFilterMappings() {
        try {
            const mappings = GM_getValue(SEARCH_FILTER_STORAGE_KEY, {});
            return typeof mappings === 'object' && mappings !== null ? mappings : {};
        } catch (e) {
            console.error('解析搜索页过滤器映射失败:', e);
            GM_setValue(SEARCH_FILTER_STORAGE_KEY, {});
            return {};
        }
    }

    function getSearchFilterKeywords(searchTerm) {
        const normalizedKey = (searchTerm || '').trim();
        if (!normalizedKey) return { blacklist: '', whitelist: '', regex: '' };
        try {
            const allMappings = getAllSearchFilterMappings();
            const keywords = allMappings[normalizedKey];

            if (typeof keywords === 'string') {
                return { blacklist: keywords, whitelist: '', regex: '' };
            }
            if (keywords && typeof keywords === 'object') {
                return {
                    blacklist: keywords.blacklist || '',
                    whitelist: keywords.whitelist || '',
                    regex: keywords.regex || ''
                };
            }
            return { blacklist: '', whitelist: '', regex: '' };
        } catch (e) {
            console.error('获取搜索页过滤关键词失败:', e);
            return { blacklist: '', whitelist: '', regex: '' };
        }
    }

    function saveSearchFilterKeywords(searchTerm, blacklist, whitelist, regex) {
        if (!searchTerm) return;
        try {
            const allMappings = getAllSearchFilterMappings();
            allMappings[searchTerm] = {
                blacklist: typeof blacklist === 'string' ? blacklist.trim() : '',
                whitelist: typeof whitelist === 'string' ? whitelist.trim() : '',
                regex: typeof regex === 'string' ? regex.trim() : ''
            };
            GM_setValue(SEARCH_FILTER_STORAGE_KEY, allMappings);
        } catch (e) {
            console.error('保存搜索页过滤关键词失败:', e);
        }
    }

    function createKeywordMatcher(keyword) {
        if (!keyword || typeof keyword !== 'string') {
            return null;
        }
        if (keyword.includes(' ')) {
            try {
                const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexPattern = escapedKeyword.replace(/\s+/g, '\\s+');
                return new RegExp(regexPattern, 'i');
            } catch (e) {
                console.warn('创建正则表达式失败，回退到字符串匹配:', keyword, e);
                return null;
            }
        }
        return null;
    }

    function matchesKeyword(text, keyword) {
        if (!text || !keyword) {
            return false;
        }
        const regex = createKeywordMatcher(keyword);
        if (regex) {
            return regex.test(text);
        }
        return text.includes(keyword);
    }

    function matchesRegex(text, regexPattern) {
        if (!text || !regexPattern) {
            return false;
        }
        try {
            const regex = new RegExp(regexPattern, 'i');
            return regex.test(text);
        } catch (e) {
            console.warn('正则表达式无效:', regexPattern, e);
            return false;
        }
    }

    function parseSearchFilterKeywords({ blacklist, whitelist, regex }) {
        const blacklistArray = blacklist
            ? blacklist.split(',').map(kw => kw.trim().toLowerCase()).filter(Boolean)
            : [];
        const whitelistArray = whitelist
            ? whitelist.split(',').map(kw => kw.trim().toLowerCase()).filter(Boolean)
            : [];
        const regexArray = regex
            ? regex.split('\n').map(r => r.trim()).filter(Boolean)
            : [];
        return { blacklistArray, whitelistArray, regexArray };
    }

    function getSearchResultText(result, titleElement) {
        if (titleElement) {
            const raw = `${titleElement.getAttribute('title') || ''} ${titleElement.textContent || ''}`.trim();
            return { raw, normalized: raw.toLowerCase() };
        }
        const fallback = (result?.textContent || '').trim();
        return { raw: fallback, normalized: fallback.toLowerCase() };
    }

    function adjustTextareaHeight(tex) {
        if (!tex) return;
        tex.style.height = 'auto';
        const scrollH = tex.scrollHeight;
        const minH = 28;
        const maxH = 150;
        const h = Math.min(Math.max(scrollH, minH), maxH);
        tex.style.height = h + 'px';
        tex.style.overflowY = scrollH > maxH ? 'auto' : 'hidden';
    }

    function adjustRegexTextareaHeight(tex) {
        if (!tex) return;
        tex.style.height = 'auto';
        const scrollH = tex.scrollHeight;
        const minH = 36;
        const h = Math.max(scrollH, minH);
        tex.style.height = h + 'px';
        tex.style.overflowY = 'hidden';
    }

    function setupTextareaScrollHandling(textarea) {
        if (!textarea) return;

        textarea.addEventListener('wheel', (e) => {
            const { scrollTop, scrollHeight, clientHeight } = textarea;
            const isScrollingUp = e.deltaY < 0;
            const isScrollingDown = e.deltaY > 0;

            const canScrollUp = scrollTop > 0;
            const canScrollDown = scrollTop < scrollHeight - clientHeight;

            if ((isScrollingUp && canScrollUp) || (isScrollingDown && canScrollDown)) {
                e.stopPropagation();
            }
        }, { passive: false });

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
                e.key === 'PageUp' || e.key === 'PageDown' ||
                e.key === 'Home' || e.key === 'End') {
                e.stopPropagation();
            }
        });

        textarea.addEventListener('focus', () => {
            if (textarea.scrollHeight > textarea.clientHeight) {
                textarea.style.overflowY = 'auto';
            }
        });
    }

    function appendCommaToTextareaIfNeeded(textarea, { force = false, appendText = ',' } = {}) {
        if (!textarea) return false;
        const value = typeof textarea.value === 'string' ? textarea.value : '';
        if (!value.trim()) return false;

        const valueTrimmedEnd = value.trimEnd();
        if (valueTrimmedEnd.endsWith(',')) return false;

        if (!force && typeof textarea.selectionStart === 'number' && typeof textarea.selectionEnd === 'number') {
            const isCollapsed = textarea.selectionStart === textarea.selectionEnd;
            const isAtEnd = textarea.selectionEnd === value.length;
            if (!isCollapsed || !isAtEnd) return false;
        }

        textarea.value = valueTrimmedEnd + appendText;
        const newLength = textarea.value.length;
        if (typeof textarea.setSelectionRange === 'function') {
            textarea.setSelectionRange(newLength, newLength);
        }
        textarea.scrollTop = textarea.scrollHeight;
        return true;
    }

    function ensureSearchFilterStyles() {
        if (document.getElementById(SEARCH_FILTER_STYLE_ID)) return;

        const styleElement = document.createElement('style');
        styleElement.id = SEARCH_FILTER_STYLE_ID;
        styleElement.textContent = `
            #${SEARCH_FILTER_WRAPPER_ID} {
              --linuxdo-filter-bg-color: #ffffff;
              --linuxdo-filter-font-color: #1f1f1f;
              --linuxdo-filter-border-color: rgba(0,0,0,.12);
              --linuxdo-filter-placeholder-color: rgba(0,0,0,0.4);
              --linuxdo-filter-label-hover-color: #333333;
              --linuxdo-filter-focus-bg-color: #faf9e4;
              --linuxdo-filter-fab-size: 42px;
              --linuxdo-filter-fab-bg-color: transparent;
              --linuxdo-filter-fab-border-color: transparent;
              --linuxdo-filter-fab-shadow: none;
              --linuxdo-filter-fab-ring-color: rgba(255,230,15,0.6);
              --linuxdo-filter-fab-icon-color: #d32f2f;
              --linuxdo-filter-fab-icon-size: 28px;

              position: fixed !important;
              top: 193px !important;
              right: 16px !important;
              z-index: 9997 !important;
              pointer-events: auto !important;
              width: var(--linuxdo-filter-fab-size);
              height: var(--linuxdo-filter-fab-size);
              display: block;
              padding: 0;
              box-sizing: border-box;
              overflow: visible;
            }
            @media (prefers-color-scheme: dark) {
              #${SEARCH_FILTER_WRAPPER_ID} {
                --linuxdo-filter-bg-color: #333333;
                --linuxdo-filter-font-color: #ffffff;
                --linuxdo-filter-border-color: rgba(255,255,255,0.12);
                --linuxdo-filter-placeholder-color: rgba(255,255,255,0.4);
                --linuxdo-filter-label-hover-color: #ffe60f;
                --linuxdo-filter-focus-bg-color: #444444;
                --linuxdo-filter-fab-bg-color: transparent;
                --linuxdo-filter-fab-border-color: transparent;
                --linuxdo-filter-fab-shadow: none;
                --linuxdo-filter-fab-ring-color: rgba(255,230,15,0.45);
                --linuxdo-filter-fab-icon-color: #ff6b6b;
              }
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-fab {
                width: var(--linuxdo-filter-fab-size);
                height: var(--linuxdo-filter-fab-size);
                border-radius: 999px;
                border: none;
                background: transparent;
                color: var(--linuxdo-filter-fab-icon-color);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: none;
                line-height: 1;
                cursor: pointer;
                user-select: none;
                padding: 0;
                appearance: none;
                -webkit-appearance: none;
                transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-fab svg {
                width: var(--linuxdo-filter-fab-icon-size);
                height: var(--linuxdo-filter-fab-icon-size);
                display: block;
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-fab:focus-visible {
                outline: 2px solid var(--linuxdo-filter-fab-ring-color);
                outline-offset: 2px;
            }
            #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-fab {
                opacity: 0;
                pointer-events: none;
                transform: scale(0.9);
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-display:empty::before {
                content: attr(data-placeholder);
                pointer-events: none;
                color: var(--linuxdo-filter-placeholder-color);
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-label {
                color: var(--linuxdo-filter-font-color);
                font-size: 13px;
                line-height: 28px;
                margin-right: 4px;
                cursor: pointer;
                user-select: none;
                transition: color 0.16s;
                flex-shrink: 0;
                font-weight: 500;
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-label:hover {
                color: var(--linuxdo-filter-label-hover-color);
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-display,
            #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
                border: 1px solid var(--linuxdo-filter-border-color);
                border-radius: 6px;
                box-sizing: border-box;
                font-size: 13px;
                font-family: inherit;
                color: var(--linuxdo-filter-font-color);
                padding: 6px 8px;
                width: 180px;
                background-color: var(--linuxdo-filter-bg-color);
                box-shadow: 0 2px 6px rgba(0,0,0,0.09);
                transition: background 0.16s, color 0.16s, border 0.16s;
                line-height: 1.3;
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-display {
                height: 28px;
                min-height: 28px;
                max-height: 28px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                outline: none;
                cursor: text;
                user-select: text;
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-display:focus-visible,
            #${SEARCH_FILTER_WRAPPER_ID} .filter-input:focus {
                border-color: #ffe60f !important;
                background: var(--linuxdo-filter-focus-bg-color);
                outline: none;
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
                display: none;
                min-height: 28px;
                max-height: 150px;
                height: 28px;
                vertical-align: top;
                outline: none;
                resize: none;
                overflow-y: auto;
                white-space: pre-wrap;
                word-break: break-all;
                scrollbar-width: thin;
                scrollbar-color: rgba(0,0,0,0.3) transparent;
            }
            @media (prefers-color-scheme: dark) {
              #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
                scrollbar-color: rgba(255,255,255,0.4) transparent;
              }
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group {
                display: flex;
                align-items: flex-start;
                gap: 2px;
                margin-bottom: 4px;
                opacity: 0.2;
                transition: opacity 0.2s ease;
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group:last-child {
                margin-bottom: 0;
            }
            #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-input-group {
                opacity: 1;
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container {
                display: flex;
                flex-direction: column;
                gap: 2px;
                position: absolute;
                right: 0;
                top: 0;
                opacity: 0;
                visibility: hidden;
                transform: translateX(8px) scale(0.98);
                transform-origin: top right;
                pointer-events: none;
                transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s 0.2s;
            }
            #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-inputs-container {
                opacity: 1;
                visibility: visible;
                transform: translateX(0) scale(1);
                pointer-events: auto;
                transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s;
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container::before {
                content: '';
                position: absolute;
                top: -6px;
                left: -8px;
                right: -8px;
                bottom: -6px;
                background-color: var(--linuxdo-filter-bg-color);
                border-radius: 10px;
                opacity: 0;
                transition: opacity 0.2s ease;
                z-index: -1;
                box-shadow: 0 2px 12px rgba(0,0,0,0.15);
                border: 1px solid var(--linuxdo-filter-border-color);
            }
            #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-inputs-container::before {
                opacity: 1;
            }
        `;

        document.head.appendChild(styleElement);
    }

    function syncSearchFilterUIForCurrentTerm() {
        const wrapper = document.getElementById(SEARCH_FILTER_WRAPPER_ID);
        if (!wrapper) return;

        const searchTerm = getCurrentSearchTerm();
        if (searchTerm === lastSyncedSearchTerm) return;

        const keywords = getSearchFilterKeywords(searchTerm);

        const blacklistDisplay = document.getElementById(SEARCH_FILTER_BLACKLIST_DISPLAY_ID);
        const blacklistInput = document.getElementById(SEARCH_FILTER_BLACKLIST_INPUT_ID);
        const whitelistDisplay = document.getElementById(SEARCH_FILTER_WHITELIST_DISPLAY_ID);
        const whitelistInput = document.getElementById(SEARCH_FILTER_WHITELIST_INPUT_ID);
        const regexDisplay = document.getElementById(SEARCH_FILTER_REGEX_DISPLAY_ID);
        const regexInput = document.getElementById(SEARCH_FILTER_REGEX_INPUT_ID);

        if (blacklistDisplay) {
            blacklistDisplay.textContent = (keywords.blacklist || '').replace(/\n/g, ' ');
            blacklistDisplay.title = keywords.blacklist || '';
        }
        if (blacklistInput) {
            if (blacklistInput.style.display !== 'block') {
                blacklistInput.value = keywords.blacklist || '';
            } else {
                adjustTextareaHeight(blacklistInput);
            }
        }

        if (whitelistDisplay) {
            whitelistDisplay.textContent = (keywords.whitelist || '').replace(/\n/g, ' ');
            whitelistDisplay.title = keywords.whitelist || '';
        }
        if (whitelistInput) {
            if (whitelistInput.style.display !== 'block') {
                whitelistInput.value = keywords.whitelist || '';
            } else {
                adjustTextareaHeight(whitelistInput);
            }
        }

        if (regexDisplay) {
            regexDisplay.textContent = (keywords.regex || '').replace(/\n/g, ' ');
            regexDisplay.title = keywords.regex || '';
        }
        if (regexInput) {
            if (regexInput.style.display !== 'block') {
                regexInput.value = keywords.regex || '';
            } else {
                adjustTextareaHeight(regexInput);
            }
        }

        lastSyncedSearchTerm = searchTerm;
    }

    function setupSearchFilterUIInteractions(wrapper) {
        const blacklistLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_BLACKLIST_INPUT_ID}"]`);
        const blacklistDisplay = wrapper.querySelector(`#${SEARCH_FILTER_BLACKLIST_DISPLAY_ID}`);
        const blacklistInput = wrapper.querySelector(`#${SEARCH_FILTER_BLACKLIST_INPUT_ID}`);

        const whitelistLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_WHITELIST_INPUT_ID}"]`);
        const whitelistDisplay = wrapper.querySelector(`#${SEARCH_FILTER_WHITELIST_DISPLAY_ID}`);
        const whitelistInput = wrapper.querySelector(`#${SEARCH_FILTER_WHITELIST_INPUT_ID}`);

        const regexLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_REGEX_INPUT_ID}"]`);
        const regexDisplay = wrapper.querySelector(`#${SEARCH_FILTER_REGEX_DISPLAY_ID}`);
        const regexInput = wrapper.querySelector(`#${SEARCH_FILTER_REGEX_INPUT_ID}`);

        setupTextareaScrollHandling(blacklistInput);
        setupTextareaScrollHandling(whitelistInput);
        setupTextareaScrollHandling(regexInput);

        function autoSave() {
            const currentSearchTerm = getCurrentSearchTerm();
            saveSearchFilterKeywords(
                currentSearchTerm,
                blacklistInput?.value || '',
                whitelistInput?.value || '',
                regexInput?.value || ''
            );
            filterSearchResults();
        }

        function createEditModeManager(label, display, input, { autoAppendComma = false } = {}) {
            if (!label || !display || !input) return;

            let initialValue = input.value;

            function enterEditMode(clickType = 'default') {
                if (input.style.display === 'block') return;

                initialValue = input.value;
                display.style.display = 'none';
                input.style.display = 'block';

                setTimeout(() => {
                    if (input.style.display === 'block') {
                        adjustTextareaHeight(input);
                        input.focus();

                        const length = input.value.length;
                        input.setSelectionRange(length, length);

                        if (clickType === 'leftClick') {
                            if (autoAppendComma) {
                                const appended = appendCommaToTextareaIfNeeded(input, { force: true });
                                if (appended) {
                                    adjustTextareaHeight(input);
                                }
                            }
                            input.scrollTop = input.scrollHeight;
                        }
                    }
                }, 0);
            }

            function exitEditMode(saveToDisplay = true) {
                if (input.style.display === 'none') return;

                input.style.display = 'none';
                if (saveToDisplay) {
                    const v = input.value.trim().replace(/\n/g, ' ');
                    display.textContent = v;
                    display.title = input.value.trim();

                    if (input.value !== initialValue) {
                        autoSave();
                    }
                }
                display.style.display = 'block';
            }

            label.addEventListener('mousedown', (e) => {
                if (e.button === 0) {
                    e.preventDefault();
                    enterEditMode('leftClick');
                }
            });

            display.addEventListener('mousedown', (e) => {
                if (e.button === 0) {
                    e.preventDefault();
                    enterEditMode('leftClick');
                }
            });

            label.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                enterEditMode('rightClick');
            });

            display.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                enterEditMode('rightClick');
            });

            display.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    enterEditMode('keyboard');
                }
            });

            input.addEventListener('blur', () => {
                setTimeout(() => {
                    exitEditMode(true);
                }, 100);
            });

            input.addEventListener('input', () => {
                adjustTextareaHeight(input);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    exitEditMode(true);
                }
            });
        }

        createEditModeManager(blacklistLabel, blacklistDisplay, blacklistInput, { autoAppendComma: true });
        createEditModeManager(whitelistLabel, whitelistDisplay, whitelistInput, { autoAppendComma: true });
        createEditModeManager(regexLabel, regexDisplay, regexInput);
    }

    function setupSearchFilterToggle(wrapper) {
        const fab = wrapper.querySelector('.filter-fab');
        if (!fab) return;

        const closePanel = () => {
            wrapper.classList.remove('filter-open');
        };

        fab.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.toggle('filter-open');
            if (wrapper.classList.contains('filter-open')) {
                const firstDisplay = wrapper.querySelector('.filter-display');
                if (firstDisplay) firstDisplay.focus();
            }
        });

        const onDocumentMouseDown = (e) => {
            if (!wrapper.contains(e.target)) {
                closePanel();
            }
        };

        const onDocumentKeyDown = (e) => {
            if (e.key === 'Escape') {
                closePanel();
            }
        };

        document.addEventListener('mousedown', onDocumentMouseDown);
        document.addEventListener('keydown', onDocumentKeyDown);

        wrapper._linuxdoSearchFilterCleanup = () => {
            document.removeEventListener('mousedown', onDocumentMouseDown);
            document.removeEventListener('keydown', onDocumentKeyDown);
        };
    }

    function ensureSearchFilterUI() {
        if (!isSearchPage()) return false;
        if (document.getElementById(SEARCH_FILTER_WRAPPER_ID)) return true;

        ensureSearchFilterStyles();

        const searchTerm = getCurrentSearchTerm();
        const savedKeywords = getSearchFilterKeywords(searchTerm);
        const blacklistPlaceholder = '屏蔽关键词,用逗号分隔';
        const whitelistPlaceholder = '必须包含关键词,用逗号分隔';
        const regexPlaceholder = '正则表达式,每行一个';

        const wrapper = document.createElement('div');
        wrapper.id = SEARCH_FILTER_WRAPPER_ID;
        wrapper.innerHTML = `
            <button class="filter-fab" type="button" aria-label="搜索过滤器">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
                    <path d="M7.5 7.5l9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
            </button>
            <div class="filter-inputs-container">
                <div class="filter-input-group">
                    <label class="filter-label" for="${SEARCH_FILTER_BLACKLIST_INPUT_ID}" title="点击编辑黑名单">屏蔽：</label>
                    <div
                      id="${SEARCH_FILTER_BLACKLIST_DISPLAY_ID}"
                      class="filter-display"
                      data-placeholder="${blacklistPlaceholder}"
                      tabindex="0"
                      title="点击编辑黑名单"
                    >${(savedKeywords.blacklist || '').replace(/\n/g, ' ')}</div>
                    <textarea
                      id="${SEARCH_FILTER_BLACKLIST_INPUT_ID}"
                      class="filter-input"
                      placeholder="${blacklistPlaceholder}"
                    >${savedKeywords.blacklist || ''}</textarea>
                </div>
                <div class="filter-input-group">
                    <label class="filter-label" for="${SEARCH_FILTER_WHITELIST_INPUT_ID}" title="点击编辑白名单">必含：</label>
                    <div
                      id="${SEARCH_FILTER_WHITELIST_DISPLAY_ID}"
                      class="filter-display"
                      data-placeholder="${whitelistPlaceholder}"
                      tabindex="0"
                      title="点击编辑白名单"
                    >${(savedKeywords.whitelist || '').replace(/\n/g, ' ')}</div>
                    <textarea
                      id="${SEARCH_FILTER_WHITELIST_INPUT_ID}"
                      class="filter-input"
                      placeholder="${whitelistPlaceholder}"
                    >${savedKeywords.whitelist || ''}</textarea>
                </div>
                <div class="filter-input-group regex-group">
                    <label class="filter-label" for="${SEARCH_FILTER_REGEX_INPUT_ID}" title="点击编辑正则表达式">正则：</label>
                    <div
                      id="${SEARCH_FILTER_REGEX_DISPLAY_ID}"
                      class="filter-display"
                      data-placeholder="${regexPlaceholder}"
                      tabindex="0"
                      title="点击编辑正则表达式"
                    >${(savedKeywords.regex || '').replace(/\n/g, ' ')}</div>
                    <textarea
                      id="${SEARCH_FILTER_REGEX_INPUT_ID}"
                      class="filter-input"
                      placeholder="${regexPlaceholder}"
                    >${savedKeywords.regex || ''}</textarea>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper);
        setupSearchFilterUIInteractions(wrapper);
        setupSearchFilterToggle(wrapper);

        lastSyncedSearchTerm = null;
        syncSearchFilterUIForCurrentTerm();

        return true;
    }

    function removeSearchFilterUI() {
        const wrapper = document.getElementById(SEARCH_FILTER_WRAPPER_ID);
        if (wrapper && typeof wrapper._linuxdoSearchFilterCleanup === 'function') {
            wrapper._linuxdoSearchFilterCleanup();
        }
        if (wrapper) wrapper.remove();
        lastSyncedSearchTerm = null;
    }

    // ================================
    // ========== 屏蔽开关指示器 ======
    // ================================

    function ensureBlockToggleStyles() {
        if (document.getElementById(BLOCK_TOGGLE_STYLE_ID)) return;

        const styleElement = document.createElement('style');
        styleElement.id = BLOCK_TOGGLE_STYLE_ID;
        styleElement.textContent = `
            #${BLOCK_TOGGLE_WRAPPER_ID} {
                position: fixed;
                top: 140px;
                right: 16px;
                z-index: 9997;
                pointer-events: auto;
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                height: 36px;
                padding: 0 10px;
                border-radius: 12px;
                border: 1px solid rgba(0,0,0,0.12);
                background: #ffffff;
                color: #111111;
                font-size: 13px;
                font-weight: 600;
                line-height: 1;
                cursor: pointer;
                user-select: none;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button:hover {
                transform: translateY(-1px);
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button:focus-visible {
                outline: 2px solid rgba(255,230,15,0.6);
                outline-offset: 2px;
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-icon {
                width: 18px;
                height: 18px;
                display: block;
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-count {
                min-width: 16px;
                text-align: center;
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed {
                color: #9aa0a6;
                border-color: rgba(0,0,0,0.08);
                box-shadow: none;
            }
            #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed .block-toggle-icon {
                opacity: 0.5;
            }

            .${BLOCKED_REVEALED_CLASS} {
                background-color: #ffe1e1 !important;
            }
            tr.${BLOCKED_REVEALED_CLASS} td {
                background-color: #ffe1e1 !important;
            }

            @media (prefers-color-scheme: dark) {
                #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
                    background: #2b2b2b;
                    color: #f2f2f2;
                    border-color: rgba(255,255,255,0.18);
                    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                }
                #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed {
                    color: #777777;
                    border-color: rgba(255,255,255,0.08);
                    box-shadow: none;
                }
                .${BLOCKED_REVEALED_CLASS} {
                    background-color: #4a1f1f !important;
                }
                tr.${BLOCKED_REVEALED_CLASS} td {
                    background-color: #4a1f1f !important;
                }
            }

            @media (max-width: 768px) {
                #${BLOCK_TOGGLE_WRAPPER_ID} {
                    top: 120px;
                    right: 12px;
                }
                #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
                    height: 34px;
                    padding: 0 8px;
                    border-radius: 10px;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }

    function ensureBlockToggleUI() {
        let wrapper = document.getElementById(BLOCK_TOGGLE_WRAPPER_ID);
        if (wrapper) return wrapper;

        ensureBlockToggleStyles();

        wrapper = document.createElement('div');
        wrapper.id = BLOCK_TOGGLE_WRAPPER_ID;
        wrapper.innerHTML = `
            <button id="${BLOCK_TOGGLE_BUTTON_ID}" class="block-toggle-button" type="button" aria-pressed="false" title="显示被屏蔽结果">
                <svg class="block-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
                    <path d="M7.5 7.5l9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
                <span id="${BLOCK_TOGGLE_COUNT_ID}" class="block-toggle-count">0</span>
            </button>
        `;
        document.body.appendChild(wrapper);

        const button = wrapper.querySelector(`#${BLOCK_TOGGLE_BUTTON_ID}`);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                revealBlockedResults = !revealBlockedResults;
                filterContent();
            });
        }

        return wrapper;
    }

    function updateBlockToggleUI(blockedCount) {
        const wrapper = ensureBlockToggleUI();
        if (!wrapper) return;

        const safeCount = Number.isFinite(blockedCount) ? blockedCount : 0;

        const button = wrapper.querySelector(`#${BLOCK_TOGGLE_BUTTON_ID}`);
        const countEl = wrapper.querySelector(`#${BLOCK_TOGGLE_COUNT_ID}`);

        if (countEl) {
            countEl.textContent = String(safeCount);
        }

        if (button) {
            const isRevealed = revealBlockedResults;
            button.classList.toggle('is-revealed', isRevealed);
            button.setAttribute('aria-pressed', isRevealed ? 'true' : 'false');
            button.setAttribute('title', isRevealed ? '恢复隐藏屏蔽结果' : '显示被屏蔽结果');
        }
    }

    // ================================
    // ========== 列表屏蔽按钮 =========
    // ================================

    function ensureBlockActionStyles() {
        if (document.getElementById(BLOCK_ACTION_STYLE_ID)) return;

        const styleElement = document.createElement('style');
        styleElement.id = BLOCK_ACTION_STYLE_ID;
        styleElement.textContent = `
            .${BLOCK_ACTION_BUTTON_CLASS} {
                position: fixed;
                top: 0;
                left: 0;
                width: ${BLOCK_ACTION_BUTTON_SIZE}px;
                height: ${BLOCK_ACTION_BUTTON_SIZE}px;
                border-radius: 999px;
                border: 1px solid rgba(0,0,0,0.2);
                background: rgba(255,255,255,0.9);
                color: #222222;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                opacity: 0;
                transform: scale(0.92);
                pointer-events: none;
                box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                transition: opacity 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
                cursor: pointer;
                z-index: 9999;
            }
            .${BLOCK_ACTION_BUTTON_CLASS} svg {
                width: 100%;
                height: 100%;
                display: block;
            }
            .${BLOCK_ACTION_BUTTON_CLASS}.${BLOCK_ACTION_VISIBLE_CLASS},
            .${BLOCK_ACTION_BUTTON_CLASS}:focus-visible {
                opacity: 1;
                transform: scale(1);
                pointer-events: auto;
            }
            .${BLOCK_ACTION_BUTTON_CLASS}:focus-visible {
                outline: 2px solid rgba(211,47,47,0.45);
                outline-offset: 2px;
            }
            .${BLOCK_ACTION_BUTTON_CLASS}.is-blocked {
                color: #d32f2f;
                border-color: rgba(211,47,47,0.35);
            }

            #${BLOCK_ACTION_DIALOG_OVERLAY_ID} {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.45);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
            }
            #${BLOCK_ACTION_DIALOG_OVERLAY_ID}.has-sub-dialog > #${BLOCK_ACTION_DIALOG_ID} {
                visibility: hidden;
                pointer-events: none;
            }
            #${BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID} {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.2);
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
            }
            .block-action-dialog {
                width: min(460px, 90vw);
                background: #ffffff;
                color: #222222;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                border: 1px solid rgba(0,0,0,0.08);
                padding: 20px 22px;
                font-size: 15px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .block-action-dialog h3 {
                margin: 0 0 6px 0;
                font-size: 20px;
            }
            .block-action-dialog .block-dialog-summary {
                margin: 0 0 12px 0;
                font-weight: 600;
                color: #333333;
            }
            .block-action-dialog .block-dialog-divider {
                height: 1px;
                background: rgba(0,0,0,0.1);
                margin: 4px 0 10px 0;
            }
            .block-action-dialog .block-dialog-reasons {
                margin: 0 0 16px 0;
                padding-left: 18px;
                max-height: 220px;
                overflow-y: auto;
                font-size: 15px;
                color: #555555;
            }
            .block-action-dialog .block-dialog-reasons.is-selectable {
                list-style: none;
                padding-left: 0;
            }
            .block-action-dialog .block-dialog-target,
            .block-action-dialog .block-dialog-meta {
                list-style: none;
                padding-left: 0;
            }
            .block-action-dialog .block-dialog-reasons li {
                margin: 6px 0;
                line-height: 1.5;
            }
            .block-action-dialog .block-dialog-reason-option,
            .block-action-dialog .block-dialog-reason-line {
                display: flex;
                align-items: flex-start;
                gap: 8px;
            }
            .block-action-dialog .block-dialog-reason-option {
                cursor: pointer;
            }
            .block-action-dialog .block-dialog-reason-option input {
                margin: 2px 0 0 0;
                align-self: flex-start;
            }
            .block-action-dialog .block-dialog-reason-label {
                min-width: var(--block-dialog-reason-label-width, 7em);
                flex: 0 0 var(--block-dialog-reason-label-width, 7em);
                text-align: left;
                white-space: nowrap;
            }
            .block-action-dialog .block-dialog-reason-value {
                flex: 1 1 auto;
                min-width: 0;
                text-align: left;
                word-break: break-word;
            }
            .block-action-dialog .block-dialog-target-item {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .block-action-dialog .block-dialog-target-item.block-dialog-target-item-options {
                align-items: baseline;
            }
            .block-action-dialog .block-dialog-target-label {
                position: relative;
                font-weight: 600;
                color: #333333;
                white-space: nowrap;
                min-width: var(--block-dialog-label-width, 8em);
                text-align: left;
                flex: 0 0 var(--block-dialog-label-width, 8em);
                padding-left: 12px;
            }
            .block-action-dialog .block-dialog-target-label::before {
                content: '•';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                color: inherit;
            }
            .block-action-dialog .block-dialog-target-input {
                flex: 1 1 auto;
                min-width: 0;
                min-height: 32px;
                border: 1px solid rgba(0,0,0,0.2);
                border-radius: 6px;
                padding: 6px 8px;
                font-size: 16px;
                color: #222222;
                background: #ffffff;
                box-sizing: border-box;
            }
            .block-action-dialog .block-dialog-target-text {
                flex: 1 1 auto;
                min-width: 0;
                padding: 6px 0;
                font-size: 16px;
                color: #222222;
                line-height: 1.4;
                word-break: break-word;
            }
            .block-action-dialog .block-dialog-target-input[readonly] {
                cursor: text;
                opacity: 1;
            }
            .block-action-dialog .block-dialog-target-input[readonly]:focus {
                border-color: rgba(0,0,0,0.2);
                box-shadow: none;
            }
            .block-action-dialog textarea.block-dialog-target-input {
                resize: none;
                overflow: hidden;
                line-height: 1.4;
            }
            .block-action-dialog .block-dialog-target-input:focus {
                outline: none;
                border-color: rgba(211,47,47,0.6);
                box-shadow: 0 0 0 2px rgba(211,47,47,0.15);
            }
            .block-action-dialog .block-dialog-target-options {
                flex: 1 1 auto;
                min-width: 0;
                font-size: 15px;
                color: #222222;
                display: flex;
                flex-wrap: wrap;
                gap: 6px 10px;
                padding: 0;
            }
            .block-action-dialog .block-dialog-target-options label {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                cursor: pointer;
            }
            .block-action-dialog .block-dialog-target-options input {
                margin: 0;
            }
            .block-action-dialog .block-dialog-title-keywords {
                align-items: center;
            }
            .block-action-dialog .block-dialog-title-keywords .block-dialog-target-label {
                margin-left: 16px;
                min-width: calc(var(--block-dialog-label-width, 8em) - 16px);
                flex: 0 0 calc(var(--block-dialog-label-width, 8em) - 16px);
            }
            .block-action-dialog .block-dialog-title-keywords .block-dialog-target-label::before {
                content: '';
                width: 8px;
                height: 8px;
                border: 2px solid currentColor;
                border-radius: 999px;
                background: transparent;
                left: 1px;
                box-sizing: border-box;
            }
            .block-action-dialog .block-dialog-title-keywords.has-options {
                align-items: flex-start;
            }
            .block-action-dialog .block-dialog-title-keywords-content {
                flex: 1 1 auto;
                min-width: 0;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            .block-action-dialog .block-dialog-title-keyword-preview {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 15px;
                color: #555555;
            }
            .block-action-dialog .block-dialog-title-keyword-preview.is-hidden {
                display: none;
            }
            .block-action-dialog .block-dialog-title-keyword-text {
                font-weight: 600;
                color: #222222;
                word-break: break-word;
            }
            .block-action-dialog .block-dialog-title-keyword-confirm {
                border-radius: 6px;
                padding: 4px 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                border: 1px solid rgba(0,0,0,0.18);
                background: #f4f4f4;
                color: #333333;
            }
            .block-action-dialog .block-dialog-title-keyword-cancel {
                border-radius: 6px;
                padding: 4px 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                border: 1px solid rgba(0,0,0,0.18);
                background: #ffffff;
                color: #333333;
            }
            .block-action-dialog .block-dialog-title-keyword-confirm:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .block-action-dialog .block-dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            .block-action-dialog .block-dialog-actions button {
                border-radius: 8px;
                padding: 8px 16px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                border: 1px solid transparent;
            }
            .block-action-dialog .block-dialog-confirm {
                background: #d32f2f;
                color: #ffffff;
            }
            .block-action-dialog .block-dialog-confirm:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            .block-action-dialog .block-dialog-cancel {
                background: #f4f4f4;
                color: #333333;
                border-color: rgba(0,0,0,0.12);
            }
            .block-action-dialog .block-dialog-confirm:hover {
                background: #c62828;
            }
            .block-action-dialog .block-dialog-cancel:hover {
                background: #e8e8e8;
            }

            @media (prefers-color-scheme: dark) {
                .${BLOCK_ACTION_BUTTON_CLASS} {
                    background: rgba(40,40,40,0.9);
                    border-color: rgba(255,255,255,0.18);
                    color: #f0f0f0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
                }
                .${BLOCK_ACTION_BUTTON_CLASS}.is-blocked {
                    color: #ff6b6b;
                    border-color: rgba(255,107,107,0.4);
                }
                .block-action-dialog {
                    background: #2b2b2b;
                    color: #f2f2f2;
                    border-color: rgba(255,255,255,0.1);
                }
                .block-action-dialog .block-dialog-summary {
                    color: #f0f0f0;
                }
                .block-action-dialog .block-dialog-divider {
                    background: rgba(255,255,255,0.18);
                }
                .block-action-dialog .block-dialog-reasons {
                    color: #cfcfcf;
                }
                .block-action-dialog .block-dialog-target-label {
                    color: #f0f0f0;
                }
                .block-action-dialog .block-dialog-target-input {
                    background: #3a3a3a;
                    color: #f2f2f2;
                    border-color: rgba(255,255,255,0.2);
                }
                .block-action-dialog .block-dialog-target-text {
                    color: #f2f2f2;
                }
                .block-action-dialog .block-dialog-target-input:focus {
                    border-color: rgba(255,107,107,0.7);
                    box-shadow: 0 0 0 2px rgba(255,107,107,0.2);
                }
                .block-action-dialog .block-dialog-target-options {
                    color: #f2f2f2;
                }
                .block-action-dialog .block-dialog-title-keyword-preview {
                    color: #cfcfcf;
                }
                .block-action-dialog .block-dialog-title-keyword-text {
                    color: #f0f0f0;
                }
                .block-action-dialog .block-dialog-title-keyword-confirm {
                    background: #3a3a3a;
                    color: #f0f0f0;
                    border-color: rgba(255,255,255,0.16);
                }
                .block-action-dialog .block-dialog-title-keyword-cancel {
                    background: #2f2f2f;
                    color: #f0f0f0;
                    border-color: rgba(255,255,255,0.16);
                }
                .block-action-dialog .block-dialog-cancel {
                    background: #3a3a3a;
                    color: #f0f0f0;
                    border-color: rgba(255,255,255,0.16);
                }
                .block-action-dialog .block-dialog-cancel:hover {
                    background: #444444;
                }
            }

            @media (hover: none) {
                .${BLOCK_ACTION_BUTTON_CLASS} {
                    transition: none;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }

    function getBlockActionHost(item) {
        if (!item) return null;
        if (item.tagName === 'TR') {
            return item.querySelector('td.main-link') || item.querySelector('td') || null;
        }
        return item;
    }

    function ensureBlockActionFloatingButton() {
        if (blockActionFloatingButton) return blockActionFloatingButton;
        ensureBlockActionStyles();

        const button = document.createElement('button');
        button.type = 'button';
        button.className = BLOCK_ACTION_BUTTON_CLASS;
        button.setAttribute('aria-hidden', 'true');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle>
                <path d="M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </svg>
        `;
        button.addEventListener('pointerdown', () => {
            captureBlockDialogSelection(blockActionFloatingItem);
        });
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const item = blockActionFloatingItem;
            if (!item) return;
            const reasons = getBlockReasonsFromElement(item);
            if (reasons.length > 0) {
                showBlockedItemDialog(reasons);
                return;
            }
            const target = getBlockTargetForItem(item);
            if (!target) return;
            showBlockConfirmDialog(target, item);
        });
        button.addEventListener('mouseleave', (event) => {
            if (isBlockActionRelatedTarget(event.relatedTarget)) return;
            hideBlockActionButton();
        });

        document.body.appendChild(button);
        blockActionFloatingButton = button;

        window.addEventListener('scroll', scheduleBlockActionButtonPositionUpdate, true);
        window.addEventListener('resize', scheduleBlockActionButtonPositionUpdate);

        return button;
    }

    function isBlockActionRelatedTarget(target) {
        if (!target) return false;
        if (blockActionFloatingButton && target.nodeType && blockActionFloatingButton.contains(target)) return true;
        if (typeof target.closest !== 'function') return false;
        return Boolean(target.closest('tr.topic-list-item, .fps-result'));
    }

    function positionBlockActionButton(item) {
        if (!blockActionFloatingButton) return;
        if (!item || !item.isConnected) {
            hideBlockActionButton();
            return;
        }
        const host = getBlockActionHost(item);
        if (!host) {
            hideBlockActionButton();
            return;
        }
        const rect = host.getBoundingClientRect();
        if (!rect.width || !rect.height) {
            hideBlockActionButton();
            return;
        }
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
            hideBlockActionButton();
            return;
        }

        let top = rect.top + BLOCK_ACTION_BUTTON_OFFSET_TOP;
        let left = rect.right - BLOCK_ACTION_BUTTON_OFFSET_RIGHT - BLOCK_ACTION_BUTTON_SIZE;

        const summaryButton = item.querySelector('.topic-summary-button');
        if (summaryButton) {
            const summaryRect = summaryButton.getBoundingClientRect();
            if (summaryRect.width && summaryRect.height) {
                const gap = 6;
                const candidateLeft = summaryRect.left - gap - BLOCK_ACTION_BUTTON_SIZE;
                if (!Number.isNaN(candidateLeft)) {
                    left = Math.min(left, candidateLeft);
                }
                const candidateTop = summaryRect.top + (summaryRect.height - BLOCK_ACTION_BUTTON_SIZE) / 2;
                if (!Number.isNaN(candidateTop)) {
                    top = candidateTop;
                }
            }
        }

        const minEdge = 6;
        const maxLeft = Math.max(minEdge, window.innerWidth - BLOCK_ACTION_BUTTON_SIZE - minEdge);
        const maxTop = Math.max(minEdge, window.innerHeight - BLOCK_ACTION_BUTTON_SIZE - minEdge);
        const clampedLeft = Math.min(Math.max(left, minEdge), maxLeft);
        const clampedTop = Math.min(Math.max(top, minEdge), maxTop);

        blockActionFloatingButton.style.left = `${Math.round(clampedLeft)}px`;
        blockActionFloatingButton.style.top = `${Math.round(clampedTop)}px`;
    }

    function scheduleBlockActionButtonPositionUpdate() {
        if (!blockActionFloatingButton || !blockActionFloatingItem) return;
        if (blockActionPositionRaf) return;
        blockActionPositionRaf = requestAnimationFrame(() => {
            blockActionPositionRaf = null;
            positionBlockActionButton(blockActionFloatingItem);
        });
    }

    function showBlockActionButtonForItem(item) {
        if (!item) return;
        const button = ensureBlockActionFloatingButton();
        blockActionFloatingItem = item;
        updateBlockActionButtonState(button, item);
        positionBlockActionButton(item);
        button.classList.add(BLOCK_ACTION_VISIBLE_CLASS);
        button.setAttribute('aria-hidden', 'false');
    }

    function hideBlockActionButton() {
        if (!blockActionFloatingButton) return;
        blockActionFloatingButton.classList.remove(BLOCK_ACTION_VISIBLE_CLASS);
        blockActionFloatingButton.setAttribute('aria-hidden', 'true');
        blockActionFloatingItem = null;
    }

    function bindBlockActionHover(item) {
        if (!item || blockActionHoverBoundItems.has(item)) return;
        blockActionHoverBoundItems.add(item);

        item.addEventListener('mouseenter', () => {
            showBlockActionButtonForItem(item);
        });
        item.addEventListener('mouseleave', (event) => {
            if (isBlockActionRelatedTarget(event.relatedTarget)) return;
            hideBlockActionButton();
        });
        item.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'touch') {
                showBlockActionButtonForItem(item);
            }
        });
    }

    function ensureBlockActionButtonNow(item) {
        if (!item) return;
        ensureBlockActionFloatingButton();
        bindBlockActionHover(item);
        if (blockActionFloatingItem === item && blockActionFloatingButton) {
            updateBlockActionButtonState(blockActionFloatingButton, item);
            scheduleBlockActionButtonPositionUpdate();
        }
    }

    function ensureBlockActionButton(item) {
        if (!item) return;
        const needsSummaryButton = summaryScriptEnabled
            && item.tagName === 'TR'
            && item.classList.contains('topic-list-item');
        if (needsSummaryButton && !item.querySelector('.topic-summary-button')) {
            return;
        }
        ensureBlockActionButtonNow(item);
    }

    function updateBlockActionButtonState(button, item) {
        if (!button || !item) return;
        const isBlocked = item.classList.contains(BLOCKED_ITEM_CLASS);
        button.classList.toggle('is-blocked', isBlocked);
        if (isBlocked) {
            button.setAttribute('title', '查看屏蔽原因');
            button.setAttribute('aria-label', '查看屏蔽原因');
        } else {
            button.setAttribute('title', '屏蔽该结果');
            button.setAttribute('aria-label', '屏蔽该结果');
        }
    }

    function getBlockReasonLabelValue(reason) {
        if (!reason || !reason.kind) return { label: '屏蔽原因未知', value: '' };
        switch (reason.kind) {
            case 'title_keyword':
                return { label: '标题关键词：', value: reason.value || '' };
            case 'title_regex':
                return {
                    label: '标题匹配正则：',
                    value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
                };
            case 'category_keyword':
                return { label: '类别匹配：', value: reason.value || '' };
            case 'category_regex':
                return {
                    label: '类别匹配正则：',
                    value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
                };
            case 'tag_keyword':
                return { label: '标签匹配：', value: reason.value || '' };
            case 'tag_regex':
                return {
                    label: '标签匹配正则：',
                    value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
                };
            case 'search_blacklist':
                return { label: '搜索屏蔽关键词：', value: reason.value || '' };
            case 'search_regex':
                return { label: '搜索正则：', value: `/${reason.pattern || ''}/` };
            case 'search_whitelist_missing':
                if (Array.isArray(reason.values) && reason.values.length > 0) {
                    return { label: '搜索必含缺失：', value: reason.values.join(', ') };
                }
                return { label: '搜索必含未满足', value: '' };
            default:
                return { label: '屏蔽原因未知', value: '' };
        }
    }

    function formatBlockReason(reason) {
        const { label, value } = getBlockReasonLabelValue(reason);
        return value ? `${label}${value}` : label;
    }

    function getTopicTitleFromItem(item) {
        if (!item) return '';
        const titleElement = item.querySelector('a.title, a.topic-title, .topic-title, a.raw-topic-link');
        if (!titleElement) return '';
        return (titleElement.getAttribute('title') || titleElement.textContent || '').trim();
    }

    function getCategoryTextFromItem(item) {
        if (!item) return '';
        const categoryElement = item.querySelector(
            'div.link-bottom-line a.badge-category__wrapper span.badge-category__name, a.badge-category__wrapper span.badge-category__name, span.badge-category__name'
        );
        const categoryText = categoryElement?.textContent?.trim();
        return categoryText || '';
    }

    function getTagListFromItem(item) {
        if (!item) return [];
        const tagNodes = item.querySelectorAll('.discourse-tags a, a.discourse-tag, .tag-name');
        const tags = [];
        const seen = new Set();
        tagNodes.forEach(node => {
            const tagText = (node.getAttribute('data-tag-name') || node.textContent || '').trim();
            if (tagText && !seen.has(tagText)) {
                seen.add(tagText);
                tags.push(tagText);
            }
        });
        return tags;
    }

    function getTagTextFromItem(item) {
        const tags = getTagListFromItem(item);
        return tags[0] || '';
    }

    function getSelectedTextInItem(item) {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return '';
        const text = selection.toString().trim();
        if (!text) return '';
        const anchorNode = selection.anchorNode;
        const focusNode = selection.focusNode;
        const hasAnchor = anchorNode && item && item.contains(anchorNode);
        const hasFocus = focusNode && item && item.contains(focusNode);
        return hasAnchor || hasFocus ? text : '';
    }

    function captureBlockDialogSelection(item) {
        blockDialogSelectedText = getSelectedTextInItem(item);
    }

    function consumeBlockDialogSelection(item) {
        const selectedText = blockDialogSelectedText || getSelectedTextInItem(item);
        blockDialogSelectedText = '';
        return selectedText;
    }

    function createBlockOptionGroup(options, ariaLabel) {
        const container = document.createElement('div');
        container.className = 'block-dialog-target-options';
        container.setAttribute('role', 'group');
        container.setAttribute('aria-label', ariaLabel);
        options.forEach(option => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkbox.checked = false;
            const text = document.createElement('span');
            text.textContent = option;
            label.appendChild(checkbox);
            label.appendChild(text);
            container.appendChild(label);
        });
        return container;
    }

    function autoResizeTextarea(textarea) {
        if (!textarea) return;
        textarea.style.height = '0px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function getCheckedOptionValues(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll('input[type="checkbox"]'))
            .filter(input => input.checked)
            .map(input => input.value);
    }

    function getBlockTargetForItem(item) {
        if (!item) return null;

        if (item.classList && item.classList.contains('fps-result')) {
            const titleText = getTopicTitleFromItem(item);
            if (!titleText) {
                const tagText = getTagTextFromItem(item);
                if (tagText) {
                    return { kind: 'tag_keyword', value: tagText };
                }
                return null;
            }
            const searchTerm = getCurrentSearchTerm();
            if (!searchTerm) return null;
            return { kind: 'search_blacklist', value: titleText, searchTerm };
        }

        const titleText = getTopicTitleFromItem(item);
        if (titleText) {
            return { kind: 'title_keyword', value: titleText };
        }

        const categoryText = getCategoryTextFromItem(item);
        if (categoryText) {
            return { kind: 'category_keyword', value: categoryText };
        }

        const tagText = getTagTextFromItem(item);
        if (tagText) {
            return { kind: 'tag_keyword', value: tagText };
        }

        return null;
    }

    function formatBlockTarget(target) {
        if (!target || !target.kind) return '';
        switch (target.kind) {
            case 'title_keyword':
                return '标题';
            case 'category_keyword':
                return '类别关键词';
            case 'tag_keyword':
                return '标签关键词';
            case 'search_blacklist':
                return '搜索屏蔽关键词';
            default:
                return '';
        }
    }

    function applyBlockTarget(target) {
        if (!target || !target.kind) return false;
        const value = typeof target.value === 'string' ? target.value.trim() : '';
        if (!value) return false;

        let changed = false;
        let updatedTitles = false;
        let updatedCategories = false;
        let updatedTags = false;
        let updatedSearchFilter = false;

        switch (target.kind) {
            case 'title_keyword': {
                const lowerValue = value.toLowerCase();
                const exists = blockedTitles.some(item => String(item).toLowerCase() === lowerValue);
                if (!exists) {
                    blockedTitles = blockedTitles.concat(value);
                    GM_setValue('blockedTitles', blockedTitles);
                    updatedTitles = true;
                    changed = true;
                }
                break;
            }
            case 'category_keyword':
                if (!blockedCategories.includes(value)) {
                    blockedCategories = blockedCategories.concat(value);
                    GM_setValue('blockedCategories', blockedCategories);
                    updatedCategories = true;
                    changed = true;
                }
                break;
            case 'tag_keyword':
                if (!blockedTtags.includes(value)) {
                    blockedTtags = blockedTtags.concat(value);
                    GM_setValue('blockedTtags', blockedTtags);
                    updatedTags = true;
                    changed = true;
                }
                break;
            case 'search_blacklist': {
                const rawSearchTerm = typeof target.searchTerm === 'string' ? target.searchTerm.trim() : '';
                const searchTerm = rawSearchTerm || getCurrentSearchTerm();
                if (!searchTerm) break;
                const current = getSearchFilterKeywords(searchTerm);
                const blacklistArray = current.blacklist
                    ? current.blacklist.split(',').map(item => item.trim()).filter(Boolean)
                    : [];
                const lowerSet = new Set(blacklistArray.map(item => item.toLowerCase()));
                if (!lowerSet.has(value.toLowerCase())) {
                    blacklistArray.push(value);
                    saveSearchFilterKeywords(
                        searchTerm,
                        blacklistArray.join(', '),
                        current.whitelist || '',
                        current.regex || ''
                    );
                    updatedSearchFilter = true;
                    changed = true;
                }
                break;
            }
        }

        if (changed) {
            const dialog = document.getElementById('settingsDialog');
            if (dialog) {
                if (updatedTitles) {
                    const titlesField = dialog.querySelector('#titles');
                    if (titlesField) titlesField.value = blockedTitles.join(', ');
                }
                if (updatedCategories) {
                    const categoriesField = dialog.querySelector('#categories');
                    if (categoriesField) categoriesField.value = blockedCategories.join(', ');
                }
                if (updatedTags) {
                    const tagsField = dialog.querySelector('#ttags');
                    if (tagsField) tagsField.value = blockedTtags.join(', ');
                }
            }

            if (updatedSearchFilter) {
                lastSyncedSearchTerm = null;
            }

            resetAndReapplyFilter();
        }

        return changed;
    }

    function showBlockConfirmDialog(target, item) {
        if (!target || !target.kind) return;
        ensureBlockActionStyles();
        closeBlockedItemDialog();

        if (blockDialogSavedBodyOverflow === null) {
            blockDialogSavedBodyOverflow = document.body.style.overflow;
        }
        if (blockDialogSavedHtmlOverflow === null) {
            blockDialogSavedHtmlOverflow = document.documentElement.style.overflow;
        }
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.id = BLOCK_ACTION_DIALOG_OVERLAY_ID;
        overlay.addEventListener('click', () => closeBlockedItemDialog());

        const dialog = document.createElement('div');
        dialog.id = BLOCK_ACTION_DIALOG_ID;
        dialog.className = 'block-action-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        const title = document.createElement('h3');
        title.textContent = '屏蔽选择器';

        const previewSelectedText = blockDialogSelectedText || getSelectedTextInItem(item);
        const previewTitleText = getTopicTitleFromItem(item);
        const previewFallbackValue = (target.kind === 'search_blacklist' || target.kind === 'title_keyword')
            ? (target.value || '')
            : '';
        const previewTitleValue = previewSelectedText || previewTitleText || previewFallbackValue;

        const categoryText = getCategoryTextFromItem(item);
        const tagList = getTagListFromItem(item);

        const detailList = document.createElement('ul');
        detailList.className = 'block-dialog-reasons block-dialog-target';
        const titleItem = document.createElement('li');
        titleItem.className = 'block-dialog-target-item';
        const titleLabel = document.createElement('span');
        titleLabel.className = 'block-dialog-target-label';
        titleLabel.textContent = '标题：';
        const titleInput = document.createElement('textarea');
        titleInput.className = 'block-dialog-target-input';
        titleInput.value = previewTitleValue;
        titleInput.rows = 1;
        titleInput.readOnly = true;
        titleInput.setAttribute('aria-label', '标题');
        titleItem.appendChild(titleLabel);
        titleItem.appendChild(titleInput);
        detailList.appendChild(titleItem);

        const titleKeywordItem = document.createElement('li');
        titleKeywordItem.className = 'block-dialog-target-item block-dialog-title-keywords';
        const titleKeywordLabel = document.createElement('span');
        titleKeywordLabel.className = 'block-dialog-target-label';
        titleKeywordLabel.textContent = '关键词：';
        const titleKeywordContent = document.createElement('div');
        titleKeywordContent.className = 'block-dialog-title-keywords-content';

        const titleKeywordPreview = document.createElement('div');
        titleKeywordPreview.className = 'block-dialog-title-keyword-preview is-hidden';
        const titleKeywordText = document.createElement('span');
        titleKeywordText.className = 'block-dialog-title-keyword-text';
        const titleKeywordOk = document.createElement('button');
        titleKeywordOk.type = 'button';
        titleKeywordOk.className = 'block-dialog-title-keyword-confirm';
        titleKeywordOk.textContent = '添加';
        titleKeywordOk.disabled = true;
        const titleKeywordCancel = document.createElement('button');
        titleKeywordCancel.type = 'button';
        titleKeywordCancel.className = 'block-dialog-title-keyword-cancel';
        titleKeywordCancel.textContent = '取消';
        titleKeywordCancel.disabled = true;
        titleKeywordPreview.appendChild(titleKeywordText);
        titleKeywordPreview.appendChild(titleKeywordOk);
        titleKeywordPreview.appendChild(titleKeywordCancel);

        const titleKeywordOptions = createBlockOptionGroup([], '关键词');
        titleKeywordOptions.style.display = 'none';

        titleKeywordContent.appendChild(titleKeywordPreview);
        titleKeywordContent.appendChild(titleKeywordOptions);
        titleKeywordItem.appendChild(titleKeywordLabel);
        titleKeywordItem.appendChild(titleKeywordContent);
        titleKeywordItem.style.display = 'none';
        detailList.appendChild(titleKeywordItem);

        const titleKeywordOptionMap = new Map();
        let currentTitleKeywordSelection = '';

        const updateDialogLabelWidth = () => {
            const labelTexts = ['标题：'];
            if (currentTitleKeywordSelection || titleKeywordOptionMap.size > 0) {
                labelTexts.push('关键词：');
            }
            if (categoryText) labelTexts.push('类别：');
            if (tagList.length > 0) labelTexts.push('标签：');
            const longest = Math.max(...labelTexts.map(text => text.length));
            const widthEm = Math.max(3, longest + 0.5);
            dialog.style.setProperty('--block-dialog-label-width', `${widthEm}em`);
        };

        const normalizeTitleKeyword = (value) => {
            if (!value) return '';
            return value.replace(/\s+/g, ' ').trim();
        };

        const updateTitleKeywordRow = () => {
            const hasSelection = Boolean(currentTitleKeywordSelection);
            const hasOptions = titleKeywordOptionMap.size > 0;
            titleKeywordPreview.classList.toggle('is-hidden', !hasSelection);
            titleKeywordOk.disabled = !hasSelection;
            titleKeywordCancel.disabled = !hasSelection;
            titleKeywordOptions.style.display = hasOptions ? '' : 'none';
            titleKeywordItem.style.display = (hasSelection || hasOptions) ? '' : 'none';
            titleKeywordItem.classList.toggle('has-options', hasOptions);
            updateDialogLabelWidth();
        };

        const setTitleKeywordSelection = (value) => {
            currentTitleKeywordSelection = normalizeTitleKeyword(value);
            titleKeywordText.textContent = currentTitleKeywordSelection;
            updateTitleKeywordRow();
        };

        const clearTitleInputSelection = () => {
            if (!titleInput || typeof titleInput.setSelectionRange !== 'function') return;
            const end = titleInput.value.length;
            titleInput.setSelectionRange(end, end);
            titleInput.blur();
            const selection = window.getSelection?.();
            if (selection) selection.removeAllRanges();
        };

        const syncTitleKeywordSelection = () => {
            if (!titleInput) return;
            const start = titleInput.selectionStart;
            const end = titleInput.selectionEnd;
            if (typeof start !== 'number' || typeof end !== 'number' || start === end) {
                setTitleKeywordSelection('');
                return;
            }
            setTitleKeywordSelection(titleInput.value.slice(start, end));
        };

        const addTitleKeywordOption = (value) => {
            const normalized = normalizeTitleKeyword(value);
            if (!normalized) return false;
            const key = normalized.toLowerCase();
            const existing = titleKeywordOptionMap.get(key);
            if (existing) {
                existing.checked = true;
                return false;
            }
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = normalized;
            checkbox.checked = true;
            const text = document.createElement('span');
            text.textContent = normalized;
            label.appendChild(checkbox);
            label.appendChild(text);
            titleKeywordOptions.appendChild(label);
            titleKeywordOptionMap.set(key, checkbox);
            return true;
        };

        titleInput.addEventListener('select', syncTitleKeywordSelection);
        titleInput.addEventListener('mouseup', syncTitleKeywordSelection);
        titleInput.addEventListener('keyup', syncTitleKeywordSelection);

        titleKeywordOk.addEventListener('click', () => {
            if (!currentTitleKeywordSelection) return;
            addTitleKeywordOption(currentTitleKeywordSelection);
            setTitleKeywordSelection('');
            clearTitleInputSelection();
        });
        titleKeywordCancel.addEventListener('click', () => {
            setTitleKeywordSelection('');
            clearTitleInputSelection();
        });

        updateDialogLabelWidth();

        let metaList = null;
        let categoryOptions = null;
        let tagOptions = null;
        if (categoryText || tagList.length > 0) {
            metaList = document.createElement('ul');
            metaList.className = 'block-dialog-reasons block-dialog-meta';
            if (categoryText) {
                const categoryItem = document.createElement('li');
                categoryItem.className = 'block-dialog-target-item block-dialog-target-item-options';
                const categoryLabel = document.createElement('span');
                categoryLabel.className = 'block-dialog-target-label';
                categoryLabel.textContent = '类别：';
                categoryOptions = createBlockOptionGroup([categoryText], '类别');
                categoryItem.appendChild(categoryLabel);
                categoryItem.appendChild(categoryOptions);
                metaList.appendChild(categoryItem);
            }
            if (tagList.length > 0) {
                const tagItem = document.createElement('li');
                tagItem.className = 'block-dialog-target-item block-dialog-target-item-options';
                const tagLabel = document.createElement('span');
                tagLabel.className = 'block-dialog-target-label';
                tagLabel.textContent = '标签：';
                tagOptions = createBlockOptionGroup(tagList, '标签');
                tagItem.appendChild(tagLabel);
                tagItem.appendChild(tagOptions);
                metaList.appendChild(tagItem);
            }
        }

        const actions = document.createElement('div');
        actions.className = 'block-dialog-actions';

        const confirmButton = document.createElement('button');
        confirmButton.type = 'button';
        confirmButton.className = 'block-dialog-confirm';
        confirmButton.textContent = '选好了';
        confirmButton.addEventListener('click', () => {
            if (document.getElementById(BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID)) return;

            const subOverlay = document.createElement('div');
            subOverlay.id = BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID;
            subOverlay.addEventListener('click', (event) => {
                event.stopPropagation();
                closeBlockedItemSubDialog();
            });
            overlay.classList.add('has-sub-dialog');

            const subDialog = document.createElement('div');
            subDialog.id = BLOCK_ACTION_SUB_DIALOG_ID;
            subDialog.className = 'block-action-dialog';
            subDialog.setAttribute('role', 'dialog');
            subDialog.setAttribute('aria-modal', 'true');
            subDialog.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            const selectedTitleKeywords = getCheckedOptionValues(titleKeywordOptions);
            const selectedCategories = getCheckedOptionValues(categoryOptions);
            const selectedTags = getCheckedOptionValues(tagOptions);

            const subTitle = document.createElement('h3');
            subTitle.textContent = '确认屏蔽';

            let subMetaList = null;
            if (selectedTitleKeywords.length > 0 || selectedCategories.length > 0 || selectedTags.length > 0) {
                subMetaList = document.createElement('ul');
                subMetaList.className = 'block-dialog-reasons block-dialog-meta';
                if (selectedTitleKeywords.length > 0) {
                    const titleKeywordItem = document.createElement('li');
                    titleKeywordItem.className = 'block-dialog-target-item';
                    const titleKeywordLabel = document.createElement('span');
                    titleKeywordLabel.className = 'block-dialog-target-label';
                    titleKeywordLabel.textContent = '标题关键词：';
                    const titleKeywordText = document.createElement('div');
                    titleKeywordText.className = 'block-dialog-target-text';
                    titleKeywordText.textContent = selectedTitleKeywords.join(', ');
                    titleKeywordItem.appendChild(titleKeywordLabel);
                    titleKeywordItem.appendChild(titleKeywordText);
                    subMetaList.appendChild(titleKeywordItem);
                }
                if (selectedCategories.length > 0) {
                    const categoryItem = document.createElement('li');
                    categoryItem.className = 'block-dialog-target-item';
                    const categoryLabel = document.createElement('span');
                    categoryLabel.className = 'block-dialog-target-label';
                    categoryLabel.textContent = '类别：';
                    const categoryText = document.createElement('div');
                    categoryText.className = 'block-dialog-target-text';
                    categoryText.textContent = selectedCategories.join(', ');
                    categoryItem.appendChild(categoryLabel);
                    categoryItem.appendChild(categoryText);
                    subMetaList.appendChild(categoryItem);
                }
                if (selectedTags.length > 0) {
                    const tagItem = document.createElement('li');
                    tagItem.className = 'block-dialog-target-item';
                    const tagLabel = document.createElement('span');
                    tagLabel.className = 'block-dialog-target-label';
                    tagLabel.textContent = '标签：';
                    const tagText = document.createElement('div');
                    tagText.className = 'block-dialog-target-text';
                    tagText.textContent = selectedTags.join(', ');
                    tagItem.appendChild(tagLabel);
                    tagItem.appendChild(tagText);
                    subMetaList.appendChild(tagItem);
                }
            }

            const subLabelTexts = [];
            if (selectedTitleKeywords.length > 0) subLabelTexts.push('标题关键词：');
            if (selectedCategories.length > 0) subLabelTexts.push('类别：');
            if (selectedTags.length > 0) subLabelTexts.push('标签：');
            if (subLabelTexts.length > 0) {
                const subLongest = Math.max(...subLabelTexts.map(text => text.length));
                const subWidthEm = Math.max(3, subLongest + 0.5);
                subDialog.style.setProperty('--block-dialog-label-width', `${subWidthEm}em`);
            }

            const subActions = document.createElement('div');
            subActions.className = 'block-dialog-actions';

            const subConfirmButton = document.createElement('button');
            subConfirmButton.type = 'button';
            subConfirmButton.className = 'block-dialog-confirm';
            subConfirmButton.textContent = '确认屏蔽';
            subConfirmButton.addEventListener('click', () => {
                const titleKind = target.kind === 'search_blacklist' ? 'search_blacklist' : 'title_keyword';
                const titleValues = [];
                const titleValueSet = new Set();
                const addTitleValue = (value) => {
                    const trimmedValue = value.trim();
                    if (!trimmedValue) return;
                    const lowerValue = trimmedValue.toLowerCase();
                    if (titleValueSet.has(lowerValue)) return;
                    titleValueSet.add(lowerValue);
                    titleValues.push(trimmedValue);
                };

                selectedTitleKeywords.forEach(addTitleValue);
                if (titleValues.length === 0 && selectedCategories.length === 0 && selectedTags.length === 0) {
                    const fallbackTitle = getTopicTitleFromItem(item);
                    const fallbackValue = (target.kind === 'search_blacklist' || target.kind === 'title_keyword')
                        ? (target.value || '')
                        : '';
                    const selectedText = currentTitleKeywordSelection || consumeBlockDialogSelection(item);
                    addTitleValue(selectedText || fallbackTitle || fallbackValue);
                }

                titleValues.forEach(value => {
                    const nextTarget = { kind: titleKind, value };
                    if (titleKind === 'search_blacklist' && target.searchTerm) {
                        nextTarget.searchTerm = target.searchTerm;
                    }
                    applyBlockTarget(nextTarget);
                });

                selectedCategories.forEach(value => {
                    applyBlockTarget({ kind: 'category_keyword', value });
                });
                selectedTags.forEach(value => {
                    applyBlockTarget({ kind: 'tag_keyword', value });
                });

                closeBlockedItemDialog();
            });

            const subCancelButton = document.createElement('button');
            subCancelButton.type = 'button';
            subCancelButton.className = 'block-dialog-cancel';
            subCancelButton.textContent = '取消';
            subCancelButton.addEventListener('click', () => closeBlockedItemSubDialog());

            subActions.appendChild(subConfirmButton);
            subActions.appendChild(subCancelButton);

            subDialog.appendChild(subTitle);
            if (subMetaList) subDialog.appendChild(subMetaList);
            subDialog.appendChild(subActions);

            subOverlay.appendChild(subDialog);
            overlay.appendChild(subOverlay);

            subConfirmButton.focus();
        });

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.className = 'block-dialog-cancel';
        cancelButton.textContent = '取消';
        cancelButton.addEventListener('click', () => closeBlockedItemDialog());

        actions.appendChild(confirmButton);
        actions.appendChild(cancelButton);

        dialog.appendChild(title);
        dialog.appendChild(detailList);
        if (metaList) dialog.appendChild(metaList);
        dialog.appendChild(actions);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        blockDialogEscapeHandler = (event) => {
            if (event.key === 'Escape') {
                if (closeBlockedItemSubDialog()) return;
                closeBlockedItemDialog();
            }
        };
        document.addEventListener('keydown', blockDialogEscapeHandler);
        autoResizeTextarea(titleInput);
        confirmButton.focus();
    }

    function showBlockedItemDialog(reasons) {
        const dedupedReasons = dedupeBlockReasons(reasons);
        if (dedupedReasons.length === 0) return;
        const normalizedReasons = dedupedReasons
            .map((reason, index) => ({ reason, index }))
            .sort((a, b) => {
                const rankMap = {
                    title_keyword: 1,
                    title_regex: 1,
                    category_keyword: 2,
                    category_regex: 2,
                    tag_keyword: 3,
                    tag_regex: 3
                };
                const rankA = rankMap[a.reason.kind] || 9;
                const rankB = rankMap[b.reason.kind] || 9;
                if (rankA !== rankB) return rankA - rankB;
                return a.index - b.index;
            })
            .map(entry => entry.reason);
        ensureBlockActionStyles();
        closeBlockedItemDialog();

        if (blockDialogSavedBodyOverflow === null) {
            blockDialogSavedBodyOverflow = document.body.style.overflow;
        }
        if (blockDialogSavedHtmlOverflow === null) {
            blockDialogSavedHtmlOverflow = document.documentElement.style.overflow;
        }
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.id = BLOCK_ACTION_DIALOG_OVERLAY_ID;
        overlay.addEventListener('click', () => closeBlockedItemDialog());

        const dialog = document.createElement('div');
        dialog.id = BLOCK_ACTION_DIALOG_ID;
        dialog.className = 'block-action-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        const title = document.createElement('h3');
        title.textContent = '取消屏蔽选择器';

        const divider = document.createElement('div');
        divider.className = 'block-dialog-divider';

        const summary = document.createElement('p');
        summary.className = 'block-dialog-summary';
        summary.textContent = '选择要取消的屏蔽规则';

        const reasonList = document.createElement('ul');
        reasonList.className = 'block-dialog-reasons is-selectable';
        const reasonLabelTexts = [];
        normalizedReasons.forEach((reason, index) => {
            const { label: reasonLabel, value: reasonValue } = getBlockReasonLabelValue(reason);
            reasonLabelTexts.push(reasonLabel);
            const item = document.createElement('li');
            const label = document.createElement('label');
            label.className = 'block-dialog-reason-option';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = String(index);
            checkbox.checked = true;
            const labelText = document.createElement('span');
            labelText.className = 'block-dialog-reason-label';
            labelText.textContent = reasonLabel;
            const valueText = document.createElement('span');
            valueText.className = 'block-dialog-reason-value';
            valueText.textContent = reasonValue;
            label.appendChild(checkbox);
            label.appendChild(labelText);
            label.appendChild(valueText);
            item.appendChild(label);
            reasonList.appendChild(item);
        });
        if (reasonLabelTexts.length > 0) {
            const longest = Math.max(...reasonLabelTexts.map(text => text.length));
            const widthEm = Math.max(3, longest + 0.5);
            dialog.style.setProperty('--block-dialog-reason-label-width', `${widthEm}em`);
        }

        const getSelectedReasons = () => Array.from(reasonList.querySelectorAll('input[type="checkbox"]'))
            .filter(input => input.checked)
            .map(input => {
                const index = Number.parseInt(input.value, 10);
                return Number.isNaN(index) ? null : normalizedReasons[index];
            })
            .filter(Boolean);

        const actions = document.createElement('div');
        actions.className = 'block-dialog-actions';

        const confirmButton = document.createElement('button');
        confirmButton.type = 'button';
        confirmButton.className = 'block-dialog-confirm';
        confirmButton.textContent = '选好了';
        confirmButton.addEventListener('click', () => {
            if (document.getElementById(BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID)) return;

            const selectedReasons = getSelectedReasons();
            if (selectedReasons.length === 0) {
                showNotification('请选择要取消的屏蔽规则', 'info');
                return;
            }

            const subOverlay = document.createElement('div');
            subOverlay.id = BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID;
            subOverlay.addEventListener('click', (event) => {
                event.stopPropagation();
                closeBlockedItemSubDialog();
            });
            overlay.classList.add('has-sub-dialog');

            const subDialog = document.createElement('div');
            subDialog.id = BLOCK_ACTION_SUB_DIALOG_ID;
            subDialog.className = 'block-action-dialog';
            subDialog.setAttribute('role', 'dialog');
            subDialog.setAttribute('aria-modal', 'true');
            subDialog.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            const subTitle = document.createElement('h3');
            subTitle.textContent = '确认取消屏蔽';

            const subReasonList = document.createElement('ul');
            subReasonList.className = 'block-dialog-reasons';
            const subReasonLabelTexts = [];
            selectedReasons.forEach(reason => {
                const { label: reasonLabel, value: reasonValue } = getBlockReasonLabelValue(reason);
                subReasonLabelTexts.push(reasonLabel);
                const item = document.createElement('li');
                const line = document.createElement('div');
                line.className = 'block-dialog-reason-line';
                const labelText = document.createElement('span');
                labelText.className = 'block-dialog-reason-label';
                labelText.textContent = reasonLabel;
                const valueText = document.createElement('span');
                valueText.className = 'block-dialog-reason-value';
                valueText.textContent = reasonValue;
                line.appendChild(labelText);
                line.appendChild(valueText);
                item.appendChild(line);
                subReasonList.appendChild(item);
            });
            if (subReasonLabelTexts.length > 0) {
                const longest = Math.max(...subReasonLabelTexts.map(text => text.length));
                const widthEm = Math.max(3, longest + 0.5);
                subDialog.style.setProperty('--block-dialog-reason-label-width', `${widthEm}em`);
            }

            const subActions = document.createElement('div');
            subActions.className = 'block-dialog-actions';

            const subConfirmButton = document.createElement('button');
            subConfirmButton.type = 'button';
            subConfirmButton.className = 'block-dialog-confirm';
            subConfirmButton.textContent = '确认取消屏蔽';
            subConfirmButton.addEventListener('click', () => {
                applyUnblockFromReasons(selectedReasons);
                closeBlockedItemDialog();
            });

            const subCancelButton = document.createElement('button');
            subCancelButton.type = 'button';
            subCancelButton.className = 'block-dialog-cancel';
            subCancelButton.textContent = '取消';
            subCancelButton.addEventListener('click', () => closeBlockedItemSubDialog());

            subActions.appendChild(subConfirmButton);
            subActions.appendChild(subCancelButton);

            subDialog.appendChild(subTitle);
            subDialog.appendChild(subReasonList);
            subDialog.appendChild(subActions);

            subOverlay.appendChild(subDialog);
            overlay.appendChild(subOverlay);

            subConfirmButton.focus();
        });

        const updateConfirmButtonState = () => {
            confirmButton.disabled = getSelectedReasons().length === 0;
        };
        reasonList.addEventListener('change', updateConfirmButtonState);
        updateConfirmButtonState();

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.className = 'block-dialog-cancel';
        cancelButton.textContent = '取消';
        cancelButton.addEventListener('click', () => closeBlockedItemDialog());

        actions.appendChild(confirmButton);
        actions.appendChild(cancelButton);

        dialog.appendChild(title);
        dialog.appendChild(divider);
        dialog.appendChild(summary);
        dialog.appendChild(reasonList);
        dialog.appendChild(actions);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        blockDialogEscapeHandler = (event) => {
            if (event.key === 'Escape') {
                if (closeBlockedItemSubDialog()) return;
                closeBlockedItemDialog();
            }
        };
        document.addEventListener('keydown', blockDialogEscapeHandler);
        confirmButton.focus();
    }

    function closeBlockedItemSubDialog() {
        const overlay = document.getElementById(BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID);
        if (!overlay) return false;
        overlay.remove();
        const mainOverlay = document.getElementById(BLOCK_ACTION_DIALOG_OVERLAY_ID);
        if (mainOverlay) {
            mainOverlay.classList.remove('has-sub-dialog');
        }
        return true;
    }

    function closeBlockedItemDialog() {
        closeBlockedItemSubDialog();
        const overlay = document.getElementById(BLOCK_ACTION_DIALOG_OVERLAY_ID);
        if (overlay) overlay.remove();
        if (blockDialogEscapeHandler) {
            document.removeEventListener('keydown', blockDialogEscapeHandler);
            blockDialogEscapeHandler = null;
        }
        if (blockDialogSavedBodyOverflow !== null) {
            document.body.style.overflow = blockDialogSavedBodyOverflow;
            blockDialogSavedBodyOverflow = null;
        }
        if (blockDialogSavedHtmlOverflow !== null) {
            document.documentElement.style.overflow = blockDialogSavedHtmlOverflow;
            blockDialogSavedHtmlOverflow = null;
        }
        blockDialogSelectedText = '';
    }

    // ================================
    // ========== 辅助工具方法 =========
    // ================================

    function showNotification(message, type = 'success') {
        const notificationPanel = document.getElementById('notificationPanel');
        if (!notificationPanel) return;

        notificationPanel.textContent = message;
        notificationPanel.className = 'show';

        switch (type) {
            case 'success':
                notificationPanel.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notificationPanel.style.backgroundColor = '#dc3545';
                break;
            case 'info':
                notificationPanel.style.backgroundColor = '#17a2b8';
                break;
        }

        setTimeout(() => {
            notificationPanel.className = '';
        }, 3000);
    }

    // ================================
    // ========== 设置相关方法 =========
    // ================================

    function normalizeRegexEntries(rawList) {
        if (!Array.isArray(rawList)) return [];
        return rawList
            .map(item => {
                if (typeof item === 'string') {
                    return { pattern: item, note: '' };
                }
                if (item && typeof item === 'object') {
                    const pattern = typeof item.pattern === 'string'
                        ? item.pattern
                        : (typeof item.value === 'string' ? item.value : '');
                    const note = typeof item.note === 'string' ? item.note : '';
                    if (!pattern) return null;
                    return { pattern, note };
                }
                return null;
            })
            .filter(Boolean);
    }

    function collectRegexEntries(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll('.regex-input'))
            .map(group => {
                const pattern = group.querySelector('.regex-text')?.value || '';
                const note = group.querySelector('.regex-note')?.value || '';
                const trimmedPattern = pattern.trim();
                if (!trimmedPattern) return null;
                return { pattern: trimmedPattern, note: note.trim() };
            })
            .filter(Boolean);
    }

    function compileRegexEntries(entries, { strict = false } = {}) {
        const compiled = [];
        for (const entry of entries) {
            if (!entry || !entry.pattern) continue;
            try {
                compiled.push(new RegExp(entry.pattern));
            } catch (error) {
                if (strict) {
                    throw error;
                }
                console.warn('忽略无效正则表达式:', entry.pattern, error);
            }
        }
        return compiled;
    }

    function getRegexEntriesByType(type) {
        switch (type) {
            case 'title':
                return titleRegexEntries;
            case 'category':
                return categoryRegexEntries;
            case 'tag':
                return tagRegexEntries;
            default:
                return [];
        }
    }

    function setRegexEntriesByType(type, entries, compiledList) {
        switch (type) {
            case 'title':
                titleRegexEntries = entries;
                titleRegexList = compiledList;
                break;
            case 'category':
                categoryRegexEntries = entries;
                categoryRegexList = compiledList;
                break;
            case 'tag':
                tagRegexEntries = entries;
                tagRegexList = compiledList;
                break;
        }
    }

    function loadSettings() {
        console.log('Loading settings...');
        blockedTitles = GM_getValue('blockedTitles', []);
        blockedCategories = GM_getValue('blockedCategories', []);
        blockedTtags = GM_getValue('blockedTtags', []);

        blockedTitles = Array.isArray(blockedTitles) ? blockedTitles : [];
        blockedCategories = Array.isArray(blockedCategories) ? blockedCategories : [];
        blockedTtags = Array.isArray(blockedTtags) ? blockedTtags : [];
        summaryScriptEnabled = GM_getValue(SUMMARY_SCRIPT_ENABLED_KEY, true);
        summaryScriptEnabled = summaryScriptEnabled !== false;

        try {
            titleRegexEntries = normalizeRegexEntries(GM_getValue('titleRegexList', []));
            categoryRegexEntries = normalizeRegexEntries(GM_getValue('categoryRegexList', []));
            tagRegexEntries = normalizeRegexEntries(GM_getValue('tagRegexList', []));

            titleRegexList = compileRegexEntries(titleRegexEntries);
            categoryRegexList = compileRegexEntries(categoryRegexEntries);
            tagRegexList = compileRegexEntries(tagRegexEntries);
        } catch (error) {
            console.error('Error loading regex patterns:', error);
            titleRegexList = [];
            categoryRegexList = [];
            tagRegexList = [];
            titleRegexEntries = [];
            categoryRegexEntries = [];
            tagRegexEntries = [];
        }

        console.log('Loaded blocked titles:', blockedTitles);
        console.log('Loaded blocked categories:', blockedCategories);
        console.log('Loaded blocked ttags:', blockedTtags);
        console.log('Loaded title regex:', titleRegexEntries);
        console.log('Loaded category regex:', categoryRegexEntries);
        console.log('Loaded tag regex:', tagRegexEntries);
    }

    function saveRegexSettings(type) {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return;

        const entries = collectRegexEntries(container);

        try {
            const compiledRegexList = compileRegexEntries(entries, { strict: true });
            setRegexEntriesByType(type, entries, compiledRegexList);

            switch(type) {
                case 'title':
                    GM_setValue('titleRegexList', entries);
                    break;
                case 'category':
                    GM_setValue('categoryRegexList', entries);
                    break;
                case 'tag':
                    GM_setValue('tagRegexList', entries);
                    break;
            }

            resetAndReapplyFilter();
            showNotification('正则表达式设置已保存！', 'success');
        } catch (error) {
            console.error('保存正则表达式时发生错误:', error);
            showNotification('保存正则表达式时发生错误！', 'error');
        }
    }

    function saveTitleKeywords() {
        let hasChanges = false;
        let errorOccurred = false;

        try {
            const titlesElement = document.getElementById('titles');
            if (titlesElement) {
                let newBlockedTitles = titlesElement.value
                    .split(',')
                    .map(title => title.trim())
                    .filter(Boolean);

                if (JSON.stringify(newBlockedTitles) !== JSON.stringify(blockedTitles)) {
                    blockedTitles = newBlockedTitles;
                    GM_setValue('blockedTitles', blockedTitles);
                    hasChanges = true;
                }
            }

            const container = document.getElementById('titleRegexContainer');
            if (container) {
                const entries = collectRegexEntries(container);
                const currentEntries = titleRegexEntries.map(entry => ({
                    pattern: entry.pattern,
                    note: entry.note
                }));

                if (JSON.stringify(entries) !== JSON.stringify(currentEntries)) {
                    const compiledRegexList = compileRegexEntries(entries, { strict: true });
                    titleRegexEntries = entries;
                    titleRegexList = compiledRegexList;
                    GM_setValue('titleRegexList', entries);
                    hasChanges = true;
                }
            }
        } catch (error) {
            console.error("保存标题关键词时发生错误:", error);
            errorOccurred = true;
        }

        if (errorOccurred) {
            showNotification('保存标题关键词时发生错误，请重试！', 'error');
        } else if (hasChanges) {
            loadSettings();
            resetAndReapplyFilter();
            showNotification('标题关键词已成功更新！', 'success');
        } else {
            showNotification('标题关键词无变化！', 'info');
        }
    }

    function saveCategories() {
        let hasChanges = false;
        let errorOccurred = false;

        try {
            const categoriesElement = document.getElementById('categories');
            if (categoriesElement) {
                let newBlockedCategories = categoriesElement.value
                    .split(',')
                    .map(category => category.trim())
                    .filter(Boolean);

                if (JSON.stringify(newBlockedCategories) !== JSON.stringify(blockedCategories)) {
                    blockedCategories = newBlockedCategories;
                    GM_setValue('blockedCategories', blockedCategories);
                    hasChanges = true;
                }
            }

            const container = document.getElementById('categoryRegexContainer');
            if (container) {
                const entries = collectRegexEntries(container);
                const currentEntries = categoryRegexEntries.map(entry => ({
                    pattern: entry.pattern,
                    note: entry.note
                }));

                if (JSON.stringify(entries) !== JSON.stringify(currentEntries)) {
                    const compiledRegexList = compileRegexEntries(entries, { strict: true });
                    categoryRegexEntries = entries;
                    categoryRegexList = compiledRegexList;
                    GM_setValue('categoryRegexList', entries);
                    hasChanges = true;
                }
            }
        } catch (error) {
            console.error("保存类别时发生错误:", error);
            errorOccurred = true;
        }

        if (errorOccurred) {
            showNotification('保存类别时发生错误，请重试！', 'error');
        } else if (hasChanges) {
            loadSettings();
            resetAndReapplyFilter();
            showNotification('类别已成功更新！', 'success');
        } else {
            showNotification('类别无变化！', 'info');
        }
    }

    function saveTtags() {
        let hasChanges = false;
        let errorOccurred = false;

        try {
            const tagsElement = document.getElementById('ttags');
            if (tagsElement) {
                let newBlockedTtags = tagsElement.value
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(Boolean);

                if (JSON.stringify(newBlockedTtags) !== JSON.stringify(blockedTtags)) {
                    blockedTtags = newBlockedTtags;
                    GM_setValue('blockedTtags', blockedTtags);
                    hasChanges = true;
                }
            }

            const container = document.getElementById('tagRegexContainer');
            if (container) {
                const entries = collectRegexEntries(container);
                const currentEntries = tagRegexEntries.map(entry => ({
                    pattern: entry.pattern,
                    note: entry.note
                }));

                if (JSON.stringify(entries) !== JSON.stringify(currentEntries)) {
                    const compiledRegexList = compileRegexEntries(entries, { strict: true });
                    tagRegexEntries = entries;
                    tagRegexList = compiledRegexList;
                    GM_setValue('tagRegexList', entries);
                    hasChanges = true;
                }
            }
        } catch (error) {
            console.error("保存标签时发生错误:", error);
            errorOccurred = true;
        }

        if (errorOccurred) {
            showNotification('保存标签时发生错误，请重试！', 'error');
        } else if (hasChanges) {
            loadSettings();
            resetAndReapplyFilter();
            showNotification('标签已成功更新！', 'success');
        } else {
            showNotification('标签无变化！', 'info');
        }
    }

    function saveOtherSettings() {
        const toggle = document.getElementById('summaryScriptEnabledToggle');
        if (!toggle) return;
        const nextValue = Boolean(toggle.checked);
        if (nextValue === summaryScriptEnabled) {
            showNotification('设置无变化！', 'info');
            return;
        }
        summaryScriptEnabled = nextValue;
        GM_setValue(SUMMARY_SCRIPT_ENABLED_KEY, nextValue);
        resetAndReapplyFilter();
        showNotification('设置已保存！', 'success');
    }

    // ================================
    // ========== 导入/导出相关 =========
    // ================================

    function exportSettings() {
        const settings = {
            blockedTitles: GM_getValue('blockedTitles', []),
            blockedCategories: GM_getValue('blockedCategories', []),
            blockedTtags: GM_getValue('blockedTtags', []),
            titleRegexList: GM_getValue('titleRegexList', []),
            categoryRegexList: GM_getValue('categoryRegexList', []),
            tagRegexList: GM_getValue('tagRegexList', []),
            summaryScriptEnabled: GM_getValue(SUMMARY_SCRIPT_ENABLED_KEY, true) !== false
        };

        const blob = new Blob([JSON.stringify(settings, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'linux_do_content_filter_settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('设置已成功导出！', 'success');
    }

    function importSettings(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const settings = JSON.parse(e.target.result);
                GM_setValue('blockedTitles', settings.blockedTitles || []);
                GM_setValue('blockedCategories', settings.blockedCategories || []);
                GM_setValue('blockedTtags', settings.blockedTtags || []);
                GM_setValue('titleRegexList', settings.titleRegexList || []);
                GM_setValue('categoryRegexList', settings.categoryRegexList || []);
                GM_setValue('tagRegexList', settings.tagRegexList || []);
                GM_setValue(SUMMARY_SCRIPT_ENABLED_KEY, settings.summaryScriptEnabled !== false);

                loadSettings();
                resetAndReapplyFilter();
                showNotification('设置已成功导入！', 'success');

                const dialog = document.getElementById('settingsDialog');
                if (dialog) {
                    document.getElementById('titles').value = blockedTitles.join(', ');
                    document.getElementById('categories').value = blockedCategories.join(', ');
                    document.getElementById('ttags').value = blockedTtags.join(', ');
                    initRegexInputs('title');
                    initRegexInputs('category');
                    initRegexInputs('tag');
                    const summaryToggle = dialog.querySelector('#summaryScriptEnabledToggle');
                    if (summaryToggle) summaryToggle.checked = summaryScriptEnabled;
                }
            } catch (error) {
                console.error('导入设置时发生错误:', error);
                showNotification('导入设置失败，请检查文件格式！', 'error');
            }
        };
        reader.readAsText(file);
    }

    // ================================
    // ========== 过滤逻辑核心 =========
    // ================================

    function shouldBlockTitle(title) {
        if (!title) return false;
        const lowerTitle = title.toLowerCase();
        return blockedTitles.some(keyword => lowerTitle.includes(keyword.toLowerCase())) ||
               titleRegexList.some(regex => regex && regex.test(title));
    }

    function shouldBlockCategory(category) {
        if (!category) return false;
        return blockedCategories.includes(category) ||
               categoryRegexList.some(regex => regex && regex.test(category));
    }

    function shouldBlockTag(tag) {
        if (!tag) return false;
        return blockedTtags.includes(tag) ||
               tagRegexList.some(regex => regex && regex.test(tag));
    }

    function applyBlockedState(elem, shouldBlock, reasons = []) {
        if (!elem) return false;

        if (!shouldBlock) {
            elem.classList.remove(BLOCKED_ITEM_CLASS, BLOCKED_REVEALED_CLASS, BLOCK_ACTION_ITEM_CLASS);
            unhideElement(elem);
            setBlockReasons(elem, []);
            return false;
        }

        elem.classList.add(BLOCKED_ITEM_CLASS, BLOCK_ACTION_ITEM_CLASS);
        setBlockReasons(elem, reasons);

        if (revealBlockedResults) {
            elem.classList.add(BLOCKED_REVEALED_CLASS);
            unhideElement(elem);
        } else {
            elem.classList.remove(BLOCKED_REVEALED_CLASS);
            softHideElement(elem);
            if (blockActionFloatingItem === elem) {
                hideBlockActionButton();
            }
        }

        return true;
    }

    function setBlockReasons(elem, reasons) {
        if (!elem) return;
        if (Array.isArray(reasons) && reasons.length > 0) {
            elem.dataset[BLOCK_ACTION_REASON_DATA] = JSON.stringify(reasons);
        } else {
            delete elem.dataset[BLOCK_ACTION_REASON_DATA];
        }
    }

    function getBlockReasonsFromElement(elem) {
        if (!elem) return [];
        const raw = elem.dataset[BLOCK_ACTION_REASON_DATA];
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('解析屏蔽原因失败:', error);
            return [];
        }
    }

    function dedupeBlockReasons(reasons) {
        if (!Array.isArray(reasons)) return [];
        const seen = new Set();
        return reasons.filter(reason => {
            if (!reason || !reason.kind) return false;
            const key = [
                reason.kind,
                reason.value || '',
                reason.pattern || '',
                reason.note || '',
                reason.tag || '',
                Array.isArray(reason.values) ? reason.values.join(',') : ''
            ].join('|');
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    function findMatchingRegexEntries(entries, value) {
        if (!value || !Array.isArray(entries)) return [];
        const matches = [];
        entries.forEach(entry => {
            if (!entry || !entry.pattern) return;
            try {
                const regex = new RegExp(entry.pattern);
                if (regex.test(value)) {
                    matches.push(entry);
                }
            } catch (error) {
                console.warn('忽略无效正则表达式:', entry.pattern, error);
            }
        });
        return matches;
    }

    function getBlockReasonsForTopicItem(categoryElement, tagElement, titleElement) {
        const reasons = [];

        const categoryText = categoryElement?.textContent?.trim();
        if (categoryText) {
            if (blockedCategories.includes(categoryText)) {
                reasons.push({ kind: 'category_keyword', value: categoryText });
            }
            const categoryMatches = findMatchingRegexEntries(categoryRegexEntries, categoryText);
            categoryMatches.forEach(entry => {
                reasons.push({
                    kind: 'category_regex',
                    value: categoryText,
                    pattern: entry.pattern,
                    note: entry.note || ''
                });
            });
        }

        if (tagElement) {
            const tags = Array.from(tagElement.querySelectorAll('a'))
                .map(t => t.textContent.trim())
                .filter(Boolean);
            tags.forEach(tag => {
                if (blockedTtags.includes(tag)) {
                    reasons.push({ kind: 'tag_keyword', value: tag });
                }
                const tagMatches = findMatchingRegexEntries(tagRegexEntries, tag);
                tagMatches.forEach(entry => {
                    reasons.push({
                        kind: 'tag_regex',
                        value: tag,
                        pattern: entry.pattern,
                        note: entry.note || ''
                    });
                });
            });
        }

        const titleText = titleElement?.textContent || '';
        if (titleText) {
            const lowerTitle = titleText.toLowerCase();
            blockedTitles.forEach(keyword => {
                if (keyword && lowerTitle.includes(keyword.toLowerCase())) {
                    reasons.push({ kind: 'title_keyword', value: keyword });
                }
            });
            const titleMatches = findMatchingRegexEntries(titleRegexEntries, titleText);
            titleMatches.forEach(entry => {
                reasons.push({
                    kind: 'title_regex',
                    pattern: entry.pattern,
                    note: entry.note || ''
                });
            });
        }

        return dedupeBlockReasons(reasons);
    }

    function getSearchFilterBlockReasons(raw, normalized, { blacklistArray, whitelistArray, regexArray }) {
        if (!raw) return [];
        const reasons = [];

        if (blacklistArray.length > 0) {
            for (const kw of blacklistArray) {
                if (matchesKeyword(normalized, kw)) {
                    reasons.push({ kind: 'search_blacklist', value: kw });
                }
            }
        }

        if (regexArray.length > 0) {
            for (const pattern of regexArray) {
                if (matchesRegex(raw, pattern)) {
                    reasons.push({ kind: 'search_regex', pattern });
                }
            }
        }

        if (whitelistArray.length > 0) {
            let containsWhitelist = false;
            for (const kw of whitelistArray) {
                if (matchesKeyword(normalized, kw)) {
                    containsWhitelist = true;
                    break;
                }
            }
            if (!containsWhitelist) {
                reasons.push({ kind: 'search_whitelist_missing', values: whitelistArray });
            }
        }

        return dedupeBlockReasons(reasons);
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

        reasonList.forEach(reason => {
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
            }
        });

        let changed = false;
        let updatedTitles = false;
        let updatedCategories = false;
        let updatedTags = false;
        let updatedTitleRegex = false;
        let updatedCategoryRegex = false;
        let updatedTagRegex = false;
        let updatedSearchFilter = false;

        if (removeTitleKeywords.size > 0) {
            const lowerSet = new Set(Array.from(removeTitleKeywords).map(item => item.toLowerCase()));
            const next = blockedTitles.filter(item => !lowerSet.has(String(item).toLowerCase()));
            if (next.length !== blockedTitles.length) {
                blockedTitles = next;
                GM_setValue('blockedTitles', blockedTitles);
                updatedTitles = true;
                changed = true;
            }
        }

        if (removeCategoryKeywords.size > 0) {
            const next = blockedCategories.filter(item => !removeCategoryKeywords.has(item));
            if (next.length !== blockedCategories.length) {
                blockedCategories = next;
                GM_setValue('blockedCategories', blockedCategories);
                updatedCategories = true;
                changed = true;
            }
        }

        if (removeTagKeywords.size > 0) {
            const next = blockedTtags.filter(item => !removeTagKeywords.has(item));
            if (next.length !== blockedTtags.length) {
                blockedTtags = next;
                GM_setValue('blockedTtags', blockedTtags);
                updatedTags = true;
                changed = true;
            }
        }

        if (removeTitleRegex.size > 0) {
            const nextEntries = titleRegexEntries.filter(entry => !removeTitleRegex.has(entry.pattern));
            if (nextEntries.length !== titleRegexEntries.length) {
                titleRegexEntries = nextEntries;
                titleRegexList = compileRegexEntries(titleRegexEntries);
                GM_setValue('titleRegexList', titleRegexEntries);
                updatedTitleRegex = true;
                changed = true;
            }
        }

        if (removeCategoryRegex.size > 0) {
            const nextEntries = categoryRegexEntries.filter(entry => !removeCategoryRegex.has(entry.pattern));
            if (nextEntries.length !== categoryRegexEntries.length) {
                categoryRegexEntries = nextEntries;
                categoryRegexList = compileRegexEntries(categoryRegexEntries);
                GM_setValue('categoryRegexList', categoryRegexEntries);
                updatedCategoryRegex = true;
                changed = true;
            }
        }

        if (removeTagRegex.size > 0) {
            const nextEntries = tagRegexEntries.filter(entry => !removeTagRegex.has(entry.pattern));
            if (nextEntries.length !== tagRegexEntries.length) {
                tagRegexEntries = nextEntries;
                tagRegexList = compileRegexEntries(tagRegexEntries);
                GM_setValue('tagRegexList', tagRegexEntries);
                updatedTagRegex = true;
                changed = true;
            }
        }

        if (removeSearchBlacklist.size > 0 || removeSearchRegex.size > 0 || clearSearchWhitelist) {
            const searchTerm = getCurrentSearchTerm();
            if (searchTerm) {
                const current = getSearchFilterKeywords(searchTerm);
                const originalBlacklistArray = current.blacklist
                    ? current.blacklist.split(',').map(item => item.trim()).filter(Boolean)
                    : [];
                const originalRegexArray = current.regex
                    ? current.regex.split('\n').map(item => item.trim()).filter(Boolean)
                    : [];
                const originalWhitelist = (current.whitelist || '').trim();

                const blacklistLowerSet = new Set(Array.from(removeSearchBlacklist).map(item => item.toLowerCase()));
                const nextBlacklistArray = originalBlacklistArray.filter(item => !blacklistLowerSet.has(item.toLowerCase()));
                const regexSet = new Set(removeSearchRegex);
                const nextRegexArray = originalRegexArray.filter(pattern => !regexSet.has(pattern));
                const nextWhitelist = clearSearchWhitelist ? '' : originalWhitelist;

                const normalizedOriginalBlacklist = originalBlacklistArray.join(', ');
                const normalizedOriginalRegex = originalRegexArray.join('\n');
                const nextBlacklist = nextBlacklistArray.join(', ');
                const nextRegex = nextRegexArray.join('\n');

                if (nextBlacklist !== normalizedOriginalBlacklist ||
                    nextRegex !== normalizedOriginalRegex ||
                    nextWhitelist !== originalWhitelist) {
                    saveSearchFilterKeywords(searchTerm, nextBlacklist, nextWhitelist, nextRegex);
                    updatedSearchFilter = true;
                    changed = true;
                }
            }
        }

        if (changed) {
            const dialog = document.getElementById('settingsDialog');
            if (dialog) {
                if (updatedTitles) {
                    const titlesField = dialog.querySelector('#titles');
                    if (titlesField) titlesField.value = blockedTitles.join(', ');
                }
                if (updatedCategories) {
                    const categoriesField = dialog.querySelector('#categories');
                    if (categoriesField) categoriesField.value = blockedCategories.join(', ');
                }
                if (updatedTags) {
                    const tagsField = dialog.querySelector('#ttags');
                    if (tagsField) tagsField.value = blockedTtags.join(', ');
                }
                if (updatedTitleRegex) initRegexInputs('title');
                if (updatedCategoryRegex) initRegexInputs('category');
                if (updatedTagRegex) initRegexInputs('tag');
                if (updatedTitleRegex || updatedCategoryRegex || updatedTagRegex) {
                    updateRegexFloatingButton(dialog);
                    requestAnimationFrame(() => refreshVisibleRegexHeights(dialog));
                }
            }

            if (updatedSearchFilter) {
                lastSyncedSearchTerm = null;
            }

            resetAndReapplyFilter();
        }

        return changed;
    }

    function filterPosts() {
        const rows = document.querySelectorAll('tr.topic-list-item');
        let blockedCount = 0;

        rows.forEach(row => {
            const categoryElement = row.querySelector('div.link-bottom-line a.badge-category__wrapper span.badge-category__name');
            const tagElement = row.querySelector('div.link-bottom-line .discourse-tags');
            const titleElement = row.querySelector('a.title');
            const reasons = getBlockReasonsForTopicItem(categoryElement, tagElement, titleElement);
            const shouldBlock = reasons.length > 0;

            if (applyBlockedState(row, shouldBlock, reasons)) {
                blockedCount += 1;
            }
            ensureBlockActionButton(row);
        });

        updateBlockToggleUI(blockedCount);
    }

    function filterSearchResults() {
        const searchTerm = getCurrentSearchTerm();
        const keywordConfig = getSearchFilterKeywords(searchTerm);
        const parsed = parseSearchFilterKeywords(keywordConfig);
        const hasSearchFilter = parsed.blacklistArray.length > 0 || parsed.whitelistArray.length > 0 || parsed.regexArray.length > 0;

        const results = document.querySelectorAll('.fps-result');
        let blockedCount = 0;

        results.forEach(result => {
            let reasons = [];
            if (hasSearchFilter) {
                const titleElement = result.querySelector('.topic-title');
                const { raw, normalized } = getSearchResultText(result, titleElement);
                reasons = getSearchFilterBlockReasons(raw, normalized, parsed);
            }
            const shouldBlock = reasons.length > 0;

            if (applyBlockedState(result, shouldBlock, reasons)) {
                blockedCount += 1;
            }
            ensureBlockActionButton(result);
        });

        updateBlockToggleUI(blockedCount);
    }

    function filterContent() {
        if (isSearchPage()) {
            ensureSearchFilterUI();
            syncSearchFilterUIForCurrentTerm();
            filterSearchResults();
        } else {
            removeSearchFilterUI();
            filterPosts();
        }
    }

    function ensureContentFilterHook() {
        if (typeof window.triggerContentFilter !== 'function') {
            window.triggerContentFilter = () => {
                waitForSummaryReady().then(() => {
                    filterContent();
                });
            };
        }
    }

    function resetAndReapplyFilter() {
        document.querySelectorAll('tr.topic-list-item').forEach(row => {
            unhideElement(row);
        });
        document.querySelectorAll('.fps-result').forEach(result => {
            unhideElement(result);
        });
        waitForSummaryReady().then(() => {
            filterContent();
        });
    }

    // ================================
    // ========== UI & 事件部分 ========
    // ================================

    function getActiveRegexType(dialog) {
        if (!dialog) return null;
        const activeContent = dialog.querySelector('.settings-content.active');
        if (!activeContent) return null;
        const activeSubcontent = activeContent.querySelector('.settings-subcontent.active[data-subcontent^="regex-"]');
        if (!activeSubcontent) return null;
        const key = activeSubcontent.dataset.subcontent || '';
        return regexSubcontentTypeMap[key] || null;
    }

    function refreshVisibleRegexHeights(dialog) {
        const root = dialog || document;
        const activeContent = root.querySelector('.settings-content.active');
        if (!activeContent) return;
        const activeSubcontent = activeContent.querySelector('.settings-subcontent.active[data-subcontent^="regex-"]');
        if (!activeSubcontent) return;
        activeSubcontent.querySelectorAll('.regex-text').forEach(tex => {
            adjustRegexTextareaHeight(tex);
        });
    }

    function positionRegexFloatingButton() {
        if (!regexFloatingButton || !regexFloatingButtonDialog) return;
        const rect = regexFloatingButtonDialog.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const offsetX = 35;
        const offsetY = 24;
        regexFloatingButton.style.left = `${Math.round(rect.right - offsetX)}px`;
        regexFloatingButton.style.top = `${Math.round(rect.bottom - offsetY)}px`;
        regexFloatingButton.style.transform = 'translate(-100%, -100%)';
    }

    function ensureRegexFloatingButton(dialog) {
        if (regexFloatingButton && regexFloatingButtonDialog === dialog) return;
        cleanupRegexFloatingButton();
        if (!dialog) return;

        regexFloatingButtonDialog = dialog;
        regexFloatingButtonDialog.classList.add('regex-fab-enabled');

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'regex-floating-add';
        button.textContent = '新增规则';
        button.addEventListener('click', () => {
            const type = getActiveRegexType(regexFloatingButtonDialog);
            if (!type) return;
            addRegexInput(type);
            requestAnimationFrame(positionRegexFloatingButton);
        });

        regexFloatingButton = button;
        document.body.appendChild(button);

        regexFloatingButtonResizeHandler = () => {
            positionRegexFloatingButton();
        };
        window.addEventListener('resize', regexFloatingButtonResizeHandler);
    }

    function updateRegexFloatingButton(dialog) {
        if (!dialog) {
            cleanupRegexFloatingButton();
            return;
        }
        ensureRegexFloatingButton(dialog);
        if (!regexFloatingButton) return;
        const type = getActiveRegexType(dialog);
        if (!type) {
            regexFloatingButton.style.display = 'none';
            return;
        }
        regexFloatingButton.style.display = 'block';
        positionRegexFloatingButton();
    }

    function cleanupRegexFloatingButton() {
        if (regexFloatingButton) {
            regexFloatingButton.remove();
            regexFloatingButton = null;
        }
        if (regexFloatingButtonResizeHandler) {
            window.removeEventListener('resize', regexFloatingButtonResizeHandler);
            regexFloatingButtonResizeHandler = null;
        }
        if (regexFloatingButtonDialog) {
            regexFloatingButtonDialog.classList.remove('regex-fab-enabled');
            regexFloatingButtonDialog = null;
        }
    }

    function showSettingsDialog() {
        loadSettings();
        if (savedBodyOverflow === null) {
            savedBodyOverflow = document.body.style.overflow;
        }
        if (savedHtmlOverflow === null) {
            savedHtmlOverflow = document.documentElement.style.overflow;
        }
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        const overlay = document.createElement('div');
        overlay.id = 'settingsOverlay';
        document.body.appendChild(overlay);

        const dialog = document.createElement('div');
        dialog.id = 'settingsDialog';
        dialog.innerHTML = `
            <div class="settings-header">
                <h2>⚙️ 屏蔽设置</h2>
                <button id="closeDialog">&times;</button>
                <div class="settings-tabs">
                    <div class="settings-tab active" data-tab="titles">标题关键词</div>
                    <div class="settings-tab" data-tab="categories">类别</div>
                    <div class="settings-tab" data-tab="ttags">标签</div>
                    <div class="settings-tab" data-tab="other">...</div>
                    <div class="settings-tab" data-tab="importExport">同步</div>
                </div>
            </div>
            <div class="settings-body">
            <div class="settings-content active" data-content="titles">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-titles">关键词</div>
                    <div class="settings-subtab" data-subtab="regex-titles">正则表达式</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-titles">
                    <label for="titles">🚫 屏蔽的标题关键词（逗号分隔）：</label>
                    <textarea id="titles">${blockedTitles.join(', ')}</textarea>
                    <button id="saveTitleKeywords" class="actionButton saveButton">保存设置</button>
                </div>
            <div class="settings-subcontent" data-subcontent="regex-titles">
                <label>🔍 标题关键词过滤规则:</label>
                <div id="titleRegexContainer"></div>
                <div class="regex-add-wrapper">
                    <button id="addTitleRegex" class="actionButton regex-add-button">新增规则</button>
                </div>
                <div class="regex-help">
                    <p>正则表达式使用说明：</p>
                    <ul>
                        <li>使用 <code>^</code> 匹配行首，<code>$</code> 匹配行尾</li>
                            <li>使用 <code>.</code> 匹配任意字符，<code>*</code> 表示零次或多次匹配</li>
                            <li>使用 <code>[]</code> 匹配字符集，如 <code>[a-z]</code> 匹配小写字母</li>
                            <li>使用 <code>\\b</code> 匹配单词边界</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="settings-content" data-content="categories">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-categories">关键词</div>
                    <div class="settings-subtab" data-subtab="regex-categories">正则表达式</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-categories">
                    <label for="categories">🚫 屏蔽的类别（逗号分隔）：</label>
                    <textarea id="categories">${blockedCategories.join(', ')}</textarea>
                    <button id="saveCategories" class="actionButton saveButton">保存设置</button>
                </div>
            <div class="settings-subcontent" data-subcontent="regex-categories">
                <label>🔍 类别过滤规则:</label>
                <div id="categoryRegexContainer"></div>
                <div class="regex-add-wrapper">
                    <button id="addCategoryRegex" class="actionButton regex-add-button">新增规则</button>
                </div>
                <div class="regex-help">
                    <p>正则表达式使用说明：</p>
                    <ul>
                        <li>使用 <code>^</code> 匹配行首，<code>$</code> 匹配行尾</li>
                            <li>使用 <code>.</code> 匹配任意字符，<code>*</code> 表示零次或多次匹配</li>
                            <li>使用 <code>[]</code> 匹配字符集，如 <code>[a-z]</code> 匹配小写字母</li>
                            <li>使用 <code>\\b</code> 匹配单词边界</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="settings-content" data-content="ttags">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-ttags">关键词</div>
                    <div class="settings-subtab" data-subtab="regex-ttags">正则表达式</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-ttags">
                    <label for="ttags">🚫 屏蔽的标签（逗号分隔）：</label>
                    <textarea id="ttags">${blockedTtags.join(', ')}</textarea>
                    <button id="saveTtags" class="actionButton saveButton">保存设置</button>
                </div>
            <div class="settings-subcontent" data-subcontent="regex-ttags">
                <label>🔍 标签过滤规则:</label>
                <div id="tagRegexContainer"></div>
                <div class="regex-add-wrapper">
                    <button id="addTagRegex" class="actionButton regex-add-button">新增规则</button>
                </div>
                <div class="regex-help">
                    <p>正则表达式使用说明：</p>
                    <ul>
                        <li>使用 <code>^</code> 匹配行首，<code>$</code> 匹配行尾</li>
                            <li>使用 <code>.</code> 匹配任意字符，<code>*</code> 表示零次或多次匹配</li>
                            <li>使用 <code>[]</code> 匹配字符集，如 <code>[a-z]</code> 匹配小写字母</li>
                            <li>使用 <code>\\b</code> 匹配单词边界</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="settings-content" data-content="other">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-other">其他</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-other">
                    <label>
                        <input type="checkbox" id="summaryScriptEnabledToggle" ${summaryScriptEnabled ? 'checked' : ''}>
                        启用总结脚本联动
                    </label>
                    <p class="settings-hint">开启：等待总结按钮出现后再注入屏蔽按钮；关闭：直接注入。</p>
                    <button id="saveOther" class="actionButton saveButton">保存设置</button>
                </div>
            </div>
            <div class="settings-content" data-content="importExport">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="export">导出</div>
                    <div class="settings-subtab" data-subtab="import">导入</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="export">
                    <label>📤 导出脚本配置：</label>
                    <p>选择一个文件夹，存放当前脚本的配置。</p>
                    <button id="exportSettings" class="actionButton saveButton">导出脚本配置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="import">
                    <label>📥 导入脚本配置：</label>
                    <p>选择一个(之前导出的)脚本配置文件，进行导入。</p>
                    <input type="file" id="importSettingsFile" accept=".json" style="display: none;">
                    <button id="importSettings" class="actionButton">导入脚本配置</button>
                </div>
            </div>
            </div>
        `;
        document.body.appendChild(dialog);
        overlay.style.display = 'block';

        const settingsCommaTextareaIds = ['titles', 'categories', 'ttags'];
        settingsCommaTextareaIds.forEach((id) => {
            const textarea = dialog.querySelector(`#${id}`);
            if (!textarea) return;

            textarea.addEventListener('click', () => {
                appendCommaToTextareaIfNeeded(textarea, { appendText: ', ' });
            });

            const label = dialog.querySelector(`label[for="${id}"]`);
            if (label) {
                label.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return;
                    textarea.dataset.linuxdoAppendCommaOnFocus = '1';
                });
            }

            textarea.addEventListener('focus', () => {
                if (textarea.dataset.linuxdoAppendCommaOnFocus !== '1') return;
                delete textarea.dataset.linuxdoAppendCommaOnFocus;
                setTimeout(() => {
                    if (document.activeElement !== textarea) return;
                    const length = textarea.value.length;
                    if (typeof textarea.setSelectionRange === 'function') {
                        textarea.setSelectionRange(length, length);
                    }
                    appendCommaToTextareaIfNeeded(textarea, { force: true, appendText: ', ' });
                }, 0);
            });
        });

        console.log('Displaying blocked categories:', blockedCategories);
        console.log('Displaying blocked tags:', blockedTtags);

        const notificationPanel = document.createElement('div');
        notificationPanel.id = 'notificationPanel';
        document.body.appendChild(notificationPanel);

        document.getElementById('saveTitleKeywords').addEventListener('click', saveTitleKeywords);
        document.getElementById('saveCategories').addEventListener('click', saveCategories);
        document.getElementById('saveTtags').addEventListener('click', saveTtags);
        document.getElementById('saveOther').addEventListener('click', saveOtherSettings);

        document.getElementById('closeDialog').addEventListener('click', closeDialog);

        document.getElementById('exportSettings').addEventListener('click', exportSettings);
        document.getElementById('importSettings').addEventListener('click', () => document.getElementById('importSettingsFile').click());
        document.getElementById('importSettingsFile').addEventListener('change', importSettings);

        initTabSwitching();
        initSubtabSwitching();
        initRegexInputs('title');
        initRegexInputs('category');
        initRegexInputs('tag');

        document.getElementById('addTitleRegex').addEventListener('click', () => addRegexInput('title'));
        document.getElementById('addCategoryRegex').addEventListener('click', () => addRegexInput('category'));
        document.getElementById('addTagRegex').addEventListener('click', () => addRegexInput('tag'));
        updateRegexFloatingButton(dialog);
        requestAnimationFrame(() => refreshVisibleRegexHeights(dialog));
    }

    function closeDialog() {
        const dialog = document.getElementById('settingsDialog');
        const overlay = document.getElementById('settingsOverlay');
        const notificationPanel = document.getElementById('notificationPanel');

        cleanupRegexFloatingButton();
        if (dialog) dialog.remove();
        if (overlay) overlay.remove();
        if (notificationPanel) notificationPanel.remove();
        if (savedBodyOverflow !== null) {
            document.body.style.overflow = savedBodyOverflow;
            savedBodyOverflow = null;
        }
        if (savedHtmlOverflow !== null) {
            document.documentElement.style.overflow = savedHtmlOverflow;
            savedHtmlOverflow = null;
        }
    }

    function initTabSwitching() {
        const tabs = document.querySelectorAll('.settings-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const contents = document.querySelectorAll('.settings-content');
                contents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.content === tab.dataset.tab) {
                        content.classList.add('active');
                    }
                });
                const dialog = document.getElementById('settingsDialog');
                if (dialog) {
                    updateRegexFloatingButton(dialog);
                    requestAnimationFrame(() => refreshVisibleRegexHeights(dialog));
                }
            });
        });
    }

    function initSubtabSwitching() {
        const subtabs = document.querySelectorAll('.settings-subtab');
        subtabs.forEach(subtab => {
            subtab.addEventListener('click', () => {
                const parentContent = subtab.closest('.settings-content');
                const siblingSubtabs = parentContent.querySelectorAll('.settings-subtab');
                siblingSubtabs.forEach(t => t.classList.remove('active'));
                subtab.classList.add('active');
                const subcontents = parentContent.querySelectorAll('.settings-subcontent');
                subcontents.forEach(sc => {
                    sc.classList.remove('active');
                    if (sc.dataset.subcontent === subtab.dataset.subtab) {
                        sc.classList.add('active');
                    }
                });
                const dialog = document.getElementById('settingsDialog');
                if (dialog) {
                    updateRegexFloatingButton(dialog);
                    requestAnimationFrame(() => refreshVisibleRegexHeights(dialog));
                }
            });
        });
    }

    function initRegexInputs(type) {
        const container = document.getElementById(`${type}RegexContainer`);
        const regexEntries = getRegexEntriesByType(type);

        if (!container) return;
        container.innerHTML = '';
        regexEntries.forEach(entry => {
            if (entry && entry.pattern) {
                addRegexInput(type, entry.pattern, entry.note);
            }
        });
    }

    function addRegexInput(type, value = '', note = '') {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return;
        const inputGroup = document.createElement('div');
        inputGroup.className = 'regex-input';
        inputGroup.innerHTML = `
            <div class="regex-note-row">
                <input type="text"
                       class="regex-note"
                       placeholder="备注（可选）"
                       aria-label="备注（可选）">
                <button class="delete-btn" aria-label="删除">🗑️</button>
            </div>
            <div class="regex-text-row">
                <textarea
                  class="regex-text"
                  rows="1"
                  placeholder="输入正则表达式"
                  aria-label="输入正则表达式"
                  spellcheck="false"
                ></textarea>
            </div>
        `;
        const textInput = inputGroup.querySelector('.regex-text');
        const noteInput = inputGroup.querySelector('.regex-note');
        if (textInput) textInput.value = value || '';
        if (noteInput) noteInput.value = note || '';
        setupRegexInputEvents(inputGroup, type);
        container.appendChild(inputGroup);

        setTimeout(() => {
            inputGroup.style.opacity = '1';
            inputGroup.style.transform = 'translateX(0)';
            if (textInput) adjustRegexTextareaHeight(textInput);
            positionRegexFloatingButton();
        }, 10);
    }

    function setupRegexInputEvents(inputGroup, type) {
        const textInput = inputGroup.querySelector('.regex-text');
        const noteInput = inputGroup.querySelector('.regex-note');
        const deleteBtn = inputGroup.querySelector('.delete-btn');

        if (textInput) {
            textInput.addEventListener('input', () => {
                adjustRegexTextareaHeight(textInput);
                validateAndSaveRegex(textInput, type);
            });
        }

        if (noteInput) {
            noteInput.addEventListener('change', () => {
                saveRegexSettings(type);
            });
        }

        deleteBtn.addEventListener('click', () => {
            inputGroup.style.opacity = '0';
            inputGroup.style.transform = 'translateX(20px)';
            setTimeout(() => {
                inputGroup.remove();
                saveRegexSettings(type);
                positionRegexFloatingButton();
            }, 300);
        });
    }

    function validateAndSaveRegex(input, type) {
        removeRegexError(input);
        try {
            if (input.value) {
                new RegExp(input.value);
                input.style.borderColor = '#28a745';
                saveRegexSettings(type);
            } else {
                input.style.borderColor = '#ddd';
            }
        } catch (e) {
            showRegexError(input, '无效的正则表达式');
            input.style.borderColor = '#dc3545';
        }
    }

    function showRegexError(input, message) {
        removeRegexError(input);
        const error = document.createElement('div');
        error.className = 'regex-error';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function removeRegexError(input) {
        const errorElement = input.parentElement.querySelector('.regex-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // ================================
    // ========== 优化：统一观察 =========
    // ================================
    let debounceTimer = null;
    function debounceFilter() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            filterContent();
        }, 100);
    }

    function observeDomChanges() {
        const mainContainer = document.querySelector('#main-outlet') || document.body;
        if (!mainContainer) return;

        const observer = new MutationObserver((mutations) => {
            let foundSignificantChange = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                    foundSignificantChange = true;
                    break;
                }
            }
            if (foundSignificantChange) {
                debounceFilter();
            }
        });

        observer.observe(mainContainer, {
            childList: true,
            subtree: true
        });
    }

    // ================================
    // ========== 核心初始化 ===========
    // ================================
    function init() {
        loadSettings();
        ensureContentFilterHook();
        const startFiltering = () => {
            // 立即尝试过滤一次（可能当前已有页面内容）
            filterContent();
            // 监听 DOM 变动，以后若有新内容出现，马上过滤
            observeDomChanges();
        };
        waitForSummaryReady().then(startFiltering);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 注：以下 popstate/pageshow 在 SPA 下往往不稳定，仅作fallback
    window.addEventListener('popstate', () => {
        console.log('popstate event triggered, re-initializing...');
        init();
    });
    window.addEventListener('pageshow', () => {
        console.log('pageshow event triggered, re-initializing...');
        init();
    });

    // 注册菜单命令，打开设置弹窗
    GM_registerMenuCommand('⚙️ 屏蔽设置', showSettingsDialog);

    // 注入样式
    GM_addStyle(`
        #settingsOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            display: none;
        }
        #settingsDialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 2px solid rgba(137, 207, 240, 0.6);
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            min-width: 500px;
            max-height: 80vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 0 20px 20px;
            color: #333;
        }
        #settingsDialog h2 {
            margin: 0 0 20px 0;
            color: #007bff;
            font-size: 24px;
            text-align: center;
        }
        #settingsDialog textarea {
            width: 100%;
            height: 200px;
            overflow-y: auto;
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            resize: vertical;
            background: white;
            color: #333;
        }
        #settingsDialog button {
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: bold;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        #settingsDialog button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        .actionButton {
            background-color: #007bff;
            position: fixed;
            bottom: 10px;
            right: 40px;
            box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
        }
        .saveButton {
            background-color: #28a745;
        }
        .settings-header {
            position: sticky;
            top: 0;
            z-index: 30;
            background: #ffffff;
            padding: 20px 20px 0;
            margin: 0 -20px 0;
            border-bottom: none;
        }
        .settings-body {
            flex: 1 1 auto;
            overflow-y: auto;
            min-height: 0;
        }
        .settings-subcontent[data-subcontent^="regex-"] {
            padding-bottom: 20px;
        }
        .settings-subcontent[data-subcontent^="regex-"] > div[id$="RegexContainer"] {
            margin-left: -12px;
            margin-right: -12px;
        }
        .settings-subcontent[data-subcontent^="view-"] > textarea {
            width: calc(100% + 24px);
            margin-left: -12px;
            margin-right: -12px;
        }
        #settingsDialog .settings-subcontent[data-subcontent^="view-"] > textarea {
            width: calc(100% + 30px);
            margin-left: -15px;
            margin-right: -15px;
            box-sizing: border-box;
            min-height: 260px;
            height: 260px;
        }
        .regex-help p {
            margin: 0 0 6px;
        }
        .regex-help ul {
            margin: 0;
            padding-left: 18px;
        }
        #settingsDialog.regex-fab-enabled .regex-add-wrapper {
            display: none;
        }
        .regex-add-wrapper {
            display: flex;
            justify-content: flex-end;
            margin-top: 8px;
        }
        .regex-add-wrapper .regex-add-button {
            margin: 0;
        }
        .regex-floating-add {
            position: fixed;
            z-index: 10001;
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #007bff;
            box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
            transition: opacity 0.2s ease;
            display: none;
        }
        .regex-floating-add:hover {
            opacity: 0.92;
        }
        #settingsDialog #closeDialog {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            border: none;
            cursor: pointer;
            padding: 0;
            margin: 0;
            width: 30px;
            height: 30px;
            min-width: 30px;
            min-height: 30px;
            max-width: 30px;
            max-height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-sizing: border-box;
            color: #fff;
            font-size: 0;
            line-height: 0;
            transition: background-color 0.3s ease;
        }
        #settingsDialog #closeDialog::before,
        #settingsDialog #closeDialog::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 2px;
            background: #fff;
            border-radius: 2px;
            transform-origin: center;
        }
        #settingsDialog #closeDialog::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }
        #settingsDialog #closeDialog::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        .settings-tabs {
            display: flex;
            justify-content: space-around;
            margin-bottom: 0;
            border-bottom: 2px solid #e9ecef;
        }
        .settings-tab {
            padding: 10px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            font-size: 16px;
            font-weight: bold;
            color: #495057;
        }
        .settings-tab:hover {
            color: #007bff;
        }
        .settings-tab.active {
            color: #007bff;
            border-bottom-color: #007bff;
        }
        .settings-subtabs {
            display: flex;
            justify-content: flex-start;
        }
        .settings-subtab {
            padding: 6px 12px;
            cursor: pointer;
            border: 1px solid #dee2e6;
            border-radius: 15px;
            transition: all 0.3s ease;
            font-size: 14px;
            margin-right: 10px;
            background-color: #f8f9fa;
        }
        .settings-subtab:hover {
            background-color: #e9ecef;
        }
        .settings-subtab.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
        }
        .settings-subtab.active[data-subtab^="regex-"] {
            background-color: #ffb347;
            border-color: #ffb347;
        }
        .settings-subtab.active[data-subtab="export"] {
            background-color: #28a745;
            border-color: #28a745;
            color: white;
        }
        .settings-content,
        .settings-subcontent {
            display: none;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }
        .settings-content.active,
        .settings-subcontent.active {
            display: block;
        }
        .settings-content label,
        .settings-subcontent label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            color: #495057;
        }
        .settings-content label input[type="checkbox"],
        .settings-subcontent label input[type="checkbox"] {
            margin-right: 8px;
        }
        .settings-hint {
            margin: 0 0 12px;
            font-size: 13px;
            color: #6c757d;
            line-height: 1.5;
        }
        .regex-input {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1px;
            margin-bottom: 15px;
            padding: 8px 12px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.03);
            transition: all 0.3s ease;
        }
        .regex-input:hover {
            background: rgba(0, 0, 0, 0.05);
        }
        #settingsDialog .regex-input .regex-text {
            width: auto;
            flex: 1 1 auto;
            min-width: 0;
            min-height: 36px;
            height: auto;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            line-height: 1.4;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            resize: vertical;
            white-space: pre-wrap;
            word-break: break-all;
            overflow-wrap: anywhere;
            transition: all 0.3s ease;
            margin-bottom: 0;
            overflow-y: hidden;
            box-sizing: border-box;
        }
        #settingsDialog .regex-input .regex-text:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            outline: none;
        }
        #settingsDialog .regex-input .regex-note {
            height: 32px;
            padding: 6px 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 13px;
            transition: all 0.3s ease;
            box-sizing: border-box;
            width: auto;
            flex: 1 1 auto;
            min-width: 0;
        }
        #settingsDialog .regex-input .regex-note:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            outline: none;
        }
        #settingsDialog .regex-input .regex-note-row {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        #settingsDialog .regex-input .regex-text-row {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .regex-input .delete-btn {
            width: 36px;
            height: 36px;
            padding: 0;
            border: 1px solid transparent;
            border-radius: 0;
            background-color: transparent;
            color: #dc3545;
            font-size: 16px;
            line-height: 1;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
        }
        .regex-input .delete-btn:hover {
            border-color: #dc3545;
            transform: translateY(-1px);
        }
        .regex-error {
            color: #dc3545;
            font-size: 12px;
            margin-top: 4px;
        }
        .regex-help {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
        #notificationPanel {
            position: fixed;
            bottom: 15%;
            left: 45%;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        #notificationPanel.show {
            opacity: 1;
            transform: translateY(0);
        }
        @media (prefers-color-scheme: dark) {
            #settingsDialog {
                background: #2c2c2c;
                color: #e0e0e0;
                border-color: rgba(77, 166, 255, 0.6);
            }
            .settings-header {
                background: #2c2c2c;
            }
            .settings-tabs {
                border-bottom-color: rgba(255, 255, 255, 0.12);
            }
            #settingsDialog h2 {
                color: #4da6ff;
            }
            #settingsDialog textarea,
            #settingsDialog input[type="text"] {
                background: #3a3a3a;
                color: #e0e0e0;
                border-color: #555;
            }
            #closeDialog {
                color: black;
            }
            .settings-tab {
                color: #bbb;
            }
            .settings-tab:hover {
                color: #4da6ff;
            }
            .settings-tab.active {
                color: #4da6ff;
                border-bottom-color: #4da6ff;
            }
            .settings-subtab {
                background-color: #3a3a3a;
                border-color: #555;
                color: #e0e0e0;
            }
            .settings-subtab:hover {
                background-color: #4a4a4a;
            }
            .settings-subtab.active {
                background-color: #4da6ff;
                color: #2c2c2c;
            }
            .settings-subtab.active[data-subtab^="regex-"] {
                background-color: #ffb347;
                border-color: #ffb347;
            }
            .settings-subtab.active[data-subtab="export"] {
                background-color: #28a745;
                border-color: #28a745;
                color: #ffffff;
            }
            .settings-content,
            .settings-subcontent {
                background-color: #3a3a3a;
            }
            .settings-content label,
            .settings-subcontent label {
                color: #bbb;
            }
            .regex-help {
                color: #aaa;
            }
            .regex-input {
                background: rgba(255, 255, 255, 0.05);
            }
            .regex-input:hover {
                background: rgba(255, 255, 255, 0.08);
            }
            #settingsDialog .regex-input .regex-text,
            #settingsDialog .regex-input .regex-note {
                background-color: #333;
                border-color: #4a4a4a;
                color: #e0e0e0;
            }
        }
    `);

})();
