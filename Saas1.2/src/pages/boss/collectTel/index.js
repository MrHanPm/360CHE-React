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
import {Tool,Alert} from '../../../tool.js';
import {LoadAd,Reccount,NoDataS} from '../../../component/more.js';
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
            nowpage:1,
            DATA:[],
            Lis:[],
            reccount:0,
            isDatas:false,
        }
        this.Liclick = this.Liclick.bind(this);
        this.CrmMesc = this.CrmMesc.bind(this);
    }

    CrmMesc(e){
        let urlTxt = '/boss/detailTel?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    
    upDATA(){
        let coTel = JSON.parse(Tool.localItem('coTel'));
        let coAZ = JSON.parse(Tool.localItem('coAZ'));
        if(coTel !== null){
            this.setState({
                DATA:coTel,
                Lis:coAZ,
            });
        }
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        let coTelFingerprint = Tool.localItem('coTelFingerprint');
        if(coTelFingerprint == null){
            json.fingerprint = '';
        }else{
            json.fingerprint = coTelFingerprint;
        }
        json.type = 1;
        Tool.get('Customer/GetCustomerList.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({loadingS:false,reccount:res.reccount});
                    let Fingerprint = res.fingerprint;
                    Tool.localItem('coTelFingerprint',Fingerprint);
                    if(res.ischange == 1){
                        this.state.DATA = [];
                        for(let j=0; j< 30;j++){this.state.Lis[j] = [];}
                        for(let i=0;i < res.listdata.length; i++){
                          let item = res.listdata[i].firstnameletter;
                          if(item == ''){item = '☆';}
                          let her = this.state.DATA.indexOf(item);
                          if ( her === -1) {this.state.DATA.push(item);}
                        }
                        for(let i=0;i < res.listdata.length; i++){
                          let item = res.listdata[i].firstnameletter;
                          if(item == ''){item = '☆';}
                          let her = this.state.DATA.indexOf(item);
                          let json = {
                                        'customname':res.listdata[i].customname,
                                        'customphone':res.listdata[i].customphone,
                                        'customid':res.listdata[i].customid,
                                        'lastlinktime':res.listdata[i].lastlinktime,
                                        'isfavorites':res.listdata[i].isfavorites
                                      };
                          if ( her !== -1) {this.state.Lis[her].push(json);}
                        }
                        let coTel = JSON.stringify(this.state.DATA);
                        Tool.localItem('coTel',coTel);
                        let coAZ = JSON.stringify(this.state.Lis);
                        Tool.localItem('coAZ',coAZ);
                        this.setState({
                            DATA:this.state.DATA,
                            Lis:this.state.Lis,
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
    Liclick(e){
      this.showScale(e.target.innerHTML);
    }
    showScale(val){
        var toastTimer;
        toastTimer && clearTimeout(toastTimer);
        this.UlScroll(val);
        var Scale = document.getElementById('index_selected');
            Scale.innerHTML = val;
            setTimeout(function(){
                Scale.setAttribute('class','scale show');
            },10);
            toastTimer = setTimeout(function(){
                Scale.setAttribute('class','scale');
            },500);
    }
    UlScroll(el){
        var goUl = document.getElementById(el);
        var Uls = document.querySelector('.clueBody');
        var ulHeight = goUl.parentNode.offsetTop;
        Uls.scrollTop = ulHeight - 45;
    }
    componentDidMount() {
        for(let j=0; j< 30;j++){this.state.Lis[j] = [];}
        this.upDATA();
        let self = this;
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchstart', function(e) {
            this.setAttribute('class','nav');
          }, false);
        });
        //touchmove
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchmove', function(e) {
                let y = e.changedTouches[0].pageY - this.getBoundingClientRect().top;
                let Nums = this.querySelectorAll('li').length;
                let ContHeight = this.getBoundingClientRect().height;
                let itemHt = ContHeight/Nums;
                let target;
                if(y > 0 && y < ContHeight){
                    for(let i=0; i < Nums; i++){
                        let hts = itemHt * (i+1);
                        let oldhts = hts - itemHt;
                        if(i == 0 && y < itemHt){
                           target = this.children[0];
                        }else if(oldhts == itemHt && y < hts){
                            target = this.children[1];
                        }else if(y > oldhts && y < hts){
                            target = this.children[i];
                        }
                    }
                    //console.log(oldhts,y,target);
                }else{
                    target = this.children[Nums-1];
                }
                self.showScale(target.innerHTML);
          }, false);
        });
        //touchend
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchend', function(e) {
            this.removeAttribute('class');
          }, false);
        });
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].end();
        }
        XHRLIST = [];
    }
    render() {
        const {loadingS,DATA,Lis,isDatas,reccount} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd /> : <Reccount DATA={reccount} />;
        }
        return (
            <div className="clueBody cluePending crmPend CRMtitle">
            {DATA.map(function(e,indexs){
                return(
                <Panel key={indexs}>
                    <PanelHeader id={e}>{e}</PanelHeader>
                    {Lis[indexs].map(function(ele,index){
                        return(
                    <PanelBody key={index}>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <a href={`tel:${ele.customphone}`} className="weui_btn weui_btn_plain_primary crmCall" title={ele.customid}> </a>
                            </MediaBoxHeader>
                            <div className="Cfocus" title={ele.customid} onClick={self.CrmMesc}></div>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    <span>{ele.customname}</span>
                                    <i>跟进人：{ele.followname}</i>
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{ele.lastlinktime.substring(0,4) < '2000'?'近期无联系':ele.lastlinktime}</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                        )})
                    }
                </Panel>
                )})
            }
            {footerS}
            <aside className="scale" id="index_selected">A</aside>
            <ul id="index_nav">
              {DATA.map(function(e,index){
                  return(
                   <li key={index} onClick={self.Liclick}>{e}</li>
                 )})
              }
            </ul>
        </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
