import { normalizeRegexEntries, compileRegexEntries } from '../core/regex.js';
import { normalizeSearchFilterRule } from '../core/search-query.js';
import { DEFAULT_SEARCH_FILTER_RULE, DEFAULT_SETTINGS, SCHEMA_VERSION, STORAGE_KEYS } from '../shared/constants.js';

function cloneSettings(settings) {
    return JSON.parse(JSON.stringify(settings));
}

function sanitizeStringArray(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean);
}

function sanitizeSearchFilterMap(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return {};
    }

    const normalized = {};
    Object.entries(value).forEach(([searchTerm, rawRule]) => {
        const normalizedKey = String(searchTerm || '').trim();
        if (!normalizedKey) return;
        normalized[normalizedKey] = normalizeSearchFilterRule(rawRule);
    });
    return normalized;
}

function sanitizeSettings(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const nextSettings = {
        schemaVersion: SCHEMA_VERSION,
        blockedTitles: sanitizeStringArray(source.blockedTitles),
        blockedCategories: sanitizeStringArray(source.blockedCategories),
        blockedTags: sanitizeStringArray(source.blockedTags ?? source.blockedTtags),
        titleRegexList: normalizeRegexEntries(source.titleRegexList),
        categoryRegexList: normalizeRegexEntries(source.categoryRegexList),
        tagRegexList: normalizeRegexEntries(source.tagRegexList),
        searchFilterMap: sanitizeSearchFilterMap(source.searchFilterMap),
        summaryScriptEnabled: source.summaryScriptEnabled !== false
    };

    return nextSettings;
}

function getLegacySettingsSnapshot(gm, storageKeys) {
    return {
        blockedTitles: gm.getValue(storageKeys.blockedTitles, DEFAULT_SETTINGS.blockedTitles),
        blockedCategories: gm.getValue(storageKeys.blockedCategories, DEFAULT_SETTINGS.blockedCategories),
        blockedTags: gm.getValue(
            storageKeys.blockedTags,
            gm.getValue(storageKeys.blockedTtags, DEFAULT_SETTINGS.blockedTags)
        ),
        titleRegexList: gm.getValue(storageKeys.titleRegexList, DEFAULT_SETTINGS.titleRegexList),
        categoryRegexList: gm.getValue(storageKeys.categoryRegexList, DEFAULT_SETTINGS.categoryRegexList),
        tagRegexList: gm.getValue(storageKeys.tagRegexList, DEFAULT_SETTINGS.tagRegexList),
        searchFilterMap: gm.getValue(storageKeys.searchFilterMap, DEFAULT_SETTINGS.searchFilterMap),
        summaryScriptEnabled: gm.getValue(storageKeys.summaryScriptEnabled, DEFAULT_SETTINGS.summaryScriptEnabled)
    };
}

export function createSettingsStore(gm, { storageKeys = STORAGE_KEYS } = {}) {
    let settings = sanitizeSettings(DEFAULT_SETTINGS);

    function persist() {
        settings = sanitizeSettings(settings);
        gm.setValue(storageKeys.settings, settings);
        return settings;
    }

    function load() {
        const savedSettings = gm.getValue(storageKeys.settings, null);
        if (savedSettings && typeof savedSettings === 'object' && !Array.isArray(savedSettings)) {
            settings = sanitizeSettings(savedSettings);
            const needsMigration = (
                savedSettings.schemaVersion !== SCHEMA_VERSION ||
                Object.prototype.hasOwnProperty.call(savedSettings, 'blockedTtags') ||
                !Object.prototype.hasOwnProperty.call(savedSettings, 'searchFilterMap')
            );
            if (needsMigration) persist();
            return cloneSettings(settings);
        }

        settings = sanitizeSettings(getLegacySettingsSnapshot(gm, storageKeys));
        persist();
        return cloneSettings(settings);
    }

    function get() {
        return cloneSettings(settings);
    }

    function getSnapshot() {
        return settings;
    }

    function replace(nextSettings) {
        settings = sanitizeSettings(nextSettings);
        persist();
        return cloneSettings(settings);
    }

    function mutate(mutator) {
        const draft = cloneSettings(settings);
        mutator(draft);
        settings = sanitizeSettings(draft);
        persist();
        return cloneSettings(settings);
    }

    function exportSettings() {
        return cloneSettings(settings);
    }

    function importSettingsObject(rawSettings) {
        settings = sanitizeSettings(rawSettings);
        persist();
        return cloneSettings(settings);
    }

    function getSearchFilterRule(searchTerm) {
        const normalizedKey = String(searchTerm || '').trim();
        if (!normalizedKey) return { ...DEFAULT_SEARCH_FILTER_RULE };
        return normalizeSearchFilterRule(settings.searchFilterMap[normalizedKey]);
    }

    function setSearchFilterRule(searchTerm, rawRule) {
        const normalizedKey = String(searchTerm || '').trim();
        if (!normalizedKey) return { ...DEFAULT_SEARCH_FILTER_RULE };

        const nextRule = normalizeSearchFilterRule(rawRule);
        mutate((draft) => {
            draft.searchFilterMap[normalizedKey] = nextRule;
        });

        return nextRule;
    }

    function setKeywordList(kind, values) {
        const nextValues = sanitizeStringArray(values);
        mutate((draft) => {
            switch (kind) {
                case 'title':
                    draft.blockedTitles = nextValues;
                    break;
                case 'category':
                    draft.blockedCategories = nextValues;
                    break;
                case 'tag':
                    draft.blockedTags = nextValues;
                    break;
                default:
                    break;
            }
        });
    }

    function setRegexEntries(kind, rawEntries) {
        const entries = normalizeRegexEntries(rawEntries);
        compileRegexEntries(entries, { strict: true });

        mutate((draft) => {
            switch (kind) {
                case 'title':
                    draft.titleRegexList = entries;
                    break;
                case 'category':
                    draft.categoryRegexList = entries;
                    break;
                case 'tag':
                    draft.tagRegexList = entries;
                    break;
                default:
                    break;
            }
        });
    }

    function setSummaryScriptEnabled(enabled) {
        mutate((draft) => {
            draft.summaryScriptEnabled = Boolean(enabled);
        });
    }

    return {
        load,
        get,
        getSnapshot,
        replace,
        mutate,
        exportSettings,
        importSettingsObject,
        getSearchFilterRule,
        setSearchFilterRule,
        setKeywordList,
        setRegexEntries,
        setSummaryScriptEnabled
    };
}
