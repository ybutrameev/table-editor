
import { connect } from 'react-redux';

import OverlayComponent from './Overlay.component';

export const mapStateToProps = (state) => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen
});

export default connect(mapStateToProps)(OverlayComponent);
