"use strict";

import React from 'react';
import {Button, Msg} from 'react-weui';
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './loading.less';
class MsgDemo extends React.Component {
    state = {
        countdown: 0,
    }
    initData(asid){
        let i = 0;
        let time;
        let h ;
        let urlKey = Tool.localItem('fingerprint');
        Tool.get('Comm/GetAllCategoryDownUrl.aspx',{sessionid:asid,fingerprint:urlKey},
            (res) => {
                if(res.status == 1){
                    this.forAjax(res.listdata);
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        );
    }

    forAjax(listdata){
        let ajaxUrls = [];
        let ajaxDataName = [];
        let nameKey ='';
        for(let i=0;i<listdata.length;i++){
            if(listdata[i].ischange == 1){
                ajaxUrls.push(listdata[i].url);
                ajaxDataName.push(listdata[i].name);
            }
            nameKey += listdata[i].fingerprint + '_';
        }
        this.state.countdown = ajaxUrls.length;
        if(ajaxDataName.length > 0){
            this.loadAllData(ajaxDataName,ajaxUrls);
        }else{
            //this.showConfirm();
        }
        Tool.localItem('fingerprint',nameKey);
    }
    loadAllData(names,urls){
        let t;
        if (this.state.countdown == 0) {
            this.setState({countdown:urls.length});
            clearTimeout(t);
        } else {
            let s = this.state.countdown;
            let k = s-1;
            Tool.get(urls[k],'',
                (res) => {
                    if(res.status === 1){
                        Tool.localItem(names[k],JSON.stringify(res));
                        //console.log(Tool.localItem(names[k]),names[k]);
                    }
                },
                (err) => {
                    Alert.to(err.msg);
                }
            )
            s--;
            this.setState({countdown:s});
            t = setTimeout(() => this.loadAllData(names,urls),10);
        }
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
                    let Sessionid = res.data.sessionid;
                    Tool.localItem('vipLodData',Vd);
                    this.initData(Sessionid);
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
