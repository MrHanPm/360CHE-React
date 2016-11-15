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
import SF from '../sidebar/SF';//省份
import LB from '../sidebar/LB';//类别
import PP from '../sidebar/PP';//品牌
import XL from '../sidebar/XL';//系列
import CX from '../sidebar/CX';//车型
import JB from '../sidebar/JB';//客户级别
import XS from '../sidebar/XS';//线索
import YT from '../sidebar/YT';//用途
import ZB from '../sidebar/ZB';//战败原因
import {Tool,Alert,AllMsgToast} from '../../tool.js';
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
            SFCSrandoms:'',
            SFCSv:'',
            KHJBrandoms:'',
            KHJBv:'',
            XSLYrandoms:'',
            XSLYv:'',
            CLYTrandoms:'',
            CLYTv:'',
            ZBrandoms:'',
            ZBv:'',
            name:'',
            phone:'',
            numb:0,
            msg:'',
            dealdate:'',
            pay:'',
            faildate:'',
            Checkboxs:1,
            crmShow:false,
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
        this.nameInput = (e) => {this.setState({name:e.target.value,
                QCPPrandoms:'',
                CPLBrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
        });}
        this.phoneInput = (e) => {
            let phs = e.target.value;
            let phos = phs.replace(/(^\s+)|(\s+$)/g, "");
            let phones = phos.substring(0,11);
            this.setState({
                phone:phones,
                QCPPrandoms:'',
                CPLBrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
            });
        }
        this.numbInput = (e) => {
            let nu = e.target.value;
            let num = parseInt(nu);
            e.target.value = '';
            e.target.value = num;
            this.state.numb = num;
        }
        this.msgInput = (e) => {this.state.msg = e.target.value;}
        this.dealInput = (e) => {this.state.dealdate = e.target.value;}
        this.payInput = (e) => {
            let pays = e.target.value;
            this.setState({
                pay:pays,
                QCPPrandoms:'',
                CPLBrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
            });
        }
        this.failInput = (e) => {this.state.faildate = e.target.value;}
        this.Checkboxx = this.Checkboxx.bind(this);
        this.SFCS = this.SFCS.bind(this);
        this.QCPP = this.QCPP.bind(this);
        this.QCXL = this.QCXL.bind(this);
        this.QCCX = this.QCCX.bind(this);
        this.CPLB = this.CPLB.bind(this);
        this.KHJB = this.KHJB.bind(this);
        this.XSLY = this.XSLY.bind(this);
        this.CLYT = this.CLYT.bind(this);
        this.ZB = this.ZB.bind(this);
        this.onSaves = this.onSaves.bind(this);
        let self = this;
        // window.addEventListener("popstate", function(e) {
        //     self.showConfirm();
        // }, false);
    }
    componentDidMount() {
        // document.title = '添加线索';
        // var body = document.getElementsByTagName('body')[0];
        // var iframe = document.createElement("iframe");
        // iframe.style.display="none";
        // iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        // var d = function() {
        //   setTimeout(function() {
        //     iframe.removeEventListener('load', d);
        //     document.body.removeChild(iframe);
        //   }, 0);
        // };
        // iframe.addEventListener('load', d);
        // document.body.appendChild(iframe);
        document.getElementById('FailDate').valueAsDate = new Date();
        document.getElementById('DealDate').valueAsDate = new Date();
        this.setState({
            dealdate:document.getElementById('DealDate').value,
            faildate:document.getElementById('FailDate').value
        });

        let crmId = Tool.getQueryString('id');
        if(crmId !== null){
            let crmData = JSON.parse(Tool.localItem('RobClues'));
            //console.log(crmData);
            if(crmId == crmData.customid){
                this.setState({
                    name:crmData.customname,
                    phone:crmData.customphone,
                    crmShow:true,
                    SFCSv:{
                        'provincesn':crmData.provincesn,
                        'provincename':crmData.provincename,
                        'cityname':crmData.citynamne,
                        'citysn':crmData.citysn
                    }
                });
            }else{
                Alert.to('数据异常，请核对后重试～');
            }
        }
        // let star = {title:"title",url: window.location.href};
        // window.history.pushState(star,"title",window.location.href);
    }
    Checkboxx(e){
        if(e.target.checked){
            this.state.Checkboxs=1;
        }else{
            this.state.Checkboxs=0;
        }
    }
    CPLB(){this.setState({
        CPLBrandoms: Math.random(),
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        SFCSrandoms:'',
        KHJBrandoms:'',
        XSLYrandoms:'',
        CLYTrandoms:'',
        ZBrandoms:'',
    });}
    QCPP(){
        if(this.state.CPLBv !== '' && typeof(this.state.CPLBv.subcategoryid) !== 'undefined'){
             this.setState({
                QCPPrandoms: Math.random(),
                CPLBrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
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

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
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

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
            });
        }else{
            Alert.to('请选择系列');
        }
    }
    SFCS(){this.setState({
        SFCSrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        KHJBrandoms:'',
        XSLYrandoms:'',
        CLYTrandoms:'',
        ZBrandoms:'',
    });}
    KHJB(){this.setState({
        KHJBrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        SFCSrandoms:'',
        XSLYrandoms:'',
        CLYTrandoms:'',
        ZBrandoms:'',
    });}
    XSLY(){this.setState({
        XSLYrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        SFCSrandoms:'',
        KHJBrandoms:'',
        CLYTrandoms:'',
        ZBrandoms:'',
    });}
    CLYT(){this.setState({
        CLYTrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        SFCSrandoms:'',
        KHJBrandoms:'',
        XSLYrandoms:'',
        ZBrandoms:'',
    });}
    ZB(){this.setState({
        ZBrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        SFCSrandoms:'',
        KHJBrandoms:'',
        XSLYrandoms:'',
        CLYTrandoms:'',
    });}
    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    goWell(){ this.context.router.push({pathname: '/nav'});}

    checkForm(){
        if(this.state.CPLBv == '' || typeof(this.state.CPLBv.subcategoryid) == 'undefined'){
            Alert.to("卡车类别不能为空");
            return false;
        }
        if(this.state.QCPPv == '' || typeof(this.state.QCPPv.brandid) == 'undefined'){
            Alert.to("卡车品牌不能为空");
            return false;
        }
        if(this.state.QCXLv == '' || typeof(this.state.QCXLv.seriesid) == 'undefined'){
            Alert.to("卡车系列不能为空");
            return false;
        }
        if(this.state.QCCXv == '' || typeof(this.state.QCCXv.productid) == 'undefined'){
            Alert.to("卡车车型不能为空");
            return false;
        }
        let nam = (this.state.name).replace(/\s+$|^\s+/g,"");
        let regHZ=/^[\u2E80-\u9FFF]+$/;
        if(nam == ''){
            Alert.to("姓名不能为空");
            return false;
        }
        if(regHZ.test(this.state.name)){}else{
            Alert.to("姓名必须是中文");
            return false;
        }
        if(this.state.name.length > 6){
            Alert.to("姓名过长");
            return false;
        }
        if(this.state.phone == ''){
            Alert.to("电话不能为空");
            return false;
        }
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.state.phone))){
            Alert.to("手机号码格式有误");
            return false;
        }
        if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined' || this.state.KHJBv.values === 0){
            Alert.to("客户级别不能为空");
            return false;
        }else if(this.state.KHJBv.values == 5){
            if(this.state.pay == ''){
                Alert.to("成交价格不能为空");
                return false;
            }
            if(this.state.pay > 9999999){
                Alert.to("成交价格数值过大");
                return false;
            }
            if(this.state.dealdate == ''){
                Alert.to("成交时间不能为空");
                return false;
            }
        }else if(this.state.KHJBv.values == 6){
            if(this.state.ZBv == '' || typeof(this.state.ZBv.values) == 'undefined' || this.state.ZBv.key==''){
                Alert.to("战败原因不能为空");
                return false;
            }
            if(this.state.faildate == ''){
                Alert.to("战败时间不能为空");
                return false;
            }
        }
        if(this.state.SFCSv == '' || typeof(this.state.SFCSv.provincesn) == 'undefined'){
            Alert.to("省份城市不能为空");
            return false;
        }
        if(this.state.XSLYv == '' || typeof(this.state.XSLYv.values) == 'undefined'){
            Alert.to("线索来源不能为空");
            return false;
        }
        if(this.state.numb > 999){
            Alert.to("购车数值过大");
            return false;
        }
        if(this.state.msg.length > 800){
            Alert.to("备注字数不能超过800");
            return false;
        }
        return true;
    }
    onSaves(){
        let Doms = document.getElementById('goNextP');
        if(this.checkForm()){
            Doms.setAttribute("disabled", true);
            let json = {};
            if(typeof(Tool.SessionId) == 'string'){
                json.sessionid = Tool.SessionId;
            }else{
                json.sessionid = Tool.SessionId.get();
            }
            json.subcategoryid = this.state.CPLBv.subcategoryid;
            json.brandid = this.state.QCPPv.brandid;
            json.seriesid = this.state.QCXLv.seriesid;
            json.truckid = this.state.QCCXv.productid;
            json.realname = this.state.name;
            json.tel = this.state.phone;
            json.clueresourceid = this.state.XSLYv.values;

            json.clueslevel = this.state.KHJBv.values;
            if(this.state.KHJBv.values == 5){
                json.dealtprice = this.state.pay;
                json.dealtdate = this.state.dealdate.replace(/-/g,'/');
            }
            if(this.state.KHJBv.values == 6){
                if(this.state.ZBv == '' || typeof(this.state.ZBv.values) == 'undefined'){
                    json.fail = '';
                }else{
                    json.fail = this.state.ZBv.values;
                }
                json.faildate = this.state.faildate.replace(/-/g,'/');
            }

            if(this.state.SFCSv == '' || typeof(this.state.SFCSv.provincesn) == 'undefined'){
                json.provincesn = '';
            }else{
                json.provincesn = this.state.SFCSv.provincesn;
            }
            if(this.state.SFCSv == '' || typeof(this.state.SFCSv.citysn) == 'undefined'){
                json.citysn = '';
            }else{
                json.citysn = this.state.SFCSv.citysn;
            }
            if(this.state.CLYTv == '' || typeof(this.state.CLYTv.values) == 'undefined'){
                json.cheliangyongtuid = '';
            }else{
                json.cheliangyongtuid = this.state.CLYTv.values;
            }
            if(this.state.KHJBv == '' || typeof(this.state.KHJBv.addday) == 'undefined'){
                json.addday = '';
            }else{
                json.addday = this.state.KHJBv.addday;
            }

            json.isrelationcustomer = this.state.Checkboxs;
            json.remark = this.state.msg;
            json.expectedbycarnum = this.state.numb;
            //console.log(JSON.stringify(this.state));
            if(this.state.crmShow){
                Tool.post('Clues/AddClues.aspx',json,
                    (res) => {
                        if(res.status == 1){
                            AllMsgToast.to("已添加成功");
                            let urlTxt = '/detailTel?id=' + res.data.customerId;
                            this.context.router.push({pathname: urlTxt});
                        }else if(res.status == 901){
                            alert(res.msg);
                            this.context.router.push({pathname: '/loading'});
                        }else{
                            Alert.to(res.msg);
                            Doms.removeAttribute("disabled");
                        }
                    },
                    (err) => {
                        Alert.to(res.msg);
                        Doms.removeAttribute("disabled");
                    }
                )
            }else{
                Tool.post('Clues/AddClues.aspx',json,
                    (res) => {
                        if(res.status == 1){
                            AllMsgToast.to("已添加成功");
                            window.history.back();
                        }else if(res.status == 901){
                            alert(res.msg);
                            this.context.router.push({pathname: '/loading'});
                        }else{
                            Alert.to(res.msg);
                            Doms.removeAttribute("disabled");
                        }
                    },
                    (err) => {
                        Alert.to(res.msg);
                        Doms.removeAttribute("disabled");
                    }
                )
            }
        }
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].abort();
        }
        XHRLIST = [];
    }
    render() {
        let CPLBval;
        let QCPPval;
        let QCXLval;
        let QCCXval;
        let SFCSval;
        let KHJBval;
        let XSLYval;
        let CLYTval;
        let ZBval;
        let showDeal = false;
        let showFail = false;
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
             let txt = this.state.QCCXv.productname;
             QCCXval = txt.substring(0,11)+'...';
        }else{
            QCCXval = '';
        }
        if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincename) !== 'undefined'){
             SFCSval = this.state.SFCSv.provincename +' '+this.state.SFCSv.cityname;
        }else{
            SFCSval = '';
        }
        if(this.state.KHJBv !== '' && typeof(this.state.KHJBv.key) !== 'undefined'){
             KHJBval = this.state.KHJBv.key +' '+this.state.KHJBv.adddayname;
             if(this.state.KHJBv.values == 5){showDeal = true;}else{showDeal = false;}
             if(this.state.KHJBv.values == 6){showFail = true;}else{showFail = false;}
        }else{
            KHJBval = '';
        }
        if(this.state.XSLYv !== '' && typeof(this.state.XSLYv.key) !== 'undefined'){
             XSLYval = this.state.XSLYv.key;
        }else{
            XSLYval = '';
        }
        if(this.state.CLYTv !== '' && typeof(this.state.CLYTv.key) !== 'undefined'){
             CLYTval = this.state.CLYTv.key;
        }else{
            CLYTval = '';
        }
        if(this.state.ZBv !== '' && typeof(this.state.ZBv.key) !== 'undefined'){
             ZBval = this.state.ZBv.key;
        }else{
            ZBval = '';
        }
        const {name,phone,crmShow,numb,pay}=this.state;
        return (
            <div style={{'height':'100%'}}>
                <div className="Acot">
                <Cells access>
                    <Cell>
                        <CellHeader><Label>选择类别</Label></CellHeader>
                        <CellBody onClick={this.CPLB}>
                            <Input type="text" placeholder="请选择类别" value={CPLBval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>选择品牌</Label></CellHeader>
                        <CellBody onClick={this.QCPP}>
                            <Input type="text" placeholder="请选择品牌" value={QCPPval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>选择系列</Label></CellHeader>
                        <CellBody onClick={this.QCXL}>
                            <Input type="text" placeholder="请选择系列" value={QCXLval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>选择车型</Label></CellHeader>
                        <CellBody className="CX" onClick={this.QCCX}>
                            <Input type="text" placeholder="请选择车型" value={QCCXval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>
                <Form>
                    <FormCell>
                        <CellHeader><Label>客户姓名</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写客户姓名" value={name} onInput={this.nameInput}/>
                        </CellBody>
                        <CellFooter/>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请填写客户电话" value={phone} style={{'display':crmShow?'none':''}} onInput={this.phoneInput}/>
                            <Input type="number" value={phone} style={{'display':crmShow?'':'none'}} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                </Form>
                <Cells access>
                    <Cell>
                        <CellHeader><Label>客户级别</Label></CellHeader>
                        <CellBody onClick={this.KHJB}>
                            <Input type="text" placeholder="请填写客户级别" value={KHJBval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>省份城市</Label></CellHeader>
                        <CellBody onClick={this.SFCS}>
                            <Input type="text" placeholder="请选择省份城市" value={SFCSval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>线索来源</Label></CellHeader>
                        <CellBody onClick={this.XSLY}>
                            <Input type="text" placeholder="请选择线索来源" value={XSLYval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>车辆用途</Label></CellHeader>
                        <CellBody onClick={this.CLYT}>
                            <Input type="text" placeholder="请选择车辆用途" value={CLYTval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>

                <Form>
                    <FormCell>
                        <CellHeader><Label>购车数量</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请填写购车数量" onInput={this.numbInput}/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                    <div className="showDeal" style={{'display':showDeal ? 'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>成交价格</Label></CellHeader>
                            <CellBody>
                                <Input type="number" placeholder="请填写成交价格" onInput={this.payInput} value={pay}/>
                            </CellBody>
                            <CellFooter>万元</CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交时间</Label></CellHeader>
                            <CellBody>
                                <Input type="date" id="DealDate" onChange={this.dealInput}/>
                            </CellBody>
                            <CellFooter />
                        </FormCell>
                    </div>
                    <Cells className="showFail" style={{'display':showFail ? 'block':'none'}}>
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
                                <Input type="date" id="FailDate" onChange={this.failInput}/>
                            </CellBody>
                        </Cell>
                    </Cells>
                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <TextArea placeholder="请填写备注" rows="2" maxlength="800" onInput={this.msgInput}></TextArea>
                        </CellBody>
                        <CellFooter></CellFooter>
                    </FormCell>
                </Form>
                <Form style={{'display':crmShow?'none':''}} className="weuiCheckbo" checkbox>
                    <FormCell checkbox>
                        <CellHeader>
                            <Checkbox onChange={this.Checkboxx} defaultChecked/>
                        </CellHeader>
                        <CellBody>关联已有CRM客户</CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.onSaves} id="goNextP" style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
                </div>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.setState({SFCSv: val,SFCSrandoms:''})}/>
                <LB Datas={this.state.CPLBrandoms} onChange={val => this.setState({CPLBv: val,CPLBrandoms:'',QCPPv:'',QCXLv:'',QCCXv:''})}/>
                <PP Datas={this.state.QCPPrandoms}
                    subcategoryid={this.state.CPLBv.subcategoryid}
                    onChange={val => this.setState({QCPPv: val,QCPPrandoms:'',QCXLv:'',QCCXv:''})}/>
                <XL Datas={this.state.QCXLrandoms}
                    subcategoryid={this.state.CPLBv.subcategoryid}
                    brandid={this.state.QCPPv.brandid}
                    onChange={val => this.setState({QCXLv: val,QCXLrandoms:'',QCCXv:''})}/>
                <CX Datas={this.state.QCCXrandoms}
                    subcategoryid={this.state.CPLBv.subcategoryid}
                    brandid={this.state.QCPPv.brandid}
                    seriesid={this.state.QCXLv.seriesid}
                    onChange={val => this.setState({QCCXv: val,QCCXrandoms:''})}/>
                <JB Datas={this.state.KHJBrandoms} onChange={val => this.setState({KHJBv: val,KHJBrandoms:''})}/>
                <XS Datas={this.state.XSLYrandoms} onChange={val => this.setState({XSLYv: val,XSLYrandoms:''})}/>
                <YT Datas={this.state.CLYTrandoms} onChange={val => this.setState({CLYTv: val,CLYTrandoms:''})}/>
                <ZB Datas={this.state.ZBrandoms} onChange={val => this.setState({ZBv: val,ZBrandoms:''})}/>
                <ShowAlert />
            </div>
        );
    }
};


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
