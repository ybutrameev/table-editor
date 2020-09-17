import { SHOW_POPUP } from 'Store/Popup/Popup.action';

import {
    HIDE_ACTIVE_OVERLAY,
    TOGGLE_OVERLAY
} from './Overlay.action';

export const initialState = {
    activeOverlay: '',
    areOtherOverlaysOpen: false
};

export const OverlayReducer = (state = initialState, action) => {
    const { overlayKey } = action;
    const {
        activeOverlay: prevActiveOverlay
    } = state;

    switch (action.type) {
    case TOGGLE_OVERLAY:
    case SHOW_POPUP:
        const activeOverlay = prevActiveOverlay === overlayKey ? '' : overlayKey;
        const areOtherOverlaysOpen = prevActiveOverlay !== '';

        return {
            ...state,
            activeOverlay,
            areOtherOverlaysOpen
        };

    case HIDE_ACTIVE_OVERLAY:
        return {
            ...state,
            activeOverlay: '',
            areOtherOverlaysOpen: false
        };

    default:
        return state;
    }
};

export default OverlayReducer;
