"use strict";

import React from 'react';
import {Button,
    Toast,
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
    Checkbox,
    CellBody
} from 'react-weui';
import ShowAlert from '../../component/Alert.js'
import SF from '../sidebar/SF';//省份
import LB from '../sidebar/LB';//类别
import PP from '../sidebar/PP';//品牌
import XL from '../sidebar/XL';//系列
import CX from '../sidebar/CX';//车型

import DLB from '../sidebar/DLB';//类别
import DPP from '../sidebar/DPP';//品牌
import DXL from '../sidebar/DXL';//系列
import DCX from '../sidebar/DCX';//车型

import JB from '../sidebar/JB';//客户级别
import XS from '../sidebar/XS';//线索
import YT from '../sidebar/YT';//用途
import ZB from '../sidebar/ZB';//战败原因
import {Tool,Alert} from '../../tool.js';
import './index.less';
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

            DcPLBrandoms:'',
            DcPLBv:'',
            DqCPPrandoms:'',
            DqCPPv:'',
            DqCXLrandoms:'',
            DqCXLv:'',
            DqCCXrandoms:'',
            DqCCXv:'',

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
            id:'',
            Checkboxs:'',
            showConfirm: false,
            linkCRM:false,
        };
        this.nameInput = (e) => {this.setState({name:e.target.value,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

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
            this.setState({phone:phones,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

            SFCSrandoms:'',
            KHJBrandoms:'',
            XSLYrandoms:'',
            CLYTrandoms:'',
            ZBrandoms:'',
        });}
        this.numbInput = (e) => {
            let nu = e.target.value;
            let num = parseInt(nu);
            e.target.value = '';
            //e.target.value = num;
            //this.state.numb = num;
            this.setState({numb:num,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

            SFCSrandoms:'',
            KHJBrandoms:'',
            XSLYrandoms:'',
            CLYTrandoms:'',
            ZBrandoms:'',
        });
        }
        this.msgInput = (e) => {this.setState({msg:e.target.value,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

            SFCSrandoms:'',
            KHJBrandoms:'',
            XSLYrandoms:'',
            CLYTrandoms:'',
            ZBrandoms:'',
        });}
        this.dealInput = (e) => {this.setState({dealdate:e.target.value,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

            SFCSrandoms:'',
            KHJBrandoms:'',
            XSLYrandoms:'',
            CLYTrandoms:'',
            ZBrandoms:'',
        });}
        this.payInput = this.payInput.bind(this);
        this.failInput = (e) => {this.setState({faildate:e.target.value,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

            SFCSrandoms:'',
            KHJBrandoms:'',
            XSLYrandoms:'',
            CLYTrandoms:'',
            ZBrandoms:'',
        });}
        this.Checkbox = this.Checkbox.bind(this);
        this.SFCS = this.SFCS.bind(this);
        this.QCPP = this.QCPP.bind(this);
        this.QCXL = this.QCXL.bind(this);
        this.QCCX = this.QCCX.bind(this);
        this.CPLB = this.CPLB.bind(this);

        this.DQCPP = this.DQCPP.bind(this);
        this.DQCXL = this.DQCXL.bind(this);
        this.DQCCX = this.DQCCX.bind(this);
        this.DCPLB = this.DCPLB.bind(this);

        this.KHJB = this.KHJB.bind(this);
        this.XSLY = this.XSLY.bind(this);
        this.CLYT = this.CLYT.bind(this);
        this.ZB = this.ZB.bind(this);
        this.onSaves = this.onSaves.bind(this);
    }
    payInput(e){
        this.setState({
            pay:e.target.value,
            CPLBrandoms:'',
            QCPPrandoms:'',
            QCXLrandoms:'',
            QCCXrandoms:'',

            DcPLBrandoms:'',
            DqCPPrandoms:'',
            DqCXLrandoms:'',
            DqCCXrandoms:'',

            SFCSrandoms:'',
            KHJBrandoms:'',
            XSLYrandoms:'',
            CLYTrandoms:'',
            ZBrandoms:'',
        });
    }
    componentWillMount(){
        let RobClueVal = JSON.parse(Tool.localItem('RobClues'));
        //console.log(RobClueVal);
        this.setState({
            id:RobClueVal.cluesextendid,
            CPLBv:{
                subcategoryid:RobClueVal.subcategoryid,
                subcategoryname:RobClueVal.subcategoryname
            },
            QCPPv:{
                brandid:RobClueVal.brandid,
                brandname:RobClueVal.brandname
            },
            QCXLv:{
                seriesid:RobClueVal.seriesid,
                seriesname:RobClueVal.seriesname
            },
            QCCXv:{
                productid:RobClueVal.truckid,
                productname:RobClueVal.truckname
            },
            DcPLBv:{
                subcategoryid:RobClueVal.dealtsubcategoryid,
                subcategoryname:RobClueVal.dealtsubcategoryname
            },
            DqCPPv:{
                brandid:RobClueVal.dealtbrandid,
                brandname:RobClueVal.dealtbrandname
            },
            DqCXLv:{
                seriesid:RobClueVal.dealtseriesid,
                seriesname:RobClueVal.dealtseriesname
            },
            DqCCXv:{
                productid:RobClueVal.dealttruckid,
                productname:RobClueVal.dealttruckname
            },
            SFCSv:{
                provincesn:RobClueVal.provincesn,
                provincename:RobClueVal.provincename,
                citysn:RobClueVal.citysn,
                cityname:RobClueVal.cityname
            },
            KHJBv:{
                values:RobClueVal.clueslevel,
                key:RobClueVal.clueslevelname,
                addday:'',
                adddayname:''
            },
            XSLYv:{
                values:RobClueVal.clueresourceid,
                key:RobClueVal.clueresourcename
            },
            CLYTv:{
                values:RobClueVal.cheliangyongtuid,
                key:RobClueVal.cheliangyongtuname
            },
            ZBv:{
                values:RobClueVal.fail,
                key:RobClueVal.failname
            },
            name:RobClueVal.realname,
            phone:RobClueVal.tel,
            numb:RobClueVal.expectedbycarnum,
            msg:RobClueVal.remark,
            dealdate:RobClueVal.dealtdate.replace(/\//g,'-'),
            faildate:RobClueVal.faildate.replace(/\//g,'-'),
        });
        if(RobClueVal.transactionprice > 0){
            this.state.pay = RobClueVal.transactionprice;
        }else{
            this.state.pay = '';
        }
        if(RobClueVal.customid > 0){
            this.setState({Checkboxs:1});
        }else{
            this.setState({Checkboxs:0,linkCRM:true});
        }
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].end();
        }
        XHRLIST = [];
    }
    componentDidMount() {
        document.title = '修改线索';
        let RobClueVal = JSON.parse(Tool.localItem('RobClues'));
        if(RobClueVal.dealtdate == ''){
            document.getElementById('DealDate').valueAsDate = new Date();
            this.setState({
                dealdate:document.getElementById('DealDate').value,
            });
        }
        if(RobClueVal.faildate == ''){
            document.getElementById('FailDate').valueAsDate = new Date();
            this.setState({
                faildate:document.getElementById('FailDate').value
            });
        }
    }
    Checkbox(e){
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

        DcPLBrandoms:'',
        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

        SFCSrandoms:'',
        KHJBrandoms:'',
        XSLYrandoms:'',
        CLYTrandoms:'',
        ZBrandoms:'',
    });}
    QCPP(){
        if(this.state.CPLBv !== '' && typeof(this.state.CPLBv.subcategoryid) !== 'undefined' && this.state.CPLBv.subcategoryid !== 0){
             this.setState({
                QCPPrandoms: Math.random(),
                CPLBrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                DcPLBrandoms:'',
                DqCPPrandoms:'',
                DqCXLrandoms:'',
                DqCCXrandoms:'',

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
        if(this.state.QCPPv !== '' && typeof(this.state.QCPPv.brandid) !== 'undefined' && this.state.QCPPv.brandid !== 0){
             this.setState({
                QCXLrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCCXrandoms:'',

                DcPLBrandoms:'',
                DqCPPrandoms:'',
                DqCXLrandoms:'',
                DqCCXrandoms:'',

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
        if(this.state.QCXLv !== '' && typeof(this.state.QCXLv.seriesid) !== 'undefined' && this.state.QCXLv.seriesid !== 0){
             this.setState({
                QCCXrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCXLrandoms:'',

                DcPLBrandoms:'',
                DqCPPrandoms:'',
                DqCXLrandoms:'',
                DqCCXrandoms:'',

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
    DCPLB(){this.setState({
        DcPLBrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

        SFCSrandoms:'',
        KHJBrandoms:'',
        XSLYrandoms:'',
        CLYTrandoms:'',
        ZBrandoms:'',
    });}
    DQCPP(){
        if(this.state.DcPLBv !== '' && typeof(this.state.DcPLBv.subcategoryid) !== 'undefined' && this.state.DcPLBv.subcategoryid !== 0){
             this.setState({
                DqCPPrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                DcPLBrandoms:'',
                DqCXLrandoms:'',
                DqCCXrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
            });
        }else{
            Alert.to('请选择成交类别');
        }
    }
    DQCXL(){
        if(this.state.DqCPPv !== '' && typeof(this.state.DqCPPv.brandid) !== 'undefined' && this.state.DqCPPv.brandid !==0){
             this.setState({
                DqCXLrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                DcPLBrandoms:'',
                DqCPPrandoms:'',
                DqCCXrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
            });
        }else{
            Alert.to('请选择成交品牌');
        }
    }
    DQCCX(){
        if(this.state.DqCXLv !== '' && typeof(this.state.DqCXLv.seriesid) !== 'undefined' && this.state.DqCXLv.seriesid !==0){
             this.setState({
                DqCCXrandoms: Math.random(),
                CPLBrandoms:'',
                QCPPrandoms:'',
                QCXLrandoms:'',
                QCCXrandoms:'',

                DcPLBrandoms:'',
                DqCPPrandoms:'',
                DqCXLrandoms:'',

                SFCSrandoms:'',
                KHJBrandoms:'',
                XSLYrandoms:'',
                CLYTrandoms:'',
                ZBrandoms:'',
            });
        }else{
            Alert.to('请选择成交系列');
        }
    }
    SFCS(){this.setState({
        SFCSrandoms: Math.random(),
        CPLBrandoms:'',
        QCPPrandoms:'',
        QCXLrandoms:'',
        QCCXrandoms:'',

        DcPLBrandoms:'',
        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

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

        DcPLBrandoms:'',
        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

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

        DcPLBrandoms:'',
        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

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

        DcPLBrandoms:'',
        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

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

        DcPLBrandoms:'',
        DqCPPrandoms:'',
        DqCXLrandoms:'',
        DqCCXrandoms:'',

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
            Alert.to("姓名字符过长");
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
        if(this.state.XSLYv == '' || typeof(this.state.XSLYv.values) == 'undefined'){
            Alert.to("线索来源不能为空");
            return false;
        }

        if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
            Alert.to("客户级别不能为空");
            return false;
        }else if(this.state.KHJBv.values == 5){
            if(this.state.DcPLBv == '' || typeof(this.state.DcPLBv.subcategoryname) == 'undefined' || this.state.DcPLBv.subcategoryname==''){
                Alert.to("成交类别不能为空");
                return false;
            }
            if(this.state.DqCPPv == '' || typeof(this.state.DqCPPv.brandname) == 'undefined' || this.state.DqCPPv.subcategoryname==''){
                Alert.to("成交品牌不能为空");
                return false;
            }
            if(this.state.DqCXLv == '' || typeof(this.state.DqCXLv.seriesname) == 'undefined' || this.state.DqCXLv.subcategoryname==''){
                Alert.to("成交系列不能为空");
                return false;
            }
            if(this.state.DqCCXv == '' || typeof(this.state.DqCCXv.productname) == 'undefined' || this.state.DqCCXv.subcategoryname==''){
                Alert.to("成交车型不能为空");
                return false;
            }
            if(this.state.pay == ''){
                Alert.to("成交价格不能为空");
                return false;
            }
            if(this.state.pay > '9999999'){
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
        if(this.state.numb > '999'){
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
            json.cluesextendid = this.state.id;
            if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
                json.clueslevel = '';
            }else{
                json.clueslevel = this.state.KHJBv.values;
                if(this.state.KHJBv.values == 5){
                    json.dealtsubcategoryid = this.state.DcPLBv.subcategoryid;
                    json.dealtbrandid = this.state.DqCPPv.brandid;
                    json.dealtseriesid = this.state.DqCXLv.seriesid;
                    json.dealttruckid = this.state.DqCCXv.productid;
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
            //console.log(this.state,json);
            Tool.get('Clues/EditClues.aspx',json,
                (res) => {
                    if(res.status == 1){
                        let urls = localStorage.getItem('clueURl');
                        this.context.router.push({
                            pathname: urls
                        });
                    }else if(res.status == 901){
                        alert(res.msg);
                        this.context.router.push({pathname: '/loading'});
                    }else{
                        Alert.to(res.msg);
                        Doms.removeAttribute("disabled");
                    }
                },
                (err) => {
                    Alert.to('网络异常，稍后重试。。');
                    Doms.removeAttribute("disabled");
                }
            )
        }
    }
    render() {
        let CPLBval;
        let QCPPval;
        let QCXLval;
        let QCCXval;

        let DCPLBval;
        let DQCPPval;
        let DQCXLval;
        let DQCCXval;
        let SFCSval;
        let KHJBval;
        let XSLYval;
        let CLYTval;
        let ZBval;
        let showDeal = false;
        let showFail = false;
        if(this.state.CPLBv !== '' && this.state.CPLBv.subcategoryname !== ''){
             CPLBval = this.state.CPLBv.subcategoryname;
        }else{
            CPLBval = '';
        }
        if(this.state.QCPPv !== '' && this.state.QCPPv.brandname !== ''){
             QCPPval = this.state.QCPPv.brandname;
        }else{
            QCPPval = '';
        }
        if(this.state.QCXLv !== '' && this.state.QCXLv.seriesname !== ''){
             QCXLval = this.state.QCXLv.seriesname;
        }else{
            QCXLval = '';
        }
        if(this.state.QCCXv !== '' && this.state.QCCXv.productname !== ''){
            let txt = this.state.QCCXv.productname;
             QCCXval = txt.substring(0,11)+'...';
        }else{
            QCCXval = '';
        }

        if(this.state.DcPLBv !== '' && this.state.DcPLBv.subcategoryname !== ''){
             DCPLBval = this.state.DcPLBv.subcategoryname;
        }else{
            DCPLBval = '';
        }
        if(this.state.DqCPPv !== '' && this.state.DqCPPv.brandname !== ''){
             DQCPPval = this.state.DqCPPv.brandname;
        }else{
            DQCPPval = '';
        }
        if(this.state.DqCXLv !== '' && this.state.DqCXLv.seriesname !== ''){
            DQCXLval = this.state.DqCXLv.seriesname;
        }else{
            DQCXLval = '';
        }
        if(this.state.DqCCXv !== '' && this.state.DqCCXv.productname !== ''){
            let txt = this.state.DqCCXv.productname;
             DQCCXval = txt.substring(0,11)+'...';
        }else{
            DQCCXval = '';
        }

        if(this.state.SFCSv !== '' && this.state.SFCSv.provincename !== ''){
             SFCSval = this.state.SFCSv.provincename +' '+this.state.SFCSv.cityname;
        }else{
            SFCSval = '';
        }
        if(this.state.KHJBv !== '' && this.state.KHJBv.key !== ''){
             KHJBval = this.state.KHJBv.key +' '+this.state.KHJBv.adddayname;
             if(this.state.KHJBv.values == 5){showDeal = true;}else{showDeal = false;}
             if(this.state.KHJBv.values == 6){showFail = true;}else{showFail = false;}
        }else{
            KHJBval = '';
        }
        if(this.state.XSLYv !== '' && this.state.XSLYv.key !== ''){
             XSLYval = this.state.XSLYv.key;
        }else{
            XSLYval = '';
        }
        if(this.state.CLYTv !== '' && this.state.CLYTv.key !== ''){
             CLYTval = this.state.CLYTv.key;
        }else{
            CLYTval = '';
        }
        if(this.state.ZBv !== '' && this.state.ZBv.key !== ''){
             ZBval = this.state.ZBv.key;
        }else{
            ZBval = '';
        }
        const {name,phone,pay,dealdate,faildate,msg,XSLYv,linkCRM}=this.state;
        let numb;
        if(this.state.numb == '0'){
            numb=''
        }else{
            numb=this.state.numb;
        }
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
                            <Input type="text" placeholder="请填写客户姓名" onInput={this.nameInput} value={name}/>
                        </CellBody>
                        <CellFooter/>
                    </FormCell>
                    <FormCell style={{'display':XSLYv.key == '卡车之家'?'none':''}}>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请填写客户电话" onInput={this.phoneInput} value={phone}/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                    <FormCell style={{'display':XSLYv.key == '卡车之家'?'':'none'}}>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请填写客户电话"  value={phone} disabled={true}/>
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
                    <Cell style={{'display':XSLYv.key == '卡车之家'?'none':''}}>
                        <CellHeader><Label>线索来源</Label></CellHeader>
                        <CellBody onClick={this.XSLY}>
                            <Input type="text" placeholder="请选择线索来源" value={XSLYval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell style={{'display':XSLYv.key == '卡车之家'?'':'none'}}>
                        <CellHeader><Label>线索来源</Label></CellHeader>
                        <CellBody>
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
                            <Input type="number" placeholder="请填写购车数量"onInput={this.numbInput} value={numb}/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                    <div className="showDeal" style={{'display':showDeal ? 'block':'none'}}>
                        <Cells access>
                            <Cell>
                                <CellHeader><Label>成交类别</Label></CellHeader>
                                <CellBody onClick={this.DCPLB}>
                                    <Input type="text" placeholder="请选择类别" value={DCPLBval} disabled={true}/>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                            <Cell>
                                <CellHeader><Label>成交品牌</Label></CellHeader>
                                <CellBody onClick={this.DQCPP}>
                                    <Input type="text" placeholder="请选择品牌" value={DQCPPval} disabled={true}/>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                            <Cell>
                                <CellHeader><Label>成交系列</Label></CellHeader>
                                <CellBody onClick={this.DQCXL}>
                                    <Input type="text" placeholder="请选择系列" value={DQCXLval} disabled={true}/>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                            <Cell>
                                <CellHeader><Label>成交车型</Label></CellHeader>
                                <CellBody onClick={this.DQCCX}>
                                    <Input type="text" placeholder="请选择车型" value={DQCCXval} disabled={true}/>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                        </Cells>
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
                                <Input type="date" id="DealDate" onChange={this.dealInput} value={dealdate}/>
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
                                <Input type="date" id="FailDate" onChange={this.failInput} value={faildate}/>
                            </CellBody>
                        </Cell>
                    </Cells>
                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <TextArea placeholder="请填写备注" rows="2" maxlength="800" onInput={this.msgInput} value={msg}></TextArea>
                        </CellBody>
                        <CellFooter></CellFooter>
                    </FormCell>
                </Form>
                <Form style={{'display':linkCRM ? '':'none'}} className="weuiCheckbo" checkbox>
                    <FormCell checkbox>
                        <CellHeader>
                            <Checkbox onChange={this.Checkbox} />
                        </CellHeader>
                        <CellBody>关联已有CRM客户</CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.onSaves} id="goNextP" style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
                </div>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.setState({SFCSv: val,SFCSrandoms:''})}/>
                <LB Datas={this.state.CPLBrandoms} onChange={val => this.setState({CPLBv: val,CPLBrandoms:'',QCPPv:'',QCXLv:'',QCCXv:''})}/>
                <PP Datas={this.state.QCPPrandoms}
                    subcategoryid={this.state.CPLBv.subcategoryid}
                    onChange={val => this.setState({QCPPv: val,QCPPrandoms:'',QCXLv:'',QCCXv:''})}/>
                <XL Datas={this.state.QCXLrandoms}
                    brandid={this.state.QCPPv.brandid}
                    onChange={val => this.setState({QCXLv: val,QCXLrandoms:'',QCCXv:''})}/>
                <CX Datas={this.state.QCCXrandoms}
                    seriesid={this.state.QCXLv.seriesid}
                    onChange={val => this.setState({QCCXv: val,QCCXrandoms:''})}/>
                <JB Datas={this.state.KHJBrandoms} onChange={val => this.setState({KHJBv: val,KHJBrandoms:''})}/>
                <XS Datas={this.state.XSLYrandoms} onChange={val => this.setState({XSLYv: val,XSLYrandoms:''})}/>
                <YT Datas={this.state.CLYTrandoms} onChange={val => this.setState({CLYTv: val,CLYTrandoms:''})}/>
                <ZB Datas={this.state.ZBrandoms} onChange={val => this.setState({ZBv: val,ZBrandoms:''})}/>

                <DLB Drandoms={this.state.DcPLBrandoms} onChange={val => this.setState({DcPLBv: val,DcPLBrandoms:'',DqCPPv:'',DqCXLv:'',DqCCXv:''})}/>
                <DPP Drandoms={this.state.DqCPPrandoms}
                    subcategoryid={this.state.DcPLBv.subcategoryid}
                    onChange={val => this.setState({DqCPPv: val,DqCPPrandoms:'',DqCXLv:'',DqCCXv:''})}/>
                <DXL Drandoms={this.state.DqCXLrandoms}
                    brandid={this.state.DqCPPv.brandid}
                    onChange={val => this.setState({DqCXLv: val,DqCXLrandoms:'',DqCCXv:''})}/>
                <DCX Drandoms={this.state.DqCCXrandoms}
                    seriesid={this.state.DqCXLv.seriesid}
                    onChange={val => this.setState({DqCCXv: val,DqCCXrandoms:''})}/>
                <ShowAlert />
            </div>
        );
    }
};


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
