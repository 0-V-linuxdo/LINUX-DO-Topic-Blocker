// ==UserScript==
// @name         [LINUX DO] 🚫 屏蔽含有指定：类别、标签和标题关键词 的话题 [20260504] v1.0.4
// @namespace    https://github.com/0-V-linuxdo/LINUX-DO-Topic-Blocker
// @description  功能：按标题/类别/标签关键词与正则在话题列表隐藏内容；搜索页提供屏蔽/必含/正则过滤器并按搜索词保存；悬浮屏蔽按钮与选择器/确认弹窗快速添加关键词；支持临时显示被屏蔽项、配置导入导出、即时生效。
//
// @version      [20260504] v1.0.4
// @update-log   [20260504] v1.0.4 修复屏蔽选择器勾选项受站点全局 input 样式影响、取消勾选不稳定，以及取消全部选项后仍兜底屏蔽整条标题的问题。
//
// @match        https://linux.do/*
//
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
//
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGlnaHRTYWJlckdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjM2IwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNyIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM4YjAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM2IwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNyIvPgogICAgICA8L2xpbmVhckdyYWRpZW50PgoKICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJtZXRhbFRleHR1cmUiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMmMyYzJjIi8+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz4KICAgICAgPC9saW5lYXJHcmFkaWVudD4KCiAgICAgIDxmaWx0ZXIgaWQ9ImxpZ2h0c2FiZXJHbG93Ij4KICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiIC8+CiAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMSAwIDAgMCAwLjYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCAxIDAgMCAwCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgMCAxIDAgMAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDAgMCAwLjcgMCIvPgogICAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CgogIDxjbGlwUGF0aCBpZD0iYSI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNDciLz48L2NsaXBQYXRoPgogIDxjaXJjbGUgZmlsbD0iI2YwZjBmMCIgY3g9IjYwIiBjeT0iNjAiIHI9IjUwIi8+CiAgPHJlY3QgZmlsbD0iIzFjMWMxZSIgY2xpcC1wYXRoPSJ1cmwoI2EpIiB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiLz4KICA8cmVjdCBmaWxsPSIjZjBmMGYwIiBjbGlwLXBhdGg9InVybCgjYSkiIHg9IjEwIiB5PSI0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIvPgogIDxyZWN0IGZpbGw9IiNmZmIwMDMiIGNsaXAtcGF0aD0idXJsKCNhKSIgeD0iMTAiIHk9IjgwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIi8+CgogIDxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDYwIDYwKSI+CiAgICAgIDxnPgogICAgICAgICAgPHBhdGggCiAgICAgICAgICAgICAgZD0iTTU3LDE1IAogICAgICAgICAgICAgICBMNjMsMTUgCiAgICAgICAgICAgICAgIEw2MywzMCAKICAgICAgICAgICAgICAgUTYxLDMxIDU5LDMwIAogICAgICAgICAgICAgICBMNTcsMzAgWiIgCiAgICAgICAgICAgICAgZmlsbD0idXJsKCNtZXRhbFRleHR1cmUpIiAKICAgICAgICAgICAgICBzdHJva2U9IiMwMDAiIAogICAgICAgICAgICAgIHN0cm9rZS13aWR0aD0iMC41Ii8+CiAgICAgICAgICAKICAgICAgICAgIDxwYXRoIAogICAgICAgICAgICAgIGQ9Ik01Ni41LDE1LjUgTDU3LjUsMTUuNSBMNTcuNSwyOS41IEw1Ni41LDI5LjUgWiIgCiAgICAgICAgICAgICAgZmlsbD0iIzExMSIvPgogICAgICAgICAgPHBhdGggCiAgICAgICAgICAgICAgZD0iTTYzLjUsMTUuNSBMNjIuNSwxNS41IEw2Mi41LDI5LjUgTDYzLjUsMjkuNSBaIiAKICAgICAgICAgICAgICBmaWxsPSIjMTExIi8+CiAgICAgICAgICAKICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwIDIyKSI+CiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9IjAiIAogICAgICAgICAgICAgICAgICBjeT0iLTIiIAogICAgICAgICAgICAgICAgICByPSIxLjUiIAogICAgICAgICAgICAgICAgICBmaWxsPSIjMjIyIiAKICAgICAgICAgICAgICAgICAgc3Ryb2tlPSIjMDAwIiAKICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPSIwLjMiLz4KICAgICAgICAgICAgICAKICAgICAgICAgICAgICA8Y2lyY2xlIAogICAgICAgICAgICAgICAgICBjeD0iLTIiIAogICAgICAgICAgICAgICAgICBjeT0iMCIgCiAgICAgICAgICAgICAgICAgIHI9IjAuOCIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiMzMzMiLz4KICAgICAgICAgICAgICA8Y2lyY2xlIAogICAgICAgICAgICAgICAgICBjeD0iMiIgCiAgICAgICAgICAgICAgICAgIGN5PSIwIiAKICAgICAgICAgICAgICAgICAgcj0iMC44IiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzMzMyIvPgogICAgICAgICAgPC9nPgogICAgICAgICAgCiAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCAzMikiPgogICAgICAgICAgICAgIDxyZWN0IAogICAgICAgICAgICAgICAgICB4PSItMy41IiAKICAgICAgICAgICAgICAgICAgeT0iMCIgCiAgICAgICAgICAgICAgICAgIHdpZHRoPSI3IiAKICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIyIiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzFjMWMxYyIgCiAgICAgICAgICAgICAgICAgIHJ4PSIwLjUiIAogICAgICAgICAgICAgICAgICByeT0iMC41Ii8+CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9Ii0yIiAKICAgICAgICAgICAgICAgICAgY3k9IjEiIAogICAgICAgICAgICAgICAgICByPSIwLjUiIAogICAgICAgICAgICAgICAgICBmaWxsPSIjNDQ0Ii8+CiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9IjIiIAogICAgICAgICAgICAgICAgICBjeT0iMSIgCiAgICAgICAgICAgICAgICAgIHI9IjAuNSIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiM0NDQiLz4KICAgICAgICAgIDwvZz4KCiAgICAgICAgICA8Zz4KICAgICAgICAgICAgICA8cmVjdCAKICAgICAgICAgICAgICAgICAgeD0iNTkiIAogICAgICAgICAgICAgICAgICB5PSIxMyIgCiAgICAgICAgICAgICAgICAgIHdpZHRoPSIyIiAKICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIxIiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzExMSIgCiAgICAgICAgICAgICAgICAgIHJ4PSIwLjMiIAogICAgICAgICAgICAgICAgICByeT0iMC4zIi8+CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgPHJlY3QgCiAgICAgICAgICAgICAgICAgIHg9IjU5IiAKICAgICAgICAgICAgICAgICAgeT0iMzQiIAogICAgICAgICAgICAgICAgICB3aWR0aD0iMiIgCiAgICAgICAgICAgICAgICAgIGhlaWdodD0iMSIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiMyMjIiIAogICAgICAgICAgICAgICAgICByeD0iMC4zIiAKICAgICAgICAgICAgICAgICAgcnk9IjAuMyIvPgogICAgICAgICAgPC9nPgogICAgICA8L2c+CgogICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDM1KSI+CiAgICAgICAgICA8cGF0aCAKICAgICAgICAgICAgICBkPSJNNTUsMCBMNjUsMCBMNjUsNjUgTDU1LDY1IFoiIAogICAgICAgICAgICAgIGZpbGw9InVybCgjbGlnaHRTYWJlckdyYWRpZW50KSIgCiAgICAgICAgICAgICAgZmlsdGVyPSJ1cmwoI2xpZ2h0c2FiZXJHbG93KSI+CiAgICAgICAgICAgICAgPGFuaW1hdGUgCiAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU9ImQiIAogICAgICAgICAgICAgICAgICB2YWx1ZXM9Ik01NSwwIEw2NSwwIEw2NSw2NSBMNTUsNjUgWjsKICAgICAgICAgICAgICAgICAgICAgICAgICBNNTMsMCBMNjcsMCBMNjcsNjUgTDUzLDY1IFo7CiAgICAgICAgICAgICAgICAgICAgICAgICAgTTU1LDAgTDY1LDAgTDY1LDY1IEw1NSw2NSBaIiAKICAgICAgICAgICAgICAgICAgZHVyPSIycyIgCiAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICA8L3BhdGg+CiAgICAgIDwvZz4KICA8L2c+CgogIDxjaXJjbGUgCiAgICAgIGN4PSI2MCIgCiAgICAgIGN5PSI2MCIgCiAgICAgIHI9IjU1IiAKICAgICAgZmlsbD0ibm9uZSIgCiAgICAgIHN0cm9rZT0iI2ZmMDAwMCIgCiAgICAgIHN0cm9rZS13aWR0aD0iNiIgCiAgICAgIHN0cm9rZS1kYXNoYXJyYXk9IjE1IDEwIj4KICAgICAgPGFuaW1hdGUgCiAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgCiAgICAgICAgICB2YWx1ZXM9IjI1OzA7LTI1IiAKICAgICAgICAgIGR1cj0iMnMiIAogICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KPC9zdmc+
// ==/UserScript==
(function () {
    'use strict';

    function createPageService({ profile } = {}) {
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

    function createUserscriptApi(host = globalThis) {
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

    const SCRIPT_VERSION = '[20260504] v1.0.4';
    const SCRIPT_NAME = '[LINUX DO] 🚫 屏蔽含有指定：类别、标签和标题关键词 的话题 [20260504] v1.0.4';
    const SCRIPT_NAMESPACE = 'https://github.com/0-V-linuxdo/LINUX-DO-Topic-Blocker';
    const SCRIPT_DESCRIPTION = '功能：按标题/类别/标签关键词与正则在话题列表隐藏内容；搜索页提供屏蔽/必含/正则过滤器并按搜索词保存；悬浮屏蔽按钮与选择器/确认弹窗快速添加关键词；支持临时显示被屏蔽项、配置导入导出、即时生效。';
    const SCRIPT_UPDATE_LOG = '[20260504] v1.0.4 修复屏蔽选择器勾选项受站点全局 input 样式影响、取消勾选不稳定，以及取消全部选项后仍兜底屏蔽整条标题的问题。';
    const REPO_BASE_URL = 'https://github.com/0-V-linuxdo/LINUX-DO-Topic-Blocker';
    const RAW_BASE_URL = 'https://raw.githubusercontent.com/0-V-linuxdo/LINUX-DO-Topic-Blocker/main';
    const SCRIPT_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGlnaHRTYWJlckdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjM2IwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNyIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM4YjAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM2IwMDAwIiBzdG9wLW9wYWNpdHk9IjAuNyIvPgogICAgICA8L2xpbmVhckdyYWRpZW50PgoKICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJtZXRhbFRleHR1cmUiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMmMyYzJjIi8+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz4KICAgICAgPC9saW5lYXJHcmFkaWVudD4KCiAgICAgIDxmaWx0ZXIgaWQ9ImxpZ2h0c2FiZXJHbG93Ij4KICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiIC8+CiAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMSAwIDAgMCAwLjYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCAxIDAgMCAwCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgMCAxIDAgMAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwIDAgMCAwLjcgMCIvPgogICAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CgogIDxjbGlwUGF0aCBpZD0iYSI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNDciLz48L2NsaXBQYXRoPgogIDxjaXJjbGUgZmlsbD0iI2YwZjBmMCIgY3g9IjYwIiBjeT0iNjAiIHI9IjUwIi8+CiAgPHJlY3QgZmlsbD0iIzFjMWMxZSIgY2xpcC1wYXRoPSJ1cmwoI2EpIiB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiLz4KICA8cmVjdCBmaWxsPSIjZjBmMGYwIiBjbGlwLXBhdGg9InVybCgjYSkiIHg9IjEwIiB5PSI0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIvPgogIDxyZWN0IGZpbGw9IiNmZmIwMDMiIGNsaXAtcGF0aD0idXJsKCNhKSIgeD0iMTAiIHk9IjgwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIi8+CgogIDxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDYwIDYwKSI+CiAgICAgIDxnPgogICAgICAgICAgPHBhdGggCiAgICAgICAgICAgICAgZD0iTTU3LDE1IAogICAgICAgICAgICAgICBMNjMsMTUgCiAgICAgICAgICAgICAgIEw2MywzMCAKICAgICAgICAgICAgICAgUTYxLDMxIDU5LDMwIAogICAgICAgICAgICAgICBMNTcsMzAgWiIgCiAgICAgICAgICAgICAgZmlsbD0idXJsKCNtZXRhbFRleHR1cmUpIiAKICAgICAgICAgICAgICBzdHJva2U9IiMwMDAiIAogICAgICAgICAgICAgIHN0cm9rZS13aWR0aD0iMC41Ii8+CiAgICAgICAgICAKICAgICAgICAgIDxwYXRoIAogICAgICAgICAgICAgIGQ9Ik01Ni41LDE1LjUgTDU3LjUsMTUuNSBMNTcuNSwyOS41IEw1Ni41LDI5LjUgWiIgCiAgICAgICAgICAgICAgZmlsbD0iIzExMSIvPgogICAgICAgICAgPHBhdGggCiAgICAgICAgICAgICAgZD0iTTYzLjUsMTUuNSBMNjIuNSwxNS41IEw2Mi41LDI5LjUgTDYzLjUsMjkuNSBaIiAKICAgICAgICAgICAgICBmaWxsPSIjMTExIi8+CiAgICAgICAgICAKICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwIDIyKSI+CiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9IjAiIAogICAgICAgICAgICAgICAgICBjeT0iLTIiIAogICAgICAgICAgICAgICAgICByPSIxLjUiIAogICAgICAgICAgICAgICAgICBmaWxsPSIjMjIyIiAKICAgICAgICAgICAgICAgICAgc3Ryb2tlPSIjMDAwIiAKICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPSIwLjMiLz4KICAgICAgICAgICAgICAKICAgICAgICAgICAgICA8Y2lyY2xlIAogICAgICAgICAgICAgICAgICBjeD0iLTIiIAogICAgICAgICAgICAgICAgICBjeT0iMCIgCiAgICAgICAgICAgICAgICAgIHI9IjAuOCIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiMzMzMiLz4KICAgICAgICAgICAgICA8Y2lyY2xlIAogICAgICAgICAgICAgICAgICBjeD0iMiIgCiAgICAgICAgICAgICAgICAgIGN5PSIwIiAKICAgICAgICAgICAgICAgICAgcj0iMC44IiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzMzMyIvPgogICAgICAgICAgPC9nPgogICAgICAgICAgCiAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCAzMikiPgogICAgICAgICAgICAgIDxyZWN0IAogICAgICAgICAgICAgICAgICB4PSItMy41IiAKICAgICAgICAgICAgICAgICAgeT0iMCIgCiAgICAgICAgICAgICAgICAgIHdpZHRoPSI3IiAKICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIyIiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzFjMWMxYyIgCiAgICAgICAgICAgICAgICAgIHJ4PSIwLjUiIAogICAgICAgICAgICAgICAgICByeT0iMC41Ii8+CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9Ii0yIiAKICAgICAgICAgICAgICAgICAgY3k9IjEiIAogICAgICAgICAgICAgICAgICByPSIwLjUiIAogICAgICAgICAgICAgICAgICBmaWxsPSIjNDQ0Ii8+CiAgICAgICAgICAgICAgPGNpcmNsZSAKICAgICAgICAgICAgICAgICAgY3g9IjIiIAogICAgICAgICAgICAgICAgICBjeT0iMSIgCiAgICAgICAgICAgICAgICAgIHI9IjAuNSIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiM0NDQiLz4KICAgICAgICAgIDwvZz4KCiAgICAgICAgICA8Zz4KICAgICAgICAgICAgICA8cmVjdCAKICAgICAgICAgICAgICAgICAgeD0iNTkiIAogICAgICAgICAgICAgICAgICB5PSIxMyIgCiAgICAgICAgICAgICAgICAgIHdpZHRoPSIyIiAKICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIxIiAKICAgICAgICAgICAgICAgICAgZmlsbD0iIzExMSIgCiAgICAgICAgICAgICAgICAgIHJ4PSIwLjMiIAogICAgICAgICAgICAgICAgICByeT0iMC4zIi8+CiAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgPHJlY3QgCiAgICAgICAgICAgICAgICAgIHg9IjU5IiAKICAgICAgICAgICAgICAgICAgeT0iMzQiIAogICAgICAgICAgICAgICAgICB3aWR0aD0iMiIgCiAgICAgICAgICAgICAgICAgIGhlaWdodD0iMSIgCiAgICAgICAgICAgICAgICAgIGZpbGw9IiMyMjIiIAogICAgICAgICAgICAgICAgICByeD0iMC4zIiAKICAgICAgICAgICAgICAgICAgcnk9IjAuMyIvPgogICAgICAgICAgPC9nPgogICAgICA8L2c+CgogICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDM1KSI+CiAgICAgICAgICA8cGF0aCAKICAgICAgICAgICAgICBkPSJNNTUsMCBMNjUsMCBMNjUsNjUgTDU1LDY1IFoiIAogICAgICAgICAgICAgIGZpbGw9InVybCgjbGlnaHRTYWJlckdyYWRpZW50KSIgCiAgICAgICAgICAgICAgZmlsdGVyPSJ1cmwoI2xpZ2h0c2FiZXJHbG93KSI+CiAgICAgICAgICAgICAgPGFuaW1hdGUgCiAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU9ImQiIAogICAgICAgICAgICAgICAgICB2YWx1ZXM9Ik01NSwwIEw2NSwwIEw2NSw2NSBMNTUsNjUgWjsKICAgICAgICAgICAgICAgICAgICAgICAgICBNNTMsMCBMNjcsMCBMNjcsNjUgTDUzLDY1IFo7CiAgICAgICAgICAgICAgICAgICAgICAgICAgTTU1LDAgTDY1LDAgTDY1LDY1IEw1NSw2NSBaIiAKICAgICAgICAgICAgICAgICAgZHVyPSIycyIgCiAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICA8L3BhdGg+CiAgICAgIDwvZz4KICA8L2c+CgogIDxjaXJjbGUgCiAgICAgIGN4PSI2MCIgCiAgICAgIGN5PSI2MCIgCiAgICAgIHI9IjU1IiAKICAgICAgZmlsbD0ibm9uZSIgCiAgICAgIHN0cm9rZT0iI2ZmMDAwMCIgCiAgICAgIHN0cm9rZS13aWR0aD0iNiIgCiAgICAgIHN0cm9rZS1kYXNoYXJyYXk9IjE1IDEwIj4KICAgICAgPGFuaW1hdGUgCiAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgCiAgICAgICAgICB2YWx1ZXM9IjI1OzA7LTI1IiAKICAgICAgICAgIGR1cj0iMnMiIAogICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KPC9zdmc+';
    const LDCSTORE_SCRIPT_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmF2LWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkY2QjZCIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI0VGMzMzMyIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQjkxQzFDIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiByZXN1bHQ9ImJsdXIiIC8+CiAgICAgIDxmZU1lcmdlPgogICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iYmx1ciIgLz4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiIC8+CiAgICAgIDwvZmVNZXJnZT4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cGF0aCBkPSJNIDMxLDQgQSAyOCwyOCAwIDEsMSAxMSw1MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2Zhdi1ncmFkKSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbHRlcj0idXJsKCNnbG93KSIgLz4KICA8cmVjdCB4PSIyNSIgeT0iMjYiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjMiIGZpbGw9InVybCgjZmF2LWdyYWQpIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSAzMSAzMikiIGZpbHRlcj0idXJsKCNnbG93KSIgLz4KPC9zdmc+';

    const DIST_USER_SCRIPT_RELATIVE_PATH = 'dist/linux-do-topic-blocker.user.js';
    const DIST_USER_SCRIPT_PATH = `${RAW_BASE_URL}/${DIST_USER_SCRIPT_RELATIVE_PATH}`;
    const LEGACY_USER_SCRIPT_RELATIVE_PATH = 'legacy/[LINUX DO] 🚫 屏蔽含有指定：类别、标签和标题关键词 的话题.user.js';

    const SCHEMA_VERSION = 1;

    const STORAGE_KEYS = {
        settings: 'linux_do_topic_blocker_settings',
        blockedTitles: 'blockedTitles',
        blockedCategories: 'blockedCategories',
        blockedTags: 'blockedTags',
        blockedTtags: 'blockedTtags',
        titleRegexList: 'titleRegexList',
        categoryRegexList: 'categoryRegexList',
        tagRegexList: 'tagRegexList',
        searchFilterMap: 'linux_do_search_filter_keywords_map',
        summaryScriptEnabled: 'linux_do_summary_script_enabled'
    };

    const DEFAULT_SEARCH_FILTER_RULE = Object.freeze({
        blacklist: '',
        whitelist: '',
        regex: ''
    });

    const DEFAULT_SETTINGS = Object.freeze({
        schemaVersion: SCHEMA_VERSION,
        blockedTitles: [],
        blockedCategories: [],
        blockedTags: [],
        titleRegexList: [],
        categoryRegexList: [],
        tagRegexList: [],
        searchFilterMap: {},
        summaryScriptEnabled: true
    });

    const SEARCH_FILTER_STYLE_ID = 'linux_do_search_filter_styles';
    const SEARCH_FILTER_WRAPPER_ID = 'linux_do_search_filter_wrapper';
    const SEARCH_FILTER_BLACKLIST_DISPLAY_ID = 'linux_do_search_filter_blacklist_display';
    const SEARCH_FILTER_BLACKLIST_INPUT_ID = 'linux_do_search_filter_blacklist_input';
    const SEARCH_FILTER_WHITELIST_DISPLAY_ID = 'linux_do_search_filter_whitelist_display';
    const SEARCH_FILTER_WHITELIST_INPUT_ID = 'linux_do_search_filter_whitelist_input';
    const SEARCH_FILTER_REGEX_DISPLAY_ID = 'linux_do_search_filter_regex_display';
    const SEARCH_FILTER_REGEX_INPUT_ID = 'linux_do_search_filter_regex_input';

    const BLOCK_TOGGLE_STYLE_ID = 'linux_do_block_toggle_styles';
    const BLOCK_TOGGLE_WRAPPER_ID = 'linux_do_block_toggle_wrapper';
    const BLOCK_TOGGLE_BUTTON_ID = 'linux_do_block_toggle_button';
    const BLOCK_TOGGLE_COUNT_ID = 'linux_do_block_toggle_count';

    const BLOCKED_ITEM_CLASS = 'linuxdo-blocked-item';
    const BLOCKED_REVEALED_CLASS = 'linuxdo-blocked-revealed';
    const BLOCK_ACTION_STYLE_ID = 'linuxdo_block_action_styles';
    const BLOCK_ACTION_ITEM_CLASS = 'linuxdo-block-item';
    const BLOCK_ACTION_BUTTON_CLASS = 'linuxdo-block-button';
    const BLOCK_ACTION_DIALOG_OVERLAY_ID = 'linuxdo_block_dialog_overlay';
    const BLOCK_ACTION_DIALOG_ID = 'linuxdo_block_dialog';
    const BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID = 'linuxdo_block_dialog_sub_overlay';
    const BLOCK_ACTION_SUB_DIALOG_ID = 'linuxdo_block_dialog_sub';
    const BLOCK_ACTION_REASON_DATA = 'linuxdoBlockReasons';
    const BLOCK_ACTION_VISIBLE_CLASS = 'is-visible';
    const BLOCK_ACTION_BUTTON_SIZE = 24;
    const BLOCK_ACTION_BUTTON_OFFSET_TOP = 8;
    const BLOCK_ACTION_BUTTON_OFFSET_RIGHT = 10;

    const SETTINGS_DIALOG_STYLE_ID = 'linux_do_settings_dialog_styles';
    const SETTINGS_DIALOG_OVERLAY_ID = 'settingsOverlay';
    const SETTINGS_DIALOG_ID = 'settingsDialog';
    const SETTINGS_NOTIFICATION_PANEL_ID = 'notificationPanel';
    const REGEX_FLOATING_BUTTON_STYLE_ID = 'linux_do_regex_floating_button_styles';
    const REGEX_SUBCONTENT_TYPE_MAP = {
        'regex-titles': 'title',
        'regex-categories': 'category',
        'regex-tags': 'tag'
    };

    const NOTIFIER_STYLE_ID = 'linux_do_notifier_styles';

    function ensureStyle(id, cssText) {
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

    const NOTIFIER_CSS = `
    #${SETTINGS_NOTIFICATION_PANEL_ID} {
        position: fixed;
        bottom: 15%;
        left: 50%;
        transform: translate(-50%, 20px);
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10002;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
    }
    #${SETTINGS_NOTIFICATION_PANEL_ID}.show {
        opacity: 1;
        transform: translate(-50%, 0);
    }
`;

    function createNotifier() {
        let hideTimer = null;

        function ensurePanel() {
            ensureStyle(NOTIFIER_STYLE_ID, NOTIFIER_CSS);
            let panel = document.getElementById(SETTINGS_NOTIFICATION_PANEL_ID);
            if (!panel) {
                panel = document.createElement('div');
                panel.id = SETTINGS_NOTIFICATION_PANEL_ID;
                document.body.appendChild(panel);
            }
            return panel;
        }

        function show(message, type = 'success') {
            const panel = ensurePanel();
            panel.textContent = message;
            panel.className = 'show';

            switch (type) {
                case 'error':
                    panel.style.backgroundColor = '#dc3545';
                    break;
                case 'info':
                    panel.style.backgroundColor = '#17a2b8';
                    break;
                case 'success':
                default:
                    panel.style.backgroundColor = '#28a745';
                    break;
            }

            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                panel.className = '';
            }, 3000);
        }

        return { show };
    }

    function normalizeRegexEntries(rawList) {
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

    function compileRegexEntries(entries, { strict = false } = {}) {
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

    function findMatchingRegexEntries(entries, value) {
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

    function getCurrentSearchQueryRaw() {
        const urlParams = new URLSearchParams(window.location.search);
        return (urlParams.get('q') || '').trim();
    }

    function tokenizeSearchQuery(query) {
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

    function isSearchDirectiveToken(token) {
        if (!token) return false;

        const lower = token.toLowerCase();
        if (lower.startsWith('http://') || lower.startsWith('https://')) {
            return false;
        }

        return /^[a-z_]+:[^\s]+$/i.test(token);
    }

    function extractPrimarySearchTerm(rawQuery) {
        const query = (rawQuery || '').trim();
        if (!query) return '';

        const tokens = tokenizeSearchQuery(query);
        const keywordTokens = tokens.filter((token) => !isSearchDirectiveToken(token));
        const keyword = keywordTokens.join(' ').trim();
        return keyword || query;
    }

    function getCurrentSearchTerm() {
        return extractPrimarySearchTerm(getCurrentSearchQueryRaw());
    }

    function createKeywordMatcher(keyword) {
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

    function matchesKeyword(text, keyword) {
        if (!text || !keyword) return false;
        const regex = createKeywordMatcher(keyword);
        if (regex) return regex.test(text);
        return text.includes(keyword);
    }

    function matchesRegex(text, regexPattern) {
        if (!text || !regexPattern) return false;

        try {
            const regex = new RegExp(regexPattern, 'i');
            return regex.test(text);
        } catch (error) {
            console.warn('正则表达式无效:', regexPattern, error);
            return false;
        }
    }

    function normalizeSearchFilterRule(rawRule) {
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

    function parseSearchFilterRule(rawRule) {
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

    function getSearchResultText(result, titleElement) {
        if (titleElement) {
            const raw = `${titleElement.getAttribute('title') || ''} ${titleElement.textContent || ''}`.trim();
            return { raw, normalized: raw.toLowerCase() };
        }

        const fallback = (result?.textContent || '').trim();
        return { raw: fallback, normalized: fallback.toLowerCase() };
    }

    const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(globalThis.navigator?.userAgent || '');

    function softHideElement(element) {
        if (!element) return;

        if (element.tagName === 'TR') {
            if (IS_SAFARI) {
                element.style.visibility = 'hidden';
                element.style.position = 'absolute';
                element.style.left = '-9999px';
            } else {
                element.style.visibility = 'collapse';
            }
            return;
        }

        element.style.display = 'none';
    }

    function unhideElement(element) {
        if (!element) return;

        if (element.tagName === 'TR') {
            element.style.visibility = '';
            if (IS_SAFARI) {
                element.style.position = '';
                element.style.left = '';
            }
            return;
        }

        element.style.display = '';
    }

    function dedupeBlockReasons(reasons) {
        if (!Array.isArray(reasons)) return [];

        const seen = new Set();
        return reasons.filter((reason) => {
            if (!reason || !reason.kind) return false;
            const key = [
                reason.kind,
                reason.value || '',
                reason.pattern || '',
                reason.note || '',
                reason.tag || '',
                Array.isArray(reason.values) ? reason.values.join(',') : ''
            ].join('|');

            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    function getBlockReasonLabelValue(reason, labels = {}) {
        if (!reason || !reason.kind) return { label: '屏蔽原因未知', value: '' };

        const titleKeywordLabel = labels.titleKeyword || '标题关键词';
        const titleLabel = labels.title || '标题';
        const categoryLabel = labels.category || '类别';
        const tagLabel = labels.tag || '标签';

        switch (reason.kind) {
            case 'title_keyword':
                return { label: `${titleKeywordLabel}：`, value: reason.value || '' };
            case 'title_regex':
                return {
                    label: `${titleLabel}匹配正则：`,
                    value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
                };
            case 'category_keyword':
                return { label: `${categoryLabel}匹配：`, value: reason.value || '' };
            case 'category_regex':
                return {
                    label: `${categoryLabel}匹配正则：`,
                    value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
                };
            case 'tag_keyword':
                return { label: `${tagLabel}匹配：`, value: reason.value || '' };
            case 'tag_regex':
                return {
                    label: `${tagLabel}匹配正则：`,
                    value: `/${reason.pattern || ''}/` + (reason.note ? `（${reason.note}）` : '')
                };
            case 'search_blacklist':
                return { label: '搜索屏蔽关键词：', value: reason.value || '' };
            case 'search_regex':
                return { label: '搜索正则：', value: `/${reason.pattern || ''}/` };
            case 'search_whitelist_missing':
                if (Array.isArray(reason.values) && reason.values.length > 0) {
                    return { label: '搜索必含缺失：', value: reason.values.join(', ') };
                }
                return { label: '搜索必含未满足', value: '' };
            default:
                return { label: '屏蔽原因未知', value: '' };
        }
    }

    function formatBlockReason(reason, labels = {}) {
        const { label, value } = getBlockReasonLabelValue(reason, labels);
        return value ? `${label}${value}` : label;
    }

    function buildTopicBlockReasons({ settings, categoryText, tagList, titleText }) {
        const reasons = [];

        if (categoryText) {
            if (settings.blockedCategories.includes(categoryText)) {
                reasons.push({ kind: 'category_keyword', value: categoryText });
            }

            const categoryMatches = findMatchingRegexEntries(settings.categoryRegexList, categoryText);
            categoryMatches.forEach((entry) => {
                reasons.push({
                    kind: 'category_regex',
                    value: categoryText,
                    pattern: entry.pattern,
                    note: entry.note || ''
                });
            });
        }

        if (Array.isArray(tagList)) {
            tagList.forEach((tag) => {
                if (settings.blockedTags.includes(tag)) {
                    reasons.push({ kind: 'tag_keyword', value: tag });
                }

                const tagMatches = findMatchingRegexEntries(settings.tagRegexList, tag);
                tagMatches.forEach((entry) => {
                    reasons.push({
                        kind: 'tag_regex',
                        value: tag,
                        pattern: entry.pattern,
                        note: entry.note || ''
                    });
                });
            });
        }

        if (titleText) {
            const lowerTitle = titleText.toLowerCase();
            settings.blockedTitles.forEach((keyword) => {
                if (keyword && lowerTitle.includes(keyword.toLowerCase())) {
                    reasons.push({ kind: 'title_keyword', value: keyword });
                }
            });

            const titleMatches = findMatchingRegexEntries(settings.titleRegexList, titleText);
            titleMatches.forEach((entry) => {
                reasons.push({
                    kind: 'title_regex',
                    pattern: entry.pattern,
                    note: entry.note || ''
                });
            });
        }

        return dedupeBlockReasons(reasons);
    }

    function buildSearchFilterBlockReasons(raw, normalized, { blacklistArray, whitelistArray, regexArray }) {
        if (!raw) return [];

        const reasons = [];

        if (blacklistArray.length > 0) {
            blacklistArray.forEach((keyword) => {
                if (matchesKeyword(normalized, keyword)) {
                    reasons.push({ kind: 'search_blacklist', value: keyword });
                }
            });
        }

        if (regexArray.length > 0) {
            regexArray.forEach((pattern) => {
                if (matchesRegex(raw, pattern)) {
                    reasons.push({ kind: 'search_regex', pattern });
                }
            });
        }

        if (whitelistArray.length > 0) {
            const containsWhitelist = whitelistArray.some((keyword) => matchesKeyword(normalized, keyword));
            if (!containsWhitelist) {
                reasons.push({ kind: 'search_whitelist_missing', values: whitelistArray });
            }
        }

        return dedupeBlockReasons(reasons);
    }

    function createContentFilterFeature({ store, runtime, page, profile, searchFilter, blockControls }) {
        function createPageRun({ bumpToken = false } = {}) {
            const pageKey = page.getCurrentPageKey();
            const pageChanged = runtime.currentPageKey !== pageKey;

            if (pageChanged) {
                runtime.currentPageKey = pageKey;
                if (runtime.debounceTimer) {
                    clearTimeout(runtime.debounceTimer);
                    runtime.debounceTimer = null;
                }
            }

            if (pageChanged || bumpToken || runtime.startToken === 0) {
                runtime.startToken += 1;
            }

            return { token: runtime.startToken, pageKey };
        }

        function isPageRunCurrent(run) {
            return Boolean(
                run &&
                runtime.startToken === run.token &&
                runtime.currentPageKey === run.pageKey &&
                page.getCurrentPageKey() === run.pageKey
            );
        }

        function applyBlockedState(element, shouldBlock, reasons = []) {
            if (!element) return false;

            if (!shouldBlock) {
                element.classList.remove(BLOCKED_ITEM_CLASS, BLOCKED_REVEALED_CLASS, BLOCK_ACTION_ITEM_CLASS);
                unhideElement(element);
                blockControls.setBlockReasons(element, []);
                return false;
            }

            element.classList.add(BLOCKED_ITEM_CLASS, BLOCK_ACTION_ITEM_CLASS);
            blockControls.setBlockReasons(element, reasons);

            if (blockControls.isRevealBlockedResults()) {
                element.classList.add(BLOCKED_REVEALED_CLASS);
                unhideElement(element);
            } else {
                element.classList.remove(BLOCKED_REVEALED_CLASS);
                softHideElement(element);
                blockControls.hideFloatingButtonIfItemMatches(element);
            }

            return true;
        }

        function getItemData(item) {
            if (typeof profile?.getItemData === 'function') {
                return profile.getItemData(item);
            }
            return {
                titleText: '',
                categoryText: '',
                tagList: []
            };
        }

        function filterContentItems() {
            const settings = store.getSnapshot();
            const items = typeof profile?.getContentItems === 'function'
                ? profile.getContentItems(document)
                : Array.from(document.querySelectorAll('tr.topic-list-item'));
            let blockedCount = 0;

            items.forEach((item) => {
                const itemData = getItemData(item);

                const reasons = buildTopicBlockReasons({
                    settings,
                    categoryText: itemData.categoryText || '',
                    tagList: Array.isArray(itemData.tagList) ? itemData.tagList : [],
                    titleText: itemData.titleText || ''
                });

                if (applyBlockedState(item, reasons.length > 0, reasons)) {
                    blockedCount += 1;
                }
                blockControls.ensureBlockActionButton(item);
            });

            blockControls.updateBlockToggleUI(blockedCount);
        }

        function filterSearchResults() {
            const searchTerm = searchFilter.getCurrentSearchTerm();
            const parsed = parseSearchFilterRule(store.getSearchFilterRule(searchTerm));
            const hasSearchFilter = (
                parsed.blacklistArray.length > 0 ||
                parsed.whitelistArray.length > 0 ||
                parsed.regexArray.length > 0
            );

            const results = typeof profile?.getSearchItems === 'function'
                ? profile.getSearchItems(document)
                : Array.from(document.querySelectorAll('.fps-result'));
            let blockedCount = 0;

            results.forEach((result) => {
                let reasons = [];
                if (profile?.features?.searchUsesContentRules) {
                    const itemData = getItemData(result);
                    reasons = buildTopicBlockReasons({
                        settings: store.getSnapshot(),
                        categoryText: itemData.categoryText || '',
                        tagList: Array.isArray(itemData.tagList) ? itemData.tagList : [],
                        titleText: itemData.titleText || ''
                    });
                }
                if (hasSearchFilter) {
                    const titleElement = typeof profile?.getSearchResultTitleElement === 'function'
                        ? profile.getSearchResultTitleElement(result)
                        : result.querySelector('.topic-title');
                    const { raw, normalized } = getSearchResultText(result, titleElement);
                    reasons = reasons.concat(buildSearchFilterBlockReasons(raw, normalized, parsed));
                }

                if (applyBlockedState(result, reasons.length > 0, reasons)) {
                    blockedCount += 1;
                }
                blockControls.ensureBlockActionButton(result);
            });

            blockControls.updateBlockToggleUI(blockedCount);
        }

        function filterContent() {
            if (page.isSearchPage()) {
                searchFilter.ensureUI();
                searchFilter.syncSearchFilterUIForCurrentTerm();
                filterSearchResults();
                return;
            }

            searchFilter.removeUI();
            filterContentItems();
        }

        function disconnectDomObserver() {
            if (runtime.domObserver) {
                runtime.domObserver.disconnect();
                runtime.domObserver = null;
            }
            runtime.domObserverRoot = null;
        }

        function runFilterForCurrentPage(run, { refreshObserver = false } = {}) {
            if (!isPageRunCurrent(run)) return;

            filterContent();

            if (!isPageRunCurrent(run)) return;
            if (refreshObserver) {
                observeDomChanges();
            }
        }

        function ensureContentFilterHook() {
            if (typeof window.triggerContentFilter !== 'function') {
                window.triggerContentFilter = () => {
                    const run = createPageRun();
                    runFilterForCurrentPage(run);
                };
            }
        }

        function resetAndReapplyFilter() {
            const items = typeof profile?.getAllFilterItems === 'function'
                ? profile.getAllFilterItems(document)
                : Array.from(document.querySelectorAll('tr.topic-list-item, .fps-result'));
            items.forEach((item) => {
                unhideElement(item);
            });

            const run = createPageRun();
            runFilterForCurrentPage(run);
        }

        function debounceFilter() {
            if (runtime.debounceTimer) {
                clearTimeout(runtime.debounceTimer);
            }

            const run = createPageRun();
            runtime.debounceTimer = setTimeout(() => {
                runtime.debounceTimer = null;
                runFilterForCurrentPage(run);
            }, 100);
        }

        function observeDomChanges() {
            const mainContainer = page.getObserverRoot();
            if (!mainContainer) {
                disconnectDomObserver();
                return;
            }

            if (runtime.domObserver && runtime.domObserverRoot === mainContainer) {
                return;
            }

            disconnectDomObserver();

            runtime.domObserver = new MutationObserver((mutations) => {
                const hasSignificantChange = mutations.some(
                    (mutation) => mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0
                );
                if (hasSignificantChange) {
                    debounceFilter();
                }
            });
            runtime.domObserverRoot = mainContainer;

            runtime.domObserver.observe(mainContainer, {
                childList: true,
                subtree: true
            });
        }

        function start() {
            ensureContentFilterHook();
            const run = createPageRun({ bumpToken: true });
            runFilterForCurrentPage(run, { refreshObserver: true });
        }

        return {
            filterContent,
            filterSearchResults,
            resetAndReapplyFilter,
            start
        };
    }

    const BLOCK_TOGGLE_CSS = `
    #${BLOCK_TOGGLE_WRAPPER_ID} {
        position: fixed;
        top: 140px;
        right: 16px;
        z-index: 900;
        pointer-events: auto;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 36px;
        padding: 0 10px;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,0.12);
        background: #ffffff;
        color: #111111;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        user-select: none;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button:hover {
        transform: translateY(-1px);
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button:focus-visible {
        outline: 2px solid rgba(255,230,15,0.6);
        outline-offset: 2px;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-icon {
        width: 18px;
        height: 18px;
        display: block;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-count {
        min-width: 16px;
        text-align: center;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed {
        color: #9aa0a6;
        border-color: rgba(0,0,0,0.08);
        box-shadow: none;
    }
    #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed .block-toggle-icon {
        opacity: 0.5;
    }
    .${BLOCKED_REVEALED_CLASS} {
        background-color: #ffe1e1 !important;
    }
    tr.${BLOCKED_REVEALED_CLASS} td {
        background-color: #ffe1e1 !important;
    }
    @media (prefers-color-scheme: dark) {
        #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
            background: #2b2b2b;
            color: #f2f2f2;
            border-color: rgba(255,255,255,0.18);
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
        #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button.is-revealed {
            color: #777777;
            border-color: rgba(255,255,255,0.08);
            box-shadow: none;
        }
        .${BLOCKED_REVEALED_CLASS} {
            background-color: #4a1f1f !important;
        }
        tr.${BLOCKED_REVEALED_CLASS} td {
            background-color: #4a1f1f !important;
        }
    }
    @media (max-width: 768px) {
        #${BLOCK_TOGGLE_WRAPPER_ID} {
            top: 120px;
            right: 12px;
        }
        #${BLOCK_TOGGLE_WRAPPER_ID} .block-toggle-button {
            height: 34px;
            padding: 0 8px;
            border-radius: 10px;
        }
    }
`;

    const BLOCK_ACTION_CSS = `
    .${BLOCK_ACTION_BUTTON_CLASS} {
        position: fixed;
        top: 0;
        left: 0;
        width: ${BLOCK_ACTION_BUTTON_SIZE}px;
        height: ${BLOCK_ACTION_BUTTON_SIZE}px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,0.2);
        background: rgba(255,255,255,0.9);
        color: #222222;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        opacity: 0;
        transform: scale(0.92);
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        transition: opacity 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
        cursor: pointer;
        z-index: 9999;
    }
    .${BLOCK_ACTION_BUTTON_CLASS} svg {
        width: 100%;
        height: 100%;
        display: block;
    }
    .${BLOCK_ACTION_BUTTON_CLASS}.${BLOCK_ACTION_VISIBLE_CLASS},
    .${BLOCK_ACTION_BUTTON_CLASS}:focus-visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
    }
    .${BLOCK_ACTION_BUTTON_CLASS}:focus-visible {
        outline: 2px solid rgba(211,47,47,0.45);
        outline-offset: 2px;
    }
    .${BLOCK_ACTION_BUTTON_CLASS}.is-blocked {
        color: #d32f2f;
        border-color: rgba(211,47,47,0.35);
    }
    #${BLOCK_ACTION_DIALOG_OVERLAY_ID} {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.45);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }
    #${BLOCK_ACTION_DIALOG_OVERLAY_ID}.has-sub-dialog > #${BLOCK_ACTION_DIALOG_ID} {
        visibility: hidden;
        pointer-events: none;
    }
    #${BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID} {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.2);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }
    .block-action-dialog {
        width: min(460px, 90vw);
        background: #ffffff;
        color: #222222;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        border: 1px solid rgba(0,0,0,0.08);
        padding: 20px 22px;
        font-size: 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .block-action-dialog h3 {
        margin: 0 0 6px 0;
        font-size: 20px;
    }
    .block-action-dialog .block-dialog-summary {
        margin: 0 0 12px 0;
        font-weight: 600;
        color: #333333;
    }
    .block-action-dialog .block-dialog-divider {
        height: 1px;
        background: rgba(0,0,0,0.1);
        margin: 4px 0 10px 0;
    }
    .block-action-dialog .block-dialog-reasons {
        margin: 0 0 16px 0;
        padding-left: 18px;
        max-height: 220px;
        overflow-y: auto;
        font-size: 15px;
        color: #555555;
    }
    .block-action-dialog .block-dialog-reasons.is-selectable {
        list-style: none;
        padding-left: 0;
    }
    .block-action-dialog .block-dialog-target,
    .block-action-dialog .block-dialog-meta {
        list-style: none;
        padding-left: 0;
    }
    .block-action-dialog .block-dialog-reasons li {
        margin: 6px 0;
        line-height: 1.5;
    }
    .block-action-dialog .block-dialog-reason-option,
    .block-action-dialog .block-dialog-reason-line {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }
    .block-action-dialog .block-dialog-reason-option {
        cursor: pointer;
    }
    .block-action-dialog .block-dialog-check {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        color: inherit !important;
        font: inherit !important;
        line-height: inherit !important;
        text-align: left !important;
        cursor: pointer !important;
        box-shadow: none !important;
        -webkit-tap-highlight-color: transparent;
    }
    .block-action-dialog .block-dialog-check-box {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        flex: 0 0 16px;
        border: 1.5px solid #9ca3af;
        border-radius: 4px;
        background: #ffffff;
        box-sizing: border-box;
    }
    .block-action-dialog .block-dialog-check.is-checked .block-dialog-check-box {
        border-color: #d32f2f;
        background: #d32f2f;
    }
    .block-action-dialog .block-dialog-check.is-checked .block-dialog-check-box::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 1px;
        width: 5px;
        height: 9px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
    .block-action-dialog .block-dialog-check:focus-visible {
        outline: none !important;
    }
    .block-action-dialog .block-dialog-check:focus-visible .block-dialog-check-box {
        box-shadow: 0 0 0 3px rgba(211,47,47,0.22);
    }
    .block-action-dialog .block-dialog-check-text {
        min-width: 0;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-reason-option.block-dialog-check {
        width: 100% !important;
        align-items: flex-start !important;
    }
    .block-action-dialog .block-dialog-reason-option .block-dialog-check-box {
        margin-top: 3px;
    }
    .block-action-dialog .block-dialog-reason-label {
        min-width: var(--block-dialog-reason-label-width, 7em);
        flex: 0 0 var(--block-dialog-reason-label-width, 7em);
        text-align: left;
        white-space: nowrap;
    }
    .block-action-dialog .block-dialog-reason-value {
        flex: 1 1 auto;
        min-width: 0;
        text-align: left;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-target-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .block-action-dialog .block-dialog-target-item.block-dialog-target-item-options {
        align-items: baseline;
    }
    .block-action-dialog .block-dialog-target-label {
        position: relative;
        font-weight: 600;
        color: #333333;
        white-space: nowrap;
        min-width: var(--block-dialog-label-width, 8em);
        text-align: left;
        flex: 0 0 var(--block-dialog-label-width, 8em);
        padding-left: 12px;
    }
    .block-action-dialog .block-dialog-target-label::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: inherit;
    }
    .block-action-dialog .block-dialog-target-input {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 32px;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 6px;
        padding: 6px 8px;
        font-size: 16px;
        color: #222222;
        background: #ffffff;
        box-sizing: border-box;
    }
    .block-action-dialog .block-dialog-target-text {
        flex: 1 1 auto;
        min-width: 0;
        padding: 6px 0;
        font-size: 16px;
        color: #222222;
        line-height: 1.4;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-target-input[readonly] {
        cursor: text;
        opacity: 1;
    }
    .block-action-dialog .block-dialog-target-input[readonly]:focus {
        border-color: rgba(0,0,0,0.2);
        box-shadow: none;
    }
    .block-action-dialog textarea.block-dialog-target-input {
        resize: none;
        overflow: hidden;
        line-height: 1.4;
    }
    .block-action-dialog .block-dialog-target-input:focus {
        outline: none;
        border-color: rgba(211,47,47,0.6);
        box-shadow: 0 0 0 2px rgba(211,47,47,0.15);
    }
    .block-action-dialog .block-dialog-target-options {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 15px;
        color: #222222;
        display: flex;
        flex-wrap: wrap;
        gap: 6px 10px;
        padding: 0;
    }
    .block-action-dialog .block-dialog-target-options .block-dialog-check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
    .block-action-dialog .block-dialog-title-keywords {
        align-items: center;
    }
    .block-action-dialog .block-dialog-title-keywords .block-dialog-target-label {
        margin-left: 16px;
        min-width: calc(var(--block-dialog-label-width, 8em) - 16px);
        flex: 0 0 calc(var(--block-dialog-label-width, 8em) - 16px);
    }
    .block-action-dialog .block-dialog-title-keywords .block-dialog-target-label::before {
        content: '';
        width: 8px;
        height: 8px;
        border: 2px solid currentColor;
        border-radius: 999px;
        background: transparent;
        left: 1px;
        box-sizing: border-box;
    }
    .block-action-dialog .block-dialog-title-keywords.has-options {
        align-items: flex-start;
    }
    .block-action-dialog .block-dialog-title-keywords-content {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .block-action-dialog .block-dialog-title-keyword-preview {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        color: #555555;
    }
    .block-action-dialog .block-dialog-title-keyword-preview.is-hidden {
        display: none;
    }
    .block-action-dialog .block-dialog-title-keyword-text {
        font-weight: 600;
        color: #222222;
        word-break: break-word;
    }
    .block-action-dialog .block-dialog-title-keyword-confirm,
    .block-action-dialog .block-dialog-title-keyword-cancel {
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid rgba(0,0,0,0.18);
        color: #333333;
    }
    .block-action-dialog .block-dialog-title-keyword-confirm {
        background: #f4f4f4;
    }
    .block-action-dialog .block-dialog-title-keyword-cancel {
        background: #ffffff;
    }
    .block-action-dialog .block-dialog-title-keyword-confirm:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .block-action-dialog .block-dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .block-action-dialog .block-dialog-actions button {
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
    }
    .block-action-dialog .block-dialog-confirm {
        background: #d32f2f;
        color: #ffffff;
    }
    .block-action-dialog .block-dialog-confirm:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    .block-action-dialog .block-dialog-cancel {
        background: #f4f4f4;
        color: #333333;
        border-color: rgba(0,0,0,0.12);
    }
    .block-action-dialog .block-dialog-confirm:hover {
        background: #c62828;
    }
    .block-action-dialog .block-dialog-cancel:hover {
        background: #e8e8e8;
    }
    @media (prefers-color-scheme: dark) {
        .${BLOCK_ACTION_BUTTON_CLASS} {
            background: rgba(40,40,40,0.9);
            border-color: rgba(255,255,255,0.18);
            color: #f0f0f0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .${BLOCK_ACTION_BUTTON_CLASS}.is-blocked {
            color: #ff6b6b;
            border-color: rgba(255,107,107,0.4);
        }
        .block-action-dialog {
            background: #2b2b2b;
            color: #f2f2f2;
            border-color: rgba(255,255,255,0.1);
        }
        .block-action-dialog .block-dialog-summary {
            color: #f0f0f0;
        }
        .block-action-dialog .block-dialog-divider {
            background: rgba(255,255,255,0.18);
        }
        .block-action-dialog .block-dialog-reasons {
            color: #cfcfcf;
        }
        .block-action-dialog .block-dialog-target-label {
            color: #f0f0f0;
        }
        .block-action-dialog .block-dialog-target-input {
            background: #3a3a3a;
            color: #f2f2f2;
            border-color: rgba(255,255,255,0.2);
        }
        .block-action-dialog .block-dialog-target-text {
            color: #f2f2f2;
        }
        .block-action-dialog .block-dialog-target-input:focus {
            border-color: rgba(255,107,107,0.7);
            box-shadow: 0 0 0 2px rgba(255,107,107,0.2);
        }
        .block-action-dialog .block-dialog-target-options {
            color: #f2f2f2;
        }
        .block-action-dialog .block-dialog-check-box {
            border-color: rgba(255,255,255,0.55);
            background: #3a3a3a;
        }
        .block-action-dialog .block-dialog-check.is-checked .block-dialog-check-box {
            border-color: #ff6b6b;
            background: #ff6b6b;
        }
        .block-action-dialog .block-dialog-title-keyword-preview {
            color: #cfcfcf;
        }
        .block-action-dialog .block-dialog-title-keyword-text {
            color: #f0f0f0;
        }
        .block-action-dialog .block-dialog-title-keyword-confirm {
            background: #3a3a3a;
            color: #f0f0f0;
            border-color: rgba(255,255,255,0.16);
        }
        .block-action-dialog .block-dialog-title-keyword-cancel {
            background: #2f2f2f;
            color: #f0f0f0;
            border-color: rgba(255,255,255,0.16);
        }
        .block-action-dialog .block-dialog-cancel {
            background: #3a3a3a;
            color: #f0f0f0;
            border-color: rgba(255,255,255,0.16);
        }
        .block-action-dialog .block-dialog-cancel:hover {
            background: #444444;
        }
    }
    @media (hover: none) {
        .${BLOCK_ACTION_BUTTON_CLASS} {
            transition: none;
        }
    }
`;

    function createBlockActionButtonController({
        runtime,
        store,
        profile,
        ensureBlockActionStyles,
        getBlockActionHost,
        getBlockReasonsFromElement,
        getBlockTargetForItem,
        showBlockedItemDialog,
        showBlockConfirmDialog
    }) {
        function isBlockActionRelatedTarget(target) {
            if (!target) return false;
            if (runtime.blockActionFloatingButton && target.nodeType && runtime.blockActionFloatingButton.contains(target)) {
                return true;
            }
            if (typeof target.closest !== 'function') return false;
            return Boolean(target.closest(profile?.blockActionRelatedSelector || 'tr.topic-list-item, .fps-result'));
        }

        function positionBlockActionButton(item) {
            const button = runtime.blockActionFloatingButton;
            if (!button) return;

            if (!item || !item.isConnected) {
                hideBlockActionButton();
                return;
            }

            const host = getBlockActionHost(item);
            if (!host) {
                hideBlockActionButton();
                return;
            }

            const rect = host.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                hideBlockActionButton();
                return;
            }

            if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
                hideBlockActionButton();
                return;
            }

            let top = rect.top + BLOCK_ACTION_BUTTON_OFFSET_TOP;
            let left = rect.right - BLOCK_ACTION_BUTTON_OFFSET_RIGHT - BLOCK_ACTION_BUTTON_SIZE;

            const summaryButton = item.querySelector('.topic-summary-button');
            if (summaryButton) {
                const summaryRect = summaryButton.getBoundingClientRect();
                if (summaryRect.width && summaryRect.height) {
                    const gap = 6;
                    const candidateLeft = summaryRect.left - gap - BLOCK_ACTION_BUTTON_SIZE;
                    if (!Number.isNaN(candidateLeft)) {
                        left = Math.min(left, candidateLeft);
                    }
                    const candidateTop = summaryRect.top + (summaryRect.height - BLOCK_ACTION_BUTTON_SIZE) / 2;
                    if (!Number.isNaN(candidateTop)) {
                        top = candidateTop;
                    }
                }
            }

            const minEdge = 6;
            const maxLeft = Math.max(minEdge, window.innerWidth - BLOCK_ACTION_BUTTON_SIZE - minEdge);
            const maxTop = Math.max(minEdge, window.innerHeight - BLOCK_ACTION_BUTTON_SIZE - minEdge);
            const clampedLeft = Math.min(Math.max(left, minEdge), maxLeft);
            const clampedTop = Math.min(Math.max(top, minEdge), maxTop);

            button.style.left = `${Math.round(clampedLeft)}px`;
            button.style.top = `${Math.round(clampedTop)}px`;
        }

        function scheduleBlockActionButtonPositionUpdate() {
            if (!runtime.blockActionFloatingButton || !runtime.blockActionFloatingItem) return;
            if (runtime.blockActionPositionRaf) return;

            runtime.blockActionPositionRaf = requestAnimationFrame(() => {
                runtime.blockActionPositionRaf = null;
                positionBlockActionButton(runtime.blockActionFloatingItem);
            });
        }

        function updateBlockActionButtonState(button, item) {
            if (!button || !item) return;

            const isBlocked = item.classList.contains(BLOCKED_ITEM_CLASS);
            button.classList.toggle('is-blocked', isBlocked);
            if (isBlocked) {
                button.setAttribute('title', '查看屏蔽原因');
                button.setAttribute('aria-label', '查看屏蔽原因');
            } else {
                button.setAttribute('title', '屏蔽该结果');
                button.setAttribute('aria-label', '屏蔽该结果');
            }
        }

        function ensureBlockActionFloatingButton() {
            if (runtime.blockActionFloatingButton) return runtime.blockActionFloatingButton;

            ensureBlockActionStyles();

            const button = document.createElement('button');
            button.type = 'button';
            button.className = BLOCK_ACTION_BUTTON_CLASS;
            button.setAttribute('aria-hidden', 'true');
            button.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle>
                <path d="M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </svg>
        `;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const item = runtime.blockActionFloatingItem;
                if (!item) return;

                const reasons = getBlockReasonsFromElement(item);
                if (reasons.length > 0) {
                    showBlockedItemDialog(reasons);
                    return;
                }

                const target = getBlockTargetForItem(item);
                if (!target) return;
                showBlockConfirmDialog(target, item);
            });

            button.addEventListener('mouseleave', (event) => {
                if (isBlockActionRelatedTarget(event.relatedTarget)) return;
                hideBlockActionButton();
            });

            document.body.appendChild(button);
            runtime.blockActionFloatingButton = button;

            window.addEventListener('scroll', scheduleBlockActionButtonPositionUpdate, true);
            window.addEventListener('resize', scheduleBlockActionButtonPositionUpdate);

            return button;
        }

        function showBlockActionButtonForItem(item) {
            if (!item) return;
            const button = ensureBlockActionFloatingButton();
            runtime.blockActionFloatingItem = item;
            updateBlockActionButtonState(button, item);
            positionBlockActionButton(item);
            button.classList.add(BLOCK_ACTION_VISIBLE_CLASS);
            button.setAttribute('aria-hidden', 'false');
        }

        function hideBlockActionButton() {
            if (!runtime.blockActionFloatingButton) return;
            runtime.blockActionFloatingButton.classList.remove(BLOCK_ACTION_VISIBLE_CLASS);
            runtime.blockActionFloatingButton.setAttribute('aria-hidden', 'true');
            runtime.blockActionFloatingItem = null;
        }

        function bindBlockActionHover(item) {
            if (!item || runtime.blockActionHoverBoundItems.has(item)) return;
            runtime.blockActionHoverBoundItems.add(item);

            item.addEventListener('mouseenter', () => {
                showBlockActionButtonForItem(item);
            });
            item.addEventListener('mouseleave', (event) => {
                if (isBlockActionRelatedTarget(event.relatedTarget)) return;
                hideBlockActionButton();
            });
            item.addEventListener('pointerdown', (event) => {
                if (event.pointerType === 'touch') {
                    showBlockActionButtonForItem(item);
                }
            });
        }

        function ensureBlockActionButtonNow(item) {
            if (!item) return;
            ensureBlockActionFloatingButton();
            bindBlockActionHover(item);
            if (runtime.blockActionFloatingItem === item && runtime.blockActionFloatingButton) {
                updateBlockActionButtonState(runtime.blockActionFloatingButton, item);
                scheduleBlockActionButtonPositionUpdate();
            }
        }

        function ensureBlockActionButton(item) {
            if (!item) return;
            const shouldDefer = typeof profile?.shouldDeferBlockActionButton === 'function'
                ? profile.shouldDeferBlockActionButton(item, store.getSnapshot())
                : false;

            if (shouldDefer) {
                return;
            }

            ensureBlockActionButtonNow(item);
        }

        function hideFloatingButtonIfItemMatches(item) {
            if (runtime.blockActionFloatingItem === item) {
                hideBlockActionButton();
            }
        }

        return {
            ensureBlockActionButton,
            hideBlockActionButton,
            hideFloatingButtonIfItemMatches
        };
    }

    function setBlockCheckOptionChecked(optionElement, checked) {
        if (!optionElement) return;
        optionElement.classList.toggle('is-checked', Boolean(checked));
        optionElement.setAttribute('aria-checked', checked ? 'true' : 'false');
    }

    function toggleBlockCheckOption(optionElement) {
        const nextChecked = optionElement.getAttribute('aria-checked') !== 'true';
        setBlockCheckOptionChecked(optionElement, nextChecked);
        optionElement.dispatchEvent(new CustomEvent('block-option-change', { bubbles: true }));
    }

    function createBlockCheckOption(value, textValue = value, checked = false) {
        const optionElement = document.createElement('button');
        optionElement.type = 'button';
        optionElement.className = 'block-dialog-check';
        optionElement.setAttribute('role', 'checkbox');
        optionElement.dataset.value = value;
        setBlockCheckOptionChecked(optionElement, checked);

        const box = document.createElement('span');
        box.className = 'block-dialog-check-box';
        box.setAttribute('aria-hidden', 'true');
        const text = document.createElement('span');
        text.className = 'block-dialog-check-text';
        text.textContent = textValue;

        optionElement.appendChild(box);
        optionElement.appendChild(text);
        optionElement.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleBlockCheckOption(optionElement);
        });

        return optionElement;
    }

    function createBlockOptionGroup(options, ariaLabel) {
        const container = document.createElement('div');
        container.className = 'block-dialog-target-options';
        container.setAttribute('role', 'group');
        container.setAttribute('aria-label', ariaLabel);
        options.forEach((option) => {
            container.appendChild(createBlockCheckOption(option, option));
        });
        return container;
    }

    function getCheckedOptionValues(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll('.block-dialog-check[aria-checked="true"]'))
            .map((optionElement) => optionElement.dataset.value || '');
    }

    function autoResizeTextarea(textarea) {
        if (!textarea) return;
        textarea.style.height = '0px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function createBlockConfirmDialog({
        notifier,
        shell,
        getLabel,
        getDialogLabel,
        ensureBlockActionStyles,
        getTopicTitleFromItem,
        getCategoryTextFromItem,
        getTagListFromItem,
        applyBlockTarget
    }) {
        const {
            bindEscapeToDialogClose,
            closeBlockedItemDialog,
            closeBlockedItemSubDialog,
            lockPageForDialog
        } = shell;

        function showBlockConfirmDialog(target, item) {
            if (!target || !target.kind) return;
            ensureBlockActionStyles();
            closeBlockedItemDialog();
            lockPageForDialog();

            const overlay = document.createElement('div');
            overlay.id = BLOCK_ACTION_DIALOG_OVERLAY_ID;
            overlay.addEventListener('click', () => closeBlockedItemDialog());

            const dialog = document.createElement('div');
            dialog.id = BLOCK_ACTION_DIALOG_ID;
            dialog.className = 'block-action-dialog';
            dialog.setAttribute('role', 'dialog');
            dialog.setAttribute('aria-modal', 'true');
            dialog.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            const title = document.createElement('h3');
            title.textContent = '屏蔽选择器';

            const previewTitleText = getTopicTitleFromItem(item);
            const previewFallbackValue = (target.kind === 'search_blacklist' || target.kind === 'title_keyword')
                ? (target.value || '')
                : '';
            const previewTitleValue = previewTitleText || previewFallbackValue;

            const categoryText = getCategoryTextFromItem(item);
            const tagList = getTagListFromItem(item);

            const detailList = document.createElement('ul');
            detailList.className = 'block-dialog-reasons block-dialog-target';
            const titleItem = document.createElement('li');
            titleItem.className = 'block-dialog-target-item';
            const titleLabel = document.createElement('span');
            titleLabel.className = 'block-dialog-target-label';
            titleLabel.textContent = getDialogLabel('title', '标题');
            const titleInput = document.createElement('textarea');
            titleInput.className = 'block-dialog-target-input';
            titleInput.value = previewTitleValue;
            titleInput.rows = 1;
            titleInput.readOnly = true;
            titleInput.setAttribute('aria-label', getLabel('title', '标题'));
            titleItem.appendChild(titleLabel);
            titleItem.appendChild(titleInput);
            detailList.appendChild(titleItem);

            const titleKeywordItem = document.createElement('li');
            titleKeywordItem.className = 'block-dialog-target-item block-dialog-title-keywords';
            const titleKeywordLabel = document.createElement('span');
            titleKeywordLabel.className = 'block-dialog-target-label';
            titleKeywordLabel.textContent = getDialogLabel('blockDialogTitleKeyword', '关键词');
            const titleKeywordContent = document.createElement('div');
            titleKeywordContent.className = 'block-dialog-title-keywords-content';
            const titleKeywordPreview = document.createElement('div');
            titleKeywordPreview.className = 'block-dialog-title-keyword-preview is-hidden';
            const titleKeywordText = document.createElement('span');
            titleKeywordText.className = 'block-dialog-title-keyword-text';
            const titleKeywordOk = document.createElement('button');
            titleKeywordOk.type = 'button';
            titleKeywordOk.className = 'block-dialog-title-keyword-confirm';
            titleKeywordOk.textContent = '添加';
            titleKeywordOk.disabled = true;
            const titleKeywordCancel = document.createElement('button');
            titleKeywordCancel.type = 'button';
            titleKeywordCancel.className = 'block-dialog-title-keyword-cancel';
            titleKeywordCancel.textContent = '取消';
            titleKeywordCancel.disabled = true;
            titleKeywordPreview.appendChild(titleKeywordText);
            titleKeywordPreview.appendChild(titleKeywordOk);
            titleKeywordPreview.appendChild(titleKeywordCancel);
            const titleKeywordOptions = createBlockOptionGroup([], getLabel('blockDialogTitleKeyword', '关键词'));
            titleKeywordOptions.style.display = 'none';
            titleKeywordContent.appendChild(titleKeywordPreview);
            titleKeywordContent.appendChild(titleKeywordOptions);
            titleKeywordItem.appendChild(titleKeywordLabel);
            titleKeywordItem.appendChild(titleKeywordContent);
            titleKeywordItem.style.display = 'none';
            detailList.appendChild(titleKeywordItem);

            const titleKeywordOptionMap = new Map();
            let currentTitleKeywordSelection = '';
            let hasTouchedBlockOptions = false;
            const markBlockOptionsTouched = () => {
                hasTouchedBlockOptions = true;
            };
            titleKeywordOptions.addEventListener('block-option-change', markBlockOptionsTouched);

            const updateDialogLabelWidth = () => {
                const labelTexts = [getDialogLabel('title', '标题')];
                if (currentTitleKeywordSelection || titleKeywordOptionMap.size > 0) {
                    labelTexts.push(getDialogLabel('blockDialogTitleKeyword', '关键词'));
                }
                if (categoryText) labelTexts.push(getDialogLabel('category', '类别'));
                if (tagList.length > 0) labelTexts.push(getDialogLabel('tag', '标签'));
                const longest = Math.max(...labelTexts.map((text) => text.length));
                dialog.style.setProperty('--block-dialog-label-width', `${Math.max(3, longest + 0.5)}em`);
            };

            const normalizeTitleKeyword = (value) => value ? value.replace(/\s+/g, ' ').trim() : '';

            const updateTitleKeywordRow = () => {
                const hasSelection = Boolean(currentTitleKeywordSelection);
                const hasOptions = titleKeywordOptionMap.size > 0;
                titleKeywordPreview.classList.toggle('is-hidden', !hasSelection);
                titleKeywordOk.disabled = !hasSelection;
                titleKeywordCancel.disabled = !hasSelection;
                titleKeywordOptions.style.display = hasOptions ? '' : 'none';
                titleKeywordItem.style.display = (hasSelection || hasOptions) ? '' : 'none';
                titleKeywordItem.classList.toggle('has-options', hasOptions);
                updateDialogLabelWidth();
            };

            const setTitleKeywordSelection = (value) => {
                currentTitleKeywordSelection = normalizeTitleKeyword(value);
                titleKeywordText.textContent = currentTitleKeywordSelection;
                updateTitleKeywordRow();
            };

            const clearTitleInputSelection = () => {
                if (typeof titleInput.setSelectionRange !== 'function') return;
                const end = titleInput.value.length;
                titleInput.setSelectionRange(end, end);
                titleInput.blur();
                const selection = window.getSelection?.();
                if (selection) selection.removeAllRanges();
            };

            const syncTitleKeywordSelection = () => {
                const start = titleInput.selectionStart;
                const end = titleInput.selectionEnd;
                if (typeof start !== 'number' || typeof end !== 'number' || start === end) {
                    setTitleKeywordSelection('');
                    return;
                }
                setTitleKeywordSelection(titleInput.value.slice(start, end));
            };

            const addTitleKeywordOption = (value) => {
                const normalized = normalizeTitleKeyword(value);
                if (!normalized) return false;
                const key = normalized.toLowerCase();
                const existing = titleKeywordOptionMap.get(key);
                if (existing) {
                    setBlockCheckOptionChecked(existing, true);
                    return false;
                }

                const optionElement = createBlockCheckOption(normalized, normalized, true);
                titleKeywordOptions.appendChild(optionElement);
                titleKeywordOptionMap.set(key, optionElement);
                return true;
            };

            titleInput.addEventListener('select', syncTitleKeywordSelection);
            titleInput.addEventListener('mouseup', syncTitleKeywordSelection);
            titleInput.addEventListener('keyup', syncTitleKeywordSelection);

            titleKeywordOk.addEventListener('click', () => {
                if (!currentTitleKeywordSelection) return;
                addTitleKeywordOption(currentTitleKeywordSelection);
                setTitleKeywordSelection('');
                clearTitleInputSelection();
            });
            titleKeywordCancel.addEventListener('click', () => {
                setTitleKeywordSelection('');
                clearTitleInputSelection();
            });

            updateDialogLabelWidth();

            let metaList = null;
            let categoryOptions = null;
            let tagOptions = null;
            if (categoryText || tagList.length > 0) {
                metaList = document.createElement('ul');
                metaList.className = 'block-dialog-reasons block-dialog-meta';
                if (categoryText) {
                    const categoryItem = document.createElement('li');
                    categoryItem.className = 'block-dialog-target-item block-dialog-target-item-options';
                    const categoryLabel = document.createElement('span');
                    categoryLabel.className = 'block-dialog-target-label';
                    categoryLabel.textContent = getDialogLabel('category', '类别');
                    categoryOptions = createBlockOptionGroup([categoryText], getLabel('category', '类别'));
                    categoryOptions.addEventListener('block-option-change', markBlockOptionsTouched);
                    categoryItem.appendChild(categoryLabel);
                    categoryItem.appendChild(categoryOptions);
                    metaList.appendChild(categoryItem);
                }
                if (tagList.length > 0) {
                    const tagItem = document.createElement('li');
                    tagItem.className = 'block-dialog-target-item block-dialog-target-item-options';
                    const tagLabel = document.createElement('span');
                    tagLabel.className = 'block-dialog-target-label';
                    tagLabel.textContent = getDialogLabel('tag', '标签');
                    tagOptions = createBlockOptionGroup(tagList, getLabel('tag', '标签'));
                    tagOptions.addEventListener('block-option-change', markBlockOptionsTouched);
                    tagItem.appendChild(tagLabel);
                    tagItem.appendChild(tagOptions);
                    metaList.appendChild(tagItem);
                }
            }

            const actions = document.createElement('div');
            actions.className = 'block-dialog-actions';
            const confirmButton = document.createElement('button');
            confirmButton.type = 'button';
            confirmButton.className = 'block-dialog-confirm';
            confirmButton.textContent = '选好了';
            confirmButton.addEventListener('click', () => {
                if (document.getElementById(BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID)) return;

                const selectedTitleKeywords = getCheckedOptionValues(titleKeywordOptions);
                const selectedCategories = getCheckedOptionValues(categoryOptions);
                const selectedTags = getCheckedOptionValues(tagOptions);
                const hasSelectedBlockOption =
                    selectedTitleKeywords.length > 0 ||
                    selectedCategories.length > 0 ||
                    selectedTags.length > 0;
                if (hasTouchedBlockOptions && !hasSelectedBlockOption) {
                    notifier.show('请选择至少一个要屏蔽的内容', 'info');
                    return;
                }

                const subOverlay = document.createElement('div');
                subOverlay.id = BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID;
                subOverlay.addEventListener('click', (event) => {
                    event.stopPropagation();
                    closeBlockedItemSubDialog();
                });
                overlay.classList.add('has-sub-dialog');

                const subDialog = document.createElement('div');
                subDialog.id = BLOCK_ACTION_SUB_DIALOG_ID;
                subDialog.className = 'block-action-dialog';
                subDialog.setAttribute('role', 'dialog');
                subDialog.setAttribute('aria-modal', 'true');
                subDialog.addEventListener('click', (event) => {
                    event.stopPropagation();
                });

                const subTitle = document.createElement('h3');
                subTitle.textContent = '确认屏蔽';

                let subMetaList = null;
                if (selectedTitleKeywords.length > 0 || selectedCategories.length > 0 || selectedTags.length > 0) {
                    subMetaList = document.createElement('ul');
                    subMetaList.className = 'block-dialog-reasons block-dialog-meta';

                    if (selectedTitleKeywords.length > 0) {
                        const titleKeywordItem = document.createElement('li');
                        titleKeywordItem.className = 'block-dialog-target-item';
                        const titleKeywordLabel = document.createElement('span');
                        titleKeywordLabel.className = 'block-dialog-target-label';
                        titleKeywordLabel.textContent = getDialogLabel('titleKeyword', '标题关键词');
                        const titleKeywordTextElement = document.createElement('div');
                        titleKeywordTextElement.className = 'block-dialog-target-text';
                        titleKeywordTextElement.textContent = selectedTitleKeywords.join(', ');
                        titleKeywordItem.appendChild(titleKeywordLabel);
                        titleKeywordItem.appendChild(titleKeywordTextElement);
                        subMetaList.appendChild(titleKeywordItem);
                    }

                    if (selectedCategories.length > 0) {
                        const categoryItem = document.createElement('li');
                        categoryItem.className = 'block-dialog-target-item';
                        const categoryLabel = document.createElement('span');
                        categoryLabel.className = 'block-dialog-target-label';
                        categoryLabel.textContent = getDialogLabel('category', '类别');
                        const categoryTextElement = document.createElement('div');
                        categoryTextElement.className = 'block-dialog-target-text';
                        categoryTextElement.textContent = selectedCategories.join(', ');
                        categoryItem.appendChild(categoryLabel);
                        categoryItem.appendChild(categoryTextElement);
                        subMetaList.appendChild(categoryItem);
                    }

                    if (selectedTags.length > 0) {
                        const tagItem = document.createElement('li');
                        tagItem.className = 'block-dialog-target-item';
                        const tagLabel = document.createElement('span');
                        tagLabel.className = 'block-dialog-target-label';
                        tagLabel.textContent = getDialogLabel('tag', '标签');
                        const tagTextElement = document.createElement('div');
                        tagTextElement.className = 'block-dialog-target-text';
                        tagTextElement.textContent = selectedTags.join(', ');
                        tagItem.appendChild(tagLabel);
                        tagItem.appendChild(tagTextElement);
                        subMetaList.appendChild(tagItem);
                    }
                }

                const subActions = document.createElement('div');
                subActions.className = 'block-dialog-actions';
                const subConfirmButton = document.createElement('button');
                subConfirmButton.type = 'button';
                subConfirmButton.className = 'block-dialog-confirm';
                subConfirmButton.textContent = '确认屏蔽';
                subConfirmButton.addEventListener('click', () => {
                    const titleKind = target.kind === 'search_blacklist' ? 'search_blacklist' : 'title_keyword';
                    const titleValues = [];
                    const titleValueSet = new Set();
                    const addTitleValue = (value) => {
                        const trimmedValue = value.trim();
                        if (!trimmedValue) return;
                        const lowerValue = trimmedValue.toLowerCase();
                        if (titleValueSet.has(lowerValue)) return;
                        titleValueSet.add(lowerValue);
                        titleValues.push(trimmedValue);
                    };

                    selectedTitleKeywords.forEach(addTitleValue);
                    if (titleValues.length === 0 && selectedCategories.length === 0 && selectedTags.length === 0) {
                        const fallbackTitle = getTopicTitleFromItem(item);
                        const fallbackValue = (target.kind === 'search_blacklist' || target.kind === 'title_keyword')
                            ? (target.value || '')
                            : '';
                        addTitleValue(currentTitleKeywordSelection || fallbackTitle || fallbackValue);
                    }

                    titleValues.forEach((nextValue) => {
                        const nextTarget = { kind: titleKind, value: nextValue };
                        if (titleKind === 'search_blacklist' && target.searchTerm) {
                            nextTarget.searchTerm = target.searchTerm;
                        }
                        applyBlockTarget(nextTarget);
                    });

                    selectedCategories.forEach((nextValue) => {
                        applyBlockTarget({ kind: 'category_keyword', value: nextValue });
                    });

                    selectedTags.forEach((nextValue) => {
                        applyBlockTarget({ kind: 'tag_keyword', value: nextValue });
                    });

                    closeBlockedItemDialog();
                });

                const subCancelButton = document.createElement('button');
                subCancelButton.type = 'button';
                subCancelButton.className = 'block-dialog-cancel';
                subCancelButton.textContent = '取消';
                subCancelButton.addEventListener('click', () => closeBlockedItemSubDialog());

                subActions.appendChild(subConfirmButton);
                subActions.appendChild(subCancelButton);
                subDialog.appendChild(subTitle);
                if (subMetaList) subDialog.appendChild(subMetaList);
                subDialog.appendChild(subActions);
                subOverlay.appendChild(subDialog);
                overlay.appendChild(subOverlay);
                subConfirmButton.focus();
            });

            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.className = 'block-dialog-cancel';
            cancelButton.textContent = '取消';
            cancelButton.addEventListener('click', () => closeBlockedItemDialog());

            actions.appendChild(confirmButton);
            actions.appendChild(cancelButton);
            dialog.appendChild(title);
            dialog.appendChild(detailList);
            if (metaList) dialog.appendChild(metaList);
            dialog.appendChild(actions);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            bindEscapeToDialogClose();
            autoResizeTextarea(titleInput);
            confirmButton.focus();
        }

        return {
            showBlockConfirmDialog
        };
    }

    function createBlockDialogShell({ runtime }) {
        function closeBlockedItemSubDialog() {
            const overlay = document.getElementById(BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID);
            if (!overlay) return false;
            overlay.remove();
            const mainOverlay = document.getElementById(BLOCK_ACTION_DIALOG_OVERLAY_ID);
            if (mainOverlay) {
                mainOverlay.classList.remove('has-sub-dialog');
            }
            return true;
        }

        function closeBlockedItemDialog() {
            closeBlockedItemSubDialog();
            const overlay = document.getElementById(BLOCK_ACTION_DIALOG_OVERLAY_ID);
            if (overlay) overlay.remove();

            if (runtime.blockDialogEscapeHandler) {
                document.removeEventListener('keydown', runtime.blockDialogEscapeHandler);
                runtime.blockDialogEscapeHandler = null;
            }

            if (runtime.blockDialogSavedBodyOverflow !== null) {
                document.body.style.overflow = runtime.blockDialogSavedBodyOverflow;
                runtime.blockDialogSavedBodyOverflow = null;
            }

            if (runtime.blockDialogSavedHtmlOverflow !== null) {
                document.documentElement.style.overflow = runtime.blockDialogSavedHtmlOverflow;
                runtime.blockDialogSavedHtmlOverflow = null;
            }
        }

        function lockPageForDialog() {
            if (runtime.blockDialogSavedBodyOverflow === null) {
                runtime.blockDialogSavedBodyOverflow = document.body.style.overflow;
            }
            if (runtime.blockDialogSavedHtmlOverflow === null) {
                runtime.blockDialogSavedHtmlOverflow = document.documentElement.style.overflow;
            }
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        function bindEscapeToDialogClose() {
            runtime.blockDialogEscapeHandler = (event) => {
                if (event.key === 'Escape') {
                    if (closeBlockedItemSubDialog()) return;
                    closeBlockedItemDialog();
                }
            };
            document.addEventListener('keydown', runtime.blockDialogEscapeHandler);
        }

        return {
            bindEscapeToDialogClose,
            closeBlockedItemDialog,
            closeBlockedItemSubDialog,
            lockPageForDialog
        };
    }

    function createBlockUnblockDialog({
        notifier,
        shell,
        profileLabels,
        ensureBlockActionStyles,
        applyUnblockFromReasons
    }) {
        const {
            bindEscapeToDialogClose,
            closeBlockedItemDialog,
            closeBlockedItemSubDialog,
            lockPageForDialog
        } = shell;

        function showBlockedItemDialog(reasons) {
            const dedupedReasons = dedupeBlockReasons(reasons);
            if (dedupedReasons.length === 0) return;

            const normalizedReasons = dedupedReasons
                .map((reason, index) => ({ reason, index }))
                .sort((a, b) => {
                    const rankMap = {
                        title_keyword: 1,
                        title_regex: 1,
                        category_keyword: 2,
                        category_regex: 2,
                        tag_keyword: 3,
                        tag_regex: 3
                    };
                    const rankA = rankMap[a.reason.kind] || 9;
                    const rankB = rankMap[b.reason.kind] || 9;
                    if (rankA !== rankB) return rankA - rankB;
                    return a.index - b.index;
                })
                .map((entry) => entry.reason);

            ensureBlockActionStyles();
            closeBlockedItemDialog();
            lockPageForDialog();

            const overlay = document.createElement('div');
            overlay.id = BLOCK_ACTION_DIALOG_OVERLAY_ID;
            overlay.addEventListener('click', () => closeBlockedItemDialog());

            const dialog = document.createElement('div');
            dialog.id = BLOCK_ACTION_DIALOG_ID;
            dialog.className = 'block-action-dialog';
            dialog.setAttribute('role', 'dialog');
            dialog.setAttribute('aria-modal', 'true');
            dialog.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            const title = document.createElement('h3');
            title.textContent = '取消屏蔽选择器';
            const divider = document.createElement('div');
            divider.className = 'block-dialog-divider';
            const summary = document.createElement('p');
            summary.className = 'block-dialog-summary';
            summary.textContent = '选择要取消的屏蔽规则';
            const reasonList = document.createElement('ul');
            reasonList.className = 'block-dialog-reasons is-selectable';

            const reasonLabelTexts = [];
            normalizedReasons.forEach((reason, index) => {
                const { label, value } = getBlockReasonLabelValue(reason, profileLabels);
                reasonLabelTexts.push(label);
                const item = document.createElement('li');
                const labelElement = document.createElement('button');
                labelElement.type = 'button';
                labelElement.className = 'block-dialog-reason-option block-dialog-check';
                labelElement.setAttribute('role', 'checkbox');
                labelElement.dataset.value = String(index);
                setBlockCheckOptionChecked(labelElement, true);
                const checkBox = document.createElement('span');
                checkBox.className = 'block-dialog-check-box';
                checkBox.setAttribute('aria-hidden', 'true');
                const labelText = document.createElement('span');
                labelText.className = 'block-dialog-reason-label';
                labelText.textContent = label;
                const valueText = document.createElement('span');
                valueText.className = 'block-dialog-reason-value';
                valueText.textContent = value;
                labelElement.appendChild(checkBox);
                labelElement.appendChild(labelText);
                labelElement.appendChild(valueText);
                labelElement.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleBlockCheckOption(labelElement);
                });
                item.appendChild(labelElement);
                reasonList.appendChild(item);
            });

            if (reasonLabelTexts.length > 0) {
                const longest = Math.max(...reasonLabelTexts.map((text) => text.length));
                dialog.style.setProperty('--block-dialog-reason-label-width', `${Math.max(3, longest + 0.5)}em`);
            }

            const getSelectedReasons = () => Array.from(reasonList.querySelectorAll('.block-dialog-check[aria-checked="true"]'))
                .map((optionElement) => {
                    const index = Number.parseInt(optionElement.dataset.value || '', 10);
                    return Number.isNaN(index) ? null : normalizedReasons[index];
                })
                .filter(Boolean);

            const actions = document.createElement('div');
            actions.className = 'block-dialog-actions';
            const confirmButton = document.createElement('button');
            confirmButton.type = 'button';
            confirmButton.className = 'block-dialog-confirm';
            confirmButton.textContent = '选好了';
            confirmButton.addEventListener('click', () => {
                if (document.getElementById(BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID)) return;

                const selectedReasons = getSelectedReasons();
                if (selectedReasons.length === 0) {
                    notifier.show('请选择要取消的屏蔽规则', 'info');
                    return;
                }

                const subOverlay = document.createElement('div');
                subOverlay.id = BLOCK_ACTION_SUB_DIALOG_OVERLAY_ID;
                subOverlay.addEventListener('click', (event) => {
                    event.stopPropagation();
                    closeBlockedItemSubDialog();
                });
                overlay.classList.add('has-sub-dialog');

                const subDialog = document.createElement('div');
                subDialog.id = BLOCK_ACTION_SUB_DIALOG_ID;
                subDialog.className = 'block-action-dialog';
                subDialog.setAttribute('role', 'dialog');
                subDialog.setAttribute('aria-modal', 'true');
                subDialog.addEventListener('click', (event) => {
                    event.stopPropagation();
                });

                const subTitle = document.createElement('h3');
                subTitle.textContent = '确认取消屏蔽';
                const subReasonList = document.createElement('ul');
                subReasonList.className = 'block-dialog-reasons';

                const subReasonLabelTexts = [];
                selectedReasons.forEach((reason) => {
                    const { label, value } = getBlockReasonLabelValue(reason, profileLabels);
                    subReasonLabelTexts.push(label);
                    const item = document.createElement('li');
                    const line = document.createElement('div');
                    line.className = 'block-dialog-reason-line';
                    const labelText = document.createElement('span');
                    labelText.className = 'block-dialog-reason-label';
                    labelText.textContent = label;
                    const valueText = document.createElement('span');
                    valueText.className = 'block-dialog-reason-value';
                    valueText.textContent = value;
                    line.appendChild(labelText);
                    line.appendChild(valueText);
                    item.appendChild(line);
                    subReasonList.appendChild(item);
                });

                if (subReasonLabelTexts.length > 0) {
                    const longest = Math.max(...subReasonLabelTexts.map((text) => text.length));
                    subDialog.style.setProperty('--block-dialog-reason-label-width', `${Math.max(3, longest + 0.5)}em`);
                }

                const subActions = document.createElement('div');
                subActions.className = 'block-dialog-actions';
                const subConfirmButton = document.createElement('button');
                subConfirmButton.type = 'button';
                subConfirmButton.className = 'block-dialog-confirm';
                subConfirmButton.textContent = '确认取消屏蔽';
                subConfirmButton.addEventListener('click', () => {
                    applyUnblockFromReasons(selectedReasons);
                    closeBlockedItemDialog();
                });

                const subCancelButton = document.createElement('button');
                subCancelButton.type = 'button';
                subCancelButton.className = 'block-dialog-cancel';
                subCancelButton.textContent = '取消';
                subCancelButton.addEventListener('click', () => closeBlockedItemSubDialog());

                subActions.appendChild(subConfirmButton);
                subActions.appendChild(subCancelButton);
                subDialog.appendChild(subTitle);
                subDialog.appendChild(subReasonList);
                subDialog.appendChild(subActions);
                subOverlay.appendChild(subDialog);
                overlay.appendChild(subOverlay);
                subConfirmButton.focus();
            });

            const updateConfirmButtonState = () => {
                confirmButton.disabled = getSelectedReasons().length === 0;
            };
            reasonList.addEventListener('block-option-change', updateConfirmButtonState);
            updateConfirmButtonState();

            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.className = 'block-dialog-cancel';
            cancelButton.textContent = '取消';
            cancelButton.addEventListener('click', () => closeBlockedItemDialog());

            actions.appendChild(confirmButton);
            actions.appendChild(cancelButton);
            dialog.appendChild(title);
            dialog.appendChild(divider);
            dialog.appendChild(summary);
            dialog.appendChild(reasonList);
            dialog.appendChild(actions);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            bindEscapeToDialogClose();
            confirmButton.focus();
        }

        return {
            showBlockedItemDialog
        };
    }

    function createBlockDialogs({
        runtime,
        notifier,
        profileLabels,
        getLabel,
        getDialogLabel,
        ensureBlockActionStyles,
        getTopicTitleFromItem,
        getCategoryTextFromItem,
        getTagListFromItem,
        applyBlockTarget,
        applyUnblockFromReasons
    }) {
        const shell = createBlockDialogShell({ runtime });
        const confirmDialog = createBlockConfirmDialog({
            notifier,
            shell,
            getLabel,
            getDialogLabel,
            ensureBlockActionStyles,
            getTopicTitleFromItem,
            getCategoryTextFromItem,
            getTagListFromItem,
            applyBlockTarget
        });
        const unblockDialog = createBlockUnblockDialog({
            notifier,
            shell,
            profileLabels,
            ensureBlockActionStyles,
            applyUnblockFromReasons
        });

        return {
            closeBlockedItemDialog: shell.closeBlockedItemDialog,
            showBlockConfirmDialog: confirmDialog.showBlockConfirmDialog,
            showBlockedItemDialog: unblockDialog.showBlockedItemDialog
        };
    }

    function createBlockToggleController({ runtime, onFilterRequested }) {
        function ensureBlockToggleUI() {
            let wrapper = document.getElementById(BLOCK_TOGGLE_WRAPPER_ID);
            if (wrapper) return wrapper;

            ensureStyle(BLOCK_TOGGLE_STYLE_ID, BLOCK_TOGGLE_CSS);

            wrapper = document.createElement('div');
            wrapper.id = BLOCK_TOGGLE_WRAPPER_ID;
            wrapper.innerHTML = `
            <button id="${BLOCK_TOGGLE_BUTTON_ID}" class="block-toggle-button" type="button" aria-pressed="false" title="显示被屏蔽结果">
                <svg class="block-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
                    <path d="M7.5 7.5l9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
                <span id="${BLOCK_TOGGLE_COUNT_ID}" class="block-toggle-count">0</span>
            </button>
        `;
            document.body.appendChild(wrapper);

            const button = wrapper.querySelector(`#${BLOCK_TOGGLE_BUTTON_ID}`);
            if (button) {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    runtime.revealBlockedResults = !runtime.revealBlockedResults;
                    onFilterRequested();
                });
            }

            return wrapper;
        }

        function updateBlockToggleUI(blockedCount) {
            const wrapper = ensureBlockToggleUI();
            if (!wrapper) return;

            const safeCount = Number.isFinite(blockedCount) ? blockedCount : 0;
            const button = wrapper.querySelector(`#${BLOCK_TOGGLE_BUTTON_ID}`);
            const countElement = wrapper.querySelector(`#${BLOCK_TOGGLE_COUNT_ID}`);

            if (countElement) {
                countElement.textContent = String(safeCount);
            }

            if (button) {
                button.classList.toggle('is-revealed', runtime.revealBlockedResults);
                button.setAttribute('aria-pressed', runtime.revealBlockedResults ? 'true' : 'false');
                button.setAttribute('title', runtime.revealBlockedResults ? '恢复隐藏屏蔽结果' : '显示被屏蔽结果');
            }
        }

        return {
            updateBlockToggleUI
        };
    }

    function createBlockControlsFeature({ store, runtime, notifier, profile, isSearchPage, getCurrentSearchTerm }) {
        const callbacks = {
            onFilterRequested: () => {},
            onSettingsChanged: () => {}
        };

        const profileLabels = profile?.labels || {};
        const getLabel = (key, fallback) => profileLabels[key] || fallback;
        const getDialogLabel = (key, fallback) => `${getLabel(key, fallback)}：`;

        function setCallbacks(nextCallbacks = {}) {
            if (typeof nextCallbacks.onFilterRequested === 'function') {
                callbacks.onFilterRequested = nextCallbacks.onFilterRequested;
            }
            if (typeof nextCallbacks.onSettingsChanged === 'function') {
                callbacks.onSettingsChanged = nextCallbacks.onSettingsChanged;
            }
        }

        function ensureBlockActionStyles() {
            ensureStyle(BLOCK_ACTION_STYLE_ID, BLOCK_ACTION_CSS);
        }

        function setBlockReasons(element, reasons) {
            if (!element) return;
            if (Array.isArray(reasons) && reasons.length > 0) {
                element.dataset[BLOCK_ACTION_REASON_DATA] = JSON.stringify(reasons);
            } else {
                delete element.dataset[BLOCK_ACTION_REASON_DATA];
            }
        }

        function getBlockReasonsFromElement(element) {
            if (!element) return [];
            const raw = element.dataset[BLOCK_ACTION_REASON_DATA];
            if (!raw) return [];

            try {
                const parsed = JSON.parse(raw);
                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                console.warn('解析屏蔽原因失败:', error);
                return [];
            }
        }

        function getBlockActionHost(item) {
            if (!item) return null;
            if (typeof profile?.getBlockActionHost === 'function') {
                return profile.getBlockActionHost(item);
            }
            if (item.tagName === 'TR') {
                return item.querySelector('td.main-link') || item.querySelector('td') || null;
            }
            return item;
        }

        function getItemData(item) {
            if (typeof profile?.getItemData === 'function') {
                return profile.getItemData(item);
            }
            return {
                titleText: '',
                categoryText: '',
                tagList: []
            };
        }

        function getTopicTitleFromItem(item) {
            if (!item) return '';
            const itemData = getItemData(item);
            if (itemData.titleText) return itemData.titleText;
            const titleElement = item.querySelector('a.title, a.topic-title, .topic-title, a.raw-topic-link');
            if (!titleElement) return '';
            return (titleElement.getAttribute('title') || titleElement.textContent || '').trim();
        }

        function getCategoryTextFromItem(item) {
            if (!item) return '';
            const itemData = getItemData(item);
            if (itemData.categoryText) return itemData.categoryText;
            const categoryElement = item.querySelector(
                'div.link-bottom-line a.badge-category__wrapper span.badge-category__name, a.badge-category__wrapper span.badge-category__name, span.badge-category__name'
            );
            return categoryElement?.textContent?.trim() || '';
        }

        function getTagListFromItem(item) {
            if (!item) return [];
            const itemData = getItemData(item);
            if (Array.isArray(itemData.tagList) && itemData.tagList.length > 0) {
                return itemData.tagList;
            }

            const tagNodes = item.querySelectorAll('.discourse-tags a, a.discourse-tag, .tag-name');
            const tags = [];
            const seen = new Set();

            tagNodes.forEach((node) => {
                const tagText = (node.getAttribute('data-tag-name') || node.textContent || '').trim();
                if (tagText && !seen.has(tagText)) {
                    seen.add(tagText);
                    tags.push(tagText);
                }
            });

            return tags;
        }

        function getTagTextFromItem(item) {
            return getTagListFromItem(item)[0] || '';
        }

        function getBlockTargetForItem(item) {
            if (!item) return null;

            const isSearchContext = Boolean(
                item.classList?.contains('fps-result') ||
                (typeof isSearchPage === 'function' && isSearchPage())
            );

            if (isSearchContext) {
                const titleText = getTopicTitleFromItem(item);
                if (!titleText) {
                    const tagText = getTagTextFromItem(item);
                    if (tagText) return { kind: 'tag_keyword', value: tagText };
                    return null;
                }

                const searchTerm = getCurrentSearchTerm();
                if (!searchTerm) return null;
                return { kind: 'search_blacklist', value: titleText, searchTerm };
            }

            const titleText = getTopicTitleFromItem(item);
            if (titleText) return { kind: 'title_keyword', value: titleText };

            const categoryText = getCategoryTextFromItem(item);
            if (categoryText) return { kind: 'category_keyword', value: categoryText };

            const tagText = getTagTextFromItem(item);
            if (tagText) return { kind: 'tag_keyword', value: tagText };

            return null;
        }

        function notifySettingsChanged() {
            callbacks.onSettingsChanged();
        }

        function applyBlockTarget(target) {
            if (!target || !target.kind) return false;

            const value = typeof target.value === 'string' ? target.value.trim() : '';
            if (!value) return false;

            let changed = false;
            store.mutate((draft) => {
                switch (target.kind) {
                    case 'title_keyword': {
                        const lowerValue = value.toLowerCase();
                        const exists = draft.blockedTitles.some((item) => String(item).toLowerCase() === lowerValue);
                        if (!exists) {
                            draft.blockedTitles.push(value);
                            changed = true;
                        }
                        break;
                    }
                    case 'category_keyword':
                        if (!draft.blockedCategories.includes(value)) {
                            draft.blockedCategories.push(value);
                            changed = true;
                        }
                        break;
                    case 'tag_keyword':
                        if (!draft.blockedTags.includes(value)) {
                            draft.blockedTags.push(value);
                            changed = true;
                        }
                        break;
                    case 'search_blacklist': {
                        const searchTerm = typeof target.searchTerm === 'string' ? target.searchTerm.trim() : getCurrentSearchTerm();
                        if (!searchTerm) break;
                        const current = draft.searchFilterMap[searchTerm] || { blacklist: '', whitelist: '', regex: '' };
                        const blacklistArray = current.blacklist
                            ? current.blacklist.split(',').map((item) => item.trim()).filter(Boolean)
                            : [];
                        const lowerSet = new Set(blacklistArray.map((item) => item.toLowerCase()));
                        if (!lowerSet.has(value.toLowerCase())) {
                            blacklistArray.push(value);
                            draft.searchFilterMap[searchTerm] = {
                                blacklist: blacklistArray.join(', '),
                                whitelist: current.whitelist || '',
                                regex: current.regex || ''
                            };
                            changed = true;
                        }
                        break;
                    }
                    default:
                        break;
                }
            });

            if (changed) {
                notifySettingsChanged();
            }

            return changed;
        }

        function applyUnblockFromReasons(reasons) {
            const reasonList = Array.isArray(reasons) ? reasons : [];
            if (reasonList.length === 0) return false;

            const removeTitleKeywords = new Set();
            const removeCategoryKeywords = new Set();
            const removeTagKeywords = new Set();
            const removeTitleRegex = new Set();
            const removeCategoryRegex = new Set();
            const removeTagRegex = new Set();
            const removeSearchBlacklist = new Set();
            const removeSearchRegex = new Set();
            let clearSearchWhitelist = false;

            reasonList.forEach((reason) => {
                if (!reason || !reason.kind) return;
                switch (reason.kind) {
                    case 'title_keyword':
                        if (reason.value) removeTitleKeywords.add(reason.value);
                        break;
                    case 'category_keyword':
                        if (reason.value) removeCategoryKeywords.add(reason.value);
                        break;
                    case 'tag_keyword':
                        if (reason.value) removeTagKeywords.add(reason.value);
                        break;
                    case 'title_regex':
                        if (reason.pattern) removeTitleRegex.add(reason.pattern);
                        break;
                    case 'category_regex':
                        if (reason.pattern) removeCategoryRegex.add(reason.pattern);
                        break;
                    case 'tag_regex':
                        if (reason.pattern) removeTagRegex.add(reason.pattern);
                        break;
                    case 'search_blacklist':
                        if (reason.value) removeSearchBlacklist.add(reason.value);
                        break;
                    case 'search_regex':
                        if (reason.pattern) removeSearchRegex.add(reason.pattern);
                        break;
                    case 'search_whitelist_missing':
                        clearSearchWhitelist = true;
                        break;
                    default:
                        break;
                }
            });

            let changed = false;
            store.mutate((draft) => {
                if (removeTitleKeywords.size > 0) {
                    const lowerSet = new Set(Array.from(removeTitleKeywords).map((item) => item.toLowerCase()));
                    const nextTitles = draft.blockedTitles.filter((item) => !lowerSet.has(String(item).toLowerCase()));
                    if (nextTitles.length !== draft.blockedTitles.length) {
                        draft.blockedTitles = nextTitles;
                        changed = true;
                    }
                }

                if (removeCategoryKeywords.size > 0) {
                    const nextCategories = draft.blockedCategories.filter((item) => !removeCategoryKeywords.has(item));
                    if (nextCategories.length !== draft.blockedCategories.length) {
                        draft.blockedCategories = nextCategories;
                        changed = true;
                    }
                }

                if (removeTagKeywords.size > 0) {
                    const nextTags = draft.blockedTags.filter((item) => !removeTagKeywords.has(item));
                    if (nextTags.length !== draft.blockedTags.length) {
                        draft.blockedTags = nextTags;
                        changed = true;
                    }
                }

                if (removeTitleRegex.size > 0) {
                    const nextEntries = draft.titleRegexList.filter((entry) => !removeTitleRegex.has(entry.pattern));
                    if (nextEntries.length !== draft.titleRegexList.length) {
                        draft.titleRegexList = nextEntries;
                        changed = true;
                    }
                }

                if (removeCategoryRegex.size > 0) {
                    const nextEntries = draft.categoryRegexList.filter((entry) => !removeCategoryRegex.has(entry.pattern));
                    if (nextEntries.length !== draft.categoryRegexList.length) {
                        draft.categoryRegexList = nextEntries;
                        changed = true;
                    }
                }

                if (removeTagRegex.size > 0) {
                    const nextEntries = draft.tagRegexList.filter((entry) => !removeTagRegex.has(entry.pattern));
                    if (nextEntries.length !== draft.tagRegexList.length) {
                        draft.tagRegexList = nextEntries;
                        changed = true;
                    }
                }

                if (removeSearchBlacklist.size > 0 || removeSearchRegex.size > 0 || clearSearchWhitelist) {
                    const searchTerm = getCurrentSearchTerm();
                    if (searchTerm) {
                        const current = draft.searchFilterMap[searchTerm] || { blacklist: '', whitelist: '', regex: '' };
                        const originalBlacklistArray = current.blacklist
                            ? current.blacklist.split(',').map((item) => item.trim()).filter(Boolean)
                            : [];
                        const originalRegexArray = current.regex
                            ? current.regex.split('\n').map((item) => item.trim()).filter(Boolean)
                            : [];

                        const blacklistLowerSet = new Set(Array.from(removeSearchBlacklist).map((item) => item.toLowerCase()));
                        const nextBlacklistArray = originalBlacklistArray.filter((item) => !blacklistLowerSet.has(item.toLowerCase()));
                        const regexSet = new Set(removeSearchRegex);
                        const nextRegexArray = originalRegexArray.filter((pattern) => !regexSet.has(pattern));
                        const nextWhitelist = clearSearchWhitelist ? '' : (current.whitelist || '').trim();
                        const nextRule = {
                            blacklist: nextBlacklistArray.join(', '),
                            whitelist: nextWhitelist,
                            regex: nextRegexArray.join('\n')
                        };

                        if (
                            nextRule.blacklist !== current.blacklist ||
                            nextRule.regex !== current.regex ||
                            nextRule.whitelist !== (current.whitelist || '').trim()
                        ) {
                            draft.searchFilterMap[searchTerm] = nextRule;
                            changed = true;
                        }
                    }
                }
            });

            if (changed) {
                notifySettingsChanged();
            }

            return changed;
        }

        function isRevealBlockedResults() {
            return runtime.revealBlockedResults;
        }

        const blockToggle = createBlockToggleController({
            runtime,
            onFilterRequested: () => callbacks.onFilterRequested()
        });

        const blockDialogs = createBlockDialogs({
            runtime,
            notifier,
            profileLabels,
            getLabel,
            getDialogLabel,
            ensureBlockActionStyles,
            getTopicTitleFromItem,
            getCategoryTextFromItem,
            getTagListFromItem,
            applyBlockTarget,
            applyUnblockFromReasons
        });

        const blockActionButton = createBlockActionButtonController({
            runtime,
            store,
            profile,
            ensureBlockActionStyles,
            getBlockActionHost,
            getBlockReasonsFromElement,
            getBlockTargetForItem,
            showBlockedItemDialog: blockDialogs.showBlockedItemDialog,
            showBlockConfirmDialog: blockDialogs.showBlockConfirmDialog
        });

        return {
            setCallbacks,
            ensureBlockActionButton: blockActionButton.ensureBlockActionButton,
            updateBlockToggleUI: blockToggle.updateBlockToggleUI,
            setBlockReasons,
            getBlockReasonsFromElement,
            hideBlockActionButton: blockActionButton.hideBlockActionButton,
            hideFloatingButtonIfItemMatches: blockActionButton.hideFloatingButtonIfItemMatches,
            isRevealBlockedResults,
            closeBlockedItemDialog: blockDialogs.closeBlockedItemDialog
        };
    }

    function formatSearchFilterDisplayValue(value) {
        return (value || '').replace(/\n/g, ' ');
    }

    function adjustTextareaHeight(textarea) {
        if (!textarea) return;
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const minHeight = 28;
        const maxHeight = 150;
        const height = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${height}px`;
        textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }

    function setupTextareaScrollHandling(textarea) {
        if (!textarea) return;

        textarea.addEventListener('wheel', (event) => {
            const { scrollTop, scrollHeight, clientHeight } = textarea;
            const isScrollingUp = event.deltaY < 0;
            const isScrollingDown = event.deltaY > 0;
            const canScrollUp = scrollTop > 0;
            const canScrollDown = scrollTop < scrollHeight - clientHeight;

            if ((isScrollingUp && canScrollUp) || (isScrollingDown && canScrollDown)) {
                event.stopPropagation();
            }
        }, { passive: false });

        textarea.addEventListener('keydown', (event) => {
            if (
                event.key === 'ArrowUp' ||
                event.key === 'ArrowDown' ||
                event.key === 'PageUp' ||
                event.key === 'PageDown' ||
                event.key === 'Home' ||
                event.key === 'End'
            ) {
                event.stopPropagation();
            }
        });

        textarea.addEventListener('focus', () => {
            if (textarea.scrollHeight > textarea.clientHeight) {
                textarea.style.overflowY = 'auto';
            }
        });
    }

    function appendCommaToTextareaIfNeeded$1(textarea, { force = false, appendText = ',' } = {}) {
        if (!textarea) return false;
        const value = typeof textarea.value === 'string' ? textarea.value : '';
        if (!value.trim()) return false;

        const trimmedValue = value.trimEnd();
        if (trimmedValue.endsWith(',')) return false;

        if (!force && typeof textarea.selectionStart === 'number' && typeof textarea.selectionEnd === 'number') {
            const isCollapsed = textarea.selectionStart === textarea.selectionEnd;
            const isAtEnd = textarea.selectionEnd === value.length;
            if (!isCollapsed || !isAtEnd) return false;
        }

        textarea.value = trimmedValue + appendText;
        const length = textarea.value.length;
        if (typeof textarea.setSelectionRange === 'function') {
            textarea.setSelectionRange(length, length);
        }
        textarea.scrollTop = textarea.scrollHeight;
        return true;
    }

    function getSearchFilterWrapper() {
        return document.getElementById(SEARCH_FILTER_WRAPPER_ID);
    }

    function getSearchFilterFieldElements(wrapper = getSearchFilterWrapper()) {
        if (!wrapper) {
            return {
                blacklistDisplay: null,
                blacklistInput: null,
                whitelistDisplay: null,
                whitelistInput: null,
                regexDisplay: null,
                regexInput: null
            };
        }

        return {
            blacklistDisplay: wrapper.querySelector(`#${SEARCH_FILTER_BLACKLIST_DISPLAY_ID}`),
            blacklistInput: wrapper.querySelector(`#${SEARCH_FILTER_BLACKLIST_INPUT_ID}`),
            whitelistDisplay: wrapper.querySelector(`#${SEARCH_FILTER_WHITELIST_DISPLAY_ID}`),
            whitelistInput: wrapper.querySelector(`#${SEARCH_FILTER_WHITELIST_INPUT_ID}`),
            regexDisplay: wrapper.querySelector(`#${SEARCH_FILTER_REGEX_DISPLAY_ID}`),
            regexInput: wrapper.querySelector(`#${SEARCH_FILTER_REGEX_INPUT_ID}`)
        };
    }

    function getSearchFilterRuleValues(wrapper = getSearchFilterWrapper()) {
        const {
            blacklistInput,
            whitelistInput,
            regexInput
        } = getSearchFilterFieldElements(wrapper);

        return {
            blacklist: blacklistInput?.value || '',
            whitelist: whitelistInput?.value || '',
            regex: regexInput?.value || ''
        };
    }

    function createSearchFilterWrapper(savedKeywords) {
        const blacklistPlaceholder = '屏蔽关键词,用逗号分隔';
        const whitelistPlaceholder = '必须包含关键词,用逗号分隔';
        const regexPlaceholder = '正则表达式,每行一个';

        const wrapper = document.createElement('div');
        wrapper.id = SEARCH_FILTER_WRAPPER_ID;
        wrapper.innerHTML = `
        <button class="filter-fab" type="button" aria-label="搜索过滤器">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
                <path d="M7.5 7.5l9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </svg>
        </button>
        <div class="filter-inputs-container">
            <div class="filter-input-group">
                <label class="filter-label" for="${SEARCH_FILTER_BLACKLIST_INPUT_ID}" title="点击编辑黑名单">屏蔽：</label>
                <div id="${SEARCH_FILTER_BLACKLIST_DISPLAY_ID}" class="filter-display" data-placeholder="${blacklistPlaceholder}" tabindex="0" title="点击编辑黑名单">${formatSearchFilterDisplayValue(savedKeywords.blacklist || '')}</div>
                <textarea id="${SEARCH_FILTER_BLACKLIST_INPUT_ID}" class="filter-input" placeholder="${blacklistPlaceholder}">${savedKeywords.blacklist || ''}</textarea>
            </div>
            <div class="filter-input-group">
                <label class="filter-label" for="${SEARCH_FILTER_WHITELIST_INPUT_ID}" title="点击编辑白名单">必含：</label>
                <div id="${SEARCH_FILTER_WHITELIST_DISPLAY_ID}" class="filter-display" data-placeholder="${whitelistPlaceholder}" tabindex="0" title="点击编辑白名单">${formatSearchFilterDisplayValue(savedKeywords.whitelist || '')}</div>
                <textarea id="${SEARCH_FILTER_WHITELIST_INPUT_ID}" class="filter-input" placeholder="${whitelistPlaceholder}">${savedKeywords.whitelist || ''}</textarea>
            </div>
            <div class="filter-input-group regex-group">
                <label class="filter-label" for="${SEARCH_FILTER_REGEX_INPUT_ID}" title="点击编辑正则表达式">正则：</label>
                <div id="${SEARCH_FILTER_REGEX_DISPLAY_ID}" class="filter-display" data-placeholder="${regexPlaceholder}" tabindex="0" title="点击编辑正则表达式">${formatSearchFilterDisplayValue(savedKeywords.regex || '')}</div>
                <textarea id="${SEARCH_FILTER_REGEX_INPUT_ID}" class="filter-input" placeholder="${regexPlaceholder}">${savedKeywords.regex || ''}</textarea>
            </div>
        </div>
    `;

        return wrapper;
    }

    function setupSearchFilterToggle(wrapper) {
        const fab = wrapper.querySelector('.filter-fab');
        if (!fab) return;

        const closePanel = () => {
            wrapper.classList.remove('filter-open');
        };

        fab.addEventListener('click', (event) => {
            event.preventDefault();
            wrapper.classList.toggle('filter-open');
            if (wrapper.classList.contains('filter-open')) {
                const firstDisplay = wrapper.querySelector('.filter-display');
                if (firstDisplay) firstDisplay.focus();
            }
        });

        const onDocumentMouseDown = (event) => {
            if (!wrapper.contains(event.target)) {
                closePanel();
            }
        };

        const onDocumentKeyDown = (event) => {
            if (event.key === 'Escape') {
                closePanel();
            }
        };

        document.addEventListener('mousedown', onDocumentMouseDown);
        document.addEventListener('keydown', onDocumentKeyDown);

        wrapper._linuxdoSearchFilterCleanup = () => {
            document.removeEventListener('mousedown', onDocumentMouseDown);
            document.removeEventListener('keydown', onDocumentKeyDown);
        };
    }

    function createSearchFilterEditManagers({
        wrapper,
        runtime,
        getCurrentSearchTerm,
        saveCurrentSearchFilterRule,
        clearEditingTermIfIdle
    }) {
        const blacklistLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_BLACKLIST_INPUT_ID}"]`);
        const whitelistLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_WHITELIST_INPUT_ID}"]`);
        const regexLabel = wrapper.querySelector(`label[for="${SEARCH_FILTER_REGEX_INPUT_ID}"]`);
        const {
            blacklistDisplay,
            blacklistInput,
            whitelistDisplay,
            whitelistInput,
            regexDisplay,
            regexInput
        } = getSearchFilterFieldElements(wrapper);

        setupTextareaScrollHandling(blacklistInput);
        setupTextareaScrollHandling(whitelistInput);
        setupTextareaScrollHandling(regexInput);

        const createEditModeManager = (label, display, input, { autoAppendComma = false } = {}) => {
            if (!label || !display || !input) return null;

            let initialValue = input.value;

            function isEditing() {
                return input.style.display === 'block';
            }

            function enterEditMode(clickType = 'default') {
                if (isEditing()) return;

                initialValue = input.value;
                runtime.searchFilterEditingTerm = runtime.searchFilterEditingTerm || runtime.lastSyncedSearchTerm || getCurrentSearchTerm();
                display.style.display = 'none';
                input.style.display = 'block';

                setTimeout(() => {
                    if (!isEditing()) return;

                    adjustTextareaHeight(input);
                    input.focus();

                    const length = input.value.length;
                    if (typeof input.setSelectionRange === 'function') {
                        input.setSelectionRange(length, length);
                    }

                    if (clickType === 'leftClick') {
                        if (autoAppendComma) {
                            const appended = appendCommaToTextareaIfNeeded$1(input, { force: true });
                            if (appended) adjustTextareaHeight(input);
                        }
                        input.scrollTop = input.scrollHeight;
                    }
                }, 0);
            }

            function exitEditMode(saveToDisplay = true) {
                if (!isEditing()) return;

                input.style.display = 'none';
                if (saveToDisplay) {
                    const value = input.value.trim().replace(/\n/g, ' ');
                    display.textContent = value;
                    display.title = input.value.trim();
                    if (input.value !== initialValue) {
                        saveCurrentSearchFilterRule();
                    }
                }
                display.style.display = 'block';
                clearEditingTermIfIdle();
            }

            label.addEventListener('mousedown', (event) => {
                if (event.button !== 0) return;
                event.preventDefault();
                enterEditMode('leftClick');
            });

            display.addEventListener('mousedown', (event) => {
                if (event.button !== 0) return;
                event.preventDefault();
                enterEditMode('leftClick');
            });

            label.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                enterEditMode('rightClick');
            });

            display.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                enterEditMode('rightClick');
            });

            display.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    enterEditMode('keyboard');
                }
            });

            input.addEventListener('blur', () => {
                setTimeout(() => {
                    exitEditMode(true);
                }, 100);
            });

            input.addEventListener('input', () => {
                adjustTextareaHeight(input);
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                    event.preventDefault();
                    exitEditMode(true);
                }
            });

            return {
                isEditing,
                exitEditMode
            };
        };

        return [
            createEditModeManager(blacklistLabel, blacklistDisplay, blacklistInput, { autoAppendComma: true }),
            createEditModeManager(whitelistLabel, whitelistDisplay, whitelistInput, { autoAppendComma: true }),
            createEditModeManager(regexLabel, regexDisplay, regexInput)
        ].filter(Boolean);
    }

    const SEARCH_FILTER_CSS = `
    #${SEARCH_FILTER_WRAPPER_ID} {
      --linuxdo-filter-bg-color: #ffffff;
      --linuxdo-filter-font-color: #1f1f1f;
      --linuxdo-filter-border-color: rgba(0,0,0,.12);
      --linuxdo-filter-placeholder-color: rgba(0,0,0,0.4);
      --linuxdo-filter-label-hover-color: #333333;
      --linuxdo-filter-focus-bg-color: #faf9e4;
      --linuxdo-filter-fab-size: 42px;
      --linuxdo-filter-fab-icon-color: #d32f2f;
      --linuxdo-filter-fab-icon-size: 28px;
      position: fixed !important;
      top: 193px !important;
      right: 16px !important;
      z-index: 900 !important;
      pointer-events: auto !important;
      width: var(--linuxdo-filter-fab-size);
      height: var(--linuxdo-filter-fab-size);
      display: block;
      padding: 0;
      box-sizing: border-box;
      overflow: visible;
    }
    @media (prefers-color-scheme: dark) {
      #${SEARCH_FILTER_WRAPPER_ID} {
        --linuxdo-filter-bg-color: #333333;
        --linuxdo-filter-font-color: #ffffff;
        --linuxdo-filter-border-color: rgba(255,255,255,0.12);
        --linuxdo-filter-placeholder-color: rgba(255,255,255,0.4);
        --linuxdo-filter-label-hover-color: #ffe60f;
        --linuxdo-filter-focus-bg-color: #444444;
        --linuxdo-filter-fab-icon-color: #ff6b6b;
      }
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-fab {
        width: var(--linuxdo-filter-fab-size);
        height: var(--linuxdo-filter-fab-size);
        border-radius: 999px;
        border: none;
        background: transparent;
        color: var(--linuxdo-filter-fab-icon-color);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        line-height: 1;
        cursor: pointer;
        user-select: none;
        padding: 0;
        appearance: none;
        -webkit-appearance: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-fab svg {
        width: var(--linuxdo-filter-fab-icon-size);
        height: var(--linuxdo-filter-fab-icon-size);
        display: block;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-fab:focus-visible {
        outline: 2px solid rgba(255,230,15,0.6);
        outline-offset: 2px;
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-fab {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.9);
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display:empty::before {
        content: attr(data-placeholder);
        pointer-events: none;
        color: var(--linuxdo-filter-placeholder-color);
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-label {
        color: var(--linuxdo-filter-font-color);
        font-size: 13px;
        line-height: 28px;
        margin-right: 4px;
        cursor: pointer;
        user-select: none;
        transition: color 0.16s;
        flex-shrink: 0;
        font-weight: 500;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-label:hover {
        color: var(--linuxdo-filter-label-hover-color);
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display,
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
        border: 1px solid var(--linuxdo-filter-border-color);
        border-radius: 6px;
        box-sizing: border-box;
        font-size: 13px;
        font-family: inherit;
        color: var(--linuxdo-filter-font-color);
        padding: 6px 8px;
        width: 180px;
        background-color: var(--linuxdo-filter-bg-color);
        box-shadow: 0 2px 6px rgba(0,0,0,0.09);
        transition: background 0.16s, color 0.16s, border 0.16s;
        line-height: 1.3;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display {
        height: 28px;
        min-height: 28px;
        max-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        outline: none;
        cursor: text;
        user-select: text;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-display:focus-visible,
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input:focus {
        border-color: #ffe60f !important;
        background: var(--linuxdo-filter-focus-bg-color);
        outline: none;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
        display: none;
        min-height: 28px;
        max-height: 150px;
        height: 28px;
        vertical-align: top;
        outline: none;
        resize: none;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-all;
        scrollbar-width: thin;
        scrollbar-color: rgba(0,0,0,0.3) transparent;
    }
    @media (prefers-color-scheme: dark) {
      #${SEARCH_FILTER_WRAPPER_ID} .filter-input {
        scrollbar-color: rgba(255,255,255,0.4) transparent;
      }
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group {
        display: flex;
        align-items: flex-start;
        gap: 2px;
        margin-bottom: 4px;
        opacity: 0.2;
        transition: opacity 0.2s ease;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-input-group:last-child {
        margin-bottom: 0;
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-input-group {
        opacity: 1;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        visibility: hidden;
        transform: translateX(8px) scale(0.98);
        transform-origin: top right;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s 0.2s;
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-inputs-container {
        opacity: 1;
        visibility: visible;
        transform: translateX(0) scale(1);
        pointer-events: auto;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s;
    }
    #${SEARCH_FILTER_WRAPPER_ID} .filter-inputs-container::before {
        content: '';
        position: absolute;
        top: -6px;
        left: -8px;
        right: -8px;
        bottom: -6px;
        background-color: var(--linuxdo-filter-bg-color);
        border-radius: 10px;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: -1;
        box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        border: 1px solid var(--linuxdo-filter-border-color);
    }
    #${SEARCH_FILTER_WRAPPER_ID}.filter-open .filter-inputs-container::before {
        opacity: 1;
    }
`;

    function resolveSearchFilterSaveContext({
        explicitSearchTerm = '',
        editingSearchTerm = '',
        currentSearchTerm = ''
    } = {}) {
        const normalizedExplicitSearchTerm = String(explicitSearchTerm || '').trim();
        const normalizedEditingSearchTerm = String(editingSearchTerm || '').trim();
        const normalizedCurrentSearchTerm = String(currentSearchTerm || '').trim();
        const searchTerm = normalizedExplicitSearchTerm || normalizedEditingSearchTerm || normalizedCurrentSearchTerm;

        return {
            searchTerm,
            shouldTriggerFilter: Boolean(searchTerm) && searchTerm === normalizedCurrentSearchTerm
        };
    }

    function createSearchFilterFeature({ store, runtime, page }) {
        let onFilterRequested = () => {};
        const editManagers = [];

        function setOnFilterRequested(callback) {
            onFilterRequested = typeof callback === 'function' ? callback : () => {};
        }

        function hasOpenEditors() {
            return editManagers.some((manager) => manager.isEditing());
        }

        function clearEditingTermIfIdle() {
            if (!hasOpenEditors()) {
                runtime.searchFilterEditingTerm = null;
            }
        }

        function persistSearchFilterRule(searchTerm, values, { triggerFilter = true } = {}) {
            const normalizedSearchTerm = String(searchTerm || '').trim();
            if (!normalizedSearchTerm) return false;

            store.setSearchFilterRule(normalizedSearchTerm, {
                blacklist: values?.blacklist || '',
                whitelist: values?.whitelist || '',
                regex: values?.regex || ''
            });
            runtime.lastSyncedSearchTerm = null;

            if (triggerFilter) {
                onFilterRequested();
            }

            return true;
        }

        function saveCurrentSearchFilterRule({ explicitSearchTerm = '' } = {}) {
            const wrapper = getSearchFilterWrapper();
            if (!wrapper) return false;

            const currentSearchTerm = getCurrentSearchTerm();
            const { searchTerm, shouldTriggerFilter } = resolveSearchFilterSaveContext({
                explicitSearchTerm,
                editingSearchTerm: runtime.searchFilterEditingTerm,
                currentSearchTerm
            });
            if (!searchTerm) return false;

            return persistSearchFilterRule(searchTerm, getSearchFilterRuleValues(wrapper), {
                triggerFilter: shouldTriggerFilter
            });
        }

        function closeAllEditModes({ save = false } = {}) {
            editManagers.forEach((manager) => {
                manager.exitEditMode(save);
            });
        }

        function syncSearchFilterUIForCurrentTerm() {
            const wrapper = getSearchFilterWrapper();
            if (!wrapper) return;

            const searchTerm = getCurrentSearchTerm();
            const uiSearchTerm = runtime.searchFilterEditingTerm || runtime.lastSyncedSearchTerm;
            if (uiSearchTerm && searchTerm === uiSearchTerm) return;

            if (hasOpenEditors()) {
                const pendingSearchTerm = runtime.searchFilterEditingTerm || runtime.lastSyncedSearchTerm;
                if (pendingSearchTerm && pendingSearchTerm !== searchTerm) {
                    saveCurrentSearchFilterRule({ explicitSearchTerm: pendingSearchTerm });
                }
                closeAllEditModes({ save: false });
            } else if (searchTerm === runtime.lastSyncedSearchTerm) {
                return;
            }

            const keywords = store.getSearchFilterRule(searchTerm);
            const {
                blacklistDisplay,
                blacklistInput,
                whitelistDisplay,
                whitelistInput,
                regexDisplay,
                regexInput
            } = getSearchFilterFieldElements(wrapper);

            if (blacklistDisplay) {
                blacklistDisplay.textContent = formatSearchFilterDisplayValue(keywords.blacklist || '');
                blacklistDisplay.title = keywords.blacklist || '';
            }
            if (blacklistInput) {
                blacklistInput.value = keywords.blacklist || '';
                adjustTextareaHeight(blacklistInput);
            }

            if (whitelistDisplay) {
                whitelistDisplay.textContent = formatSearchFilterDisplayValue(keywords.whitelist || '');
                whitelistDisplay.title = keywords.whitelist || '';
            }
            if (whitelistInput) {
                whitelistInput.value = keywords.whitelist || '';
                adjustTextareaHeight(whitelistInput);
            }

            if (regexDisplay) {
                regexDisplay.textContent = formatSearchFilterDisplayValue(keywords.regex || '');
                regexDisplay.title = keywords.regex || '';
            }
            if (regexInput) {
                regexInput.value = keywords.regex || '';
                adjustTextareaHeight(regexInput);
            }

            runtime.lastSyncedSearchTerm = searchTerm;
            runtime.searchFilterEditingTerm = null;
        }

        function setupSearchFilterUIInteractions(wrapper) {
            editManagers.length = 0;
            editManagers.push(...createSearchFilterEditManagers({
                wrapper,
                runtime,
                getCurrentSearchTerm,
                saveCurrentSearchFilterRule,
                clearEditingTermIfIdle
            }));
        }

        function ensureUI() {
            if (!page.isSearchPage()) return false;
            if (getSearchFilterWrapper()) return true;

            ensureStyle(SEARCH_FILTER_STYLE_ID, SEARCH_FILTER_CSS);

            const searchTerm = getCurrentSearchTerm();
            const savedKeywords = store.getSearchFilterRule(searchTerm);
            const wrapper = createSearchFilterWrapper(savedKeywords);

            document.body.appendChild(wrapper);
            setupSearchFilterUIInteractions(wrapper);
            setupSearchFilterToggle(wrapper);
            runtime.lastSyncedSearchTerm = null;
            syncSearchFilterUIForCurrentTerm();
            return true;
        }

        function removeUI() {
            const wrapper = getSearchFilterWrapper();
            if (wrapper && typeof wrapper._linuxdoSearchFilterCleanup === 'function') {
                wrapper._linuxdoSearchFilterCleanup();
            }
            closeAllEditModes({ save: false });
            if (wrapper) wrapper.remove();
            editManagers.length = 0;
            runtime.lastSyncedSearchTerm = null;
            runtime.searchFilterEditingTerm = null;
        }

        function invalidateSync() {
            runtime.lastSyncedSearchTerm = null;
        }

        return {
            ensureUI,
            removeUI,
            syncSearchFilterUIForCurrentTerm,
            invalidateSync,
            getCurrentSearchTerm,
            setOnFilterRequested
        };
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll('\'', '&#39;');
    }

    function buildSettingsDialogMarkup(settings, profile = {}) {
        const labels = profile.labels || {};
        const getLabel = (key, fallback) => labels[key] || fallback;
        const showSummaryToggle = profile.features?.summaryToggle !== false;

        return `
        <div class="settings-header">
            <h2>${escapeHtml(getLabel('settingsTitle', '⚙️ 屏蔽设置'))}</h2>
            <button id="closeDialog" type="button">&times;</button>
            <div class="settings-tabs">
                <div class="settings-tab active" data-tab="titles">${escapeHtml(getLabel('titleTab', '标题关键词'))}</div>
                <div class="settings-tab" data-tab="categories">${escapeHtml(getLabel('categoryTab', '类别'))}</div>
                <div class="settings-tab" data-tab="tags">${escapeHtml(getLabel('tagTab', '标签'))}</div>
                ${showSummaryToggle ? '<div class="settings-tab" data-tab="other">...</div>' : ''}
                <div class="settings-tab" data-tab="importExport">同步</div>
            </div>
        </div>
        <div class="settings-body">
            <div class="settings-content active" data-content="titles">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-titles">关键词</div>
                    <div class="settings-subtab" data-subtab="regex-titles">正则表达式</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-titles">
                    <label for="titles">${escapeHtml(getLabel('titleKeywordTextarea', '🚫 屏蔽的标题关键词（逗号分隔）：'))}</label>
                    <textarea id="titles">${escapeHtml(settings.blockedTitles.join(', '))}</textarea>
                    <button id="saveTitleKeywords" type="button" class="actionButton saveButton">保存设置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="regex-titles">
                    <label>${escapeHtml(getLabel('titleRegexLabel', '🔍 标题关键词过滤规则:'))}</label>
                    <div id="titleRegexContainer"></div>
                    <div class="regex-add-wrapper">
                        <button id="addTitleRegex" type="button" class="actionButton regex-add-button">新增规则</button>
                    </div>
                    <div class="regex-help">
                        <p>正则表达式使用说明：</p>
                        <ul>
                            <li>使用 <code>^</code> 匹配行首，<code>$</code> 匹配行尾</li>
                            <li>使用 <code>.</code> 匹配任意字符，<code>*</code> 表示零次或多次匹配</li>
                            <li>使用 <code>[]</code> 匹配字符集，如 <code>[a-z]</code> 匹配小写字母</li>
                            <li>使用 <code>\\b</code> 匹配单词边界</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="settings-content" data-content="categories">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-categories">关键词</div>
                    <div class="settings-subtab" data-subtab="regex-categories">正则表达式</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-categories">
                    <label for="categories">${escapeHtml(getLabel('categoryTextarea', '🚫 屏蔽的类别（逗号分隔）：'))}</label>
                    <textarea id="categories">${escapeHtml(settings.blockedCategories.join(', '))}</textarea>
                    <button id="saveCategories" type="button" class="actionButton saveButton">保存设置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="regex-categories">
                    <label>${escapeHtml(getLabel('categoryRegexLabel', '🔍 类别过滤规则:'))}</label>
                    <div id="categoryRegexContainer"></div>
                    <div class="regex-add-wrapper">
                        <button id="addCategoryRegex" type="button" class="actionButton regex-add-button">新增规则</button>
                    </div>
                    <div class="regex-help">
                        <p>正则表达式使用说明：</p>
                        <ul>
                            <li>使用 <code>^</code> 匹配行首，<code>$</code> 匹配行尾</li>
                            <li>使用 <code>.</code> 匹配任意字符，<code>*</code> 表示零次或多次匹配</li>
                            <li>使用 <code>[]</code> 匹配字符集，如 <code>[a-z]</code> 匹配小写字母</li>
                            <li>使用 <code>\\b</code> 匹配单词边界</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="settings-content" data-content="tags">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-tags">关键词</div>
                    <div class="settings-subtab" data-subtab="regex-tags">正则表达式</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-tags">
                    <label for="tags">${escapeHtml(getLabel('tagTextarea', '🚫 屏蔽的标签（逗号分隔）：'))}</label>
                    <textarea id="tags">${escapeHtml(settings.blockedTags.join(', '))}</textarea>
                    <button id="saveTags" type="button" class="actionButton saveButton">保存设置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="regex-tags">
                    <label>${escapeHtml(getLabel('tagRegexLabel', '🔍 标签过滤规则:'))}</label>
                    <div id="tagRegexContainer"></div>
                    <div class="regex-add-wrapper">
                        <button id="addTagRegex" type="button" class="actionButton regex-add-button">新增规则</button>
                    </div>
                    <div class="regex-help">
                        <p>正则表达式使用说明：</p>
                        <ul>
                            <li>使用 <code>^</code> 匹配行首，<code>$</code> 匹配行尾</li>
                            <li>使用 <code>.</code> 匹配任意字符，<code>*</code> 表示零次或多次匹配</li>
                            <li>使用 <code>[]</code> 匹配字符集，如 <code>[a-z]</code> 匹配小写字母</li>
                            <li>使用 <code>\\b</code> 匹配单词边界</li>
                        </ul>
                    </div>
                </div>
            </div>
            ${showSummaryToggle ? `<div class="settings-content" data-content="other">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="view-other">其他</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="view-other">
                    <label>
                        <input type="checkbox" id="summaryScriptEnabledToggle" ${settings.summaryScriptEnabled ? 'checked' : ''}>
                        启用总结脚本联动
                    </label>
                    <p class="settings-hint">开启：等待总结按钮出现后再注入屏蔽按钮；关闭：直接注入。</p>
                    <button id="saveOther" type="button" class="actionButton saveButton">保存设置</button>
                </div>
            </div>` : ''}
            <div class="settings-content" data-content="importExport">
                <div class="settings-subtabs">
                    <div class="settings-subtab active" data-subtab="export">导出</div>
                    <div class="settings-subtab" data-subtab="import">导入</div>
                </div>
                <div class="settings-subcontent active" data-subcontent="export">
                    <label>📤 导出脚本配置：</label>
                    <p>选择一个文件夹，存放当前脚本的配置。</p>
                    <button id="exportSettings" type="button" class="actionButton saveButton">导出脚本配置</button>
                </div>
                <div class="settings-subcontent" data-subcontent="import">
                    <label>📥 导入脚本配置：</label>
                    <p>选择一个(之前导出的)脚本配置文件，进行导入。</p>
                    <input type="file" id="importSettingsFile" accept=".json" style="display: none;">
                    <button id="importSettings" type="button" class="actionButton">导入脚本配置</button>
                </div>
            </div>
        </div>
    `;
    }

    const SETTINGS_DIALOG_CSS = `
    #${SETTINGS_DIALOG_OVERLAY_ID} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: none;
    }
    #${SETTINGS_DIALOG_ID} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 2px solid rgba(137, 207, 240, 0.6);
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        width: calc(100vw - 24px);
        max-width: 760px;
        max-height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 0 20px 20px;
        color: #333;
        box-sizing: border-box;
    }
    #${SETTINGS_DIALOG_ID} h2 {
        margin: 0 0 20px 0;
        color: #007bff;
        font-size: 24px;
        text-align: center;
    }
    #${SETTINGS_DIALOG_ID} textarea {
        width: 100%;
        height: 200px;
        overflow-y: auto;
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        resize: vertical;
        background: white;
        color: #333;
    }
    #${SETTINGS_DIALOG_ID} button {
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: bold;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    #${SETTINGS_DIALOG_ID} button:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
    #${SETTINGS_DIALOG_ID} .actionButton {
        background-color: #007bff;
        position: fixed;
        bottom: 10px;
        right: 40px;
        box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
    }
    #${SETTINGS_DIALOG_ID} .saveButton {
        background-color: #28a745;
    }
    #${SETTINGS_DIALOG_ID} .settings-header {
        position: sticky;
        top: 0;
        z-index: 30;
        background: #ffffff;
        padding: 20px 20px 0;
        margin: 0 -20px 0;
        border-bottom: none;
    }
    #${SETTINGS_DIALOG_ID} .settings-body {
        flex: 1 1 auto;
        overflow-y: auto;
        min-height: 0;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="regex-"] {
        padding-bottom: 20px;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="regex-"] > div[id$="RegexContainer"] {
        margin-left: -12px;
        margin-right: -12px;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="view-"] > textarea {
        width: calc(100% + 24px);
        margin-left: -12px;
        margin-right: -12px;
    }
    #${SETTINGS_DIALOG_ID} .settings-subcontent[data-subcontent^="view-"] > textarea {
        width: calc(100% + 30px);
        margin-left: -15px;
        margin-right: -15px;
        box-sizing: border-box;
        min-height: 260px;
        height: 260px;
    }
    #${SETTINGS_DIALOG_ID} .regex-help p {
        margin: 0 0 6px;
    }
    #${SETTINGS_DIALOG_ID} .regex-help ul {
        margin: 0;
        padding-left: 18px;
    }
    #${SETTINGS_DIALOG_ID}.regex-fab-enabled .regex-add-wrapper {
        display: none;
    }
    #${SETTINGS_DIALOG_ID} .regex-add-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
    }
    #${SETTINGS_DIALOG_ID} .regex-add-wrapper .regex-add-button {
        margin: 0;
    }
    .regex-floating-add {
        position: fixed;
        z-index: 10001;
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        color: white;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #007bff;
        box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
        transition: opacity 0.2s ease;
        display: none;
    }
    .regex-floating-add:hover {
        opacity: 0.92;
    }
    #${SETTINGS_DIALOG_ID} #closeDialog {
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
        max-width: 30px;
        max-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-sizing: border-box;
        color: #fff;
        font-size: 0;
        line-height: 0;
        transition: background-color 0.3s ease;
    }
    #${SETTINGS_DIALOG_ID} #closeDialog::before,
    #${SETTINGS_DIALOG_ID} #closeDialog::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        background: #fff;
        border-radius: 2px;
        transform-origin: center;
    }
    #${SETTINGS_DIALOG_ID} #closeDialog::before {
        transform: translate(-50%, -50%) rotate(45deg);
    }
    #${SETTINGS_DIALOG_ID} #closeDialog::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
    #${SETTINGS_DIALOG_ID} .settings-tabs {
        display: flex;
        justify-content: space-around;
        margin-bottom: 0;
        border-bottom: 2px solid #e9ecef;
    }
    #${SETTINGS_DIALOG_ID} .settings-tab {
        padding: 10px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: all 0.3s ease;
        font-size: 16px;
        font-weight: bold;
        color: #495057;
    }
    #${SETTINGS_DIALOG_ID} .settings-tab:hover {
        color: #007bff;
    }
    #${SETTINGS_DIALOG_ID} .settings-tab.active {
        color: #007bff;
        border-bottom-color: #007bff;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtabs {
        display: flex;
        justify-content: flex-start;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab {
        padding: 6px 12px;
        cursor: pointer;
        border: 1px solid #dee2e6;
        border-radius: 15px;
        transition: all 0.3s ease;
        font-size: 14px;
        margin-right: 10px;
        background-color: #f8f9fa;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab:hover {
        background-color: #e9ecef;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab^="regex-"] {
        background-color: #ffb347;
        border-color: #ffb347;
    }
    #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab="export"] {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
    }
    #${SETTINGS_DIALOG_ID} .settings-content,
    #${SETTINGS_DIALOG_ID} .settings-subcontent {
        display: none;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 8px;
    }
    #${SETTINGS_DIALOG_ID} .settings-content.active,
    #${SETTINGS_DIALOG_ID} .settings-subcontent.active {
        display: block;
    }
    #${SETTINGS_DIALOG_ID} .settings-content label,
    #${SETTINGS_DIALOG_ID} .settings-subcontent label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
        color: #495057;
    }
    #${SETTINGS_DIALOG_ID} .settings-content label input[type="checkbox"],
    #${SETTINGS_DIALOG_ID} .settings-subcontent label input[type="checkbox"] {
        margin-right: 8px;
    }
    #${SETTINGS_DIALOG_ID} .settings-hint {
        margin: 0 0 12px;
        font-size: 13px;
        color: #6c757d;
        line-height: 1.5;
    }
    #${SETTINGS_DIALOG_ID} .regex-input {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
        margin-bottom: 15px;
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.03);
        transition: all 0.3s ease;
    }
    #${SETTINGS_DIALOG_ID} .regex-input:hover {
        background: rgba(0, 0, 0, 0.05);
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-text {
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 36px;
        height: auto;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        line-height: 1.4;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        resize: vertical;
        white-space: pre-wrap;
        word-break: break-all;
        overflow-wrap: anywhere;
        transition: all 0.3s ease;
        margin-bottom: 0;
        overflow-y: hidden;
        box-sizing: border-box;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-text:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        outline: none;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-note {
        height: 32px;
        padding: 6px 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 13px;
        transition: all 0.3s ease;
        box-sizing: border-box;
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-note:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        outline: none;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .regex-note-row,
    #${SETTINGS_DIALOG_ID} .regex-input .regex-text-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .delete-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 0;
        background-color: transparent;
        color: #dc3545;
        font-size: 16px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
    }
    #${SETTINGS_DIALOG_ID} .regex-input .delete-btn:hover {
        border-color: #dc3545;
        transform: translateY(-1px);
    }
    #${SETTINGS_DIALOG_ID} .regex-error {
        color: #dc3545;
        font-size: 12px;
        margin-top: 4px;
    }
    #${SETTINGS_DIALOG_ID} .regex-help {
        font-size: 12px;
        color: #666;
        margin-top: 5px;
    }
    @media (prefers-color-scheme: dark) {
        #${SETTINGS_DIALOG_ID} {
            background: #2c2c2c;
            color: #e0e0e0;
            border-color: rgba(77, 166, 255, 0.6);
        }
        #${SETTINGS_DIALOG_ID} .settings-header {
            background: #2c2c2c;
        }
        #${SETTINGS_DIALOG_ID} .settings-tabs {
            border-bottom-color: rgba(255, 255, 255, 0.12);
        }
        #${SETTINGS_DIALOG_ID} h2 {
            color: #4da6ff;
        }
        #${SETTINGS_DIALOG_ID} textarea,
        #${SETTINGS_DIALOG_ID} input[type="text"] {
            background: #3a3a3a;
            color: #e0e0e0;
            border-color: #555;
        }
        #${SETTINGS_DIALOG_ID} .settings-tab {
            color: #bbb;
        }
        #${SETTINGS_DIALOG_ID} .settings-tab:hover {
            color: #4da6ff;
        }
        #${SETTINGS_DIALOG_ID} .settings-tab.active {
            color: #4da6ff;
            border-bottom-color: #4da6ff;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab {
            background-color: #3a3a3a;
            border-color: #555;
            color: #e0e0e0;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab:hover {
            background-color: #4a4a4a;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab.active {
            background-color: #4da6ff;
            color: #2c2c2c;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab^="regex-"] {
            background-color: #ffb347;
            border-color: #ffb347;
        }
        #${SETTINGS_DIALOG_ID} .settings-subtab.active[data-subtab="export"] {
            background-color: #28a745;
            border-color: #28a745;
            color: #ffffff;
        }
        #${SETTINGS_DIALOG_ID} .settings-content,
        #${SETTINGS_DIALOG_ID} .settings-subcontent {
            background-color: #3a3a3a;
        }
        #${SETTINGS_DIALOG_ID} .settings-content label,
        #${SETTINGS_DIALOG_ID} .settings-subcontent label {
            color: #bbb;
        }
        #${SETTINGS_DIALOG_ID} .regex-help {
            color: #aaa;
        }
        #${SETTINGS_DIALOG_ID} .regex-input {
            background: rgba(255, 255, 255, 0.05);
        }
        #${SETTINGS_DIALOG_ID} .regex-input:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        #${SETTINGS_DIALOG_ID} .regex-input .regex-text,
        #${SETTINGS_DIALOG_ID} .regex-input .regex-note {
            background-color: #333;
            border-color: #4a4a4a;
            color: #e0e0e0;
        }
    }
`;

    function createSettingsImportExportController({
        store,
        profile,
        notifier,
        onSettingsChanged,
        refreshIfOpen
    }) {
        function exportSettings() {
            const settings = store.exportSettings();
            const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = profile.exportFileName || 'linux_do_content_filter_settings.json';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            URL.revokeObjectURL(url);
            notifier.show('设置已成功导出！', 'success');
        }

        function importSettings(event) {
            const file = event.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                try {
                    const settings = JSON.parse(loadEvent.target.result);
                    store.importSettingsObject(settings);
                    onSettingsChanged({ refreshDialog: false });
                    notifier.show('设置已成功导入！', 'success');
                    refreshIfOpen();
                } catch (error) {
                    console.error('导入设置时发生错误:', error);
                    notifier.show('导入设置失败，请检查文件格式！', 'error');
                } finally {
                    event.target.value = '';
                }
            };
            reader.readAsText(file);
        }

        return {
            exportSettings,
            importSettings
        };
    }

    function adjustRegexTextareaHeight(textarea) {
        if (!textarea) return;
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const minHeight = 36;
        textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
        textarea.style.overflowY = 'hidden';
    }

    function collectRegexEntries(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll('.regex-input'))
            .map((group) => {
                const pattern = group.querySelector('.regex-text')?.value || '';
                const note = group.querySelector('.regex-note')?.value || '';
                const trimmedPattern = pattern.trim();
                if (!trimmedPattern) return null;
                return { pattern: trimmedPattern, note: note.trim() };
            })
            .filter(Boolean);
    }

    function createSettingsRegexEditor({ store, runtime, notifier, onSettingsChanged }) {
        function getRegexEntriesByType(type) {
            const settings = store.getSnapshot();
            switch (type) {
                case 'title':
                    return settings.titleRegexList;
                case 'category':
                    return settings.categoryRegexList;
                case 'tag':
                    return settings.tagRegexList;
                default:
                    return [];
            }
        }

        function getActiveRegexType(dialog) {
            if (!dialog) return null;
            const activeContent = dialog.querySelector('.settings-content.active');
            if (!activeContent) return null;
            const activeSubcontent = activeContent.querySelector('.settings-subcontent.active[data-subcontent^="regex-"]');
            if (!activeSubcontent) return null;
            return REGEX_SUBCONTENT_TYPE_MAP[activeSubcontent.dataset.subcontent || ''] || null;
        }

        function refreshVisibleHeights(dialog) {
            const root = dialog || document;
            const activeContent = root.querySelector('.settings-content.active');
            if (!activeContent) return;
            const activeSubcontent = activeContent.querySelector('.settings-subcontent.active[data-subcontent^="regex-"]');
            if (!activeSubcontent) return;
            activeSubcontent.querySelectorAll('.regex-text').forEach((textarea) => {
                adjustRegexTextareaHeight(textarea);
            });
        }

        function positionFloatingButton() {
            if (!runtime.regexFloatingButton || !runtime.regexFloatingButtonDialog) return;
            const rect = runtime.regexFloatingButtonDialog.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            runtime.regexFloatingButton.style.left = `${Math.round(rect.right - 35)}px`;
            runtime.regexFloatingButton.style.top = `${Math.round(rect.bottom - 24)}px`;
            runtime.regexFloatingButton.style.transform = 'translate(-100%, -100%)';
        }

        function cleanupFloatingButton() {
            if (runtime.regexFloatingButton) {
                runtime.regexFloatingButton.remove();
                runtime.regexFloatingButton = null;
            }
            if (runtime.regexFloatingButtonResizeHandler) {
                window.removeEventListener('resize', runtime.regexFloatingButtonResizeHandler);
                runtime.regexFloatingButtonResizeHandler = null;
            }
            if (runtime.regexFloatingButtonDialog) {
                runtime.regexFloatingButtonDialog.classList.remove('regex-fab-enabled');
                runtime.regexFloatingButtonDialog = null;
            }
        }

        function ensureFloatingButton(dialog) {
            if (runtime.regexFloatingButton && runtime.regexFloatingButtonDialog === dialog) return;
            cleanupFloatingButton();
            if (!dialog) return;

            runtime.regexFloatingButtonDialog = dialog;
            runtime.regexFloatingButtonDialog.classList.add('regex-fab-enabled');

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'regex-floating-add';
            button.textContent = '新增规则';
            button.addEventListener('click', () => {
                const type = getActiveRegexType(runtime.regexFloatingButtonDialog);
                if (!type) return;
                addInput(type);
                requestAnimationFrame(positionFloatingButton);
            });

            runtime.regexFloatingButton = button;
            document.body.appendChild(button);
            runtime.regexFloatingButtonResizeHandler = () => positionFloatingButton();
            window.addEventListener('resize', runtime.regexFloatingButtonResizeHandler);
        }

        function updateFloatingButton(dialog) {
            if (!dialog) {
                cleanupFloatingButton();
                return;
            }
            ensureFloatingButton(dialog);
            if (!runtime.regexFloatingButton) return;
            const type = getActiveRegexType(dialog);
            runtime.regexFloatingButton.style.display = type ? 'block' : 'none';
            if (type) positionFloatingButton();
        }

        function clearAutoSave(type) {
            const timer = runtime.regexAutoSaveTimers[type];
            if (!timer) return false;
            clearTimeout(timer);
            delete runtime.regexAutoSaveTimers[type];
            return true;
        }

        function hasInvalidRegexInContainer(type) {
            const container = document.getElementById(`${type}RegexContainer`);
            if (!container) return false;

            return Array.from(container.querySelectorAll('.regex-text')).some((input) => {
                const value = (input.value || '').trim();
                if (!value) return false;

                try {
                    new RegExp(value);
                    return false;
                } catch (error) {
                    return true;
                }
            });
        }

        function saveSettings(type, { notifySuccess = false, notifyError = true } = {}) {
            const container = document.getElementById(`${type}RegexContainer`);
            if (!container) return false;
            if (hasInvalidRegexInContainer(type)) {
                return false;
            }

            const entries = collectRegexEntries(container);
            const currentEntries = getRegexEntriesByType(type).map((entry) => ({
                pattern: entry.pattern,
                note: entry.note
            }));

            if (JSON.stringify(entries) === JSON.stringify(currentEntries)) {
                return true;
            }

            try {
                compileRegexEntries(entries, { strict: true });
                store.setRegexEntries(type, entries);
                onSettingsChanged({ refreshDialog: false });
                if (notifySuccess) {
                    notifier.show('正则表达式设置已保存！', 'success');
                }
                return true;
            } catch (error) {
                console.error('保存正则表达式时发生错误:', error);
                if (notifyError) {
                    notifier.show('保存正则表达式时发生错误！', 'error');
                }
                return false;
            }
        }

        function flushAutoSave(type) {
            clearAutoSave(type);
            return saveSettings(type, { notifySuccess: false, notifyError: true });
        }

        function flushAllAutoSave() {
            Object.keys(runtime.regexAutoSaveTimers).forEach((type) => {
                flushAutoSave(type);
            });
        }

        function scheduleAutoSave(type) {
            clearAutoSave(type);
            runtime.regexAutoSaveTimers[type] = setTimeout(() => {
                delete runtime.regexAutoSaveTimers[type];
                saveSettings(type, { notifySuccess: false, notifyError: true });
            }, 300);
        }

        function showRegexError(input, message) {
            removeRegexError(input);
            const error = document.createElement('div');
            error.className = 'regex-error';
            error.textContent = message;
            input.parentElement.appendChild(error);
        }

        function removeRegexError(input) {
            const errorElement = input.parentElement.querySelector('.regex-error');
            if (errorElement) errorElement.remove();
        }

        function validateAndSaveRegex(input, type) {
            removeRegexError(input);
            try {
                if (input.value) {
                    new RegExp(input.value);
                    input.style.borderColor = '#28a745';
                } else {
                    input.style.borderColor = '#ddd';
                }
            } catch (error) {
                showRegexError(input, '无效的正则表达式');
                input.style.borderColor = '#dc3545';
                clearAutoSave(type);
                return;
            }

            if (hasInvalidRegexInContainer(type)) {
                clearAutoSave(type);
                return;
            }

            scheduleAutoSave(type);
        }

        function setupInputEvents(inputGroup, type) {
            const textInput = inputGroup.querySelector('.regex-text');
            const noteInput = inputGroup.querySelector('.regex-note');
            const deleteButton = inputGroup.querySelector('.delete-btn');

            if (textInput) {
                textInput.addEventListener('input', () => {
                    adjustRegexTextareaHeight(textInput);
                    validateAndSaveRegex(textInput, type);
                });
            }

            if (noteInput) {
                noteInput.addEventListener('change', () => {
                    clearAutoSave(type);
                    if (hasInvalidRegexInContainer(type)) return;
                    saveSettings(type, { notifySuccess: false, notifyError: true });
                });
            }

            deleteButton.addEventListener('click', () => {
                clearAutoSave(type);
                inputGroup.style.opacity = '0';
                inputGroup.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    inputGroup.remove();
                    saveSettings(type, { notifySuccess: false, notifyError: true });
                    positionFloatingButton();
                }, 300);
            });
        }

        function addInput(type, value = '', note = '') {
            const container = document.getElementById(`${type}RegexContainer`);
            if (!container) return;

            const inputGroup = document.createElement('div');
            inputGroup.className = 'regex-input';
            inputGroup.innerHTML = `
            <div class="regex-note-row">
                <input type="text" class="regex-note" placeholder="备注（可选）" aria-label="备注（可选）">
                <button type="button" class="delete-btn" aria-label="删除">🗑️</button>
            </div>
            <div class="regex-text-row">
                <textarea class="regex-text" rows="1" placeholder="输入正则表达式" aria-label="输入正则表达式" spellcheck="false"></textarea>
            </div>
        `;

            const textInput = inputGroup.querySelector('.regex-text');
            const noteInput = inputGroup.querySelector('.regex-note');
            if (textInput) textInput.value = value || '';
            if (noteInput) noteInput.value = note || '';

            setupInputEvents(inputGroup, type);
            container.appendChild(inputGroup);

            setTimeout(() => {
                inputGroup.style.opacity = '1';
                inputGroup.style.transform = 'translateX(0)';
                if (textInput) adjustRegexTextareaHeight(textInput);
                positionFloatingButton();
            }, 10);
        }

        function initInputs(type) {
            const container = document.getElementById(`${type}RegexContainer`);
            if (!container) return;
            container.innerHTML = '';
            getRegexEntriesByType(type).forEach((entry) => {
                if (entry?.pattern) {
                    addInput(type, entry.pattern, entry.note);
                }
            });
        }

        return {
            addInput,
            cleanupFloatingButton,
            clearAutoSave,
            collectEntries: collectRegexEntries,
            flushAllAutoSave,
            hasInvalidRegexInContainer,
            initInputs,
            refreshVisibleHeights,
            saveSettings,
            updateFloatingButton
        };
    }

    function normalizeCommaSeparatedTextarea(textarea) {
        return textarea.value
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
    }

    function appendCommaToTextareaIfNeeded(textarea, { force = false, appendText = ',' } = {}) {
        if (!textarea) return false;
        const value = typeof textarea.value === 'string' ? textarea.value : '';
        if (!value.trim()) return false;

        const trimmedValue = value.trimEnd();
        if (trimmedValue.endsWith(',')) return false;

        if (!force && typeof textarea.selectionStart === 'number' && typeof textarea.selectionEnd === 'number') {
            const isCollapsed = textarea.selectionStart === textarea.selectionEnd;
            const isAtEnd = textarea.selectionEnd === value.length;
            if (!isCollapsed || !isAtEnd) return false;
        }

        textarea.value = trimmedValue + appendText;
        const length = textarea.value.length;
        if (typeof textarea.setSelectionRange === 'function') {
            textarea.setSelectionRange(length, length);
        }
        textarea.scrollTop = textarea.scrollHeight;
        return true;
    }

    function createSettingsDialogFeature({ store, runtime, notifier, profile = {} }) {
        let onSettingsChanged = () => {};
        const labels = profile.labels || {};
        const getLabel = (key, fallback) => labels[key] || fallback;
        const notifySettingsChanged = (options) => onSettingsChanged(options);

        const regexEditor = createSettingsRegexEditor({
            store,
            runtime,
            notifier,
            onSettingsChanged: notifySettingsChanged
        });
        const importExport = createSettingsImportExportController({
            store,
            profile,
            notifier,
            onSettingsChanged: notifySettingsChanged,
            refreshIfOpen
        });

        function setCallbacks(callbacks = {}) {
            if (typeof callbacks.onSettingsChanged === 'function') {
                onSettingsChanged = callbacks.onSettingsChanged;
            }
        }

        function close() {
            const dialog = document.getElementById(SETTINGS_DIALOG_ID);
            const overlay = document.getElementById(SETTINGS_DIALOG_OVERLAY_ID);

            regexEditor.flushAllAutoSave();
            regexEditor.cleanupFloatingButton();
            if (dialog) dialog.remove();
            if (overlay) overlay.remove();

            if (runtime.settingsDialogSavedBodyOverflow !== null) {
                document.body.style.overflow = runtime.settingsDialogSavedBodyOverflow;
                runtime.settingsDialogSavedBodyOverflow = null;
            }
            if (runtime.settingsDialogSavedHtmlOverflow !== null) {
                document.documentElement.style.overflow = runtime.settingsDialogSavedHtmlOverflow;
                runtime.settingsDialogSavedHtmlOverflow = null;
            }
        }

        function saveKeywordSection(type) {
            regexEditor.clearAutoSave(type);
            const settings = store.getSnapshot();
            const configMap = {
                title: {
                    fieldId: 'titles',
                    regexContainerId: 'titleRegexContainer',
                    currentKeywords: settings.blockedTitles,
                    currentRegexEntries: settings.titleRegexList,
                    label: getLabel('titleTab', '标题关键词')
                },
                category: {
                    fieldId: 'categories',
                    regexContainerId: 'categoryRegexContainer',
                    currentKeywords: settings.blockedCategories,
                    currentRegexEntries: settings.categoryRegexList,
                    label: getLabel('categoryTab', '类别')
                },
                tag: {
                    fieldId: 'tags',
                    regexContainerId: 'tagRegexContainer',
                    currentKeywords: settings.blockedTags,
                    currentRegexEntries: settings.tagRegexList,
                    label: getLabel('tagTab', '标签')
                }
            };

            const config = configMap[type];
            if (!config) return;

            let changed = false;
            let errorOccurred = false;

            try {
                const textArea = document.getElementById(config.fieldId);
                if (textArea) {
                    const nextKeywords = normalizeCommaSeparatedTextarea(textArea);
                    if (JSON.stringify(nextKeywords) !== JSON.stringify(config.currentKeywords)) {
                        store.setKeywordList(type, nextKeywords);
                        changed = true;
                    }
                }

                const regexContainer = document.getElementById(config.regexContainerId);
                if (regexContainer) {
                    const entries = regexEditor.collectEntries(regexContainer);
                    const currentEntries = config.currentRegexEntries.map((entry) => ({
                        pattern: entry.pattern,
                        note: entry.note
                    }));
                    if (JSON.stringify(entries) !== JSON.stringify(currentEntries)) {
                        compileRegexEntries(entries, { strict: true });
                        store.setRegexEntries(type, entries);
                        changed = true;
                    }
                }
            } catch (error) {
                console.error(`保存${config.label}时发生错误:`, error);
                errorOccurred = true;
            }

            if (errorOccurred) {
                notifier.show(`保存${config.label}时发生错误，请重试！`, 'error');
                return;
            }

            if (changed) {
                notifySettingsChanged({ refreshDialog: false });
                notifier.show(`${config.label}已成功更新！`, 'success');
                refreshIfOpen();
            } else {
                notifier.show(`${config.label}无变化！`, 'info');
            }
        }

        function saveOtherSettings() {
            const toggle = document.getElementById('summaryScriptEnabledToggle');
            if (!toggle) return;
            const nextValue = Boolean(toggle.checked);
            const currentValue = store.getSnapshot().summaryScriptEnabled;
            if (nextValue === currentValue) {
                notifier.show('设置无变化！', 'info');
                return;
            }

            store.setSummaryScriptEnabled(nextValue);
            notifySettingsChanged({ refreshDialog: false });
            notifier.show('设置已保存！', 'success');
        }

        function initTabSwitching(dialog) {
            const tabs = dialog.querySelectorAll('.settings-tab');
            tabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    tabs.forEach((element) => element.classList.remove('active'));
                    tab.classList.add('active');

                    const contents = dialog.querySelectorAll('.settings-content');
                    contents.forEach((content) => {
                        content.classList.toggle('active', content.dataset.content === tab.dataset.tab);
                    });

                    regexEditor.updateFloatingButton(dialog);
                    requestAnimationFrame(() => regexEditor.refreshVisibleHeights(dialog));
                });
            });
        }

        function initSubtabSwitching(dialog) {
            const subtabs = dialog.querySelectorAll('.settings-subtab');
            subtabs.forEach((subtab) => {
                subtab.addEventListener('click', () => {
                    const parentContent = subtab.closest('.settings-content');
                    const siblingSubtabs = parentContent.querySelectorAll('.settings-subtab');
                    siblingSubtabs.forEach((element) => element.classList.remove('active'));
                    subtab.classList.add('active');

                    const subcontents = parentContent.querySelectorAll('.settings-subcontent');
                    subcontents.forEach((content) => {
                        content.classList.toggle('active', content.dataset.subcontent === subtab.dataset.subtab);
                    });

                    regexEditor.updateFloatingButton(dialog);
                    requestAnimationFrame(() => regexEditor.refreshVisibleHeights(dialog));
                });
            });
        }

        function wireCommaTextareas(dialog) {
            ['titles', 'categories', 'tags'].forEach((id) => {
                const textarea = dialog.querySelector(`#${id}`);
                if (!textarea) return;

                textarea.addEventListener('click', () => {
                    appendCommaToTextareaIfNeeded(textarea, { appendText: ', ' });
                });

                const label = dialog.querySelector(`label[for="${id}"]`);
                if (label) {
                    label.addEventListener('mousedown', (event) => {
                        if (event.button !== 0) return;
                        textarea.dataset.linuxdoAppendCommaOnFocus = '1';
                    });
                }

                textarea.addEventListener('focus', () => {
                    if (textarea.dataset.linuxdoAppendCommaOnFocus !== '1') return;
                    delete textarea.dataset.linuxdoAppendCommaOnFocus;
                    setTimeout(() => {
                        if (document.activeElement !== textarea) return;
                        const length = textarea.value.length;
                        if (typeof textarea.setSelectionRange === 'function') {
                            textarea.setSelectionRange(length, length);
                        }
                        appendCommaToTextareaIfNeeded(textarea, { force: true, appendText: ', ' });
                    }, 0);
                });
            });
        }

        function bindDialogEvents(dialog) {
            wireCommaTextareas(dialog);

            document.getElementById('saveTitleKeywords').addEventListener('click', () => saveKeywordSection('title'));
            document.getElementById('saveCategories').addEventListener('click', () => saveKeywordSection('category'));
            document.getElementById('saveTags').addEventListener('click', () => saveKeywordSection('tag'));
            const saveOtherButton = document.getElementById('saveOther');
            if (saveOtherButton) {
                saveOtherButton.addEventListener('click', saveOtherSettings);
            }
            document.getElementById('closeDialog').addEventListener('click', close);
            document.getElementById('exportSettings').addEventListener('click', importExport.exportSettings);
            document.getElementById('importSettings').addEventListener('click', () => document.getElementById('importSettingsFile').click());
            document.getElementById('importSettingsFile').addEventListener('change', importExport.importSettings);

            initTabSwitching(dialog);
            initSubtabSwitching(dialog);
            regexEditor.initInputs('title');
            regexEditor.initInputs('category');
            regexEditor.initInputs('tag');

            document.getElementById('addTitleRegex').addEventListener('click', () => regexEditor.addInput('title'));
            document.getElementById('addCategoryRegex').addEventListener('click', () => regexEditor.addInput('category'));
            document.getElementById('addTagRegex').addEventListener('click', () => regexEditor.addInput('tag'));

            regexEditor.updateFloatingButton(dialog);
            requestAnimationFrame(() => regexEditor.refreshVisibleHeights(dialog));
        }

        function renderInto(dialog) {
            dialog.innerHTML = buildSettingsDialogMarkup(store.getSnapshot(), profile);
        }

        function refreshIfOpen() {
            const dialog = document.getElementById(SETTINGS_DIALOG_ID);
            if (!dialog) return;

            regexEditor.flushAllAutoSave();
            renderInto(dialog);
            bindDialogEvents(dialog);
        }

        function show() {
            ensureStyle(SETTINGS_DIALOG_STYLE_ID, SETTINGS_DIALOG_CSS);

            if (runtime.settingsDialogSavedBodyOverflow === null) {
                runtime.settingsDialogSavedBodyOverflow = document.body.style.overflow;
            }
            if (runtime.settingsDialogSavedHtmlOverflow === null) {
                runtime.settingsDialogSavedHtmlOverflow = document.documentElement.style.overflow;
            }

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            let overlay = document.getElementById(SETTINGS_DIALOG_OVERLAY_ID);
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = SETTINGS_DIALOG_OVERLAY_ID;
                document.body.appendChild(overlay);
            }

            let dialog = document.getElementById(SETTINGS_DIALOG_ID);
            if (!dialog) {
                dialog = document.createElement('div');
                dialog.id = SETTINGS_DIALOG_ID;
                document.body.appendChild(dialog);
            }

            overlay.style.display = 'block';
            renderInto(dialog);
            bindDialogEvents(dialog);
        }

        return {
            show,
            close,
            refreshIfOpen,
            setCallbacks
        };
    }

    function createRuntimeState() {
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

    function cloneSettings(settings) {
        return JSON.parse(JSON.stringify(settings));
    }

    function sanitizeStringArray(value) {
        if (!Array.isArray(value)) return [];
        return value
            .map((item) => (typeof item === 'string' ? item.trim() : ''))
            .filter(Boolean);
    }

    function sanitizeSearchFilterMap(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return {};
        }

        const normalized = {};
        Object.entries(value).forEach(([searchTerm, rawRule]) => {
            const normalizedKey = String(searchTerm || '').trim();
            if (!normalizedKey) return;
            normalized[normalizedKey] = normalizeSearchFilterRule(rawRule);
        });
        return normalized;
    }

    function sanitizeSettings(raw) {
        const source = raw && typeof raw === 'object' ? raw : {};
        const nextSettings = {
            schemaVersion: SCHEMA_VERSION,
            blockedTitles: sanitizeStringArray(source.blockedTitles),
            blockedCategories: sanitizeStringArray(source.blockedCategories),
            blockedTags: sanitizeStringArray(source.blockedTags ?? source.blockedTtags),
            titleRegexList: normalizeRegexEntries(source.titleRegexList),
            categoryRegexList: normalizeRegexEntries(source.categoryRegexList),
            tagRegexList: normalizeRegexEntries(source.tagRegexList),
            searchFilterMap: sanitizeSearchFilterMap(source.searchFilterMap),
            summaryScriptEnabled: source.summaryScriptEnabled !== false
        };

        return nextSettings;
    }

    function getLegacySettingsSnapshot(gm, storageKeys) {
        return {
            blockedTitles: gm.getValue(storageKeys.blockedTitles, DEFAULT_SETTINGS.blockedTitles),
            blockedCategories: gm.getValue(storageKeys.blockedCategories, DEFAULT_SETTINGS.blockedCategories),
            blockedTags: gm.getValue(
                storageKeys.blockedTags,
                gm.getValue(storageKeys.blockedTtags, DEFAULT_SETTINGS.blockedTags)
            ),
            titleRegexList: gm.getValue(storageKeys.titleRegexList, DEFAULT_SETTINGS.titleRegexList),
            categoryRegexList: gm.getValue(storageKeys.categoryRegexList, DEFAULT_SETTINGS.categoryRegexList),
            tagRegexList: gm.getValue(storageKeys.tagRegexList, DEFAULT_SETTINGS.tagRegexList),
            searchFilterMap: gm.getValue(storageKeys.searchFilterMap, DEFAULT_SETTINGS.searchFilterMap),
            summaryScriptEnabled: gm.getValue(storageKeys.summaryScriptEnabled, DEFAULT_SETTINGS.summaryScriptEnabled)
        };
    }

    function createSettingsStore(gm, { storageKeys = STORAGE_KEYS } = {}) {
        let settings = sanitizeSettings(DEFAULT_SETTINGS);

        function persist() {
            settings = sanitizeSettings(settings);
            gm.setValue(storageKeys.settings, settings);
            return settings;
        }

        function load() {
            const savedSettings = gm.getValue(storageKeys.settings, null);
            if (savedSettings && typeof savedSettings === 'object' && !Array.isArray(savedSettings)) {
                settings = sanitizeSettings(savedSettings);
                const needsMigration = (
                    savedSettings.schemaVersion !== SCHEMA_VERSION ||
                    Object.prototype.hasOwnProperty.call(savedSettings, 'blockedTtags') ||
                    !Object.prototype.hasOwnProperty.call(savedSettings, 'searchFilterMap')
                );
                if (needsMigration) persist();
                return cloneSettings(settings);
            }

            settings = sanitizeSettings(getLegacySettingsSnapshot(gm, storageKeys));
            persist();
            return cloneSettings(settings);
        }

        function get() {
            return cloneSettings(settings);
        }

        function getSnapshot() {
            return settings;
        }

        function replace(nextSettings) {
            settings = sanitizeSettings(nextSettings);
            persist();
            return cloneSettings(settings);
        }

        function mutate(mutator) {
            const draft = cloneSettings(settings);
            mutator(draft);
            settings = sanitizeSettings(draft);
            persist();
            return cloneSettings(settings);
        }

        function exportSettings() {
            return cloneSettings(settings);
        }

        function importSettingsObject(rawSettings) {
            settings = sanitizeSettings(rawSettings);
            persist();
            return cloneSettings(settings);
        }

        function getSearchFilterRule(searchTerm) {
            const normalizedKey = String(searchTerm || '').trim();
            if (!normalizedKey) return { ...DEFAULT_SEARCH_FILTER_RULE };
            return normalizeSearchFilterRule(settings.searchFilterMap[normalizedKey]);
        }

        function setSearchFilterRule(searchTerm, rawRule) {
            const normalizedKey = String(searchTerm || '').trim();
            if (!normalizedKey) return { ...DEFAULT_SEARCH_FILTER_RULE };

            const nextRule = normalizeSearchFilterRule(rawRule);
            mutate((draft) => {
                draft.searchFilterMap[normalizedKey] = nextRule;
            });

            return nextRule;
        }

        function setKeywordList(kind, values) {
            const nextValues = sanitizeStringArray(values);
            mutate((draft) => {
                switch (kind) {
                    case 'title':
                        draft.blockedTitles = nextValues;
                        break;
                    case 'category':
                        draft.blockedCategories = nextValues;
                        break;
                    case 'tag':
                        draft.blockedTags = nextValues;
                        break;
                    default:
                        break;
                }
            });
        }

        function setRegexEntries(kind, rawEntries) {
            const entries = normalizeRegexEntries(rawEntries);
            compileRegexEntries(entries, { strict: true });

            mutate((draft) => {
                switch (kind) {
                    case 'title':
                        draft.titleRegexList = entries;
                        break;
                    case 'category':
                        draft.categoryRegexList = entries;
                        break;
                    case 'tag':
                        draft.tagRegexList = entries;
                        break;
                    default:
                        break;
                }
            });
        }

        function setSummaryScriptEnabled(enabled) {
            mutate((draft) => {
                draft.summaryScriptEnabled = Boolean(enabled);
            });
        }

        return {
            load,
            get,
            getSnapshot,
            replace,
            mutate,
            exportSettings,
            importSettingsObject,
            getSearchFilterRule,
            setSearchFilterRule,
            setKeywordList,
            setRegexEntries,
            setSummaryScriptEnabled
        };
    }

    const HISTORY_NAVIGATION_EVENT = 'content-blocker:navigation';
    const HISTORY_NAVIGATION_PATCH_FLAG = '__contentBlockerHistoryNavigationPatched';

    function patchHistoryNavigation() {
        const historyObject = globalThis.history;
        const windowObject = globalThis.window;
        if (!historyObject || !windowObject || globalThis[HISTORY_NAVIGATION_PATCH_FLAG]) return;

        ['pushState', 'replaceState'].forEach((methodName) => {
            const originalMethod = historyObject[methodName];
            if (typeof originalMethod !== 'function') return;

            historyObject[methodName] = function patchedHistoryMethod(...args) {
                const result = originalMethod.apply(this, args);
                windowObject.dispatchEvent(new Event(HISTORY_NAVIGATION_EVENT));
                return result;
            };
        });

        globalThis[HISTORY_NAVIGATION_PATCH_FLAG] = true;
    }

    function bootContentBlocker(profile) {
        const gm = createUserscriptApi(globalThis);
        const runtime = createRuntimeState();
        const store = createSettingsStore(gm, { storageKeys: profile.storageKeys });
        store.load();

        const notifier = createNotifier();
        const page = createPageService({ runtime, store, profile });
        const searchFilter = createSearchFilterFeature({ store, runtime, page });
        const blockControls = createBlockControlsFeature({
            store,
            runtime,
            notifier,
            profile,
            isSearchPage: () => page.isSearchPage(),
            getCurrentSearchTerm: () => searchFilter.getCurrentSearchTerm()
        });
        const settingsDialog = createSettingsDialogFeature({ store, runtime, notifier, profile });
        const contentFilter = createContentFilterFeature({
            store,
            runtime,
            page,
            profile,
            searchFilter,
            blockControls
        });

        const onPersistentSettingsChanged = ({ refreshDialog = true } = {}) => {
            searchFilter.invalidateSync();
            if (refreshDialog) {
                settingsDialog.refreshIfOpen();
            }
            contentFilter.resetAndReapplyFilter();
        };

        searchFilter.setOnFilterRequested(() => {
            contentFilter.filterSearchResults();
        });

        blockControls.setCallbacks({
            onFilterRequested: () => {
                contentFilter.filterContent();
            },
            onSettingsChanged: onPersistentSettingsChanged
        });

        settingsDialog.setCallbacks({
            onSettingsChanged: onPersistentSettingsChanged
        });

        function init() {
            contentFilter.start();
        }

        function scheduleInit() {
            const run = () => {
                init();
            };

            if (typeof window.requestAnimationFrame === 'function') {
                window.requestAnimationFrame(() => {
                    window.setTimeout(run, 0);
                });
                return;
            }

            window.setTimeout(run, 0);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        patchHistoryNavigation();

        window.addEventListener(HISTORY_NAVIGATION_EVENT, scheduleInit);
        window.addEventListener('popstate', scheduleInit);
        window.addEventListener('pageshow', scheduleInit);

        const menuFlag = profile.menuRegisteredFlag || '__contentBlockerMenuRegistered';
        if (!globalThis[menuFlag]) {
            gm.registerMenuCommand(profile.labels?.settingsTitle || '⚙️ 屏蔽设置', settingsDialog.show);
            globalThis[menuFlag] = true;
        }
    }

    const EMPTY_ITEM_DATA = Object.freeze({
        titleText: '',
        categoryText: '',
        tagList: []
    });

    function normalizeText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function readText(element, selector) {
        if (!element || !selector) return '';
        const target = element.querySelector(selector);
        return normalizeText(target?.getAttribute?.('title') || target?.textContent || '');
    }

    function readTextList(element, selector) {
        if (!element || !selector) return [];
        return uniqueTexts(
            Array.from(element.querySelectorAll(selector))
                .map((node) => normalizeText(node.getAttribute?.('data-tag-name') || node.getAttribute?.('title') || node.textContent))
        );
    }

    function uniqueTexts(values) {
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

    function splitMetaText(value) {
        return uniqueTexts(
            normalizeText(value)
                .split(/[·|/]/)
                .map((part) => part.trim())
        );
    }

    function getFirstNonEmpty(...values) {
        return values.map(normalizeText).find(Boolean) || '';
    }

    function collectElements(root, selector) {
        const scope = root || document;
        return Array.from(scope.querySelectorAll(selector));
    }

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

    const LINUX_DO_PROFILE = Object.freeze({
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

    bootContentBlocker(LINUX_DO_PROFILE);

})();
