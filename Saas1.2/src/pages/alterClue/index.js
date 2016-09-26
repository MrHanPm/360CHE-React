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

import Page from '../../component/page';
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
            Checkbox:1,
            showConfirm: false,
        };
        this.nameInput = (e) => {this.setState({name:e.target.value});}
        this.phoneInput = (e) => {this.setState({phone:e.target.value});}
        this.numbInput = (e) => {this.setState({numb:e.target.value});}
        this.msgInput = (e) => {this.setState({msg:e.target.value});}
        this.dealInput = (e) => {this.setState({dealdate:e.target.value});}
        this.payInput = (e) => {this.setState({pay:e.target.value});}
        this.failInput = (e) => {this.setState({faildate:e.target.value});}
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
    componentDidMount() {
        document.title = '修改线索';
        let RobClueVal = JSON.parse(Tool.localItem('RobClues'));
        console.log(RobClueVal);
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
            pay:RobClueVal.transactionprice,
            dealdate:RobClueVal.dealtdate,
            faildate:RobClueVal.faildate,
        });
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
            this.setState({Checkbox:1});
        }else{
            this.setState({Checkbox:0});
        }
    }
    CPLB(){this.setState({CPLBrandoms: Math.random(),QCPPrandoms:'QCPPrandoms',QCXLrandoms:'QCXLrandoms',QCCXrandoms:'QCCXrandoms'});}
    QCPP(){
        if(this.state.CPLBv !== '' && typeof(this.state.CPLBv.subcategoryid) !== 'undefined'){
             this.setState({QCPPrandoms: Math.random(),CPLBrandoms:'CPLBrandoms',QCXLrandoms:'QCXLrandoms',QCCXrandoms:'QCCXrandoms'});
        }else{
            Alert.to('请选择类别');
        }
    }
    QCXL(){
        if(this.state.QCPPv !== '' && typeof(this.state.QCPPv.brandid) !== 'undefined'){
             this.setState({QCXLrandoms: Math.random(),CPLBrandoms:'CPLBrandoms',QCPPrandoms:'QCPPrandoms',QCCXrandoms:'QCCXrandoms'});
        }else{
            Alert.to('请选择品牌');
        }
    }
    QCCX(){
        if(this.state.QCXLv !== '' && typeof(this.state.QCXLv.seriesid) !== 'undefined'){
             this.setState({QCCXrandoms: Math.random(),CPLBrandoms:'CPLBrandoms',QCPPrandoms:'QCPPrandoms',QCXLrandoms:'QCXLrandoms'});
        }else{
            Alert.to('请选择系列');
        }
    }
    DCPLB(){this.setState({DcPLBrandoms: Math.random()});}
    DQCPP(){
        if(this.state.DcPLBv !== '' && typeof(this.state.DcPLBv.subcategoryid) !== 'undefined'){
             this.setState({DqCPPrandoms: Math.random()});
        }else{
            Alert.to('请选择成交类别');
        }
    }
    DQCXL(){
        if(this.state.DqCPPv !== '' && typeof(this.state.DqCPPv.brandid) !== 'undefined'){
             this.setState({DqCXLrandoms: Math.random()});
        }else{
            Alert.to('请选择成交品牌');
        }
    }
    DQCCX(){
        if(this.state.DqCXLv !== '' && typeof(this.state.DqCXLv.seriesid) !== 'undefined'){
             this.setState({DqCCXrandoms: Math.random()});
        }else{
            Alert.to('请选择成交系列');
        }
    }
    SFCS(){this.setState({SFCSrandoms: Math.random()});}
    KHJB(){this.setState({KHJBrandoms: Math.random()});}
    XSLY(){this.setState({XSLYrandoms: Math.random()});}
    CLYT(){this.setState({CLYTrandoms: Math.random()});}
    ZB(){this.setState({ZBrandoms: Math.random()});}
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
        let nam = (this.state.name).replace(/\s+$|^\s+/g,"");
        if(nam == ''){
            Alert.to("姓名不能为空");
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
        }
        if(this.state.SFCSv == '' || typeof(this.state.SFCSv.provincesn) == 'undefined'){
            Alert.to("省份城市不能为空");
            return false;
        }
        return true;
    }
    onSaves(){
        if(this.checkForm()){
            let json = {};
            //let oldData = JSON.parse(Tool.localItem('vipLodData'));
            //json.sessionid = oldData.sessionid;
            json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
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
                    json.dealtdate = this.state.dealdate;
                }
                if(this.state.KHJBv.values == 6){
                    if(this.state.ZBv == '' || typeof(this.state.ZBv.values) == 'undefined'){
                        json.fail = '';
                    }else{
                        json.fail = this.state.ZBv.values;
                    }
                    json.faildate = this.state.faildate;
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

            json.isrelationcustomer = this.state.Checkbox;
            json.remark = this.state.msg;
            json.expectedbycarnum = this.state.numb;
            //console.log(this.state,json);
            Tool.get('Clues/EditClues.aspx',json,
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

        if(this.state.DcPLBv !== '' && typeof(this.state.DcPLBv.subcategoryname) !== 'undefined'){
             DCPLBval = this.state.DcPLBv.subcategoryname;
        }else{
            DCPLBval = '';
        }
        if(this.state.DqCPPv !== '' && typeof(this.state.DqCPPv.brandname) !== 'undefined'){
             DQCPPval = this.state.DqCPPv.brandname;
        }else{
            DQCPPval = '';
        }
        if(this.state.DqCXLv !== '' && typeof(this.state.DqCXLv.seriesname) !== 'undefined'){
            DQCXLval = this.state.DqCXLv.seriesname;
        }else{
            DQCXLval = '';
        }
        if(this.state.DqCCXv !== '' && typeof(this.state.DqCCXv.productname) !== 'undefined'){
            DQCCXval = this.state.DqCCXv.productname;
        }else{
            DQCCXval = '';
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
        const {name,phone,pay,dealdate,faildate,msg,numb,XSLYv}=this.state;
        return (
            <Page className="account">
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
                        <CellBody onClick={this.QCCX}>
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
                            <Input type="text" placeholder="请填写限800字"onInput={this.msgInput} value={msg}/>
                        </CellBody>
                        <CellFooter></CellFooter>
                    </FormCell>
                </Form>
                <Form style={{'display':'none'}} checkbox>
                    <FormCell checkbox>
                        <CellHeader>
                            <Checkbox onChange={this.Checkbox} defaultChecked/>
                        </CellHeader>
                        <CellBody>关联已有用户</CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.onSaves}  style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
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
            </Page>
        );
    }
};


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
