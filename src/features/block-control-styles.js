import {
    BLOCK_ACTION_BUTTON_CLASS,
    BLOCK_ACTION_BUTTON_SIZE,
    BLOCK_ACTION_DIALOG_ID,
    BLOCK_ACTION_DIALOG_OVERLAY_ID,
    BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID,
    BLOCK_ACTION_VISIBLE_CLASS,
    BLOCKED_REVEALED_CLASS,
    BLOCK_TOGGLE_WRAPPER_ID
} from '../shared/constants.js';

export const BLOCK_TOGGLE_CSS = `
    #${BLOCK_TOGGLE_WRAPPER_ID} {
        position: fixed;
        top: 140px;
        right: 16px;
        z-index: 900;
        pointer-events: auto;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 36px;
        padding: 0 10px;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,0.12);
        background: #ffffff;
        color: #111111;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        user-select: none;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button:hover {
        transform: translateY(-1px);
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button:focus-visible {
        outline: 2px solid rgba(255,230,15,0.6);
        outline-offset: 2px;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-icon {
        width: 18px;
        height: 18px;
        display: block;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-count {
        min-width: 16px;
        text-align: center;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed {
        color: #9aa0a6;
        border-color: rgba(0,0,0,0.08);
        box-shadow: none;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed .block-toggle-icon {
        opacity: 0.5;
    }
    .${BLOCKED_REVEALED_CLASS} {
        background-color: #ffe1e1 !important;
    }
    tr.${BLOCKED_REVEALED_CLASS} td {
        background-color: #ffe1e1 !important;
    }
    @media (prefers-color-scheme: dark) {
        #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
            background: #2b2b2b;
            color: #f2f2f2;
            border-color: rgba(255,255,255,0.18);
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
        #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed {
            color: #777777;
            border-color: rgba(255,255,255,0.08);
            box-shadow: none;
        }
        .${BLOCKED_REVEALED_CLASS} {
            background-color: #4a1f1f !important;
        }
        tr.${BLOCKED_REVEALED_CLASS} td {
            background-color: #4a1f1f !important;
        }
    }
    @media (max-width: 768px) {
        #${BLOCK_TOGGLE_WRAPPER_ID} {
            top: 120px;
            right: 12px;
        }
        #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
            height: 34px;
            padding: 0 8px;
            border-radius: 10px;
        }
    }
`;

