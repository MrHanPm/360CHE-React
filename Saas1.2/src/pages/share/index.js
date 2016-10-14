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
            id:'',
            isDatas:false,
            shows:false,
        }
        this.hidFx = this.hidFx.bind(this);
        this.ShowFx = this.ShowFx.bind(this);
        this.CopyURL = this.CopyURL.bind(this);
    }
    hidFx(){
        this.setState({shows:false,});
    }
    ShowFx(e){
        this.state.id = e.target.title;
        this.setState({shows:true,});
    }
    CopyURL(){
        let Doms = document.getElementById('copyURL');
        let ids = this.state.id;
        let DATAlist = this.state.DATA;
        let urls='';
        for(let i=0;i<DATAlist.length;i++){
            if(DATAlist[i].id == ids){
                urls = DATAlist[i].shareurl;
                break;
            }
        }
        // let httPs = Tool.ShareURL;
        // let links = httPs + urls;
        Doms.innerHTML = urls;
        // if(window.clipboardData){
        //     window.clipboardData.setData('Text',links);
        // }else{
        document.execCommand('Copy','false',urls);
        // }
        // if (document.body.createTextRange) {
        //     var range = document.body.createTextRange();
        //     range.moveToElementText(Doms);
        //     range.select();
        //     document.execCommand('Copy','false',null);
        //     alert('已复制到剪切版');
        // } else if (window.getSelection) {
        //     var selection = window.getSelection();
        //     var range = document.createRange();
        //     range.selectNodeContents(Doms);
        //     selection.removeAllRanges();
        //     selection.addRange(range);
        //     /*if(selection.setBaseAndExtent){
        //         selection.setBaseAndExtent(text, 0, text, 1);
        //     }*/
        //     document.execCommand('Copy','false',null);
        //     alert('已复制到剪切版');
        // } else {
        //     alert('暂不支持');
        // }
        alert('暂不支持,请通过点击右上角进行复制分享～');
        window.location.href = urls;
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
    componentWillMount(){
        this.upDATA();
    }
    componentDidMount() {
        document.title = '选择店铺';
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
        
        wx.ready(function(){
            wx.hideOptionMenu();
          // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
          document.querySelector('#onMenuShareAppMessage').onclick = function () {
            let ids = self.state.id;
            let DATAlist = self.state.DATA;
            let Obj={};
            for(let i=0;i<DATAlist.length;i++){
                if(DATAlist[i].id == ids){
                    Obj = DATAlist[i];
                    break;
                }
            }
            //let httPs = Tool.ShareURL;
            let links = Obj.shareurl;
            let sharetitle = Obj.sharetitle;
            let sharesummary= Obj.sharesummary;
            let shareimgurl= Obj.shareimgurl;
            wx.onMenuShareAppMessage({
              title: sharetitle,
              desc: sharesummary,
              link: links,
              imgUrl: shareimgurl,
              trigger: function (res) {
                alert('暂不支持,请通过点击右上角进行复制分享～');
                window.location.href = links;
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          };

          // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
          document.querySelector('#onMenuShareTimeline').onclick = function () {
            let ids = self.state.id;
            let DATAlist = self.state.DATA;
            let Obj={};
            for(let i=0;i<DATAlist.length;i++){
                if(DATAlist[i].id == ids){
                    Obj = DATAlist[i];
                    break;
                }
            }
            let links = Obj.shareurl;
            let sharetitle = Obj.sharetitle;
            let sharesummary= Obj.sharesummary;
            let shareimgurl= Obj.shareimgurl;
            wx.onMenuShareTimeline({
              title: sharetitle,
              desc: sharesummary,
              link: links,
              imgUrl: shareimgurl,
              trigger: function (res) {
                alert('暂不支持,请通过点击右上角进行复制分享～');
                window.location.href = links;
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          };

          // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
          document.querySelector('#onMenuShareQQ').onclick = function () {
            let ids = self.state.id;
            let DATAlist = self.state.DATA;
            let Obj={};
            for(let i=0;i<DATAlist.length;i++){
                if(DATAlist[i].id == ids){
                    Obj = DATAlist[i];
                    break;
                }
            }
            let links = Obj.shareurl;
            let sharetitle = Obj.sharetitle;
            let sharesummary= Obj.sharesummary;
            let shareimgurl= Obj.shareimgurl;
            wx.onMenuShareQQ({
              title: sharetitle,
              desc: sharesummary,
              link: links,
              imgUrl: shareimgurl,
              trigger: function (res) {
                alert('暂不支持,请通过点击右上角进行复制分享～');
                window.location.href = links;
              },
              complete: function (res) {
                alert(JSON.stringify(res));
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          };
          
          // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
          document.querySelector('#onMenuShareWeibo').onclick = function () {
            let ids = self.state.id;
            let DATAlist = self.state.DATA;
            let Obj={};
            for(let i=0;i<DATAlist.length;i++){
                if(DATAlist[i].id == ids){
                    Obj = DATAlist[i];
                    break;
                }
            }
            let links = Obj.shareurl;
            let sharetitle = Obj.sharetitle;
            let sharesummary= Obj.sharesummary;
            let shareimgurl= Obj.shareimgurl;
            wx.onMenuShareWeibo({
              title: sharetitle,
              desc: sharesummary,
              link: links,
              imgUrl: shareimgurl,
              trigger: function (res) {
                alert('暂不支持,请通过点击右上角进行复制分享～');
                window.location.href = links;
              },
              complete: function (res) {
                alert(JSON.stringify(res));
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          };

          // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
          document.querySelector('#onMenuShareQZone').onclick = function () {
            let ids = self.state.id;
            let DATAlist = self.state.DATA;
            let Obj={};
            for(let i=0;i<DATAlist.length;i++){
                if(DATAlist[i].id == ids){
                    Obj = DATAlist[i];
                    break;
                }
            }
            let links = Obj.shareurl;
            let sharetitle = Obj.sharetitle;
            let sharesummary= Obj.sharesummary;
            let shareimgurl= Obj.shareimgurl;
            wx.onMenuShareQZone({
              title: sharetitle,
              desc: sharesummary,
              link: links,
              imgUrl: shareimgurl,
              trigger: function (res) {},
              complete: function (res) {
                alert(JSON.stringify(res));
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          };
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
                            <Cell key={index} title={e.id} onClick={self.ShowFx}>
                                <CellHeader title={e.id}>
                                    <img src={e.shareimgurl} title={e.id} />
                                </CellHeader>
                                <CellBody title={e.id}>
                                    <p title={e.id}>{e.sharetitle}</p>
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
                        <div id="onMenuShareAppMessage"></div>
                        <p>微信好友</p>
                    </dd>
                    <dd>
                        <div className="fq" id="onMenuShareTimeline"></div>
                        <p>微信朋友圈</p>
                    </dd>
                    <dd>
                        <div className="qq" id="onMenuShareQQ"></div>
                        <p>QQ</p>
                    </dd>
                    <dd>
                        <div className="qk" id="onMenuShareQZone"></div>
                        <p>QQ空间</p>
                    </dd>
                    <dd>
                        <div className="sina" id="onMenuShareWeibo"></div>
                        <p>新浪微博</p>
                    </dd>
                    <dd>
                        <div className="url" onClick={this.CopyURL}></div>
                        <p>复制链接</p>
                    </dd>
                </dl>
            </div>
            <div id="copyURL" style={{'display':'none'}}></div>
        </Page>
        );
    }
};


