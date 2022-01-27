import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { SeatingAssignmentApp } from './seating/SeatingAssignmentApp';
import {configureAllStates} from "./states/States";
import './index.css';

// ========================================

const store = configureAllStates()

ReactDOM.render(
    <Provider store={store}>
        <SeatingAssignmentApp />
    </Provider>,
    document.getElementById('root')
);
