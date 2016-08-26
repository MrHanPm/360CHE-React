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
import {Tool,target,Alert} from '../../tool.js';

import vcodeSrc from './images/vcode.jpg';

export default class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            vcode:'',
            mcode:'',
            vcodeSrc: vcodeSrc,
            iscode: false
        };
        this.phoneInput = (e) => {
            this.state.phone = e.target.value;
        }
        this.vcodeInput = (e) => {
            this.state.vcode = e.target.value;
        }
        this.mcodeInput = (e) => {

            this.state.mcode = e.target.value;
        }
        this.getvcodes = (e) => {this.state.vcodeSrc = vcodeSrc}

        this.getVcode = this.getVcode.bind(this);
        this.getMcode = this.getMcode.bind(this);
        this.goNext = this.goNext.bind(this);
    }
    componentDidMount() {
        Tool.get('WeiXin/BindTel.aspx',{tel:this.state.phone,captcha:this.state.vcode},
            (res) => {
                console.log(res)
            },
            (err) => {
                
            }
        )
        this.getVcode();

    }
    //获取图形验证码
    getVcode(e){
        this.getvcodes(e);
        let ji = Math.random();
        //console.log(ji,"+1");
        let t
        t && clearTimeout(t)
        t = setTimeout(() => {
            let srcs = Tool.HTTPs + 'Comm/Captcha.aspx?&'+ji;
            this.setState({
                iscode: false,
                vcodeSrc:srcs
            })
        },400)
    }
    checkForm(){
        if(!Tool.checkPhone(this.state.phone)){
            Alert.to("请输入正确手机号");
            return false;
        }
        if(this.state.vcode == '' || this.state.vcode.length == 0){
            Alert.to("请输入图形码数字");
            return false;
        }
        if(this.state.vcode.length !== 4){
            Alert.to("图形码位数不正确");
            return false;
        }
        if(this.state.mcode == '' || this.state.mcode.length == 0){
            Alert.to("请输入短信验证码");
            return false;
        }
        return true;
    }
    //获取验证码
    getMcode(){
        if(Tool.checkPhone(this.state.phone)){
            if(this.state.vcode == '' || this.state.vcode.length == 0){
                Alert.to("请输入图形码数字");
            }else if(this.state.vcode.length !== 4){
                Alert.to("图形码位数不正确");
            }else{
                Tool.get('User/SendSMSYanMa.aspx',{tel:this.state.phone,captcha:this.state.vcode},
                    (res) => {
                        if(res.status !== 1){
                            this.setState({
                                iscode: true
                            })
                        }
                        Alert.to(res.msg);
                    },
                    (err) => {
                        Alert.to(res.msg);
                    }
                )
            }
        }else{
            Alert.to("请输入正确手机号");
        }
    }
    goNext(){
        if(this.checkForm()){
            Tool.get('WeiXin/BindTel.aspx',{tel:this.state.phone,captcha:this.state.mcode},
                (res) => {
                    console.log(res)
                },
                (err) => {
                    
                }
            )
        }
    }
    render() {
        return (
            <Page className="cell" title="手机验证">

                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入手机号" onInput={this.phoneInput}/>
                        </CellBody>
                    </FormCell>

                    <FormCell vcode={true}  warn={this.state.iscode}>
                        <CellHeader>
                            <Label>图形码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入图形码" onInput={this.vcodeInput}/>
                        </CellBody>
                        <CellFooter onClick={this.getVcode}>
                            <Icon value="warn" />
                            <img src={this.state.vcodeSrc} />
                        </CellFooter>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入验证码" onInput={this.mcodeInput}/>
                        </CellBody>
                        <CellFooter>
                            <Button size="small" onClick={this.getMcode}>获取验证码</Button>
                        </CellFooter>
                    </FormCell>
                </Form>

                <ButtonArea>
                    <Button onClick={this.goNext}>确定</Button>
                </ButtonArea>
                <p className="FootTxt">验证手机号码，使用升级版营销助手<br/>手机号码仅用于登录和保护账号安全</p>
            </Page>
        );
    }
};

