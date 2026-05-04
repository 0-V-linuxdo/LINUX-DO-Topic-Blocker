import test from 'node:test';
import assert from 'node:assert/strict';

import { STORAGE_KEYS } from '../src/shared/constants.js';
import { createSettingsStore } from '../src/state/settings-store.js';
import { LDCSTORE_STORAGE_KEYS } from '../src/sites/ldcstore-profile.js';

function createFakeGm(initialValues = {}) {
    const store = new Map(Object.entries(initialValues));

    return {
        store,
        getValue(key, defaultValue) {
            return store.has(key) ? store.get(key) : defaultValue;
        },
        setValue(key, value) {
            store.set(key, value);
        }
    };
}

test('load migrates legacy blockedTtags and search filter map into the new schema', () => {
    const gm = createFakeGm({
        blockedTitles: ['求助'],
        blockedCategories: ['灌水'],
        blockedTtags: ['docker'],
        titleRegexList: ['^\\[交易\\]'],
        categoryRegexList: [{ pattern: '^开发$', note: '分类' }],
        tagRegexList: [{ pattern: '^nas$', note: '标签' }],
        linux_do_search_filter_keywords_map: {
            hello: { blacklist: '广告', whitelist: '', regex: '^test$' }
        },
        linux_do_summary_script_enabled: false
    });

    const settingsStore = createSettingsStore(gm);
    const settings = settingsStore.load();

    assert.deepEqual(settings.blockedTags, ['docker']);
    assert.equal(settings.summaryScriptEnabled, false);
    assert.deepEqual(settings.searchFilterMap.hello, {
        blacklist: '广告',
        whitelist: '',
        regex: '^test$'
    });

    const persisted = gm.store.get('linux_do_topic_blocker_settings');
    assert.ok(persisted);
    assert.equal('blockedTtags' in persisted, false);
    assert.deepEqual(persisted.blockedTags, ['docker']);
});

test('importSettingsObject accepts old blockedTtags payloads and rewrites them as blockedTags', () => {
    const gm = createFakeGm();
    const settingsStore = createSettingsStore(gm);

    settingsStore.importSettingsObject({
        blockedTitles: ['hello'],
        blockedCategories: ['world'],
        blockedTtags: ['legacy-tag'],
        titleRegexList: [{ pattern: '^a$', note: '' }],
        categoryRegexList: [],
        tagRegexList: [],
        summaryScriptEnabled: true
    });

    const persisted = gm.store.get('linux_do_topic_blocker_settings');
    assert.deepEqual(persisted.blockedTags, ['legacy-tag']);
    assert.equal('blockedTtags' in persisted, false);
});

test('custom storage keys keep LDC Store settings isolated from Linux DO settings', () => {
    const gm = createFakeGm({
        [STORAGE_KEYS.settings]: {
            blockedTitles: ['linux'],
            blockedCategories: [],
            blockedTags: [],
            titleRegexList: [],
            categoryRegexList: [],
            tagRegexList: [],
            searchFilterMap: {},
            summaryScriptEnabled: true
        },
        [LDCSTORE_STORAGE_KEYS.blockedTitles]: ['ldc'],
        [LDCSTORE_STORAGE_KEYS.blockedCategories]: ['AI'],
        [LDCSTORE_STORAGE_KEYS.blockedTags]: ['seller']
    });

    const settingsStore = createSettingsStore(gm, { storageKeys: LDCSTORE_STORAGE_KEYS });
    const settings = settingsStore.load();

    assert.deepEqual(settings.blockedTitles, ['ldc']);
    assert.deepEqual(settings.blockedCategories, ['AI']);
    assert.deepEqual(settings.blockedTags, ['seller']);
    assert.equal(gm.store.get(STORAGE_KEYS.settings).blockedTitles[0], 'linux');
    assert.deepEqual(gm.store.get(LDCSTORE_STORAGE_KEYS.settings).blockedTitles, ['ldc']);
});
