import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { addNewTable, addNewTableRow } from 'Store/Table/Table.action';
import AddTableForm from './AddTableForm.component';

export const mapStateToProps = (state) => ({
});

export const mapDispatchToProps = (dispatch) => ({
    addNewTable: (rows) => dispatch(addNewTable(rows)),
    addNewTableRow: (row, table) => dispatch(addNewTableRow(row, table))
});

export class AddTableFormContainer extends PureComponent {
    containerFunctions = {
        handleFormSubmit: this.handleFormSubmit.bind(this)
    };

    handleFormSubmit(fields) {
        const { addNewTableRow } = this.props;

        addNewTableRow(fields);
    }

    render() {
        return (
            <AddTableForm
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTableFormContainer);
