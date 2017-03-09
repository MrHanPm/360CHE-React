import { Dialog} from 'react-weui'
const { Confirm } = Dialog
import React,{Component} from 'react'
import { Tool, Alert} from '../../tool.js'
import './index.less'
import ShowAlert from '../../component/Alert.js'


class MsgDemo extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
    constructor(){
        super()
        this.state = {
            loadingS: true,
            ance: 0,
            DATA:[],
            payid: 0,
            pay: 0,
            givenPay: 0,

            valShow: false,
            valMsg:'',
            valBtn:[
                {
                    type: 'default',
                    label: '关闭',
                    onClick: this.hideValConfm.bind(this)
                }
            ]
        }
        this.DKNLVAL = this.DKNLVAL.bind(this)
        this.goPay = this.goPay.bind(this)
        this.showConfirms = this.showConfirms.bind(this)
    }
    hideValConfm () {
        this.setState({
            valShow: false
        })
    }
    showConfirms () {
        this.setState({ valShow: true })
    }
    getIns(){
        let json = {}
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId
        }else{
            json.sessionid = Tool.SessionId.get()
        }
        Tool.get('User/GetAccountDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    let ANCE = Tool.localItem('ANCE')
                    this.setState({
                        ance: res.data.availablebalance
                    })
                    if (ANCE > 0 && ANCE > res.data.availablebalance) {
                        let acs = ANCE - res.data.availablebalance
                        Tool.gaTo('充值流程','充值成功',acs)
                    }
                    Tool.localItem('ANCE',res.data.availablebalance)
                }else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'})
                    return
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。')
            }
        )
        Tool.get('Goods/Recharge/GetPayMoney_SysSetList.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({
                        DATA: res.data.paymoney_syssetlist,
                        payid: res.data.paymoney_syssetlist[0].id,
                        pay: res.data.paymoney_syssetlist[0].paymoney,
                        givenPay: res.data.paymoney_syssetlist[0].givenmoney,
                        valMsg: res.infomsg,
                        loadingS: false
                    })
                }else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'})
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。')
            }
        )
    }
    componentWillMount(){
        this.getIns()
    }
    componentDidMount() {
        wx.ready(function(){
            wx.hideOptionMenu()
        })
    }
    DKNLVAL (e) {
        // console.log(e.target.dataset.pay,e.target.value)
        this.setState({
            payid: e.target.value,
            pay: e.target.dataset.pay,
            givenPay: e.target.dataset.givpay
        })
    }
    goPay() {
        let sessionid,url
        // let utl = window.location.href

        Tool.gaTo('充值流程','点击立即充值',this.state.pay)
        if(typeof(Tool.SessionId) == 'string'){
            sessionid = Tool.SessionId
        }else{
            sessionid = Tool.SessionId.get()
        }
        url = `wxpaymoney.aspx?sessionid=${sessionid}&goodsid=${this.state.payid}`
        window.location.href = url
        
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut)
    }
    render() {
        let oldData = JSON.parse(Tool.localItem('vipLodData')) || {}
        let preStyle = {
            maxHeight: '320px',
            overflowY: 'scroll'
        }
        const {realname,dealername} = oldData
        const {loadingS, DATA, ance, pay, givenPay, valBtn, valShow, valMsg} = this.state
        return (
        <div style={{height: '100%', overflow: 'hidden'}}>
        <div className="we_box">
            <ul className="we_height">
                <li className="we_list">{dealername}</li>
                <li className="paycol">¥ {ance}</li>
                <li className="we_list siz">当前帐号：{realname}</li>
                <li className="siz">当前余额</li>
            </ul>
            <div className="weui_cells" style={{marginTop: '10px'}}>
                <div className="weui_cell">
                    <div className="weui_cell_bd">帐户充值</div>
                </div>

                <div className="weui_full">
                {DATA.map( (db,index) =>
                    <label For={'RD'+db.id}  key={index}>
                      <input type="radio" className="weui_check" name="RDCell" id={'RD'+db.id} value={db.id} data-pay={db.paymoney} data-givpay={db.givenmoney} defaultChecked={index === 0 ? true : false} onChange={this.DKNLVAL} />
                      <i className="fcell">{db.paymoney}元</i>
                    </label>
                )}
                </div>

                <div className="weui_cell">
                    <div className="weui_cell_bd we_txt_left">赠送</div>
                    <div className="weui_cell_ft we_txt_right"><i>{givenPay}</i>元</div>
                </div>

                <div className="weui_cell">
                    <div className="weui_cell_bd we_txt_left">到账金额</div>
                    <div className="weui_cell_ft we_txt_right"><i>{parseFloat(pay) + parseFloat(givenPay)}</i>元</div>
                </div>

                <div className="weui_cell">
                    <div className="weui_cell_bd we_txt_left">支付金额</div>
                    <div className="weui_cell_ft we_txt_right"><i>{pay}</i>元</div>
                </div>

                <div className="weui_cell" style={{paddingTop: '20px'}}>
                    <button className="weui_btn weui_btn_plain_primary" onClick={this.goPay}>立即充值</button>
                </div>
                <div className="we_lookpay" onClick={this.showConfirms}>查看《充值说明》</div>
            </div>


            <div className="weui_panel">
                <div className="weui_panel_bd">
                <div className="weui_media_box weui_media_small_appmsg">
                <div className="weui_cells weui_cells_access">
  
            <a className="weui_cell" href="#mamsg"><div className="weui_cell_bd weui_cell_primary"><p>充值订单</p></div><div className="weui_cell_ft"></div></a>
            </div></div></div></div>


            <div className="jump-cover" id="jump_cover" style={{display: loadingS ? '' : 'none'}}>
                <div className="loading visible">
                    <span className="loading-ring"> </span>
                </div>
            </div>
        </div>
            <Confirm title="充值说明" buttons={valBtn} show={valShow}>
                <pre style={preStyle}>{valMsg}</pre>
            </Confirm>
        </div>
        )
    }
}

export default MsgDemo
