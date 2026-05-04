export function createPageService({ profile } = {}) {
    function isSearchPage() {
        if (typeof profile?.isSearchPage === 'function') {
            return profile.isSearchPage(window.location);
        }
        return window.location.pathname.includes('/search');
    }

    function getCurrentPageKey() {
        return window.location.href;
    }

    function getObserverRoot() {
        if (typeof profile?.getObserverRoot === 'function') {
            return profile.getObserverRoot();
        }
        return document.querySelector('#main-outlet') || document.body;
    }

    return {
        getCurrentPageKey,
        getObserverRoot,
        isSearchPage
    };
}
