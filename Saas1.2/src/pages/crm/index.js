"use strict";

import React from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Button,
} from 'react-weui';
import './index.less';

import OkTel from '../okTel/index.js';
import NoTel from '../noTel/index.js';
import Collect from '../collectTel/index.js';
import Recent from '../crmRecent/index.js';
import ImgSRC from './crm.png';
class ImgBox extends React.Component {
    render(){
        return(
            <div className="crmBox">
                <img src={ImgSRC}/>
            </div>
        )
    }
}

class Clues extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab:0,
            show: false,
            red:false,
        }
    }
    componentWillMount(){
        let Hashs = window.location.hash.substring(8,9);
        switch(Hashs){
            case 'z' :
                this.setState({tab:0});
                break;
            case 's' :
                this.setState({tab:1});
                break;
            case 'w' :
                this.setState({tab:2});
                break;
            case 'o' :
                this.setState({tab:3});
                break;
        }
    }
    componentDidMount(){
        document.title = "客户联系人";
    }
    render() {
        let Pages;
        switch(this.state.tab){
            case 0 :
                Pages = <Recent />;
                break;
            case 1 :
                Pages = <Collect />;
                break;
            case 2 :
                Pages = <NoTel />;
                break;
            case 3 :
                Pages = <OkTel />;
                break;
        }
        return (
            <div style={{'height':'100%','overflow':'hidden'}} className="CrmBox">
                <ul className="clueNav">
                    <li className={this.state.tab == 0 ? 'active':''} onClick={e=>{this.setState({tab:0});this.context.router.push({pathname: '/nav/c/z'})}}>最近联系</li>
                    <li className={this.state.tab == 1 ? 'active':''} onClick={e=>{this.setState({tab:1});this.context.router.push({pathname: '/nav/c/s'})}}>收藏</li>
                    <li className={this.state.tab == 2 ? 'active':''} onClick={e=>{this.setState({tab:2});this.context.router.push({pathname: '/nav/c/w'})}}>未购车</li>
                    <li className={this.state.tab == 3 ? 'active':''} onClick={e=>{this.setState({tab:3});this.context.router.push({pathname: '/nav/c/o'})}}>已购车</li>
                </ul>
                {Pages}
                <span className="butX" onClick={()=> this.context.router.push({pathname: '/addTel'})}></span>
            </div>
        );
    }
};


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}

class CluesImgBox extends React.Component {
    state={
        perm:false
    }
    componentWillMount(){
        let oldData = JSON.parse(localStorage.getItem('vipLodData'));
        if(oldData !== null){
            if(oldData.permission.length > 0){
                for(let i=0;i<oldData.permission.length;i++){
                    if(oldData.permission[i].key == 'crm' && oldData.permission[i].value == '1'){
                        this.setState({perm:true});
                        break;
                    }
                }
            }else{
                this.setState({perm:false});
            }
        }else{
            this.setState({perm:false});
        }
        //let permission=[{key: "crm", value: "1", remark: ""}, {key: "find_share", value: "1", remark: ""}];
        //let permission=[];
    }
    render(){
        let domBox;
        if(this.state.perm){
            domBox = <Clues/> ;
        }else{
            domBox = <ImgBox/>;
        }
        return(
            <div style={{'height':'100%'}}>
                {domBox}
            </div>
        )
    }
}

export default CluesImgBox
//export default Clues

