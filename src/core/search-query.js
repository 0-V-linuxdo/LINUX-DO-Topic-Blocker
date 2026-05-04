import { DEFAULT_SEARCH_FILTER_RULE } from '../shared/constants.js';

export function getCurrentSearchQueryRaw() {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get('q') || '').trim();
}

export function tokenizeSearchQuery(query) {
    const tokens = [];
    let token = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < query.length; i += 1) {
        const character = query[i];

        if (character === '"' || character === '\'') {
            if (!inQuotes) {
                inQuotes = true;
                quoteChar = character;
                continue;
            }

            if (quoteChar === character) {
                inQuotes = false;
                quoteChar = '';
                continue;
            }
        }

        if (!inQuotes && /\s/.test(character)) {
            if (token) {
                tokens.push(token);
                token = '';
            }
            continue;
        }

        token += character;
    }

    if (token) tokens.push(token);
    return tokens;
}

export function isSearchDirectiveToken(token) {
    if (!token) return false;

    const lower = token.toLowerCase();
    if (lower.startsWith('http://') || lower.startsWith('https://')) {
        return false;
    }

    return /^[a-z_]+:[^\s]+$/i.test(token);
}

export function extractPrimarySearchTerm(rawQuery) {
    const query = (rawQuery || '').trim();
    if (!query) return '';

    const tokens = tokenizeSearchQuery(query);
    const keywordTokens = tokens.filter((token) => !isSearchDirectiveToken(token));
    const keyword = keywordTokens.join(' ').trim();
    return keyword || query;
}

export function getCurrentSearchTerm() {
    return extractPrimarySearchTerm(getCurrentSearchQueryRaw());
}

export function createKeywordMatcher(keyword) {
    if (!keyword || typeof keyword !== 'string') return null;

    if (keyword.includes(' ')) {
        try {
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regexPattern = escapedKeyword.replace(/\s+/g, '\\s+');
            return new RegExp(regexPattern, 'i');
        } catch (error) {
            console.warn('创建正则表达式失败，回退到字符串匹配:', keyword, error);
        }
    }

    return null;
}

export function matchesKeyword(text, keyword) {
    if (!text || !keyword) return false;
    const regex = createKeywordMatcher(keyword);
    if (regex) return regex.test(text);
    return text.includes(keyword);
}

export function matchesRegex(text, regexPattern) {
    if (!text || !regexPattern) return false;

    try {
        const regex = new RegExp(regexPattern, 'i');
        return regex.test(text);
    } catch (error) {
        console.warn('正则表达式无效:', regexPattern, error);
        return false;
    }
}

export function normalizeSearchFilterRule(rawRule) {
    if (typeof rawRule === 'string') {
        return {
            blacklist: rawRule.trim(),
            whitelist: '',
            regex: ''
        };
    }

    if (!rawRule || typeof rawRule !== 'object') {
        return { ...DEFAULT_SEARCH_FILTER_RULE };
    }

    return {
        blacklist: typeof rawRule.blacklist === 'string' ? rawRule.blacklist.trim() : '',
        whitelist: typeof rawRule.whitelist === 'string' ? rawRule.whitelist.trim() : '',
        regex: typeof rawRule.regex === 'string' ? rawRule.regex.trim() : ''
    };
}

export function parseSearchFilterRule(rawRule) {
    const rule = normalizeSearchFilterRule(rawRule);
    const blacklistArray = rule.blacklist
        ? rule.blacklist.split(',').map((keyword) => keyword.trim().toLowerCase()).filter(Boolean)
        : [];
    const whitelistArray = rule.whitelist
        ? rule.whitelist.split(',').map((keyword) => keyword.trim().toLowerCase()).filter(Boolean)
        : [];
    const regexArray = rule.regex
        ? rule.regex.split('\n').map((pattern) => pattern.trim()).filter(Boolean)
        : [];

    return {
        rule,
        blacklistArray,
        whitelistArray,
        regexArray
    };
}

export function getSearchResultText(result, titleElement) {
    if (titleElement) {
        const raw = `${titleElement.getAttribute('title') || ''} ${titleElement.textContent || ''}`.trim();
        return { raw, normalized: raw.toLowerCase() };
    }

    const fallback = (result?.textContent || '').trim();
    return { raw: fallback, normalized: fallback.toLowerCase() };
}
