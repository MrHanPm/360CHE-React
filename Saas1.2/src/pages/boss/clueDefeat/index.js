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

export default class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
           loadingS:true,
           nowpage:1,
           DATA:[],
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.RobLine = this.RobLine.bind(this);
    }
    upDATA(){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.nowpage = this.state.nowpage;
        json.cluesstatus = 4;
        Tool.get('Clues/GetCluesList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage;
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false});
                    }
                    for(let i=0; i<res.listdata.length;i++){
                        this.state.DATA.push(res.listdata[i]);
                    }
                    console.log(page,this.state.DATA);
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
    RobLine(e){
        let urlTxt = '/boss/robClue?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
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
        this.upDATA();
    }
    render() {
        const {loadingS, DATA} = this.state;
        let self = this;
        return (
            <div className="clueBody clueDef BossTitle"  onScroll={this.handleScroll}>
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
                                        <i>{e.nextvisitlisttitle}</i>
                                    </MediaBoxTitle>
                                    <MediaBoxDescription>
                                        {e.truckname}
                                    </MediaBoxDescription>
                                    <MediaBoxInfo>
                                        <MediaBoxInfoMeta>最后跟进:{e.lastlinktime}</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta>线索来源:{e.clueresourcename}</MediaBoxInfoMeta>
                                    </MediaBoxInfo>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                    )})
                }
                {loadingS ? <LoadAd /> : <NoMor />}
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
