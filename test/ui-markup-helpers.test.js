import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSettingsDialogMarkup, escapeHtml } from '../src/features/settings-dialog-markup.js';
import { formatSearchFilterDisplayValue } from '../src/features/search-filter-dom.js';

test('buildSettingsDialogMarkup escapes keyword values and profile labels', () => {
    const markup = buildSettingsDialogMarkup({
        blockedTitles: ['<title>', '"quoted"'],
        blockedCategories: ['cat & dog'],
        blockedTags: ['tag > value'],
        summaryScriptEnabled: true
    }, {
        labels: {
            settingsTitle: '设置 <script>',
            titleTab: '标题 & 名称'
        },
        features: {
            summaryToggle: true
        }
    });

    assert.match(markup, /设置 &lt;script&gt;/);
    assert.match(markup, /标题 &amp; 名称/);
    assert.match(markup, /&lt;title&gt;, &quot;quoted&quot;/);
    assert.match(markup, /cat &amp; dog/);
    assert.match(markup, /tag &gt; value/);
    assert.match(markup, /data-content="importExport"/);
});

test('buildSettingsDialogMarkup respects profiles without the summary toggle', () => {
    const markup = buildSettingsDialogMarkup({
        blockedTitles: [],
        blockedCategories: [],
        blockedTags: [],
        summaryScriptEnabled: true
    }, {
        features: {
            summaryToggle: false
        }
    });

    assert.doesNotMatch(markup, /summaryScriptEnabledToggle/);
    assert.match(markup, /data-content="importExport"/);
});

test('escapeHtml covers regex note text passed through markup helpers', () => {
    assert.equal(
        escapeHtml('note: /<script>|"x"&\'y\'/'),
        'note: /&lt;script&gt;|&quot;x&quot;&amp;&#39;y&#39;/'
    );
});

test('formatSearchFilterDisplayValue flattens multiline filter text for compact display', () => {
    assert.equal(formatSearchFilterDisplayValue('alpha\nbeta\n/gamma/'), 'alpha beta /gamma/');
    assert.equal(formatSearchFilterDisplayValue(''), '');
});
