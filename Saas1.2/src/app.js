"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import WeUI from 'react-weui';
import 'weui';

//import Home from './pages/home/index';
import Name from './pages/name/index';
import Login from './pages/login/index';
import Phone from './pages/testPhone/index';
import Brand from './pages/brand/index';
import Nav from './pages/nav/index';
import LoadMsg from './pages/msg/loading';
import LoadData from './pages/msg/data';

import Feedback from './pages/msg/feedback';
import Account from './pages/account/index';
import MdfPwd from './pages/mdfPwd/index';
import Rob from './pages/rob/index';
import RobClue from './pages/robClue/index';
import AddClue from './pages/addClue/index';
import AlterClue from './pages/alterClue/index';
import AddPursue from './pages/addPursue/index';
import AddTel from './pages/addTel/index';
import AlterTel from './pages/alterTel/index';
import DetailTel from './pages/detailTel/index';
import CrmClue from './pages/crmClue/index';
import Share from './pages/share/index';
import Search from './pages/searchbar/index';

import BosNav from './pages/boss/nav/index';
import BosRobClue from './pages/boss/robClue/index';
import BosDetailTel from './pages/boss/detailTel/index';
class App extends React.Component {
        render() {
                return (
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="page"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        style={{'height': '100%','overflow':'hidden'}}
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
            <IndexRoute component={LoadMsg}/>
            <Route path="loading" component={LoadMsg}/>
            <Route path="loaddata" component={LoadData}/>
            <Route path="phone" component={Phone}/>
            <Route path="login" component={Login}/>
            <Route path="name" component={Name}/>
            <Route path="brand" component={Brand}/>
            <Route path="feedback" component={Feedback}/>
            <Route path="account" component={Account}/>
            <Route path="mdfPwd" component={MdfPwd}/>
            <Route path="rob" component={Rob}/>
            <Route path="alterClue" component={AlterClue}/>
            <Route path="addTel" component={AddTel}/>
            <Route path="alterTel" component={AlterTel}/>
            <Route path="share" component={Share}/>
            <Route path="search" component={Search}/>

            <Route path="addClue" component={AddClue}/>
            <Route path="robClue" component={RobClue}/>
            <Route path="crmClue" component={CrmClue}/>
            <Route path="detailTel" component={DetailTel}/>
            <Route path="addPursue" component={AddPursue}/>

            <Route path="boss/robClue(/:name)" component={BosRobClue}/>
            <Route path="boss/detailTel(/:name)" component={BosDetailTel}/>
        </Route>
        <Route path="/nav" component={Nav}/>
        <Route path="/nav/x(/:name)" component={Nav}/>
        <Route path="/nav/c(/:name)" component={Nav}/>
        <Route path="/nav/t" component={Nav}/>
        <Route path="/nav/f" component={Nav}/>

        <Route path="/boss/nav" component={BosNav}/>
        <Route path="/boss/nav/x(/:name)" component={BosNav}/>
        <Route path="/boss/nav/c(/:name)" component={BosNav}/>
        <Route path="/boss/nav/t" component={BosNav}/>
        <Route path="/boss/nav/f" component={BosNav}/>
    </Router>
), document.getElementById('container'));
