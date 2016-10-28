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
            this.setState({name:e.target.value});
            Tool.localItem('nameUs',e.target.value);
        }
        this.goNext = this.goNext.bind(this);
    }
    componentWillMount(){
        let names = Tool.localItem('nameUs');
        this.setState({name:names});
    }
    componentDidMount() {
        // document.title="销售信息";
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
        let BrandKey = JSON.parse(Tool.localItem('BrandKey'));
        if(BrandKey !== null && BrandKey.length >= 0){
            this.setState({
                showBrands:true,
                brands: BrandKey
            });
        }
    }
    checkForm(){
        let regHZ=/^[\u2E80-\u9FFF]+$/;
        if(this.state.brands.length === 0){
            Alert.to("请选择品牌");
            return false;
        }
        if(this.state.name == '' || this.state.name.length == 0){
            Alert.to("请输入姓名");
            return false;
        }
        if(regHZ.test(this.state.name)){}else{
            Alert.to("姓名必须是中文");
            return false;
        }
        if(this.state.name.length > 6){
            Alert.to("姓名不能超过6个字符");
            return false;
        }
        return true;
    }
    goNext(){
        //console.log(this.state.brands);
        if(this.checkForm()){
            let json = {};
            let brandArry = '';
            for(let i=0;i<this.state.brands.length;i++){
                brandArry += this.state.brands[i].keys+','
            }
            //console.log(brandArry);
            let telS = Tool.localItem('Uphone');
            json.subdealerid = brandArry;
            json.realname = this.state.name;
            json.tel = telS;
            json.loginname = telS;
            Tool.get('User/AddUser.aspx',json,
                (res) => {
                    if(res.status === 1){
                        let Vd = JSON.stringify(res.data);
                        let Sessionid = res.data.sessionid;
                        Tool.localItem('vipLodData',Vd);
                        this.context.router.push({pathname: '/loaddata'});
                    }else if(res.status === 801){
                        Alert.to(res.msg);
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
            <Page className="CrmScoll" title="销售信息">
                <Cells access>
                    <Cell href="#brand">
                        <CellBody>
                            选择您的销售品牌
                        </CellBody>
                        <CellFooter></CellFooter>
                    </Cell>
                </Cells>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入真实姓名" onInput={this.nameInput} value={this.state.name}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Form checkbox style={{'display':this.state.showBrands ? 'block': 'none' }}>
                    <p style={{'padding':'10px 15px'}}>已选择品牌</p>
                    {list}
                </Form>
                
                <ButtonArea>
                    <Button onClick={this.goNext}>进入营销助手</Button>
                </ButtonArea>
                <p className="FootTxt">如遇登录问题，欢迎致电 <a href="tel:4006136188">4006-136-188</a><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
