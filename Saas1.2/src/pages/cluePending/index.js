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
} from 'react-weui'
const { Confirm } = Dialog
import {Alert,Tool} from '../../tool.js'
import {LoadAd,NoMor} from '../../component/more.js'
class Clues extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor(){
        super();
        this.state = {
           loadingS:true,
           nowpage:1,
           DATA:[],
           isDatas:false,
           loadPage:true,
           loadTimes:'',
           showAcom: false, // 显示线索处理规则

           isshowclickmsg:0,  // 是否可购买限制

            payShow: false,
            payId: 0,
            payTitle: '确认花费购买这条线索吗？',
            payMsg:'',
            payBtn: [
                {
                    type: 'default',
                    label: '不,我再想想',
                    onClick: this.hidePayConfm.bind(this)
                },
                {
                    type: 'primary',
                    label: '是,确认购买',
                    onClick: this.RobLine.bind(this)
                }
            ],


            valShow: false,
            valMsg:'',
            valBtn:[
                {
                    type: 'default',
                    label: '暂不充值',
                    onClick: this.hideValConfm.bind(this)
                },
                {
                    type: 'primary',
                    label: '前去充值',
                    onClick: this.goVal.bind(this)
                }
            ],


            alertShow: false,
            alertTitle:'',
            alertBtn:[{
                label: '知道了',
                onClick: this.hideAlert.bind(this)
            }]

        }
        this.handleScroll = this.handleScroll.bind(this)
        this.payConfirm = this.payConfirm.bind(this)
        this.showAcom = this.showAcom.bind(this)
        this.hideAcom = this.hideAcom.bind(this)
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
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false});
                    }
                    if(page == 1){this.state.DATA =[];}
                    // for(let i=0; i<res.listdata.length;i++){
                    //     this.state.DATA.push(res.listdata[i]);
                    // }
                    let ConData = this.state.DATA.concat(res.listdata);
                    //console.log(page,this.state.DATA);
                    if(res.pagecount == page){
                        this.setState({loadingS:false,DATA:ConData,isshowclickmsg:res.isshowclickmsg})
                    }else{
                        page++;
                        this.setState({
                            nowpage:page,DATA:ConData,
                            isshowclickmsg: res.isshowclickmsg
                        });
                        this.state.loadPage = true;
                    }
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
    hidePayConfm (){this.setState({payShow: false})}
    hideValConfm (){this.setState({valShow: false})}
    payConfirm (e) {
        if (this.state.isshowclickmsg == '1') {
            this.setState({
                payShow: true,
                payTitle: `确认花费¥ ${e.target.dataset.pay}购买这条线索吗？`,
                payMsg: e.target.dataset.name,
                payId: e.target.title,
                payPay: e.target.dataset.pay
            })
        } else {
            this.state.payId = e.target.title
            this.state.payPay = e.target.dataset.pay
            this.RobLine()
        }
    }
    showAcom () {this.setState({showAcom: true})}
    hideAcom () {this.setState({showAcom: false})}
    hideAlert () {this.setState({alertShow: false})}
    goVal(){
        this.context.router.push({pathname: '/myacut'})
    }
    RobLine(){
        this.setState({payShow: false})
        let clusUrl = window.location.hash.replace(/#/g,'')
        let goUrlclus = clusUrl.split("?")
        Tool.localItem('clueURl',goUrlclus[0])
        let sessionid
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId
        }else{
            sessionid = Tool.SessionId.get()
        }
        let GAs = '无|' + this.state.payId + '|无|无|无|无'
        Tool.get('Clues/GetCluesDetail.aspx',{sessionid:sessionid,cluesextendid: this.state.payId,saleprice:this.state.payPay},
            (res) => {
                if(res.status == 1){
                    Tool.gaTo('抢线索成功','待处理的线索',GAs);
                    let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    this.context.router.push({pathname: urlTxt});
                } else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'});
                } else {
                    
                    if (res.errcode == '2000') {
                        this.setState({
                            alertTitle: res.msg,
                            alertShow: true
                        })
                        return false
                    } 
                    if (res.errcode == '1000') {
                        this.setState({
                            valMsg: res.msg,
                            valShow: true
                        })
                        return false
                    }
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。')
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
        this.props.hideS();
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
        const {loadingS, DATA,isDatas , payShow, payMsg, payTitle, payBtn,showAcom,alertShow,alertTitle,alertBtn, valShow, valBtn, valMsg} = this.state
        let self = this
        let footerS
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
                                <Button type="primary" title={e.cluesextendid}
                                 data-pay={e.saleprice} data-name={e.truckname}
                                 onClick={self.payConfirm} plain>{e.btnname}</Button>
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
            <Confirm title={payTitle} buttons={payBtn} show={payShow}>
                {payMsg}
                <div onClick={this.showAcom} className="showAcom">查看线索处理规则</div>
            </Confirm>
            <div className="acomBoxs" style={{display: showAcom ? '':'none'}} onClick={this.hideAcom}>
                <h4>付费线索处理规则</h4>
                <p>1、从“待处理”列表或速抢线索列表中购买的线索，若您在购买后24小时之内没有设置客户级别或添加跟进记录，该线索将返回公共线索池，您将无法继续跟进</p>
                <p>2、从速抢线索列表中购买的线索，若您在跟进记录中设置的回访日期后48小时之内，仍没有添加新的跟进记录，该线索将返回公共线索池，您将无法继续跟进</p>
            </div>
            <Confirm title={null} buttons={alertBtn} show={alertShow}>
            {alertTitle}
            </Confirm>
            <Confirm title="您的经销商帐户余额不足，是否充值？" buttons={valBtn} show={valShow}>
                {valMsg}
            </Confirm>
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

export default Clues
