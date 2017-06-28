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
    Dialog,
    Form,
    FormCell,
    CellBody,
    CellFooter,
    Radio,
} from 'react-weui'
const { Confirm } = Dialog
import {Alert,Tool} from '../../tool.js'
import {LoadAd} from '../../component/more.js'
class Clues extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor(){
        super();
        this.state = {
            shearName: '',
           loadingS:true,
           nowpage:1,
           DATA:[],
           TJRO:[],
           isDatas:false,
           loadPage:true,
           loadTimes:'',

           isshowclickmsg:0  // 是否可购买限制
        }
        let self = this
        this.btnPaycs = this.btnPaycs.bind(this)
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
                    if(res.listdata.length > 0){
                        this.props.REDS(true);
                    }else{
                        this.props.REDS(false);
                    }
                    let page = this.state.nowpage;
                    if(res.listdata.length === 0){
                        this.setState({isDatas:true});
                    }else{
                        this.setState({isDatas:false});
                    }
                    if(page == 1){this.state.DATA =[];}
                    this.setState({
                        loadingS:false,
                        DATA: res.listdata,
                        TJRO: res.recommendlistdata,
                        isshowclickmsg: res.isshowclickmsg
                    })
                }else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。')
            }
        )
    }

    btnPaycs (e) {
        let json = {}
        json.pay = e.target.dataset.pay
        json.tp = e.target.dataset.type
        json.id = e.target.title
        json.m = this.state.isshowclickmsg
        Tool.localItem('BUYCLU', JSON.stringify(json))
        this.context.router.push({pathname: '/robBuy'})
    }

    componentDidMount() {
        this.props.hideS();
        this.upDATA();
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut)
    }
    render() {
        const {loadingS, DATA,isDatas ,TJRO} = this.state
        let self = this
        let footerS
        if (isDatas) {
            if (this.state.isshowclickmsg == '1') {
                footerS = <NoDataS />
            } else {
                footerS = <NoIsDataS />
            }
        }else{
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <NoMorDataS />
        }
        return (
            <div className="clueBody cluePend">
            <div className="cluePending GoTouch" style={{height: '100%'}} id="clueBody">
            {DATA.map(function(e,index){
                return(
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <Button type="primary" title={e.cluesextendid}
                                 data-pay={e.saleprice} data-id={index} data-type="1"
                                 onClick={self.btnPaycs} plain>详情</Button>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    {e.truckname}
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta className="del-origs" style={{display: e.originalsaleprice.length > 2 ? '' : 'none'}}>{e.originalsaleprice}</MediaBoxInfoMeta>
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
            <div className="we_loadmore" style={{display: TJRO.length > 0 ? '' : 'none'}}>
                <div className="we_loadmore_line"></div>
                <div className="we_loadmore_tites">您可能对以下线索感兴趣</div>
            </div>
            {TJRO.map( (e,index) =>
                <Panel key={index}>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <Button type="primary" title={e.maincluesid}
                                 data-pay={e.saleprice} data-id={index} data-type="0"
                                 onClick={self.btnPaycs} plain>详情</Button>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    {e.truckname}
                                </MediaBoxTitle>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta className="del-origs" style={{display: e.originalsaleprice.length > 2 ? '' : 'none'}}>{e.originalsaleprice}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.cluecreatedatetime}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.provincename}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.cityname}</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>{e.realname}</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
            )}
            </div>
        </div>
        );
    }
};

class NoDataS extends Component{
  render(){
    return(
        <div className="noDataBox noDataBoxaft" style={{marginTop: '30px'}}>
            <p>您还没有新的询价线索</p>
            <p style={{fontSize: '13px'}}>
                <span>可以去抢购</span>
                <a href="#rob">更多询价线索 ></a>
            </p>
        </div>
    )
  }
}
class NoMorDataS extends Component{
  render(){
    return(
        <p style={{fontSize: '13px',textAlign: 'center'}}>
            <span>去抢购</span>
            <a href="#rob">更多询价线索 ></a>
        </p>
    )
  }
}
class NoIsDataS extends Component{
  render(){
    return(
        <div className="noDataBox noDataBoxaft">
            <p>
                <span>哦～没有新的线索，</span>
                <a href="#rob">去抢线索</a>
            </p>
        </div>
    )
  }
}
export default Clues
