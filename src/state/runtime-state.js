export function createRuntimeState() {
    return {
        startToken: 0,
        currentPageKey: '',
        lastSyncedSearchTerm: null,
        searchFilterEditingTerm: null,
        revealBlockedResults: false,
        blockActionFloatingButton: null,
        blockActionFloatingItem: null,
        blockActionPositionRaf: null,
        blockActionHoverBoundItems: new WeakSet(),
        blockDialogEscapeHandler: null,
        blockDialogSavedBodyOverflow: null,
        blockDialogSavedHtmlOverflow: null,
	        settingsDialogSavedBodyOverflow: null,
        settingsDialogSavedHtmlOverflow: null,
        regexFloatingButton: null,
        regexFloatingButtonDialog: null,
        regexFloatingButtonResizeHandler: null,
        domObserver: null,
        domObserverRoot: null,
        debounceTimer: null,
        regexAutoSaveTimers: Object.create(null)
    };
}
