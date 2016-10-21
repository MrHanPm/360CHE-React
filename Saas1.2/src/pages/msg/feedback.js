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
import ShowAlert from '../../component/Alert.js'
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
            this.setState({txt:e.target.value});
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
            window.history.back();
        }, 2000);
    }
    componentDidMount(){
        document.title='意见反馈';
        // let H = window.screen.height+'px';
        // let Dom = document.getElementById('FeedBox');
        // Dom.style.height = H;
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
            <div className="feedback" id="FeedBox">
                <Form  style={{'borderRadius':'5px'}}>
                    <FormCell>
                        <CellBody>
                            <TextArea placeholder="您的想法非常重要，请提出宝贵意见" rows="8" maxlength="800" onInput={this.txtsInput}></TextArea>
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.goSubm}>确定</Button>
                </ButtonArea>
                <p style={{'paddingTop':'50px','textAlign':'center'}}>使用问题请拨打卡车之家服务热线<br/>400-613-6188</p>
                <Toast show={this.state.showToast}>提交成功，谢谢</Toast>
                <ShowAlert />
            </div>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
