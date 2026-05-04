import {
    DIST_USER_SCRIPT_RELATIVE_PATH,
    SCRIPT_DESCRIPTION,
    SCRIPT_ICON,
    SCRIPT_NAME,
    SCRIPT_NAMESPACE,
    SCRIPT_UPDATE_LOG,
    SCRIPT_VERSION,
    STORAGE_KEYS
} from '../shared/constants.js';
import { collectElements, getFirstNonEmpty, readText, readTextList } from './helpers.js';

function getLinuxDoItemData(item) {
    if (!item) {
        return {
            titleText: '',
            categoryText: '',
            tagList: []
        };
    }

    const categoryText = readText(
        item,
        'div.link-bottom-line a.badge-category__wrapper span.badge-category__name, a.badge-category__wrapper span.badge-category__name, span.badge-category__name'
    );
    const tagList = readTextList(item, '.discourse-tags a, a.discourse-tag, .tag-name');
    const titleText = getFirstNonEmpty(
        readText(item, 'a.title'),
        readText(item, 'a.topic-title, .topic-title, a.raw-topic-link')
    );

    return {
        titleText,
        categoryText,
        tagList
    };
}

export const LINUX_DO_PROFILE = Object.freeze({
    id: 'linux-do',
    entryFile: 'src/index.js',
    distFile: DIST_USER_SCRIPT_RELATIVE_PATH,
    metadata: Object.freeze({
        name: SCRIPT_NAME,
        namespace: SCRIPT_NAMESPACE,
        description: SCRIPT_DESCRIPTION,
        version: SCRIPT_VERSION,
        updateLog: SCRIPT_UPDATE_LOG,
        matches: ['https://linux.do/*'],
        icon: SCRIPT_ICON
    }),
    storageKeys: STORAGE_KEYS,
    menuRegisteredFlag: '__linuxDoTopicBlockerMenuRegistered',
    exportFileName: 'linux_do_content_filter_settings.json',
    features: Object.freeze({
        summaryToggle: true,
        searchUsesContentRules: false
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
        return document.querySelector('#main-outlet') || document.body;
    },
    getContentItems(root) {
        return collectElements(root, 'tr.topic-list-item');
    },
    getSearchItems(root) {
        return collectElements(root, '.fps-result');
    },
    getAllFilterItems(root) {
        return collectElements(root, 'tr.topic-list-item, .fps-result');
    },
    getItemData: getLinuxDoItemData,
    getSearchResultTitleElement(item) {
        return item.querySelector('.topic-title');
    },
    getBlockActionHost(item) {
        if (!item) return null;
        if (item.tagName === 'TR') {
            return item.querySelector('td.main-link') || item.querySelector('td') || null;
        }
        return item;
    },
    blockActionRelatedSelector: 'tr.topic-list-item, .fps-result',
    shouldDeferBlockActionButton(item, settings) {
        return Boolean(
            settings?.summaryScriptEnabled &&
            item?.tagName === 'TR' &&
            item.classList.contains('topic-list-item') &&
            !item.querySelector('.topic-summary-button')
        );
    }
});
