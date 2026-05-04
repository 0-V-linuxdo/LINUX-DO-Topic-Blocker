import { buildMetadataBlock } from './src/meta.js';
import { LDCSTORE_PROFILE, LINUX_DO_PROFILE } from './src/sites/profiles.js';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));

export function createRollupConfig({
    profile = LINUX_DO_PROFILE,
    inputFile = resolve(currentDir, profile.entryFile),
    outputFile = resolve(currentDir, profile.distFile)
} = {}) {
    return {
        input: inputFile,
        treeshake: false,
        output: {
            file: outputFile,
            format: 'iife',
            name: profile.id === 'ldcstore' ? 'LdcstoreContentBlocker' : 'LinuxDoTopicBlocker',
            banner: buildMetadataBlock(profile)
        }
    };
}

export function createRollupConfigs() {
    return [
        createRollupConfig({ profile: LINUX_DO_PROFILE }),
        createRollupConfig({ profile: LDCSTORE_PROFILE })
    ];
}

export default createRollupConfigs();

