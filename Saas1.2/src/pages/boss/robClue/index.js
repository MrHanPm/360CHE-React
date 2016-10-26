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
    Cell,
    CellFooter,
    Checkbox,
    CellBody
} from 'react-weui';
import Page from '../../../component/page';
import {Tool,Alert} from '../../../tool.js';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DATArob:'',
            Messrob:[],
            reccount:0,
            showDonwn:true,
            SDSrandoms:'',
        };
        
        let self = this;
        
        this.ShoDonwn = this.ShoDonwn.bind(this);
        this.HidDonwn = this.HidDonwn.bind(this);
        this.SDS = this.SDS.bind(this);
    }
    ShoDonwn(){this.setState({showDonwn:true});}
    HidDonwn(){this.setState({showDonwn:false});}
    SDS(e){
        let st = parseInt(e.target.title);
        this.setState({SDSrandoms:st});
    }
    componentWillMount(){
        let persId = Tool.getQueryString('id');
        let json={};
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        json.sessionid = sessionid;
        json.cluesextendid = persId;
        Tool.get('Clues/GetCluesDetail.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({DATArob:res.data});
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        );
        Tool.get('Clues/GetClueFollowUpList.aspx',{sessionid:sessionid,cluesextendid:persId},
            (res) => {
                if(res.status == 1){
                    //console.log(JSON.stringify(res.listdata[0]));
                    if(res.reccount > 0){
                        this.setState({showDonwn: false,Messrob:res.listdata,reccount:res.reccount});
                    }else{
                        this.setState({Messrob:res.listdata});
                    }
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        );
    }
    componentDidMount() {
        document.title = '线索详情';
        var body = document.getElementsByTagName('body')[0];
        var iframe = document.createElement("iframe");
        iframe.style.display="none";
        iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        var d = function() {
          setTimeout(function() {
            iframe.removeEventListener('load', d);
            document.body.removeChild(iframe);
          }, 0);
        };
        iframe.addEventListener('load', d);
        document.body.appendChild(iframe);
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].abort();
        }
        XHRLIST = [];
    }
    render() {
        let loadShow=true;
        let self = this;
        if(this.state.DATArob !== '' && typeof(this.state.DATArob.realname) !== 'undefined'){
             
        }else{
            
        }
        const {showDonwn,reccount,Messrob} = this.state;
        const {truckname,realname,tel,subcategoryname,brandname,seriesname,clueslevelname,provincename,cityname,clueresourcename,cheliangyongtuname,expectedbycarnum,remark,dealttruckname,dealtsubcategoryname,dealtbrandname,dealtseriesname,transactionprice,dealtdate,failname,faildate,clueslevel,follownum,cluesextendid,cluefollowname} = this.state.DATArob;
        if(tel !== '' && typeof(tel) !== 'undefined'){loadShow = false;}
        return (
            <Page className="account robClues">
                <Form>
                    <FormCell>
                        <CellHeader><Label>意向车型</Label></CellHeader>
                        <CellBody>
                            {truckname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户姓名</Label></CellHeader>
                        <CellBody>
                            {realname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户电话</Label></CellHeader>
                        <CellBody>
                            {tel}
                        </CellBody>
                        <CellFooter className="cleAft">
                            <a href={`tel:${tel}`}> </a>
                        </CellFooter>
                    </FormCell>
                </Form>
                <Form style={{'display':showDonwn?'block':'none'}}>
                    <FormCell>
                        <CellHeader><Label>所属类别</Label></CellHeader>
                        <CellBody>
                            {subcategoryname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>所属品牌</Label></CellHeader>
                        <CellBody>
                            {brandname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>所属系列</Label></CellHeader>
                        <CellBody>
                            {seriesname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户级别</Label></CellHeader>
                        <CellBody>
                            {clueslevelname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>省份城市</Label></CellHeader>
                        <CellBody>
                            {provincename +' '+cityname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>线索来源</Label></CellHeader>
                        <CellBody>
                            {clueresourcename}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>车辆用途</Label></CellHeader>
                        <CellBody>
                            {cheliangyongtuname}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>购车数量</Label></CellHeader>
                        <CellBody>
                            {expectedbycarnum}
                        </CellBody>
                    </FormCell>

                    <Form style={{'display':clueslevel == 5?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>成交车型</Label></CellHeader>
                            <CellBody>
                                {dealttruckname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交类别</Label></CellHeader>
                            <CellBody>
                                {dealtsubcategoryname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交品牌</Label></CellHeader>
                            <CellBody>
                                {dealtbrandname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交系列</Label></CellHeader>
                            <CellBody>
                                {dealtseriesname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交价格</Label></CellHeader>
                            <CellBody>
                                {transactionprice}
                            </CellBody>
                            <CellFooter className="cleAft">万元</CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交时间</Label></CellHeader>
                            <CellBody>
                                {dealtdate}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form style={{'display':clueslevel == 6?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>战败原因</Label></CellHeader>
                            <CellBody>
                                {failname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>战败时间</Label></CellHeader>
                            <CellBody>
                                {faildate}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            {remark}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>跟进人员</Label></CellHeader>
                        <CellBody>
                            {cluefollowname}
                        </CellBody>
                    </FormCell>
                </Form>
                <div style={{'display':reccount > 0?'block':'none'}}>
                    <div className="openClue" style={{'display':showDonwn?'none':'block'}} onClick={this.ShoDonwn}>展开详细信息</div>
                    <div className="openClue UP" style={{'display':showDonwn?'block':'none'}} onClick={this.HidDonwn}>收起详细信息</div>
                    <dl className="MessClues">
                        <dt>跟进记录{reccount}条</dt>
                        {Messrob.map(function(e,index){
                        return(
                            <dd key={index}>
                                <div title={e.id} onClick={self.SDS}></div>
                                <p>{e.createdate}</p>
                                <h4>设置级别为{e.clueslevelname}</h4>
                                <h4 style={{'display':e.remark == ''?'none':'block'}}>
                                    <span>备注：</span>
                                    <span className="Bkc">{e.remark}</span>
                                </h4>
                            </dd>
                        )})}
                    </dl>
                </div>
                <div className="jump-cover" id="jump_cover" style={{'display':loadShow?'block':'none'}}>
                    <div className="loading visible">
                        <span className="loading-ring"> </span>
                    </div>
                </div>
                <SideRob data={this.state.Messrob} showD={this.state.SDSrandoms} onChange={val => this.setState({SDSrandoms: val})}/>
            </Page>
        );
    }
};

class SideRob extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            DATA:{
                "price":15,"dealtsubcategoryid":64,"dealtsubcategoryname":"载货车","dealtbrandid":155,"dealtbrandname":"广汽吉奥","dealtseriesid":1233,"dealtseriesname":"星旺","dealttruckid":15169,"dealttruckname":"2012款广汽吉奥 星旺M2 精英版 1.0L 60马力 汽油 微卡","dealtdate":"2016/08/25","fail":0,"failname":"","faildate":"","clueslevelcode":"O","id":0,"maincluesid":233,"cluesextendid":314340,"followuptypeid":2,"followuptypename":"上门拜访","expectedprice":0,"clueslevelid":5,"clueslevelname":"O  已成交","followupdate":"2016-08-25 17:25:14","createdate":"2016-08-25 17:25:59","remark":""
            },
            showSid:false
        }
        this.closeSold = this.closeSold.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let ints;
        for(let i=0;i<nextProps.data.length;i++){
            if(nextProps.data[i].id == nextProps.showD){
                ints = i;
                break;
            }
        }
        let datas = nextProps.data[ints];
        if(typeof(nextProps.showD) == 'number'){
          this.setState({
            showSid: true,
            DATA:datas,
          });
        }
    }
    closeSold(){this.setState({showSid:false},()=> this.props.onChange('SDSrandoms'));}
    render() {
        const {showSid}=this.state;
        const {followupdate,followuptypename,price,dealtsubcategoryname,clueslevelname,dealtbrandname,dealtseriesname,expectedprice,dealtdate,faildate,dealttruckname,clueslevelid,failname,remark}=this.state.DATA;
        return(
            <div className={showSid?"SideRobClue visible":"SideRobClue"}>
                <header>
                  <span>跟进记录</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
                </header>
                <Form className="SRCform">
                    <FormCell>
                        <CellHeader><Label>跟进时间</Label></CellHeader>
                        <CellBody>
                            {followupdate}
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>跟进方式</Label></CellHeader>
                        <CellBody>
                            {followuptypename}
                        </CellBody>
                    </FormCell>
                    <FormCell style={{'display':clueslevelid !== 5 && clueslevelid !== 6?'':'none'}}>
                        <CellHeader><Label>预期价格</Label></CellHeader>
                        <CellBody>
                            {price=='0'?'无':price}
                        </CellBody>
                        <CellFooter>万元</CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader><Label>客户级别</Label></CellHeader>
                        <CellBody>
                            {clueslevelname}
                        </CellBody>
                    </FormCell>
                    <Form style={{'display':clueslevelid == 5?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>成交类别</Label></CellHeader>
                            <CellBody>
                                {dealtsubcategoryname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交品牌</Label></CellHeader>
                            <CellBody>
                                {dealtbrandname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交系列</Label></CellHeader>
                            <CellBody>
                                {dealtseriesname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交车型</Label></CellHeader>
                            <CellBody>
                                {dealttruckname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交价格</Label></CellHeader>
                            <CellBody>
                                {price=='0'?'无':price}
                            </CellBody>
                            <CellFooter>万元</CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>成交时间</Label></CellHeader>
                            <CellBody>
                                {dealtdate}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Form style={{'display':clueslevelid == 6?'block':'none'}}>
                        <FormCell>
                            <CellHeader><Label>战败原因</Label></CellHeader>
                            <CellBody>
                                {failname}
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader><Label>战败时间</Label></CellHeader>
                            <CellBody>
                                {faildate}
                            </CellBody>
                        </FormCell>
                    </Form>
                    <FormCell>
                        <CellHeader><Label>备注</Label></CellHeader>
                        <CellBody>
                            {remark}
                        </CellBody>
                    </FormCell>
                </Form>
            </div>
        );
    }
}


MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
