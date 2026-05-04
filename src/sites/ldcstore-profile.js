import { LDCSTORE_SCRIPT_ICON } from '../shared/constants.js';
import { collectElements, readText, readTextList, splitMetaText, uniqueTexts, normalizeText } from './helpers.js';

const LDCSTORE_SCRIPT_VERSION = '[20260504] v1.0.5';
const LDCSTORE_SCRIPT_NAME = '[LD士多] 🚫 屏蔽含有指定：类别、标签和标题关键词 的内容 [20260504] v1.0.5';
const LDCSTORE_SCRIPT_NAMESPACE = 'https://github.com/0-V-linuxdo/LINUX-DO-Topic-Blocker/ldcstore';
const LDCSTORE_SCRIPT_DESCRIPTION = '功能：在 LD士多 按标题/类别/标签关键词与正则隐藏商品、小店、求购与热榜内容；搜索页提供按搜索词保存的屏蔽/必含/正则过滤器；支持悬浮屏蔽按钮、临时显示被屏蔽项、配置导入导出、即时生效。';
const LDCSTORE_SCRIPT_UPDATE_LOG = '[20260504] v1.0.5 修复首页 section tab 切换后隐藏 tab 卡片被计入屏蔽数量的问题，并适配 SPA replaceState/pushState 导航刷新。';
const LDCSTORE_DIST_USER_SCRIPT_RELATIVE_PATH = 'dist/ldcstore-content-blocker.user.js';
const LDCSTORE_ITEM_SELECTOR = '.product-card, .shop-card, article.buy-card, .hotboard-product-item';
const LDCSTORE_HOME_SECTION_SELECTOR = '.home-page .section-content';

export const LDCSTORE_STORAGE_KEYS = {
    settings: 'ldcstore_content_blocker_settings',
    blockedTitles: 'ldcstore_blockedNames',
    blockedCategories: 'ldcstore_blockedCategories',
    blockedTags: 'ldcstore_blockedSellersAndTags',
    blockedTtags: 'ldcstore_blockedTags_legacy',
    titleRegexList: 'ldcstore_nameRegexList',
    categoryRegexList: 'ldcstore_categoryRegexList',
    tagRegexList: 'ldcstore_sellerTagRegexList',
    searchFilterMap: 'ldcstore_search_filter_keywords_map',
    summaryScriptEnabled: 'ldcstore_summary_script_enabled'
};

function getShopTags(item) {
    const tagContainer = item.querySelector('.shop-tags');
    if (!tagContainer) return [];

    const childTags = uniqueTexts(
        Array.from(tagContainer.querySelectorAll('a, span, button, div'))
            .filter((node) => node.children.length === 0)
            .map((node) => node.textContent)
    );

    return childTags.length > 0 ? childTags : splitMetaText(tagContainer.textContent);
}

function getBuyMetaTags(item) {
    const metaNodes = Array.from(item.querySelectorAll('.buy-card-meta span'));
    const rawParts = metaNodes.length > 0
        ? metaNodes.map((node) => node.textContent)
        : splitMetaText(item.querySelector('.buy-card-meta')?.textContent || '');

    return uniqueTexts(rawParts).filter((part) => {
        const text = normalizeText(part);
        if (!text || text === '·') return false;
        if (/^\d+(?:\.\d+)?\s*LDC$/i.test(text)) return false;
        if (/^密码\s*/.test(text)) return false;
        if (/^会话\s*\d+/.test(text)) return false;
        return true;
    });
}

function getHotboardMeta(item) {
    const parts = splitMetaText(readText(item, '.hotboard-product-meta'));
    return {
        categoryText: parts[0] || '',
        tagList: parts.slice(1)
    };
}

export function getLdcstoreItemData(item) {
    if (!item) {
        return {
            titleText: '',
            categoryText: '',
            tagList: []
        };
    }

    if (item.matches('.shop-card')) {
        const shopTags = getShopTags(item);
        return {
            titleText: readText(item, '.shop-name'),
            categoryText: shopTags.join(', '),
            tagList: uniqueTexts([
                readText(item, '.owner-name'),
                readText(item, '.shop-owner'),
                ...shopTags
            ])
        };
    }

    if (item.matches('article.buy-card, .buy-card')) {
        return {
            titleText: readText(item, '.buy-card-title'),
            categoryText: readText(item, '.buy-status-pill'),
            tagList: getBuyMetaTags(item)
        };
    }

    if (item.matches('.hotboard-product-item')) {
        const meta = getHotboardMeta(item);
        return {
            titleText: readText(item, '.hotboard-product-name'),
            categoryText: meta.categoryText,
            tagList: meta.tagList
        };
    }

    return {
        titleText: readText(item, '.product-name'),
        categoryText: readText(item, '.product-category'),
        tagList: uniqueTexts([
            readText(item, '.seller-name'),
            readText(item, '.product-seller'),
            ...readTextList(item, '.type-tag')
        ])
    };
}

