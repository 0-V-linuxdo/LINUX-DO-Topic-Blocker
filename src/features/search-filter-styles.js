import { SEARCH_FILTER_WRAPPER_ID } from '../shared/constants.js';

export const SEARCH_FILTER_CSS = `
    #${SEARCH_FILTER_WRAPPER_ID} {
      --linuxdo-filter-bg-color: #ffffff;
      --linuxdo-filter-font-color: #1f1f1f;
      --linuxdo-filter-border-color: rgba(0,0,0,.12);
      --linuxdo-filter-placeholder-color: rgba(0,0,0,0.4);
      --linuxdo-filter-label-hover-color: #333333;
      --linuxdo-filter-focus-bg-color: #faf9e4;
      --linuxdo-filter-fab-size: 42px;
      --linuxdo-filter-fab-icon-color: #d32f2f;
      --linuxdo-filter-fab-icon-size: 28px;
      position: fixed !important;
      top: 193px !important;
      right: 16px !important;
      z-index: 900 !important;
      pointer-events: auto !important;
      width: var(--linuxdo-filter-fab-size);
      height: var(--linuxdo-filter-fab-size);
      display: block;
      padding: 0;
      box-sizing: border-box;
      overflow: visible;
    }
    @media (prefers-color-scheme: dark) {
      #${SEARCH_FILTER_WRAPPER_ID} {
        --linuxdo-filter-bg-color: #333333;
        --linuxdo-filter-font-color: #ffffff;
        --linuxdo-filter-border-color: rgba(255,255,255,0.12);
        --linuxdo-filter-placeholder-color: rgba(255,255,255,0.4);
        --linuxdo-filter-label-hover-color: #ffe60f;
        --linuxdo-filter-focus-bg-color: #444444;
        --linuxdo-filter-fab-icon-color: #ff6b6b;
      }
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-fab {
        width: var(--linuxdo-filter-fab-size);
        height: var(--linuxdo-filter-fab-size);
        border-radius: 999px;
        border: none;
        background: transparent;
        color: var(--linuxdo-filter-fab-icon-color);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        line-height: 1;
        cursor: pointer;
        user-select: none;
        padding: 0;
        appearance: none;
        -webkit-appearance: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-fab svg {
        width: var(--linuxdo-filter-fab-icon-size);
        height: var(--linuxdo-filter-fab-icon-size);
        display: block;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-fab:focus-visible {
        outline: 2px solid rgba(255,230,15,0.6);
        outline-offset: 2px;
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-fab {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.9);
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display:empty::before {
        content: attr(data-placeholder);
        pointer-events: none;
        color: var(--linuxdo-filter-placeholder-color);
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-label {
        color: var(--linuxdo-filter-font-color);
        font-size: 13px;
        line-height: 28px;
        margin-right: 4px;
        cursor: pointer;
        user-select: none;
        transition: color 0.16s;
        flex-shrink: 0;
        font-weight: 500;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-label:hover {
        color: var(--linuxdo-filter-label-hover-color);
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display,
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
        border: 1px solid var(--linuxdo-filter-border-color);
        border-radius: 6px;
        box-sizing: border-box;
        font-size: 13px;
        font-family: inherit;
        color: var(--linuxdo-filter-font-color);
        padding: 6px 8px;
        width: 180px;
        background-color: var(--linuxdo-filter-bg-color);
        box-shadow: 0 2px 6px rgba(0,0,0,0.09);
        transition: background 0.16s, color 0.16s, border 0.16s;
        line-height: 1.3;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display {
        height: 28px;
        min-height: 28px;
        max-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        outline: none;
        cursor: text;
        user-select: text;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display:focus-visible,
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input:focus {
        border-color: #ffe60f !important;
        background: var(--linuxdo-filter-focus-bg-color);
        outline: none;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
        display: none;
        min-height: 28px;
        max-height: 150px;
        height: 28px;
        vertical-align: top;
        outline: none;
        resize: none;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-all;
        scrollbar-width: thin;
        scrollbar-color: rgba(0,0,0,0.3) transparent;
    }
    @media (prefers-color-scheme: dark) {
      #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
        scrollbar-color: rgba(255,255,255,0.4) transparent;
      }
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group {
        display: flex;
        align-items: flex-start;
        gap: 2px;
        margin-bottom: 4px;
        opacity: 0.2;
        transition: opacity 0.2s ease;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group:last-child {
        margin-bottom: 0;
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-input-group {
        opacity: 1;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        visibility: hidden;
        transform: translateX(8px) scale(0.98);
        transform-origin: top right;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s 0.2s;
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-inputs-container {
        opacity: 1;
        visibility: visible;
        transform: translateX(0) scale(1);
        pointer-events: auto;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container::before {
        content: '';
        position: absolute;
        top: -6px;
        left: -8px;
        right: -8px;
        bottom: -6px;
        background-color: var(--linuxdo-filter-bg-color);
        border-radius: 10px;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: -1;
        box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        border: 1px solid var(--linuxdo-filter-border-color);
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-inputs-container::before {
        opacity: 1;
    }
`;
