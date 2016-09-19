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
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.RobLine = this.RobLine.bind(this);
    }

    upDATA(){
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        json.nowpage = this.state.nowpage;
        json.type = -1;
        Tool.get('Customer/GetCustomerList.aspx',json,
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
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //sessionid = oldData.sessionid;
        let sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        Tool.get('Customer/UpdateCustomerLastLinkTime.aspx',{sessionid:sessionid,customerid:e.target.title},
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
            <div className="clueBody cluePending cluePend"  onScroll={this.handleScroll}>
                <SearchBar />
            {DATA.map(function(e,index){
                return(
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <Button type="primary" title={e.customerid} onClick={self.RobLine} plain>呼叫</Button>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxDescription>
                                    {e.customname}
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>{e.lastlinktime}</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                )})
            }

            <Panel>
                <PanelBody>
                    <MediaBox type="text">
                        <MediaBoxHeader>
                            <Button type="primary" title="123123" onClick={self.RobLine} plain>呼叫</Button>
                        </MediaBoxHeader>
                        <MediaBoxBody>
                            <MediaBoxDescription>
                                王小川
                            </MediaBoxDescription>
                            <MediaBoxInfo>
                                <MediaBoxInfoMeta>2016年12月23日 12:00</MediaBoxInfoMeta>
                            </MediaBoxInfo>
                        </MediaBoxBody>
                    </MediaBox>
                </PanelBody>
            </Panel>



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
