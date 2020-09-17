/* eslint-disable react/no-unused-prop-types */


import './Overlay.style';

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { createPortal } from 'react-dom';

import { ChildrenType, MixType } from 'Type/Common';
import isMobile from 'Util/Mobile';

export default class Overlay extends PureComponent {
    static propTypes = {
        mix: MixType,
        id: PropTypes.string.isRequired,
        onVisible: PropTypes.func,
        onHide: PropTypes.func,
        activeOverlay: PropTypes.string.isRequired,
        areOtherOverlaysOpen: PropTypes.bool.isRequired,
        isStatic: PropTypes.bool,
        isRenderInPortal: PropTypes.bool,
        children: ChildrenType
    };

    static defaultProps = {
        mix: {},
        children: [],
        onVisible: () => {},
        isStatic: false,
        onHide: () => {},
        isRenderInPortal: true
    };

    overlayRef = createRef();

    componentDidUpdate(prevProps) {
        const prevWasVisible = this.getIsVisible(prevProps);
        const isVisible = this.getIsVisible();
        if (isVisible && !prevWasVisible) {
            this.onVisible();
        }
        if (!isVisible && prevWasVisible) {
            this.onHide();
        }
    }

    onVisible() {
        const { onVisible, isStatic } = this.props;
        if (isStatic) {
            return;
        }
        if (isMobile.any()) {
            this.freezeScroll();
        }
        this.overlayRef.current.focus();
        onVisible();
    }

    onHide() {
        const { onHide, isStatic } = this.props;
        if (isStatic) {
            return;
        }
        if (isMobile.any()) {
            this.unfreezeScroll();
        }
        onHide();
    }

    getIsVisible(props = this.props) {
        const { id, activeOverlay, isStatic } = props;
        return isStatic || id === activeOverlay;
    }

    freezeScroll() {
        this.YoffsetWhenScrollDisabled = window.pageYOffset || document.body.scrollTop;
        document.documentElement.classList.add('scrollDisabled');
        document.body.style.marginTop = `${-this.YoffsetWhenScrollDisabled}px`;
    }

    unfreezeScroll() {
        document.documentElement.classList.remove('scrollDisabled');
        document.body.style.marginTop = 0;
        window.scrollTo(0, this.YoffsetWhenScrollDisabled);
    }

    renderInMobilePortal(content) {
        const { isStatic, isRenderInPortal } = this.props;

        if (!isStatic && isMobile.any() && isRenderInPortal) {
            return createPortal(content, document.body);
        }

        return content;
    }

    render() {
        const {
            children,
            mix,
            areOtherOverlaysOpen,
            isStatic
        } = this.props;

        const isVisible = this.getIsVisible();

        return this.renderInMobilePortal(
            <div
              block="Overlay"
              ref={ this.overlayRef }
              mods={ { isVisible, isStatic, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix.mods, isVisible } } }
            >
                { children && children }
            </div>
        );
    }
}
