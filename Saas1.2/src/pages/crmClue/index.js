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
import {Tool,Alert} from '../../tool.js';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import ShowAlert from '../../component/Alert.js';
import './index.less';

export default class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
           loadingS:true,
           nowpage:1,
           DATA:[],
           isDatas:false,
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
        json.customerid = Tool.getQueryString('id');
        Tool.get('Clues/GetCluesList.aspx',json,
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
                    if(res.pagecount == page){
                        this.setState({loadingS:false,DATA:ConData});
                    }else{
                        page++;
                        this.setState({
                            nowpage:page,DATA:ConData
                        });
                    }
                }else if(res.status == 901){
                    alert(res.msg);
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
        let oldData = JSON.parse(Tool.localItem('vipLodData'));
        let urlTxt;
        if(oldData.usercategory == "2"){
            urlTxt = '/boss/robClue?id=' + e.target.title;
        }
        if(oldData.usercategory == "1"){
            urlTxt = '/robClue?id=' + e.target.title;
        }
        this.context.router.push({pathname: urlTxt});
    }
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height;
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
        document.title="联系人线索列表";
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
            <div className="clueBody clueDef crmCols"  onScroll={this.handleScroll}>
                <div className="CrmScoll">
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
                                        <MediaBoxTitle>{e.realname}</MediaBoxTitle>
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
                    {footerS}
                </div>
                <ShowAlert />
            </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
