import React from 'react'
import ReactDOM from 'react-dom'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, hashHistory} from 'react-router'
// import WeUI from 'react-weui'
import 'weui'

//import Home from './pages/home/index';
import Name from './pages/name/index'
import Login from './pages/login/index'
import Phone from './pages/testPhone/index'
import Phones from './pages/testPhone/phone'
import Brand from './pages/brand/index'
import Nav from './pages/nav/index'
import LoadMsg from './pages/msg/loading'
import LoadData from './pages/msg/data'
import Feedback from './pages/msg/feedback'
import Account from './pages/account/index'
import AccountType from './pages/accountType/index'
import MdfPwd from './pages/mdfPwd/index'
import AddPwd from './pages/addPwd/index'
import Rob from './pages/rob/index'
import RobClue from './pages/robClue/index'
import AddClue from './pages/addClue/index'
import AlterClue from './pages/alterClue/index'
import AddPursue from './pages/addPursue/index'
import AddTel from './pages/addTel/index'
import AlterTel from './pages/alterTel/index'
import DetailTel from './pages/detailTel/index'
import CrmClue from './pages/crmClue/index'
import Share from './pages/share/index'
import ClueBag from './pages/clueBag/index'
import BuyClueBag from './pages/buyClueBag/index'
import BuyRecord from './pages/buyRecord/index'
import CountMsg from './pages/count/msg'
import RobMsg from './pages/rob/msg'
import Search from './pages/searchbar/index'
import SearchClue from './pages/searchbar/clue'
import MyAcut from './pages/myaccount/index'
import MyClues from './pages/myaccount/cluespage'
import MyAcutMsg from './pages/myaccount/msg'

import BosNav from './pages/boss/nav/index'
import BosRobClue from './pages/boss/robClue/index'
import BosDetailTel from './pages/boss/detailTel/index'
class App extends React.Component {
    render() {
        return (
            <div style={{'height':'100%','overflow':'hidden'}}>
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </div>
        )
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
            <Route path="loaddata" component={LoadData}/>
            <Route path="phone" component={Phone}/>
            <Route path="phones" component={Phones}/>
            <Route path="login" component={Login}/>
            <Route path="name" component={Name}/>
            <Route path="brand" component={Brand}/>
            <Route path="feedback" component={Feedback}/>
            <Route path="account" component={Account}/>
            <Route path="accountType" component={AccountType}/>
            <Route path="mdfPwd" component={MdfPwd}/>
            <Route path="addPwd" component={AddPwd}/>
            <Route path="rob" component={Rob}/>
            <Route path="alterClue" component={AlterClue}/>
            <Route path="addTel" component={AddTel}/>
            <Route path="alterTel" component={AlterTel}/>
            <Route path="share" component={Share}/>
            <Route path="clueBag" component={ClueBag}/>
            <Route path="buyClueBag" component={BuyClueBag}/>
            <Route path="buyRecord" component={BuyRecord}/>
            <Route path="search" component={Search}/>
            <Route path="searchClue" component={SearchClue}/>
            <Route path="countMsg" component={CountMsg}/>
            <Route path="robMsg" component={RobMsg}/>

            <Route path="addClue" component={AddClue}/>
            <Route path="robClue" component={RobClue}/>
            <Route path="crmClue" component={CrmClue}/>
            <Route path="detailTel" component={DetailTel}/>
            <Route path="addPursue" component={AddPursue}/>
            <Route path="myacut" component={MyAcut}/>
            <Route path="myclues" component={MyClues}/>
            <Route path="mamsg" component={MyAcutMsg}/>

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
), document.getElementById('container'))
