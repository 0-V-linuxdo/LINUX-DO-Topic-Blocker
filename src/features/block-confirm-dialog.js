import {
    BLOCK_ACTION_DIALOG_ID,
    BLOCK_ACTION_DIALOG_OVERLAY_ID,
    BLOCK_ACTION_SUB_DIALOG_ID,
    BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID
} from '../shared/constants.js';
import {
    createBlockCheckOption,
    createBlockOptionGroup,
    getCheckedOptionValues,
    setBlockCheckOptionChecked
} from './block-dialog-options.js';

function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = '0px';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

export function createBlockConfirmDialog({
    notifier,
    shell,
    getLabel,
    getDialogLabel,
    ensureBlockActionStyles,
    getTopicTitleFromItem,
    getCategoryTextFromItem,
    getTagListFromItem,
    applyBlockTarget
}) {
    const {
        bindEscapeToDialogClose,
        closeBlockedItemDialog,
        closeBlockedItemSubDialog,
        lockPageForDialog
    } = shell;

    function showBlockConfirmDialog(target, item) {
        if (!target || !target.kind) return;
        ensureBlockActionStyles();
        closeBlockedItemDialog();
        lockPageForDialog();

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

        const previewTitleText = getTopicTitleFromItem(item);
        const previewFallbackValue = (target.kind === 'search_blacklist' || target.kind === 'title_keyword')
            ? (target.value || '')
            : '';
        const previewTitleValue = previewTitleText || previewFallbackValue;

        const categoryText = getCategoryTextFromItem(item);
        const tagList = getTagListFromItem(item);

        const detailList = document.createElement('ul');
        detailList.className = 'block-dialog-reasons block-dialog-target';
        const titleItem = document.createElement('li');
        titleItem.className = 'block-dialog-target-item';
        const titleLabel = document.createElement('span');
        titleLabel.className = 'block-dialog-target-label';
        titleLabel.textContent = getDialogLabel('title', '标题');
        const titleInput = document.createElement('textarea');
        titleInput.className = 'block-dialog-target-input';
        titleInput.value = previewTitleValue;
        titleInput.rows = 1;
        titleInput.readOnly = true;
        titleInput.setAttribute('aria-label', getLabel('title', '标题'));
        titleItem.appendChild(titleLabel);
        titleItem.appendChild(titleInput);
        detailList.appendChild(titleItem);

        const titleKeywordItem = document.createElement('li');
        titleKeywordItem.className = 'block-dialog-target-item block-dialog-title-keywords';
        const titleKeywordLabel = document.createElement('span');
        titleKeywordLabel.className = 'block-dialog-target-label';
        titleKeywordLabel.textContent = getDialogLabel('blockDialogTitleKeyword', '关键词');
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
        const titleKeywordOptions = createBlockOptionGroup([], getLabel('blockDialogTitleKeyword', '关键词'));
        titleKeywordOptions.style.display = 'none';
        titleKeywordContent.appendChild(titleKeywordPreview);
        titleKeywordContent.appendChild(titleKeywordOptions);
        titleKeywordItem.appendChild(titleKeywordLabel);
        titleKeywordItem.appendChild(titleKeywordContent);
        titleKeywordItem.style.display = 'none';
        detailList.appendChild(titleKeywordItem);

        const titleKeywordOptionMap = new Map();
        let currentTitleKeywordSelection = '';
        let hasTouchedBlockOptions = false;
        const markBlockOptionsTouched = () => {
            hasTouchedBlockOptions = true;
        };
        titleKeywordOptions.addEventListener('block-option-change', markBlockOptionsTouched);

        const updateDialogLabelWidth = () => {
            const labelTexts = [getDialogLabel('title', '标题')];
            if (currentTitleKeywordSelection || titleKeywordOptionMap.size > 0) {
                labelTexts.push(getDialogLabel('blockDialogTitleKeyword', '关键词'));
            }
            if (categoryText) labelTexts.push(getDialogLabel('category', '类别'));
            if (tagList.length > 0) labelTexts.push(getDialogLabel('tag', '标签'));
            const longest = Math.max(...labelTexts.map((text) => text.length));
            dialog.style.setProperty('--block-dialog-label-width', `${Math.max(3, longest + 0.5)}em`);
        };

        const normalizeTitleKeyword = (value) => value ? value.replace(/\s+/g, ' ').trim() : '';

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
            if (typeof titleInput.setSelectionRange !== 'function') return;
            const end = titleInput.value.length;
            titleInput.setSelectionRange(end, end);
            titleInput.blur();
            const selection = window.getSelection?.();
            if (selection) selection.removeAllRanges();
        };

        const syncTitleKeywordSelection = () => {
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
                setBlockCheckOptionChecked(existing, true);
                return false;
            }

            const optionElement = createBlockCheckOption(normalized, normalized, true);
            titleKeywordOptions.appendChild(optionElement);
            titleKeywordOptionMap.set(key, optionElement);
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
                categoryLabel.textContent = getDialogLabel('category', '类别');
                categoryOptions = createBlockOptionGroup([categoryText], getLabel('category', '类别'));
                categoryOptions.addEventListener('block-option-change', markBlockOptionsTouched);
                categoryItem.appendChild(categoryLabel);
                categoryItem.appendChild(categoryOptions);
                metaList.appendChild(categoryItem);
            }
            if (tagList.length > 0) {
                const tagItem = document.createElement('li');
                tagItem.className = 'block-dialog-target-item block-dialog-target-item-options';
                const tagLabel = document.createElement('span');
                tagLabel.className = 'block-dialog-target-label';
                tagLabel.textContent = getDialogLabel('tag', '标签');
                tagOptions = createBlockOptionGroup(tagList, getLabel('tag', '标签'));
                tagOptions.addEventListener('block-option-change', markBlockOptionsTouched);
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

            const selectedTitleKeywords = getCheckedOptionValues(titleKeywordOptions);
            const selectedCategories = getCheckedOptionValues(categoryOptions);
            const selectedTags = getCheckedOptionValues(tagOptions);
            const hasSelectedBlockOption =
                selectedTitleKeywords.length > 0 ||
                selectedCategories.length > 0 ||
                selectedTags.length > 0;
            if (hasTouchedBlockOptions && !hasSelectedBlockOption) {
                notifier.show('请选择至少一个要屏蔽的内容', 'info');
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
                    titleKeywordLabel.textContent = getDialogLabel('titleKeyword', '标题关键词');
                    const titleKeywordTextElement = document.createElement('div');
                    titleKeywordTextElement.className = 'block-dialog-target-text';
                    titleKeywordTextElement.textContent = selectedTitleKeywords.join(', ');
                    titleKeywordItem.appendChild(titleKeywordLabel);
                    titleKeywordItem.appendChild(titleKeywordTextElement);
                    subMetaList.appendChild(titleKeywordItem);
                }

                if (selectedCategories.length > 0) {
                    const categoryItem = document.createElement('li');
                    categoryItem.className = 'block-dialog-target-item';
                    const categoryLabel = document.createElement('span');
                    categoryLabel.className = 'block-dialog-target-label';
                    categoryLabel.textContent = getDialogLabel('category', '类别');
                    const categoryTextElement = document.createElement('div');
                    categoryTextElement.className = 'block-dialog-target-text';
                    categoryTextElement.textContent = selectedCategories.join(', ');
                    categoryItem.appendChild(categoryLabel);
                    categoryItem.appendChild(categoryTextElement);
                    subMetaList.appendChild(categoryItem);
                }

                if (selectedTags.length > 0) {
                    const tagItem = document.createElement('li');
                    tagItem.className = 'block-dialog-target-item';
                    const tagLabel = document.createElement('span');
                    tagLabel.className = 'block-dialog-target-label';
                    tagLabel.textContent = getDialogLabel('tag', '标签');
                    const tagTextElement = document.createElement('div');
                    tagTextElement.className = 'block-dialog-target-text';
                    tagTextElement.textContent = selectedTags.join(', ');
                    tagItem.appendChild(tagLabel);
                    tagItem.appendChild(tagTextElement);
                    subMetaList.appendChild(tagItem);
                }
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
                    addTitleValue(currentTitleKeywordSelection || fallbackTitle || fallbackValue);
                }

                titleValues.forEach((nextValue) => {
                    const nextTarget = { kind: titleKind, value: nextValue };
                    if (titleKind === 'search_blacklist' && target.searchTerm) {
                        nextTarget.searchTerm = target.searchTerm;
                    }
                    applyBlockTarget(nextTarget);
                });

                selectedCategories.forEach((nextValue) => {
                    applyBlockTarget({ kind: 'category_keyword', value: nextValue });
                });

                selectedTags.forEach((nextValue) => {
                    applyBlockTarget({ kind: 'tag_keyword', value: nextValue });
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

        bindEscapeToDialogClose();
        autoResizeTextarea(titleInput);
        confirmButton.focus();
    }

    return {
        showBlockConfirmDialog
    };
}
