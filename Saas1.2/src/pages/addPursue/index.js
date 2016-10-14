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
import LB from '../sidebar/LB';//类别
import PP from '../sidebar/PP';//品牌
import XL from '../sidebar/XL';//系列
import CX from '../sidebar/CX';//车型
import JB from '../sidebar/JB';//客户级别
import GJ from '../sidebar/GJ';//跟进方式
import ZB from '../sidebar/ZB';//战败原因
import {Tool,Alert} from '../../tool.js';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            CPLBrandoms:'',
            CPLBv:'',
            QCPPrandoms:'',
            QCPPv:'',
            QCXLrandoms:'',
            QCXLv:'',
            QCCXrandoms:'',
            QCCXv:'',
            KHJBrandoms:'',
            KHJBv:'',
            ZBrandoms:'',
            ZBv:'',
            GJrandoms:'',
            GJv:'',
            price:'',
            followupdate:'2016-06-05 09:38:00',
            msg:'',
            failTime:'',
            dealTime:'',
            pay:'',
            Ypay:'',
            showConfirm: false,
            confirm: {
                title: '信息没保存，是否放弃？',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },{
                        type: 'primary',
                        label: '确定退出',
                        onClick: this.goWell.bind(this)
                    }
                ],
            },
        };
        this.pursueTime = (e) => {this.state.followupdate = e.target.value;}
        this.msgInput = (e) => {this.state.msg = e.target.value;}
        this.dealInput = (e) => {this.state.dealTime = e.target.value;}
        this.PayInput = (e) => {this.state.pay = e.target.value;}
        this.yPayInput = (e) => {this.state.Ypay = e.target.value;}
        this.failInput = (e) => {this.state.failTime = e.target.value;}
        this.onSaves = this.onSaves.bind(this);
        let self = this;
        this.CPLB = this.CPLB.bind(this);
        this.QCPP = this.QCPP.bind(this);
        this.QCXL = this.QCXL.bind(this);
        this.QCCX = this.QCCX.bind(this);
        this.KHJB = this.KHJB.bind(this);
        this.ZB = this.ZB.bind(this);
        this.GJ = this.GJ.bind(this);
    }
    getTimeLocal(){
        let format = "";
        var nTime = new Date();
        format += nTime.getFullYear()+"-";
        format += (nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1);
        format += "-";
        format += nTime.getDate()<10?"0"+(nTime.getDate()):(nTime.getDate());
        format += "T";
        format += nTime.getHours()<10?"0"+(nTime.getHours()):(nTime.getHours());
        format += ":";
        format += nTime.getMinutes()<10?"0"+(nTime.getMinutes()):(nTime.getMinutes());
        format += ":00";
        document.getElementById("pursueTime").value = format;
    }
    componentDidMount() {
        document.title = '添加跟进记录';
        document.getElementById('FailTime').valueAsDate = new Date();
        document.getElementById('DealTime').valueAsDate = new Date();
        this.getTimeLocal();
        this.setState({
            dealTime:document.getElementById('DealTime').value,
            failTime:document.getElementById('FailTime').value
        });
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].end();
        }
        XHRLIST = [];
    }
    CPLB(){this.setState({
        CPLBrandoms: Math.random(),
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        KHJBrandoms:'',
        ZBrandoms:'',
        GJrandoms:'',
    });}
    QCPP(){
        if(this.state.CPLBv !== '' && typeof(this.state.CPLBv.subcategoryid) !== 'undefined'){
             this.setState({
                QCPPrandoms: Math.random(),
                CPLBrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                KHJBrandoms:'',
                ZBrandoms:'',
                GJrandoms:'',
            });
        }else{
            Alert.to('请选择类别');
        }
    }
    QCXL(){
        if(this.state.QCPPv !== '' && typeof(this.state.QCPPv.brandid) !== 'undefined'){
             this.setState({
                QCXLrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCCXrandoms:'',

                KHJBrandoms:'',
                ZBrandoms:'',
                GJrandoms:'',
            });
        }else{
            Alert.to('请选择品牌');
        }
    }
    QCCX(){
        if(this.state.QCXLv !== '' && typeof(this.state.QCXLv.seriesid) !== 'undefined'){
             this.setState({
                QCCXrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCXLrandoms:'',

                KHJBrandoms:'',
                ZBrandoms:'',
                GJrandoms:'',
            });
        }else{
            Alert.to('请选择系列');
        }
    }
    KHJB(){this.setState({
        KHJBrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        ZBrandoms:'',
        GJrandoms:'',
    });}
    GJ(){this.setState({
        GJrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        KHJBrandoms:'',
        ZBrandoms:'',
    });}
    ZB(){this.setState({
        ZBrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        KHJBrandoms:'',
        GJrandoms:'',
    });}

    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    goWell(){ this.context.router.push({pathname: '/nav'});}

    checkForm(){
        if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
            Alert.to("客户级别不能为空");
            return false;
        }else if(this.state.KHJBv.values == 5){
            if(this.state.CPLBv == '' || typeof(this.state.CPLBv.subcategoryid) == 'undefined'){
                Alert.to("成交类别不能为空");
                return false;
            }
            if(this.state.QCPPv == '' || typeof(this.state.QCPPv.brandid) == 'undefined'){
                Alert.to("成交品牌不能为空");
                return false;
            }
            if(this.state.QCXLv == '' || typeof(this.state.QCXLv.seriesid) == 'undefined'){
                Alert.to("成交系列不能为空");
                return false;
            }
            if(this.state.QCCXv == '' || typeof(this.state.QCCXv.productid) == 'undefined'){
                Alert.to("成交车型不能为空");
                return false;
            }
            if(this.state.pay == ''){
                Alert.to("成交价格不能为空");
                return false;
            }
            if(this.state.dealTime == ''){
                Alert.to("成交时间不能为空");
                return false;
            }
        }else if(this.state.KHJBv.values == 6){
            if(this.state.ZBv == '' || typeof(this.state.ZBv.values) == 'undefined'){
                Alert.to("战败原因不能为空");
                return false;
            }
            if(this.state.failTime == ''){
                Alert.to("战败时间不能为空");
                return false;
            }
        }else if(this.state.KHJBv.values !== '6' && this.state.KHJBv.values !== '5'){
            if(this.state.Ypay == ''){
                Alert.to("预期价格不能为空");
                return false;
            }
        }
        
        if(this.state.GJv == '' || typeof(this.state.GJv.values) == 'undefined'){
            Alert.to("跟进方式不能为空");
            return false;
        }
        if(this.state.followupdate == ''){
            Alert.to("跟进时间不能为空");
            return false;
        }
        if(this.state.msg.length > 800){
            Alert.to("备注字数不能超过800");
            return false;
        }
        return true;
    }
    onSaves(){
        let persId = Tool.getQueryString('id');
        if(this.checkForm()){
            let json = {};
            if(typeof(Tool.SessionId) == 'string'){
                json.sessionid = Tool.SessionId;
            }else{
                json.sessionid = Tool.SessionId.get();
            }
            json.cluesextendid = persId;
            let Uptimes = this.state.followupdate.replace(/T/g,' ');
            let Followupdate = Uptimes ;
            if(Uptimes.length == 16){
                Followupdate = Uptimes + ':00';
            }
            json.followupdate = Followupdate;
            json.followuptypeid = this.state.GJv.values;
            if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
                json.clueslevel = '';
            }else{
                json.clueslevel = this.state.KHJBv.values;
                if(this.state.KHJBv.values == 5){
                    json.price = this.state.pay;
                    json.dealtsubcategoryid = this.state.CPLBv.subcategoryid;
                    json.dealtbrandid = this.state.QCPPv.brandid;
                    json.dealtseriesid = this.state.QCXLv.seriesid;
                    json.dealttruckid = this.state.QCCXv.productid;
                    json.dealtdate = this.state.dealTime.replace(/-/g,'/');
                }
                if(this.state.KHJBv.values == 6){
                    if(this.state.ZBv == '' || typeof(this.state.ZBv.values) == 'undefined'){
                        json.failid = '';
                    }else{
                        json.failid = this.state.ZBv.values;
                    }
                    json.faildate = this.state.failTime.replace(/-/g,'/');
                }
                if(this.state.KHJBv.values !== '6' && this.state.KHJBv.values !== '5'){
                    json.price = this.state.Ypay;
                    json.addday = this.state.KHJBv.addday;
                }
            }
            json.remark = this.state.msg;
            //console.log(JSON.stringify(this.state),json);
            Tool.get('Clues/AddClueFollowUp.aspx',json,
                (res) => {
                    if(res.status == 1){
                        this.context.router.push({
                            pathname: '/nav'
                        });
                    }else if(res.status == 901){
                        Alert.to(res.msg);
                        this.context.router.push({pathname: '/loading'});
                    }else{
                        Alert.to(res.msg);
                    }
                },
                (err) => {
                    Alert.to('网络异常，稍后重试。。');
                }
            )
        }
    }
    render() {
        let CPLBval;
        let QCPPval;
        let QCXLval;
        let QCCXval;
        let KHJBval;
        let ZBval;
        let GJval;
        let showDeal = false;
        let showFail = false;
        let showPAY = true;
        if(this.state.CPLBv !== '' && typeof(this.state.CPLBv.subcategoryname) !== 'undefined'){
             CPLBval = this.state.CPLBv.subcategoryname;
        }else{
            CPLBval = '';
        }
        if(this.state.QCPPv !== '' && typeof(this.state.QCPPv.brandname) !== 'undefined'){
             QCPPval = this.state.QCPPv.brandname;
        }else{
            QCPPval = '';
        }
        if(this.state.QCXLv !== '' && typeof(this.state.QCXLv.seriesname) !== 'undefined'){
             QCXLval = this.state.QCXLv.seriesname;
        }else{
            QCXLval = '';
        }
        if(this.state.QCCXv !== '' && typeof(this.state.QCCXv.productname) !== 'undefined'){
             QCCXval = this.state.QCCXv.productname;
        }else{
            QCCXval = '';
        }
        if(this.state.KHJBv !== '' && typeof(this.state.KHJBv.key) !== 'undefined'){
             KHJBval = this.state.KHJBv.key +' '+this.state.KHJBv.adddayname;
             switch(this.state.KHJBv.values){
                case '5':
                    showDeal = true;
                    showFail = false;
                    showPAY = false;
                    break;
                case '6':
                    showDeal = false;
                    showFail = true;
                    showPAY = false;
                    break;
                default:
                    showDeal = false;
                    showFail = false;
                    showPAY = true;
             }
        }else{
            KHJBval = '';
        }
        if(this.state.ZBv !== '' && typeof(this.state.ZBv.key) !== 'undefined'){
             ZBval = this.state.ZBv.key;
        }else{
            ZBval = '';
        }
        if(this.state.GJv !== '' && typeof(this.state.GJv.key) !== 'undefined'){
             GJval = this.state.GJv.key;
        }else{
            GJval = '';
        }
        return (
            <Page className="account addPursd">
                <Cells access>
                    <Cell>
                        <CellHeader><Label>跟进时间</Label></CellHeader>
                        <CellBody>
                            <Input type="datetime-local" id="pursueTime" onChange={this.pursueTime}/>
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>跟进方式</Label></CellHeader>
                        <CellBody onClick={this.GJ}>
                            <Input type="text" placeholder="请填选择跟进方式" value={GJval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>客户级别</Label></CellHeader>
                        <CellBody onClick={this.KHJB}>
                            <Input type="text" placeholder="请填写客户级别" value={KHJBval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>

                <Cells style={{'display':showDeal?'block':'none'}} access>
                    <Cell>
                        <CellHeader><Label>成交类别</Label></CellHeader>
                        <CellBody onClick={this.CPLB}>
                            <Input type="text" placeholder="请选择类别" value={CPLBval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>成交品牌</Label></CellHeader>
                        <CellBody onClick={this.QCPP}>
                            <Input type="text" placeholder="请选择品牌"  value={QCPPval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>成交系列</Label></CellHeader>
                        <CellBody onClick={this.QCXL}>
                            <Input type="text" placeholder="请选择系列" value={QCXLval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>成交车型</Label></CellHeader>
                        <CellBody onClick={this.QCCX}>
                            <Input type="text" placeholder="请选择车型" value={QCCXval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>成交价格</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写价格" onInput={this.PayInput}/>
                        </CellBody>
                        <CellFooter className="cleAft">万元</CellFooter>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>成交时间</Label></CellHeader>
                        <CellBody>
                            <Input type="date" id="DealTime" onChange={this.dealInput}/>
                        </CellBody>
                    </Cell>
                </Cells>

                <Cells style={{'display': showFail ? 'block':'none'}} access>
                    <Cell>
                        <CellHeader><Label>战败原因</Label></CellHeader>
                        <CellBody onClick={this.ZB}>
                            <Input type="text" placeholder="请选择战败原因" value={ZBval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>战败时间</Label></CellHeader>
                        <CellBody>
                            <Input type="date" id="FailTime" onChange={this.failInput}/>
                        </CellBody>
                    </Cell>
                </Cells>

                <Cells style={{'display': showPAY ? 'block':'none'}}>
                    <Cell>
                        <CellHeader><Label>预期价格</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请填写价格" onInput={this.yPayInput} />
                        </CellBody>
                        <CellFooter className="cleAft">万元</CellFooter>
                    </Cell>
                </Cells>

                <Cells>
                    <Cell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <TextArea placeholder="请填写备注" rows="2" maxlength="800" onInput={this.msgInput}></TextArea>
                        </CellBody>
                    </Cell>
                </Cells>

                <ButtonArea>
                    <Button onClick={this.onSaves}  style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <LB Datas={this.state.CPLBrandoms} onChange={val => this.setState({CPLBv: val,CPLBrandoms:'CPLBrandoms',QCPPv:'',QCXLv:'',QCCXv:''})}/>
                <PP Datas={this.state.QCPPrandoms}
                    subcategoryid={this.state.CPLBv.subcategoryid}
                    onChange={val => this.setState({QCPPv: val,QCPPrandoms:'QCPPrandoms',QCXLv:'',QCCXv:''})}/>
                <XL Datas={this.state.QCXLrandoms}
                    brandid={this.state.QCPPv.brandid}
                    onChange={val => this.setState({QCXLv: val,QCXLrandoms:'QCXLrandoms',QCCXv:''})}/>
                <CX Datas={this.state.QCCXrandoms}
                    seriesid={this.state.QCXLv.seriesid}
                    onChange={val => this.setState({QCCXv: val,QCCXrandoms:'QCCXrandoms'})}/>
                <JB Datas={this.state.KHJBrandoms} onChange={val => this.setState({KHJBv: val,KHJBrandoms:'KHJBrandoms'})}/>
                <ZB Datas={this.state.ZBrandoms} onChange={val => this.setState({ZBv: val,ZBrandoms:'ZBrandoms'})}/>
                <GJ Datas={this.state.GJrandoms} onChange={val => this.setState({GJv: val,GJrandoms:'GJrandoms'})}/>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
