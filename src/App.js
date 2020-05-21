import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import './App.scss';

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component routes={route.routes} {...props}/>}
        />
    );
}

function App() {
    return (
        <Router>
            <Switch>
                {routes.map((route, index) => (
                    <RouteWithSubRoutes key={index} {...route} />
                ))}
            </Switch>
        </Router>
    );
}

export default App;
