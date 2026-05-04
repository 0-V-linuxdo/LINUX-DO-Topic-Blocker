// ==UserScript==
// @name         [闲鱼] 屏蔽含有指定关键词的搜索结果 20251123 Fixed1
// @version      2.4.0
// @description  1️⃣ 屏蔽包含指定关键词的搜索结果（黑名单）。2️⃣ 屏蔽不包含指定关键词的搜索结果（白名单）。3️⃣ 支持正则表达式高级匹配。4️⃣ 支持多个关键词,用逗号分隔。5️⃣ 翻页后自动应用屏蔽。6️⃣ 不同搜索词对应不同的屏蔽关键词。7️⃣ 增强稳定性和错误处理。8️⃣ 优化含空格关键词的匹配逻辑。9️⃣ 修复输入框滚动问题。🔟 第三行悬停显示，自动保存优化，完整背景遮挡。🆕 修复焦点状态下第三行可见性问题。🔧 优化光标位置和点击行为。📜 左键点击时滚动到输入框底部。🐛 修复正则表达式转义bug。🌐 适配新版搜索结果结构，增强观察与注入策略。
// @match        *://*.goofish.com/search?*
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goofish.com
// ==/UserScript==

(function() {
    'use strict';

    const RESULT_CONTAINER_SELECTORS = [
        '[data-spm="searchFeedList"]',
        '#content [data-spm="searchFeedList"]',
        '#content [class*="feeds-list-container"]',
        '#content [class*="feeds-list"]',
        '#content'
    ];

    const ITEM_SELECTOR_CANDIDATES = [
        'a[href*="/item?id="][data-appeared]',
        'a[href*="/item?id="][data-spm]',
        'a[class*="feeds-item-wrap"]',
        'a[href*="/item?id="]'
    ];

    const TITLE_SELECTOR_PRIORITY = [
        'div[class*="row1"][class*="title"] span[class*="main-title"]',
        'div[class*="row1"][class*="title"]',
        'span[class*="main-title"]',
        'div[class*="row1"] span[title]',
        'div[class*="row1"] span',
        'div[class*="row1"]',
        '[class*="title"] span',
        '[class*="title"]',
        'span[title]',
        'span'
    ];

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

    function waitForElement(selector, options = {}) {
        const {
            timeout = 15000,
            checkInterval = 100,
            requiredCount = 1,
            mustBeVisible = true
        } = options;

        return new Promise((resolve, reject) => {
            const immediate = document.querySelectorAll(selector);
            if (immediate.length >= requiredCount) {
                const element = immediate[0];
                if (!mustBeVisible || (element.offsetParent !== null)) {
                    resolve(element);
                    return;
                }
            }

            let attempts = 0;
            const maxAttempts = Math.ceil(timeout / checkInterval);

            const observer = new MutationObserver(() => {
                const elements = document.querySelectorAll(selector);
                if (elements.length >= requiredCount) {
                    const element = elements[0];
                    if (!mustBeVisible || (element.offsetParent !== null)) {
                        observer.disconnect();
                        clearInterval(pollTimer);
                        resolve(element);
                    }
                }
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: mustBeVisible ? true : false,
                attributeFilter: mustBeVisible ? ['style', 'class'] : undefined
            });

            const pollTimer = setInterval(() => {
                attempts++;
                const elements = document.querySelectorAll(selector);
                if (elements.length >= requiredCount) {
                    const element = elements[0];
                    if (!mustBeVisible || (element.offsetParent !== null)) {
                        observer.disconnect();
                        clearInterval(pollTimer);
                        resolve(element);
                        return;
                    }
                }

                if (attempts >= maxAttempts) {
                    observer.disconnect();
                    clearInterval(pollTimer);
                    reject(new Error(`Element not found: ${selector} after ${timeout}ms`));
                }
            }, checkInterval);
        });
    }

    function retryWithBackoff(fn, maxRetries = 5, initialDelay = 500) {
        return new Promise((resolve, reject) => {
            let retries = 0;

            const attempt = async () => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    retries++;
                    if (retries >= maxRetries) {
                        reject(new Error(`Failed after ${maxRetries} attempts. Last error: ${error.message}`));
                        return;
                    }

                    const delay = Math.min(initialDelay * Math.pow(2, retries - 1), 5000);
                    console.warn(`Attempt ${retries} failed, retrying in ${delay}ms:`, error.message);
                    setTimeout(attempt, delay);
                }
            };

            attempt();
        });
    }

    function findOptimalContainer() {
        const containerSelectors = [
            '#content [data-spm="searchHeader"]',
            '#content [data-spm="searchInput"]',
            '#content [class*="search-bar"]',
            '#content [class*="searchInput"]',
            '#content [class*="search-header"]',
            '#content > div:nth-child(1) > div:nth-child(2)',
            '#content > div:first-child > div:last-child',
            '#content > div:nth-child(1)',
            '#content'
        ];

        for (const selector of containerSelectors) {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null) {
                const rect = element.getBoundingClientRect();
                if (rect.width > 100 && rect.height > 20) {
                    console.log(`Found optimal container: ${selector}`);
                    return element;
                }
            }
        }

        throw new Error('No suitable container found');
    }

    function getCurrentSearchTerm() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q') || '';
    }

    function getAllKeywordsMappings() {
        try {
            const mappings = GM_getValue('xianyu_block_keywords_map', {});
            return typeof mappings === 'object' && mappings !== null ? mappings : {};
        } catch (e) {
            console.error('解析屏蔽关键词映射失败:', e);
            GM_setValue('xianyu_block_keywords_map', {});
            return {};
        }
    }

    function migrateOldData() {
        const allMappings = getAllKeywordsMappings();
        let needsSave = false;

        for (const [searchTerm, value] of Object.entries(allMappings)) {
            if (typeof value === 'string') {
                allMappings[searchTerm] = {
                    blacklist: value.trim(),
                    whitelist: '',
                    regex: ''
                };
                needsSave = true;
            } else if (value && typeof value === 'object' && !value.hasOwnProperty('regex')) {
                allMappings[searchTerm] = {
                    blacklist: value.blacklist || '',
                    whitelist: value.whitelist || '',
                    regex: ''
                };
                needsSave = true;
            }
        }

        if (needsSave) {
            GM_setValue('xianyu_block_keywords_map', allMappings);
            console.log('已迁移旧版本数据格式');
        }
    }

    function saveKeywords(searchTerm, blacklist, whitelist, regex) {
        if (!searchTerm) return;
        try {
            const allMappings = getAllKeywordsMappings();
            allMappings[searchTerm] = {
                blacklist: typeof blacklist === 'string' ? blacklist.trim() : '',
                whitelist: typeof whitelist === 'string' ? whitelist.trim() : '',
                regex: typeof regex === 'string' ? regex.trim() : ''
            };
            GM_setValue('xianyu_block_keywords_map', allMappings);
        } catch (e) {
            console.error('保存屏蔽关键词失败:', e);
        }
    }

    function getKeywords(searchTerm) {
        if (!searchTerm) return { blacklist: '', whitelist: '', regex: '' };
        try {
            const allMappings = getAllKeywordsMappings();
            const keywords = allMappings[searchTerm];

            if (typeof keywords === 'string') {
                return { blacklist: keywords, whitelist: '', regex: '' };
            } else if (keywords && typeof keywords === 'object') {
                return {
                    blacklist: keywords.blacklist || '',
                    whitelist: keywords.whitelist || '',
                    regex: keywords.regex || ''
                };
            }
            return { blacklist: '', whitelist: '', regex: '' };
        } catch (e) {
            console.error('获取屏蔽关键词失败:', e);
            return { blacklist: '', whitelist: '', regex: '' };
        }
    }

    function collectResultContainers() {
        const seen = new Set();
        const containers = [];
        for (const selector of RESULT_CONTAINER_SELECTORS) {
            const list = document.querySelectorAll(selector);
            if (list && list.length) {
                list.forEach(node => {
                    if (!seen.has(node) && node instanceof HTMLElement) {
                        seen.add(node);
                        containers.push(node);
                    }
                });
            }
        }
        return containers;
    }

    function getResultItems() {
        const containers = collectResultContainers();
        const itemSet = new Set();
        if (containers.length > 0) {
            for (const container of containers) {
                for (const selector of ITEM_SELECTOR_CANDIDATES) {
                    container.querySelectorAll(selector).forEach(node => {
                        if (node instanceof HTMLElement) {
                            itemSet.add(node);
                        }
                    });
                }
            }
        } else {
            for (const selector of ITEM_SELECTOR_CANDIDATES) {
                document.querySelectorAll(selector).forEach(node => {
                    if (node instanceof HTMLElement) {
                        itemSet.add(node);
                    }
                });
            }
        }
        return Array.from(itemSet);
    }

    function getItemText(node) {
        for (const selector of TITLE_SELECTOR_PRIORITY) {
            const target = node.querySelector(selector);
            if (target) {
                const combined = `${target.getAttribute('title') || ''} ${target.textContent || ''}`.trim();
                if (combined) {
                    const normalized = combined.toLowerCase();
                    return { raw: combined, normalized, element: target };
                }
            }
        }
        const fallback = (node.textContent || '').trim();
        return { raw: fallback, normalized: fallback.toLowerCase(), element: node };
    }

    function applyFiltering() {
        const searchTerm = getCurrentSearchTerm();
        const keywords = getKeywords(searchTerm);

        const allItemElements = getResultItems();
        allItemElements.forEach(node => {
            if (node && node.style) {
                node.style.display = '';
            }
        });

        const { blacklist, whitelist, regex } = keywords;

        if (blacklist === '' && whitelist === '' && regex === '') return;

        const blacklistArray = blacklist ? blacklist.split(',')
                                    .map(kw => kw.trim().toLowerCase())
                                    .filter(kw => kw !== '') : [];

        const whitelistArray = whitelist ? whitelist.split(',')
                                    .map(kw => kw.trim().toLowerCase())
                                    .filter(kw => kw !== '') : [];

        const regexArray = regex ? regex.split('\n')
                                    .map(r => r.trim())
                                    .filter(r => r !== '') : [];

        allItemElements.forEach(node => {
            if (!node) return;
            try {
                const { raw, normalized } = getItemText(node);
                if (!raw) return;

                let shouldHide = false;

                if (blacklistArray.length > 0) {
                    for (const kw of blacklistArray) {
                        if (matchesKeyword(normalized, kw)) {
                            shouldHide = true;
                            break;
                        }
                    }
                }

                if (!shouldHide && regexArray.length > 0) {
                    for (const regexPattern of regexArray) {
                        if (matchesRegex(raw, regexPattern)) {
                            shouldHide = true;
                            break;
                        }
                    }
                }

                if (!shouldHide && whitelistArray.length > 0) {
                    let containsWhitelist = false;
                    for (const kw of whitelistArray) {
                        if (matchesKeyword(normalized, kw)) {
                            containsWhitelist = true;
                            break;
                        }
                    }
                    if (!containsWhitelist) {
                        shouldHide = true;
                    }
                }

                if (shouldHide && node.style) {
                    node.style.display = 'none';
                }
            } catch (e) {
                console.error('屏蔽关键词处理错误:', e, node);
            }
        });

        if (blacklistArray.length > 0 || whitelistArray.length > 0 || regexArray.length > 0) {
            console.log(`过滤完成 - 搜索词: "${searchTerm}", 黑名单: [${blacklistArray.join(', ')}], 白名单: [${whitelistArray.join(', ')}], 正则: [${regexArray.join(', ')}]`);
        }
    }

    function adjustTextareaHeight(tex) {
        tex.style.height = 'auto';
        const scrollH = tex.scrollHeight;
        const minH = 32;
        const maxH = 200;
        const h = Math.min(Math.max(scrollH, minH), maxH);
        tex.style.height = h + 'px';
        tex.style.overflowY = scrollH > maxH ? 'auto' : 'hidden';
    }

    function setupTextareaScrollHandling(textarea) {
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

    async function addFilterUI() {
        if (document.getElementById('xianyu_filter_wrapper')) {
            console.log('UI already exists, skipping insertion');
            return true;
        }

        try {
            console.log('Attempting to add filter UI...');

            const container = await waitForElement(
                '#content > div:nth-child(1) > div:nth-child(2)',
                { timeout: 10000, mustBeVisible: true }
            ).catch(() => {
                return findOptimalContainer();
            });

            if (!container) {
                throw new Error('Container not found');
            }

            const searchTerm = getCurrentSearchTerm();
            const savedKeywords = getKeywords(searchTerm);
            const blacklistPlaceholder = '屏蔽关键词,用逗号分隔';
            const whitelistPlaceholder = '必须包含关键词,用逗号分隔';
            const regexPlaceholder = '正则表达式,每行一个';

            if (!document.getElementById('xianyu_filter_styles')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'xianyu_filter_styles';
                const initialIsDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const initialBgColor = initialIsDarkMode ? '#333333' : '#ffffff';
                const initialFontColor = initialIsDarkMode ? '#ffffff' : '#1f1f1f';
                const initialBorderColor = initialIsDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,.08)';
                const initialPlaceholderColor = initialIsDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
                const initialHoverColor = initialIsDarkMode ? '#ffe60f' : '#333333';
                const initialFocusBg = initialIsDarkMode ? '#444' : '#faf9e4';

                styleElement.textContent = `
                    :root {
                      --filter-bg-color: ${initialBgColor};
                      --filter-font-color: ${initialFontColor};
                      --filter-border-color: ${initialBorderColor};
                      --filter-placeholder-color: ${initialPlaceholderColor};
                      --filter-label-hover-color: ${initialHoverColor};
                      --filter-focus-bg-color: ${initialFocusBg};
                    }

                    .filter-display:empty::before {
                        content: attr(data-placeholder);
                        pointer-events: none;
                        color: var(--filter-placeholder-color);
                    }
                    @media (prefers-color-scheme: dark) {
                        .filter-display:empty::before { color: rgba(255,255,255,0.4) !important; }
                    }
                    @media (prefers-color-scheme: light) {
                        .filter-display:empty::before { color: rgba(0,0,0,0.4) !important; }
                    }

                    .filter-label {
                        color: var(--filter-font-color);
                        font-size: 13px;
                        line-height: 28px;
                        margin-right: 4px;
                        cursor: pointer;
                        user-select: none;
                        transition: color 0.16s;
                        flex-shrink: 0;
                        font-weight: 500;
                    }
                    .filter-label:hover {
                        color: var(--filter-label-hover-color);
                    }

                    .filter-display,
                    .filter-input {
                        border: 1px solid var(--filter-border-color);
                        border-radius: 6px;
                        box-sizing: border-box;
                        font-size: 13px;
                        font-family: inherit;
                        color: var(--filter-font-color);
                        padding: 6px 8px;
                        width: 160px;
                        background-color: var(--filter-bg-color);
                        box-shadow: 0 2px 6px rgba(0,0,0,0.09);
                        transition: background 0.16s, color 0.16s, border 0.16s;
                        line-height: 1.3;
                    }

                    .filter-display {
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

                    .filter-display:focus-visible,
                    .filter-input:focus {
                        border-color: #ffe60f !important;
                        background: var(--filter-focus-bg-color);
                        outline: none;
                    }

                    .filter-input {
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

                    .filter-input::-webkit-scrollbar {
                        width: 6px;
                    }
                    .filter-input::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .filter-input::-webkit-scrollbar-thumb {
                        background-color: rgba(0,0,0,0.3);
                        border-radius: 3px;
                        transition: background-color 0.2s;
                    }
                    .filter-input::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(0,0,0,0.5);
                    }

                    @media (prefers-color-scheme: dark) {
                        .filter-input {
                            scrollbar-color: rgba(255,255,255,0.4) transparent;
                        }
                        .filter-input::-webkit-scrollbar-thumb {
                            background-color: rgba(255,255,255,0.4);
                        }
                        .filter-input::-webkit-scrollbar-thumb:hover {
                            background-color: rgba(255,255,255,0.6);
                        }
                    }

                    .filter-input-group {
                        display: flex;
                        align-items: flex-start;
                        gap: 2px;
                        margin-bottom: 4px;
                    }
                    .filter-input-group:last-child {
                        margin-bottom: 0;
                    }

                    .filter-input-group.regex-group {
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .filter-inputs-container:hover .filter-input-group.regex-group,
                    .filter-inputs-container:focus-within .filter-input-group.regex-group,
                    .filter-input-group.regex-group:hover,
                    .filter-input-group.regex-group:focus-within {
                        opacity: 1;
                        transition: opacity 0.3s ease;
                    }

                    .filter-inputs-container:not(:hover):not(:focus-within) .filter-input-group.regex-group {
                        transition: opacity 1s ease;
                    }

                    .filter-inputs-container {
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                        position: relative;
                    }

                    .filter-inputs-container::before {
                        content: '';
                        position: absolute;
                        top: -4px;
                        left: -6px;
                        right: -6px;
                        bottom: -4px;
                        background-color: var(--filter-bg-color);
                        border-radius: 8px;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        z-index: -1;
                        box-shadow: 0 2px 12px rgba(0,0,0,0.15);
                        border: 1px solid var(--filter-border-color);
                    }

                    .filter-inputs-container:hover::before,
                    .filter-inputs-container:focus-within::before {
                        opacity: 1;
                        transition: opacity 0.3s ease;
                    }

                    .filter-inputs-container:not(:hover):not(:focus-within)::before {
                        transition: opacity 1s ease;
                    }

                    @media (prefers-color-scheme: dark) {
                        .filter-inputs-container::before {
                            box-shadow: 0 2px 12px rgba(0,0,0,0.4);
                        }
                    }

                    #xianyu_filter_wrapper {
                        position: absolute !important;
                        z-index: 9999 !important;
                        pointer-events: auto !important;
                    }
                `;
                document.head.appendChild(styleElement);
            }

            const wrapper = document.createElement('div');
            wrapper.id = 'xianyu_filter_wrapper';
            wrapper.style.cssText = `
                position: absolute;
                right: 1.5em;
                top: -13px;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: flex-start;
                gap: 6px;
                padding-top: 2px;
                padding-bottom: 5px;
                box-sizing: border-box;
                pointer-events: auto;
            `;

            wrapper.innerHTML = `
                <div class="filter-inputs-container">
                    <div class="filter-input-group">
                        <label class="filter-label" for="blacklist_input" title="点击编辑黑名单">屏蔽：</label>
                        <div
                          id="blacklist_display"
                          class="filter-display"
                          data-placeholder="${blacklistPlaceholder}"
                          tabindex="0"
                          title="点击编辑黑名单"
                        >${savedKeywords.blacklist.replace(/\n/g,' ')}</div>
                        <textarea
                          id="blacklist_input"
                          class="filter-input"
                          placeholder="${blacklistPlaceholder}"
                        >${savedKeywords.blacklist}</textarea>
                    </div>
                    <div class="filter-input-group">
                        <label class="filter-label" for="whitelist_input" title="点击编辑白名单">必含：</label>
                        <div
                          id="whitelist_display"
                          class="filter-display"
                          data-placeholder="${whitelistPlaceholder}"
                          tabindex="0"
                          title="点击编辑白名单"
                        >${savedKeywords.whitelist.replace(/\n/g,' ')}</div>
                        <textarea
                          id="whitelist_input"
                          class="filter-input"
                          placeholder="${whitelistPlaceholder}"
                        >${savedKeywords.whitelist}</textarea>
                    </div>
                    <div class="filter-input-group regex-group">
                        <label class="filter-label" for="regex_input" title="点击编辑正则表达式">正则：</label>
                        <div
                          id="regex_display"
                          class="filter-display"
                          data-placeholder="${regexPlaceholder}"
                          tabindex="0"
                          title="点击编辑正则表达式"
                        >${savedKeywords.regex.replace(/\n/g,' ')}</div>
                        <textarea
                          id="regex_input"
                          class="filter-input"
                          placeholder="${regexPlaceholder}"
                        >${savedKeywords.regex}</textarea>
                    </div>
                </div>
            `;

            container.style.position = container.style.position || 'relative';
            container.appendChild(wrapper);

            setupUIInteractions(wrapper);
            setupThemeListener();

            console.log('Filter UI added successfully');
            return true;

        } catch (error) {
            console.error('Failed to add filter UI:', error);
            return false;
        }
    }

    function setupUIInteractions(wrapper) {
        const blacklistLabel = wrapper.querySelector('label[for="blacklist_input"]');
        const blacklistDisplay = wrapper.querySelector('#blacklist_display');
        const blacklistInput = wrapper.querySelector('#blacklist_input');

        const whitelistLabel = wrapper.querySelector('label[for="whitelist_input"]');
        const whitelistDisplay = wrapper.querySelector('#whitelist_display');
        const whitelistInput = wrapper.querySelector('#whitelist_input');

        const regexLabel = wrapper.querySelector('label[for="regex_input"]');
        const regexDisplay = wrapper.querySelector('#regex_display');
        const regexInput = wrapper.querySelector('#regex_input');

        setupTextareaScrollHandling(blacklistInput);
        setupTextareaScrollHandling(whitelistInput);
        setupTextareaScrollHandling(regexInput);

        function autoSave() {
            const currentSearchTerm = getCurrentSearchTerm();
            const newBlacklist = blacklistInput.value;
            const newWhitelist = whitelistInput.value;
            const newRegex = regexInput.value;

            saveKeywords(currentSearchTerm, newBlacklist, newWhitelist, newRegex);
            applyFiltering();
        }

        function createEditModeManager(label, display, input) {
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

                        if (clickType === 'leftClick' && input.value.trim() &&
                            (input === blacklistInput || input === whitelistInput)) {
                            if (!input.value.endsWith(',')) {
                                input.value += ',';
                                const newLength = input.value.length;
                                input.setSelectionRange(newLength, newLength);
                                adjustTextareaHeight(input);
                            }
                            input.scrollTop = input.scrollHeight;
                        } else if (clickType === 'leftClick') {
                            input.scrollTop = input.scrollHeight;
                        }
                    }
                }, 0);
            }

            function exitEditMode(saveToDisplay = true) {
                if (input.style.display === 'none') return;

                input.style.display = 'none';
                if (saveToDisplay) {
                    const v = input.value.trim().replace(/\n/g,' ');
                    display.textContent = v;
                    display.title = input.value.trim();

                    if (input.value !== initialValue) {
                        autoSave();
                    }
                }
                display.style.display = 'block';
            }

            label.addEventListener('mousedown', e => {
                if (e.button === 0) {
                    e.preventDefault();
                    enterEditMode('leftClick');
                }
            });

            display.addEventListener('mousedown', e => {
                if (e.button === 0) {
                    e.preventDefault();
                    enterEditMode('leftClick');
                }
            });

            label.addEventListener('contextmenu', e => {
                e.preventDefault();
                enterEditMode('rightClick');
            });

            display.addEventListener('contextmenu', e => {
                e.preventDefault();
                enterEditMode('rightClick');
            });

            display.addEventListener('keydown', e => {
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

            input.addEventListener('keydown', e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    exitEditMode(true);
                }
            });

            return { enterEditMode, exitEditMode };
        }

        createEditModeManager(blacklistLabel, blacklistDisplay, blacklistInput);
        createEditModeManager(whitelistLabel, whitelistDisplay, whitelistInput);
        createEditModeManager(regexLabel, regexDisplay, regexInput);
    }

    function setupThemeListener() {
        if (window.matchMedia) {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const updateTheme = (isDark) => {
                const root = document.documentElement;
                root.style.setProperty('--filter-bg-color', isDark ? '#333333' : '#ffffff');
                root.style.setProperty('--filter-font-color', isDark ? '#ffffff' : '#1f1f1f');
                root.style.setProperty('--filter-border-color', isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,.08)');
                root.style.setProperty('--filter-placeholder-color', isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)');
                root.style.setProperty('--filter-label-hover-color', isDark ? '#ffe60f' : '#333333');
                root.style.setProperty('--filter-focus-bg-color', isDark ? '#444' : '#faf9e4');
            };
            updateTheme(mq.matches);
            mq.addEventListener('change', e => updateTheme(e.matches));
        }
    }

    function createHealthMonitor() {
        let isUIHealthy = false;
        let isRecovering = false;

        const checkHealth = () => {
            const wrapper = document.getElementById('xianyu_filter_wrapper');
            const newHealthy = wrapper &&
                             wrapper.offsetParent !== null &&
                             wrapper.getBoundingClientRect().width > 0;

            if (!newHealthy && isUIHealthy && !isRecovering) {
                console.warn('UI component lost, attempting recovery...');
                isRecovering = true;

                retryWithBackoff(addFilterUI, 3, 1000)
                    .then(() => {
                        console.log('UI component recovered successfully');
                        isRecovering = false;
                    })
                    .catch(error => {
                        console.error('Failed to recover UI component:', error);
                        isRecovering = false;
                    });
            }

            isUIHealthy = newHealthy;
        };

        const healthInterval = setInterval(checkHealth, 5000);

        setTimeout(checkHealth, 1000);

        return () => clearInterval(healthInterval);
    }

    function setupMutationObserver() {
        const targetNode = document.querySelector('[data-spm="searchFeedList"]') ||
                           document.getElementById('content') ||
                           document.body;

        if (!targetNode) {
            console.warn('MutationObserver target not found.');
            return;
        }

        const observer = new MutationObserver(mutations => {
            let needsRefilter = false;
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) continue;
                        if (node.matches && ITEM_SELECTOR_CANDIDATES.some(sel => node.matches(sel))) {
                            needsRefilter = true;
                            break;
                        }
                        if (node.querySelector) {
                            for (const sel of ITEM_SELECTOR_CANDIDATES) {
                                if (node.querySelector(sel)) {
                                    needsRefilter = true;
                                    break;
                                }
                            }
                        }
                        if (needsRefilter) break;
                    }
                }
                if (needsRefilter) break;
            }

            if (needsRefilter) {
                setTimeout(applyFiltering, 300);
            }
        });

        observer.observe(targetNode, { childList: true, subtree: true });
    }

    function setupURLChangeMonitor() {
        let lastUrl = location.href;
        setInterval(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                const term = getCurrentSearchTerm();
                const currentKeywords = getKeywords(term);

                const blacklistDisplay = document.getElementById('blacklist_display');
                const blacklistInput = document.getElementById('blacklist_input');
                const whitelistDisplay = document.getElementById('whitelist_display');
                const whitelistInput = document.getElementById('whitelist_input');
                const regexDisplay = document.getElementById('regex_display');
                const regexInput = document.getElementById('regex_input');

                if (blacklistDisplay && blacklistInput) {
                    const blacklistDisplayValue = currentKeywords.blacklist.replace(/\n/g,' ');
                    blacklistDisplay.textContent = blacklistDisplayValue;
                    blacklistDisplay.title = currentKeywords.blacklist;
                    blacklistInput.value = currentKeywords.blacklist;
                    if (blacklistInput.style.display === 'block') {
                        adjustTextareaHeight(blacklistInput);
                    }
                }

                if (whitelistDisplay && whitelistInput) {
                    const whitelistDisplayValue = currentKeywords.whitelist.replace(/\n/g,' ');
                    whitelistDisplay.textContent = whitelistDisplayValue;
                    whitelistDisplay.title = currentKeywords.whitelist;
                    whitelistInput.value = currentKeywords.whitelist;
                    if (whitelistInput.style.display === 'block') {
                        adjustTextareaHeight(whitelistInput);
                    }
                }

                if (regexDisplay && regexInput) {
                    const regexDisplayValue = currentKeywords.regex.replace(/\n/g,' ');
                    regexDisplay.textContent = regexDisplayValue;
                    regexDisplay.title = currentKeywords.regex;
                    regexInput.value = currentKeywords.regex;
                    if (regexInput.style.display === 'block') {
                        adjustTextareaHeight(regexInput);
                    }
                }

                setTimeout(applyFiltering, 500);
            }
        }, 800);
    }

    async function initialize() {
        try {
            console.log('Starting enhanced initialization...');

            migrateOldData();

            const uiSuccess = await retryWithBackoff(addFilterUI, 5, 500);

            if (uiSuccess) {
                setupMutationObserver();
                setupURLChangeMonitor();

                createHealthMonitor();

                setTimeout(applyFiltering, 800);

                console.log('Enhanced initialization completed successfully');
            } else {
                console.error('Failed to initialize UI after retries');
            }

        } catch (error) {
            console.error('Initialization failed:', error);

            try {
                setupMutationObserver();
                setTimeout(applyFiltering, 1000);
                console.log('Fallback mode activated');
            } catch (fallbackError) {
                console.error('Fallback mode also failed:', fallbackError);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initialize, 500);
        });
    } else {
        setTimeout(initialize, 200);
    }

    setTimeout(() => {
        if (!document.getElementById('xianyu_filter_wrapper')) {
            console.log('Final initialization attempt...');
            initialize();
        }
    }, 3000);

})();