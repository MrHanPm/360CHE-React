"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import WeUI from 'react-weui';
import 'weui';

import Home from './pages/home/index';
import Name from './pages/name/index';
import Login from './pages/login/index';
import Phone from './pages/testPhone/index';
import Brand from './pages/brand/index';
import Nav from './pages/nav/index';
import LoadMsg from './pages/msg/loading';
import Feedback from './pages/msg/feedback';
import Account from './pages/account/index';
import MdfPwd from './pages/mdfPwd/index';

class App extends React.Component {
        render() {
                return (
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="page"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        style={{height: '100%'}}
                    >
                            {React.cloneElement(this.props.children, {
                                    key: this.props.location.pathname
                            })}
                    </ReactCSSTransitionGroup>
                );
        }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="loading" component={LoadMsg}/>
            <Route path="phone" component={Phone}/>
            <Route path="login" component={Login}/>
            <Route path="name" component={Name}/>
            <Route path="brand" component={Brand}/>
            <Route path="nav" component={Nav}/>
            <Route path="feedback" component={Feedback}/>
            <Route path="account" component={Account}/>
            <Route path="mdfPwd" component={MdfPwd}/>
        </Route>
    </Router>
), document.getElementById('container'));
