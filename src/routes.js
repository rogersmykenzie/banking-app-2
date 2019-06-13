import React from 'react';
import Register from './components/Register';
import {Route, Switch} from 'react-router-dom';

export default (
    <Switch>
        <Route path='/register' component={Register} />
    </Switch>
)
