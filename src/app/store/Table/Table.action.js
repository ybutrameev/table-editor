export const ADD_NEW_TABLE = 'ADD_NEW_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';
export const ADD_NEW_TABLE_ROW = 'ADD_NEW_TABLE_ROW';
export const REMOVE_TABLE_ROW = 'REMOVE_TABLE_ROW';
export const EDIT_TABLE_ROW = 'EDIT_TABLE_ROW';

export const addNewTable = (rows) => ({
    type: ADD_NEW_TABLE,
    rows
});

export const removeTable = (id) => ({
    type: REMOVE_TABLE,
    id
});

export const addNewTableRow = (row) => ({
    type: ADD_NEW_TABLE_ROW,
    row
});

export const removeTableRow = (tableId, rowId) => ({
    type: REMOVE_TABLE_ROW,
    tableId,
    rowId
});

export const editTableRow = (tableId, rowId, row) => ({
    type: EDIT_TABLE_ROW,
    tableId,
    rowId,
    row
});
