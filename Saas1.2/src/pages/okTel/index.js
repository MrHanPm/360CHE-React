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
            isDatas:false,
            nowpage:1,
            DATA:[],
            Lis:[],
            reccount:0,
            DelId:'',
            DelInO:'',
            DelInd:'',
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
        this.RobLine = this.RobLine.bind(this);
        this.Liclick = this.Liclick.bind(this);
        this.CrmStar = this.CrmStar.bind(this);
        this.CrmDels = this.CrmDels.bind(this);
        this.CrmMesc = this.CrmMesc.bind(this);
    }
    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}

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
        this.state.DelInd = doms.getAttribute('alt');
        this.state.DelId = e.target.title;
        this.showConfirm();
    }
    CrmMesc(e){
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
        //console.log(json);
        Tool.get('Customer/DelCustomer.aspx',json,
            (res) => {
                if(res.status == 1){
                    let k = parseInt(this.state.DelInO);
                    let n = parseInt(this.state.DelInd);
                    this.setState({showConfirm: false});
                    let newLI = this.state.Lis[k];
                    let newDa = this.state.DATA;
                    let newLIs = this.state.Lis;
                    newLI.splice(n,1);
                    if(newLI.length === 0){
                        newLIs.splice(k,1);
                        newDa.splice(k,1);
                    }else{
                        newLIs.splice(k,1,newLI);
                    }
                    let Pcot = this.state.reccount;
                    Pcot--;
                    this.setState({
                        DATA:newDa,
                        Lis:newLIs,
                        reccount:Pcot
                    });
                    AllMsgToast.to("已删除");
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
                        let NewSeDa = [];
                        this.state.DATA = [];
                        for(let j=0; j< 30;j++){this.state.Lis[j] = [];}
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
        const {loadingS,DATA,Lis,isDatas,reccount} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <Reccount DATA={reccount} />;
        }
        let showAZs = reccount < 30 ? false : true
        return (
            <div className="clueBody cluePending crmPend">
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
                                    <a href={`tel:${ele.customphone}`} className="weui_btn weui_btn_plain_primary crmCall" title={ele.customid} onClick={self.RobLine}> </a>
                                </MediaBoxHeader>
                                <div className="Cfocus" title={ele.customid} onClick={self.CrmMesc}></div>
                                <MediaBoxBody>
                                    <MediaBoxTitle>
                                        <span>{ele.customname.substring(0,4)}</span>
                                        <i className={ele.isfavorites?"crmStar active" :"crmStar" } title={ele.customid} data={ele.isfavorites} onClick={self.CrmStar}></i>
                                        <i className="crmDels" title={ele.customid} data={indexs} alt={index} onClick={self.CrmDels}></i>
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
