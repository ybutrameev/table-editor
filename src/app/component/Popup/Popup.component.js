import './Popup.style';

import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import ClickOutside from 'Component/ClickOutside';
import Overlay from 'Component/Overlay/Overlay.component';

import { ESCAPE_KEY } from './Popup.config';

export default class Popup extends Overlay {
    static propTypes = {
        ...Overlay.propTypes,
        clickOutside: PropTypes.bool,
        title: PropTypes.string
    };

    static defaultProps = {
        ...Overlay.defaultProps,
        clickOutside: true,
        title: ''
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    onVisible() {
        const { onVisible } = this.props;
        this.freezeScroll();
        this.overlayRef.current.focus();

        window.addEventListener('popstate', this.hidePopUp);

        window.history.pushState(
            {
                popupOpen: true
            },
            '',
            location.pathname
        );

        onVisible();
    }

    onHide() {
        const { onHide } = this.props;
        window.removeEventListener('popstate', this.hidePopUp);

        this.unfreezeScroll();

        onHide();
    }

    hidePopUp = () => {
        const { hideActiveOverlay } = this.props;
        const isVisible = this.getIsVisible();

        if (isVisible) {
            hideActiveOverlay();
        }
    };

    // Same with click outside
    handleClickOutside = () => {
        const { clickOutside } = this.props;
        if (!clickOutside) {
            return;
        }
        this.hidePopUp();
    };

    handleKeyDown = (e) => {
        switch (e.keyCode) {
        case ESCAPE_KEY:
            this.hidePopUp();
            break;
        default:
            break;
        }
    };

    renderTitle() {
        const { title } = this.props;
        if (!title) {
            return null;
        }

        return (
            <h3 block="Popup" elem="Heading">
                { title }
            </h3>
        );
    }

    renderContent() {
        const { children } = this.props;
        const isVisible = this.getIsVisible();

        if (!isVisible) {
            return null;
        }

        return (
            <ClickOutside onClick={ this.handleClickOutside }>
                <div block="Popup" elem="Content">
                    <header block="Popup" elem="Header">
                        { this.renderTitle() }
                        <button
                          block="Popup"
                          elem="CloseBtn"
                          aria-label="Close"
                          onClick={ this.hidePopUp }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#ffffff" viewBox="1.994 1.99 12 12"><path paintOrder="stroke fill markers" fillRule="evenodd" d="M10.246 7.99l3.377-3.377a1.277 1.277 0 0 0 0-1.801l-.45-.45a1.277 1.277 0 0 0-1.802 0L7.994 5.739 4.616 2.362a1.277 1.277 0 0 0-1.8 0l-.451.45a1.278 1.278 0 0 0 0 1.801L5.742 7.99l-3.377 3.378a1.278 1.278 0 0 0 0 1.8l.45.45a1.277 1.277 0 0 0 1.801 0l3.378-3.376 3.377 3.377a1.278 1.278 0 0 0 1.802 0l.45-.45a1.277 1.277 0 0 0 0-1.801L10.246 7.99z"/></svg>
                        </button>
                    </header>
                    { children }
                </div>
            </ClickOutside>
        );
    }

    render() {
        const { mix, areOtherOverlaysOpen } = this.props;
        const isVisible = this.getIsVisible();

        return createPortal(
            <div
              ref={ this.overlayRef }
              block="Popup"
              mods={ { isVisible, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix.mods, isVisible } } }
            >
                { this.renderContent() }
            </div>,
            document.body
        );
    }
}
