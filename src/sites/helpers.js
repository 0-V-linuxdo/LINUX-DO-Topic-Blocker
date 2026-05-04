export const EMPTY_ITEM_DATA = Object.freeze({
    titleText: '',
    categoryText: '',
    tagList: []
});

export function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

export function readText(element, selector) {
    if (!element || !selector) return '';
    const target = element.querySelector(selector);
    return normalizeText(target?.getAttribute?.('title') || target?.textContent || '');
}

export function readTextList(element, selector) {
    if (!element || !selector) return [];
    return uniqueTexts(
        Array.from(element.querySelectorAll(selector))
            .map((node) => normalizeText(node.getAttribute?.('data-tag-name') || node.getAttribute?.('title') || node.textContent))
    );
}

export function uniqueTexts(values) {
    const seen = new Set();
    const result = [];
    values.forEach((value) => {
        const text = normalizeText(value);
        if (!text) return;
        const key = text.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        result.push(text);
    });
    return result;
}

export function splitMetaText(value) {
    return uniqueTexts(
        normalizeText(value)
            .split(/[·|/]/)
            .map((part) => part.trim())
    );
}

export function getFirstNonEmpty(...values) {
    return values.map(normalizeText).find(Boolean) || '';
}

export function collectElements(root, selector) {
    const scope = root || document;
    return Array.from(scope.querySelectorAll(selector));
}

