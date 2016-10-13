import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Home from './Home';
import FormPage from './Components/FormPage';
import ValidatorsPage from './Components/ValidatorsPage';
import CheckboxPage from './Components/CheckboxPage';
import NotFound from './NotFound';
import Components from './Components';
import UI from './UI';

const routes = (
  <Route path="/" component={ UI.Layout }>
    <IndexRoute component={ Home } />
    <Route path="/components/" component={Components}>
      <IndexRedirect to="avform/" />
      <Route path="avform/" component={ FormPage } />
      <Route path="validators/" component={ ValidatorsPage } />
      <Route path="checkboxes/" component={ CheckboxPage } />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
