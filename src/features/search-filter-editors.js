import {
    SEARCH_FILTER_BLACKLIST_INPUT_ID,
    SEARCH_FILTER_REGEX_INPUT_ID,
    SEARCH_FILTER_WHITELIST_INPUT_ID
} from '../shared/constants.js';
import {
    adjustTextareaHeight,
    appendCommaToTextareaIfNeeded,
    getSearchFilterFieldElements,
    setupTextareaScrollHandling
} from './search-filter-dom.js';

export function createSearchFilterEditManagers({
    wrapper,
    runtime,
    getCurrentSearchTerm,
    saveCurrentSearchFilterRule,
    clearEditingTermIfIdle
}) {
    const blacklistLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_BLACKLIST_INPUT_ID}"]`);
    const whitelistLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_WHITELIST_INPUT_ID}"]`);
    const regexLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_REGEX_INPUT_ID}"]`);
    const {
        blacklistDisplay,
        blacklistInput,
        whitelistDisplay,
        whitelistInput,
        regexDisplay,
        regexInput
    } = getSearchFilterFieldElements(wrapper);

    setupTextareaScrollHandling(blacklistInput);
    setupTextareaScrollHandling(whitelistInput);
    setupTextareaScrollHandling(regexInput);

    const createEditModeManager = (label, display, input, { autoAppendComma = false } = {}) => {
        if (!label || !display || !input) return null;

        let initialValue = input.value;

        function isEditing() {
            return input.style.display === 'block';
        }

        function enterEditMode(clickType = 'default') {
            if (isEditing()) return;

            initialValue = input.value;
            runtime.searchFilterEditingTerm = runtime.searchFilterEditingTerm || runtime.lastSyncedSearchTerm || getCurrentSearchTerm();
            display.style.display = 'none';
            input.style.display = 'block';

            setTimeout(() => {
                if (!isEditing()) return;

                adjustTextareaHeight(input);
                input.focus();

                const length = input.value.length;
                if (typeof input.setSelectionRange === 'function') {
                    input.setSelectionRange(length, length);
                }

                if (clickType === 'leftClick') {
                    if (autoAppendComma) {
                        const appended = appendCommaToTextareaIfNeeded(input, { force: true });
                        if (appended) adjustTextareaHeight(input);
                    }
                    input.scrollTop = input.scrollHeight;
                }
            }, 0);
        }

        function exitEditMode(saveToDisplay = true) {
            if (!isEditing()) return;

            input.style.display = 'none';
            if (saveToDisplay) {
                const value = input.value.trim().replace(/\n/g, ' ');
                display.textContent = value;
                display.title = input.value.trim();
                if (input.value !== initialValue) {
                    saveCurrentSearchFilterRule();
                }
            }
            display.style.display = 'block';
            clearEditingTermIfIdle();
        }

        label.addEventListener('mousedown', (event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            enterEditMode('leftClick');
        });

        display.addEventListener('mousedown', (event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            enterEditMode('leftClick');
        });

        label.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            enterEditMode('rightClick');
        });

        display.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            enterEditMode('rightClick');
        });

        display.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
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

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                exitEditMode(true);
            }
        });

        return {
            isEditing,
            exitEditMode
        };
    };

    return [
        createEditModeManager(blacklistLabel, blacklistDisplay, blacklistInput, { autoAppendComma: true }),
        createEditModeManager(whitelistLabel, whitelistDisplay, whitelistInput, { autoAppendComma: true }),
        createEditModeManager(regexLabel, regexDisplay, regexInput)
    ].filter(Boolean);
}
