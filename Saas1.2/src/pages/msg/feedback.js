"use strict";

import React from 'react';
import {Button,
    Toast,
    TextArea,
    ButtonArea,
    Form,
    FormCell,
    CellBody
} from 'react-weui';
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './feedback.less';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            txt:'',
            showToast: false,
            toastTimer: null
        };
        this.txtsInput = (e) => {
            this.state.txt = e.target.value;
        }
        this.goSubm = this.goSubm.bind(this);
    }
    checkForm(){
        if(this.state.txt == '' || this.state.txt.length == 0){
            Alert.to("请提出宝贵意见");
            return false;
        }
        if(this.state.txt.length < 10){
            Alert.to("内容最少10字节");
            return false;
        }
        return true;
    }
    showToast() {
        this.setState({showToast: true});

        this.state.toastTimer = setTimeout(()=> {
            this.setState({showToast: false});
            history.back();
        }, 2000);
    }
    goSubm(){
        if(this.checkForm()){
            let sessionid;
            if(typeof(Tool.SessionId) == 'string'){
                sessionid= Tool.SessionId;
            }else{
                sessionid = Tool.SessionId.get();
            }
            Tool.get('User/Feedback.aspx',{sessionid:sessionid,content:this.state.txt},
                (res) => {
                    if(res.status == 1){
                        this.showToast();
                    }else if(res.status == 901){
                        Alert.to(res.msg);
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
            <Page className="feedback" spacing>
                <Form>
                    <FormCell>
                        <CellBody>
                            <TextArea placeholder="您的想法非常重要，请提出宝贵意见" rows="8" maxlength="800" onInput={this.txtsInput}></TextArea>
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.goSubm}>确定</Button>
                </ButtonArea>
                <Toast show={this.state.showToast}>提交成功，谢谢</Toast>
                <p className="FootTxt">使用问题请拨打卡车之家服务热线<br/>400-613-6188</p>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
