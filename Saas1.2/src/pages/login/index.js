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
            name:'',
            pwd:''
        };
        this.nameInput = (e) => {
            this.state.name = e.target.value;
        }
        this.pswInput = (e) => {
            this.state.pwd = e.target.value;
        }

        this.goNext = this.goNext.bind(this);
    }
    componentDidMount() {
        document.title="账号登录";
        var body = document.getElementsByTagName('body')[0];
        var iframe = document.createElement("iframe");
        iframe.style.display="none";
        iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        var d = function() {
          setTimeout(function() {
            iframe.removeEventListener('load', d);
            document.body.removeChild(iframe);
          }, 0);
        };
        iframe.addEventListener('load', d);
        document.body.appendChild(iframe);
    }

    checkForm(){
        if(this.state.name == '' || this.state.name.length == 0){
            Alert.to("请输入VIP账号");
            return false;
        }
        if(this.state.pwd == '' || this.state.pwd.length == 0){
            Alert.to("请输入密码");
            return false;
        }
        return true;
    }
    goNext(){
        if(this.checkForm()){
            Tool.get('User/Login.aspx',{username:this.state.name,pwd:this.state.pwd,apptype:'weixin'},
                (res) => {
                    if(res.status === 1){
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
                        this.context.router.push({pathname: '/name'});
                    }else if(res.status == 901){
                        alert(res.msg);
                        this.context.router.push({pathname: '/loading'});
                    }else{
                        Alert.to(res.msg);
                    }
                },
                (err) => {
                    Alert.to(err.msg);
                }
            )
        }
    }
    render() {
        return (
            <Page className="login CrmScoll" title="账号登录">
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>账号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入您的VIP账号" onInput={this.nameInput} />
                        </CellBody>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="请输入您的密码" onInput={this.pswInput} />
                        </CellBody>
                    </FormCell>

                </Form>

                <ButtonArea>
                    <Button onClick={this.goNext}>登录</Button>
                </ButtonArea>
                <p className="FootTxt">如遇登录问题，欢迎致电 <a href="tel:4006136188">4006-136-188</a><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
