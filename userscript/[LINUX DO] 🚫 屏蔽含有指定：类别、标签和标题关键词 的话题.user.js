// ==UserScript==
// @name         [LINUX DO] 🚫 屏蔽含有指定：类别、标签和标题关键词 的话题 [20260104] v1.0.0
// @namespace    https://github.com/0-V-linuxdo/LINUX-DO-Topic-Blocker
// @description  功能：1️⃣自定义配置；2️⃣适配搜索页；3️⃣无需手动刷新，配置更新后立即生效；4️⃣未登录时，屏蔽功能依然有效；5️⃣支持通过文件 导入/导出脚本的全部设置；6️⃣支持正则表达式过滤；[修复]搜索结果页空白
// 
// @version      [20260104] v1.0.0
// @update-log   [20260104] v1.0.0：更新 @namespace 为 GitHub 仓库地址。
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

    // 常用正则表达式预设
    const regexPresets = {
        '1️⃣ 包含 [特定词]': '.*(word1|word2|word3).*',
        '2️⃣ 以 [特定词] 开头': '^(start1|start2|start3)',
        '3️⃣ 以 [特定词] 结尾': '(end1|end2|end3)'
    };

    // 新增 Safari 判断
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // ================================
    // ========== 软隐藏关键逻辑 ========
    // ================================

    function softHideElement(elem) {
        if (!elem) return;

        // 如果是表格行：
        if (elem.tagName === 'TR') {
            if (isSafari) {
                // Safari - 用绝对定位脱离文档流
                elem.style.visibility = 'hidden';
                elem.style.position = 'absolute';
                elem.style.left = '-9999px';
                elem.style.opacity = '0';
                elem.style.height = '0px';
                elem.style.overflow = 'hidden';
            } else {
                // 其他浏览器：使用 visibility: collapse
                elem.style.visibility = 'collapse';
                elem.style.height = '';
                elem.style.overflow = '';
                elem.style.opacity = '';
            }
        } else {
            // [MODIFIED] 非 <tr> 的软隐藏：统一采用绝对定位移除文档流，防止搜索结果页出现空白
            elem.style.visibility = 'hidden';
            elem.style.position = 'absolute';
            elem.style.left = '-9999px';
            elem.style.opacity = '0';
            elem.style.height = '0px';
            elem.style.overflow = 'hidden';
        }
    }

    function unhideElement(elem) {
        if (!elem) return;
        // 恢复样式
        if (elem.tagName === 'TR') {
            if (isSafari) {
                elem.style.visibility = '';
                elem.style.position = '';
                elem.style.left = '';
                elem.style.opacity = '';
                elem.style.height = '';
                elem.style.overflow = '';
            } else {
                elem.style.visibility = '';
            }
        } else {
            elem.style.visibility = '';
            elem.style.position = '';
            elem.style.left = '';
            elem.style.opacity = '';
            elem.style.height = '';
            elem.style.overflow = '';
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

    let lastSyncedSearchTerm = null;

    function isSearchPage() {
        return window.location.pathname.includes('/search');
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

    function shouldHideBySearchFilter(raw, normalized, { blacklistArray, whitelistArray, regexArray }) {
        if (!raw) return false;

        if (blacklistArray.length > 0) {
            for (const kw of blacklistArray) {
                if (matchesKeyword(normalized, kw)) {
                    return true;
                }
            }
        }

        if (regexArray.length > 0) {
            for (const pattern of regexArray) {
                if (matchesRegex(raw, pattern)) {
                    return true;
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
                return true;
            }
        }

        return false;
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

              position: fixed !important;
              top: 92px !important;
              right: 16px !important;
              z-index: 9997 !important;
              pointer-events: auto !important;
              display: flex;
              align-items: flex-start;
              gap: 6px;
              padding: 2px 0;
              box-sizing: border-box;
            }
            @media (prefers-color-scheme: dark) {
              #${SEARCH_FILTER_WRAPPER_ID} {
                --linuxdo-filter-bg-color: #333333;
                --linuxdo-filter-font-color: #ffffff;
                --linuxdo-filter-border-color: rgba(255,255,255,0.12);
                --linuxdo-filter-placeholder-color: rgba(255,255,255,0.4);
                --linuxdo-filter-label-hover-color: #ffe60f;
                --linuxdo-filter-focus-bg-color: #444444;
              }
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
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group:last-child {
                margin-bottom: 0;
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group.regex-group {
                opacity: 0.2;
                transition: opacity 0.3s ease;
            }
            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container:hover .filter-input-group.regex-group,
            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container:focus-within .filter-input-group.regex-group {
                opacity: 1;
            }

            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container {
                display: flex;
                flex-direction: column;
                gap: 2px;
                position: relative;
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
            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container:hover::before,
            #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container:focus-within::before {
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

        lastSyncedSearchTerm = null;
        syncSearchFilterUIForCurrentTerm();

        return true;
    }

    function removeSearchFilterUI() {
        const wrapper = document.getElementById(SEARCH_FILTER_WRAPPER_ID);
        if (wrapper) wrapper.remove();
        lastSyncedSearchTerm = null;
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

    function loadSettings() {
        console.log('Loading settings...');
        blockedTitles = GM_getValue('blockedTitles', []);
        blockedCategories = GM_getValue('blockedCategories', []);
        blockedTtags = GM_getValue('blockedTtags', []);

        blockedTitles = Array.isArray(blockedTitles) ? blockedTitles : [];
        blockedCategories = Array.isArray(blockedCategories) ? blockedCategories : [];
        blockedTtags = Array.isArray(blockedTtags) ? blockedTtags : [];

        try {
            titleRegexList = GM_getValue('titleRegexList', []).map(pattern => new RegExp(pattern));
            categoryRegexList = GM_getValue('categoryRegexList', []).map(pattern => new RegExp(pattern));
            tagRegexList = GM_getValue('tagRegexList', []).map(pattern => new RegExp(pattern));
        } catch (error) {
            console.error('Error loading regex patterns:', error);
            titleRegexList = [];
            categoryRegexList = [];
            tagRegexList = [];
        }

        console.log('Loaded blocked titles:', blockedTitles);
        console.log('Loaded blocked categories:', blockedCategories);
        console.log('Loaded blocked ttags:', blockedTtags);
        console.log('Loaded title regex:', titleRegexList);
        console.log('Loaded category regex:', categoryRegexList);
        console.log('Loaded tag regex:', tagRegexList);
    }

    function saveRegexSettings(type) {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return;

        const patterns = Array.from(container.querySelectorAll('.regex-text'))
            .map(input => input.value)
            .filter(Boolean);

        try {
            const compiledRegexList = patterns.map(pattern => new RegExp(pattern));

            switch(type) {
                case 'title':
                    titleRegexList = compiledRegexList;
                    GM_setValue('titleRegexList', patterns);
                    break;
                case 'category':
                    categoryRegexList = compiledRegexList;
                    GM_setValue('categoryRegexList', patterns);
                    break;
                case 'tag':
                    tagRegexList = compiledRegexList;
                    GM_setValue('tagRegexList', patterns);
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
                const patterns = Array.from(container.querySelectorAll('.regex-text'))
                    .map(input => input.value)
                    .filter(Boolean);

                const currentPatterns = titleRegexList.map(r => r.source);
                if (JSON.stringify(patterns) !== JSON.stringify(currentPatterns)) {
                    titleRegexList = patterns.map(pattern => new RegExp(pattern));
                    GM_setValue('titleRegexList', patterns);
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
                const patterns = Array.from(container.querySelectorAll('.regex-text'))
                    .map(input => input.value)
                    .filter(Boolean);

                const currentPatterns = categoryRegexList.map(r => r.source);
                if (JSON.stringify(patterns) !== JSON.stringify(currentPatterns)) {
                    categoryRegexList = patterns.map(pattern => new RegExp(pattern));
                    GM_setValue('categoryRegexList', patterns);
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
                const patterns = Array.from(container.querySelectorAll('.regex-text'))
                    .map(input => input.value)
                    .filter(Boolean);

                const currentPatterns = tagRegexList.map(r => r.source);
                if (JSON.stringify(patterns) !== JSON.stringify(currentPatterns)) {
                    tagRegexList = patterns.map(pattern => new RegExp(pattern));
                    GM_setValue('tagRegexList', patterns);
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
            tagRegexList: GM_getValue('tagRegexList', [])
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

    function filterPosts() {
        const rows = document.querySelectorAll('tr.topic-list-item');
        rows.forEach(row => {
            unhideElement(row);

            const categoryElement = row.querySelector('div.link-bottom-line a.badge-category__wrapper span.badge-category__name');
            const tagElement = row.querySelector('div.link-bottom-line .discourse-tags');
            const titleElement = row.querySelector('a.title');

            if (shouldHideElement(categoryElement, tagElement, titleElement)) {
                softHideElement(row);
            }
        });
    }

    function filterSearchResults() {
        const searchTerm = getCurrentSearchTerm();
        const keywordConfig = getSearchFilterKeywords(searchTerm);
        const parsed = parseSearchFilterKeywords(keywordConfig);
        const hasSearchFilter = parsed.blacklistArray.length > 0 || parsed.whitelistArray.length > 0 || parsed.regexArray.length > 0;

        const results = document.querySelectorAll('.fps-result');
        results.forEach(result => {
            unhideElement(result);

            if (!hasSearchFilter) return;

            const titleElement = result.querySelector('.topic-title');
            const { raw, normalized } = getSearchResultText(result, titleElement);
            if (shouldHideBySearchFilter(raw, normalized, parsed)) {
                softHideElement(result);
            }
        });
    }

    function shouldHideElement(categoryElement, tagElement, titleElement) {
        if (categoryElement && shouldBlockCategory(categoryElement.textContent.trim())) {
            return true;
        }
        if (tagElement) {
            const tags = Array.from(tagElement.querySelectorAll('a'))
                .map(t => t.textContent.trim());
            if (tags.some(t => shouldBlockTag(t))) {
                return true;
            }
        }
        if (titleElement && shouldBlockTitle(titleElement.textContent)) {
            return true;
        }
        return false;
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

    function resetAndReapplyFilter() {
        document.querySelectorAll('tr.topic-list-item').forEach(row => {
            unhideElement(row);
        });
        document.querySelectorAll('.fps-result').forEach(result => {
            unhideElement(result);
        });
        filterContent();
    }

    // ================================
    // ========== UI & 事件部分 ========
    // ================================

    function showSettingsDialog() {
        loadSettings();
        const overlay = document.createElement('div');
        overlay.id = 'settingsOverlay';
        document.body.appendChild(overlay);

        const dialog = document.createElement('div');
        dialog.id = 'settingsDialog';
        dialog.innerHTML = `
            <h2>⚙️ 屏蔽设置</h2>
            <button id="closeDialog">&times;</button>
            <div class="settings-tabs">
                <div class="settings-tab active" data-tab="titles">标题关键词</div>
                <div class="settings-tab" data-tab="categories">类别</div>
                <div class="settings-tab" data-tab="ttags">标签</div>
                <div class="settings-tab" data-tab="other">...</div>
                <div class="settings-tab" data-tab="importExport">同步</div>
            </div>
            <div class="settings-content active" data-content="titles">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-titles">查看</div>
                    <div class="settings-subtab" data-subtab="regex-titles">高级自定义</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-titles">
                    <label for="titles">🚫 屏蔽的标题关键词（逗号分隔）：</label>
                    <textarea id="titles">${blockedTitles.join(', ')}</textarea>
                    <button id="saveTitleKeywords" class="actionButton saveButton">保存设置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="regex-titles">
                    <label>🔍 标题关键词过滤规则:</label>
                    <div id="titleRegexContainer"></div>
                    <button id="addTitleRegex" class="actionButton">新增规则</button>
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
                    <div class="settings-subtab active" data-subtab="view-categories">查看</div>
                    <div class="settings-subtab" data-subtab="regex-categories">高级自定义</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-categories">
                    <label for="categories">🚫 屏蔽的类别（逗号分隔）：</label>
                    <textarea id="categories">${blockedCategories.join(', ')}</textarea>
                    <button id="saveCategories" class="actionButton saveButton">保存设置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="regex-categories">
                    <label>🔍 类别过滤规则:</label>
                    <div id="categoryRegexContainer"></div>
                    <button id="addCategoryRegex" class="actionButton">新增规则</button>
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
                    <div class="settings-subtab active" data-subtab="view-ttags">查看</div>
                    <div class="settings-subtab" data-subtab="regex-ttags">高级自定义</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-ttags">
                    <label for="ttags">🚫 屏蔽的标签（逗号分隔）：</label>
                    <textarea id="ttags">${blockedTtags.join(', ')}</textarea>
                    <button id="saveTtags" class="actionButton saveButton">保存设置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="regex-ttags">
                    <label>🔍 标签过滤规则:</label>
                    <div id="tagRegexContainer"></div>
                    <button id="addTagRegex" class="actionButton">新增规则</button>
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
                    <div class="settings-subtab active" data-subtab="view-other">查看</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-other">
                    <label>🚫 屏蔽的...</label>
                    <textarea>还想屏蔽啥？👀</textarea>
                    <button id="saveOther" class="actionButton saveButton">假的保存设置</button>
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
    }

    function closeDialog() {
        const dialog = document.getElementById('settingsDialog');
        const overlay = document.getElementById('settingsOverlay');
        const notificationPanel = document.getElementById('notificationPanel');

        if (dialog) dialog.remove();
        if (overlay) overlay.remove();
        if (notificationPanel) notificationPanel.remove();
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
            });
        });
    }

    function initRegexInputs(type) {
        const container = document.getElementById(`${type}RegexContainer`);
        const regexList = type === 'title' ? titleRegexList :
                          (type === 'category' ? categoryRegexList : tagRegexList);

        if (!container) return;
        container.innerHTML = '';
        regexList.forEach(regex => {
            if (regex) {
                addRegexInput(type, regex.source);
            }
        });
    }

    function addRegexInput(type, value = '') {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return;
        const inputGroup = document.createElement('div');
        inputGroup.className = 'regex-input';
        inputGroup.innerHTML = `
            <input type="text"
                   class="regex-text"
                   value="${value}"
                   placeholder="输入正则表达式"
                   aria-label="输入正则表达式">
            <select class="regex-preset" aria-label="过滤规则模版">
                <option value="">🔧 过滤规则模版：</option>
                ${Object.entries(regexPresets)
                    .map(([name, pattern]) =>
                        `<option value="${pattern}">${name}</option>`)
                    .join('')}
            </select>
            <button class="delete-btn" aria-label="删除">删除</button>
        `;
        setupRegexInputEvents(inputGroup, type);
        container.appendChild(inputGroup);

        setTimeout(() => {
            inputGroup.style.opacity = '1';
            inputGroup.style.transform = 'translateX(0)';
        }, 10);
    }

    function setupRegexInputEvents(inputGroup, type) {
        const textInput = inputGroup.querySelector('.regex-text');
        const presetSelect = inputGroup.querySelector('.regex-preset');
        const deleteBtn = inputGroup.querySelector('.delete-btn');

        presetSelect.addEventListener('change', () => {
            textInput.value = presetSelect.value;
            validateAndSaveRegex(textInput, type);
        });

        textInput.addEventListener('input', () => {
            validateAndSaveRegex(textInput, type);
        });

        deleteBtn.addEventListener('click', () => {
            inputGroup.style.opacity = '0';
            inputGroup.style.transform = 'translateX(20px)';
            setTimeout(() => {
                inputGroup.remove();
                saveRegexSettings(type);
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
        // 立即尝试过滤一次（可能当前已有页面内容）
        filterContent();
        // 监听 DOM 变动，以后若有新内容出现，马上过滤
        observeDomChanges();
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
            overflow-y: auto;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
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
        #closeDialog {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            border: none;
            font-size: 24px;
            color: white;
            cursor: pointer;
            padding: 0;
            margin: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        .settings-tabs {
            display: flex;
            justify-content: space-around;
            margin-bottom: 10px;
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
        .regex-input {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            padding: 12px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.03);
            transition: all 0.3s ease;
        }
        .regex-input:hover {
            background: rgba(0, 0, 0, 0.05);
        }
        .regex-input input[type="text"] {
            flex: 1;
            height: 36px;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        .regex-input input[type="text"]:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            outline: none;
        }
        .regex-input select {
            width: auto;
            min-width: 130px;
            height: 36px;
            padding: 0 8px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            background-color: white;
            cursor: pointer;
        }
        .regex-input .delete-btn {
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            background-color: #dc3545;
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .regex-input .delete-btn:hover {
            background-color: #c82333;
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
            .regex-input input[type="text"],
            .regex-input select {
                background-color: #3a3a3a;
                border-color: #555;
                color: #e0e0e0;
            }
            .regex-input select option {
                background-color: #2c2c2c;
                color: #e0e0e0;
            }
        }
    `);

})();
