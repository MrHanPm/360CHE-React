"use strict";

import React from 'react';
import { browserHistory } from 'react-router'
import {Button, Msg} from 'react-weui';
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './loading.less';
export default class MsgDemo extends React.Component {

    state = {

    };
    componentDidMount() {
        document.title="Loading"
        Tool.get('WeiXin/BindTel.aspx',{tel:this.state.phone,captcha:this.state.vcode},
            (res) => {
                if(res.status === 910){
                    browserHistory.push('#phone')
                }else{
                    browserHistory.push('#nav')
                }
            },
            (err) => {
                
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
