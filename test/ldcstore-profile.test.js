import test from 'node:test';
import assert from 'node:assert/strict';

import { LDCSTORE_PROFILE, getLdcstoreItemData } from '../src/sites/ldcstore-profile.js';

function fakeNode(text, { lists = {} } = {}) {
    return {
        textContent: text,
        children: [],
        getAttribute() {
            return '';
        },
        querySelector() {
            return null;
        },
        querySelectorAll(selector) {
            return lists[selector] || [];
        }
    };
}

function fakeItem({ classes = [], tagName = 'DIV', single = {}, lists = {} }) {
    return {
        tagName,
        style: {},
        matches(selector) {
            return selector.split(',').some((rawSelector) => {
                const trimmed = rawSelector.trim();
                if (trimmed === 'article.buy-card') {
                    return tagName === 'ARTICLE' && classes.includes('buy-card');
                }
                if (trimmed.startsWith('.')) {
                    return classes.includes(trimmed.slice(1));
                }
                return false;
            });
        },
        querySelector(selector) {
            if (single[selector]) return single[selector];
            return selector
                .split(',')
                .map((part) => single[part.trim()])
                .find(Boolean) || null;
        },
        querySelectorAll(selector) {
            return lists[selector] || [];
        }
    };
}

function fakeSection({ display = '', items = [] } = {}) {
    return {
        hidden: false,
        style: { display },
        getAttribute() {
            return '';
        },
        querySelectorAll() {
            return items;
        }
    };
}

function fakeRoot({ sections = [], looseItems = [] } = {}) {
    return {
        querySelectorAll(selector) {
            if (selector === '.home-page .section-content') {
                return sections;
            }

            return looseItems;
        }
    };
}

test('LDC Store product card extractor reads name category seller and type tags', () => {
    const item = fakeItem({
        classes: ['product-card'],
        single: {
            '.product-name': fakeNode('Grok 账号'),
            '.product-category': fakeNode('AI'),
            '.seller-name': fakeNode('jczhl')
        },
        lists: {
            '.type-tag': [fakeNode('CDK')]
        }
    });

    assert.deepEqual(getLdcstoreItemData(item), {
        titleText: 'Grok 账号',
        categoryText: 'AI',
        tagList: ['jczhl', 'CDK']
    });
});

test('LDC Store shop card extractor reads shop tags and owner', () => {
    const item = fakeItem({
        classes: ['shop-card'],
        single: {
            '.shop-name': fakeNode('工具小店'),
            '.owner-name': fakeNode('owner'),
            '.shop-tags': fakeNode('', {
                lists: {
                    'a, span, button, div': [fakeNode('AI'), fakeNode('订阅')]
                }
            })
        }
    });

    assert.deepEqual(getLdcstoreItemData(item), {
        titleText: '工具小店',
        categoryText: 'AI, 订阅',
        tagList: ['owner', 'AI', '订阅']
    });
});

test('LDC Store buy card extractor filters price and password from meta tags', () => {
    const item = fakeItem({
        classes: ['buy-card'],
        tagName: 'ARTICLE',
        single: {
            '.buy-card-title': fakeNode('求购 API'),
            '.buy-status-pill': fakeNode('开放中')
        },
        lists: {
            '.buy-card-meta span': [fakeNode('12.00 LDC'), fakeNode('alice'), fakeNode('密码 1234')]
        }
    });

    assert.deepEqual(getLdcstoreItemData(item), {
        titleText: '求购 API',
        categoryText: '开放中',
        tagList: ['alice']
    });
});

test('LDC Store hotboard card extractor splits category and seller meta', () => {
    const item = fakeItem({
        classes: ['hotboard-product-item'],
        single: {
            '.hotboard-product-name': fakeNode('热卖商品'),
            '.hotboard-product-meta': fakeNode('AI · bob')
        }
    });

    assert.deepEqual(getLdcstoreItemData(item), {
        titleText: '热卖商品',
        categoryText: 'AI',
        tagList: ['bob']
    });
});

test('LDC Store content item collector only returns cards from the visible home section', () => {
    const hiddenProductCard = fakeItem({ classes: ['product-card'] });
    const visibleBuyCard = fakeItem({ classes: ['buy-card'], tagName: 'ARTICLE' });
    const root = fakeRoot({
        sections: [
            fakeSection({ display: 'none', items: [hiddenProductCard] }),
            fakeSection({ items: [visibleBuyCard] })
        ]
    });

    assert.deepEqual(LDCSTORE_PROFILE.getContentItems(root), [visibleBuyCard]);
});

test('LDC Store content item collector keeps hidden blocked cards in the visible section count', () => {
    const blockedProductCard = fakeItem({ classes: ['product-card'] });
    blockedProductCard.style.display = 'none';
    const root = fakeRoot({
        sections: [
            fakeSection({ items: [blockedProductCard] })
        ]
    });

    assert.deepEqual(LDCSTORE_PROFILE.getContentItems(root), [blockedProductCard]);
});
