"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import WeUI from 'react-weui';
import 'weui';

import LoadMsg from './pages/msg/loading';
import Inquire from './pages/inquire/index';
import InquireResult from './pages/inquireResult/index';
import InquireResultInfo from './pages/inquireResultInfo/index';


class App extends React.Component {
    render() {
        return (
            <div style={{'height':'100%','overflow':'hidden'}}>
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </div>
        );
    }
}
// <ReactCSSTransitionGroup component="div" transitionName="page" transitionEnterTimeout={0} transitionLeaveTimeout={0} style={{'height':'100%','overflow':'hidden'}} >
//                 {React.cloneElement(this.props.children, {
//                     key: this.props.location.pathname
//                 })}
//             </ReactCSSTransitionGroup>
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoadMsg}/>
            <Route path="loading" component={LoadMsg}/>
            <Route path="inquire" component={Inquire}/>
            <Route path="inquireResult" component={InquireResult}/>
            <Route path="inquireResultInfo" component={InquireResultInfo}/>


        </Route>
    </Router>
), document.getElementById('container'));
