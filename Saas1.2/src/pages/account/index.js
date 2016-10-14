"use strict";

import React from 'react';
import {Button,
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
    Dialog,
    CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './index.less';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showConfirm: false,
            confirm: {
                title: '亲爱的~确定要退出吗？',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '确定退出',
                        onClick: this.Quit.bind(this)
                    }
                ]
            }
        };

        this.showConfirm = this.showConfirm.bind(this);
    }
    componentDidMount() {
        document.title = '账号管理';
    }
    showConfirm() {
        this.setState({showConfirm: true});
    }

    hideConfirm() {
        this.setState({showConfirm: false});
    }
    Quit(){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        Tool.get('WeiXin/Unbind.aspx',json,
            (res) => {
                if(res.status == 1){
                    Tool.localItem('vipLodData',null);
                    Tool.localItem('Uphone',null);
                    Tool.localItem('BrandKey',null);
                    WeixinJSBridge.call('closeWindow');
                    //() => {wx.closeWindow();}
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].end();
        }
        XHRLIST = [];
    }
    render() {
        let oldData = JSON.parse(Tool.localItem('vipLodData'));
        const {realname,tel,dealername} = oldData;
        return (
            <Page className="account">
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>用户姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="用户姓名" disabled={true} value={realname}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>所属公司</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="所属公司" disabled={true} value={dealername}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>登录账号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="登录账号" disabled={true} value={tel}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Cells access>
                    <Cell href="#mdfPwd">
                        <CellBody>
                            修改密码
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>
                <ButtonArea>
                    <Button onClick={this.showConfirm}>退出登录</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo 
