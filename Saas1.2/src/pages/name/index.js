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
import {Tool,Alert} from '../../tool.js';

class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            brands:[],
            showBrands:false,
            
        };
        this.nameInput = (e) => {
            this.state.name = e.target.value;
        }
        this.goNext = this.goNext.bind(this);
    }

    componentDidMount() {
        document.title="销售信息"
        let BrandKey = Tool.localItem('BrandKey');
        if(BrandKey !== null){
            this.setState({
                showBrands:true,
                brands: JSON.parse(BrandKey)
            });
        }
        
        console.log(Tool.localItem('BrandKey'),BrandKey);
    }
    checkForm(){
        if(this.state.name == '' || this.state.name.length == 0){
            Alert.to("请输入姓名");
            return false;
        }
        if(this.state.brands.length === 0){
            Alert.to("请选择品牌");
            return false;
        }
        return true;
    }
    goNext(){
        if(this.checkForm()){
            let oldData = JSON.parse(Tool.localItem('vipLodData'));
            let json = {};
            json.subdealerids = this.state.brands;
            json.realname = this.state.name;
            json.tel = oldData.tel;
            json.loginname =  oldData.tel;
            Tool.get('User/AddUser.aspx',json,
                (res) => {
                    if(res.status === 1){
                        this.context.router.push({
                            pathname: '/nav'
                        });
                    }else if(res.status === 801){
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
        let list = this.state.brands.map(function(ele,index){
            return(
                <FormCell checkbox key={index}>
                    <CellHeader>
                        <Checkbox defaultChecked disabled={true}/>
                    </CellHeader>
                    <CellBody>{ele.txts}</CellBody>
                </FormCell>
            )
        });
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

                <Form checkbox style={{'display':this.state.showBrands ? 'block': 'none' }}>
                    <p style={{'padding':'10px 15px'}}>已选择品牌</p>
                    {list}
                </Form>
                
                <ButtonArea>
                    <Button onClick={this.goNext}>进入营销助手</Button>
                </ButtonArea>
                <p className="FootTxt">如遇登录问题，欢迎致电 <i>4006-136-188</i><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
