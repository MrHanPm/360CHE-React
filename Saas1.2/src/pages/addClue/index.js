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
    Dialog,
    Checkbox,
    CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import Page from '../../component/page';
import SF from '../sidebar/SF';//省份
import LB from '../sidebar/LB';//类别
import PP from '../sidebar/PP';//品牌
import XL from '../sidebar/XL';//系列
import CX from '../sidebar/CX';//车型
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
            deal:'',
            pay:'',
            faildate:'',
            Checkbox:1,
            showConfirm: false,
            showToast: false,
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
        this.nameInput = (e) => {this.state.name = e.target.value;}
        this.phoneInput = (e) => {this.state.phone = e.target.value;}
        this.numbInput = (e) => {this.state.numb = e.target.value;}
        this.msgInput = (e) => {this.state.msg = e.target.value;}
        this.dealInput = (e) => {this.state.deal = e.target.value;}
        this.payInput = (e) => {this.state.pay = e.target.value;}
        this.failInput = (e) => {this.state.faildate = e.target.value;}
        this.Checkbox = this.Checkbox.bind(this);
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
        window.addEventListener("popstate", function(e) {
            self.showConfirm();
        }, false);
    }
    componentDidMount() {
        document.title = '添修线索';
        document.getElementById('FailDate').valueAsDate = new Date();
        document.getElementById('DealDate').valueAsDate = new Date();
        this.setState({
            pay:document.getElementById('FailDate').value,
            faildate:document.getElementById('DealDate').value
        });
        let star = {title: "title",url: window.location.href};
        window.history.pushState(star,"title",window.location.href);
    }
    Checkbox(e){
        if(e.target.checked){
            this.setState({Checkbox:1});
        }else{
            this.setState({Checkbox:0});
        }
    }
    CPLB(){this.setState({CPLBrandoms: Math.random()});}
    QCPP(){
        if(this.state.CPLBv !== '' && typeof(this.state.CPLBv.subcategoryid) !== 'undefined'){
             this.setState({QCPPrandoms: Math.random()});
        }else{
            Alert.to('请选择类别');
        }
    }
    QCXL(){
        if(this.state.QCPPv !== '' && typeof(this.state.QCPPv.brandid) !== 'undefined'){
             this.setState({QCXLrandoms: Math.random()});
        }else{
            Alert.to('请选择品牌');
        }
    }
    QCCX(){
        if(this.state.QCXLv !== '' && typeof(this.state.QCXLv.seriesid) !== 'undefined'){
             this.setState({QCCXrandoms: Math.random()});
        }else{
            Alert.to('请选择系列');
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
    showToast() {
        this.setState({showToast: true});

        this.state.toastTimer = setTimeout(()=> {
            this.setState({showToast: false});
            this.context.router.push({
                pathname: '/nav'
            });
        }, 1000);
    }
    onSaves(){
        if(this.checkForm()){
            let json = {};
            //let oldData = JSON.parse(Tool.localItem('vipLodData'));
            //json.sessionid = oldData.sessionid;
            json.sessionid = '42037_f4140da144bb5eccd803e06360d916d1842bc06e';
            json.subcategoryid = this.state.CPLBv.subcategoryid;
            json.brandid = this.state.QCPPv.brandid;
            json.seriesid = this.state.QCXLv.seriesid;
            json.truckid = this.state.QCCXv.productid;
            json.realname = this.state.name;
            json.tel = this.state.phone;
            json.clueresourceid = this.state.XSLYv.values;

            if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
                json.clueslevel = '';
            }else{
                json.clueslevel = this.state.KHJBv.values;
                if(this.state.KHJBv.values == 5){
                    json.dealtprice = this.state.deal;
                    json.dealtdate = this.state.pay;
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
            Tool.get('Clues/AddClues.aspx',json,
                (res) => {
                    if(res.status == 1){
                        this.showToast();
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
        // let oldData = JSON.parse(Tool.localItem('vipLodData'));
        // const {realname,tel,dealername} = oldData;
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
             QCCXval = this.state.QCCXv.productname;
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
                            <Input type="text" placeholder="请填写客户姓名" onInput={this.nameInput}/>
                        </CellBody>
                        <CellFooter/>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请填写客户电话" onInput={this.phoneInput}/>
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
                            <Input type="number" placeholder="请填写购车数量"onInput={this.numbInput}/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                    <div className="showDeal" style={{'display':showDeal ? 'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>成交价格</Label></CellHeader>
                            <CellBody>
                                <Input type="number" placeholder="请填写成交价格" onInput={this.dealInput}/>
                            </CellBody>
                            <CellFooter>万元</CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交时间</Label></CellHeader>
                            <CellBody>
                                <Input type="date" id="DealDate" onChange={this.payInput}/>
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
                            <Input type="text" placeholder="请填写限800字"onInput={this.msgInput}/>
                        </CellBody>
                        <CellFooter></CellFooter>
                    </FormCell>
                </Form>
                <Form checkbox>
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
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.setState({SFCSv: val,SFCSrandoms:val})}/>
                <LB Datas={this.state.CPLBrandoms} onChange={val => this.setState({CPLBv: val,CPLBrandoms:val,QCPPv:'',QCXLv:'',QCCXv:''})}/>
                <PP Datas={this.state.QCPPrandoms}
                    subcategoryid={this.state.CPLBv.subcategoryid}
                    onChange={val => this.setState({QCPPv: val,QCPPrandoms:val,QCXLv:'',QCCXv:''})}/>
                <XL Datas={this.state.QCXLrandoms}
                    brandid={this.state.QCPPv.brandid}
                    onChange={val => this.setState({QCXLv: val,QCXLrandoms:val,QCCXv:''})}/>
                <CX Datas={this.state.QCCXrandoms}
                    seriesid={this.state.QCXLv.seriesid}
                    onChange={val => this.setState({QCCXv: val,QCCXrandoms:val})}/>
                <JB Datas={this.state.KHJBrandoms} onChange={val => this.setState({KHJBv: val,KHJBrandoms:val})}/>
                <XS Datas={this.state.XSLYrandoms} onChange={val => this.setState({XSLYv: val,XSLYrandoms:val})}/>
                <YT Datas={this.state.CLYTrandoms} onChange={val => this.setState({CLYTv: val,CLYTrandoms:val})}/>
                <ZB Datas={this.state.ZBrandoms} onChange={val => this.setState({ZBv: val,ZBrandoms:val})}/>
                <Toast show={this.state.showToast}>线索添加成功</Toast>
            </Page>
        );
    }
};


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
