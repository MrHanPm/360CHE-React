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

import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './index.less';
class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DATA:[],
            showConfirm: false
        };
        this.goChengs = this.goChengs.bind(this);
        this.goFun= this.goFun.bind(this);
        this.goAdd = this.goAdd.bind(this);
        this.RobLine = this.RobLine.bind(this);
    }

    goFun(e){
        let doms = e.target;
        let nub = parseInt(e.target.title);
        if(nub === 1){
            let data = JSON.stringify(this.state.DATA);
            Tool.localItem('RobClues',data);
            let ids = doms.getAttribute('data-id');
            let urlTxt = '/robClue?id=' + ids;
            this.context.router.push({pathname: urlTxt});
        }
        if(nub > 1){
            let ids = doms.getAttribute('data-alt');
            let urlTxt = '/crmClue?id=' + ids;
            this.context.router.push({pathname: urlTxt});
        }
    }
    goAdd(e){
        let data = JSON.stringify(this.state.DATA);
        Tool.localItem('RobClues',data);
        let urlTxt = '/addClue?id=' + e.target.title;
        this.context.router.push({pathname: urlTxt});
    }
    goChengs(){
        let data = JSON.stringify(this.state.DATA);
        Tool.localItem('RobClues',data);
        this.context.router.push({pathname: '/alterTel'});
    }
    RobLine(e){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.customerid = e.target.title;
        Tool.get('Customer/UpdateCustomerLastLinkTime.aspx',json,
            (res) => {
                if(res.status == 1){
                    
                }else if(res.status == 901){
                    alert(res.msg);
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
    componentWillMount(){
        let persId = Tool.getQueryString('id');
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.customerid = persId;
        Tool.get('Customer/GetCustomerDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({DATA:res.data});
                }else if(res.status == 901){
                    alert(res.msg);
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
    componentDidMount(){
        document.title = '联系人信息';
        
    }
    render() {
        const {customname,customphone,provincename,citynamne,adress,company,isbuy,remark,cluenum,customid,cluesextendid} = this.state.DATA;
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
                            <a href={`tel:${customphone}`} title={customid} onClick={this.RobLine}> </a>
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
                </Cells>

                <Cells style={{'display':cluenum==0?'none':''}} access>
                    <Cell title={cluenum} data-id={cluesextendid} data-alt={customid} onClick={this.goFun}>
                        <CellHeader><Label>查看线索</Label></CellHeader>
                        <CellBody />
                        <CellFooter />
                    </Cell>
                </Cells>
                <Cells style={{'display':cluenum==0?'':'none'}} access>
                    <Cell title={customid} onClick={this.goAdd}>
                        <CellHeader><Label title={customid}>添加线索</Label></CellHeader>
                        <CellBody title={customid} />
                        <CellFooter title={customid} />
                    </Cell>
                </Cells>
                <span className="ChengClues" onClick={this.goChengs}></span>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
