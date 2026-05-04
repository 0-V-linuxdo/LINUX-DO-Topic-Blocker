import { LINUX_DO_PROFILE } from './sites/linux-do-profile.js';

export function buildMetadataBlock(profile = LINUX_DO_PROFILE) {
    const metadata = profile.metadata || LINUX_DO_PROFILE.metadata;
    const matches = Array.isArray(metadata.matches) && metadata.matches.length > 0
        ? metadata.matches
        : ['https://linux.do/*'];

    return [
        '// ==UserScript==',
        `// @name         ${metadata.name}`,
        `// @namespace    ${metadata.namespace}`,
        `// @description  ${metadata.description}`,
        '//',
        `// @version      ${metadata.version}`,
        `// @update-log   ${metadata.updateLog}`,
        '//',
        ...matches.map((match) => `// @match        ${match}`),
        '//',
        '// @grant        GM_setValue',
        '// @grant        GM_getValue',
        '// @grant        GM_registerMenuCommand',
        '// @grant        GM_addStyle',
        '//',
        `// @icon         ${metadata.icon}`,
        '// ==/UserScript=='
    ].join('\n');
}

export const METADATA_BLOCK = buildMetadataBlock();
