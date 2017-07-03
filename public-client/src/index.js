import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// I know this sucks
import App from './components/index';
import Home from './components/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import UserList from './components/user/list';
import UserView from './components/user/view';
import LogOut from './components/user/logout';
import NotFound from './components/error-404';
import AuthMiddleware from './components/auth/authMiddleware';
import reducers from './reducers';
import { AUTH_USER } from './actions/status';

const storeWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const token = localStorage.getItem('token');
const store = storeWithMiddleware(reducers);
if (token) {
    // update application state
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route path="logout" component={AuthMiddleware(LogOut)} />
                <Route path="users" component={AuthMiddleware(UserList)} />
                <Route path="users/:id" component={AuthMiddleware(UserView)} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>, document.querySelector('.content')
);
