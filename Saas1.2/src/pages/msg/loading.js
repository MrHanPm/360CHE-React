"use strict";

import React from 'react';
import {Button, Msg} from 'react-weui';
import ShowAlert from '../../component/Alert.js'
import {Tool,Alert} from '../../tool.js';
import './loading.less';
class MsgDemo extends React.Component {
    state = {
    }
    componentWillMount(){
        Tool.get('WeiXin/WXJSsignature.aspx',{},
            (res) => {
                if(res.status){
                    let datas = JSON.stringify(res.data);
                    Tool.localItem('jsSDK',datas);
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to(err.msg);
            }
        );
    }
    componentDidMount() {
        document.title="卡销宝";
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
                    let Sessionid = res.data.sessionid;
                    Tool.localItem('vipLodData',Vd);
                    this.context.router.push({pathname: '/loaddata'});
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
            <div className="jump-cover" id="jump_cover">
                <div className="loading visible">
                    <span className="loading-ring"> </span>
                </div>
                <ShowAlert />
            </div>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
