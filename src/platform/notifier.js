import { NOTIFIER_STYLE_ID, SETTINGS_NOTIFICATION_PANEL_ID } from '../shared/constants.js';
import { ensureStyle } from './styles.js';

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

export function createNotifier() {
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
