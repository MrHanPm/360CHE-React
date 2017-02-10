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
            toastTimer:'',
            isOsAd:false,
        }
        this.Liclick = this.Liclick.bind(this);
        this.CrmMesc = this.CrmMesc.bind(this);
    }

    CrmMesc(e){
        let urlTxt = '/boss/detailTel?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    
    upDATA(){
        let okTel = JSON.parse(Tool.localItem('okTel'));
        let okAZ = JSON.parse(Tool.localItem('okAZ'));
        if(okTel !== null){
            this.setState({
                DATA:okTel,
                Lis:okAZ,
            });
        }
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        let okTelFingerprint = Tool.localItem('okTelFingerprint');
        if(okTelFingerprint == null){
            json.fingerprint = '';
        }else{
            json.fingerprint = okTelFingerprint;
        }
        json.type = 3;
        Tool.get('Customer/GetCustomerList.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({loadingS:false,reccount:res.reccount});
                    let Fingerprint = res.fingerprint;
                    Tool.localItem('okTelFingerprint',Fingerprint);
                    if(res.ischange == 1){
                        this.state.DATA = [];
                        for(let j=0; j< 30;j++){this.state.Lis[j] = [];}
                        let NewSeDa = [];
                        for(let i=0;i < res.listdata.length; i++){
                          let item = res.listdata[i].firstnameletter;
                          let jsons = {
                            'customname':res.listdata[i].customname,
                            'customphone':res.listdata[i].customphone,
                            'customid':res.listdata[i].customid,
                            'lastlinktime':res.listdata[i].lastlinktime,
                          }
                          NewSeDa.push(jsons);
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
                                        'followname':res.listdata[i].followname,
                                        'lastlinktime':res.listdata[i].lastlinktime,
                                        'isfavorites':res.listdata[i].isfavorites
                                      };
                          if ( her !== -1) {this.state.Lis[her].push(json);}
                        }
                        let okTel = JSON.stringify(this.state.DATA);
                        Tool.localItem('okTel',okTel);
                        let okAZ = JSON.stringify(this.state.Lis);
                        Tool.localItem('okAZ',okAZ);
                        this.setState({
                            DATA:this.state.DATA,
                            Lis:this.state.Lis,
                        });
                        let SearchData = JSON.parse(Tool.localItem('SearchData'));
                        if(SearchData !== null){
                            for(let i=0;i < SearchData.length; i++){
                                for(let is=0;is < NewSeDa.length; is++){
                                    if(SearchData[i].customphone==NewSeDa[is].customphone){
                                        SearchData[i].lastlinktime = NewSeDa[is].lastlinktime;
                                        NewSeDa.splice(is,1);
                                    }
                                }
                            }
                            let newDS = SearchData.concat(NewSeDa);
                            Tool.localItem('SearchData',JSON.stringify(newDS));
                        }else{
                            Tool.localItem('SearchData',JSON.stringify(NewSeDa));
                        }
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
    Liclick(e){
      this.showScale(e.target.innerHTML);
    }
    showScale(val){
        clearTimeout(this.state.toastTimer);
        this.UlScroll(val);
        var Scale = document.getElementById('index_selected');
            Scale.innerHTML = val;
            Scale.style.display='block';
            setTimeout(function(){
                Scale.classList.add('show');
            },10);
            this.state.toastTimer = setTimeout(function(){
                Scale.classList.remove('show');
                Scale.style.display='none';
            },500);
    }
    UlScroll(el){
        var goUl = document.getElementById(el);
        var Uls = document.querySelector('.CrmScoll');
        var ulHeight = goUl.parentNode.offsetTop;
        Uls.scrollTop = ulHeight - 45;
    }

    componentDidMount() {
        for(let j=0; j< 30;j++){this.state.Lis[j] = [];}
        this.upDATA();
        if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1){
            this.state.isOsAd = true;
        }
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
                
                let target;
                if(y > 0 && y < ContHeight){
                    target = this.children[Math.round(y/Nums)];
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
            XHRLIST[i].abort();
        }
        XHRLIST = [];
    }
    render() {
        const {loadingS,DATA,Lis,isDatas,reccount,isOsAd} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <Reccount DATA={reccount} />;
        }
        let showAZs;
        if(isOsAd){
            showAZs = false
        }else{
            showAZs= reccount < 30 ? false : true
        }
        return (
            <div className="clueBody cluePending crmPend CRMtitle">
                <div className="CrmScoll">
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
                                        <span>{ele.customname.substring(0,4)}</span>
                                        <i>跟进人：{ele.followname.substring(0,4)}</i>
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
            </div>
            <aside className="scale" id="index_selected">A</aside>
            <ul id="index_nav" style={{'display':showAZs?'':'none'}}>
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
