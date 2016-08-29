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
    Dialog,
    Select,
    Uploader
} from 'react-weui';
const {Confirm} = Dialog;
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';

class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            brands:[],
            showConfirm: false,
            confirm: {
                title: '标题标题',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '我知道了',
                        onClick: this.hideConfirm.bind(this)
                    }
                ]
            }
        };
        this.nameInput = (e) => {
            this.state.name = e.target.value;
        }
        this.goNext = this.goNext.bind(this);
    }
    showConfirm() {
        this.setState({showConfirm: true});
    }

    hideConfirm() {
        this.setState({showConfirm: false});
    }
    componentDidMount() {
        document.title="销售信息"
        let oldData = Tool.localItem('vipLodData');
        console.log(oldData)
        if(oldData.alermsg !== '' || oldData.alermsg.length !==0){
            this.state.confirm.setState({
                title: oldData.alermsg
            });
            this.showConfirm()
        }
    }
    checkForm(){
        if(this.state.name == '' || this.state.name.length == 0){
            Alert.to("请输入姓名");
            return false;
        }
        if(this.state.brands.length !== 0){
            Alert.to("请选择品牌");
            return false;
        }
        return true;
    }
    goNext(){
        if(this.checkForm()){
            let oldData = Tool.localItem('vipLodData');
            Tool.get('User/AddUser.aspx',{username:this.state.name,pwd:this.state.pwd},
                (res) => {
                    if(res.status === 1){

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
            <Page className="name" title="销售信息">

                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入真实姓名" onInput={this.nameInput}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Cells access>
                    <Cell href="#brand">
                        <CellBody>
                            选择您的销售品牌
                        </CellBody>
                        <CellFooter></CellFooter>
                    </Cell>
                </Cells>

                
                <ButtonArea>
                    <Button onClick={this.goNext}>进入营销助手</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <p className="FootTxt">如遇登录问题，欢迎致电 <i>4006-136-188</i><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
