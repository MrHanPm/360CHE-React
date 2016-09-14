"use strict";

import React from 'react';
import {Icon} from 'react-weui';
import {Tool,Alert} from '../../tool.js';
import './sidebar.less';

class Sidebar extends React.Component{
  constructor(props) {
      super(props);
          
          this.state ={
            visible:false,
            active:false,
            brandid:'',
            brandname:'',
            L:[]
          }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
  }

  upDatas(e){
    let citylistData = [];
      let Ad = {
        'brandid':e.target.title,
        'brandname':e.target.innerHTML
      };
      this.setState({
        brandid:e.target.title,
        brandname:e.target.innerHTML,
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
    this.setState({
    });
  }
  componentWillReceiveProps(nextProps) {
    let brandlist = JSON.parse(Tool.localItem('brandlist'));
    let subid = nextProps.subcategoryid;
    // let brandlist =[
      // {"cateid":0,"subcategoryid":60,"subcategoryname":"皮卡","brandextendid":100,"brandid":31,"brandname":"北京牌","firstnameletter":"B"},
      // {"cateid":0,"subcategoryid":60,"subcategoryname":"皮卡","brandextendid":98,"brandid":155,"brandname":"广汽吉奥","firstnameletter":"G"},
      // {"cateid":0,"subcategoryid":93,"subcategoryname":"微面","brandextendid":200,"brandid":155,"brandname":"广汽吉奥","firstnameletter":"G"},
      // {"cateid":0,"subcategoryid":64,"subcategoryname":"载货车","brandextendid":995,"brandid":155,"brandname":"广汽吉奥","firstnameletter":"G"},
      // {"cateid":0,"subcategoryid":66,"subcategoryname":"牵引车","brandextendid":4,"brandid":3,"brandname":"雷诺","firstnameletter":"L"},
      // {"cateid":0,"subcategoryid":63,"subcategoryname":"自卸车","brandextendid":5,"brandid":3,"brandname":"雷诺","firstnameletter":"L"}];
    let DAtas = [];
    for(let i=0;i<brandlist.brandlist.length;i++){
        if(brandlist.brandlist[i].subcategoryid == subid){
          DAtas.push(brandlist.brandlist[i]);
        }
    }
    this.setState({
      L:DAtas
    });
    if(typeof(nextProps.Drandoms) == 'number'){
      this.setState({
        visible: true
      });
    }
  }
  closeSold(){this.setState({visible:false});}
  render(){
    let self = this;
    let Fes = this.state.brandname;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>选择品牌</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {this.state.L.map(function(e,indexs){
                  return(
                    <li key={indexs} 
                    className={e.brandname == Fes ? "active" :''}
                    >
                      <span 
                      title={e.brandid}
                      onClick={self.upDatas}
                      >
                        {e.brandname}
                      </span>
                      <Icon value="success" />
                    </li>
                  )
                })}
              </ul>
          </aside>
      )
  }
}

export default Sidebar 
