export function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#39;');
}

export function buildSettingsDialogMarkup(settings, profile = {}) {
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
