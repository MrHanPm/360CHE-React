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
    CellFooter,
    Button,
} from 'react-weui';
import {Tool,Alert} from '../../../tool.js';
import './index.less';
import Foll from '../../sidebar/Foll';//筛选


export default class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
           loadingS:true,
           nowpage:1,
           follownum:1,
           buycarnum:1,
           p:1,
           pf:0,
           s_sorttype:1,
           s_sortfield:'zh',
           FollV:'',
           DATA:[],
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.RobLine = this.RobLine.bind(this);
        this.FilterS = this.FilterS.bind(this);
        this.FOLL = this.FOLL.bind(this);
        this.FollSidebar = this.FollSidebar.bind(this);
    }
    upDATA(){
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        json.sessionid = '36859_ec2b304e3ad9052eb463fd168bf978b34f7e3047';
        json.nowpage = this.state.nowpage;
        json.cluesstatus = 1;
        json.s_sortfield = this.state.s_sortfield;
        json.s_sorttype = this.state.s_sorttype;
        if(this.state.FollV !== '' && typeof(this.state.FollV.s_brandids) !== 'undefined'){
            json.nowpage = 1;
            json.s_levelsetstatus = this.state.FollV.s_levelsetstatus;//级别状态
            json.s_followstatus = this.state.FollV.s_followstatus;//跟进状态
            json.s_follownummin = this.state.FollV.s_follownummin;//跟进次数
            json.s_follownummax = this.state.FollV.s_follownummax;
            json.s_expectedbycarnummin = this.state.FollV.s_expectedbycarnummin;//台数开始
            json.s_expectedbycarnummax = this.state.FollV.s_expectedbycarnummax;
            json.s_lastlinktimemin = this.state.FollV.s_lastlinktimemin;//时间开始
            json.s_lastlinktimemax = this.state.FollV.s_lastlinktimemax;
            json.s_brandids = this.state.FollV.s_brandids;//品牌id
            json.s_clueslevel = this.state.FollV.s_clueslevel;//级别
            json.s_clueresource = this.state.FollV.s_clueresource;//线索
            json.s_cheliangyongtuid = this.state.FollV.s_cheliangyongtuid;//用途
        }
        console.log(json);
        Tool.get('Clues/GetCluesList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage;
                    
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false});
                    }
                    if(page == 1){
                        this.state.DATA =[];
                    }
                    for(let i=0; i<res.listdata.length;i++){
                        this.state.DATA.push(res.listdata[i]);
                    }
                    if(res.pagecount == page){
                        this.setState({loadingS:false});
                    }else{
                        page++;
                        this.setState({
                            nowpage:page
                        });
                    }
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    FollSidebar(val){
        console.log(val);
        if(val.s_levelsetstatus.length == 0 && val.s_followstatus.length == 0 && val.s_brandids.length ==0 && val.s_clueslevel.length ==0 && val.s_cheliangyongtuid.length ==0 && val.s_clueresource.length ==0 && val.s_expectedbycarnummax == -1 &&
            val.s_expectedbycarnummin == -1 && val.s_follownummax == -1 && val.s_follownummin == -1 && val.s_lastlinktimemin == '' && val.s_lastlinktimemax == ''){
            this.setState({pf:0});
        }else{
            this.setState({pf:1});
        }
        this.state.FollV = val;
        this.upDATA();
    }
    FilterS(e){
        if(e.target.title == 'zh'){
            this.state.p=1;
            this.state.nowpage=1;
            this.state.s_sortfield='zh';
        }else if(e.target.title == 'follownum'){
            this.state.p=2;
            this.state.nowpage=1;
            this.state.s_sortfield='follownum';
            if(this.state.follownum == 2){
                this.state.follownum=1;
                this.state.s_sorttype=1;
            }else{
                this.state.follownum=2;
                this.state.s_sorttype=2;
            }
        }else if(e.target.title == 'buycarnum'){
            this.state.p=3;
            this.state.nowpage=1;
            this.state.s_sortfield='buycarnum';
            if(this.state.buycarnum == 2){
                this.state.buycarnum=1;
                this.state.s_sorttype=1;
            }else{
                this.state.buycarnum=2;
                this.state.s_sorttype=2;
            }
        }
        this.upDATA();
    }
    FOLL(){
        document.getElementById('Folls').setAttribute('class','PubSidebar visible');
    }
    RobLine(e){
        let urlTxt = '/boss/robClue?id=' + e.target.title;
        this.context.router.push({
            pathname: urlTxt
        });
    }
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height;
      LastLi = BodyMin.scrollTop;
      goNumb = DataMin - Hit - LastLi;
      if(goNumb == 0){
        if(this.state.loadingS){
            let t
            t && clearTimeout(t);
            t = setTimeout(function(){
                this.upDATA();
            }.bind(this),800);
        }
      }
    }
    componentDidMount() {
        this.upDATA();
    }
    render() {
        const {loadingS, DATA,p,buycarnum,follownum,pf} = this.state;
        let self = this;
        return (
        <div>
            <ul className="FollNavs">
                <li className={p==1?'active':''} title="zh" onClick={this.FilterS}>综合</li>
                <li className={p==2?'FollNavCss active':'FollNavCss'}>
                    <span title="follownum" onClick={this.FilterS}>跟进次数</span>
                    <i className={follownum ==1?'acs':''}></i>
                </li>
                <li className={p==3?'FollNavCss active':'FollNavCss'}>
                    <span title="buycarnum" onClick={this.FilterS}>购买台数</span>
                    <i className={buycarnum ==1?'acs':''}></i>
                </li>
                <li className={pf?'FollNavCssf active':'FollNavCssf'} onClick={this.FOLL}>筛选</li>
            </ul>
            <div className="clueBody clueFollo"  onScroll={this.handleScroll}>
                {DATA.map(function(e,index){
                    return(
                    <Panel key={index}>
                        <PanelBody>
                            <MediaBox className="Follov" title={e.cluesextendid} onClick={self.RobLine}></MediaBox>
                            <MediaBox type="text">
                                <MediaBoxHeader>
                                    <CellFooter/>
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>
                                        {e.realname}
                                        <i className={e.nextvisitday ==0 ? 'reds' : ''}>{e.nextvisitlisttitle}</i>
                                    </MediaBoxTitle>
                                    <MediaBoxDescription>{e.truckname}</MediaBoxDescription>
                                    <MediaBoxInfo>
                                        <MediaBoxInfoMeta>已跟进{e.follownum}次 最后跟进:{e.lastlinktime}</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta>购买:{e.expectedbycarnum}台</MediaBoxInfoMeta>
                                    </MediaBoxInfo>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                    )})
                }
                {loadingS ? <LoadAd /> : <NoMor />}
            </div>
            <Foll onChange={val => this.FollSidebar(val)}/>
        </div>
        );
    }
};

class LoadAd extends Component{
  render(){
    return(
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
    )
  }
}

class NoMor extends Component{
  render(){
    return(
        <p className="noMor">没有更多了...</p>
    )
  }
}


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
