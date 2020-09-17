import {
    combineReducers,
    createStore
} from 'redux';

import OverlayReducer from 'Store/Overlay/Overlay.reducer';
import PopupReducer from 'Store/Popup/Popup.reducer';
import TableReducer from 'Store/Table/Table.reducer';

export const reducers = {
    OverlayReducer,
    PopupReducer,
    TableReducer
};

const store = createStore(combineReducers({ ...reducers }));

export default function getStore() {
    return store;
}
