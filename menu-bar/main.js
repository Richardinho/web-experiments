function MenuBarComponent (rootEl) {

    this.rootEl = rootEl;
    this._disableAnchorTabbing();

    this.rootEl.addEventListener('keydown', this.handleKeyUp.bind(this));

    this._resetActiveLink();

    this.bindMouseEventsToMenuItems();
}

MenuBarComponent.prototype = {

    bindMouseEventsToMenuItems : function () {

        let menuItems = Array.from(this.rootEl.querySelectorAll('[role=menuitem]'));

        menuItems.forEach(menuItem => {

            menuItem.addEventListener('mouseenter', (event) => {

                if(menuItem.matches('[aria-haspopup=true]')) {
                    menuItem.setAttribute('aria-expanded', true);
                }

            });

            menuItem.addEventListener('mouseleave', (event) => {

                if(menuItem.matches('[aria-haspopup=true]')) {
                    menuItem.setAttribute('aria-expanded', false);
                }
                this._resetActiveLink();

            });
        });
    },

    handleKeyUp : function (event) {
        let controllingMenuItem = event.target.closest('[role=menuitem]');
        let nextControllingMenuItem;
        let orientation = this._getOrientation(controllingMenuItem);
        switch(event.key) {
            case 'Tab' :
                // happens when we tab away
                this._close();
                break;
            case 'ArrowDown' :
                if(orientation === 'vertical') {
                    this._moveToNext(controllingMenuItem);
                } else {
                    this._moveForwards(controllingMenuItem);
                }
                break;

            case 'ArrowUp' :
                if(orientation === 'vertical') {
                    this._moveToPrevious(controllingMenuItem);
                } else {
                    this._moveBack(controllingMenuItem);
                }
                break;

            case 'ArrowRight' :
                if(orientation === 'horizontal') {
                    this._moveToNext(controllingMenuItem);
                } else {
                    this._moveForwards(controllingMenuItem);
                }
                break;

            case 'ArrowLeft' :
                if(orientation === 'horizontal') {
                    this._moveToPrevious(controllingMenuItem);
                } else {
                    this._moveBack(controllingMenuItem);
                }
                break;

            case 'Enter' :
                break;
            case ' ':
                break;

            case 'Escape':

                break;

        }
    },

    _close : function () {

        this.rootEl.querySelectorAll('[aria-expanded=true]').forEach(menu => {
            menu.setAttribute('aria-expanded', false);
        });
        this._resetActiveLink();

    },

    _resetActiveLink : function () {
        this._setNewActiveLink(this.rootEl.querySelector('[role=menuitem] a'));

    },

    _moveToPrevious : function (controllingMenuItem) {

        nextControllingMenuItem = controllingMenuItem.previousElementSibling;

        if (nextControllingMenuItem) {
            this._moveFocus(controllingMenuItem.querySelector('a'), nextControllingMenuItem);
        } else {
            // go back to first menu item
            this._moveFocus(controllingMenuItem.querySelector('a'), controllingMenuItem.parentNode.lastElementChild);
        }
    },

    _moveToNext : function (controllingMenuItem) {

        nextControllingMenuItem = controllingMenuItem.nextElementSibling;

        if (nextControllingMenuItem) {
            this._moveFocus(controllingMenuItem.querySelector('a'), nextControllingMenuItem);
        } else {
            // go back to first menu item
            this._moveFocus(controllingMenuItem.querySelector('a'), controllingMenuItem.parentNode.firstElementChild);
        }
    },

    _moveForwards : function (controllingMenuItem) {

        if (controllingMenuItem.matches('[aria-haspopup=true]')) {

            controllingMenuItem.setAttribute('aria-expanded', true);
            nextControllingMenuItem = controllingMenuItem.querySelector('[role=menu] [role=menuitem]');

            if(nextControllingMenuItem) {
                this._moveFocus(controllingMenuItem.querySelector('a'), nextControllingMenuItem);
            }
        }
    },

    _moveBack : function (controllingMenuItem) {

        let nextControllingMenuItem = controllingMenuItem.parentNode.closest('[role=menuitem]');

        if (nextControllingMenuItem) {
            nextControllingMenuItem.setAttribute('aria-expanded', false);
            this._moveFocus(controllingMenuItem.querySelector('a'), nextControllingMenuItem);
        }
    },

    _moveFocus : function (oldAnchor, newMenuItem) {
        let newAnchor = newMenuItem.querySelector('a');
        this._setNewActiveLink(newAnchor);
        newAnchor.focus();
    },

    _setNewActiveLink : function (newLink) {

        if(this.activeLink) {
            this._disableTabbing(this.activeLink);
        }
        this._enableTabbing(newLink);
        this.activeLink = newLink;
    },
    _disableAnchorTabbing : function () {

        this.rootEl.querySelectorAll('a').forEach(this._disableTabbing, this);
    },

    /*

        This should apply to only a single element at a time within the component so that it can be reached
        from outside of the component.
    */
    _enableTabbing : function (el) {
        el.tabIndex = 0;
    },

    _disableTabbing : function (el) {

        el.tabIndex = '-1';
    },

    _getOrientation : function (menuItem) {

        return menuItem.closest('[data-orientation]').dataset.orientation;
    }

};

let menuEl = document.getElementById('my-menu');


new MenuBarComponent(menuEl);







