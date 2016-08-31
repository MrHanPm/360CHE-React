"use strict";

import React from 'react';
import {Button, Msg} from 'react-weui';
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './loading.less';
class MsgDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        document.title="Loading";
        Tool.localItem('vipLodData','');
        Tool.localItem('Uphone','');
        Tool.localItem('BrandKey','');
        Tool.get('WeiXin/BindTel.aspx',{},
            (res) => {
                if(res.status === 910){
                    this.context.router.push({
                        pathname: '/phone'
                    });
                }else if(res.status === 1){
                    Tool.localItem('vipLodData',JSON.stringify(res.data));
                    this.context.router.push({
                        pathname: '/nav'
                    });
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to(err);
            }
        )
    }
    render() {
        return (
            <Page className="Loading" title="Loading" spacing>
                <div className="LoadingMsg">
                    <span>数据加载中…</span>
                </div>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
