import { compileRegexEntries } from '../core/regex.js';
import {
    SETTINGS_DIALOG_ID,
    SETTINGS_DIALOG_OVERLAY_ID,
    SETTINGS_DIALOG_STYLE_ID
} from '../shared/constants.js';
import { ensureStyle } from '../platform/styles.js';
import { buildSettingsDialogMarkup } from './settings-dialog-markup.js';
import { SETTINGS_DIALOG_CSS } from './settings-dialog-styles.js';
import { createSettingsImportExportController } from './settings-import-export.js';
import { createSettingsRegexEditor } from './settings-regex-editor.js';

function normalizeCommaSeparatedTextarea(textarea) {
    return textarea.value
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
}

function appendCommaToTextareaIfNeeded(textarea, { force = false, appendText = ',' } = {}) {
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

export function createSettingsDialogFeature({ store, runtime, notifier, profile = {} }) {
    let onSettingsChanged = () => {};
    const labels = profile.labels || {};
    const getLabel = (key, fallback) => labels[key] || fallback;
    const notifySettingsChanged = (options) => onSettingsChanged(options);

    const regexEditor = createSettingsRegexEditor({
        store,
        runtime,
        notifier,
        onSettingsChanged: notifySettingsChanged
    });
    const importExport = createSettingsImportExportController({
        store,
        profile,
        notifier,
        onSettingsChanged: notifySettingsChanged,
        refreshIfOpen
    });

    function setCallbacks(callbacks = {}) {
        if (typeof callbacks.onSettingsChanged === 'function') {
            onSettingsChanged = callbacks.onSettingsChanged;
        }
    }

    function close() {
        const dialog = document.getElementById(SETTINGS_DIALOG_ID);
        const overlay = document.getElementById(SETTINGS_DIALOG_OVERLAY_ID);

        regexEditor.flushAllAutoSave();
        regexEditor.cleanupFloatingButton();
        if (dialog) dialog.remove();
        if (overlay) overlay.remove();

        if (runtime.settingsDialogSavedBodyOverflow !== null) {
            document.body.style.overflow = runtime.settingsDialogSavedBodyOverflow;
            runtime.settingsDialogSavedBodyOverflow = null;
        }
        if (runtime.settingsDialogSavedHtmlOverflow !== null) {
            document.documentElement.style.overflow = runtime.settingsDialogSavedHtmlOverflow;
            runtime.settingsDialogSavedHtmlOverflow = null;
        }
    }

    function saveKeywordSection(type) {
        regexEditor.clearAutoSave(type);
        const settings = store.getSnapshot();
        const configMap = {
            title: {
                fieldId: 'titles',
                regexContainerId: 'titleRegexContainer',
                currentKeywords: settings.blockedTitles,
                currentRegexEntries: settings.titleRegexList,
                label: getLabel('titleTab', '标题关键词')
            },
            category: {
                fieldId: 'categories',
                regexContainerId: 'categoryRegexContainer',
                currentKeywords: settings.blockedCategories,
                currentRegexEntries: settings.categoryRegexList,
                label: getLabel('categoryTab', '类别')
            },
            tag: {
                fieldId: 'tags',
                regexContainerId: 'tagRegexContainer',
                currentKeywords: settings.blockedTags,
                currentRegexEntries: settings.tagRegexList,
                label: getLabel('tagTab', '标签')
            }
        };

        const config = configMap[type];
        if (!config) return;

        let changed = false;
        let errorOccurred = false;

        try {
            const textArea = document.getElementById(config.fieldId);
            if (textArea) {
                const nextKeywords = normalizeCommaSeparatedTextarea(textArea);
                if (JSON.stringify(nextKeywords) !== JSON.stringify(config.currentKeywords)) {
                    store.setKeywordList(type, nextKeywords);
                    changed = true;
                }
            }

            const regexContainer = document.getElementById(config.regexContainerId);
            if (regexContainer) {
                const entries = regexEditor.collectEntries(regexContainer);
                const currentEntries = config.currentRegexEntries.map((entry) => ({
                    pattern: entry.pattern,
                    note: entry.note
                }));
                if (JSON.stringify(entries) !== JSON.stringify(currentEntries)) {
                    compileRegexEntries(entries, { strict: true });
                    store.setRegexEntries(type, entries);
                    changed = true;
                }
            }
        } catch (error) {
            console.error(`保存${config.label}时发生错误:`, error);
            errorOccurred = true;
        }

        if (errorOccurred) {
            notifier.show(`保存${config.label}时发生错误，请重试！`, 'error');
            return;
        }

        if (changed) {
            notifySettingsChanged({ refreshDialog: false });
            notifier.show(`${config.label}已成功更新！`, 'success');
            refreshIfOpen();
        } else {
            notifier.show(`${config.label}无变化！`, 'info');
        }
    }

    function saveOtherSettings() {
        const toggle = document.getElementById('summaryScriptEnabledToggle');
        if (!toggle) return;
        const nextValue = Boolean(toggle.checked);
        const currentValue = store.getSnapshot().summaryScriptEnabled;
        if (nextValue === currentValue) {
            notifier.show('设置无变化！', 'info');
            return;
        }

        store.setSummaryScriptEnabled(nextValue);
        notifySettingsChanged({ refreshDialog: false });
        notifier.show('设置已保存！', 'success');
    }

    function initTabSwitching(dialog) {
        const tabs = dialog.querySelectorAll('.settings-tab');
        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                tabs.forEach((element) => element.classList.remove('active'));
                tab.classList.add('active');

                const contents = dialog.querySelectorAll('.settings-content');
                contents.forEach((content) => {
                    content.classList.toggle('active', content.dataset.content === tab.dataset.tab);
                });

                regexEditor.updateFloatingButton(dialog);
                requestAnimationFrame(() => regexEditor.refreshVisibleHeights(dialog));
            });
        });
    }

    function initSubtabSwitching(dialog) {
        const subtabs = dialog.querySelectorAll('.settings-subtab');
        subtabs.forEach((subtab) => {
            subtab.addEventListener('click', () => {
                const parentContent = subtab.closest('.settings-content');
                const siblingSubtabs = parentContent.querySelectorAll('.settings-subtab');
                siblingSubtabs.forEach((element) => element.classList.remove('active'));
                subtab.classList.add('active');

                const subcontents = parentContent.querySelectorAll('.settings-subcontent');
                subcontents.forEach((content) => {
                    content.classList.toggle('active', content.dataset.subcontent === subtab.dataset.subtab);
                });

                regexEditor.updateFloatingButton(dialog);
                requestAnimationFrame(() => regexEditor.refreshVisibleHeights(dialog));
            });
        });
    }

    function wireCommaTextareas(dialog) {
        ['titles', 'categories', 'tags'].forEach((id) => {
            const textarea = dialog.querySelector(`#${id}`);
            if (!textarea) return;

            textarea.addEventListener('click', () => {
                appendCommaToTextareaIfNeeded(textarea, { appendText: ', ' });
            });

            const label = dialog.querySelector(`label[for="${id}"]`);
            if (label) {
                label.addEventListener('mousedown', (event) => {
                    if (event.button !== 0) return;
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
    }

    function bindDialogEvents(dialog) {
        wireCommaTextareas(dialog);

        document.getElementById('saveTitleKeywords').addEventListener('click', () => saveKeywordSection('title'));
        document.getElementById('saveCategories').addEventListener('click', () => saveKeywordSection('category'));
        document.getElementById('saveTags').addEventListener('click', () => saveKeywordSection('tag'));
        const saveOtherButton = document.getElementById('saveOther');
        if (saveOtherButton) {
            saveOtherButton.addEventListener('click', saveOtherSettings);
        }
        document.getElementById('closeDialog').addEventListener('click', close);
        document.getElementById('exportSettings').addEventListener('click', importExport.exportSettings);
        document.getElementById('importSettings').addEventListener('click', () => document.getElementById('importSettingsFile').click());
        document.getElementById('importSettingsFile').addEventListener('change', importExport.importSettings);

        initTabSwitching(dialog);
        initSubtabSwitching(dialog);
        regexEditor.initInputs('title');
        regexEditor.initInputs('category');
        regexEditor.initInputs('tag');

        document.getElementById('addTitleRegex').addEventListener('click', () => regexEditor.addInput('title'));
        document.getElementById('addCategoryRegex').addEventListener('click', () => regexEditor.addInput('category'));
        document.getElementById('addTagRegex').addEventListener('click', () => regexEditor.addInput('tag'));

        regexEditor.updateFloatingButton(dialog);
        requestAnimationFrame(() => regexEditor.refreshVisibleHeights(dialog));
    }

    function renderInto(dialog) {
        dialog.innerHTML = buildSettingsDialogMarkup(store.getSnapshot(), profile);
    }

    function refreshIfOpen() {
        const dialog = document.getElementById(SETTINGS_DIALOG_ID);
        if (!dialog) return;

        regexEditor.flushAllAutoSave();
        renderInto(dialog);
        bindDialogEvents(dialog);
    }

    function show() {
        ensureStyle(SETTINGS_DIALOG_STYLE_ID, SETTINGS_DIALOG_CSS);

        if (runtime.settingsDialogSavedBodyOverflow === null) {
            runtime.settingsDialogSavedBodyOverflow = document.body.style.overflow;
        }
        if (runtime.settingsDialogSavedHtmlOverflow === null) {
            runtime.settingsDialogSavedHtmlOverflow = document.documentElement.style.overflow;
        }

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        let overlay = document.getElementById(SETTINGS_DIALOG_OVERLAY_ID);
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = SETTINGS_DIALOG_OVERLAY_ID;
            document.body.appendChild(overlay);
        }

        let dialog = document.getElementById(SETTINGS_DIALOG_ID);
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.id = SETTINGS_DIALOG_ID;
            document.body.appendChild(dialog);
        }

        overlay.style.display = 'block';
        renderInto(dialog);
        bindDialogEvents(dialog);
    }

    return {
        show,
        close,
        refreshIfOpen,
        setCallbacks
    };
}
