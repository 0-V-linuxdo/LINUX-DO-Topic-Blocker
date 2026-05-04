export function createSettingsImportExportController({
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
