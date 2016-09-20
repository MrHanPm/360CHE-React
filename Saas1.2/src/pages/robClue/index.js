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
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
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
                title: '跟进24小时内未设置客户级别的线索将返回到公共线索池',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideAlertCfm.bind(this)
                    },{
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
    }
    ShoDonwn(){this.setState({showDonwn:true});}
    HidDonwn(){this.setState({showDonwn:false});}
    SDS(e){
        let st = parseInt(e.target.title);
        this.setState({SDSrandoms:st});
    }
    goBeac(){
        let persId = this.getQueryString('id');
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //sessionid = oldData.sessionid;
        let sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        Tool.get('Clues/ChangeCluesStatus.aspx',{sessionid:sessionid,cluesextendid:persId},
            (res) => {
                if(res.status == 1){
                    this.context.router.push({
                        pathname: '/nav'
                    });
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    getQueryString(name) {
        let conts = window.location.hash.split("?");
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = conts[1].match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        else {
            return null;
        }
    }

    componentDidMount() {
        document.title = '线索详情';
        let persId = this.getQueryString('id');
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        let sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        json.sessionid = sessionid;
        json.cluesextendid = persId;
        Tool.get('Clues/GetCluesDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({DATArob:res.data});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
        Tool.get('Clues/GetClueFollowUpList.aspx',{sessionid:sessionid,cluesextendid:persId},
            (res) => {
                if(res.status == 1){
                    console.log(JSON.stringify(res.listdata[0]));
                    if(res.reccount > 0){
                        this.setState({showDonwn: false,Messrob:res.listdata,reccount:res.reccount});
                    }else{
                        this.setState({Messrob:res.listdata,showAlertCfm:true});
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

    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    hideAlertCfm(){this.setState({showAlertCfm: false});}
    goChengs(e){
        let data = JSON.stringify(this.state.DATArob);
        Tool.localItem('RobClues',data);
        this.context.router.push({pathname: '/alterClue'});
    }
    addPursue(e){
        let urlTxt = '/addPursue?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    render() {
        let showBtns = false;
        let self = this;
        if(this.state.DATArob !== '' && typeof(this.state.DATArob.realname) !== 'undefined'){
             
        }else{
            
        }
        const {showDonwn,reccount,Messrob} = this.state;
        const {truckname,realname,tel,subcategoryname,brandname,seriesname,clueslevelname,provincename,cityname,clueresourcename,cheliangyongtuname,expectedbycarnum,remark,dealttruckname,dealtsubcategoryname,dealtbrandname,dealtseriesname,transactionprice,dealtdate,failname,faildate,clueslevel,follownum,cluesextendid} = this.state.DATArob;
        if(clueslevelname !== '' && typeof(clueslevelname) !== 'undefined'){showBtns = true;}
        return (
            <Page className="account robClues">
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
                        <CellFooter>A</CellFooter>
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
                            {remark}
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
                                <h4 style={{'display':e.remark == ''?'none':'block'}}>备注：{e.remark}</h4>
                            </dd>
                        )})}
                    </dl>
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
            </Page>
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
        console.log(ints,datas,'bbbbb');
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
        const {followupdate,followuptypename,price,dealtsubcategoryname,clueslevelname,dealtbrandname,dealtseriesname,expectedprice,dealtdate,faildate,dealttruckname,clueslevelid,failname,remark}=this.state.DATA;
        return(
            <div className={showSid?"SideRobClue visible":"SideRobClue"}>
                <header>
                  <span>跟进记录</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
                </header>
                <Form>
                    <FormCell>
                        <CellHeader><Label>跟进时间</Label></CellHeader>
                        <CellBody>
                            {followupdate}
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
                            {price}
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
                                {expectedprice}
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
                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            {remark}
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
