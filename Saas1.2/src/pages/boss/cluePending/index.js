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
    Button,
} from 'react-weui';
import {Tool,Alert} from '../../../tool.js';
import {LoadAd,NoMor,NoDataS} from '../../../component/more.js';
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
           loadingS:true,
           nowpage:1,
           DATA:[],
           isDatas:false,
           loadPage:true,
           loadTimes:'',
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.RobLine = this.RobLine.bind(this);
    }

    upDATA(){
        this.state.loadPage = false;
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.nowpage = this.state.nowpage;
        Tool.get('Clues/GetRobCluesList.aspx',json,
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
                    
                    // for(let i=0; i<res.listdata.length;i++){
                    //     this.state.DATA.push(res.listdata[i]);
                    // }
                    let ConData = this.state.DATA.concat(res.listdata);
                    //console.log(page,this.state.DATA);
                    if(this.state.DATA.length == 0){this.props.REDS(false);}else{this.props.REDS(true);}
                    if(res.pagecount == page){
                        this.setState({loadingS:false,DATA:ConData});
                    }else{
                        page++;
                        this.setState({
                            nowpage:page,DATA:ConData
                        });
                        this.state.loadPage = true;
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
      Hit  = window.screen.height-55;
      LastLi = BodyMin.scrollTop;
      goNumb = DataMin - Hit - LastLi;
      if(goNumb <= 0){
        // BodyMin.scrollTop = DataMin;
        if(this.state.loadingS){
            if(this.state.loadPage){
                clearTimeout(this.state.loadTimes);
                this.state.loadTimes = setTimeout(function(){
                    this.upDATA();
                }.bind(this),600);
            }
        }
      }
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
        const {loadingS, DATA,isDatas} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <NoMor />;
        }
        return (
            <div className="clueBody cluePending cluePend GoTouch" id="clueBody" onScroll={this.handleScroll}>
            {DATA.map(function(e,index){
                return(
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <Button type="primary" title={e.cluesextendid} onClick={self.RobLine} plain>查看</Button>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    {e.truckname}
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{e.cluecreatedatetime}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.provincename}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.cityname}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.realname}</MediaBoxInfoMeta>
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
