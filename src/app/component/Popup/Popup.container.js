
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';

import Popup from './Popup.component';

export const mapStateToProps = (state) => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    payload: state.PopupReducer.popupPayload
});

export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

export class PopupContainer extends PureComponent {
    static propTypes = {
        payload: PropTypes.shape({}).isRequired,
        activeOverlay: PropTypes.string.isRequired,
        onVisible: PropTypes.func
    };

    static defaultProps = {
        onVisible: () => {}
    };

    containerFunctions = {
        onVisible: this.onVisible.bind(this)
    };

    onVisible() {
        const { onVisible } = this.props;

        onVisible();
    }

    containerProps = () => ({
        title: this._getPopupTitle()
    });

    _getPopupTitle() {
        const { payload, activeOverlay } = this.props;
        const { title } = payload[activeOverlay] || {};
        return title;
    }

    render() {
        return (
            <Popup
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
