"use strict";

import React from 'react';
import {
    Button,
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
    CellBody,
} from 'react-weui';

import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './index.less';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pwd:'',
            oldpwd:'',
            newpwd:''
        };
        this.pwdInput = (e) => {
            this.state.pwd = e.target.value;
        }
        this.oldpwdInput = (e) => {
            this.state.oldpwd = e.target.value;
        }
        this.newpwdInput = (e) => {
            this.state.newpwd = e.target.value;
        }
        this.goSave = this.goSave.bind(this);
    }
    componentDidMount() {
        document.title = '修改密码';
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
        if(this.state.oldpwd.length == 0){
            Alert.to("请输入原始密码");
            return false;
        }
        if(this.state.pwd.length == 0){
            Alert.to("请输入新密码");
            return false;
        }
        if(this.state.newpwd.length == 0){
            Alert.to("请确认新密码");
            return false;
        }
        if(this.state.pwd.length < 6 || this.state.pwd.length > 16){
            Alert.to("密码长度不符合规范");
            return false;
        }
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if(!reg.test(this.state.pwd)){
            Alert.to("新密码不符合规范");
            return false;
        }
        if(this.state.newpwd !== this.state.pwd){
            Alert.to("新密码与确认密码不一致");
            return false;
        }
        return true;
    }
    goSave(){
        if(this.checkForm()){
            let json = {};
            if(typeof(Tool.SessionId) == 'string'){
                json.sessionid = Tool.SessionId;
            }else{
                json.sessionid = Tool.SessionId.get();
            }
            json.oldpwd = this.state.oldpwd;
            json.newpwd = this.state.pwd;
            json.confirmpwd = this.state.newpwd;
            Tool.get('User/ChangePwd.aspx',json,
                (res) => {
                    if(res.status == 1){
                        this.context.router.push({
                            pathname: '/nav/f'
                        });
                    }else if(res.status == 901){
                        alert(res.msg);
                        this.context.router.push({pathname: '/loading'});
                    }else{
                        Alert.to(res.msg);
                    }
                },
                (err) => {
                    Alert.to('请求超时，稍后重试。。');
                }
            )
        }
    }
    render() {
        return (
            <Page className="mdfPwd">
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>原始密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="请输入" onInput={this.oldpwdInput}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>新的密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="请输入" onInput={this.pwdInput}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>确认密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="请输入" onInput={this.newpwdInput}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <ul className='PwdFol'>
                    <li>密码规范说明：</li>
                    <li>1：密码长度在6~16位范围内；</li>
                    <li>2：必须由数字和字母组成；</li>
                    <li>3：不能有空格；</li>
                    <li>4：字母区分大小写；</li>
                </ul>
                <ButtonArea>
                    <Button onClick={this.goSave}>保存</Button>
                </ButtonArea>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo 
