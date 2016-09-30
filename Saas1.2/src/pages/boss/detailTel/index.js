"use strict";

import React from 'react';
import {Button,
    TextArea,
    ButtonArea,
    Form,
    FormCell,
    CellHeader,
    Label,
    Input,
    Cells,
    Select,
    Cell,
    CellFooter,
    Dialog,
    Checkbox,
    CellBody
} from 'react-weui';

import Page from '../../../component/page';
import {Tool,Alert} from '../../../tool.js';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DATA:[],
            showConfirm: false
        };
        this.goFun= this.goFun.bind(this);
    }
    goFun(e){
        let doms = e.target;
        let nub = parseInt(e.target.title);
        if(nub === 1){
            let data = JSON.stringify(this.state.DATA);
            Tool.localItem('RobClues',data);
            let ids = doms.getAttribute('data-id');
            let urlTxt = '/boss/robClue?id=' + ids;
            this.context.router.push({pathname: urlTxt});
        }
        if(nub > 1){
            let ids = doms.getAttribute('data-alt');
            let urlTxt = '/crmClue?id=' + ids;
            this.context.router.push({pathname: urlTxt});
        }
    }

    componentDidMount(){
        document.title = '联系人信息';
        let persId = Tool.getQueryString('id');
        let json={};
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        json.sessionid = sessionid;
        json.customerid = persId;
        Tool.get('Customer/GetCustomerDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({DATA:res.data});
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    render() {
        const {customname,customphone,provincename,citynamne,adress,company,isbuy,remark,cluenum,customid,cluesextendid,followname} = this.state.DATA;
        return (
            <Page className="account addPursd">
                
                <Cells>
                    <Cell>
                        <CellHeader><Label>客户姓名</Label></CellHeader>
                        <CellBody>
                            {customname}
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            {customphone}
                        </CellBody>
                        <CellFooter className="cleAft">
                            <a href={`tel:${customphone}`}> </a>
                        </CellFooter>
                    </Cell>
                </Cells>
                <Cells access>
                    <Cell>
                        <CellHeader><Label>所在省市</Label></CellHeader>
                        <CellBody>
                            {provincename} {citynamne}
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>详细地址</Label></CellHeader>
                        <CellBody>
                           {adress}
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>工作单位</Label></CellHeader>
                        <CellBody>
                            {company}
                        </CellBody>
                    </Cell>
                    <Cell select selectPos="after">
                        <CellHeader><Label>是否购车</Label></CellHeader>
                        <CellBody>
                            {isbuy?'已购车':'未购车'}
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            {remark}
                        </CellBody>
                    </Cell>
                    <Cell>
                        <CellHeader><Label>跟进人员</Label></CellHeader>
                        <CellBody>
                            {followname}
                        </CellBody>
                    </Cell>
                </Cells>

                <Cells style={{'display':cluenum==0?'none':''}} access>
                    <Cell title={cluenum} data-id={cluesextendid} data-alt={customid} onClick={this.goFun}>
                        <CellHeader><Label>查看线索</Label></CellHeader>
                        <CellBody />
                        <CellFooter />
                    </Cell>
                </Cells>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
