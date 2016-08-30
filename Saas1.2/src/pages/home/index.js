"use strict";

import React from 'react';
import {Grids} from 'react-weui';
import Page from '../../component/page';

import IconMsg from './images/icon_nav_msg.png';

import './index.less';

export default class Home extends React.Component {

    state = {
        components: [{
            icon: <img src={IconMsg}/>,
            label: '初始加载页',
            href: '#loading'
        },{
            icon: <img src={IconMsg}/>,
            label: '认证手机',
            href: '#phone'
        }, {
            icon: <img src={IconMsg}/>,
            label: 'VIP登陆',
            href: '#login'
        }, {
            icon: <img src={IconMsg}/>,
            label: '销售信息',
            href: '#name'
        }, {
            icon: <img src={IconMsg}/>,
            label: '销售品牌',
            href: '#brand'
        }, {
            icon: <img src={IconMsg}/>,
            label: '线索导航页',
            href: '#nav'
        }]
    };

    render() {
        return (
            <Page className="home" title="SAAS1.2" subTitle="页面路由入口">
                <Grids data={this.state.components}/>
            </Page>
        );
    }
};

