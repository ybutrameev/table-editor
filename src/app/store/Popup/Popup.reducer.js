
import { SHOW_POPUP } from './Popup.action';

export const initialState = {
    popupPayload: {}
};

export const PopupReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
    case SHOW_POPUP:
        return { ...state, popupPayload: payload };
    default:
        return state;
    }
};

export default PopupReducer;
