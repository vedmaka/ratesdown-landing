import Collapsible from './includes/collapsibles';

const collapsibles = document.querySelectorAll('.collapsible');
if( collapsibles.length ) {
    for (let element of collapsibles) {
        new Collapsible(element, 'faq-open');
    }
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
if( mobileMenuButton ) {
    const menuBlock = document.getElementById('menu-mobile');
    new Collapsible(mobileMenuButton, 'menu--open', menuBlock);
    new Collapsible(mobileMenuButton, 'menu-button--active');
}