export default class Collapsible {

    constructor(element, toggleClassName = 'open') {
        this._element = element;
        this._toggleClassName = toggleClassName;
        this._bind();
    }

    _bind() {
        this._element.addEventListener('click', (e) => this._onActivate(e));
        this._element.addEventListener('touchend', (e) => this._onActivate(e));
    }

    _onActivate(event) {
        event.preventDefault();
        this._element.classList.toggle(this._toggleClassName);
    }

};