import test from 'node:test';
import assert from 'node:assert/strict';

import {
    buildSearchFilterBlockReasons,
    buildTopicBlockReasons,
    dedupeBlockReasons
} from '../src/core/filtering.js';
import { compileRegexEntries, normalizeRegexEntries } from '../src/core/regex.js';

test('normalizeRegexEntries accepts both strings and objects', () => {
    const normalized = normalizeRegexEntries([
        '^hello$',
        { pattern: 'world', note: 'demo' },
        { value: 'foo' }
    ]);

    assert.deepEqual(normalized, [
        { pattern: '^hello$', note: '' },
        { pattern: 'world', note: 'demo' },
        { pattern: 'foo', note: '' }
    ]);
});

test('compileRegexEntries throws in strict mode for invalid patterns', () => {
    assert.throws(() => {
        compileRegexEntries([{ pattern: '[' }], { strict: true });
    });
});

test('buildTopicBlockReasons combines keyword and regex matches', () => {
    const reasons = buildTopicBlockReasons({
        settings: {
            blockedTitles: ['求助'],
            blockedCategories: ['灌水'],
            blockedTags: ['docker'],
            titleRegexList: [{ pattern: '^\\[交易\\]', note: '' }],
            categoryRegexList: [{ pattern: '^开发$', note: 'cat' }],
            tagRegexList: [{ pattern: '^nas$', note: 'tag' }]
        },
        categoryText: '开发',
        tagList: ['docker', 'nas'],
        titleText: '[交易] 求助一下'
    });

    assert.deepEqual(
        reasons.map((reason) => reason.kind),
        ['category_regex', 'tag_keyword', 'tag_regex', 'title_keyword', 'title_regex']
    );
});

test('buildSearchFilterBlockReasons reports blacklist regex and missing whitelist', () => {
    const reasons = buildSearchFilterBlockReasons(
        'great deal hello',
        'great deal hello',
        {
            blacklistArray: ['deal'],
            whitelistArray: ['must-have'],
            regexArray: ['hello$']
        }
    );

    assert.deepEqual(
        reasons.map((reason) => reason.kind),
        ['search_blacklist', 'search_regex', 'search_whitelist_missing']
    );
});

test('dedupeBlockReasons removes repeated entries', () => {
    const reasons = dedupeBlockReasons([
        { kind: 'tag_keyword', value: 'docker' },
        { kind: 'tag_keyword', value: 'docker' }
    ]);

    assert.equal(reasons.length, 1);
});
