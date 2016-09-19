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
import {Tool,Alert} from '../../tool.js';
import './index.less';

class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
           loadingS:true,
           nowpage:1,
           DATA:[],
           Lis:[],
           reccount:''
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.RobLine = this.RobLine.bind(this);
        this.Liclick = this.Liclick.bind(this);
        this.CrmStar = this.CrmStar.bind(this);
        this.CrmDels = this.CrmDels.bind(this);
    }
    CrmStar(e){
        let doms = e.target;
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        json.customerid = e.target.title;
        json.status = doms.getAttribute('data');
        console.log(json);
        Tool.get('Customer/ChangeCustomerStatus.aspx',json,
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
    CrmDels(e){

    }
    upDATA(){
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        json.nowpage = this.state.nowpage;
        json.type = 3;
        json.size = 50;
        Tool.get('Customer/GetCustomerList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage;
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false});
                    }

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
                    this.setState({reccount:res.reccount});
                    
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
    RobLine(e){
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        json.customid = e.target.title;
        Tool.get('Customer/UpdateCustomerLastLinkTime.aspx',json,
            (res) => {
                if(res.status == 1){
                    //let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    //this.context.router.push({pathname: urlTxt});
                    //document.open('');
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
        Uls.scrollTop = ulHeight - 71;
    }
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height;
      LastLi = BodyMin.scrollTop;
      goNumb = DataMin - Hit - LastLi;
      if(goNumb == 0){
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
    render() {
        const {loadingS,DATA,Lis,reccount} = this.state;
        let self = this;
        return (
            <div className="clueBody cluePending crmPend"  onScroll={this.handleScroll}>
            <p className="crmConts">共{reccount}位联系人</p>
            {DATA.map(function(e,indexs){
                return(
                <Panel key={indexs}>
                    <PanelHeader id={e}>{e}</PanelHeader>
                    {Lis[indexs].map(function(ele,index){
                        return(
                    <PanelBody key={index}>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <Button type="primary" title={ele.customid} onClick={self.RobLine} plain>呼叫</Button>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxDescription>
                                    <span>{ele.customname}</span>
                                    <i className="crmStar" title={ele.customid} data={ele.isfavorites} onClick={self.CrmStar}></i>
                                    <i className="crmDels" title={ele.customid} onClick={self.CrmDels}></i>
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{ele.lastlinktime}</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                        )})
                    }
                </Panel>
                )})
            }
            {loadingS ? <LoadAd /> : <NoMor />}
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
