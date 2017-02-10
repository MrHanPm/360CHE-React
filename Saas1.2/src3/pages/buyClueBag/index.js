"use strict";

import React,{Component} from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    ButtonArea,
    Button,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    pre,
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

class BuyClueBag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            price:'',
            number:'1',
            buyClueBag:{},
            sessionid:'',
            productid:'',
            buying:true,
        }

        this.increase = this.increase.bind(this);
        this.reduce = this.reduce.bind(this);
        this.buyProduct = this.buyProduct.bind(this);
    }
    componentWillMount(){ 
        // render之前执行的操作
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        let productid = Tool.localItem('productid');

        //存储用户id和产品id
        this.setState({
            sessionid:sessionid,
            productid:productid
        })

        var _this = this;
        Tool.get('Goods/GetCluesPackage.aspx',{sessionid:sessionid,id:productid},
            (res) => {
                if(res.status == 1){
                     _this.setState({
                        buyClueBag:res.data.cluespackage
                    })                  
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/phone'});
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
    increase(e){
        this.setState({
           number:++this.state.number,
        })
    }
    reduce(e){
        if(this.state.number > 1){
            this.setState({
                number:--this.state.number,
            })  
        }
    }
    buyProduct(){
        if(this.state.buying){
            this.setState({
                buying:false,
            })
            let _this = this;
            window.location.href='wxpay.aspx?sessionid=' + this.state.sessionid + '&goodsid=' + this.state.productid + '&goodsnum=' + this.state.number;
        }
    }


    render() {
        let buyClueBag = this.state.buyClueBag;
        let isVip;
        if(buyClueBag.ismember == 1){
            isVip = true;
        }else{
            isVip = false;
        }
        return (
            <div className="buy-clue">
                <Panel className="goods">
                    <PanelBody>
                        <MediaBox type="small_appmsg">
                            <Cells>
                                <Cell>
                                    <CellHeader>
                                        <div className="goods-info">
                                            <p className="name">{buyClueBag.goodsname}<em>包含：{buyClueBag.goodsnum}条线索</em></p>
                                            <p className="price">￥<em>{isVip ? buyClueBag.goodsmemberprice : buyClueBag.goodsoriginalprice}</em></p>
                                            <p className="discount">{buyClueBag.memberinfo}</p>
                                        </div>
                                    </CellHeader>
                                    <CellBody>
                                         <div className="number">
                                            <span onClick={this.reduce}></span>
                                            <span>{this.state.number}</span>
                                            <span onClick={this.increase}></span>
                                        </div>                                       
                                    </CellBody>
                                </Cell>
                            </Cells>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                <Panel className="info">
                    <PanelBody>
                        <MediaBox type="small_appmsg">
                            <Cells>
                                <Cell>
                                    <div>
                                        <p>加油包详情</p>
                                    </div>
                                </Cell>
                                <Cell>
                                    <CellHeader>
                                        <p className="name">线索数量：<em>{buyClueBag.goodsnum}条</em></p>
                                        <p className="price">普通会员：<em>{buyClueBag.goodsoriginalprice}元</em></p>                                      
                                    </CellHeader>  
                                    <CellBody>
                                    </CellBody>                              
                                    <CellFooter>
                                        <p className="name">生效时间：<em>{buyClueBag.shengxiaodata}</em></p>
                                        <p className="price">卡销宝会员：<em>{buyClueBag.goodsmemberprice}元</em></p>                                     
                                    </CellFooter>
                                </Cell>
                            </Cells>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                <Panel className="rule">
                    <PanelBody>
                        <MediaBox type="small_appmsg">
                            <Cells>
                                <Cell>
                                    <div>
                                        <p>使用规则</p>
                                    </div>
                                </Cell>
                                <Cell>
                                    <CellHeader>
                                                                             
                                    </CellHeader>  
                                    <CellBody>
                                       <p dangerouslySetInnerHTML={{__html: buyClueBag.contents}}></p>
                                    </CellBody>
                                </Cell>
                            </Cells>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                <div className="total-price">
                    总价：
                    <span className="price-number">￥<em>{isVip ? (buyClueBag.goodsmemberprice * this.state.number).toFixed(2) : (buyClueBag.goodsoriginalprice * this.state.number).toFixed(2) }</em></span>
                </div>
                <ButtonArea>
                    <Button onClick={this.buyProduct}>微信支付</Button>
                </ButtonArea>
                <ShowAlert />
            </div>
        );
    }
};

BuyClueBag.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default BuyClueBag
