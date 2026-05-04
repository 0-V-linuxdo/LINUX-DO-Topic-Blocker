import test from 'node:test';
import assert from 'node:assert/strict';

import {
    extractPrimarySearchTerm,
    isSearchDirectiveToken,
    parseSearchFilterRule,
    tokenizeSearchQuery
} from '../src/core/search-query.js';

test('tokenizeSearchQuery keeps quoted phrases together', () => {
    assert.deepEqual(
        tokenizeSearchQuery('hello "quoted world" status:open'),
        ['hello', 'quoted world', 'status:open']
    );
});

test('isSearchDirectiveToken ignores urls but accepts directives', () => {
    assert.equal(isSearchDirectiveToken('status:open'), true);
    assert.equal(isSearchDirectiveToken('https://linux.do'), false);
});

test('extractPrimarySearchTerm removes directives from mixed queries', () => {
    assert.equal(
        extractPrimarySearchTerm('hello world status:open order:latest'),
        'hello world'
    );
});

test('parseSearchFilterRule normalizes blacklist whitelist and regex lists', () => {
    const parsed = parseSearchFilterRule({
        blacklist: 'foo, bar',
        whitelist: 'must',
        regex: '^hello$\nworld'
    });

    assert.deepEqual(parsed.blacklistArray, ['foo', 'bar']);
    assert.deepEqual(parsed.whitelistArray, ['must']);
    assert.deepEqual(parsed.regexArray, ['^hello$', 'world']);
});
