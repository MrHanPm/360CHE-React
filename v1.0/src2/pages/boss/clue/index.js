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

import Already from '../clueAlready/index.js';
import Defeat from '../clueDefeat/index.js';
import FollowUp from '../clueFollowUp/index.js';
import Pending from '../cluePending/index.js';

class Clues extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab:0,
            red:false
        }
    }
    componentWillMount(){
        let Hashs = window.location.hash.substring(13,14);
        switch(Hashs){
            case 'd' :
                this.setState({tab:0});
                break;
            case 'g' :
                this.setState({tab:1});
                break;
            case 'y' :
                this.setState({tab:2});
                break;
            case 'b' :
                this.setState({tab:3});
                break;
        }
    }
    componentDidMount(){
        // document.title="线索";
        // var body = document.getElementsByTagName('body')[0];
        // var iframe = document.createElement("iframe");
        // iframe.style.display="none";
        // iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        // var d = function() {
        //   setTimeout(function() {
        //     iframe.removeEventListener('load', d);
        //     document.body.removeChild(iframe);
        //   }, 0);
        // };
        // iframe.addEventListener('load', d);
        // document.body.appendChild(iframe);
    }
    render() {
        let Pages;
        const {tab,red} = this.state;
        switch(tab){
            case 0 :
                Pages = <Pending  REDS={val=>this.setState({red:val})}/>;
                break;
            case 1 :
                Pages = <FollowUp />;
                break;
            case 2 :
                Pages = <Already />;
                break;
            case 3 :
                Pages = <Defeat />;
                break;
        }
        let Tabs;
        if(tab == 0){
            if(red){
                Tabs = 'active red';
            }else{
                Tabs = 'active';
            }
        }else{
            if(red){
                Tabs = 'red';
            }else{
                Tabs = '';
            }
        }
        return (
            <div style={{'height':'100%','overflow':'hidden'}}>
                <ul className="clueNav">
                    <li className={Tabs} onClick={e=>{this.setState({tab:0});this.context.router.push({pathname: '/boss/nav/x/d'})}}>待处理</li>
                    <li className={tab == 1 ? 'active':''} onClick={e=>{this.setState({tab:1});this.context.router.push({pathname: '/boss/nav/x/g'})}}>跟进中</li>
                    <li className={tab == 2 ? 'active':''} onClick={e=>{this.setState({tab:2});this.context.router.push({pathname: '/boss/nav/x/y'})}}>已成交</li>
                    <li className={tab == 3 ? 'active':''} onClick={e=>{this.setState({tab:3});this.context.router.push({pathname: '/boss/nav/x/b'})}}>已战败</li>
                </ul>
                {Pages}
            </div>
        );
    }
};


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Clues

