import { Dialog,
    Form,
    FormCell,
    CellBody,
    CellFooter,
    Radio,
} from 'react-weui'
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
            ance: 0
        }
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
                    this.setState({
                        ance: res.data.canrobcluestotal,
                        loadingS: false
                    })
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
    }
    componentWillMount(){
        this.getIns()
    }
    componentDidMount() {
        wx.ready(function(){
            wx.hideOptionMenu()
        })
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
        const leftStyle = {textAlign: 'left'}
        const zhongS = {fontSize: '12px', color: 'red'}
        const {dealername} = oldData
        const {loadingS, ance} = this.state
        return (
        <div style={{height: '100%', overflow: 'hidden'}}>
        <div className="we_box">
            <ul className="we_height">
                <li className="we_center sizbig" style={leftStyle}>{dealername}</li>
                <li className="we_center" style={leftStyle}>账户剩余额度：<i style={{color:'#ff9f00'}}>{ance}条</i></li>
            </ul>

            <div className="weui_panel">
                <div className="weui_panel_bd">
                <div className="weui_media_box weui_media_small_appmsg">
                <div className="weui_cells weui_cells_access">
  
                <a className="weui_cell" href="#mamsg">
                    <div className="weui_cell_bd weui_cell_primary">
                    <p>充值订单</p></div><div className="weui_cell_ft"></div>
                </a>
            </div></div></div></div>


            <div className="jump-cover" id="jump_cover" style={{display: loadingS ? '' : 'none'}}>
                <div className="loading visible">
                    <span className="loading-ring"> </span>
                </div>
            </div>
        </div>
        </div>
        )
    }
}

export default MsgDemo
