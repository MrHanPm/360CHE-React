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
    Select,
    Cell,
    CellFooter,
    Dialog,
    Checkbox,
    CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import Page from '../../component/page';
import SF from '../sidebar/SF';//省份
import {Tool,Alert} from '../../tool.js';
import './index.less';
class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            SFCSrandoms:'',
            SFCSv:'',
            name:'',
            tel:'',
            address:'',
            company:'',
            isbuy:'',
            msg:'',
            customerid:'',
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
        this.msgInput = (e) => {this.setState({msg:e.target.value});}
        this.nameInput = (e) => {this.setState({name:e.target.value});}
        this.telInput = (e) => {this.setState({tel:e.target.value});}
        this.addressInput = (e) => {this.setState({address:e.target.value});}
        this.companyInput = (e) => {this.setState({company:e.target.value});}
        this.onSaves = this.onSaves.bind(this);
        this.isBuys = (e) => {this.setState({isbuy:e.target.value});}
        this.SFCS = this.SFCS.bind(this);
    }
    componentDidMount() {
        document.title = '修改客户信息';
        let crmData = JSON.parse(Tool.localItem('RobClues'));
        if(crmData.customphone !== ''){
            this.setState({
                SFCSv:{
                    'provincename':crmData.provincename,
                    'provincesn':crmData.provincesn,
                    'cityname':crmData.citynamne,
                    'citysn':crmData.citysn,
                },
                name:crmData.customname,
                tel:crmData.customphone,
                address:crmData.adress,
                company:crmData.company,
                isbuy:crmData.isbuy,
                msg:crmData.remark,
                customerid:crmData.customid
            });
        }
        console.log(crmData);
    }
    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    goWell(){ this.context.router.push({pathname: '/nav'});}
    SFCS(){this.setState({SFCSrandoms: Math.random()});}
    checkForm(){
        if(this.state.name == ''){
            Alert.to("姓名不能为空");
            return false;
        }
        if(this.state.tel == ''){
            Alert.to("电话不能为空");
            return false;
        }
        if(!Tool.checkPhone(this.state.tel)){
            Alert.to("请填写真实手机号");
            return false;
        }
        if(this.state.SFCSv == '' || typeof(this.state.SFCSv.provincesn) == 'undefined'){
            Alert.to("省份城市不能为空");
            return false;
        }

        if(this.state.isbuy == '' || this.state.isbuy == 2){
            Alert.to("请选择是否购车");
            return false;
        }
        return true;
    }
    onSaves(){
        if(this.checkForm()){
            let json = {};
            // let oldData = JSON.parse(Tool.localItem('vipLodData'));
            // json.sessionid = oldData.sessionid;
            json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
            json.type = '1';
            json.customerid = this.state.customerid;
            json.customname = this.state.name;
            json.customphone = this.state.tel;
            json.isbuy = this.state.isbuy;
            json.address = this.state.address;
            json.company = this.state.company;
            json.remark = this.state.msg;
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
            
            console.log(JSON.stringify(this.state),json);
            Tool.get('Customer/EditCustomer.aspx',json,
                (res) => {
                    if(res.status == 1){
                        let crmData = JSON.parse(Tool.localItem('RobClues'));
                        if(crmData.customphone !== ''){
                            let urlTxt = '/detailTel?id=' + crmData.customid;
                            this.context.router.push({pathname: urlTxt});
                        }else{
                           Alert.to('修改数据异常，请返回重试～');
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
    }
    render() {
        let SFCSval;
        if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincename) !== 'undefined'){
             SFCSval = this.state.SFCSv.provincename +' '+this.state.SFCSv.cityname;
        }else{
            SFCSval = '';
        }
        const {name,tel,address,company,isbuy,msg} = this.state;
        return (
            <Page className="account addPursd">
                
                <Cells access>
                    <Cell>
                        <CellHeader><Label>客户姓名</Label></CellHeader>
                        <CellBody>
                            <Input type="text" value={name} placeholder="请输入" onInput={this.nameInput}/>
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="number" value={tel} placeholder="请输入" onInput={this.telInput}/>
                        </CellBody>
                        <CellFooter className="cleAft">A</CellFooter>
                    </Cell>
                </Cells>
                <Cells access>
                    <Cell>
                        <CellHeader><Label>所在省市</Label></CellHeader>
                        <CellBody onClick={this.SFCS}>
                            <Input type="text" placeholder="请选择省市" value={SFCSval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>详细地址</Label></CellHeader>
                        <CellBody>
                            <Input type="text" value={address} placeholder="请输入" onInput={this.addressInput}/>
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>工作单位</Label></CellHeader>
                        <CellBody>
                            <Input type="text" value={company} placeholder="请输入" onInput={this.companyInput}/>
                        </CellBody>
                    </Cell>
                    <FormCell select selectPos="after">
                        <CellHeader><Label>是否购车</Label></CellHeader>
                        <CellBody>
                            <Select data={[
                                {
                                    value: 2,
                                    label: '请选择'
                                },
                                {
                                    value: 0,
                                    label: '未购车'
                                },
                                {
                                    value: 1,
                                    label: '已购车'
                                }
                            ]} value={isbuy} onChange={this.isBuys} />
                        </CellBody>
                    </FormCell>
                </Cells>

                <Cells>
                    <Cell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <Input type="text" value={msg} placeholder="请填写限800字" onInput={this.msgInput}/>
                        </CellBody>
                    </Cell>
                </Cells>

                <ButtonArea>
                    <Button onClick={this.onSaves}  style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.setState({SFCSv: val,SFCSrandoms:''})}/>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
