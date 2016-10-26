"use strict";
import React from 'react';

import {
    Tab,
    TabBody,
    TabBar,
    TabBarItem,
    TabBarIcon,
    Dialog,
    TabBarLabel,
    Article
} from 'react-weui';
const {Confirm} = Dialog;
import {Tool,Alert} from '../../tool.js';
import './index.less';
import Clues from '../clue/index.js';
import Crms from '../crm/index.js';
import Finds from '../find/index.js';
import Count from '../count/index.js';
import ShowAlert from '../../component/Alert.js';
class TabBarDemo extends React.Component {
    state={
        tab:0,
        initData:false,
        showConfirm: false,
        HelloMes:'',
        confirm: {
            title: '',
            buttons: [
                {
                    type: 'primary',
                    label: '我知道了',
                    onClick: this.hideConfirm.bind(this)
                }
            ]
        }
    };
    showConfirm() {
        this.setState({showConfirm: true});
    }
    hideConfirm() {
        this.setState({showConfirm: false});
    }
    
    componentWillMount(){
        let Hashs = window.location.hash.substring(6,7);
        switch(Hashs){
            case 'x' :
                this.setState({tab:0});
                break;
            case 'c' :
                this.setState({tab:1});
                break;
            case 't' :
                this.setState({tab:2});
                break;
            case 'f' :
                this.setState({tab:3});
                break;
        }
    }
    componentDidMount(){
        // if(navigator.userAgent.toLowerCase().match(/iphone os/i) == "iphone os"){
        //     document.getElementById('container').style.height=window.screen.height-64+'px';
        // }
    }
    render() {
        let Pages;
        switch(this.state.tab){
            case 0 :
                Pages = <Clues />;
                break;
            case 1 :
                Pages = <Crms />;
                break;
            case 2 :
                Pages = <Count />;
                break;
            case 3 :
                Pages = <Finds />;
                break;
        }
        return (
            <Tab>
                <TabBody>
                    <Article style={{'height':'100%','width':'100%','overflow':'hidden'}}>
                        {Pages}
                    </Article>
                </TabBody>
                <TabBar>
                    <TabBarItem
                        active={this.state.tab == 0}
                        onClick={e=>{this.setState({tab:0});this.context.router.push({pathname: '/nav/x'});}}
                        icon={<i className='clue_ico'></i>}
                        label="线索"
                    />
                    <TabBarItem
                        active={this.state.tab == 1}
                        onClick={e=>{this.setState({tab:1});this.context.router.push({pathname: '/nav/c'})}}
                        icon={<i className='crm_ico'></i>}
                        label="CRM"
                    />
                    <TabBarItem
                        active={this.state.tab == 2}
                        onClick={e=>{this.setState({tab:2});this.context.router.push({pathname: '/nav/t'})}}
                        icon={<i className='count_ico'></i>}
                        label="统计"
                    />
                    <TabBarItem
                        active={this.state.tab == 3}
                        onClick={e=>{this.setState({tab:3});this.context.router.push({pathname: '/nav/f'})}}
                        icon={<i className='find_ico'></i>}
                        label="发现"
                    />
                </TabBar>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>{this.state.HelloMes}</Confirm>
                <div className="initUrlKey" style={{'display':this.state.initData?'block':'none'}}>初始数据加载中…</div>
                <ShowAlert />
            </Tab>
        );
    }
};

TabBarDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default TabBarDemo
