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
        Tool.localItem('vipLodData',null);
        Tool.localItem('Uphone',null);
        Tool.localItem('BrandKey',null);
        Tool.get('WeiXin/BindTel.aspx',{},
            (res) => {
                if(res.status === 910){
                    this.context.router.push({
                        pathname: '/phone'
                    });
                }else if(res.status === 1){
                    let Vd = JSON.stringify(res.data);
                    Tool.localItem('vipLodData',Vd);
                    if(res.data.usercategory == '1'){
                        this.context.router.push({pathname: '/nav'});
                    }
                    if(res.data.usercategory == '2'){
                        this.context.router.push({pathname: '/boss/nav'});
                    }
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
