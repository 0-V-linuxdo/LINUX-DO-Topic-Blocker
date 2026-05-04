import { createBlockConfirmDialog } from './block-confirm-dialog.js';
import { createBlockDialogShell } from './block-dialog-shell.js';
import { createBlockUnblockDialog } from './block-unblock-dialog.js';

export function createBlockDialogs({
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
}) {
    const shell = createBlockDialogShell({ runtime });
    const confirmDialog = createBlockConfirmDialog({
        notifier,
        shell,
        getLabel,
        getDialogLabel,
        ensureBlockActionStyles,
        getTopicTitleFromItem,
        getCategoryTextFromItem,
        getTagListFromItem,
        applyBlockTarget
    });
    const unblockDialog = createBlockUnblockDialog({
        notifier,
        shell,
        profileLabels,
        ensureBlockActionStyles,
        applyUnblockFromReasons
    });

    return {
        closeBlockedItemDialog: shell.closeBlockedItemDialog,
        showBlockConfirmDialog: confirmDialog.showBlockConfirmDialog,
        showBlockedItemDialog: unblockDialog.showBlockedItemDialog
    };
}
