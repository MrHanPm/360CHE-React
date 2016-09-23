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
import './index.less';
export default class MsgDemo extends React.Component {
    constructor(){
        super();
        this.state = {
            loadingS:true,
            DATA:[],
            url:'',
            title:'',
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
        // let oldData = JSON.parse(Tool.localItem('vipLodData'));
        // json.sessionid = oldData.sessionid;
        json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        Tool.get('User/Share.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({
                        DATA:res.listdata,
                        loadingS:false
                    });
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
    }
    render() {
        const {loadingS,DATA,shows} =this.state;
        const self = this
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
            {loadingS ? <LoadAd /> : <NoMor />}
            <div className="FXBox" style={{'display':shows?'':'none'}}>
                <dl>
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
                    <dt className="clos" onClick={this.hidFx}></dt>
                </dl>
            </div>
        </Page>
        );
    }
};
class LoadAd extends Component{
  render(){
    return(
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
    )
  }
}

class NoMor extends Component{
  render(){
    return(
        <p className="noMor">没有更多了...</p>
    )
  }
}
