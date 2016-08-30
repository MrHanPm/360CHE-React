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
import {Tool} from '../../tool.js';
import './index.less';
import Clues from '../clue/index.js';
import Crms from '../crm/index.js';
import Finds from '../find/index.js';
import Count from '../count/index.js';

export default class TabBarDemo extends React.Component {
    state={
        tab:0,
        showConfirm: false,
        confirm: {
            title: '标题标题',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideConfirm.bind(this)
                },
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
    componentDidMount(){
        let oldData = JSON.parse(Tool.localItem('vipLodData'));
        console.log(oldData)
        if(oldData.alermsg !== null || oldData.alermsg.length !== 0){
            this.setState({
                confirm:{
                    title: oldData.alermsg,
                    buttons: [
                        {
                            type: 'default',
                            label: '取消',
                            onClick: this.hideConfirm.bind(this)
                        },
                        {
                            type: 'primary',
                            label: '我知道了',
                            onClick: this.hideConfirm.bind(this)
                        }
                    ]
                }
            });
            this.showConfirm()
        }
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
                    <Article style={{height:'100%'}}>
                        {Pages}
                    </Article>
                </TabBody>
                <TabBar>
                    <TabBarItem
                        active={this.state.tab == 0}
                        onClick={e=>this.setState({tab:0})}
                        icon={<i className='clue_ico'></i>}
                        label="线索"
                    />
                    <TabBarItem active={this.state.tab == 1} onClick={e=>this.setState({tab:1})}>
                        <TabBarIcon>
                            <i className='crm_ico'></i>
                        </TabBarIcon>
                        <TabBarLabel>CRM</TabBarLabel>
                    </TabBarItem>
                    <TabBarItem
                        active={this.state.tab == 2}
                        onClick={e=>this.setState({tab:2})}
                        icon={<i className='count_ico'></i>}
                        label="统计"
                    />
                    <TabBarItem
                        active={this.state.tab == 3}
                        onClick={e=>this.setState({tab:3})}
                        icon={<i className='find_ico'></i>}
                        label="发现"
                    />
                </TabBar>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
            </Tab>
        );
    }
};
