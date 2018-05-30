export default class Collapsible {

    constructor(element, toggleClassName = 'open', targetElement = null) {
        this._element = element;
        this._toggleClassName = toggleClassName;
        this._targetElement = targetElement;
        this._bind();
    }

    _bind() {
        this._element.addEventListener('click', (e) => this._onActivate(e));
        this._element.addEventListener('touchend', (e) => this._onActivate(e));
    }

    _onActivate(event) {
        event.preventDefault();
        let classElement = this._element;
        if( this._targetElement !== null ) {
            classElement = this._targetElement;
        }
        classElement.classList.toggle(this._toggleClassName);
    }

};