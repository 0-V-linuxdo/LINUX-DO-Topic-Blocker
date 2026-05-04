import { findMatchingRegexEntries } from './regex.js';
import { matchesKeyword, matchesRegex } from './search-query.js';

const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(globalThis.navigator?.userAgent || '');

export function softHideElement(element) {
    if (!element) return;

    if (element.tagName === 'TR') {
        if (IS_SAFARI) {
            element.style.visibility = 'hidden';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
        } else {
            element.style.visibility = 'collapse';
        }
        return;
    }

    element.style.display = 'none';
}

export function unhideElement(element) {
    if (!element) return;

    if (element.tagName === 'TR') {
        element.style.visibility = '';
        if (IS_SAFARI) {
            element.style.position = '';
            element.style.left = '';
        }
        return;
    }

    element.style.display = '';
}

export function dedupeBlockReasons(reasons) {
    if (!Array.isArray(reasons)) return [];

    const seen = new Set();
    return reasons.filter((reason) => {
        if (!reason || !reason.kind) return false;
        const key = [
            reason.kind,
            reason.value || '',
            reason.pattern || '',
            reason.note || '',
            reason.tag || '',
            Array.isArray(reason.values) ? reason.values.join(',') : ''
        ].join('|');

        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export function getBlockReasonLabelValue(reason, labels = {}) {
    if (!reason || !reason.kind) return { label: '屏蔽原因未知', value: '' };

    const titleKeywordLabel = labels.titleKeyword || '标题关键词';
    const titleLabel = labels.title || '标题';
    const categoryLabel = labels.category || '类别';
    const tagLabel = labels.tag || '标签';

    switch (reason.kind) {
        case 'title_keyword':
            return { label: `${titleKeywordLabel}：`, value: reason.value || '' };
        case 'title_regex':
            return {
                label: `${titleLabel}匹配正则：`,
                value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
            };
        case 'category_keyword':
            return { label: `${categoryLabel}匹配：`, value: reason.value || '' };
        case 'category_regex':
            return {
                label: `${categoryLabel}匹配正则：`,
                value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
            };
        case 'tag_keyword':
            return { label: `${tagLabel}匹配：`, value: reason.value || '' };
        case 'tag_regex':
            return {
                label: `${tagLabel}匹配正则：`,
                value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
            };
        case 'search_blacklist':
            return { label: '搜索屏蔽关键词：', value: reason.value || '' };
        case 'search_regex':
            return { label: '搜索正则：', value: `/${reason.pattern || ''}/` };
        case 'search_whitelist_missing':
            if (Array.isArray(reason.values) && reason.values.length > 0) {
                return { label: '搜索必含缺失：', value: reason.values.join(', ') };
            }
            return { label: '搜索必含未满足', value: '' };
        default:
            return { label: '屏蔽原因未知', value: '' };
    }
}

export function formatBlockReason(reason, labels = {}) {
    const { label, value } = getBlockReasonLabelValue(reason, labels);
    return value ? `${label}${value}` : label;
}

export function buildTopicBlockReasons({ settings, categoryText, tagList, titleText }) {
    const reasons = [];

    if (categoryText) {
        if (settings.blockedCategories.includes(categoryText)) {
            reasons.push({ kind: 'category_keyword', value: categoryText });
        }

        const categoryMatches = findMatchingRegexEntries(settings.categoryRegexList, categoryText);
        categoryMatches.forEach((entry) => {
            reasons.push({
                kind: 'category_regex',
                value: categoryText,
                pattern: entry.pattern,
                note: entry.note || ''
            });
        });
    }

    if (Array.isArray(tagList)) {
        tagList.forEach((tag) => {
            if (settings.blockedTags.includes(tag)) {
                reasons.push({ kind: 'tag_keyword', value: tag });
            }

            const tagMatches = findMatchingRegexEntries(settings.tagRegexList, tag);
            tagMatches.forEach((entry) => {
                reasons.push({
                    kind: 'tag_regex',
                    value: tag,
                    pattern: entry.pattern,
                    note: entry.note || ''
                });
            });
        });
    }

    if (titleText) {
        const lowerTitle = titleText.toLowerCase();
        settings.blockedTitles.forEach((keyword) => {
            if (keyword && lowerTitle.includes(keyword.toLowerCase())) {
                reasons.push({ kind: 'title_keyword', value: keyword });
            }
        });

        const titleMatches = findMatchingRegexEntries(settings.titleRegexList, titleText);
        titleMatches.forEach((entry) => {
            reasons.push({
                kind: 'title_regex',
                pattern: entry.pattern,
                note: entry.note || ''
            });
        });
    }

    return dedupeBlockReasons(reasons);
}

export function buildSearchFilterBlockReasons(raw, normalized, { blacklistArray, whitelistArray, regexArray }) {
    if (!raw) return [];

    const reasons = [];

    if (blacklistArray.length > 0) {
        blacklistArray.forEach((keyword) => {
            if (matchesKeyword(normalized, keyword)) {
                reasons.push({ kind: 'search_blacklist', value: keyword });
            }
        });
    }

    if (regexArray.length > 0) {
        regexArray.forEach((pattern) => {
            if (matchesRegex(raw, pattern)) {
                reasons.push({ kind: 'search_regex', pattern });
            }
        });
    }

    if (whitelistArray.length > 0) {
        const containsWhitelist = whitelistArray.some((keyword) => matchesKeyword(normalized, keyword));
        if (!containsWhitelist) {
            reasons.push({ kind: 'search_whitelist_missing', values: whitelistArray });
        }
    }

    return dedupeBlockReasons(reasons);
}
