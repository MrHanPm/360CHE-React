"use strict";

import React from 'react';
import { ButtonArea,
    Button,
    Cells,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    Uploader
} from 'react-weui';
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';


class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            pw:''
        };
        this.phoneInput = (e) => {
            let phs = e.target.value;
            let phos = phs.replace(/(^\s+)|(\s+$)/g, "");
            let phones = phos.substring(0,11);
            this.setState({phone:phones});
        }
        this.pwInput = (e) => {
            this.state.pw = e.target.value;
        }
        this.goNext = this.goNext.bind(this);
    }
    componentDidMount() {

    }

    checkForm(){
        if(!Tool.checkPhone(this.state.phone)){
            Alert.to("请输入正确手机号");
            return false;
        }
        if(this.state.pw == '' || this.state.pw.length < 6){
            Alert.to("密码输入错误");
            return false;
        }
        return true;
    }
    hideDisabled(){

    }
    goNext(){
        if(this.checkForm()){
            let Doms = document.getElementById('goNextP')
            Doms.setAttribute("disabled", true)
            let phe = this.state.phone
            Tool.localItem('Uphone', phe)
            let json = {}
            json.tel = phe
            json.pwd = this.state.pw
            json.apptype = 'weixin'
            Tool.get('weixin/BindTelPwd.aspx',json,
                (res) => {
                    switch(res.status){
                        case 1:
                            let Vd = JSON.stringify(res.data);
                            Tool.localItem('vipLodData',Vd);
                            Tool.removeLocalItem('okTel');
                            Tool.removeLocalItem('okAZ');
                            Tool.removeLocalItem('okTelFingerprint');
                            Tool.removeLocalItem('noTel');
                            Tool.removeLocalItem('noAZ');
                            Tool.removeLocalItem('noTelFingerprint');
                            Tool.removeLocalItem('coTel');
                            Tool.removeLocalItem('coAZ');
                            Tool.removeLocalItem('coTelFingerprint');
                            Tool.removeLocalItem('reTel');
                            Tool.removeLocalItem('reTelFingerprint');
                            Tool.removeLocalItem('BrandKey');
                            Tool.removeLocalItem('SearchData');
                            this.context.router.push({pathname:'/loaddata'});
                            return;
                        default:
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
    render() {
        return (
            <Page className="cell CrmScoll" title="帐号登录">
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="输入手机号" maxLength="11" onInput={this.phoneInput} value={this.state.phone}/>
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="输入密码" onInput={this.pwInput}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <a className="logTests" href="#/phone">使用验证码登录</a>
                <ButtonArea>
                    <Button id="goNextP" onClick={this.goNext}>确定</Button>
                </ButtonArea>
                <p className="FootTxt">初次注册请使用验证码登录</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
