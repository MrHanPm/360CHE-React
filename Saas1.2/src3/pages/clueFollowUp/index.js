import React,{Component} from 'react'
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
    CellFooter,
    Button,
} from 'react-weui'
import {Tool,Alert} from '../../tool.js'
import './index.less'
import Foll from '../sidebar/Foll' //筛选
import {LoadAd,NoMor,NoDataS} from '../../component/more.js'

class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
           loadingS:true,
           isDatas:false,
           nowpage:1,
           follownum:1,
           buycarnum:1,

           clueslevel:1,
           submitdate:1,
           reccount:0,
           p:1,
           pf:0,
           s_sorttype:1,
           s_sortfield:'zh',
           FollV:'',
           DATA:[],
           loadPage:true,
           loadTimes:'',
        }
        this.handleScroll = this.handleScroll.bind(this)
        this.RobLine = this.RobLine.bind(this)
        this.FilterS = this.FilterS.bind(this)
        this.FOLL = this.FOLL.bind(this)
        this.FollSidebar = this.FollSidebar.bind(this)
        this.goSearchPage = this.goSearchPage.bind(this)
    }
    upDATA(){
        this.state.loadPage = false;
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.nowpage = this.state.nowpage;
        json.cluesstatus = 1;
        json.s_sortfield = this.state.s_sortfield;
        json.s_sorttype = this.state.s_sorttype;
        if(this.state.FollV !== '' && typeof(this.state.FollV.s_brandids) !== 'undefined'){
            json.nowpage = 1;
            json.s_levelsetstatus = this.state.FollV.s_levelsetstatus;//级别状态
            json.s_followstatus = this.state.FollV.s_followstatus;//跟进状态
            json.s_follownummin = this.state.FollV.s_follownummin;//跟进次数
            json.s_follownummax = this.state.FollV.s_follownummax;
            // json.s_expectedbycarnummin = this.state.FollV.s_expectedbycarnummin;//台数开始
            // json.s_expectedbycarnummax = this.state.FollV.s_expectedbycarnummax;
            json.s_lastlinktimemin = this.state.FollV.s_lastlinktimemin;//时间开始
            json.s_lastlinktimemax = this.state.FollV.s_lastlinktimemax;
            json.s_brandids = this.state.FollV.s_brandids;//品牌id
            json.s_clueslevel = this.state.FollV.s_clueslevel;//级别
            json.s_clueresource = this.state.FollV.s_clueresource;//线索
            json.s_cheliangyongtuid = this.state.FollV.s_cheliangyongtuid;//用途
        }
        //console.log(json);
        Tool.get('Clues/GetCluesList.aspx',json,
            (res) => {
                if(res.status == 1){
                    let page = this.state.nowpage;
                    if(res.listdata.length === 0){
                        this.setState({isDatas:true})
                    }else{
                        this.setState({isDatas:false})
                    }
                    if(res.listdata.length < 10){
                        this.setState({loadingS:false})
                    }
                    if(page == 1){this.state.DATA =[];}
                    // for(let i=0; i<res.listdata.length;i++){
                    //     this.state.DATA.push(res.listdata[i]);
                    // }
                    let ConData = this.state.DATA.concat(res.listdata);
                    if(res.pagecount == page){
                        this.setState({
                            loadingS:false,
                            DATA:ConData,
                            reccount: res.reccount
                        })
                    }else{
                        Tool.gaTo('加载下一页','加载下一页','跟进中')
                        page++
                        this.setState({
                            nowpage:page,
                            DATA:ConData,
                            reccount: res.reccount
                        })
                        this.state.loadPage = true
                    }
                }else if(res.status == 901){
                    alert(res.msg)
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    FollSidebar(val){
        //console.log(val);
        if(val.s_levelsetstatus.length == 0 && val.s_followstatus.length == 0 && val.s_brandids.length ==0 && val.s_clueslevel.length ==0 && val.s_cheliangyongtuid.length ==0 && val.s_clueresource.length ==0 && val.s_follownummax == -1 && val.s_follownummin == -1 && val.s_lastlinktimemin == '' && val.s_lastlinktimemax == ''){
            this.setState({pf:0});
        }else{
            this.setState({pf:1});
        }
        this.state.FollV = val;
        this.state.DATA=[];
        this.state.nowpage=1;
        this.upDATA();
    }
    FilterS(e){
        this.state.DATA=[];
        this.state.nowpage=1;
        if(e.target.title == 'zh'){
            this.state.p=1;
            this.state.s_sortfield='zh';
        }else if(e.target.title == 'clueslevel'){
            this.state.p=2;
            this.state.s_sortfield='clueslevel'
            if(this.state.clueslevel == 2){
                this.state.clueslevel=1
                this.state.s_sorttype=1
            }else{
                this.state.clueslevel=2
                this.state.s_sorttype=2
            }
        }else if(e.target.title == 'submitdate'){
            this.state.p=3;
            this.state.s_sortfield='submitdate'
            if(this.state.submitdate == 2){
                this.state.submitdate=1
                this.state.s_sorttype=1
            }else{
                this.state.submitdate=2
                this.state.s_sorttype=2
            }
        }
        this.upDATA()
    }
    FOLL(){
        document.getElementById('Folls').setAttribute('class','PubSidebar visible');
    }
    RobLine(e){
        let GAs = '无|' + e.target.title + '|无|无|';
        Tool.gaTo('点击跟进中线索','红/未提醒',GAs);
        let clusUrl = window.location.hash.replace(/#/g,'');
        let goUrlclus = clusUrl.split("?");
        Tool.localItem('clueURl',goUrlclus[0]);
        let urlTxt = '/robClue?id=' + e.target.title;
        this.context.router.push({
            pathname: urlTxt
        });
    }
    handleScroll(e){
      let BodyMin = e.target;
      let DataMin,Hit,LastLi,goNumb;
      DataMin = BodyMin.scrollHeight;
      Hit  = window.screen.height-126;
      LastLi = BodyMin.scrollTop;
      goNumb = DataMin - Hit - LastLi;
      if(goNumb <= 0){
        if(this.state.loadingS){
            if(this.state.loadPage){
                clearTimeout(this.state.loadTimes);
                this.state.loadTimes = setTimeout(function(){
                    this.upDATA();
                }.bind(this),600);
            }
        }
      }
    }
    goSearchPage(){
        this.context.router.push({pathname: '/searchClue'});
    }
    componentDidMount() {
        this.props.hideS();
        this.upDATA();
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].abort();
        }
        XHRLIST = [];
    }
    render() {
        const {loadingS, DATA,p,submitdate,clueslevel,pf,isDatas,reccount} = this.state;
        let self = this;
        let footerS;
        if(isDatas){
            footerS = <NoDataS />;
        }else{
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <NoMor />;
        }
        return (
        <div className="clueBody cluePend">
            <div className="goSear" onClick={this.goSearchPage}>共{reccount}条 搜索姓名或手机号</div>
            <ul className="FollNavs" style={{top: '86px'}}>
                <li className={p==1?'active':''} title="zh" onClick={this.FilterS}>综合</li>
                <li className={p==2?'FollNavCss active':'FollNavCss'}>
                    <span title="clueslevel" onClick={this.FilterS}>客户级别</span>
                    <i className={clueslevel ==1?'acs':''}></i>
                </li>
                <li className={p==3?'FollNavCss active':'FollNavCss'}>
                    <span title="submitdate" onClick={this.FilterS}>询价时间</span>
                    <i className={submitdate ==1?'acs':''}></i>
                </li>
                <li className={pf?'FollNavCssf active':'FollNavCssf'} onClick={this.FOLL}>筛选</li>
            </ul>
            <div className="clueFollo" style={{paddingTop: '81px'}} onScroll={this.handleScroll}>
                {DATA.map(function(e,index){
                    return(
                    <Panel key={index}>
                        <PanelBody>
                            <MediaBox className="Follov" title={e.cluesextendid} onClick={self.RobLine}></MediaBox>
                            <MediaBox type="text">
                                <MediaBoxHeader>
                                    <CellFooter/>
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>
                                        {e.realname}
                                        <i className={e.nextvisitday ==0 ? 'reds' : ''}>{e.nextvisitlisttitle}</i>
                                    </MediaBoxTitle>
                                    <MediaBoxDescription>{e.truckname} <i style={{color: '#F44336'}}>{e.clueaddsourcename}</i></MediaBoxDescription>
                                    <MediaBoxInfo>
                                        <MediaBoxInfoMeta style={{display: e.saleprice > 0 ? '' : 'none'}}>{e.saleprice}元</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta>已跟进{e.follownum}次 最后跟进:{e.lastlinktime}</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta>购买:{e.expectedbycarnum}台</MediaBoxInfoMeta>
                                    </MediaBoxInfo>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                    )})
                }
                {footerS}
            </div>
            <Foll onChange={val => this.FollSidebar(val)}/>
        </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
