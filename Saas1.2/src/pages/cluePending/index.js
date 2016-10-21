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
import {Tool,Alert} from '../../tool.js';
import {LoadAd,NoMor} from '../../component/more.js';
class Clues extends React.Component {
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
                    for(let i=0; i<res.listdata.length;i++){
                        this.state.DATA.push(res.listdata[i]);
                    }
                    //let ConData = this.state.DATA.concat(res.listdata);
                    //console.log(page,this.state.DATA);
                    if(this.state.DATA.length == 0){this.props.REDS(false);}else{this.props.REDS(true);}
                    if(res.pagecount == page){
                        this.setState({loadingS:false});
                    }else{
                        page++;
                        this.setState({
                            nowpage:page
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
        let clusUrl = window.location.hash.replace(/#/g,'');
        let goUrlclus = clusUrl.split("?");
        Tool.localItem('clueURl',goUrlclus[0]);
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        Tool.get('Clues/GetCluesDetail.aspx',{sessionid:sessionid,cluesextendid:e.target.title},
            (res) => {
                if(res.status == 1){
                    let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    this.context.router.push({pathname: urlTxt});
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
        this.props.hideS();
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
            <div className="clueBody cluePending cluePend GoTouch" id="clueBody" onScroll={this.handleScroll}>
            {DATA.map(function(e,index){
                return(
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <Button type="primary" title={e.cluesextendid} onClick={self.RobLine} plain>立即抢</Button>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    {e.truckname}
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{e.cluecreatedatetime}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.provincename}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.cityname}</MediaBoxInfoMeta>
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
class NoDataS extends Component{
  render(){
    return(
        <div className="noDataBox noDataBoxaft">
            <p>
                <span>额~没有新的线索,</span>
                <a href="#rob">去抢线索 ></a>
            </p>
        </div>
    )
  }
}
Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
