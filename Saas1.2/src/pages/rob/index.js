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
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import SF from '../sidebar/SF';//省份
import './index.less';

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
    Alts(){Alert.to('每个经销商每天只能抢500条线索');}
    SFCS(){this.setState({SFCSrandoms: Math.random(),showBrands:'showBrands'});}
    upBrand(val){
        this.setState({brandid: val,showBrands:'showBrands'})
        this.upDATA(val);
    }
    upSF(val){
        this.setState({
            SFCSv: val,
            SFCSrandoms:'SFCSrandoms'
        });
        this.upDATA(val);
    }
    upDATA(val,typ){
        console.log(typ,'typ');
        console.log(val,'val');
        let json={};
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //json.sessionid = oldData.sessionid;
        json.sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        if(typeof(val) == 'undefined'){
            json.brandid = this.state.brandid;
            json.nowpage = this.state.nowpage;
            if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincesn) !== 'undefined'){
                 json.provincesn = this.state.SFCSv.provincesn;
                 json.citysn = this.state.SFCSv.citysn;
            }else{
                json.provincesn = '';
                json.citysn = '';
            }
        }else if(typeof(val) == 'string'){
            json.nowpage = 1;
            json.brandid = val;
            if(this.state.SFCSv !== '' && typeof(this.state.SFCSv.provincesn) !== 'undefined'){
                 json.provincesn = this.state.SFCSv.provincesn;
                 json.citysn = this.state.SFCSv.citysn;
            }else{
                json.provincesn = '';
                json.citysn = '';
            }
        }else if(typeof(val) == 'object'){
            json.nowpage = 1;
            json.brandid = this.state.brandid;
            json.provincesn = val.provincesn;
            json.citysn = val.citysn;
        }

        Tool.get('PublicClues/GetCluesList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage;
                    for(let i=0; i<res.listdata.length;i++){
                        this.state.DATA.push(res.listdata[i]);
                    }
                    console.log(page,this.state.DATA);
                    if(res.pagecount == page){
                        this.setState({loadingS:false});
                    }else{
                        page++;
                        this.setState({
                            topnotice:res.topnotice,
                            nowpage:page
                        });
                    }
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    RobLine(e){
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //sessionid = oldData.sessionid;
        let sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';
        Tool.get('PublicClues/RobCustomer.aspx',{sessionid:sessionid,cluesid:e.target.title},
            (res) => {
                if(res.status == 1){
                    let urlTxt = '/robClue?id=' + res.data.cluesextendid;
                    this.context.router.push({pathname: urlTxt});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height;
      LastLi = BodyMin.scrollTop;
      goNumb = DataMin - Hit - LastLi;
      if(goNumb == 0){
        // BodyMin.scrollTop = DataMin;
        if(this.state.loadingS){
            let t
            t && clearTimeout(t);
            t = setTimeout(function(){
                this.upDATA(undefined,'handleScroll');
            }.bind(this),800);
        }
      }
    }
    componentDidMount() {
        this.upDATA(undefined,'componentDidMount');
    }
    showBrand(){ this.setState({showBrands:Math.random(),SFCSrandoms:'SFCSrandoms'});}
    render() {
        const {loadingS, DATA, topnotice} = this.state;
        let self = this;
        return (
            <Page className="robBody" >
                <ul className="robNav">
                    <li onClick={this.showBrand}>品牌</li>
                    <li onClick={this.SFCS}>地区</li>
                </ul>
                <div className="clueBody cluePending" id="clueBody" onScroll={this.handleScroll}>
                    <div className="robMsg">
                        <p>{topnotice}</p>
                        <i onClick={this.Alts}></i>
                    </div>
                    {DATA.map(function(e,index){
                        return(
                        <Panel key={index}>
                            <PanelBody>
                                <MediaBox type="text">
                                    <MediaBoxHeader>
                                        <Button type="primary" title={e.maincluesid} onClick={self.RobLine} plain>立即抢</Button>
                                    </MediaBoxHeader>
                                    <MediaBoxBody>
                                        <MediaBoxDescription>
                                            {e.truckname}
                                        </MediaBoxDescription>
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
                {loadingS ? <LoadAd /> : <NoMor />}
                </div>
                <Brand Datas={this.state.showBrands}  onChange={val =>this.upBrand(val)}/>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.upSF(val)}/>
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


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
