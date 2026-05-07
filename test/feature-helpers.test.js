import test from 'node:test';
import assert from 'node:assert/strict';

import {
    getSummaryActionAnchorRect,
    resolveBlockActionButtonPosition
} from '../src/features/block-action-button.js';
import { resolveSearchFilterSaveContext } from '../src/features/search-filter.js';

function createRect({ left = 0, top = 0, width = 0, height = 0, right = left + width, bottom = top + height } = {}) {
    return { left, top, width, height, right, bottom };
}

function createButton(rect) {
    return {
        getBoundingClientRect: () => rect
    };
}

function createItem(buttons = []) {
    return {
        querySelectorAll: () => buttons
    };
}

test('resolveSearchFilterSaveContext prefers the editing term and skips live filtering after SPA term switch', () => {
    const context = resolveSearchFilterSaveContext({
        editingSearchTerm: '旧搜索词',
        currentSearchTerm: '新搜索词'
    });

    assert.deepEqual(context, {
        searchTerm: '旧搜索词',
        shouldTriggerFilter: false
    });
});

test('resolveSearchFilterSaveContext falls back to the current term for normal in-place edits', () => {
    const context = resolveSearchFilterSaveContext({
        currentSearchTerm: '当前搜索词'
    });

    assert.deepEqual(context, {
        searchTerm: '当前搜索词',
        shouldTriggerFilter: true
    });
});

test('block action button anchors to the question button when summary and question buttons exist', () => {
    const hostRect = createRect({ left: 100, top: 200, width: 700, height: 60 });
    const summaryRect = createRect({ left: 738, top: 210, width: 72, height: 24 });
    const questionRect = createRect({ left: 700, top: 210, width: 28, height: 24 });
    const anchorRect = getSummaryActionAnchorRect(createItem([
        createButton(summaryRect),
        createButton(questionRect)
    ]));

    assert.equal(anchorRect, questionRect);
    assert.deepEqual(resolveBlockActionButtonPosition({
        hostRect,
        summaryActionAnchorRect: anchorRect,
        viewportWidth: 1200,
        viewportHeight: 800
    }), {
        left: 670,
        top: 210
    });
});

test('block action button keeps the legacy summary-button anchor when only summary exists', () => {
    const hostRect = createRect({ left: 100, top: 200, width: 700, height: 60 });
    const summaryRect = createRect({ left: 730, top: 210, width: 80, height: 24 });
    const anchorRect = getSummaryActionAnchorRect(createItem([
        createButton(summaryRect)
    ]));

    assert.equal(anchorRect, summaryRect);
    assert.deepEqual(resolveBlockActionButtonPosition({
        hostRect,
        summaryActionAnchorRect: anchorRect,
        viewportWidth: 1200,
        viewportHeight: 800
    }), {
        left: 700,
        top: 210
    });
});

test('block action button falls back to the host corner when summary actions are not visible', () => {
    const hostRect = createRect({ left: 100, top: 200, width: 700, height: 60 });
    const hiddenSummaryRect = createRect({ left: 730, top: 210, width: 0, height: 24 });
    const anchorRect = getSummaryActionAnchorRect(createItem([
        createButton(hiddenSummaryRect)
    ]));

    assert.equal(anchorRect, null);
    assert.deepEqual(resolveBlockActionButtonPosition({
        hostRect,
        summaryActionAnchorRect: anchorRect,
        viewportWidth: 1200,
        viewportHeight: 800
    }), {
        left: 766,
        top: 208
    });
});
