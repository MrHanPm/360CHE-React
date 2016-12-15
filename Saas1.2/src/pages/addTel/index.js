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
import {Tool,Alert,AllMsgToast} from '../../tool.js';
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
        this.msgInput = (e) => {this.state.msg = e.target.value;}
        this.nameInput = (e) => {this.state.name = e.target.value;}
        this.telInput = (e) => {
            let phs = e.target.value;
            let phos = phs.replace(/(^\s+)|(\s+$)/g, "");
            let phones = phos.substring(0,11);
            this.setState({SFCSrandoms:'',tel:phones});
        }
        this.addressInput = (e) => {this.state.address = e.target.value;}
        this.companyInput = (e) => {this.state.company = e.target.value;}
        this.onSaves = this.onSaves.bind(this);
        this.isBuys = (e) => {this.state.isbuy = e.target.value;}
        this.SFCS = this.SFCS.bind(this);
    }
    componentDidMount() {
        // document.title = '新建客户信息';
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
    }
    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    goWell(){ this.context.router.push({pathname: '/nav'});}
    SFCS(){this.setState({SFCSrandoms: Math.random()});}
    checkForm(){
        let regHZ=/^[\u2E80-\u9FFF]+$/;
        if(this.state.name == ''){
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
        if(this.state.msg.length > 800){
            Alert.to("备注字数不能超过800");
            return false;
        }
        return true;
    }
    onSaves(){
        //let persId = Tool.getQueryString('id');
        let Doms = document.getElementById('goNextP');
        if(this.checkForm()){
            Doms.setAttribute("disabled", true);
            let json = {};
            if(typeof(Tool.SessionId) == 'string'){
                json.sessionid = Tool.SessionId;
            }else{
                json.sessionid = Tool.SessionId.get();
            }
            json.type = '1';
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
            
            //console.log(JSON.stringify(this.state),json);
            Tool.post('Customer/AddCustomer.aspx',json,
                (res) => {
                    if(res.status == 1){
                        Tool.gaTo('添加联系人','添加成功','');
                        AllMsgToast.to("已添加CRM");
                        //let urlTxt = '/detailTel?id=' + res.data.customid;
                        this.context.router.push({pathname: '/nav/c/w'});
                    }else if(res.status == 901){
                        alert(res.msg);
                        this.context.router.push({pathname: '/loading'});
                    }else{
                        Alert.to(res.msg);
                        Doms.removeAttribute("disabled");
                    }
                },
                (err) => {
                    Alert.to('请求超时，稍后重试。。');
                    Doms.removeAttribute("disabled");
                }
            )
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
        let SFCSval;
        if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincename) !== 'undefined'){
             SFCSval = this.state.SFCSv.provincename +' '+this.state.SFCSv.cityname;
        }else{
            SFCSval = '';
        }
        const {tel} = this.state;
        return (
            <Page className="account addPursd">
                
                <Cells access>
                    <Cell>
                        <CellHeader><Label>客户姓名</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入" onChange={this.nameInput}/>
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入" onChange={this.telInput} value={tel}/>
                        </CellBody>
                        <CellFooter className="cleAft"></CellFooter>
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
                            <Input type="text" placeholder="请输入" onChange={this.addressInput}/>
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>工作单位</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入" onChange={this.companyInput}/>
                        </CellBody>
                    </Cell>
                    <FormCell select selectPos="after">
                        <CellHeader><Label>是否购车</Label></CellHeader>
                        <CellBody>
                            <Select data={[
                                {
                                    value: 2,
                                    label: '',
                                    disabled:true,
                                    selected:true
                                },
                                {
                                    value: 0,
                                    label: '未购车'
                                },
                                {
                                    value: 1,
                                    label: '已购车'
                                }
                            ]} onChange={this.isBuys}/>
                        </CellBody>
                    </FormCell>
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
                    <Button onClick={this.onSaves} id="goNextP" style={{'marginBottom':'100px'}}>保存</Button>
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
