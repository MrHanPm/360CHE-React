"use strict";

import React from 'react';
import {Icon} from 'react-weui';
import {Tool,Alert} from '../../tool.js';
import './foll.less';

class Sidebar extends React.Component{
  constructor(props) {
      super(props);
          
          this.state ={
            visible:false,
            active:false,
            values:'',
            key:'',
            s_levelsetstatus:'',//级别状态
            s_followstatus:'',//跟进状态
            s_follownummin:'',//跟进次数
            s_follownummax:'',
            s_expectedbycarnummin:'',//台数开始
            s_expectedbycarnummax:'',
            s_lastlinktimemin:'',//时间开始
            s_lastlinktimemax:'',
            PP:[],
            LY:[],
            YT:[]
          }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
  }

  upDatas(e){
    let citylistData = [];
      let Ad = {
        'values':e.target.title,
        'key':e.target.innerHTML
      };
      this.setState({
        values:e.target.title,
        key:e.target.innerHTML,
        visible:false
      }, ()=> this.props.onChange(Ad));
  }
  componentDidMount(){
    let self = this;
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
    let self = this;
    let Fes = this.state.key;
    const {PP,YT,LY} = this.state;
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
                    <i>全部</i>
                  </dt>
                  {PP.map(function(e,index){return(
                    <dd key={index} title={e.brandid}>{e.brandname}</dd>
                  )})}
                  <dd title="-1">其他</dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>客户级别状态</p>
                  </dt>
                  <dd title="1">已设置</dd>
                  <dd title="2">未设置</dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>提醒跟进状态</p>
                  </dt>
                  <dd title="1">今天提醒</dd>
                  <dd title="2">未开始</dd>
                  <dd title="3">已过期</dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>客户级别</p>
                  </dt>
                  <dd title="2" className="activ">A 级</dd>
                  <dd title="3">B 级</dd>
                  <dd title="4">C 级</dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>已跟进次数</p>
                  </dt>
                  <dd>
                    <input type="number" placeholder="最低次数"/>
                  </dd>
                  <dd>
                    <input type="number" placeholder="最高次数"/>
                  </dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>线索来源</p>
                    <i>全部</i>
                  </dt>
                  {LY.map(function(e,index){return(
                    <dd key={index} title={e.value}>{e.key}</dd>
                  )})}
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>购买台数</p>
                  </dt>
                  <dd>
                    <input type="number" placeholder="最低台数"/>
                  </dd>
                  <dd>
                    <input type="number" placeholder="最高台数"/>
                  </dd>
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>车辆用途</p>
                    <i>全部</i>
                  </dt>
                  {YT.map(function(e,index){return(
                    <dd key={index} title={e.value}>{e.key}</dd>
                  )})}
                </dl>
                <dl className="PPstyle">
                  <dt>
                    <p>最后跟进时间</p>
                  </dt>
                  <dd className="Ftimes">
                    <input type="date" />
                  </dd>
                  <dd className="FtimeT">开始到结束</dd>
                  <dd className="Ftimes">
                    <input type="date" />
                  </dd>
                </dl>
              </div>
            <ul className="FollBtn">
              <li>重置</li>
              <li>确定</li>
            </ul>
          </aside>
      )
  }
}

export default Sidebar 
