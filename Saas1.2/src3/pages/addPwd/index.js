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
import {Tool,Alert,AllMsgToast} from '../../tool.js';

import vcodeSrc from '../../vcode.jpg';

class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showToast: false,
            toastTimer: null,
            countdown:60,
            phone:'',
            vcode:'',
            mcode:'',
            pwd:'',
            newpwd:'',
            vcodeSrc: vcodeSrc,
            iscode: false
        };
        this.vcodeInput = (e) => {
            this.state.vcode = e.target.value;
        }
        this.mcodeInput = (e) => {
            this.state.mcode = e.target.value;
        }
        this.pwdInput = (e) => {
            this.state.pwd = e.target.value;
        }
        this.newpwdInput = (e) => {
            this.state.newpwd = e.target.value;
        }
        this.getvcodes = (e) => {this.setState({vcodeSrc:vcodeSrc})}
        this.getVcode = this.getVcode.bind(this);
        this.getMcode = this.getMcode.bind(this);
        this.goNext = this.goNext.bind(this);
    }
    componentWillMount(){
       let tels = Tool.localItem('Uphone');
       this.setState({phone:tels});
    }
    componentDidMount() {
        // document.title="设置密码";
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
        if(this.state.pwd.length == 0){
            Alert.to("请输入密码");
            return false;
        }
        if(this.state.pwd.length < 6 || this.state.pwd.length > 16){
            Alert.to("密码长度不符合规范");
            return false;
        }
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if(!reg.test(this.state.pwd)){
            Alert.to("密码不符合规范");
            return false;
        }
        if(this.state.newpwd !== this.state.pwd){
            Alert.to("密码与确认密码不一致");
            return false;
        }
        return true;
    }
    //获取验证码
    getMcode(e){
        let Btns = e.target;
        if(this.state.vcode == '' || this.state.vcode.length == 0){
            Alert.to("请输入图形码数字");
        }else if(this.state.vcode.length !== 4){
            Alert.to("图形码位数不正确");
        }else{
            Tool.get('User/SendSMSYanMa.aspx',{tel:this.state.phone,captcha:this.state.vcode},
                (res) => {
                    if(res.status){
                        this.showToast();
                        this.settime(Btns);
                    }else{
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
            this.setState({countdown:60})
            clearTimeout(t)
        } else {
            obj.setAttribute("disabled", true);
            obj.setAttribute('class','weui_btn weui_btn_default weui_btn_disabled weui_btn_mini');
            obj.innerHTML="重发(" + this.state.countdown + "s)"; 
            let s = this.state.countdown;
            s--;
            this.setState({countdown:s});
            t = setTimeout(() => this.settime(obj),1000);
        }
    }
    hideDisabled(){

    }
    goNext(){
        //console.log(this);
        let Doms = document.getElementById('goNextP');
        if(this.checkForm()){
            Doms.setAttribute("disabled", true);
            let json = {};
            if(typeof(Tool.SessionId) == 'string'){
                json.sessionid = Tool.SessionId;
            }else{
                json.sessionid = Tool.SessionId.get();
            }
            json.newpwd = this.state.pwd;
            json.confirmpwd = this.state.newpwd;
            json.vercode = this.state.mcode;
            Tool.get('User/ChangePwdTel.aspx',json,
                (res) => {
                    switch(res.status){
                        case 1:
                            let oldData = JSON.parse(Tool.localItem('vipLodData'));
                            oldData.ishavingpwd=1;
                            let newOldD = JSON.stringify(oldData);
                            Tool.localItem('vipLodData',newOldD);
                            AllMsgToast.to("设置成功");
                            this.context.router.push({pathname: '/nav/f'});
                            return;
                        case 901 :
                            alert(res.msg);
                            this.context.router.push({pathname: '/loading'});
                        default:
                            Alert.to(res.msg);
                            Doms.removeAttribute("disabled");
                    }
                },
                (err) => {
                    Alert.to(err.msg);
                    Doms.removeAttribute("disabled");
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
                            <Label>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="输入手机号" value={this.state.phone} disabled/>
                        </CellBody>
                    </FormCell>

                    <FormCell vcode={true}  warn={this.state.iscode}>
                        <CellHeader>
                            <Label>图形码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="输入图形码" onInput={this.vcodeInput}/>
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
                            <Input type="number" placeholder="输入验证码" onInput={this.mcodeInput}/>
                        </CellBody>
                        <CellFooter>
                            <Button size="small" onClick={this.getMcode}>获取验证码</Button>
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="输入密码" onInput={this.pwdInput}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>确认密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="确认密码" onInput={this.newpwdInput}/>
                        </CellBody>
                    </FormCell>
                </Form>

                <ButtonArea>
                    <Button id="goNextP" onClick={this.goNext}>确定</Button>
                </ButtonArea>
                <Toast show={this.state.showToast}>验证码已发送</Toast>
                <ul className='PwdFol'>
                    <li>密码规范说明：</li>
                    <li>1：密码长度在6~16位范围内；</li>
                    <li>2：必须由数字和字母组成；</li>
                    <li>3：不能有空格；</li>
                    <li>4：字母区分大小写；</li>
                </ul>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
