import {
    SEARCH_FILTER_BLACKLIST_DISPLAY_ID,
    SEARCH_FILTER_BLACKLIST_INPUT_ID,
    SEARCH_FILTER_REGEX_DISPLAY_ID,
    SEARCH_FILTER_REGEX_INPUT_ID,
    SEARCH_FILTER_WHITELIST_DISPLAY_ID,
    SEARCH_FILTER_WHITELIST_INPUT_ID,
    SEARCH_FILTER_WRAPPER_ID
} from '../shared/constants.js';

export function formatSearchFilterDisplayValue(value) {
    return (value || '').replace(/\n/g, ' ');
}

export function adjustTextareaHeight(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const minHeight = 28;
    const maxHeight = 150;
    const height = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${height}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
}

export function setupTextareaScrollHandling(textarea) {
    if (!textarea) return;

    textarea.addEventListener('wheel', (event) => {
        const { scrollTop, scrollHeight, clientHeight } = textarea;
        const isScrollingUp = event.deltaY < 0;
        const isScrollingDown = event.deltaY > 0;
        const canScrollUp = scrollTop > 0;
        const canScrollDown = scrollTop < scrollHeight - clientHeight;

        if ((isScrollingUp && canScrollUp) || (isScrollingDown && canScrollDown)) {
            event.stopPropagation();
        }
    }, { passive: false });

    textarea.addEventListener('keydown', (event) => {
        if (
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'PageUp' ||
            event.key === 'PageDown' ||
            event.key === 'Home' ||
            event.key === 'End'
        ) {
            event.stopPropagation();
        }
    });

    textarea.addEventListener('focus', () => {
        if (textarea.scrollHeight > textarea.clientHeight) {
            textarea.style.overflowY = 'auto';
        }
    });
}

export function appendCommaToTextareaIfNeeded(textarea, { force = false, appendText = ',' } = {}) {
    if (!textarea) return false;
    const value = typeof textarea.value === 'string' ? textarea.value : '';
    if (!value.trim()) return false;

    const trimmedValue = value.trimEnd();
    if (trimmedValue.endsWith(',')) return false;

    if (!force && typeof textarea.selectionStart === 'number' && typeof textarea.selectionEnd === 'number') {
        const isCollapsed = textarea.selectionStart === textarea.selectionEnd;
        const isAtEnd = textarea.selectionEnd === value.length;
        if (!isCollapsed || !isAtEnd) return false;
    }

    textarea.value = trimmedValue + appendText;
    const length = textarea.value.length;
    if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(length, length);
    }
    textarea.scrollTop = textarea.scrollHeight;
    return true;
}

export function getSearchFilterWrapper() {
    return document.getElementById(SEARCH_FILTER_WRAPPER_ID);
}

export function getSearchFilterFieldElements(wrapper = getSearchFilterWrapper()) {
    if (!wrapper) {
        return {
            blacklistDisplay: null,
            blacklistInput: null,
            whitelistDisplay: null,
            whitelistInput: null,
            regexDisplay: null,
            regexInput: null
        };
    }

    return {
        blacklistDisplay: wrapper.querySelector(`#${SEARCH_FILTER_BLACKLIST_DISPLAY_ID}`),
        blacklistInput: wrapper.querySelector(`#${SEARCH_FILTER_BLACKLIST_INPUT_ID}`),
        whitelistDisplay: wrapper.querySelector(`#${SEARCH_FILTER_WHITELIST_DISPLAY_ID}`),
        whitelistInput: wrapper.querySelector(`#${SEARCH_FILTER_WHITELIST_INPUT_ID}`),
        regexDisplay: wrapper.querySelector(`#${SEARCH_FILTER_REGEX_DISPLAY_ID}`),
        regexInput: wrapper.querySelector(`#${SEARCH_FILTER_REGEX_INPUT_ID}`)
    };
}

export function getSearchFilterRuleValues(wrapper = getSearchFilterWrapper()) {
    const {
        blacklistInput,
        whitelistInput,
        regexInput
    } = getSearchFilterFieldElements(wrapper);

    return {
        blacklist: blacklistInput?.value || '',
        whitelist: whitelistInput?.value || '',
        regex: regexInput?.value || ''
    };
}

export function createSearchFilterWrapper(savedKeywords) {
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
                <div id="${SEARCH_FILTER_BLACKLIST_DISPLAY_ID}" class="filter-display" data-placeholder="${blacklistPlaceholder}" tabindex="0" title="点击编辑黑名单">${formatSearchFilterDisplayValue(savedKeywords.blacklist || '')}</div>
                <textarea id="${SEARCH_FILTER_BLACKLIST_INPUT_ID}" class="filter-input" placeholder="${blacklistPlaceholder}">${savedKeywords.blacklist || ''}</textarea>
            </div>
            <div class="filter-input-group">
                <label class="filter-label" for="${SEARCH_FILTER_WHITELIST_INPUT_ID}" title="点击编辑白名单">必含：</label>
                <div id="${SEARCH_FILTER_WHITELIST_DISPLAY_ID}" class="filter-display" data-placeholder="${whitelistPlaceholder}" tabindex="0" title="点击编辑白名单">${formatSearchFilterDisplayValue(savedKeywords.whitelist || '')}</div>
                <textarea id="${SEARCH_FILTER_WHITELIST_INPUT_ID}" class="filter-input" placeholder="${whitelistPlaceholder}">${savedKeywords.whitelist || ''}</textarea>
            </div>
            <div class="filter-input-group regex-group">
                <label class="filter-label" for="${SEARCH_FILTER_REGEX_INPUT_ID}" title="点击编辑正则表达式">正则：</label>
                <div id="${SEARCH_FILTER_REGEX_DISPLAY_ID}" class="filter-display" data-placeholder="${regexPlaceholder}" tabindex="0" title="点击编辑正则表达式">${formatSearchFilterDisplayValue(savedKeywords.regex || '')}</div>
                <textarea id="${SEARCH_FILTER_REGEX_INPUT_ID}" class="filter-input" placeholder="${regexPlaceholder}">${savedKeywords.regex || ''}</textarea>
            </div>
        </div>
    `;

    return wrapper;
}

export function setupSearchFilterToggle(wrapper) {
    const fab = wrapper.querySelector('.filter-fab');
    if (!fab) return;

    const closePanel = () => {
        wrapper.classList.remove('filter-open');
    };

    fab.addEventListener('click', (event) => {
        event.preventDefault();
        wrapper.classList.toggle('filter-open');
        if (wrapper.classList.contains('filter-open')) {
            const firstDisplay = wrapper.querySelector('.filter-display');
            if (firstDisplay) firstDisplay.focus();
        }
    });

    const onDocumentMouseDown = (event) => {
        if (!wrapper.contains(event.target)) {
            closePanel();
        }
    };

    const onDocumentKeyDown = (event) => {
        if (event.key === 'Escape') {
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
