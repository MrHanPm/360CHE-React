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
import {LoadAd,NoMor,NoDataS} from '../../../component/more.js';
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
            DelId:'',
            DelInO:'',
            nowpage:1,
            DATA:[],
            isDatas:false,
        }
        this.handleScroll = this.handleScroll.bind(this);
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
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.nowpage = this.state.nowpage;
        json.type = -1;
        Tool.get('Customer/GetCustomerList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage;
                    if(res.listdata.length === 0){
                        this.setState({isDatas:true});
                    }else{
                        this.setState({isDatas:false});
                    }
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false});
                    }
                    for(let i=0; i<res.listdata.length;i++){
                        this.state.DATA.push(res.listdata[i]);
                    }
                    //console.log(page,this.state.DATA);
                    if(res.pagecount == page){
                        this.setState({loadingS:false});
                    }else{
                        page++;
                        this.setState({
                            nowpage:page
                        });
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
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height-55;
      LastLi = BodyMin.scrollTop;
      goNumb = DataMin - Hit - LastLi;
      if(goNumb <= 0){
        // BodyMin.scrollTop = DataMin;
        if(this.state.loadingS){
            let t
            t && clearTimeout(t);
            t = setTimeout(function(){
                this.upDATA(undefined,'handleScroll');
            }.bind(this),800);
        }
      }
    }
    componentDidMount() {
        this.upDATA();
    }
    render() {
        const {loadingS, DATA,isDatas} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd /> : <NoMor />;
        }
        return (
            <div className="clueBody cluePending cluePend crmRecent goSe CRMtitle"  onScroll={this.handleScroll}>
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
                                    <span>{e.customname}</span>
                                    <i>跟进人：{e.followname}</i>
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{e.lastlinktime}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta className="crmMesc" title={e.customid} onClick={self.CrmMesc}></MediaBoxInfoMeta>
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
