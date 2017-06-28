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
    Button,
    Dialog,
    Form,
    FormCell,
    CellBody,
    CellFooter,
    Radio,
} from 'react-weui'
const {Confirm } = Dialog
import Brand from '../sidebar/brand'   //品牌
import LBA from '../sidebar/LBA'   //类型
import {Tool, Alert} from '../../tool.js'
import {LoadAd,NoMor,NoDataS} from '../../component/more.js'
import SF from '../sidebar/SFA'    //省份
import './index.less'
import ShowAlert from '../../component/Alert.js'

class Clues extends Component {
    constructor(props){
        super(props);
        this.state = {
            shearName: '',
            loadingS:true,
            showBrands:'',
            brandid:'',
            SFCSrandoms:'',
            SFCSv:'',
            LBASrandoms:'',
            LBASv:'',
            size:'',
            nowpage:1,
            DATA:[],
            isDatas:false,
            topnotice:'',
            isBuy: 0,
            maxrobnum:'',
            todayrobnum:'',
            loadPage:true,
            loadTimes:'',
            branLin: [], // 线索出现的帐户余额
            isGore: 0,  // 是否显示充值按钮
            freeavailablerobnum: 0,  // 是否有免费条数
            banid: 0,
            typeTitle: 0,
            
            PPname:'',   // 头部品牌名称
            LBname:'',   // 头部类别名称
            DQname:'',   // 头部地区名称

            isshowclickmsg:0,  // 是否可购买限制

            payShow: false,
            payId: 0,
            payTitle: '确认花费购买这条线索吗？',
            payMsg:'',

            valShow: false,
            valMsg:'',

            alertShow: false,
            alertTitle:'',
        }
        this.showBrand = this.showBrand.bind(this)
        this.Alts = this.Alts.bind(this)
        this.SFCS = this.SFCS.bind(this)
        this.LBAS = this.LBAS.bind(this)
        this.upBrand = this.upBrand.bind(this)
        this.upSF = this.upSF.bind(this)
        this.upLBA = this.upLBA.bind(this)
        this.handleScroll = this.handleScroll.bind(this)

        this.btnPaycs = this.btnPaycs.bind(this)
        this.RADIO = this.RADIO.bind(this)
    }
    componentWillMount () {
        let robSearchSF = JSON.parse(Tool.localItem('robSearchSF')) || ''
        let robSearchPP = Tool.localItem('robSearchPP') || ''
        let robSearchPPname = Tool.localItem('robSearchPPname') || ''
        let robSearchLB = JSON.parse(Tool.localItem('robSearchLB')) || ''
        // let robSearchPP = null
        // console.log(robSearchSF, 'robSearchSF');
        // console.log(robSearchPP, 'robSearchPP');
        if (robSearchSF.provincesn !== '' && typeof(robSearchSF.provincesn) !== 'undefined') {
            this.setState({
                SFCSv: robSearchSF,
                DQname: robSearchSF.cityname.substring(0,4),
            })
        } else {
            this.setState({
                SFCSv: robSearchSF,
                DQname:'',
            })
        }
        if (robSearchLB.values !== '' && typeof(robSearchLB.values) !== 'undefined') {
            this.setState({
                LBASv: robSearchLB,
                LBname: robSearchLB.key.substring(0,4),
            })
        } else {
            this.setState({
                LBASv: '',
                LBname: '',
            })
        }
        this.setState({
            brandid: robSearchPP,
            PPname: robSearchPPname.substring(0,4),
        })
    }
    Alts(){
        this.setState({valShow:true})
        // this.context.router.push({pathname: '/robMsg'})
    }
    SFCS(){
        this.setState({SFCSrandoms: Math.random()})
    }
    LBAS(){
        this.setState({LBASrandoms: Math.random()})
    }
    upBrand(val,name){
        this.setState({PPname: name.substring(0,4)})
        Tool.localItem('robSearchPP', val)
        Tool.localItem('robSearchPPname', name)
        this.state.brandid = val;
        this.state.nowpage = 1
        this.state.DATA = []
        this.state.showBrands = ''
        this.upDATA();
    }
    upSF(val){
        let txt = JSON.stringify(val)
        this.setState({DQname: val.cityname.substring(0,4)})
        Tool.localItem('robSearchSF', txt)
        this.state.SFCSv = val;
        this.state.nowpage = 1;
        this.state.DATA = [];
        this.state.SFCSrandoms = ''
        this.upDATA();
    }
    upLBA(val){
        let txt = JSON.stringify(val)
        this.setState({LBname: val.key.substring(0,4)})
        Tool.localItem('robSearchLB', txt)
        this.state.LBASv = val
        this.state.nowpage = 1
        this.state.DATA = []
        this.state.LBASrandoms = ''
        this.upDATA();
    }
    upDATA(){
        this.state.loadPage = false
        this.state.SFCSrandoms = ''
        this.state.showBrands = ''
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
        if (this.state.LBASv !== '' && typeof(this.state.LBASv.values) !== 'undefined') { 
            json.subcategoryid = this.state.LBASv.values
        } else { json.subcategoryid = ''}
        Tool.get('PublicClues/GetCluesList.aspx',json,
            (res) => {
                if(res.listdata.length === 0){
                    this.setState({isDatas:true});
                }else{
                    this.setState({isDatas:false});
                }
                if(res.status == 1){
                    this.setState({loadingS:true});
                    let page = this.state.nowpage;
                    // this.state.SFCSrandoms = '';
                    // this.state.showBrands = '';
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
                            topnotice: res.topnotice,
                            isBuy: res.isbuyclues,
                            isshowclickmsg:res.isshowclickmsg
                        });
                    }else{
                        Tool.gaTo('加载下一页','加载下一页','抢线索页')
                        page++
                        this.setState({
                            topnotice: res.topnotice,
                            isBuy: res.isbuyclues,
                            nowpage:page,
                            DATA:ConData,
                            isshowclickmsg:res.isshowclickmsg
                        });
                        this.state.loadPage = true
                    }
                    //console.log(this.state);
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'})
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。')
            }
        )
    }
    hidePayConfm (){
        this.setState({payShow: false,valShow: false,branLin:[]})
        let GAs = this.state.shearName+'|' + this.state.payId + '|无|无'
        Tool.gaTo('购买线索-点击放弃购买','抢线索页的线索',GAs)
    }
    hideValConfm (){
        this.setState({valShow: false,payShow: false,branLin:[]})
        Tool.gaTo('充值流程','点击暂不充值','余额不足弹窗')
    }
    btnPaycs (e) {
        let json = {}
        json.pay = e.target.dataset.pay
        json.tp = 0
        json.id = e.target.title
        json.m = this.state.isshowclickmsg
        Tool.localItem('BUYCLU', JSON.stringify(json))
        this.context.router.push({pathname: '/robBuy'})
    }


    hideAlert () {this.setState({alertShow: false})}
    goVal(){
        this.context.router.push({pathname: '/myacut'})
        Tool.gaTo('充值流程','点击前去充值','余额不足弹窗')
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
            if(this.state.loadPage){
                clearTimeout(this.state.loadTimes)
                this.state.loadTimes = setTimeout(function(){
                    this.upDATA()
                }.bind(this),600)
            }
        }
      }
    }
    componentDidMount() {
        this.upDATA()
    }
    RADIO (e) {
        // console.log(e.target.value)
        this.setState({
            banid: e.target.value
        })
    }
    showBrand(){ this.setState({showBrands:Math.random()})}
    render() {
        const {loadingS, DATA, topnotice,isDatas,payShow, payMsg, payTitle, payBtn,alertShow,alertTitle,alertBtn, valShow, valBtn, valMsg, PPname, LBname, DQname, isBuy,freeavailablerobnum,branLin,isGore} = this.state
        let self = this
        let footerS
        if(isDatas){
            footerS = <NoDataS />
        }else{
            footerS = loadingS ? <LoadAd DATA={DATA.length>0?false:true}/> : <NoMor />
        }
        return (
            <div className="robBody">
                <ul className="robNav">
                    <li onClick={this.showBrand}>{PPname == '' ? '品牌' : PPname}</li>
                    <li onClick={this.LBAS}>{LBname == '' ? '类别' : LBname}</li>
                    <li onClick={this.SFCS}>{DQname == '' ? '地区' : DQname}</li>
                </ul>
                <div className="robMsg">
                    <p>{topnotice}</p>
                    <i style={{display: isBuy == '1' ? 'none' : ''}} onClick={this.Alts}></i>
                </div>
                <div className="clueBody cluePending" id="clueBody" style={{'paddingTop':'85px'}} onScroll={this.handleScroll}>
                    {DATA.map(function(e,index){
                        return(
                        <Panel key={index}>
                            <PanelBody>
                                <MediaBox type="text">
                                    <MediaBoxHeader>
                                        <Button type="primary" title={e.maincluesid} data-pay={e.saleprice} data-id={index}
                                        onClick={self.btnPaycs} plain>详情</Button>
                                    </MediaBoxHeader>
                                    <MediaBoxBody>
                                        <MediaBoxTitle>
                                            {e.truckname}
                                        </MediaBoxTitle>
                                        <MediaBoxInfo>
                                            <MediaBoxInfoMeta className="del-origs" style={{display: e.originalsaleprice.length > 2 ? '' : 'none'}}>{e.originalsaleprice}</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta>{e.cluecreatedatetime}</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta>{e.provincename}</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta>{e.cityname}</MediaBoxInfoMeta>
                                            <MediaBoxInfoMeta>{e.realname}</MediaBoxInfoMeta>
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
                
                <Confirm title={null} buttons={alertBtn} show={alertShow}>
                {alertTitle}
                </Confirm>
                <Confirm title="您的经销商帐户余额不足，是否充值？" buttons={valBtn} show={valShow}>
                    {valMsg}
                </Confirm>

                <Brand Datas={this.state.showBrands}  onChange={(val,name) => this.upBrand(val,name)} 
                    onClose={() => this.setState({showBrands:''})}/>
                <SF Datas={this.state.SFCSrandoms} onChange={val => this.upSF(val)} 
                    onClose={() => this.setState({SFCSrandoms:''})}/>
                <LBA Datas={this.state.LBASrandoms} onChange={val => this.upLBA(val)} 
                    onClose={() => this.setState({LBASrandoms:''})}/>
            </div>
        );
    }
};

Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default Clues
