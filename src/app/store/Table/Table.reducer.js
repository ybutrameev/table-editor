
import {
    ADD_NEW_TABLE,
    REMOVE_TABLE,
    ADD_NEW_TABLE_ROW,
    REMOVE_TABLE_ROW,
    EDIT_TABLE_ROW
} from './Table.action';

import { TABLE_ROW_COUNT } from 'Component/TableEditor/TableEditor.config';

export const initialState = {
    tables: []
};

export const TableReducer = (state = initialState, action) => {
    const { type, tableId, rowId, row = {} } = action;

    switch (type) {
    case ADD_NEW_TABLE:
        const { rows = {} } = action;

        return { 
            ...state,
            tables: [ ...state.tables, { rows } ]
        };
    case REMOVE_TABLE:
        const { id } = action;

        const reducedTables = state.tables.reduce((acc, curr, i) => {
            if (i !== id) {
                acc.push(curr);
            }

            return acc;
        }, []);

        return { 
            ...state,
            tables: reducedTables
        };
    case ADD_NEW_TABLE_ROW:
        const currentTable = state.tables[state.tables.length - 1] || {};

        if (!Object.values(currentTable).length || currentTable.rows.length >= TABLE_ROW_COUNT) {
            return { 
                ...state,
                tables: [ ...state.tables, { rows: [ row ] } ]
            };
        }

        const modifiedTables = state.tables.map((item, i) => {
            if (i === state.tables.length - 1) {
                return { ...item, rows: [ ...item.rows, row ] }
            }

            return item;
        });

        return {
            ...state,
            tables: modifiedTables
        };
    case REMOVE_TABLE_ROW:
        const tables = state.tables.map((item, i) => {
            if (i === tableId) {
                const newRows = [ ...item.rows ];
                newRows.splice(rowId, 1);

                return { ...item, rows: newRows }
            }

            return item;
        });

        return {
            ...state,
            tables
        };
    case EDIT_TABLE_ROW:
        const {
            name,
            surname,
            city
        } = row;

        return {
            ...state,
            tables: state.tables.map((item, i) => {
                if (i === tableId) {
                    const newRows = [ ...item.rows ];
    
                    newRows[rowId] = {
                        ...newRows[rowId],
                        name,
                        surname,
                        city
                    };
    
                    return { ...item, rows: newRows }
                }
    
                return item;
            })
        };
    default:
        return state;
    }
};

export default TableReducer;
