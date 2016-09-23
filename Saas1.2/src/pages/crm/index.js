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
    ActionSheet,
    Button,
} from 'react-weui';
import './index.less';
import ShowAlert from '../../component/Alert.js'
import OkTel from '../okTel/index.js';
import NoTel from '../noTel/index.js';
import Collect from '../collectTel/index.js';
import Recent from '../crmRecent/index.js';

class Clues extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab:0,
            show: false,
            red:false,
            menus: [{
                label: '新建客户联系人',
                onClick: ()=> {
                    this.context.router.push({
                        pathname: '/addTel'
                    });
                }
            }, {
                label: '更多功能，待开发…',
                onClick: ()=> {

                }
            }],
            actions: [
                {
                    label: '取消',
                    onClick: this.hide.bind(this)
                }
            ]
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    show() {
        this.setState({show: true});
    }

    hide() {
        this.setState({show: false});
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
            <div style={{height:'100%'}} className="CrmBox">
                <ul className="clueNav">
                    <li className={this.state.tab == 0 ? 'active':''} onClick={e=>this.setState({tab:0})}>最近联系</li>
                    <li className={this.state.tab == 1 ? 'active':''} onClick={e=>this.setState({tab:1})}>收藏</li>
                    <li className={this.state.tab == 2 ? 'active':''} onClick={e=>this.setState({tab:2})}>未购车</li>
                    <li className={this.state.tab == 3 ? 'active':''} onClick={e=>this.setState({tab:3})}>已购车</li>
                </ul>
                {Pages}
                <span className="butX" onClick={this.show}></span>
                <ActionSheet menus={this.state.menus} actions={this.state.actions} show={this.state.show} onRequestClose={this.hide} />
                <ShowAlert />
            </div>
        );
    }
};


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Clues

