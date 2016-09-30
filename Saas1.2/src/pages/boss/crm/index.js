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
import ShowAlert from '../../../component/Alert.js'
import OkTel from '../okTel/index.js';
import NoTel from '../noTel/index.js';
import Collect from '../collectTel/index.js';
import Recent from '../crmRecent/index.js';

class Clues extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab:0,
        }
    }
    componentWillMount(){
        let Hashs = window.location.hash.substring(13,14);
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
                    <li className={this.state.tab == 0 ? 'active':''} onClick={e=>{this.setState({tab:0});this.context.router.push({pathname: '/boss/nav/c/z'})}}>最近联系</li>
                    <li className={this.state.tab == 1 ? 'active':''} onClick={e=>{this.setState({tab:1});this.context.router.push({pathname: '/boss/nav/c/s'})}}>收藏</li>
                    <li className={this.state.tab == 2 ? 'active':''} onClick={e=>{this.setState({tab:2});this.context.router.push({pathname: '/boss/nav/c/w'})}}>未购车</li>
                    <li className={this.state.tab == 3 ? 'active':''} onClick={e=>{this.setState({tab:3});this.context.router.push({pathname: '/boss/nav/c/o'})}}>已购车</li>
                </ul>
                {Pages}
                <ShowAlert />
            </div>
        );
    }
};


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Clues

