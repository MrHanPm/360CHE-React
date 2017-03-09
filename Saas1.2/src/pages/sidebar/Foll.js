import React from 'react'
import {Icon} from 'react-weui'
import {Tool,Alert} from '../../tool.js'
import './foll.less'

class Sidebar extends React.Component{
  static contextTypes = {
        router: React.PropTypes.object.isRequired
  }
  constructor() {
      super();
          
          this.state ={
            visible:false,
            active:false,
            values:'',
            key:'',
            sFollowId: '',  // 跟进⼈员id
            isBoos: false,
            YG:[],

            's_levelsetstatus':[],//级别状态
            's_followstatus':[],//跟进状态
            's_follownummin':-1,//跟进次数
            's_follownummax':-1,
            // s_expectedbycarnummin:-1,//台数开始
            // s_expectedbycarnummax:-1,
            's_lastlinktimemin':'',//时间开始
            's_lastlinktimemax':'',
            's_brandids':[],//品牌id
            's_clueslevel':[],//级别
            's_clueresource':[],//线索
            's_cheliangyongtuid':[],//用途
            SCH:0,
            PP:[],
            LY:[],
            YT:[]
          }

      this.min_follInput = (e) => {this.state.s_follownummin = e.target.value;}
      this.max_follInput = (e) => {this.state.s_follownummax = e.target.value;}
      // this.min_expeInput = (e) => {this.state.s_expectedbycarnummin = e.target.value;}
      // this.max_expeInput = (e) => {this.state.s_expectedbycarnummax = e.target.value;}
      this.closeSold = this.closeSold.bind(this)
      this.upDatas = this.upDatas.bind(this)
      this.PPsd = this.PPsd.bind(this)
      this.XSsd = this.XSsd.bind(this)
      this.JBsd = this.JBsd.bind(this)
      this.YTsd = this.YTsd.bind(this)
      this.YGsd = this.YGsd.bind(this)
      this.JBZTsd = this.JBZTsd.bind(this)
      this.GJZTsd = this.GJZTsd.bind(this)
      this.Resets = this.Resets.bind(this)
      this.strTime = this.strTime.bind(this)
      this.endTime = this.endTime.bind(this)
      this.buildOn = this.buildOn.bind(this)
      this.focusOn = this.focusOn.bind(this)
  }
  componentWillMount () {
      
  }
  PPsd(e){
    if(e.target.getAttribute('class') == 'activ'){
      for(let i in this.state.s_brandids){
        if(this.state.s_brandids[i] == e.target.title){
          this.state.s_brandids.splice(i,1)
        }
      }
      e.target.removeAttribute('class')
    }else{
      this.state.s_brandids.push(e.target.title)
      e.target.setAttribute('class','activ')
    }
    //console.log(e.target,this.state.s_brandids);
  }
  YGsd(e) {
    if (e.target.getAttribute('class') == 'peodds activ') {
      this.state.sFollowId = '';
      e.target.setAttribute('class','peodds')
    } else {
    let dds = document.querySelectorAll('.peodds')
    try {
      for (let i in dds) {
        dds[i].setAttribute('class','peodds')
      }
    } catch (err){}
      this.state.sFollowId = e.target.title;
      e.target.setAttribute('class','peodds activ')
    }
  }
  YTsd(e){
    if(e.target.getAttribute('class') == 'activ'){
      for(let i in this.state.s_cheliangyongtuid){
        if(this.state.s_cheliangyongtuid[i] == e.target.title){
          this.state.s_cheliangyongtuid.splice(i,1)
        }
      }
      e.target.removeAttribute('class')
    }else{
      this.state.s_cheliangyongtuid.push(e.target.title);
      e.target.setAttribute('class','activ')
    }
    //console.log(e.target,this.state.s_cheliangyongtuid);
  }
  XSsd(e){
    if(e.target.getAttribute('class') == 'activ'){
      for(let i in this.state.s_clueresource){
        if(this.state.s_clueresource[i] == e.target.title){
          this.state.s_clueresource.splice(i,1);
        }
      }
      e.target.removeAttribute('class');
    }else{
      this.state.s_clueresource.push(e.target.title);
      e.target.setAttribute('class','activ');
    }
    //console.log(e.target,this.state.s_clueresource);
  }
  JBsd(e){
    if(e.target.getAttribute('class') == 'activ'){
      for(let i in this.state.s_clueslevel){
        if(this.state.s_clueslevel[i] == e.target.title){
          this.state.s_clueslevel.splice(i,1);
        }
      }
      e.target.removeAttribute('class');
    }else{
      this.state.s_clueslevel.push(e.target.title);
      e.target.setAttribute('class','activ');
    }
    //console.log(e.target,this.state.s_clueslevel);
  }
  JBZTsd(e){
    if(e.target.getAttribute('class') == 'activ'){
      for(let i in this.state.s_levelsetstatus){
        if(this.state.s_levelsetstatus[i] == e.target.title){
          this.state.s_levelsetstatus.splice(i,1);
        }
      }
      e.target.removeAttribute('class');
    }else{
      this.state.s_levelsetstatus.push(e.target.title);
      e.target.setAttribute('class','activ');
    }
    //console.log(e.target,this.state.s_levelsetstatus);
  }
  GJZTsd(e){
    if(e.target.getAttribute('class') == 'activ'){
      for(let i in this.state.s_followstatus){
        if(this.state.s_followstatus[i] == e.target.title){
          this.state.s_followstatus.splice(i,1);
        }
      }
      e.target.removeAttribute('class');
    }else{
      this.state.s_followstatus.push(e.target.title);
      e.target.setAttribute('class','activ');
    }
    //console.log(e.target,this.state.s_followstatus);
  }
  strTime(e){this.state.s_lastlinktimemin = e.target.value;}
  endTime(e){this.state.s_lastlinktimemax = e.target.value;}
  checkForm(){
    if(this.state.s_lastlinktimemin !== '' && this.state.s_lastlinktimemax == ''){
        Alert.to("时间区间必须完整");
        return false;
    }
    if(this.state.s_lastlinktimemin == '' && this.state.s_lastlinktimemax !== ''){
        Alert.to("时间区间必须完整");
        return false;
    }
    if(this.state.s_lastlinktimemin > this.state.s_lastlinktimemax){
        Alert.to("跟进开始时间不能大于结束时间");
        return false;
    }
    let dd = new Date();
    let y = dd.getFullYear(); 
    let m = dd.getMonth()+1;
    let d = dd.getDate();
    if(m<10){m='0'+m;}
    if(d<10){d='0'+d;}
    let nowDate = y+"-"+m+"-"+d;
    if(this.state.s_lastlinktimemax > nowDate){
        Alert.to("最后跟进时间不能大于今天");
        return false;
    }
    return true;
  }
  upDatas(){
    if(this.checkForm()){
      //console.log(this.state);
      let json = {}
      const {s_levelsetstatus,s_followstatus,s_follownummin,s_follownummax,sFollowId } = this.state
      json.s_levelsetstatus = s_levelsetstatus.join()
      json.s_followstatus = s_followstatus.join()
      json.s_follownummin = parseInt(s_follownummin)
      json.s_follownummax = parseInt(s_follownummax)
      json.s_followId = sFollowId
      // json.s_expectedbycarnummin = parseInt(this.state.s_expectedbycarnummin);//台数开始
      // json.s_expectedbycarnummax = parseInt(this.state.s_expectedbycarnummax);
      json.s_lastlinktimemin= this.state.s_lastlinktimemin.replace(/-/g,'/');//时间开始
      json.s_lastlinktimemax= this.state.s_lastlinktimemax.replace(/-/g,'/');
      json.s_brandids=this.state.s_brandids.join();//品牌id
      json.s_clueslevel=this.state.s_clueslevel.join();//级别
      json.s_clueresource=this.state.s_clueresource.join();//线索
      json.s_cheliangyongtuid=this.state.s_cheliangyongtuid.join();//用途
      //console.log(json);
      this.closeSold();
      this.props.onChange(json);
    }
  }
  Resets(){
    this.state.s_levelsetstatus=[];//级别状态
    this.state.s_followstatus=[];//跟进状态
    this.state.s_follownummin = -1;//跟进次数
    this.state.s_follownummax = -1;
    // this.state.s_expectedbycarnummin = -1;//台数开始
    // this.state.s_expectedbycarnummax = -1;
    this.state.s_lastlinktimemin= '';//时间开始
    this.state.s_lastlinktimemax= '';
    this.state.s_brandids=[];//品牌id
    this.state.s_clueslevel=[];//级别
    this.state.s_clueresource=[];//线索
    this.state.s_cheliangyongtuid=[];//用途
    this.state.sFollowId = '';
    let Doms = document.getElementById('Folls');
    let Subs = Doms.querySelectorAll('.PPstyle dd');
    try
    {
      for(let i in Subs){
        Subs[i].removeAttribute('class')
      }
    }
    catch (e){}
    let Inputs = Doms.querySelectorAll('.PPstyle input')
    for(let i = 0; i< 4;i++){
      Inputs[i].value = ''
    }
  }
  buildOn(){
    document.querySelectorAll('.FollBtn')[0].removeAttribute('style');
  }
  focusOn(){
    document.querySelectorAll('.FollBtn')[0].setAttribute('style','z-index:-1');
  }
  //onFocus={this.focusOn} onBlur={this.buildOn}
  componentDidMount(){
    let self = this;
    // let SCH = window.screen.height;
    // this.state.SCH = SCH;
    // window.onresize = function(){
    //   let Schs = window.screen.height;
    //   if(Schs < this.state.SCH){
    //     document.querySelectorAll('.FollBtn')[0].setAttribute('style','z-index:-1');
    //   }
    //   if(Schs == this.state.SCH){
    //     document.querySelectorAll('.FollBtn')[0].removeAttribute('style');
    //   }
    // }

    // let DoFolls = document.getElementById('Folls');
    // let Hcss = window.screen.height + 'px';
    // DoFolls.style.height = Hcss;
    let nac = JSON.parse(Tool.localItem('vipLodData')) || {}
      if(nac.usercategory == '2'){
        let json={}
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId
        }else{
            json.sessionid = Tool.SessionId.get()
        }
        json.type = 1
          Tool.get('User/GetSalesList.aspx',json,
                (res) => {
                    if(res.status == 901){
                        alert(res.msg)
                        this.context.router.push({pathname: '/loading'})
                        return false
                    }
                    if ( res.status == 1) {
                        this.setState({
                            YG: res.data.saleslist,
                            isBoos: true
                        })
                    } else {
                        Alert.to(res.msg)
                    }
                },
                (err) => {
                    Alert.to('请求超时，稍后重试。。')
                }
            )
      }



    
    let brandlist = JSON.parse(Tool.localItem('brandlist'));
    let PPDAtas = [];
    for(let i=0;i<brandlist.brandlist.length;i++){
        let item = brandlist.brandlist[i].brandname;
        let strDat = JSON.stringify(PPDAtas);
        let nub = strDat.indexOf(item);
        if(nub === -1){
          let json = {};
          json.brandid = brandlist.brandlist[i].brandid;
          json.brandname = brandlist.brandlist[i].brandname;
          PPDAtas.push(json);
        }
    }
    let carusagelist = JSON.parse(Tool.localItem('carusagelist'));
    let clueresourcelist = JSON.parse(Tool.localItem('clueresourcelist'));
    this.setState({
      PP:PPDAtas,
      YT:carusagelist.carusagelist,
      LY:clueresourcelist.clueresourcelist
    });
  }

  closeSold(){
    document.getElementById('Folls').setAttribute('class','PubSidebar');
  }
  render(){
    let self = this
    let Fes = this.state.key
    const {PP,YT,LY,YG,isBoos} = this.state
      return(
          <aside className="PubSidebar" id="Folls">
              <header>
                  <span>筛选菜单</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <div className="Fnav">


                <dl className="PPstyle">
                  <dt>
                    <p>品牌</p>
                    <i style={{'display':'none'}}>全部</i>
                  </dt>
                  {PP.map(function(e,index){return(
                    <dd key={index} title={e.brandid} onClick={self.PPsd}>{e.brandname}</dd>
                  )})}
                  <dd title="-1" onClick={self.PPsd}>其他</dd>
                </dl>

                <dl className="PPstyle" style={{display: isBoos ? '' : 'none'}} ref="peole">
                  <dt>
                    <p>员工</p>
                  </dt>
                  {YG.map((e,index) =>
                    <dd key={index} className="peodds" title={e.accountid} onClick={self.YGsd}>{e.username}</dd>
                  )}
                </dl>


                <dl className="PPstyle">
                  <dt>
                    <p>客户级别</p>
                  </dt>
                  <dd title="2" onClick={this.JBsd}>A 级</dd>
                  <dd title="3" onClick={this.JBsd}>B 级</dd>
                  <dd title="4" onClick={this.JBsd}>C 级</dd>
                  <dd title="0" onClick={this.JBsd}>未设置</dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>线索来源</p>
                    <i style={{'display':'none'}}>全部</i>
                  </dt>
                  <dd title="101" onClick={self.XSsd}>定向线索</dd>
                  <dd title="102" onClick={self.XSsd}>速抢线索</dd>
                  <dd title="12" onClick={self.XSsd}>店铺分享</dd>
                  {LY.map(function(e,index){return(
                    <dd key={index} title={e.value} onClick={self.XSsd}>{e.key}</dd>
                  )})}
                </dl>


                <dl className="PPstyle">
                  <dt>
                    <p>客户级别状态</p>
                    <i style={{'display':'none'}}>全部</i>
                  </dt>
                  <dd title="1" onClick={self.JBZTsd}>已设置</dd>
                  <dd title="2" onClick={self.JBZTsd}>未设置</dd>
                </dl>

                <dl className="PPstyle">
                  <dt>
                    <p>提醒跟进状态</p>
                  </dt>
                  <dd title="1" onClick={self.GJZTsd}>今天提醒</dd>
                  <dd title="2" onClick={self.GJZTsd}>未开始</dd>
                  <dd title="3" onClick={self.GJZTsd}>已过期</dd>
                </dl>

                <dl className="PPstyle">
                  <dt>
                    <p>已跟进次数</p>
                  </dt>
                  <dd>
                    <input type="number" className="weui_input" placeholder="最低次数" onFocus={this.focusOn} onBlur={this.buildOn} onInput={this.min_follInput}/>
                  </dd>
                  <dd>
                    <input type="number" className="weui_input" placeholder="最高次数" onFocus={this.focusOn} onBlur={this.buildOn} onInput={this.max_follInput}/>
                  </dd>
                </dl>
                
                
                <dl className="PPstyle">
                  <dt>
                    <p>车辆用途</p>
                    <i style={{'display':'none'}}>全部</i>
                  </dt>
                  {YT.map(function(e,index){return(
                    <dd key={index} title={e.value} onClick={self.YTsd}>{e.key}</dd>
                  )})}
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>最后跟进时间</p>
                  </dt>
                  <dd className="Ftimes">
                    <input type="date" className="weui_input" onChange={this.strTime}/>
                  </dd>
                  <dd className="Ftimes right">
                    <input type="date" className="weui_input" onChange={this.endTime}/>
                  </dd>
                  <dd className="Ftimes FtimeT">开始时间</dd>
                  <dd className="Ftimes right FtimeT">结束时间</dd>
                </dl>
              </div>
            <ul className="FollBtn">
              <li onClick={this.Resets}>重置</li>
              <li onClick={this.upDatas}>确定</li>
            </ul>
          </aside>
      )
  }
}

export default Sidebar 


// <dl className="PPstyle">
//                   <dt>
//                     <p>购买台数</p>
//                   </dt>
//                   <dd>
//                     <input type="number" className="weui_input" placeholder="最低台数" onFocus={this.focusOn} onBlur={this.buildOn} onInput={this.min_expeInput}/>
//                   </dd>
//                   <dd>
//                     <input type="number" className="weui_input" placeholder="最高台数" onFocus={this.focusOn} onBlur={this.buildOn} onInput={this.max_expeInput}/>
//                   </dd>
//                 </dl>
