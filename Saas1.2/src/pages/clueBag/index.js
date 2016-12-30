"use strict";

import React,{Component} from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from 'react-weui';
import {Tool,Alert} from '../../tool.js';
import './index.less';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import ShowAlert from '../../component/Alert.js';

class ClueBag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            price:'',
            number:'1',
            clueBag:[]
        }
    }
    componentWillMount(){
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        var _this = this;
        // render之前执行的操作
        Tool.get('Goods/GetCluesPackageList.aspx',{sessionid:sessionid},
            (res) => {
                if(res.status == 1){
                    _this.setState({
                        clueBag:res.data.cluespackagelist
                    })
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/phone'});
                }else{
                   Alert.to(res.msg); 
                }
            },
            (err) =>{
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    componentDidMount(){
        // render之后执行的操作
    }

    saveProduct(_this){
        Tool.localItem('productid',_this)
    }

    render() {
        let _this = this;
        return (
            <div className="clue-bag">
                <PanelBody>
                    {this.state.clueBag.map(function(ele,index){
                        return(
                            <Panel key={index} data-productid={ele.id} onClick={_this.saveProduct.bind(this,ele.id)}>
                                <PanelBody>
                                    <MediaBox type="small_appmsg">
                                        <Cells access >
                                            <Cell href={"#buyClueBag"}>
                                                <CellHeader>{ele.goodsname}</CellHeader>
                                                <CellBody>
                                                    <p className="vip">卡销宝会员：￥<em>{ele.goodsmemberprice}</em></p>
                                                    <span className="common">普通用户: ￥{ele.goodsoriginalprice}</span>  
                                                </CellBody>
                                            </Cell>
                                        </Cells>
                                    </MediaBox>
                                </PanelBody>
                            </Panel>
                        )
                    })}
                
                    <Panel>
                        <PanelBody>
                            <MediaBox type="small_appmsg">
                                <Cells access>
                                    <Cell href="#buyRecord" className="history">
                                        <CellHeader>查看购买记录</CellHeader>
                                        <CellBody>
                                            
                                        </CellBody>
                                        <CellFooter />
                                    </Cell>
                                </Cells>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                </PanelBody>
                <ShowAlert />
            </div>
        );
    }
};

ClueBag.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default ClueBag
