import Collapsible from './includes/collapsibles';

const collapsibles = document.querySelectorAll('.collapsible');
if( collapsibles.length ) {
    for (let element of collapsibles) {
        new Collapsible(element, 'faq-open');
    }
}