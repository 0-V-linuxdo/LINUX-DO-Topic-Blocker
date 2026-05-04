import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LDCSTORE_PROFILE, LINUX_DO_PROFILE } from '../src/sites/profiles.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(currentDir, '..');

test('LDC Store visible labels follow the modular Linux DO profile wording', () => {
    const visibleLabelKeys = [
        'settingsTitle',
        'titleTab',
        'categoryTab',
        'tagTab',
        'title',
        'titleKeyword',
        'category',
        'tag',
        'titleKeywordTextarea',
        'categoryTextarea',
        'tagTextarea',
        'titleRegexLabel',
        'categoryRegexLabel',
        'tagRegexLabel'
    ];

    visibleLabelKeys.forEach((key) => {
        assert.equal(LDCSTORE_PROFILE.labels[key], LINUX_DO_PROFILE.labels[key]);
    });

    const blockControlsSource = readFileSync(resolve(repoRoot, 'src/features/block-controls.js'), 'utf8');
    assert.equal(blockControlsSource.includes("getDialogLabel('titleKeyword', '关键词')"), false);
    assert.equal(blockControlsSource.includes("getLabel('titleKeyword', '关键词')"), false);
});
