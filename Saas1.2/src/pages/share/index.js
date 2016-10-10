"use strict";

import React,{Component} from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from 'react-weui';
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import './index.less';
export default class MsgDemo extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
            DATA:[],
            url:'',
            title:'',
            isDatas:false,
            ico:'',
            shows:false,
        }
        this.hidFx = this.hidFx.bind(this);
        this.ShowFx = this.ShowFx.bind(this);
    }
    hidFx(){
        this.setState({shows:false,});
    }
    ShowFx(){
        this.setState({shows:true,});
    }
    upDATA(){
        let json = {};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        Tool.get('User/Share.aspx',json,
            (res) => {
                if(res.status == 1){
                    if(res.listdata.length === 0){
                        this.setState({isDatas:true});
                    }else{
                        this.setState({isDatas:false});
                    }
                    this.setState({
                        DATA:res.listdata,
                        loadingS:false
                    });
                }else if(res.status == 901){
                    Alert.to(res.msg);
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
    componentDidMount() {
        document.title = '选择店铺';
        this.upDATA();
        let self = this;
        [].forEach.call(document.querySelectorAll('.FXBox'), function (el) {  
          el.addEventListener('touchend', function(e) {
            let y = e.changedTouches[0].pageY;
            let Hl = document.getElementById('FenXDL').scrollHeight;
            let Hit  = window.screen.height;
            //console.log(Hit,Hl,y);
            if( y < Hit-Hl){
                self.hidFx();
                e.preventDefault();
            }
          }, false);
        });
    }
    render() {
        const {loadingS,DATA,shows,isDatas} =this.state;
        const self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd /> : <NoMor />;
        }
        return (
        <Page className="account addPursd ShareBox">
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                        {DATA.map(function(e,index){ 
                            return(  
                            <Cell key={index} data-url={e.shareurl} data-name={e.sharesummary} onClick={self.ShowFx}>
                                <CellHeader>
                                    <img src={e.shareimgurl} />
                                </CellHeader>
                                <CellBody>
                                    <p>{e.sharetitle}</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        )})}
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
            {footerS}
            <div className="FXBox" style={{'display':shows?'':'none'}}>
                <dl id="FenXDL">
                    <dt className="pit">分享这个店铺</dt>
                    <dd>
                        <div></div>
                        <p>微信好友</p>
                    </dd>
                    <dd>
                        <div className="fq"></div>
                        <p>微信朋友圈</p>
                    </dd>
                    <dd>
                        <div className="qq"></div>
                        <p>QQ</p>
                    </dd>
                    <dd>
                        <div className="qk"></div>
                        <p>QQ空间</p>
                    </dd>
                    <dd>
                        <div className="sina"></div>
                        <p>新浪微博</p>
                    </dd>
                    <dd>
                        <div className="url"></div>
                        <p>复制链接</p>
                    </dd>
                </dl>
            </div>
        </Page>
        );
    }
};

