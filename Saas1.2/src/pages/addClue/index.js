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
    Checkbox,
    CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import Page from '../../component/page';
import SF from '../sidebar/SF';//省份
import LB from '../sidebar/LB';//类别
import PP from '../sidebar/PP';//品牌
import XL from '../sidebar/XL';//系列
import CX from '../sidebar/CX';//车型
import JB from '../sidebar/JB';//客户级别
import XS from '../sidebar/XS';//线索
import YT from '../sidebar/YT';//用途
import ZB from '../sidebar/ZB';//战败原因
import {Tool,Alert} from '../../tool.js';
import './index.less';
class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            SFCSrandoms:'',
            SFCSv:'',
            showConfirm: false,
            confirm: {
                title: '信息没保存，是否放弃？',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },{
                        type: 'primary',
                        label: '确定退出',
                        onClick: this.goWell.bind(this)
                    }
                ],
            },
        };
        this.SFCS = this.SFCS.bind(this);
        this.onSaves = this.onSaves.bind(this);
        let self = this;
        window.addEventListener("popstate", function(e) {
            self.showConfirm();
        }, false);
    }
    componentDidMount() {
        document.title = '添修线索';
        Tool.localItem('Pactive','A');
        Tool.localItem('PactiveT','0');
        let star = {title: "title",url: window.location.href};
        window.history.pushState(star,"title",window.location.href);
    }

    SFCS(){
       this.setState({SFCSrandoms: Math.random()});
    }

    showConfirm(){this.setState({showConfirm: true});}
    hideConfirm(){this.setState({showConfirm: false});}
    goWell(){ this.context.router.push({pathname: '/nav'});}
    onSaves(){

        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //console.log(oldData);
        // Tool.get('User/LoginOut.aspx',{sessionid:oldData.sessionid},
        //     (res) => {
        //         if(res.status == 1){
        //             Tool.localItem('vipLodData','');
        //             Tool.localItem('Uphone','');
        //             Tool.localItem('BrandKey','');
                    this.context.router.push({
                        pathname: '/nav'
                    });
        //         }else{
        //             Alert.to(res.msg);
        //         }
        //     },
        //     (err) => {
        //         Alert.to('网络异常，稍后重试。。');
        //     }
        // )
    }
    render() {
        // let oldData = JSON.parse(Tool.localItem('vipLodData'));
        // const {realname,tel,dealername} = oldData;
        let SFCSval;
        if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincename) !== 'undefined'){
             SFCSval = this.state.SFCSv.provincename +' '+this.state.SFCSv.cityname;
        }else{
            SFCSval = '';
        }
        return (
            <Page className="account">
                <Cells access>
                    <Cell>
                        <CellHeader><Label>选择类别</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请选择类别" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>选择品牌</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请选择品牌" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>选择系列</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请选择系列" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>选择车型</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请选择车型" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>
                <Form>
                    <FormCell>
                        <CellHeader><Label>客户姓名</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写客户姓名"/>
                        </CellBody>
                        <CellFooter/>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写客户电话"/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                </Form>
                <Cells access>
                    <Cell>
                        <CellHeader><Label>客户级别</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写客户级别" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>省份城市</Label></CellHeader>
                        <CellBody onClick={this.SFCS}>
                            <Input type="text" placeholder="请选择省份城市" value={SFCSval} disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>线索来源</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请选择线索来源" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell>
                        <CellHeader><Label>车辆用途</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请选择车辆用途" disabled={true}/>
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>

                <Form>
                    <FormCell>
                        <CellHeader><Label>购车数量</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写购车数量"/>
                        </CellBody>
                        <CellFooter />
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请填写限800字"/>
                        </CellBody>
                        <CellFooter></CellFooter>
                    </FormCell>
                </Form>
                <Form checkbox>
                    <FormCell checkbox>
                        <CellHeader>
                            <Checkbox name="checkbox1" value="1" defaultChecked/>
                        </CellHeader>
                        <CellBody>关联已有用户</CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.onSaves}  style={{'marginBottom':'100px'}}>保存</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.setState({SFCSv: val,SFCSrandoms:val})}/>
                <LB Datas={this.state}/>
                <PP Datas={this.state}/>
                <XL Datas={this.state}/>
                <CX Datas={this.state}/>
                <JB Datas={this.state}/>
                <XS Datas={this.state}/>
                <YT Datas={this.state}/>
                <ZB Datas={this.state}/>
            </Page>
        );
    }
};


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
