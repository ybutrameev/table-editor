import './TableEditor.style';

import React, { PureComponent } from 'react';

import Popup from 'Component/Popup';
import AddTableForm from 'Component/AddTableForm';
import Table from 'Component/Table';
import Form from 'Component/Form';
import Field from 'Component/Field';
import { TABLE_EDIT_POPUP } from './TableEditor.config';

export default class TableEditor extends PureComponent {
    state = {
        tables: [],
        isCheckboxChecked: false
    };

    setAgreement = () => {
        this.setState(({ isCheckboxChecked: oldIsCheckboxChecked }) => ({
            isCheckboxChecked: !oldIsCheckboxChecked
        }));
    };

    copyTable = (tableId) => {
        const { copyTable } = this.props;

        copyTable(tableId);
    };

    renderTables() {
        const { tables } = this.props;

        const tablesArray = tables.map((table, i) =>
            <Table table={ table } id={ i } copyTable={ this.copyTable } />
        );

        return (
            <div block="TableEditor" elem="TableContainer">
                { tablesArray }
            </div>
        );
    };

    renderAddNewTableForms() {
        return (
            <div block="TableEditor" elem="FormContainer">
                { new Array(2).fill(null).map((_, i) => <AddTableForm id={ i } /> ) }
            </div>
        );
    }

    renderPopup() {
        const { isCheckboxChecked } = this.state;
        const { handleFormSubmit } = this.props;

        return (
            <Popup
              id={ TABLE_EDIT_POPUP }
              clickOutside={ false }
              mix={ { block: 'TableEditPopup' } }
            >
                <div block="TableEditor" elem="PopupContent">
                    <Form
                      id="popup-form"
                      key="sign-in"
                      onSubmitSuccess={ fields => handleFormSubmit(fields) }
                      mix={ { block: 'TableEditPopup', elem: 'PopupForm' } }
                    >
                        <div block="TableEditor" elem="FieldsContainer">
                            <Field
                              type="text"
                              placeholder="Name"
                              id="name_edit"
                              name="name_edit"
                              validation={ ['notEmpty'] }
                            />
                            <Field
                              type="text"
                              placeholder="Surname"
                              id="surname_edit"
                              name="surname_edit"
                              validation={ ['notEmpty'] }
                            />
                            <Field
                              type="text"
                              placeholder="City"
                              id="city_edit"
                              name="city_edit"
                              validation={ ['notEmpty'] }
                            />
                        </div>
                        <div block="TableEditor" elem="BottomContainer">
                            <Field
                              id="agree"
                              name="agree"
                              type="checkbox"
                              value="agree"
                              label="Totally Agree"
                              checked={ isCheckboxChecked }
                              onChange={ this.setAgreement }
                            />
                            <button
                              block="Button"
                              mix={ { block: 'TableEditor', elem: 'Button' } }
                              disabled={ !isCheckboxChecked }
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                </div>
            </Popup>
        );
    }


    render() {
        return (
            <div block="TableEditor">
                { this.renderAddNewTableForms() }
                { this.renderTables() }
                { this.renderPopup() }
            </div>
        );
    }
}
