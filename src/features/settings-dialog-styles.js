import {
    SETTINGS_DIALOG_ID,
    SETTINGS_DIALOG_OVERLAY_ID
} from '../shared/constants.js';

export const SETTINGS_DIALOG_CSS = `
    #${SETTINGS_DIALOG_OVERLAY_ID} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: none;
    }
    #${SETTINGS_DIALOG_ID} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 2px solid rgba(137, 207, 240, 0.6);
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        width: calc(100vw - 24px);
        max-width: 760px;
        max-height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 0 20px 20px;
        color: #333;
        box-sizing: border-box;
    }
    #${SETTINGS_DIALOG_ID} h2 {
        margin: 0 0 20px 0;
        color: #007bff;
        font-size: 24px;
        text-align: center;
    }
    #${SETTINGS_DIALOG_ID} textarea {
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
    #${SETTINGS_DIALOG_ID} button {
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
    #${SETTINGS_DIALOG_ID} button:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
    #${SETTINGS_DIALOG_ID} .actionButton {
        background-color: #007bff;
        position: fixed;
        bottom: 10px;
        right: 40px;
        box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
    }
    #${SETTINGS_DIALOG_ID} .saveButton {
        background-color: #28a745;
    }
    #${SETTINGS_DIALOG_ID} .settings-header {
        position: sticky;
        top: 0;
        z-index: 30;
        background: #ffffff;
        padding: 20px 20px 0;
        margin: 0 -20px 0;
        border-bottom: none;
    }
    #${SETTINGS_DIALOG_ID} .settings-body {
        flex: 1 1 auto;
        overflow-y: auto;
        min-height: 0;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="regex-"] {
        padding-bottom: 20px;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="regex-"] > div[id$="RegexContainer"] {
        margin-left: -12px;
        margin-right: -12px;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="view-"] > textarea {
        width: calc(100% + 24px);
        margin-left: -12px;
        margin-right: -12px;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="view-"] > textarea {
        width: calc(100% + 30px);
        margin-left: -15px;
        margin-right: -15px;
        box-sizing: border-box;
        min-height: 260px;
        height: 260px;
    }
    #${SETTINGS_DIALOG_ID} .regex-help p {
        margin: 0 0 6px;
    }
    #${SETTINGS_DIALOG_ID} .regex-help ul {
        margin: 0;
        padding-left: 18px;
    }
    #${SETTINGS_DIALOG_ID}.regex-fab-enabled .regex-add-wrapper {
        display: none;
    }
    #${SETTINGS_DIALOG_ID} .regex-add-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
    }
    #${SETTINGS_DIALOG_ID} .regex-add-wrapper .regex-add-button {
        margin: 0;
    }
    .regex-floating-add {
        position: fixed;
        z-index: 10001;
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #007bff;
        box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
        transition: opacity 0.2s ease;
        display: none;
    }
    .regex-floating-add:hover {
        opacity: 0.92;
    }
    #${SETTINGS_DIALOG_ID} #closeDialog {
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
        max-width: 30px;
        max-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-sizing: border-box;
        color: #fff;
        font-size: 0;
        line-height: 0;
        transition: background-color 0.3s ease;
    }
    #${SETTINGS_DIALOG_ID} #closeDialog::before,
    #${SETTINGS_DIALOG_ID} #closeDialog::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        background: #fff;
        border-radius: 2px;
        transform-origin: center;
    }
    #${SETTINGS_DIALOG_ID} #closeDialog::before {
        transform: translate(-50%, -50%) rotate(45deg);
    }
    #${SETTINGS_DIALOG_ID} #closeDialog::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
    #${SETTINGS_DIALOG_ID} .settings-tabs {
        display: flex;
        justify-content: space-around;
        margin-bottom: 0;
        border-bottom: 2px solid #e9ecef;
    }
    #${SETTINGS_DIALOG_ID} .settings-tab {
        padding: 10px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: all 0.3s ease;
        font-size: 16px;
        font-weight: bold;
        color: #495057;
    }
    #${SETTINGS_DIALOG_ID} .settings-tab:hover {
        color: #007bff;
    }
    #${SETTINGS_DIALOG_ID} .settings-tab.active {
        color: #007bff;
        border-bottom-color: #007bff;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtabs {
        display: flex;
        justify-content: flex-start;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab {
        padding: 6px 12px;
        cursor: pointer;
        border: 1px solid #dee2e6;
        border-radius: 15px;
        transition: all 0.3s ease;
        font-size: 14px;
        margin-right: 10px;
        background-color: #f8f9fa;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab:hover {
        background-color: #e9ecef;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab^="regex-"] {
        background-color: #ffb347;
        border-color: #ffb347;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab="export"] {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
    }
    #${SETTINGS_DIALOG_ID} .settings-content,
    #${SETTINGS_DIALOG_ID} .settings-subcontent {
        display: none;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 8px;
    }
    #${SETTINGS_DIALOG_ID} .settings-content.active,
    #${SETTINGS_DIALOG_ID} .settings-subcontent.active {
        display: block;
    }
    #${SETTINGS_DIALOG_ID} .settings-content label,
    #${SETTINGS_DIALOG_ID} .settings-subcontent label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
        color: #495057;
    }
    #${SETTINGS_DIALOG_ID} .settings-content label input[type="checkbox"],
    #${SETTINGS_DIALOG_ID} .settings-subcontent label input[type="checkbox"] {
        margin-right: 8px;
    }
    #${SETTINGS_DIALOG_ID} .settings-hint {
        margin: 0 0 12px;
        font-size: 13px;
        color: #6c757d;
        line-height: 1.5;
    }
    #${SETTINGS_DIALOG_ID} .regex-input {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
        margin-bottom: 15px;
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.03);
        transition: all 0.3s ease;
    }
    #${SETTINGS_DIALOG_ID} .regex-input:hover {
        background: rgba(0, 0, 0, 0.05);
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-text {
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 36px;
        height: auto;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        line-height: 1.4;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        resize: vertical;
        white-space: pre-wrap;
        word-break: break-all;
        overflow-wrap: anywhere;
        transition: all 0.3s ease;
        margin-bottom: 0;
        overflow-y: hidden;
        box-sizing: border-box;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-text:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        outline: none;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-note {
        height: 32px;
        padding: 6px 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 13px;
        transition: all 0.3s ease;
        box-sizing: border-box;
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-note:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        outline: none;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-note-row,
    #${SETTINGS_DIALOG_ID} .regex-input .regex-text-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .delete-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 0;
        background-color: transparent;
        color: #dc3545;
        font-size: 16px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .delete-btn:hover {
        border-color: #dc3545;
        transform: translateY(-1px);
    }
    #${SETTINGS_DIALOG_ID} .regex-error {
        color: #dc3545;
        font-size: 12px;
        margin-top: 4px;
    }
    #${SETTINGS_DIALOG_ID} .regex-help {
        font-size: 12px;
        color: #666;
        margin-top: 5px;
    }
    @media (prefers-color-scheme: dark) {
        #${SETTINGS_DIALOG_ID} {
            background: #2c2c2c;
            color: #e0e0e0;
            border-color: rgba(77, 166, 255, 0.6);
        }
        #${SETTINGS_DIALOG_ID} .settings-header {
            background: #2c2c2c;
        }
        #${SETTINGS_DIALOG_ID} .settings-tabs {
            border-bottom-color: rgba(255, 255, 255, 0.12);
        }
        #${SETTINGS_DIALOG_ID} h2 {
            color: #4da6ff;
        }
        #${SETTINGS_DIALOG_ID} textarea,
        #${SETTINGS_DIALOG_ID} input[type="text"] {
            background: #3a3a3a;
            color: #e0e0e0;
            border-color: #555;
        }
        #${SETTINGS_DIALOG_ID} .settings-tab {
            color: #bbb;
        }
        #${SETTINGS_DIALOG_ID} .settings-tab:hover {
            color: #4da6ff;
        }
        #${SETTINGS_DIALOG_ID} .settings-tab.active {
            color: #4da6ff;
            border-bottom-color: #4da6ff;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab {
            background-color: #3a3a3a;
            border-color: #555;
            color: #e0e0e0;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab:hover {
            background-color: #4a4a4a;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab.active {
            background-color: #4da6ff;
            color: #2c2c2c;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab^="regex-"] {
            background-color: #ffb347;
            border-color: #ffb347;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab="export"] {
            background-color: #28a745;
            border-color: #28a745;
            color: #ffffff;
        }
        #${SETTINGS_DIALOG_ID} .settings-content,
        #${SETTINGS_DIALOG_ID} .settings-subcontent {
            background-color: #3a3a3a;
        }
        #${SETTINGS_DIALOG_ID} .settings-content label,
        #${SETTINGS_DIALOG_ID} .settings-subcontent label {
            color: #bbb;
        }
        #${SETTINGS_DIALOG_ID} .regex-help {
            color: #aaa;
        }
        #${SETTINGS_DIALOG_ID} .regex-input {
            background: rgba(255, 255, 255, 0.05);
        }
        #${SETTINGS_DIALOG_ID} .regex-input:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        #${SETTINGS_DIALOG_ID} .regex-input .regex-text,
        #${SETTINGS_DIALOG_ID} .regex-input .regex-note {
            background-color: #333;
            border-color: #4a4a4a;
            color: #e0e0e0;
        }
    }
`;
