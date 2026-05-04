import {
    BLOCK_ACTION_DIALOG_OVERLAY_ID,
    BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID
} from '../shared/constants.js';

export function createBlockDialogShell({ runtime }) {
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

        if (runtime.blockDialogEscapeHandler) {
            document.removeEventListener('keydown', runtime.blockDialogEscapeHandler);
            runtime.blockDialogEscapeHandler = null;
        }

        if (runtime.blockDialogSavedBodyOverflow !== null) {
            document.body.style.overflow = runtime.blockDialogSavedBodyOverflow;
            runtime.blockDialogSavedBodyOverflow = null;
        }

        if (runtime.blockDialogSavedHtmlOverflow !== null) {
            document.documentElement.style.overflow = runtime.blockDialogSavedHtmlOverflow;
            runtime.blockDialogSavedHtmlOverflow = null;
        }
    }

    function lockPageForDialog() {
        if (runtime.blockDialogSavedBodyOverflow === null) {
            runtime.blockDialogSavedBodyOverflow = document.body.style.overflow;
        }
        if (runtime.blockDialogSavedHtmlOverflow === null) {
            runtime.blockDialogSavedHtmlOverflow = document.documentElement.style.overflow;
        }
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    function bindEscapeToDialogClose() {
        runtime.blockDialogEscapeHandler = (event) => {
            if (event.key === 'Escape') {
                if (closeBlockedItemSubDialog()) return;
                closeBlockedItemDialog();
            }
        };
        document.addEventListener('keydown', runtime.blockDialogEscapeHandler);
    }

    return {
        bindEscapeToDialogClose,
        closeBlockedItemDialog,
        closeBlockedItemSubDialog,
        lockPageForDialog
    };
}
