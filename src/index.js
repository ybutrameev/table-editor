import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import getStore from 'Store';

import TableEditor from 'Component/TableEditor';

import 'Style/main';

class App extends React.Component {
    render() {
        return (
            <Provider store={ getStore() }>
                <TableEditor />
            </Provider>
        );
    }
}

render(<App />, document.getElementById("root"));
