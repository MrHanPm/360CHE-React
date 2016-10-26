"use strict";

import React,{Component} from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    ActionSheet,
    SearchBar,
    Button,
} from 'react-weui';
//import ImgseCrm from './crm.png';
import {Tool,Alert} from '../../../tool.js';
import {LoadAd,Reccount,NoDataS} from '../../../component/more.js';
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
            DelId:'',
            DelInO:'',
            nowpage:1,
            DATA:[],
            reccount:0,
            isDatas:false,
        }
        this.goSearchPage = this.goSearchPage.bind(this);
        this.CrmMesc = this.CrmMesc.bind(this);
    }

    goSearchPage(){
        this.context.router.push({pathname: '/search'});
    }
    CrmMesc(e){
        let urlTxt = '/boss/detailTel?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    upDATA(){
        let reTel = JSON.parse(Tool.localItem('reTel'));
        if(reTel !== null){
            this.setState({
                DATA:reTel,
            });
        }
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        let reTelFingerprint = Tool.localItem('reTelFingerprint');
        if(reTelFingerprint == null){
            json.fingerprint = '';
        }else{
            json.fingerprint = reTelFingerprint;
        }
        json.type = -1;
        Tool.get('Customer/GetCustomerList.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({loadingS:false,reccount:res.reccount});
                    let Fingerprint = res.fingerprint;
                    Tool.localItem('reTelFingerprint',Fingerprint);
                    if(res.ischange == 1){
                        //this.state.DATA = [];
                        //let ReData=res.listdata;
                        // for(let i=0; i<res.listdata.length;i++){
                        //     ReData.push(res.listdata[i]);
                        // }
                        let reTel = JSON.stringify(res.listdata);
                        Tool.localItem('reTel',reTel);
                        this.setState({
                            DATA:res.listdata,
                        });
                    }
                    if(this.state.DATA.length === 0){
                        this.setState({isDatas:true});
                    }else{
                        this.setState({isDatas:false});
                    }
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                
            }
        )
    }
    componentDidMount() {
        this.upDATA();
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].abort();
        }
        XHRLIST = [];
    }
    render() {
        const {loadingS, DATA,isDatas,reccount} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd /> : <Reccount DATA={reccount} />;
        }
        return (
            <div className="clueBody cluePending cluePend crmRecent goSe CRMtitle">
                <div className="goSear" onClick={this.goSearchPage}>搜索</div>
            {DATA.map(function(e,index){
                return(
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <a href={`tel:${e.customphone}`} className="weui_btn weui_btn_plain_primary crmCall" title={e.customid}> </a>
                            </MediaBoxHeader>
                            <div className="Cfocus" title={e.customid} onClick={self.CrmMesc}></div>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    <span>{e.customname.substring(0,4)}</span>
                                    <i>跟进人：{e.followname.substring(0,4)}</i>
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{e.lastlinktime.substring(0,4) < '2000'?'近期无联系':e.lastlinktime}</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                )})
            }
            {footerS}
        </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
