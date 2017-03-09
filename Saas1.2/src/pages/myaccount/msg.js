import React,{Component} from 'react'
import { Tool, Alert } from '../../tool.js'
import {LoadAd,NoMor,NoDataS} from '../../component/more.js'

class Lists extends React.Component {
    constructor(){
        super()
        this.state = {
            loadingS: true,
            isDatas: false,
            loadPage: true,
            nowpage:1,
            DATA:[],
        }
        this.Fenx = this.Fenx.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }
    
    upDATA(){
        let json = {};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get()
        }
        json.nowpage = this.state.nowpage
        this.state.loadPage = false
        Tool.get('Goods/Recharge/GetPayMoney_OrderList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage
                    let DATA = this.state.DATA
                    DATA.push(...res.data.paymoney_orderList)
                    if (res.pagecount == page || res.pagecount === 0){
                        if (res.data.paymoney_orderList.length === 0) {
                            this.setState({
                                isDatas: true
                            })
                        }else{
                            this.setState({
                                DATA: DATA,
                                loadingS: false
                            })
                        }
                    } else {
                        page++
                        this.setState({
                            DATA: DATA,
                            loadPage: true,
                            nowpage: page
                        })
                    }
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
        this.upDATA()
    }
    componentDidMount() {
        wx.ready(function(){
            wx.hideOptionMenu()
        })
    }
    Fenx() {
      Tool.gaTo('分享店铺','分享成功？','')
    }
    handleScroll (e) {
      let BodyMin = e.target
      let DataMin,Hit,LastLi,goNumb
      DataMin = BodyMin.scrollHeight
      Hit  = window.screen.height
      LastLi = BodyMin.scrollTop
      goNumb = DataMin - Hit - LastLi
      if(goNumb <= 0){
        if(this.state.loadingS){
            if(this.state.loadPage){
                this.upDATA()
            }
        }
      }
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut)
    }
    render() {
        const {loadingS,DATA,isDatas} = this.state
        let footer
        if (isDatas) {
            footer = <NoDataS />
        }else{
            footer = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <NoMor />
        }
        return (
        <div className="we_box" onScroll={this.handleScroll}>
            {DATA.map( (db,index) => 
           <ul className="we_height we_height_mt" key={index}>
                <li className="we_list we_wh">{db.paydate}</li>
                <li className="we_wh paycol">到账金额:¥ {parseFloat(db.paymoney) + parseFloat(db.givenmoney)}</li>
                <li className="we_list we_wh siz">{db.realname} {db.tel}</li>
                <li className="we_wh siz">实付:¥ {db.paymoney}</li>
                <li className="we_allw">充值帐户:{db.accountname}</li>
                <li className="we_allw">订单号:{db.ordeerid}</li>
            </ul>
            )}
            { footer }
        </div>
        )
    }
}


export default Lists

