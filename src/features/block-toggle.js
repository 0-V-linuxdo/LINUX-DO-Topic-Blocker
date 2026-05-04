import {
    BLOCK_TOGGLE_BUTTON_ID,
    BLOCK_TOGGLE_COUNT_ID,
    BLOCK_TOGGLE_STYLE_ID,
    BLOCK_TOGGLE_WRAPPER_ID
} from '../shared/constants.js';
import { ensureStyle } from '../platform/styles.js';
import { BLOCK_TOGGLE_CSS } from './block-control-styles.js';

export function createBlockToggleController({ runtime, onFilterRequested }) {
    function ensureBlockToggleUI() {
        let wrapper = document.getElementById(BLOCK_TOGGLE_WRAPPER_ID);
        if (wrapper) return wrapper;

        ensureStyle(BLOCK_TOGGLE_STYLE_ID, BLOCK_TOGGLE_CSS);

        wrapper = document.createElement('div');
        wrapper.id = BLOCK_TOGGLE_WRAPPER_ID;
        wrapper.innerHTML = `
            <button id="${BLOCK_TOGGLE_BUTTON_ID}" class="block-toggle-button" type="button" aria-pressed="false" title="显示被屏蔽结果">
                <svg class="block-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
                    <path d="M7.5 7.5l9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
                <span id="${BLOCK_TOGGLE_COUNT_ID}" class="block-toggle-count">0</span>
            </button>
        `;
        document.body.appendChild(wrapper);

        const button = wrapper.querySelector(`#${BLOCK_TOGGLE_BUTTON_ID}`);
        if (button) {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                runtime.revealBlockedResults = !runtime.revealBlockedResults;
                onFilterRequested();
            });
        }

        return wrapper;
    }

    function updateBlockToggleUI(blockedCount) {
        const wrapper = ensureBlockToggleUI();
        if (!wrapper) return;

        const safeCount = Number.isFinite(blockedCount) ? blockedCount : 0;
        const button = wrapper.querySelector(`#${BLOCK_TOGGLE_BUTTON_ID}`);
        const countElement = wrapper.querySelector(`#${BLOCK_TOGGLE_COUNT_ID}`);

        if (countElement) {
            countElement.textContent = String(safeCount);
        }

        if (button) {
            button.classList.toggle('is-revealed', runtime.revealBlockedResults);
            button.setAttribute('aria-pressed', runtime.revealBlockedResults ? 'true' : 'false');
            button.setAttribute('title', runtime.revealBlockedResults ? '恢复隐藏屏蔽结果' : '显示被屏蔽结果');
        }
    }

    return {
        updateBlockToggleUI
    };
}
