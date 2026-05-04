export function createUserscriptApi(host = globalThis) {
    const getValue = typeof host.GM_getValue === 'function'
        ? host.GM_getValue.bind(host)
        : (_key, defaultValue) => defaultValue;
    const setValue = typeof host.GM_setValue === 'function'
        ? host.GM_setValue.bind(host)
        : () => {};
    const registerMenuCommand = typeof host.GM_registerMenuCommand === 'function'
        ? host.GM_registerMenuCommand.bind(host)
        : () => {};
    const addStyle = typeof host.GM_addStyle === 'function'
        ? host.GM_addStyle.bind(host)
        : () => {};

    return {
        getValue,
        setValue,
        registerMenuCommand,
        addStyle
    };
}
