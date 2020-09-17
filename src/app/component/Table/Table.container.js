
import { connect } from 'react-redux';

import TableComponent from './Table.component';

import { removeTable, removeTableRow } from 'Store/Table/Table.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { TABLE_EDIT_POPUP } from 'Component/TableEditor/TableEditor.config';

export const mapStateToProps = (state) => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    tables: state.TableReducer.tables
});

export const mapDispatchToProps = (dispatch) => ({
    removeTable: (id) => dispatch(removeTable(id)),
    removeTableRow: (tableId, rowId) => dispatch(removeTableRow(tableId, rowId)),
    showPopup: (payload) => dispatch(showPopup(TABLE_EDIT_POPUP, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