function getLdcstoreSearchItems(root) {
    const scopedItems = collectElements(root, '.search-page .product-card, .results-list .product-card');
    return scopedItems.length > 0 ? scopedItems : collectElements(root, '.product-card');
}

function isVisibleLdcstoreHomeSection(section) {
    if (!section) return false;
    if (section.hidden) return false;
    if (section.getAttribute?.('aria-hidden') === 'true') return false;
    if (normalizeText(section.style?.display).toLowerCase() === 'none') return false;

    if (typeof globalThis.getComputedStyle === 'function') {
        try {
            const style = globalThis.getComputedStyle(section);
            if (style?.display === 'none' || style?.visibility === 'hidden') {
                return false;
            }
        } catch (error) {
            // Ignore synthetic test nodes or detached elements that cannot be measured.
        }
    }

    return true;
}

function getLdcstoreContentItems(root) {
    const homeSections = collectElements(root, LDCSTORE_HOME_SECTION_SELECTOR);
    if (homeSections.length > 0) {
        return homeSections
            .filter(isVisibleLdcstoreHomeSection)
            .flatMap((section) => collectElements(section, LDCSTORE_ITEM_SELECTOR));
    }

    return collectElements(root, LDCSTORE_ITEM_SELECTOR);
}

export const LDCSTORE_PROFILE = Object.freeze({
    id: 'ldcstore',
    entryFile: 'src/ldcstore.js',
    distFile: LDCSTORE_DIST_USER_SCRIPT_RELATIVE_PATH,
    metadata: Object.freeze({
        name: LDCSTORE_SCRIPT_NAME,
        namespace: LDCSTORE_SCRIPT_NAMESPACE,
        description: LDCSTORE_SCRIPT_DESCRIPTION,
        version: LDCSTORE_SCRIPT_VERSION,
        updateLog: LDCSTORE_SCRIPT_UPDATE_LOG,
        matches: ['https://ldcstore.com/*'],
        icon: LDCSTORE_SCRIPT_ICON
    }),
    storageKeys: LDCSTORE_STORAGE_KEYS,
    menuRegisteredFlag: '__ldcstoreContentBlockerMenuRegistered',
    exportFileName: 'ldcstore_content_filter_settings.json',
    features: Object.freeze({
        summaryToggle: false,
        searchUsesContentRules: true
    }),
    labels: Object.freeze({
        settingsTitle: '⚙️ 屏蔽设置',
        titleTab: '标题关键词',
        categoryTab: '类别',
        tagTab: '标签',
        title: '标题',
        titleKeyword: '标题关键词',
        category: '类别',
        tag: '标签',
        titleKeywordTextarea: '🚫 屏蔽的标题关键词（逗号分隔）：',
        categoryTextarea: '🚫 屏蔽的类别（逗号分隔）：',
        tagTextarea: '🚫 屏蔽的标签（逗号分隔）：',
        titleRegexLabel: '🔍 标题关键词过滤规则:',
        categoryRegexLabel: '🔍 类别过滤规则:',
        tagRegexLabel: '🔍 标签过滤规则:'
    }),
    isSearchPage(location = window.location) {
        return location.pathname.includes('/search');
    },
    getObserverRoot() {
        return document.querySelector('#app .main-content') || document.querySelector('#app') || document.body;
    },
    getContentItems: getLdcstoreContentItems,
    getSearchItems: getLdcstoreSearchItems,
    getAllFilterItems(root) {
        return collectElements(root, LDCSTORE_ITEM_SELECTOR);
    },
    getItemData: getLdcstoreItemData,
    getSearchResultTitleElement() {
        return null;
    },
    getBlockActionHost(item) {
        return item || null;
    },
    blockActionRelatedSelector: LDCSTORE_ITEM_SELECTOR,
    shouldDeferBlockActionButton() {
        return false;
    }
});
