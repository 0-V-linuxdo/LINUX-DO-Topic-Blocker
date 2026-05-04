import {
    BLOCK_ACTION_BUTTON_CLASS,
    BLOCK_ACTION_BUTTON_OFFSET_RIGHT,
    BLOCK_ACTION_BUTTON_OFFSET_TOP,
    BLOCK_ACTION_BUTTON_SIZE,
    BLOCK_ACTION_VISIBLE_CLASS,
    BLOCKED_ITEM_CLASS
} from '../shared/constants.js';

export function createBlockActionButtonController({
    runtime,
    store,
    profile,
    ensureBlockActionStyles,
    getBlockActionHost,
    getBlockReasonsFromElement,
    getBlockTargetForItem,
    showBlockedItemDialog,
    showBlockConfirmDialog
}) {
    function isBlockActionRelatedTarget(target) {
        if (!target) return false;
        if (runtime.blockActionFloatingButton && target.nodeType && runtime.blockActionFloatingButton.contains(target)) {
            return true;
        }
        if (typeof target.closest !== 'function') return false;
        return Boolean(target.closest(profile?.blockActionRelatedSelector || 'tr.topic-list-item, .fps-result'));
    }

    function positionBlockActionButton(item) {
        const button = runtime.blockActionFloatingButton;
        if (!button) return;

        if (!item || !item.isConnected) {
            hideBlockActionButton();
            return;
        }

        const host = getBlockActionHost(item);
        if (!host) {
            hideBlockActionButton();
            return;
        }

        const rect = host.getBoundingClientRect();
        if (!rect.width || !rect.height) {
            hideBlockActionButton();
            return;
        }

        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
            hideBlockActionButton();
            return;
        }

        let top = rect.top + BLOCK_ACTION_BUTTON_OFFSET_TOP;
        let left = rect.right - BLOCK_ACTION_BUTTON_OFFSET_RIGHT - BLOCK_ACTION_BUTTON_SIZE;

        const summaryButton = item.querySelector('.topic-summary-button');
        if (summaryButton) {
            const summaryRect = summaryButton.getBoundingClientRect();
            if (summaryRect.width && summaryRect.height) {
                const gap = 6;
                const candidateLeft = summaryRect.left - gap - BLOCK_ACTION_BUTTON_SIZE;
                if (!Number.isNaN(candidateLeft)) {
                    left = Math.min(left, candidateLeft);
                }
                const candidateTop = summaryRect.top + (summaryRect.height - BLOCK_ACTION_BUTTON_SIZE) / 2;
                if (!Number.isNaN(candidateTop)) {
                    top = candidateTop;
                }
            }
        }

        const minEdge = 6;
        const maxLeft = Math.max(minEdge, window.innerWidth - BLOCK_ACTION_BUTTON_SIZE - minEdge);
        const maxTop = Math.max(minEdge, window.innerHeight - BLOCK_ACTION_BUTTON_SIZE - minEdge);
        const clampedLeft = Math.min(Math.max(left, minEdge), maxLeft);
        const clampedTop = Math.min(Math.max(top, minEdge), maxTop);

        button.style.left = `${Math.round(clampedLeft)}px`;
        button.style.top = `${Math.round(clampedTop)}px`;
    }

    function scheduleBlockActionButtonPositionUpdate() {
        if (!runtime.blockActionFloatingButton || !runtime.blockActionFloatingItem) return;
        if (runtime.blockActionPositionRaf) return;

        runtime.blockActionPositionRaf = requestAnimationFrame(() => {
            runtime.blockActionPositionRaf = null;
            positionBlockActionButton(runtime.blockActionFloatingItem);
        });
    }

    function updateBlockActionButtonState(button, item) {
        if (!button || !item) return;

        const isBlocked = item.classList.contains(BLOCKED_ITEM_CLASS);
        button.classList.toggle('is-blocked', isBlocked);
        if (isBlocked) {
            button.setAttribute('title', '查看屏蔽原因');
            button.setAttribute('aria-label', '查看屏蔽原因');
        } else {
            button.setAttribute('title', '屏蔽该结果');
            button.setAttribute('aria-label', '屏蔽该结果');
        }
    }

    function ensureBlockActionFloatingButton() {
        if (runtime.blockActionFloatingButton) return runtime.blockActionFloatingButton;

        ensureBlockActionStyles();

        const button = document.createElement('button');
        button.type = 'button';
        button.className = BLOCK_ACTION_BUTTON_CLASS;
        button.setAttribute('aria-hidden', 'true');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle>
                <path d="M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </svg>
        `;

        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const item = runtime.blockActionFloatingItem;
            if (!item) return;

            const reasons = getBlockReasonsFromElement(item);
            if (reasons.length > 0) {
                showBlockedItemDialog(reasons);
                return;
            }

            const target = getBlockTargetForItem(item);
            if (!target) return;
            showBlockConfirmDialog(target, item);
        });

        button.addEventListener('mouseleave', (event) => {
            if (isBlockActionRelatedTarget(event.relatedTarget)) return;
            hideBlockActionButton();
        });

        document.body.appendChild(button);
        runtime.blockActionFloatingButton = button;

        window.addEventListener('scroll', scheduleBlockActionButtonPositionUpdate, true);
        window.addEventListener('resize', scheduleBlockActionButtonPositionUpdate);

        return button;
    }

    function showBlockActionButtonForItem(item) {
        if (!item) return;
        const button = ensureBlockActionFloatingButton();
        runtime.blockActionFloatingItem = item;
        updateBlockActionButtonState(button, item);
        positionBlockActionButton(item);
        button.classList.add(BLOCK_ACTION_VISIBLE_CLASS);
        button.setAttribute('aria-hidden', 'false');
    }

    function hideBlockActionButton() {
        if (!runtime.blockActionFloatingButton) return;
        runtime.blockActionFloatingButton.classList.remove(BLOCK_ACTION_VISIBLE_CLASS);
        runtime.blockActionFloatingButton.setAttribute('aria-hidden', 'true');
        runtime.blockActionFloatingItem = null;
    }

    function bindBlockActionHover(item) {
        if (!item || runtime.blockActionHoverBoundItems.has(item)) return;
        runtime.blockActionHoverBoundItems.add(item);

        item.addEventListener('mouseenter', () => {
            showBlockActionButtonForItem(item);
        });
        item.addEventListener('mouseleave', (event) => {
            if (isBlockActionRelatedTarget(event.relatedTarget)) return;
            hideBlockActionButton();
        });
        item.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'touch') {
                showBlockActionButtonForItem(item);
            }
        });
    }

    function ensureBlockActionButtonNow(item) {
        if (!item) return;
        ensureBlockActionFloatingButton();
        bindBlockActionHover(item);
        if (runtime.blockActionFloatingItem === item && runtime.blockActionFloatingButton) {
            updateBlockActionButtonState(runtime.blockActionFloatingButton, item);
            scheduleBlockActionButtonPositionUpdate();
        }
    }

    function ensureBlockActionButton(item) {
        if (!item) return;
        const shouldDefer = typeof profile?.shouldDeferBlockActionButton === 'function'
            ? profile.shouldDeferBlockActionButton(item, store.getSnapshot())
            : false;

        if (shouldDefer) {
            return;
        }

        ensureBlockActionButtonNow(item);
    }

    function hideFloatingButtonIfItemMatches(item) {
        if (runtime.blockActionFloatingItem === item) {
            hideBlockActionButton();
        }
    }

    return {
        ensureBlockActionButton,
        hideBlockActionButton,
        hideFloatingButtonIfItemMatches
    };
}
