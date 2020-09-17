import React, { PureComponent } from 'react';

import Form from 'Component/Form';
import Field from 'Component/Field';

import './AddTableForm.style';

class AddTableForm extends PureComponent {
    render() {
        const { handleFormSubmit, id } = this.props;

        return (
            <Form
              id={ id }
              key="sign-in"
              onSubmitSuccess={ fields => handleFormSubmit(fields) }
              mix={ { block: 'AddTableForm' } }
            >
                <div block="AddTableForm" elem="FieldsContainer">
                    <Field
                        type="text"
                        placeholder="Name"
                        id={ `name_${id}` }
                        name="name"
                        validation={ ['notEmpty'] }
                    />
                    <Field
                        type="text"
                        placeholder="Surname"
                        id={ `surname_${id}` }
                        name="surname"
                        validation={ ['notEmpty'] }
                    />
                    <Field
                        type="text"
                        placeholder="Age"
                        id={ `age_${id}` }
                        name="age"
                        validation={ ['notEmpty'] }
                    />
                    <Field
                        type="text"
                        placeholder="City"
                        id={ `city_${id}` }
                        name="city"
                        validation={ ['notEmpty'] }
                    />
                </div>
                <button
                  block="Button"
                  mix={ { block: 'TableEditor', elem: 'Button' } }
                >
                    Add
                </button>
            </Form>
        );
    }
}

export default AddTableForm;
