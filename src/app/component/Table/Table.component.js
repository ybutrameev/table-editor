import './Table.style';

import React, { PureComponent } from 'react';
import { TABLE_HEADINGS } from 'Component/TableEditor/TableEditor.config';

export default class Table extends PureComponent {
    renderHeadingRow() {
        return (
            <tr block="Table" elem="Row" mods={ { heading:true } } >
                { TABLE_HEADINGS.map((heading, i) => this.renderHeadingColumn(heading, i) ) }
                { this.renderHeadingColumn() }
            </tr>
        )
    }

    renderHeadingColumn(heading, id) {
        return (
            <th block="Table" elem="Column" mods={ { heading: true } } key={ heading + id }>
                { heading }
            </th>
        );
    }

    renderRow(columns, id) {
        return (
            <tr block="Table" elem="Row" key={ id }>
                { Object.values(columns).map((value, i) => this.renderColumn(value, i) ) }
                { this.renderActionsColumn(id) }
            </tr>
        )
    }

    renderColumn(value, id) {
        return (
            <td block="Table" elem="Column" key={ value + id }>
                { value }
            </td>
        );
    }

    renderActionsColumn(rowId) {
        const { id: tableId, removeTableRow, showPopup } = this.props;
        const popupPayload = { title: 'Edit', tableId, rowId };

        return (
            <td block="Table" elem="ActionButtons">
                <button
                  block="Table"
                  elem="EditButton"
                  onClick={ () => showPopup(popupPayload) }
                >
                    Edit
                </button>
                <button
                  block="Table"
                  elem="DeleteButton"
                  onClick={ () => removeTableRow(tableId, rowId) }
                >
                    Delete
                </button>
            </td>
        );
    }

    renderActionButtons() {
        const { id: tableId, removeTable, copyTable } = this.props;

        return (
            <div block="Table" elem="ButtonsContainer">
                <button
                  block="Table"
                  elem="CopyButton"
                  mix={ { block: 'Button' } }
                  onClick={ () => copyTable(tableId) }
                >
                    Copy table
                </button>
                <button block="Table" elem="RemoveButton" onClick={ () => removeTable(tableId) }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#f04e34" viewBox="1.994 1.99 12 12"><path paintOrder="stroke fill markers" fillRule="evenodd" d="M10.246 7.99l3.377-3.377a1.277 1.277 0 0 0 0-1.801l-.45-.45a1.277 1.277 0 0 0-1.802 0L7.994 5.739 4.616 2.362a1.277 1.277 0 0 0-1.8 0l-.451.45a1.278 1.278 0 0 0 0 1.801L5.742 7.99l-3.377 3.378a1.278 1.278 0 0 0 0 1.8l.45.45a1.277 1.277 0 0 0 1.801 0l3.378-3.376 3.377 3.377a1.278 1.278 0 0 0 1.802 0l.45-.45a1.277 1.277 0 0 0 0-1.801L10.246 7.99z"/></svg>
                </button>
            </div>
        );
    }

    render() {
        const {
            table: { rows }
        } = this.props;
        
        return (
            <div block="Table">
                { this.renderActionButtons() }
                <table block="Table" elem="Container">
                    <thead>
                        { this.renderHeadingRow() }
                    </thead>
                    <tbody>
                        { rows.map((columns, i) => this.renderRow(columns, i)) }
                    </tbody>
                </table>
            </div>
        );
    }
}
