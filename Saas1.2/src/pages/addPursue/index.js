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
            KHJBrandoms:'',
            KHJBv:'',
            ZBrandoms:'',
            ZBv:'',
            price:'',
            followupdate:'2016-06-05 09:38:00',
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
        this.onSaves = this.onSaves.bind(this);
        let self = this;
        this.CPLB = this.CPLB.bind(this);
        this.QCPP = this.QCPP.bind(this);
        this.QCXL = this.QCXL.bind(this);
        this.QCCX = this.QCCX.bind(this);
        this.KHJB = this.KHJB.bind(this);
        this.ZB = this.ZB.bind(this);
        window.addEventListener("popstate", function(e) {
            self.showConfirm();
        }, false);
    }
    componentDidMount() {
        document.title = '添加跟进记录';
        // document.getElementById('pursueTime').valueAsDate = new Date();
        // document.getElementById('FailTime').valueAsDate = new Date();
        // document.getElementById('DealTime').valueAsDate = new Date();
        // this.setState({
        //     pay:document.getElementById('DealDate').value,
        //     faildate:document.getElementById('FailDate').value
        // });
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
    KHJB(){this.setState({KHJBrandoms: Math.random()});}
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

        if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
            Alert.to("客户级别不能为空");
            return false;
        }
        return true;
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
    onSaves(){
        let persId = this.getQueryString('id');
        //if(this.checkForm()){
            //let json = {};
            //let oldData = JSON.parse(Tool.localItem('vipLodData'));
            //json.sessionid = oldData.sessionid;
        //     json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        //     json.subcategoryid = this.state.CPLBv.subcategoryid;
        //     json.brandid = this.state.QCPPv.brandid;
        //     json.seriesid = this.state.QCXLv.seriesid;
        //     json.truckid = this.state.QCCXv.productid;
        //     json.realname = this.state.name;

        //     if(this.state.KHJBv == '' || typeof(this.state.KHJBv.values) == 'undefined'){
        //         json.clueslevel = '';
        //     }else{
        //         json.clueslevel = this.state.KHJBv.values;
        //         if(this.state.KHJBv.values == 5){
        //             json.dealtprice = this.state.deal;
        //             json.dealtdate = this.state.pay;
        //         }
        //         if(this.state.KHJBv.values == 6){
        //             if(this.state.ZBv == '' || typeof(this.state.ZBv.values) == 'undefined'){
        //                 json.fail = '';
        //             }else{
        //                 json.fail = this.state.ZBv.values;
        //             }
        //             json.faildate = this.state.faildate;
        //         }
        //     }
        //     if(this.state.CLYTv == '' || typeof(this.state.CLYTv.values) == 'undefined'){
        //         json.cheliangyongtuid = '';
        //     }else{
        //         json.cheliangyongtuid = this.state.CLYTv.values;
        //     }
        //     if(this.state.KHJBv == '' || typeof(this.state.KHJBv.addday) == 'undefined'){
        //         json.addday = '';
        //     }else{
        //         json.addday = this.state.KHJBv.addday;
        //     }

        //     json.isrelationcustomer = this.state.Checkbox;
        //     json.remark = this.state.msg;
        //     json.expectedbycarnum = this.state.numb;
        //     console.log(JSON.stringify(this.state));
        //     Tool.get('Clues/AddClueFollowUp.aspx',json,
        //         (res) => {
        //             if(res.status == 1){
        //                 this.context.router.push({
        //                     pathname: '/nav'
        //                 });
        //             }else{
        //                 Alert.to(res.msg);
        //             }
        //         },
        //         (err) => {
        //             Alert.to('网络异常，稍后重试。。');
        //         }
        //     )
        // }
    }
    render() {
        let CPLBval;
        let QCPPval;
        let QCXLval;
        let QCCXval;
        let KHJBval;
        let ZBval;
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
             // if(this.state.KHJBv.values == 5){showDeal = true;}else{showDeal = false;}
             // if(this.state.KHJBv.values == 6){showFail = true;}else{showFail = false;}
        }else{
            KHJBval = '';
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
                        <CellHeader><Label>跟进时间</Label></CellHeader>
                        <CellBody>
                            <Input type="datetime-local" id="pursueTime" onChange={this.pursueTime}/>
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

                <Form>
                    <Cells>
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
                                <Input type="text" placeholder="请填写价格"/>
                            </CellBody>
                            <CellFooter>万元</CellFooter>
                        </Cell>
                        <Cell>
                            <CellHeader><Label>成交时间</Label></CellHeader>
                            <CellBody>
                                <Input type="date" id="DealTime"/>
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>


                    <Cells className="showFail">
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

                    <FormCell>
                        <CellHeader><Label>预期价格</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写价格" />
                        </CellBody>
                        <CellFooter>万元</CellFooter>
                    </FormCell>

                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写限800字"/>
                        </CellBody>
                        <CellFooter></CellFooter>
                    </FormCell>
                </Form>

                <ButtonArea>
                    <Button onClick={this.onSaves}  style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
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
                <ZB Datas={this.state.ZBrandoms} onChange={val => this.setState({ZBv: val,ZBrandoms:val})}/>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
