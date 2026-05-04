export function setBlockCheckOptionChecked(optionElement, checked) {
    if (!optionElement) return;
    optionElement.classList.toggle('is-checked', Boolean(checked));
    optionElement.setAttribute('aria-checked', checked ? 'true' : 'false');
}

export function toggleBlockCheckOption(optionElement) {
    const nextChecked = optionElement.getAttribute('aria-checked') !== 'true';
    setBlockCheckOptionChecked(optionElement, nextChecked);
    optionElement.dispatchEvent(new CustomEvent('block-option-change', { bubbles: true }));
}

export function createBlockCheckOption(value, textValue = value, checked = false) {
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

export function createBlockOptionGroup(options, ariaLabel) {
    const container = document.createElement('div');
    container.className = 'block-dialog-target-options';
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', ariaLabel);
    options.forEach((option) => {
        container.appendChild(createBlockCheckOption(option, option));
    });
    return container;
}

export function getCheckedOptionValues(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll('.block-dialog-check[aria-checked="true"]'))
        .map((optionElement) => optionElement.dataset.value || '');
}
