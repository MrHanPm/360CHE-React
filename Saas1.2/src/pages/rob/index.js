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
    ActionSheet,
    Button,
} from 'react-weui';
import Brand from '../sidebar/brand';//品牌
import {Tool,Alert} from '../../tool.js';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import SF from '../sidebar/SFA';//省份
import './index.less';
import ShowAlert from '../../component/Alert.js'

class Clues extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingS:true,
            showBrands:'',
            brandid:'',
            SFCSrandoms:'',
            SFCSv:'',
            size:'',
            nowpage:1,
            DATA:[],
            isDatas:false,
            topnotice:'',
            maxrobnum:'',//最大能抢线索数量
            todayrobnum:''//今天已经抢的线索数量pagecount
        }
        this.showBrand = this.showBrand.bind(this);
        this.Alts = this.Alts.bind(this);
        this.SFCS = this.SFCS.bind(this);
        this.upBrand = this.upBrand.bind(this);
        this.upSF = this.upSF.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.RobLine = this.RobLine.bind(this);
    }
    Alts(){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        Tool.get('PublicClues/RobCLuesDescription.aspx',json,
            (res) => {
                if(res.status == 1){
                    Alert.to(res.msg);
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
        )
    }
    SFCS(){this.setState({SFCSrandoms: Math.random(),showBrands:''});}
    upBrand(val){
        this.state.brandid = val;
        this.state.nowpage = 1;
        this.state.DATA = [];
        this.state.showBrands = '';
        this.upDATA();
    }
    upSF(val){
        this.state.SFCSv = val;
        this.state.nowpage = 1;
        this.state.DATA = [];
        this.state.SFCSrandoms = '';
        this.upDATA();
    }
    upDATA(){
        this.state.SFCSrandoms = '';
        this.state.showBrands = '';
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.brandid = this.state.brandid;
        json.nowpage = this.state.nowpage;
        if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincesn) !== 'undefined'){
             json.provincesn = this.state.SFCSv.provincesn;
             json.citysn = this.state.SFCSv.citysn;
        }else{
            json.provincesn = '';
            json.citysn = '';
        }
        Tool.get('PublicClues/GetCluesList.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({loadingS:true});
                    let page = this.state.nowpage;
                    // this.state.SFCSrandoms = '';
                    // this.state.showBrands = '';
                    if(res.listdata.length === 0){
                        this.setState({isDatas:true});
                    }else{
                        this.setState({isDatas:false});
                    }
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false});
                    }
                    // for(let i=0; i<res.listdata.length;i++){
                    //     this.state.DATA.push(res.listdata[i]);
                    // }
                    let ConData = this.state.DATA.concat(res.listdata);

                    if(res.pagecount === page){
                        this.setState({loadingS:false,
                            DATA:ConData,
                        });
                    }else{
                        page++;
                        this.setState({
                            topnotice:res.topnotice,
                            nowpage:page,
                            DATA:ConData,
                        });
                    }
                    //console.log(this.state);
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
        )
    }
    RobLine(e){
        let sessionid;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        Tool.get('PublicClues/RobCustomer.aspx',{sessionid:sessionid,cluesid:e.target.title},
            (res) => {
                if(res.status == 1){
                    let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    this.context.router.push({pathname: urlTxt});
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
        )
    }
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height;
      LastLi = BodyMin.scrollTop;
      //console.log(DataMin,Hit,LastLi);
      goNumb = DataMin - Hit - LastLi;
      if(goNumb <= 0){
        // BodyMin.scrollTop = DataMin;
        if(this.state.loadingS){
            let t
            t && clearTimeout(t);
            t = setTimeout(function(){
                this.upDATA();
            }.bind(this),800);
        }
      }
    }
    componentDidMount() {
        this.upDATA();
    }
    showBrand(){ this.setState({showBrands:Math.random(),SFCSrandoms:''});}
    render() {
        const {loadingS, DATA, topnotice,isDatas} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd /> : <NoMor />;
        }
        return (
            <div className="robBody">
                <ul className="robNav">
                    <li onClick={this.showBrand}>品牌</li>
                    <li onClick={this.SFCS}>地区</li>
                </ul>
                <div className="robMsg">
                    <p>{topnotice}</p>
                    <i onClick={this.Alts}></i>
                </div>
                <div className="clueBody cluePending" id="clueBody" style={{'paddingTop':'85px'}} onScroll={this.handleScroll}>
                    {DATA.map(function(e,index){
                        return(
                        <Panel key={index}>
                            <PanelBody>
                                <MediaBox type="text">
                                    <MediaBoxHeader>
                                        <Button type="primary" title={e.maincluesid} onClick={self.RobLine} plain>立即抢</Button>
                                    </MediaBoxHeader>
                                    <MediaBoxBody>
                                        <MediaBoxTitle>
                                            {e.truckname}
                                        </MediaBoxTitle>
                                        <MediaBoxInfo>
                                            <MediaBoxInfoMeta>{e.cluecreatedatetime}</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta>{e.provincename}</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta>{e.cityname}</MediaBoxInfoMeta>
                                        </MediaBoxInfo>
                                    </MediaBoxBody>
                                </MediaBox>
                            </PanelBody>
                        </Panel>
                    )})
                }
                {footerS}
                </div>
                <ShowAlert />
                <Brand Datas={this.state.showBrands}  onChange={val =>this.upBrand(val)}/>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.upSF(val)}/>
            </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
