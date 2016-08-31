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
        document.title="账号登陆"
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
                        Tool.localItem('vipLodData',JSON.stringify(res.data));
                        this.context.router.push({
                            pathname: '/name'
                        });
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
            <Page className="login" title="账号登录">
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
                <p className="FootTxt">如遇登录问题，欢迎致电 <i>4006-136-188</i><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
