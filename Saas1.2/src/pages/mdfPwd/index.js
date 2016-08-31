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
        if(this.state.newpwd !== this.state.pwd){
            Alert.to("新密码与确认密码不一致");
            return false;
        }
        if(this.state.pwd.length < 6 && this.state.oldpwd.length < 6 &&  this.state.newpwd.length < 6){
            Alert.to("密码不能少于6位");
            return false;
        }
        return true;
    }
    goSave(){
        if(this.checkForm()){
            let oldData = JSON.parse(Tool.localItem('vipLodData'));
            let json = {};
            json.sessionid = oldData.sessionid;
            json.oldpwd = this.state.oldpwd;
            json.newpwd = this.state.pwd;
            json.confirmpwd = this.state.newpwd;
            Tool.get('User/ChangePwd.aspx',json,
                (res) => {
                    if(res.status == 1){
                        this.context.router.push({
                            pathname: '/nav'
                        });
                    }else if(res.status == 901){
                        Alert.to(res.msg);
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
                    <li>新密码输入规范说明：</li>
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
