"use strict";

import React from 'react';
import {Button,
    TextArea,
    ButtonArea,
    Form,
    FormCell,
    CellHeader,
    Label,
    Input,
    Cells,
    Cell,
    CellFooter,
    Dialog,
    Checkbox,
    Radio,
    CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import ShowAlert from '../../component/Alert.js'
import {Tool,Alert,AllMsgToast} from '../../tool.js';
import './index.less';
class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            BUYCLU: {},
            DATArob: {},
            showDonwn: false,

            showAcom: false, // 显示线索处理规则
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
        };
        
        let self = this
        this.payConfirm = this.payConfirm.bind(this)
        this.showAcoms = this.showAcoms.bind(this)
        this.ShoDonwn = this.ShoDonwn.bind(this)
        this.HidDonwn = this.HidDonwn.bind(this)
        this.hideAcom = this.hideAcom.bind(this)
        this.Back = this.Back.bind(this)
        this.addPursue = this.addPursue.bind(this)
        this.RADIO = this.RADIO.bind(this)
    }

    ShoDonwn(){this.setState({showDonwn:true});}
    HidDonwn(){this.setState({showDonwn:false});}
    showAcoms () {this.setState({showAcom: true})}
    hideAcom () {this.setState({showAcom: false})}
    hideAlert () {this.setState({alertShow: false})}
    componentWillMount(){
        let persId = JSON.parse(Tool.localItem('BUYCLU'))
        let json={};
        let sessionid;
        this.setState({BUYCLU: persId})
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        json.sessionid = sessionid;
        json.cluesid = persId.id;
        Tool.get('Clues/GetCleanCluesDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({DATArob:res.data})
                }else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'})
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        );
    }
    hidePayConfm (){
        this.setState({payShow: false,valShow: false,branLin:[]})
    }
    hideValConfm (){
        this.setState({valShow: false,payShow: false,branLin:[]})
        Tool.gaTo('充值流程','点击暂不充值','余额不足弹窗')
    }
    RADIO (e) {
        this.setState({
            banid: e.target.value
        })
    }
    Grob () {
        if(this.state.BUYCLU.tp == 1){
            this.RobLine(1)
        } else {
            this.MyRobLine(1)
        }
    }
    // 按钮付费
    payConfirm (e) {
        let sessionid
        let json = {}
        const {BUYCLU,DATArob} = this.state
        if (BUYCLU.m == '1') {
            if(typeof(Tool.SessionId) == 'string'){
                sessionid= Tool.SessionId
            }else{
                sessionid = Tool.SessionId.get()
            }
            json.sessionid = sessionid
            if(BUYCLU.tp == 1) {
                json.paycluestype = 0
                json.extcluesid = BUYCLU.id
            } else {
                json.paycluestype = 1
                json.maincluesid = BUYCLU.id
            }
            json.saleprice = BUYCLU.pay
            Tool.get('Clues/GetCluesPayInfo.aspx',json,
                (res) => {
                    if (res.status == '1') {
                        let ccnm
                        if (BUYCLU.tp == 1) {
                            this.setState({
                                payMsg: DATArob.truckname
                            })
                        } else {
                            this.setState({
                                payMsg: DATArob.truckname
                            })
                        }

                        for(let ssc in res.data.brandlist){
                            if(res.data.brandlist[ssc].canuse == 1){
                                ccnm = res.data.brandlist[ssc].brandid
                            }
                        }

                        this.setState({
                            payShow: true,
                            branLin: res.data.brandlist,
                            banid: ccnm,
                            isGore: res.data.gorecharge,
                            freeavailablerobnum: res.data.freeavailablerobnum,
                            payTitle: `¥ ${BUYCLU.pay}`,
                            payId: BUYCLU.id,
                            payPay: BUYCLU.pay
                        })
                    } else {
                        this.setState({
                            alertTitle: res.msg,
                            alertShow: true
                        })
                    }
                },
                (err) => {
                    Alert.to('请求超时，稍后重试。。')
                }
            )
        } else {
            this.state.payId = BUYCLU.id
            this.state.payPay = BUYCLU.pay
            if (BUYCLU.tp == 1) {
                this.RobLine(2)
            } else {
                this.MyRobLine(2)
            }
        }

    }
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

        Tool.get('Clues/GetCluesDetail.aspx',{sessionid:sessionid,cluesextendid: this.state.payId,saleprice:this.state.payPay,paybrandid:this.state.banid},
            (res) => {
                if(res.status == 1){
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
    MyRobLine(sruo){
        this.setState({payShow: false,branLin:[]})
        let sessionid
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId
        }else{
            sessionid = Tool.SessionId.get()
        }

        Tool.get('PublicClues/RobCustomer.aspx',{sessionid:sessionid,cluesid:this.state.payId,saleprice:this.state.payPay,paybrandid:this.state.banid,isrecommendgrab:1},
            (res) => {
                if(res.status == 1){
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
                            valShow: true
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

    }
    addPursue(e){
        let urlTxt = '/addPursue?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    Back (e) {
        window.history.back()
    }
    render() {
        const {showDonwn,BUYCLU,isGore,payShow,payMsg,payTitle,payBtn,showAcom,alertShow,alertTitle,alertBtn,valShow,branLin,valBtn,valMsg,TJRO,freeavailablerobnum} = this.state
        const {truckname,realname,tel,brandname,identitys,expectedtimecar,loanproportioname,cheliangyongtuname,consideration1,consideration2,provincename,cityname,isloanname,goucheshuliang,cleanclueslevel,isbuysecondcar,remark,cluecreatedatetime,comparetruckname,potential} = this.state.DATArob
        let loadShow = true
        let self = this
        if(tel !== '' && typeof(tel) !== 'undefined'){loadShow = false;}
        return (
            <div className="account robClues">
                <div className="bd">
                    <Form>
                        <FormCell>
                            <CellHeader><Label>意向车型</Label></CellHeader>
                            <CellBody>
                                {truckname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>客户姓名</Label></CellHeader>
                            <CellBody>
                                {realname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>客户电话</Label></CellHeader>
                            <CellBody>
                                {tel}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>提车地区</Label></CellHeader>
                            <CellBody>
                                {provincename +' '+cityname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>询价时间</Label></CellHeader>
                            <CellBody>
                                {cluecreatedatetime}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form>
                        <FormCell style={{'display':goucheshuliang > 0 ?'':'none'}}>
                            <CellHeader><Label>拟购台数</Label></CellHeader>
                            <CellBody>
                                {goucheshuliang}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':isloanname != '' ?'':'none'}}>
                            <CellHeader><Label>是否贷款</Label></CellHeader>
                            <CellBody>
                                {isloanname}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':loanproportioname != '' ?'':'none'}}>
                            <CellHeader><Label>首付比例</Label></CellHeader>
                            <CellBody>
                                {loanproportioname}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':cleanclueslevel > 0 && expectedtimecar != ''?'':'none'}}>
                            <CellHeader><Label>购车时间</Label></CellHeader>
                            <CellBody>
                                {expectedtimecar}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form style={{'display':showDonwn?'':'none'}}>
                        <FormCell style={{'display':identitys != '' ?'':'none'}}>
                            <CellHeader><Label>卡友身份</Label></CellHeader>
                            <CellBody>
                                {identitys}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':comparetruckname != '' ?'':'none'}}>
                            <CellHeader><Label>对比车型</Label></CellHeader>
                            <CellBody>
                                {comparetruckname}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':cheliangyongtuname != '' ?'':'none'}}>
                            <CellHeader><Label>购车用途</Label></CellHeader>
                            <CellBody>
                                {cheliangyongtuname}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':consideration1 != '' ?'':'none'}}>
                            <CellHeader><Label>考虑因素</Label></CellHeader>
                            <CellBody>
                                {consideration1}
                            </CellBody>
                        </FormCell>
                        
                        <FormCell style={{'display':consideration2 != '' ?'':'none'}}>
                            <CellHeader><Label>其他因素</Label></CellHeader>
                            <CellBody>
                                {consideration2}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':potential != '' ?'':'none'}}>
                            <CellHeader><Label>购车倾向</Label></CellHeader>
                            <CellBody>
                                {potential}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{'display':isbuysecondcar != '' ?'':'none'}}>
                            <CellHeader><Label>二手车</Label></CellHeader>
                            <CellBody>
                                {isbuysecondcar}
                            </CellBody>
                        </FormCell>
                        <FormCell style={{display: remark != '' ? '' : 'none'}}>
                            <CellHeader><Label>备注</Label></CellHeader>
                            <CellBody>
                                <pre>{remark}</pre>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div style={{'display':cleanclueslevel > 0?'block':'none'}}>
                        <div className="openClue" style={{'display':showDonwn?'none':'block'}} onClick={this.ShoDonwn}>展开详细信息</div>
                        <div className="openClue UP" style={{'display':showDonwn?'block':'none'}} onClick={this.HidDonwn}>收起详细信息</div>
                    </div>
                </div>
                <ul className="FollBtn">
                  <li style={{width: '30%'}} onClick={this.Back}>返回</li>
                  <li style={{width: '70%'}} onClick={this.payConfirm}>￥{BUYCLU.pay}<i style={{marginLeft: '15px'}}>立即购买</i></li>
                </ul>

                <Confirm title="请选择帐户支付购买" buttons={isGore == '0' ? payBtn : valBtn} show={payShow}>
                {payMsg}
                    <div onClick={this.showAcoms} className="showAcom">？</div>
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


                <div className="jump-cover" id="jump_cover" style={{'display':loadShow?'block':'none'}}>
                    <div className="loading visible">
                        <span className="loading-ring"> </span>
                    </div>
                </div>
                <ShowAlert />
            </div>
        );
    }
};


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
