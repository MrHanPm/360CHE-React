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
    Dialog,
    Toast,
    Button,
} from 'react-weui';
//import ImgseCrm from './crm.png';
import {Tool,Alert} from '../../tool.js';
import {LoadAd,Reccount,NoDataS} from '../../component/more.js';
import './index.less';
const {Confirm} = Dialog;
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
            showToast: false,
            toastTimer: null,
            DelId:'',
            DelInO:'',
            nowpage:1,
            isDatas:false,
            DATA:[],
            reccount:0,
            confirm: {
                title: '确认删除这位联系人吗？',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '删除',
                        onClick: this.DelActive.bind(this)
                    }
                ]
            }
        }
        //this.handleScroll = this.handleScroll.bind(this);
        this.goSearchPage = this.goSearchPage.bind(this);
        this.RobLine = this.RobLine.bind(this);
        this.CrmStar = this.CrmStar.bind(this);
        this.CrmDels = this.CrmDels.bind(this);
        this.CrmMesc = this.CrmMesc.bind(this);
    }
    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    showToast() {
        this.setState({showToast: true});
        this.state.toastTimer = setTimeout(()=> {
            this.setState({showToast: false});
        }, 1200);
    }
    goSearchPage(){
        this.context.router.push({pathname: '/search'});
    }
    CrmStar(e){
        let doms = e.target;
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.customerid = e.target.title;
        json.status = doms.getAttribute('data') == '1' ? 0 :1;
        //console.log(json);
        Tool.get('Customer/ChangeCustomerStatus.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.showToast();
                    if(doms.getAttribute('data') == '1'){
                        doms.setAttribute('data','0');
                        doms.setAttribute('class','crmStar');
                    }else{
                        doms.setAttribute('data','1');
                        doms.setAttribute('class','crmStar active');
                    }
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    CrmDels(e){
        let doms = e.target;
        this.state.DelInO = doms.getAttribute('data');
        this.state.DelId = e.target.title;
        this.showConfirm();
    }
    CrmMesc(e){
        let urlTxt = '/detailTel?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    DelActive(){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.customerid = this.state.DelId;
        Tool.get('Customer/RemoveCustomerLastLinkTime.aspx',json,
            (res) => {
                if(res.status == 1){
                    let k = parseInt(this.state.DelInO);
                    this.setState({showConfirm: false});
                    let newDa = this.state.DATA;
                    newDa.splice(k,1);
                    this.setState({
                        DATA:newDa
                    });
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
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
                        this.state.DATA = [];
                        let ReData=[];
                        for(let i=0; i<res.listdata.length;i++){
                            ReData.push(res.listdata[i]);
                        }
                        let reTel = JSON.stringify(ReData);
                        Tool.localItem('reTel',reTel);
                        this.setState({
                            DATA:ReData,
                        });
                    }
                    if(this.state.DATA.length === 0){
                        this.setState({isDatas:true});
                    }else{
                        this.setState({isDatas:false});
                    }
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    RobLine(e){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.customerid = e.target.title;
        Tool.get('Customer/UpdateCustomerLastLinkTime.aspx',json,
            (res) => {
                if(res.status == 1){
                    
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    // handleScroll(e){
    //   let BodyMin = e.target;
    //   let DataMin,Hit,LastLi,goNumb;
    //   DataMin = BodyMin.scrollHeight;
    //   Hit  = window.screen.height-55;
    //   LastLi = BodyMin.scrollTop;
    //   goNumb = DataMin - Hit - LastLi;
    //   if(goNumb <= 0){
    //     // BodyMin.scrollTop = DataMin;
    //     if(this.state.loadingS){
    //         let t
    //         t && clearTimeout(t);
    //         t = setTimeout(function(){
    //             this.upDATA(undefined,'handleScroll');
    //         }.bind(this),800);
    //     }
    //   }
    // }
    componentDidMount() {
        this.upDATA();
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
            <div className="clueBody cluePending cluePend crmRecent goSe">
                <div className="goSear" onClick={this.goSearchPage}>搜索</div>
            {DATA.map(function(e,index){
                return(
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <a href={`tel:${e.customphone}`} className="weui_btn weui_btn_plain_primary crmCall" title={e.customid} onClick={self.RobLine}> </a>
                            </MediaBoxHeader>
                            <div className="Cfocus" title={e.customid} onClick={self.CrmMesc}></div>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    <span>{e.customname}</span>
                                    <i className={e.isfavorites?"crmStar active" :"crmStar" } title={e.customid} data={e.isfavorites} onClick={self.CrmStar}></i>
                                    <i className="crmDels" title={e.customid} data={index} onClick={self.CrmDels}></i>
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
            <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
            </Confirm>
            <Toast show={this.state.showToast}>操作成功</Toast>
        </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
