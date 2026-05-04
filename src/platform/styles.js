export function ensureStyle(id, cssText) {
    if (!id) return null;

    let styleElement = document.getElementById(id);
    if (styleElement) {
        if (typeof cssText === 'string' && styleElement.textContent !== cssText) {
            styleElement.textContent = cssText;
        }
        return styleElement;
    }

    styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);
    return styleElement;
}