export const BLOCK_ACTION_CSS = `
    .${BLOCK_ACTION_BUTTON_CLASS} {
        position: fixed;
        top: 0;
        left: 0;
        width: ${BLOCK_ACTION_BUTTON_SIZE}px;
        height: ${BLOCK_ACTION_BUTTON_SIZE}px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,0.2);
        background: rgba(255,255,255,0.9);
        color: #222222;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        opacity: 0;
        transform: scale(0.92);
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        transition: opacity 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
        cursor: pointer;
        z-index: 9999;
    }
    .${BLOCK_ACTION_BUTTON_CLASS} svg {
        width: 100%;
        height: 100%;
        display: block;
    }
    .${BLOCK_ACTION_BUTTON_CLASS}.${BLOCK_ACTION_VISIBLE_CLASS},
    .${BLOCK_ACTION_BUTTON_CLASS}:focus-visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
    }
    .${BLOCK_ACTION_BUTTON_CLASS}:focus-visible {
        outline: 2px solid rgba(211,47,47,0.45);
        outline-offset: 2px;
    }
    .${BLOCK_ACTION_BUTTON_CLASS}.is-blocked {
        color: #d32f2f;
        border-color: rgba(211,47,47,0.35);
    }
    #${BLOCK_ACTION_DIALOG_OVERLAY_ID} {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.45);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }
    #${BLOCK_ACTION_DIALOG_OVERLAY_ID}.has-sub-dialog > #${BLOCK_ACTION_DIALOG_ID} {
        visibility: hidden;
        pointer-events: none;
    }
    #${BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID} {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.2);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }
    .block-action-dialog {
        width: min(460px, 90vw);
        background: #ffffff;
        color: #222222;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        border: 1px solid rgba(0,0,0,0.08);
        padding: 20px 22px;
        font-size: 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .block-action-dialog h3 {
        margin: 0 0 6px 0;
        font-size: 20px;
    }
    .block-action-dialog .block-dialog-summary {
        margin: 0 0 12px 0;
        font-weight: 600;
        color: #333333;
    }
    .block-action-dialog .block-dialog-divider {
        height: 1px;
        background: rgba(0,0,0,0.1);
        margin: 4px 0 10px 0;
    }
    .block-action-dialog .block-dialog-reasons {
        margin: 0 0 16px 0;
        padding-left: 18px;
        max-height: 220px;
        overflow-y: auto;
        font-size: 15px;
        color: #555555;
    }
    .block-action-dialog .block-dialog-reasons.is-selectable {
        list-style: none;
        padding-left: 0;
    }
    .block-action-dialog .block-dialog-target,
    .block-action-dialog .block-dialog-meta {
        list-style: none;
        padding-left: 0;
    }
    .block-action-dialog .block-dialog-reasons li {
        margin: 6px 0;
        line-height: 1.5;
    }
    .block-action-dialog .block-dialog-reason-option,
    .block-action-dialog .block-dialog-reason-line {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }
    .block-action-dialog .block-dialog-reason-option {
        cursor: pointer;
    }
    .block-action-dialog .block-dialog-check {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        color: inherit !important;
        font: inherit !important;
        line-height: inherit !important;
        text-align: left !important;
        cursor: pointer !important;
        box-shadow: none !important;
        -webkit-tap-highlight-color: transparent;
    }
    .block-action-dialog .block-dialog-check-box {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        flex: 0 0 16px;
        border: 1.5px solid #9ca3af;
        border-radius: 4px;
        background: #ffffff;
        box-sizing: border-box;
    }
    .block-action-dialog .block-dialog-check.is-checked .block-dialog-check-box {
        border-color: #d32f2f;
        background: #d32f2f;
    }
    .block-action-dialog .block-dialog-check.is-checked .block-dialog-check-box::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 1px;
        width: 5px;
        height: 9px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
    .block-action-dialog .block-dialog-check:focus-visible {
        outline: none !important;
    }
    .block-action-dialog .block-dialog-check:focus-visible .block-dialog-check-box {
        box-shadow: 0 0 0 3px rgba(211,47,47,0.22);
    }
    .block-action-dialog .block-dialog-check-text {
        min-width: 0;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-reason-option.block-dialog-check {
        width: 100% !important;
        align-items: flex-start !important;
    }
    .block-action-dialog .block-dialog-reason-option .block-dialog-check-box {
        margin-top: 3px;
    }
    .block-action-dialog .block-dialog-reason-label {
        min-width: var(--block-dialog-reason-label-width, 7em);
        flex: 0 0 var(--block-dialog-reason-label-width, 7em);
        text-align: left;
        white-space: nowrap;
    }
    .block-action-dialog .block-dialog-reason-value {
        flex: 1 1 auto;
        min-width: 0;
        text-align: left;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-target-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .block-action-dialog .block-dialog-target-item.block-dialog-target-item-options {
        align-items: baseline;
    }
    .block-action-dialog .block-dialog-target-label {
        position: relative;
        font-weight: 600;
        color: #333333;
        white-space: nowrap;
        min-width: var(--block-dialog-label-width, 8em);
        text-align: left;
        flex: 0 0 var(--block-dialog-label-width, 8em);
        padding-left: 12px;
    }
    .block-action-dialog .block-dialog-target-label::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: inherit;
    }
    .block-action-dialog .block-dialog-target-input {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 32px;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 6px;
        padding: 6px 8px;
        font-size: 16px;
        color: #222222;
        background: #ffffff;
        box-sizing: border-box;
    }
    .block-action-dialog .block-dialog-target-text {
        flex: 1 1 auto;
        min-width: 0;
        padding: 6px 0;
        font-size: 16px;
        color: #222222;
        line-height: 1.4;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-target-input[readonly] {
        cursor: text;
        opacity: 1;
    }
    .block-action-dialog .block-dialog-target-input[readonly]:focus {
        border-color: rgba(0,0,0,0.2);
        box-shadow: none;
    }
    .block-action-dialog textarea.block-dialog-target-input {
        resize: none;
        overflow: hidden;
        line-height: 1.4;
    }
    .block-action-dialog .block-dialog-target-input:focus {
        outline: none;
        border-color: rgba(211,47,47,0.6);
        box-shadow: 0 0 0 2px rgba(211,47,47,0.15);
    }
    .block-action-dialog .block-dialog-target-options {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 15px;
        color: #222222;
        display: flex;
        flex-wrap: wrap;
        gap: 6px 10px;
        padding: 0;
    }
    .block-action-dialog .block-dialog-target-options .block-dialog-check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
    .block-action-dialog .block-dialog-title-keywords {
        align-items: center;
    }
    .block-action-dialog .block-dialog-title-keywords .block-dialog-target-label {
        margin-left: 16px;
        min-width: calc(var(--block-dialog-label-width, 8em) - 16px);
        flex: 0 0 calc(var(--block-dialog-label-width, 8em) - 16px);
    }
    .block-action-dialog .block-dialog-title-keywords .block-dialog-target-label::before {
        content: '';
        width: 8px;
        height: 8px;
        border: 2px solid currentColor;
        border-radius: 999px;
        background: transparent;
        left: 1px;
        box-sizing: border-box;
    }
    .block-action-dialog .block-dialog-title-keywords.has-options {
        align-items: flex-start;
    }
    .block-action-dialog .block-dialog-title-keywords-content {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .block-action-dialog .block-dialog-title-keyword-preview {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        color: #555555;
    }
    .block-action-dialog .block-dialog-title-keyword-preview.is-hidden {
        display: none;
    }
    .block-action-dialog .block-dialog-title-keyword-text {
        font-weight: 600;
        color: #222222;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-title-keyword-confirm,
    .block-action-dialog .block-dialog-title-keyword-cancel {
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid rgba(0,0,0,0.18);
        color: #333333;
    }
    .block-action-dialog .block-dialog-title-keyword-confirm {
        background: #f4f4f4;
    }
    .block-action-dialog .block-dialog-title-keyword-cancel {
        background: #ffffff;
    }
    .block-action-dialog .block-dialog-title-keyword-confirm:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .block-action-dialog .block-dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .block-action-dialog .block-dialog-actions button {
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
    }
    .block-action-dialog .block-dialog-confirm {
        background: #d32f2f;
        color: #ffffff;
    }
    .block-action-dialog .block-dialog-confirm:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    .block-action-dialog .block-dialog-cancel {
        background: #f4f4f4;
        color: #333333;
        border-color: rgba(0,0,0,0.12);
    }
    .block-action-dialog .block-dialog-confirm:hover {
        background: #c62828;
    }
    .block-action-dialog .block-dialog-cancel:hover {
        background: #e8e8e8;
    }
    @media (prefers-color-scheme: dark) {
        .${BLOCK_ACTION_BUTTON_CLASS} {
            background: rgba(40,40,40,0.9);
            border-color: rgba(255,255,255,0.18);
            color: #f0f0f0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .${BLOCK_ACTION_BUTTON_CLASS}.is-blocked {
            color: #ff6b6b;
            border-color: rgba(255,107,107,0.4);
        }
        .block-action-dialog {
            background: #2b2b2b;
            color: #f2f2f2;
            border-color: rgba(255,255,255,0.1);
        }
        .block-action-dialog .block-dialog-summary {
            color: #f0f0f0;
        }
        .block-action-dialog .block-dialog-divider {
            background: rgba(255,255,255,0.18);
        }
        .block-action-dialog .block-dialog-reasons {
            color: #cfcfcf;
        }
        .block-action-dialog .block-dialog-target-label {
            color: #f0f0f0;
        }
        .block-action-dialog .block-dialog-target-input {
            background: #3a3a3a;
            color: #f2f2f2;
            border-color: rgba(255,255,255,0.2);
        }
        .block-action-dialog .block-dialog-target-text {
            color: #f2f2f2;
        }
        .block-action-dialog .block-dialog-target-input:focus {
            border-color: rgba(255,107,107,0.7);
            box-shadow: 0 0 0 2px rgba(255,107,107,0.2);
        }
        .block-action-dialog .block-dialog-target-options {
            color: #f2f2f2;
        }
        .block-action-dialog .block-dialog-check-box {
            border-color: rgba(255,255,255,0.55);
            background: #3a3a3a;
        }
        .block-action-dialog .block-dialog-check.is-checked .block-dialog-check-box {
            border-color: #ff6b6b;
            background: #ff6b6b;
        }
        .block-action-dialog .block-dialog-title-keyword-preview {
            color: #cfcfcf;
        }
        .block-action-dialog .block-dialog-title-keyword-text {
            color: #f0f0f0;
        }
        .block-action-dialog .block-dialog-title-keyword-confirm {
            background: #3a3a3a;
            color: #f0f0f0;
            border-color: rgba(255,255,255,0.16);
        }
        .block-action-dialog .block-dialog-title-keyword-cancel {
            background: #2f2f2f;
            color: #f0f0f0;
            border-color: rgba(255,255,255,0.16);
        }
        .block-action-dialog .block-dialog-cancel {
            background: #3a3a3a;
            color: #f0f0f0;
            border-color: rgba(255,255,255,0.16);
        }
        .block-action-dialog .block-dialog-cancel:hover {
            background: #444444;
        }
    }
    @media (hover: none) {
        .${BLOCK_ACTION_BUTTON_CLASS} {
            transition: none;
        }
    }
`;
