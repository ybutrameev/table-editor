import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { addNewTable, editTableRow } from 'Store/Table/Table.action';
import TableEditorComponent from './TableEditor.component';
import { showPopup } from 'Store/Popup/Popup.action';
import { TABLE_EDIT_POPUP } from './TableEditor.config';

export const mapStateToProps = (state) => ({
    tables: state.TableReducer.tables,
    popupPayload: state.PopupReducer.popupPayload
});

export const mapDispatchToProps = (dispatch) => ({
    addNewTable: (rows) => dispatch(addNewTable(rows)),
    hidePopup: () => dispatch(showPopup('', {})),
    editTableRow: (tableId, rowId, row) => dispatch(editTableRow(tableId, rowId, row))
});

export class TableEditorContainer extends PureComponent {
    containerFunctions = {
        copyTable: this.copyTable.bind(this),
        handleFormSubmit: this.handleFormSubmit.bind(this)
    };

    copyTable(tableId) {
        const { addNewTable, tables } = this.props;

        const { rows } = tables[tableId];

        addNewTable(rows);
    }

    handleFormSubmit(fields) {
        const { editTableRow, hidePopup, popupPayload } = this.props;
        const { name_edit: name, surname_edit: surname, city_edit: city } = fields;
        const row = { name, surname, city };

        const { tableId, rowId } = popupPayload[TABLE_EDIT_POPUP];

        editTableRow(tableId, rowId, row);
        hidePopup();
    }

    render() {
        return (
            <TableEditorComponent
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEditorContainer);
