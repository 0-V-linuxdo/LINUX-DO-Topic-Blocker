import {
    BLOCK_ACTION_DIALOG_ID,
    BLOCK_ACTION_DIALOG_OVERLAY_ID,
    BLOCK_ACTION_SUB_DIALOG_ID,
    BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID
} from '../shared/constants.js';
import { dedupeBlockReasons, getBlockReasonLabelValue } from '../core/filtering.js';
import {
    setBlockCheckOptionChecked,
    toggleBlockCheckOption
} from './block-dialog-options.js';

export function createBlockUnblockDialog({
    notifier,
    shell,
    profileLabels,
    ensureBlockActionStyles,
    applyUnblockFromReasons
}) {
    const {
        bindEscapeToDialogClose,
        closeBlockedItemDialog,
        closeBlockedItemSubDialog,
        lockPageForDialog
    } = shell;

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
            .map((entry) => entry.reason);

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
            const { label, value } = getBlockReasonLabelValue(reason, profileLabels);
            reasonLabelTexts.push(label);
            const item = document.createElement('li');
            const labelElement = document.createElement('button');
            labelElement.type = 'button';
            labelElement.className = 'block-dialog-reason-option block-dialog-check';
            labelElement.setAttribute('role', 'checkbox');
            labelElement.dataset.value = String(index);
            setBlockCheckOptionChecked(labelElement, true);
            const checkBox = document.createElement('span');
            checkBox.className = 'block-dialog-check-box';
            checkBox.setAttribute('aria-hidden', 'true');
            const labelText = document.createElement('span');
            labelText.className = 'block-dialog-reason-label';
            labelText.textContent = label;
            const valueText = document.createElement('span');
            valueText.className = 'block-dialog-reason-value';
            valueText.textContent = value;
            labelElement.appendChild(checkBox);
            labelElement.appendChild(labelText);
            labelElement.appendChild(valueText);
            labelElement.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleBlockCheckOption(labelElement);
            });
            item.appendChild(labelElement);
            reasonList.appendChild(item);
        });

        if (reasonLabelTexts.length > 0) {
            const longest = Math.max(...reasonLabelTexts.map((text) => text.length));
            dialog.style.setProperty('--block-dialog-reason-label-width', `${Math.max(3, longest + 0.5)}em`);
        }

        const getSelectedReasons = () => Array.from(reasonList.querySelectorAll('.block-dialog-check[aria-checked="true"]'))
            .map((optionElement) => {
                const index = Number.parseInt(optionElement.dataset.value || '', 10);
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
                notifier.show('请选择要取消的屏蔽规则', 'info');
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
            selectedReasons.forEach((reason) => {
                const { label, value } = getBlockReasonLabelValue(reason, profileLabels);
                subReasonLabelTexts.push(label);
                const item = document.createElement('li');
                const line = document.createElement('div');
                line.className = 'block-dialog-reason-line';
                const labelText = document.createElement('span');
                labelText.className = 'block-dialog-reason-label';
                labelText.textContent = label;
                const valueText = document.createElement('span');
                valueText.className = 'block-dialog-reason-value';
                valueText.textContent = value;
                line.appendChild(labelText);
                line.appendChild(valueText);
                item.appendChild(line);
                subReasonList.appendChild(item);
            });

            if (subReasonLabelTexts.length > 0) {
                const longest = Math.max(...subReasonLabelTexts.map((text) => text.length));
                subDialog.style.setProperty('--block-dialog-reason-label-width', `${Math.max(3, longest + 0.5)}em`);
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
        reasonList.addEventListener('block-option-change', updateConfirmButtonState);
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

        bindEscapeToDialogClose();
        confirmButton.focus();
    }

    return {
        showBlockedItemDialog
    };
}
