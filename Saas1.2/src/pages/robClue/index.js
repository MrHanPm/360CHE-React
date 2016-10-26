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
            DATArob:'',
            Messrob:[],
            reccount:0,
            showConfirm: false,
            showAlertCfm:false,
            showDonwn:true,
            linkCrm:true,
            clilinkCrm:false,
            SDSrandoms:'',
            confirm: {
                title: '确认放弃这条线索？',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },{
                        type: 'primary',
                        label: '确定',
                        onClick: this.goBeac.bind(this)
                    }
                ],
            },
            AlertCfm: {
                title: '24小时内未跟进,将返回到公共线索池',
                buttons: [
                    {
                        type: 'primary',
                        label: '知道了',
                        onClick: this.hideAlertCfm.bind(this)
                    }
                ],
            },
        };
        
        let self = this;
        this.showConfirm = this.showConfirm.bind(this);
        this.ShoDonwn = this.ShoDonwn.bind(this);
        this.HidDonwn = this.HidDonwn.bind(this);
        this.goChengs = this.goChengs.bind(this);
        this.addPursue = this.addPursue.bind(this);
        this.SDS = this.SDS.bind(this);
        this.addCRM = this.addCRM.bind(this);
        //this.CoLines = this.CoLines.bind(this);
        // window.addEventListener("popstate", function(e) {
        //     self.BackSelf();
        // }, false);
    }
    BackSelf(){
        let urls = localStorage.getItem('clueURl');
        this.context.router.push({pathname: urls});
    }
    ShoDonwn(){this.setState({showDonwn:true});}
    HidDonwn(){this.setState({showDonwn:false});}
    SDS(e){
        let st = parseInt(e.target.title);
        this.setState({SDSrandoms:st});
    }
    goBeac(){
        let persId = Tool.getQueryString('id');
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        Tool.get('Clues/ChangeCluesStatus.aspx',{sessionid:sessionid,cluesextendid:persId},
            (res) => {
                if(res.status == 1){
                    this.context.router.push({
                        pathname: '/nav'
                    });
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    //CoLines(e){
        // let json={};
        // if(typeof(Tool.SessionId) == 'string'){
        //     json.sessionid = Tool.SessionId;
        // }else{
        //     json.sessionid = Tool.SessionId.get();
        // }
        // json.cluesextendid = e.target.title;
        // Tool.get('Clues/AddCluesCallTel.aspx',json,
        //     (res) => {
        //         if(res.status == 1){
        //         }else if(res.status == 901){
        //             alert(res.msg);
        //             this.context.router.push({pathname: '/loading'});
        //         }else{
        //             Alert.to(res.msg);
        //         }
        //     },
        //     (err) => {
        //         Alert.to('请求超时，稍后重试。。');
        //     }
        // );
        // let comId = e.target.getAttribute('data-id');
        // console.log(comId);
    //}
    componentWillMount(){
        let persId = Tool.getQueryString('id');
        let json={};
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        json.sessionid = sessionid;
        json.cluesextendid = persId;
        Tool.get('Clues/GetCluesDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    let dataRobClues = JSON.stringify(res.data);
                    Tool.localItem('RobClues',dataRobClues);
                    this.setState({DATArob:res.data});
                    if(res.data.customid > 0){
                        this.setState({linkCrm:false});
                    }
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        );
        Tool.get('Clues/GetClueFollowUpList.aspx',{sessionid:sessionid,cluesextendid:persId},
            (res) => {
                if(res.status == 1){
                    //console.log(JSON.stringify(res.listdata[0]));
                    if(this.state.DATArob.clueslevel !== 0){this.setState({clilinkCrm:true});}
                    if(res.reccount > 0){
                        this.setState({showDonwn: false,Messrob:res.listdata,reccount:res.reccount});
                    }else{
                        if(this.state.DATArob.clueresourcename == '卡车之家' && this.state.DATArob.clueslevel === 0){
                            this.setState({Messrob:res.listdata,showAlertCfm:true});
                        }else{
                            this.setState({Messrob:res.listdata});
                        }
                    }
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        );
    }
    componentDidMount() {
        document.title = '线索详情';
        var body = document.getElementsByTagName('body')[0];
        var iframe = document.createElement("iframe");
        iframe.style.display="none";
        iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        var d = function() {
          setTimeout(function() {
            iframe.removeEventListener('load', d);
            document.body.removeChild(iframe);
          }, 0);
        };
        iframe.addEventListener('load', d);
        document.body.appendChild(iframe);
        // let star = {title:"title",url: window.location.href};
        // window.history.pushState(star,"title",window.location.href);
    }

    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    hideAlertCfm(){this.setState({showAlertCfm: false});}
    goChengs(e){
        this.context.router.push({pathname: '/alterClue'});
    }
    addPursue(e){
        let urlTxt = '/addPursue?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    addCRM(e){
        let doms = e.target;
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.cluesextendid = e.target.title;
        Tool.get('Customer/AddCustomerFromClues.aspx',json,
            (res) => {
                if(res.status == 1){
                    AllMsgToast.to("已关联CRM");
                    doms.setAttribute('class','');
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    render() {
        let showBtns = false;
        let loadShow=true;
        let self = this;
        if(this.state.DATArob !== '' && typeof(this.state.DATArob.realname) !== 'undefined'){
             
        }else{
            
        }
        const {showDonwn,reccount,Messrob,linkCrm,clilinkCrm} = this.state;
        const {truckname,realname,tel,subcategoryname,brandname,seriesname,clueslevelname,provincename,cityname,clueresourcename,cheliangyongtuname,expectedbycarnum,remark,dealttruckname,dealtsubcategoryname,dealtbrandname,dealtseriesname,transactionprice,dealtdate,failname,faildate,clueslevel,follownum,cluesextendid,customid} = this.state.DATArob;
        if(clueslevelname !== '' && typeof(clueslevelname) !== 'undefined'){showBtns = true;}
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
                            <CellFooter className={linkCrm?'cleAddAft':''} title={cluesextendid} style={{'display':clilinkCrm?'':'none'}} onClick={this.addCRM}/>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>客户电话</Label></CellHeader>
                            <CellBody>
                                {tel}
                            </CellBody>
                            <CellFooter className="cleAft">
                                <a href={`tel:${tel}`} title={cluesextendid} data-id={customid}> </a>
                            </CellFooter>
                        </FormCell>
                    </Form>
                    <Form style={{'display':showDonwn?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>所属类别</Label></CellHeader>
                            <CellBody>
                                {subcategoryname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>所属品牌</Label></CellHeader>
                            <CellBody>
                                {brandname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>所属系列</Label></CellHeader>
                            <CellBody>
                                {seriesname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>客户级别</Label></CellHeader>
                            <CellBody>
                                {clueslevelname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>省份城市</Label></CellHeader>
                            <CellBody>
                                {provincename +' '+cityname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>线索来源</Label></CellHeader>
                            <CellBody>
                                {clueresourcename}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>车辆用途</Label></CellHeader>
                            <CellBody>
                                {cheliangyongtuname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>购车数量</Label></CellHeader>
                            <CellBody>
                                {expectedbycarnum}
                            </CellBody>
                        </FormCell>

                        <Form style={{'display':clueslevel == 5?'block':'none'}}>
                            <FormCell>
                                <CellHeader><Label>成交车型</Label></CellHeader>
                                <CellBody>
                                    {dealttruckname}
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader><Label>成交类别</Label></CellHeader>
                                <CellBody>
                                    {dealtsubcategoryname}
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader><Label>成交品牌</Label></CellHeader>
                                <CellBody>
                                    {dealtbrandname}
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader><Label>成交系列</Label></CellHeader>
                                <CellBody>
                                    {dealtseriesname}
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader><Label>成交价格</Label></CellHeader>
                                <CellBody>
                                    {transactionprice}
                                </CellBody>
                                <CellFooter className="cleAft">万元</CellFooter>
                            </FormCell>
                            <FormCell>
                                <CellHeader><Label>成交时间</Label></CellHeader>
                                <CellBody>
                                    {dealtdate}
                                </CellBody>
                            </FormCell>
                        </Form>
                        <Form style={{'display':clueslevel == 6?'block':'none'}}>
                            <FormCell>
                                <CellHeader><Label>战败原因</Label></CellHeader>
                                <CellBody>
                                    {failname}
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader><Label>战败时间</Label></CellHeader>
                                <CellBody>
                                    {faildate}
                                </CellBody>
                            </FormCell>
                        </Form>
                        <FormCell>
                            <CellHeader><Label>备注</Label></CellHeader>
                            <CellBody>
                                <pre>{remark}</pre>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div style={{'display':reccount > 0?'block':'none'}}>
                        <div className="openClue" style={{'display':showDonwn?'none':'block'}} onClick={this.ShoDonwn}>展开详细信息</div>
                        <div className="openClue UP" style={{'display':showDonwn?'block':'none'}} onClick={this.HidDonwn}>收起详细信息</div>
                        <dl className="MessClues">
                            <dt>跟进记录{reccount}条</dt>
                            {Messrob.map(function(e,index){
                            return(
                                <dd key={index}>
                                    <div title={e.id} onClick={self.SDS}></div>
                                    <p>{e.createdate}</p>
                                    <h4>设置级别为{e.clueslevelname}</h4>
                                    <h4 style={{'display':e.remark == ''?'none':'block'}}>
                                        <span>备注：</span>
                                        <span className="Bkc">{e.remark}</span>
                                    </h4>
                                </dd>
                            )})}
                        </dl>
                    </div>
                </div>
                <ul className="FollBtn" style={{'display':showBtns?'none':'block'}}>
                  <li title={cluesextendid} onClick={this.showConfirm}>放弃这条线索</li>
                  <li title={cluesextendid} onClick={this.addPursue}>添加跟进记录</li>
                </ul>
                <ul className="FollBtn Rightrob" style={{'display':showBtns?'block':'none'}}>
                  <li title={cluesextendid} onClick={this.addPursue}>添加跟进记录</li>
                </ul>
                <span className="ChengClues" title={cluesextendid} onClick={this.goChengs}></span>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <Confirm title={this.state.AlertCfm.title} buttons={this.state.AlertCfm.buttons} show={this.state.showAlertCfm}>
                </Confirm>
                <SideRob data={this.state.Messrob} showD={this.state.SDSrandoms} onChange={val => this.setState({SDSrandoms: val})}/>
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

class SideRob extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DATA:{
                "price":15,"dealtsubcategoryid":64,"dealtsubcategoryname":"载货车","dealtbrandid":155,"dealtbrandname":"广汽吉奥","dealtseriesid":1233,"dealtseriesname":"星旺","dealttruckid":15169,"dealttruckname":"2012款广汽吉奥 星旺M2 精英版 1.0L 60马力 汽油 微卡","dealtdate":"2016/08/25","fail":0,"failname":"","faildate":"","clueslevelcode":"O","id":0,"maincluesid":233,"cluesextendid":314340,"followuptypeid":2,"followuptypename":"上门拜访","expectedprice":0,"clueslevelid":5,"clueslevelname":"O  已成交","followupdate":"2016-08-25 17:25:14","createdate":"2016-08-25 17:25:59","remark":""
            },
            showSid:false
        }
        this.closeSold = this.closeSold.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let ints;
        for(let i=0;i<nextProps.data.length;i++){
            if(nextProps.data[i].id == nextProps.showD){
                ints = i;
                break;
            }
        }
        let datas = nextProps.data[ints];
        //console.log(ints,datas,'bbbbb');
        if(typeof(nextProps.showD) == 'number'){
          this.setState({
            showSid: true,
            DATA:datas,
          });
        }
    }
    closeSold(){this.setState({showSid:false},()=> this.props.onChange('SDSrandoms'));}
    render() {
        const {showSid}=this.state;
        const {createdate,followuptypename,price,dealtsubcategoryname,clueslevelname,dealtbrandname,dealtseriesname,expectedprice,dealtdate,faildate,dealttruckname,clueslevelid,failname,remark}=this.state.DATA;
        return(
            <div className={showSid?"SideRobClue visible":"SideRobClue"}>
                <header>
                  <span>跟进记录</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
                </header>
                <Form className="SRCform">
                    <FormCell>
                        <CellHeader><Label>跟进时间</Label></CellHeader>
                        <CellBody>
                            {createdate}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>跟进方式</Label></CellHeader>
                        <CellBody>
                            {followuptypename}
                        </CellBody>
                    </FormCell>
                    <FormCell style={{'display':clueslevelid !== 5 && clueslevelid !== 6?'':'none'}}>
                        <CellHeader><Label>预期价格</Label></CellHeader>
                        <CellBody>
                            {price=='0'?'无':price}
                        </CellBody>
                        <CellFooter>万元</CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户级别</Label></CellHeader>
                        <CellBody>
                            {clueslevelname}
                        </CellBody>
                    </FormCell>
                    <Form style={{'display':clueslevelid == 5?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>成交类别</Label></CellHeader>
                            <CellBody>
                                {dealtsubcategoryname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交品牌</Label></CellHeader>
                            <CellBody>
                                {dealtbrandname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交系列</Label></CellHeader>
                            <CellBody>
                                {dealtseriesname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交车型</Label></CellHeader>
                            <CellBody>
                                {dealttruckname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交价格</Label></CellHeader>
                            <CellBody>
                                {price=='0'?'无':price}
                            </CellBody>
                            <CellFooter>万元</CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交时间</Label></CellHeader>
                            <CellBody>
                                {dealtdate}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form style={{'display':clueslevelid == 6?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>战败原因</Label></CellHeader>
                            <CellBody>
                                {failname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>战败时间</Label></CellHeader>
                            <CellBody>
                                {faildate}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <FormCell style={{'box-shadow':'0 5px 6px #f6f6f6'}}>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <pre>{remark}</pre>
                        </CellBody>
                    </FormCell>
                </Form>
            </div>
        );
    }
}


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
