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
            countdown: 0,
            brands:[],
            showBrands:false,
            
        };
        this.nameInput = (e) => {
            this.state.name = e.target.value;
        }
        this.goNext = this.goNext.bind(this);
    }
    initData(asid){
        let i = 0;
        let time;
        let h ;
        let urlKey = Tool.localItem('fingerprint');
        Tool.get('Comm/GetAllCategoryDownUrl.aspx',{sessionid:asid,fingerprint:urlKey},
            (res) => {
                if(res.status == 1){
                    this.forAjax(res.listdata);
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        );
    }

    forAjax(listdata){
        let ajaxUrls = [];
        let ajaxDataName = [];
        let nameKey ='';
        for(let i=0;i<listdata.length;i++){
            if(listdata[i].ischange == 1){
                ajaxUrls.push(listdata[i].url);
                ajaxDataName.push(listdata[i].name);
            }
            nameKey += listdata[i].fingerprint + '_';
        }
        this.state.countdown = ajaxUrls.length;
        if(ajaxDataName.length > 0){
            this.loadAllData(ajaxDataName,ajaxUrls);
        }else{
            //this.showConfirm();
        }
        Tool.localItem('fingerprint',nameKey);
    }
    loadAllData(names,urls){
        let t;
        if (this.state.countdown == 0) {
            this.setState({countdown:urls.length});
            clearTimeout(t);
        } else {
            let s = this.state.countdown;
            let k = s-1;
            Tool.get(urls[k],'',
                (res) => {
                    if(res.status === 1){
                        Tool.localItem(names[k],JSON.stringify(res));
                        //console.log(Tool.localItem(names[k]),names[k]);
                    }
                },
                (err) => {
                    Alert.to(err.msg);
                }
            )
            s--;
            this.setState({countdown:s});
            t = setTimeout(() => this.loadAllData(names,urls),10);
        }
    }
    componentDidMount() {
        document.title="销售信息"
        let BrandKey = JSON.parse(Tool.localItem('BrandKey'));
        if(BrandKey !== null && BrandKey.length >= 0){
            this.setState({
                showBrands:true,
                brands: BrandKey
            });
        }
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
                        this.initData(Sessionid);
                        if(res.data.usercategory == '1'){
                            this.context.router.push({pathname: '/nav'});
                        }
                        if(res.data.usercategory == '2'){
                            this.context.router.push({pathname: '/boss/nav'});
                        }
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
                            <Input type="text" placeholder="请输入真实姓名" onInput={this.nameInput}/>
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
                <p className="FootTxt">如遇登录问题，欢迎致电 <i>4006-136-188</i><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};

CellDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CellDemo
