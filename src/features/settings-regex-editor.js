import { compileRegexEntries } from '../core/regex.js';
import { REGEX_SUBCONTENT_TYPE_MAP } from '../shared/constants.js';

export function adjustRegexTextareaHeight(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const minHeight = 36;
    textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
    textarea.style.overflowY = 'hidden';
}

export function collectRegexEntries(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll('.regex-input'))
        .map((group) => {
            const pattern = group.querySelector('.regex-text')?.value || '';
            const note = group.querySelector('.regex-note')?.value || '';
            const trimmedPattern = pattern.trim();
            if (!trimmedPattern) return null;
            return { pattern: trimmedPattern, note: note.trim() };
        })
        .filter(Boolean);
}

export function createSettingsRegexEditor({ store, runtime, notifier, onSettingsChanged }) {
    function getRegexEntriesByType(type) {
        const settings = store.getSnapshot();
        switch (type) {
            case 'title':
                return settings.titleRegexList;
            case 'category':
                return settings.categoryRegexList;
            case 'tag':
                return settings.tagRegexList;
            default:
                return [];
        }
    }

    function getActiveRegexType(dialog) {
        if (!dialog) return null;
        const activeContent = dialog.querySelector('.settings-content.active');
        if (!activeContent) return null;
        const activeSubcontent = activeContent.querySelector('.settings-subcontent.active[data-subcontent^="regex-"]');
        if (!activeSubcontent) return null;
        return REGEX_SUBCONTENT_TYPE_MAP[activeSubcontent.dataset.subcontent || ''] || null;
    }

    function refreshVisibleHeights(dialog) {
        const root = dialog || document;
        const activeContent = root.querySelector('.settings-content.active');
        if (!activeContent) return;
        const activeSubcontent = activeContent.querySelector('.settings-subcontent.active[data-subcontent^="regex-"]');
        if (!activeSubcontent) return;
        activeSubcontent.querySelectorAll('.regex-text').forEach((textarea) => {
            adjustRegexTextareaHeight(textarea);
        });
    }

    function positionFloatingButton() {
        if (!runtime.regexFloatingButton || !runtime.regexFloatingButtonDialog) return;
        const rect = runtime.regexFloatingButtonDialog.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        runtime.regexFloatingButton.style.left = `${Math.round(rect.right - 35)}px`;
        runtime.regexFloatingButton.style.top = `${Math.round(rect.bottom - 24)}px`;
        runtime.regexFloatingButton.style.transform = 'translate(-100%, -100%)';
    }

    function cleanupFloatingButton() {
        if (runtime.regexFloatingButton) {
            runtime.regexFloatingButton.remove();
            runtime.regexFloatingButton = null;
        }
        if (runtime.regexFloatingButtonResizeHandler) {
            window.removeEventListener('resize', runtime.regexFloatingButtonResizeHandler);
            runtime.regexFloatingButtonResizeHandler = null;
        }
        if (runtime.regexFloatingButtonDialog) {
            runtime.regexFloatingButtonDialog.classList.remove('regex-fab-enabled');
            runtime.regexFloatingButtonDialog = null;
        }
    }

    function ensureFloatingButton(dialog) {
        if (runtime.regexFloatingButton && runtime.regexFloatingButtonDialog === dialog) return;
        cleanupFloatingButton();
        if (!dialog) return;

        runtime.regexFloatingButtonDialog = dialog;
        runtime.regexFloatingButtonDialog.classList.add('regex-fab-enabled');

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'regex-floating-add';
        button.textContent = '新增规则';
        button.addEventListener('click', () => {
            const type = getActiveRegexType(runtime.regexFloatingButtonDialog);
            if (!type) return;
            addInput(type);
            requestAnimationFrame(positionFloatingButton);
        });

        runtime.regexFloatingButton = button;
        document.body.appendChild(button);
        runtime.regexFloatingButtonResizeHandler = () => positionFloatingButton();
        window.addEventListener('resize', runtime.regexFloatingButtonResizeHandler);
    }

    function updateFloatingButton(dialog) {
        if (!dialog) {
            cleanupFloatingButton();
            return;
        }
        ensureFloatingButton(dialog);
        if (!runtime.regexFloatingButton) return;
        const type = getActiveRegexType(dialog);
        runtime.regexFloatingButton.style.display = type ? 'block' : 'none';
        if (type) positionFloatingButton();
    }

    function clearAutoSave(type) {
        const timer = runtime.regexAutoSaveTimers[type];
        if (!timer) return false;
        clearTimeout(timer);
        delete runtime.regexAutoSaveTimers[type];
        return true;
    }

    function hasInvalidRegexInContainer(type) {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return false;

        return Array.from(container.querySelectorAll('.regex-text')).some((input) => {
            const value = (input.value || '').trim();
            if (!value) return false;

            try {
                new RegExp(value);
                return false;
            } catch (error) {
                return true;
            }
        });
    }

    function saveSettings(type, { notifySuccess = false, notifyError = true } = {}) {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return false;
        if (hasInvalidRegexInContainer(type)) {
            return false;
        }

        const entries = collectRegexEntries(container);
        const currentEntries = getRegexEntriesByType(type).map((entry) => ({
            pattern: entry.pattern,
            note: entry.note
        }));

        if (JSON.stringify(entries) === JSON.stringify(currentEntries)) {
            return true;
        }

        try {
            compileRegexEntries(entries, { strict: true });
            store.setRegexEntries(type, entries);
            onSettingsChanged({ refreshDialog: false });
            if (notifySuccess) {
                notifier.show('正则表达式设置已保存！', 'success');
            }
            return true;
        } catch (error) {
            console.error('保存正则表达式时发生错误:', error);
            if (notifyError) {
                notifier.show('保存正则表达式时发生错误！', 'error');
            }
            return false;
        }
    }

    function flushAutoSave(type) {
        clearAutoSave(type);
        return saveSettings(type, { notifySuccess: false, notifyError: true });
    }

    function flushAllAutoSave() {
        Object.keys(runtime.regexAutoSaveTimers).forEach((type) => {
            flushAutoSave(type);
        });
    }

    function scheduleAutoSave(type) {
        clearAutoSave(type);
        runtime.regexAutoSaveTimers[type] = setTimeout(() => {
            delete runtime.regexAutoSaveTimers[type];
            saveSettings(type, { notifySuccess: false, notifyError: true });
        }, 300);
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
        if (errorElement) errorElement.remove();
    }

    function validateAndSaveRegex(input, type) {
        removeRegexError(input);
        try {
            if (input.value) {
                new RegExp(input.value);
                input.style.borderColor = '#28a745';
            } else {
                input.style.borderColor = '#ddd';
            }
        } catch (error) {
            showRegexError(input, '无效的正则表达式');
            input.style.borderColor = '#dc3545';
            clearAutoSave(type);
            return;
        }

        if (hasInvalidRegexInContainer(type)) {
            clearAutoSave(type);
            return;
        }

        scheduleAutoSave(type);
    }

    function setupInputEvents(inputGroup, type) {
        const textInput = inputGroup.querySelector('.regex-text');
        const noteInput = inputGroup.querySelector('.regex-note');
        const deleteButton = inputGroup.querySelector('.delete-btn');

        if (textInput) {
            textInput.addEventListener('input', () => {
                adjustRegexTextareaHeight(textInput);
                validateAndSaveRegex(textInput, type);
            });
        }

        if (noteInput) {
            noteInput.addEventListener('change', () => {
                clearAutoSave(type);
                if (hasInvalidRegexInContainer(type)) return;
                saveSettings(type, { notifySuccess: false, notifyError: true });
            });
        }

        deleteButton.addEventListener('click', () => {
            clearAutoSave(type);
            inputGroup.style.opacity = '0';
            inputGroup.style.transform = 'translateX(20px)';
            setTimeout(() => {
                inputGroup.remove();
                saveSettings(type, { notifySuccess: false, notifyError: true });
                positionFloatingButton();
            }, 300);
        });
    }

    function addInput(type, value = '', note = '') {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return;

        const inputGroup = document.createElement('div');
        inputGroup.className = 'regex-input';
        inputGroup.innerHTML = `
            <div class="regex-note-row">
                <input type="text" class="regex-note" placeholder="备注（可选）" aria-label="备注（可选）">
                <button type="button" class="delete-btn" aria-label="删除">🗑️</button>
            </div>
            <div class="regex-text-row">
                <textarea class="regex-text" rows="1" placeholder="输入正则表达式" aria-label="输入正则表达式" spellcheck="false"></textarea>
            </div>
        `;

        const textInput = inputGroup.querySelector('.regex-text');
        const noteInput = inputGroup.querySelector('.regex-note');
        if (textInput) textInput.value = value || '';
        if (noteInput) noteInput.value = note || '';

        setupInputEvents(inputGroup, type);
        container.appendChild(inputGroup);

        setTimeout(() => {
            inputGroup.style.opacity = '1';
            inputGroup.style.transform = 'translateX(0)';
            if (textInput) adjustRegexTextareaHeight(textInput);
            positionFloatingButton();
        }, 10);
    }

    function initInputs(type) {
        const container = document.getElementById(`${type}RegexContainer`);
        if (!container) return;
        container.innerHTML = '';
        getRegexEntriesByType(type).forEach((entry) => {
            if (entry?.pattern) {
                addInput(type, entry.pattern, entry.note);
            }
        });
    }

    return {
        addInput,
        cleanupFloatingButton,
        clearAutoSave,
        collectEntries: collectRegexEntries,
        flushAllAutoSave,
        hasInvalidRegexInContainer,
        initInputs,
        refreshVisibleHeights,
        saveSettings,
        updateFloatingButton
    };
}
