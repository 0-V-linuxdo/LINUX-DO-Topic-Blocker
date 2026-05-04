export function normalizeRegexEntries(rawList) {
    if (!Array.isArray(rawList)) return [];

    return rawList
        .map((item) => {
            if (typeof item === 'string') {
                return { pattern: item.trim(), note: '' };
            }

            if (item && typeof item === 'object') {
                const pattern = typeof item.pattern === 'string'
                    ? item.pattern.trim()
                    : (typeof item.value === 'string' ? item.value.trim() : '');
                const note = typeof item.note === 'string' ? item.note.trim() : '';
                if (!pattern) return null;
                return { pattern, note };
            }

            return null;
        })
        .filter(Boolean);
}

export function compileRegexEntries(entries, { strict = false } = {}) {
    const compiled = [];

    for (const entry of entries) {
        if (!entry || !entry.pattern) continue;

        try {
            compiled.push(new RegExp(entry.pattern));
        } catch (error) {
            if (strict) throw error;
            console.warn('忽略无效正则表达式:', entry.pattern, error);
        }
    }

    return compiled;
}

export function findMatchingRegexEntries(entries, value) {
    if (!value || !Array.isArray(entries)) return [];

    const matches = [];
    entries.forEach((entry) => {
        if (!entry || !entry.pattern) return;
        try {
            const regex = new RegExp(entry.pattern);
            if (regex.test(value)) {
                matches.push(entry);
            }
        } catch (error) {
            console.warn('忽略无效正则表达式:', entry.pattern, error);
        }
    });

    return matches;
}
