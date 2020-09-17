export const SHOW_POPUP = 'SHOW_POPUP';

export const showPopup = (overlayKey, payload) => ({
    type: SHOW_POPUP,
    overlayKey,
    payload: { [overlayKey]: payload }
});
