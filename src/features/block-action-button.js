import {
    BLOCK_ACTION_BUTTON_CLASS,
    BLOCK_ACTION_BUTTON_OFFSET_RIGHT,
    BLOCK_ACTION_BUTTON_OFFSET_TOP,
    BLOCK_ACTION_BUTTON_SIZE,
    BLOCK_ACTION_VISIBLE_CLASS,
    BLOCKED_ITEM_CLASS
} from '../shared/constants.js';

const SUMMARY_ACTION_BUTTON_SELECTOR = '.topic-question-button, .topic-summary-button';
const SUMMARY_ACTION_BUTTON_GAP = 6;
const VIEWPORT_EDGE_GAP = 6;

function getVisibleElementRect(element) {
    if (!element || typeof element.getBoundingClientRect !== 'function') return null;
    const rect = element.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return null;
    return rect;
}

export function getSummaryActionAnchorRect(item) {
    const buttons = Array.from(item?.querySelectorAll?.(SUMMARY_ACTION_BUTTON_SELECTOR) || []);
    return buttons.reduce((anchorRect, button) => {
        const rect = getVisibleElementRect(button);
        if (!rect) return anchorRect;
        if (!anchorRect || rect.left < anchorRect.left) return rect;
        return anchorRect;
    }, null);
}

export function resolveBlockActionButtonPosition({
    hostRect,
    summaryActionAnchorRect = null,
    viewportWidth,
    viewportHeight,
    buttonSize = BLOCK_ACTION_BUTTON_SIZE,
    offsetTop = BLOCK_ACTION_BUTTON_OFFSET_TOP,
    offsetRight = BLOCK_ACTION_BUTTON_OFFSET_RIGHT,
    gap = SUMMARY_ACTION_BUTTON_GAP,
    viewportEdgeGap = VIEWPORT_EDGE_GAP
}) {
    let top = hostRect.top + offsetTop;
    let left = hostRect.right - offsetRight - buttonSize;

    if (summaryActionAnchorRect?.width && summaryActionAnchorRect?.height) {
        const candidateLeft = summaryActionAnchorRect.left - gap - buttonSize;
        if (!Number.isNaN(candidateLeft)) {
            left = Math.min(left, candidateLeft);
        }
        const candidateTop = summaryActionAnchorRect.top + (summaryActionAnchorRect.height - buttonSize) / 2;
        if (!Number.isNaN(candidateTop)) {
            top = candidateTop;
        }
    }

    const maxLeft = Math.max(viewportEdgeGap, viewportWidth - buttonSize - viewportEdgeGap);
    const maxTop = Math.max(viewportEdgeGap, viewportHeight - buttonSize - viewportEdgeGap);

    return {
        left: Math.round(Math.min(Math.max(left, viewportEdgeGap), maxLeft)),
        top: Math.round(Math.min(Math.max(top, viewportEdgeGap), maxTop))
    };
}

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

        const position = resolveBlockActionButtonPosition({
            hostRect: rect,
            summaryActionAnchorRect: getSummaryActionAnchorRect(item),
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight
        });

        button.style.left = `${position.left}px`;
        button.style.top = `${position.top}px`;
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
