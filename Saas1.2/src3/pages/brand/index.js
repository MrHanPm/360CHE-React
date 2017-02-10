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



// brands:[
//     {"key":"18124","value":"雷诺","isdropdownshow":1},
//     {"key":"17114","value":"北京牌","isdropdownshow":1},
//     {"key":"18487","value":"广汽吉奥","isdropdownshow":1}
// ],

class CellDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            brands:[],
        }
        this.GoSub = this.GoSub.bind(this);
    }
    componentDidMount() {
        // document.title="销售品牌";
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
        Tool.get('WeiXin/GetWXDealerUserAddBrand.aspx',{},
            (res) => {
                if(res.status === 1){
                    this.setState({
                        brands:res.listdata
                    });
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
    GoSub(){
        let list = document.querySelectorAll('[name="brandCheck"]');
        //console.log(list);
        let json = [];
        for(let i=0;i < list.length; i++){
            if(list[i].checked == true){
                json.push({keys:list[i].value,txts:list[i].alt});
            }
        }
        //console.log(json,"this is json");
        let fyobj = JSON.stringify(json);
        if(json.length !== 0){
            Tool.localItem('BrandKey',fyobj);
            this.context.router.push({
                pathname: '/name'
            });
        }else{
            Alert.to('请选择品牌');
        }
    }
    render() {
        let list = this.state.brands.map(function(ele,index){
            return(
                <FormCell checkbox key={index}>
                    <CellHeader>
                        <Checkbox name="brandCheck" value={ele.key} alt={ele.value}/>
                    </CellHeader>
                    <CellBody>{ele.value}</CellBody>
                </FormCell>
            )
        })
        return (
            <Page className="brand CrmScoll" title="销售品牌">

                <Form checkbox>
                    {list}
                </Form>

                <ButtonArea>
                    <Button onClick={this.GoSub}>确定</Button>
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
