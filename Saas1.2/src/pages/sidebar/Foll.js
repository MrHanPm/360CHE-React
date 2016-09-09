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
    [].forEach.call(document.querySelectorAll('.PubSidebar'), function (el){  
      el.addEventListener('touchend', function(e) {
        var x = e.changedTouches[0].pageX;
        if( x < 68 ){
            self.closeSold();
        }
      }, false);
    });
    let brandlist = JSON.parse(Tool.localItem('brandlist'));
    let DAtas = [];
    for(let i=0;i<brandlist.brandlist.length;i++){
        let item = brandlist.brandlist[i].brandname;
        let strDat = JSON.stringify(DAtas);
        let nub = strDat.indexOf(item);
        if(nub === -1){
          let json = {};
          json.brandid = brandlist.brandlist[i].brandid;
          json.brandname = brandlist.brandlist[i].brandname;
          DAtas.push(json);
        }
    }

    console.log(DAtas);
    this.setState({
      PP:DAtas
    });
    // if(typeof(nextProps.Datas) == 'number'){
    //   this.setState({
    //     visible: true
    //   });
    // }
  }

  closeSold(){
    document.getElementById('Folls').setAttribute('class','PubSidebar');
  }
  render(){
    let self = this;
    let Fes = this.state.key;
    const {PP} = this.state;
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
                </dl>

              </div>
          </aside>
      )
  }
}

export default Sidebar 
