"use strict";

import React from 'react';
import { ButtonArea,
    Button,
    Cells,
    Toast,
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

import vcodeSrc from '../../vcode.jpg';

class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showToast: false,
            toastTimer: null,
            countdown:10,
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
        document.title="手机认证"
        this.getVcode();
    }

    //获取图形验证码
    getVcode(e){
        this.getvcodes(e);
        let numb = Math.random();
        let t
        t && clearTimeout(t)
        t = setTimeout(() => {
            let srcs = Tool.HTTPs + 'Comm/Captcha.aspx?&'+ numb;
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
    getMcode(e){
        let Btns = e.target;
        if(Tool.checkPhone(this.state.phone)){
            if(this.state.vcode == '' || this.state.vcode.length == 0){
                Alert.to("请输入图形码数字");
            }else if(this.state.vcode.length !== 4){
                Alert.to("图形码位数不正确");
            }else{
                
                this.settime(Btns);
                this.showToast();
                Tool.get('User/SendSMSYanMa.aspx',{tel:this.state.phone,captcha:this.state.vcode},
                    (res) => {
                        if(res.status !== 1){
                            this.setState({
                                iscode: true
                            });
                            Alert.to(res.msg);
                        }
                    },
                    (err) => {
                        Alert.to(err.msg);
                    }
                )
            }
        }else{
            Alert.to("请输入正确手机号");
        }
    }
    showToast() {
        this.setState({showToast: true});

        this.state.toastTimer = setTimeout(()=> {
            this.setState({showToast: false});
        }, 2000);
    }
    settime(obj) {
        let t
        if (this.state.countdown == 0) { 
            obj.removeAttribute("disabled");
            obj.setAttribute('class','weui_btn weui_btn_primary weui_btn_mini');  
            obj.innerHTML="重新获取"; 
            this.setState({countdown:10})
            clearTimeout(t)
        } else {
            obj.setAttribute("disabled", true); 
            obj.setAttribute('class','weui_btn weui_btn_default weui_btn_disabled weui_btn_mini');
            obj.innerHTML="重新发送(" + this.state.countdown + "s)"; 
            let s = this.state.countdown;
            s--;
            this.setState({countdown:s});
            t = setTimeout(() => this.settime(obj),1000);
        }
    }
    goNext(){
        if(this.checkForm()){
            Tool.localItem('Uphone',this.state.phone);
            Tool.get('WeiXin/BindTel.aspx',{tel:this.state.phone,vercode:this.state.mcode},
                (res) => {
                    if(res.status === 1){
                        Tool.localItem('vipLodData',JSON.stringify(res.data));
                        if(res.data.usercategory == '1'){
                            this.context.router.push({pathname: '/nav'});
                        }
                        if(res.data.usercategory == '2'){
                            this.context.router.push({pathname: '/boss/nav'});
                        } 
                    }else if(res.status === 912){
                        this.context.router.push({
                            pathname: '/login'
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
                <Toast show={this.state.showToast}>验证码已发送</Toast>
                <p className="FootTxt">验证手机号码，使用升级版营销助手<br/>手机号码仅用于登录和保护账号安全</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
