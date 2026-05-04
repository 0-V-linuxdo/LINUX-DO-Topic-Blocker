import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveSearchFilterSaveContext } from '../src/features/search-filter.js';

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
