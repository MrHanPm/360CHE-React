"use strict";

import React from 'react';


import {
    Tab,
    TabBody,
    TabBar,
    TabBarItem,
    TabBarIcon,
    TabBarLabel,
    Article
} from 'react-weui';
import {Tool,Alert} from '../../../tool.js';
import Clues from '../clue/index.js';
import Crms from '../crm/index.js';
import Finds from '../find/index.js';
import Count from '../count/index.js';
import ShowAlert from '../../../component/Alert.js';
class TabBarDemo extends React.Component {
    state={
        tab:0,
    };
    componentWillMount(){
        let Hashs = window.location.hash.substring(11,12);
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
        const {tab} = this.state;
        switch(tab){
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
                        active={tab == 0}
                        onClick={e=>{this.setState({tab:0});this.context.router.push({pathname: '/boss/nav/x'});}}
                        icon={<i className='clue_ico'></i>}
                        label="线索"
                    />
                    <TabBarItem
                        active={tab == 1}
                        onClick={e=>{this.setState({tab:1});this.context.router.push({pathname: '/boss/nav/c'})}}
                        icon={<i className='crm_ico'></i>}
                        label="CRM"
                    />
                    <TabBarItem
                        active={tab == 2}
                        onClick={e=>{this.setState({tab:2});this.context.router.push({pathname: '/boss/nav/t'})}}
                        icon={<i className='count_ico'></i>}
                        label="统计"
                    />
                    <TabBarItem
                        active={tab == 3}
                        onClick={e=>{this.setState({tab:3});this.context.router.push({pathname: '/boss/nav/f'})}}
                        icon={<i className='find_ico'></i>}
                        label="发现"
                    />
                </TabBar>
                <ShowAlert />
            </Tab>
        );
    }
};
TabBarDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default TabBarDemo
