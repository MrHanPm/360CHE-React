"use strict";

import React from 'react';
import {Grids} from 'react-weui';
import Page from '../../component/page';
import IconButton from './images/icon_nav_button.png';
import IconCell from './images/icon_nav_cell.png';
import IconToast from './images/icon_nav_toast.png';
import IconDialog from './images/icon_nav_dialog.png';
import IconProgress from './images/icon_nav_progress.png';
import IconMsg from './images/icon_nav_msg.png';
import IconArticle from './images/icon_nav_article.png';
import IconActionSheet from './images/icon_nav_actionSheet.png';
import IconIcons from './images/icon_nav_icons.png';
import IconPanel from './images/icon_nav_panel.png';
import IconTab from './images/icon_nav_tab.png';
import IconSearchBar from './images/icon_nav_search_bar.png';

import './index.less';

export default class Home extends React.Component {

    state = {
        components: [{
            icon: <img src={IconButton}/>,
            label: '认证手机',
            href: '#phone'
        }, {
            icon: <img src={IconCell}/>,
            label: 'VIP登陆',
            href: '#login'
        }, {
            icon: <img src={IconToast}/>,
            label: '销售信息',
            href: '#name'
        }, {
            icon: <img src={IconProgress}/>,
            label: '销售品牌',
            href: '#brand'
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

