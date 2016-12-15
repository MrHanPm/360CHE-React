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
    Button,
} from 'react-weui';
//import ImgseCrm from './crm.png';
import {Tool,Alert,AllMsgToast} from '../../tool.js';
import {LoadAd,Reccount,NoDataS} from '../../component/more.js';
import './index.less';
const {Confirm} = Dialog;
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
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
                    if(doms.getAttribute('data') == '1'){
                        doms.setAttribute('data','0');
                        doms.setAttribute('class','crmStar');
                        AllMsgToast.to("已取消收藏");
                    }else{
                        doms.setAttribute('data','1');
                        doms.setAttribute('class','crmStar active');
                        AllMsgToast.to("已收藏");
                    }
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
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
        Tool.gaTo('点击联系人详情页查看线索','联系人详情页','');
        let clusUrl = window.location.hash.replace(/#/g,'');
        let goUrlclus = clusUrl.split("?");
        Tool.localItem('clueURl',goUrlclus[0]);
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
                    let Pcot = this.state.reccount;
                    Pcot--;
                    this.setState({
                        DATA:newDa,
                        reccount:Pcot
                    });
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
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
                        // this.state.DATA = [];
                        // let ReData=[];
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
                    Tool.gaTo('拨打联系人电话','CRM','');
                    this.upDATA();
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
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
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <Reccount DATA={reccount} />;
        }
        return (
            <div className="clueBody cluePend">
                <div className="goSear" onClick={this.goSearchPage}>搜索</div>
            <div className="clueBody cluePending cluePend crmRecent goSe" style={{'paddingTop':'48px'}}>
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
                                    <span>{e.customname.substring(0,4)}</span>
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
            </div>
            <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
            </Confirm>
        </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
