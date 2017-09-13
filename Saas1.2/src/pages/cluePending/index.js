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
           showAcom: false, // 显示线索处理规则

           isshowclickmsg:0,  // 是否可购买限制

            payShow: false,
            payId: 0,
            payTitle: '', // 弹窗的价格
            branLin: [], // 线索出现的帐户余额
            isGore: 0,  // 是否显示充值按钮
            freeavailablerobnum: 0,  // 是否有免费条数
            banid:0,
            typeTitle: 0,
            payMsg:'',
            payBtn: [
                {
                    type: 'default',
                    label: '再等等',
                    onClick: this.hidePayConfm.bind(this)
                },
                {
                    type: 'primary',
                    label: '确认购买',
                    onClick: this.Grob.bind(this)
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
        this.payConfirm = this.payConfirm.bind(this)
        this.showAcom = this.showAcom.bind(this)
        this.hideAcom = this.hideAcom.bind(this)
        this.RADIO = this.RADIO.bind(this)
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
    hidePayConfm (){
        this.setState({payShow: false,valShow: false,branLin:[]})
        let GAs = this.state.shearName+'|' + this.state.payId + '|无|无'
        Tool.gaTo('购买线索-点击放弃购买','待处理的线索',GAs)
    }
    hideValConfm (){
        this.setState({valShow: false,payShow: false,branLin:[]})
        Tool.gaTo('充值流程','点击暂不充值','余额不足弹窗')
    }
    RADIO (e) {
        // console.log(e.target.value)
        this.setState({
            banid: e.target.value
        })
    }
    Grob () {
        if(this.state.typeTitle == 'DATA'){
            this.RobLine(1)
        } else {
            this.MyRobLine(1)
        }
    }
    // payConfirm (e) {
    //     let GAs = this.state.shearName+'|' + this.state.payId + '|无|无'
    //     let sessionid
    //     const ele = e.target
    //     let json = {}
    //     this.setState({typeTitle:e.target.dataset.type})
    //     Tool.gaTo('购买线索-点击线索价格','待处理的线索',GAs)

    //     if (this.state.isshowclickmsg == '1') {
    //         if(typeof(Tool.SessionId) == 'string'){
    //             sessionid= Tool.SessionId
    //         }else{
    //             sessionid = Tool.SessionId.get()
    //         }
    //         json.sessionid = sessionid
    //         if(e.target.dataset.type == 'DATA') {
    //             json.paycluestype = 0
    //             json.extcluesid = e.target.title
    //         } else {
    //             json.paycluestype = 1
    //             json.maincluesid = e.target.title
    //         }
    //         json.saleprice = e.target.dataset.pay
    //         Tool.get('Clues/GetCluesPayInfo.aspx',json,
    //             (res) => {
    //                 if (res.status == '1') {
    //                     let ccnm
    //                     if (ele.dataset.type == 'DATA') {
    //                         this.setState({
    //                             payMsg: this.state.DATA[ele.dataset.id].truckname,
    //                             shearName: this.state.DATA[ele.dataset.id].clueresourcename
    //                         })
    //                     } else {
    //                         this.setState({
    //                             payMsg: this.state.TJRO[ele.dataset.id].truckname,
    //                             shearName: this.state.TJRO[ele.dataset.id].clueresourcename
    //                         })
    //                     }

    //                     for(let ssc in res.data.brandlist){
    //                         if(res.data.brandlist[ssc].canuse == 1){
    //                             ccnm = res.data.brandlist[ssc].brandid
    //                         }
    //                     }

    //                     this.setState({
    //                         payShow: false,
    //                         branLin: res.data.brandlist,
    //                         banid: ccnm,
    //                         isGore: res.data.gorecharge,
    //                         freeavailablerobnum: res.data.freeavailablerobnum,
    //                         payTitle: `¥ ${ele.dataset.pay}`,
    //                         payId: ele.title,
    //                         payPay: ele.dataset.pay
    //                     })
    //                 } else {
    //                     this.setState({
    //                         alertTitle: res.msg,
    //                         alertShow: true
    //                     })
    //                 }
    //             },
    //             (err) => {
    //                 Alert.to('请求超时，稍后重试。。')
    //             }
    //         )
    //     } else {
    //         this.state.payId = e.target.title
    //         this.state.payPay = e.target.dataset.pay
    //         if (e.target.dataset.type == 'DATA') {
    //             Tool.gaTo('普通抢线索','待处理的线索',GAs)
    //             this.state.shearName = this.state.DATA[e.target.dataset.id].clueresourcename
    //             this.RobLine(2)
    //         } else {
    //             Tool.gaTo('普通抢线索','待处理推荐线索',GAs)
    //             this.state.shearName = this.state.TJRO[e.target.dataset.id].clueresourcename
    //             this.MyRobLine(2)
    //         }
    //     }

    // }
    payConfirm (e) {
        let GAs = this.state.shearName+'|' + this.state.payId + '|无|无'
        this.setState({typeTitle:e.target.dataset.type})
        this.state.payId = e.target.title
        this.state.payPay = e.target.dataset.pay
        if (e.target.dataset.type == 'DATA') {
            Tool.gaTo('普通抢线索','待处理的线索',GAs)
            this.state.shearName = this.state.DATA[e.target.dataset.id].clueresourcename
            this.RobLine(2)
        } else {
            Tool.gaTo('普通抢线索','待处理推荐线索',GAs)
            this.state.shearName = this.state.TJRO[e.target.dataset.id].clueresourcename
            this.MyRobLine(2)
        }
    }
    showAcom () {this.setState({showAcom: true})}
    hideAcom () {this.setState({showAcom: false})}
    hideAlert () {this.setState({alertShow: false})}
    goVal(){
        this.context.router.push({pathname: '/myacut'})
        Tool.gaTo('充值流程','点击前去充值','余额不足弹窗')
    }
    RobLine(sruo){
        this.setState({payShow: false,branLin:[]})
        let clusUrl = window.location.hash.replace(/#/g,'')
        let goUrlclus = clusUrl.split("?")
        Tool.localItem('clueURl',goUrlclus[0])
        let sessionid
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId
        }else{
            sessionid = Tool.SessionId.get()
        }
        let GAs = this.state.shearName + '|' + this.state.payId + '|无|无'
        if(sruo == '1'){
            Tool.gaTo('购买线索-点击确认购买','抢线索页的线索',GAs)
        }
        Tool.get('Clues/GetCluesDetail.aspx',{sessionid:sessionid,cluesextendid: this.state.payId,saleprice:this.state.payPay,paybrandid:this.state.banid},
            (res) => {
                if(res.status == 1){
                    if(sruo == '1'){
                        Tool.gaTo('购买线索-购买成功','抢线索页的线索',GAs);
                    } else {
                        Tool.gaTo('普通抢线索-抢线索成功','抢线索页的线索',GAs);
                    }
                    let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    this.context.router.push({pathname: urlTxt});
                } else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'});
                } else {
                    if(sruo == '1'){
                        Tool.gaTo('购买线索-购买失败','抢线索页的线索',res.msg)
                    } else {
                        Tool.gaTo('普通抢线索-抢线索失败','抢线索页的线索',res.msg)
                    }
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
                            valShow: false
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
    MyRobLine(sruo){
        this.setState({payShow: false,branLin:[]})
        let sessionid
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId
        }else{
            sessionid = Tool.SessionId.get()
        }
        let GAs = this.state.shearName + '|' + this.state.payId + '|无|无'
        if(sruo == '1'){
            Tool.gaTo('购买线索-点击确认购买','待处理推荐线索',GAs)
        }
        Tool.get('PublicClues/RobCustomer.aspx',{sessionid:sessionid,cluesid:this.state.payId,saleprice:this.state.payPay,paybrandid:this.state.banid,isrecommendgrab:1},
            (res) => {
                if(res.status == 1){
                    if(sruo == '1'){
                        Tool.gaTo('购买线索-购买成功','待处理推荐线索',GAs);
                    } else {
                        Tool.gaTo('普通抢线索-抢推荐线索成功','待处理推荐线索',GAs);
                    }
                    let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    this.context.router.push({pathname: urlTxt});
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
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
                            valShow: false
                        })
                        return false
                    }
                    Alert.to(res.msg)
                    if(sruo == '1'){
                        Tool.gaTo('购买线索-购买失败','待处理推荐线索',res.msg)
                    } else {
                        Tool.gaTo('普通抢线索-抢线索失败','待处理推荐线索',res.msg)
                    }
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    componentDidMount() {
        this.props.hideS();
        this.upDATA();
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut)
    }
    render() {
        const {loadingS, DATA,isDatas , payShow, payMsg, payTitle, payBtn,showAcom,alertShow,alertTitle,alertBtn, valShow,branLin,isGore, valBtn, valMsg, TJRO,freeavailablerobnum} = this.state
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
                                 data-pay={e.saleprice} data-id={index} data-type="DATA"
                                 onClick={self.payConfirm} plain>{e.btnname}<i style={{display: e.btncoupontxt.length > 0 ? '':'none'}}>{e.btncoupontxt}</i></Button>
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
                                 data-pay={e.saleprice} data-id={index} data-type="TJRO"
                                 onClick={self.payConfirm} plain>{e.btnname}<i style={{display: e.btncoupontxt.length > 0 ? '':'none'}}>{e.btncoupontxt}</i></Button>
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
            <Confirm title="请选择帐户支付购买" buttons={isGore == '0' ? payBtn : valBtn} show={payShow}>
                {payMsg}
                <div onClick={this.showAcom} className="showAcom">？</div>
                <h2 style={{textAlign: 'center',color:'#333',fontSize:'17px'}}>{payTitle}</h2>
                <div style={{display: freeavailablerobnum>0 ? '' : 'none'}}>剩余{freeavailablerobnum}条免费额度</div>
                <Form style={{marginTop: 0}} radio>
                {branLin.map( (db,index) => 
                    <FormCell key={index} radio>
                        <CellBody style={{display: db.canuse == 0 ? '' : 'none'}}>{db.accountname}（剩余¥{db.availablebalance}）<br/>余额不足</CellBody>
                        <CellBody style={{display: db.canuse == 0 ? 'none' : '',color: db.canuse == '0' ? null : '#333'}}>{db.accountname}（剩余¥{db.availablebalance}）</CellBody>

                        <Radio name="radiopay" value={db.brandid} onChange={this.RADIO} disabled={db.canuse == 0 ? true : false} defaultChecked={db.canuse == 1 ? true : false}/>
                    </FormCell>
                )}
                </Form>
            </Confirm>
            <div className="acomBoxs" style={{display: showAcom ? '':'none'}} onClick={this.hideAcom}>
                <h4>线索购买与规则说明</h4>
                <p>1、购买询价线索后24小时之内，没有设置客户级别或添加跟进记录，该询价线索将返回公共线索池，您将无法在卡商宝和卡销宝中查看该线索的联系方式</p>
                <p>2、从“可能感兴趣”线索列表和速抢线索列表中购买的询价线索，若在设置的回访日期后48小时之内，仍没有添加新的跟进记录，该询价线索将返回公共线索池，您将无法在卡商宝和卡销宝中查看该线索的联系方式</p>
                <p>3.询价线索根据上述规则返回公共线索池后，由于未查看联系方式或联系方式忘记、遗失等情况造成您无法联系询价用户，该后果由您自行承担</p>
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
