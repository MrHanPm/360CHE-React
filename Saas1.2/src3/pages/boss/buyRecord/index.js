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

class BuyRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buyRecord:[]
        }
    };
    componentWillMount(){
        // render之前执行的操作
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        let _this = this;
        Tool.get('Goods/GetCluesPackageOrderList.aspx',{sessionid:sessionid},
            (res) => {
                if(res.status == 1){
                    _this.setState({
                       buyRecord:res.data.cluespackagerecordlist 
                    })
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/phone'});
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    };
    componentDidMount(){
        // render之后执行的操作
    };
    render() {
        if(this.state.buyRecord.length){
            return (
                <div className="buy-record">
                   {    
                        this.state.buyRecord.map(function(ele,index){
                            return(
                                <Panel key={index}>
                                    <PanelBody>
                                        <MediaBox type="small_appmsg">
                                            <Cells>
                                                <Cell className="buy-info">
                                                    <CellHeader>
                                                        <div>
                                                            <p className="name">{ele.goodsname}</p>
                                                            <p className="date">{ele.paydate} {ele.realname}</p>
                                                        </div>
                                                    </CellHeader>
                                                    <CellBody>
                                                            <p className="price">合计：￥<em>{ele.ordertotalprice}</em></p>
                                                            <p className="price-number">￥{ele.buyprice}×{ele.buygoodcount} </p>                                    
                                                    </CellBody>
                                                </Cell>
                                            </Cells>
                                            <div className="order-number">
                                                订单号：<em>{ele.orderid}</em>
                                            </div>
                                        </MediaBox>
                                    </PanelBody>
                                    <ShowAlert />
                                </Panel>
                            )
                        })
                    }
                </div>
            );
        }else{
            return(
                <div className="buy-record"> 
                    <div className="clueBody clueAlre">
                        <div className="noDataBox"></div>
                    </div>
                </div>              
            );
        }
    }
};

BuyRecord.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default BuyRecord
