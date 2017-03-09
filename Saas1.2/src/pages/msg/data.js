"use strict";

import React from 'react';
import {Button, Msg} from 'react-weui';
import ShowAlert from '../../component/Alert.js'
import {Tool,Alert} from '../../tool.js';
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
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        );
    }
    goNavs(){
        Tool.ga();
        let nac = JSON.parse(Tool.localItem('vipLodData'));
        if(nac.usercategory == '1'){
            this.context.router.push({pathname: '/nav/x'});
        }
        if(nac.usercategory == '2'){
            this.context.router.push({pathname: '/boss/nav/t'});
        }
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
        Tool.localItem('fingerprint',nameKey);

        if(ajaxDataName.length > 0){
            this.loadAllData(ajaxDataName,ajaxUrls);
        }else{
            this.goNavs();
        }
    }
    loadAllData(names,urls){
        let t;
        if (this.state.countdown == 0) {
            this.setState({countdown:urls.length});
            clearTimeout(t);
            this.goNavs();
        } else {
            let s = this.state.countdown;
            let k = s-1;
            Tool.get(urls[k],'',
                (res) => {
                    if(res.status === 1){
                        Tool.localItem(names[k],JSON.stringify(res));
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
        //document.title="初始化";
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        this.initData(sessionid);
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
