import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';

import { createRollupConfig, createRollupConfigs } from '../rollup.config.mjs';
import { buildMetadataBlock } from '../src/meta.js';
import { LDCSTORE_PROFILE, LINUX_DO_PROFILE } from '../src/sites/profiles.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(currentDir, '..');

test('build emits a single installable userscript bundle without mutating the legacy archive', async () => {
    const legacyFile = resolve(repoRoot, 'legacy/[LINUX DO] 🚫 屏蔽含有指定：类别、标签和标题关键词 的话题.user.js');
    const legacyBeforeBuild = existsSync(legacyFile) ? readFileSync(legacyFile, 'utf8') : null;
    const tempDir = mkdtempSync(join(tmpdir(), 'linux-do-topic-blocker-'));
    const outputFile = resolve(tempDir, 'linux-do-topic-blocker.user.js');
    const config = createRollupConfig({ outputFile });

    try {
        const bundle = await rollup({
            input: config.input,
            treeshake: config.treeshake
        });

        try {
            await bundle.write(config.output);
        } finally {
            await bundle.close();
        }

        assert.equal(existsSync(outputFile), true);
        assert.equal(existsSync(legacyFile), true);

        const bundleSource = readFileSync(outputFile, 'utf8');
        const legacyAfterBuild = readFileSync(legacyFile, 'utf8');
        const metadataBlocks = bundleSource.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/g) || [];

        assert.equal(metadataBlocks.length, 1);
        assert.equal(metadataBlocks[0], buildMetadataBlock());
        assert.equal(/\bimport\s+.+\s+from\b/.test(bundleSource), false);
        assert.equal(/\bexport\s+(const|function|class|\{|\*)/.test(bundleSource), false);
        assert.match(bundleSource, /GM_getValue/);
        assert.match(bundleSource, /GM_setValue/);
        assert.match(bundleSource, /GM_registerMenuCommand/);
        assert.match(bundleSource, /window\.triggerContentFilter/);
        assert.equal(legacyAfterBuild, legacyBeforeBuild);
    } finally {
        rmSync(tempDir, { recursive: true, force: true });
    }
});

test('dual build emits Linux DO and LDC Store userscripts with isolated metadata', async () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'content-blocker-dual-'));
    const configs = createRollupConfigs().map((config) => ({
        ...config,
        output: {
            ...config.output,
            file: resolve(tempDir, config.output.file.endsWith('ldcstore-content-blocker.user.js')
                ? 'ldcstore-content-blocker.user.js'
                : 'linux-do-topic-blocker.user.js')
        }
    }));

    try {
        for (const config of configs) {
            const bundle = await rollup({
                input: config.input,
                treeshake: config.treeshake
            });

            try {
                await bundle.write(config.output);
            } finally {
                await bundle.close();
            }
        }

        const linuxBundle = readFileSync(resolve(tempDir, 'linux-do-topic-blocker.user.js'), 'utf8');
        const ldcstoreBundle = readFileSync(resolve(tempDir, 'ldcstore-content-blocker.user.js'), 'utf8');
        const linuxMetadata = linuxBundle.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/g) || [];
        const ldcstoreMetadata = ldcstoreBundle.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/g) || [];

        assert.equal(linuxMetadata.length, 1);
        assert.equal(ldcstoreMetadata.length, 1);
        assert.equal(linuxMetadata[0], buildMetadataBlock(LINUX_DO_PROFILE));
        assert.equal(ldcstoreMetadata[0], buildMetadataBlock(LDCSTORE_PROFILE));
        assert.notEqual(LDCSTORE_PROFILE.metadata.icon, LINUX_DO_PROFILE.metadata.icon);
        assert.match(ldcstoreMetadata[0], /@icon\s+data:image\/svg\+xml;base64,/);
        assert.match(ldcstoreMetadata[0], /https:\/\/ldcstore\.com\/\*/);
        assert.doesNotMatch(ldcstoreMetadata[0], /https:\/\/linux\.do\/\*/);
        assert.equal(/\bimport\s+.+\s+from\b/.test(linuxBundle), false);
        assert.equal(/\bexport\s+(const|function|class|\{|\*)/.test(linuxBundle), false);
        assert.equal(/\bimport\s+.+\s+from\b/.test(ldcstoreBundle), false);
        assert.equal(/\bexport\s+(const|function|class|\{|\*)/.test(ldcstoreBundle), false);
    } finally {
        rmSync(tempDir, { recursive: true, force: true });
    }
});
