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
            values:'',
            key:'',
            addday:'',
            adddayname:'',
            L:[],
            R:[]
          }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
      this.goDatas = this.goDatas.bind(this);
  }

  upDatas(e){
    //let Ad = {'provincesn':e.target.title,'provincename':e.target.innerHTML};
    //console.log(Ad);
    let citylistData = [];
    if(e.target.title == '2' || e.target.title == '3' || e.target.title == '4'){
      for(let i=0;i < 30; i++){
        let gd ={'addday':[i+1],'adddayname':[i+1]+'天后回访'};
        citylistData.push(gd);
      }
      this.setState({
        values:e.target.title,
        key:e.target.innerHTML,
        addday:'',
        adddayname:'',
        R:citylistData,
        active: true,
      });
      citylistData = [];
    }else{
      let Ad = {
        'values':e.target.title,
        'key':e.target.innerHTML,
        'addday':'',
        'adddayname':''
      };
      this.setState({
        values:e.target.title,
        key:e.target.innerHTML,
        addday:'',
        adddayname:'',
        visible:false,
        active: false,
      }, ()=> this.props.onChange(Ad));
    }
  }
  goDatas(e){
    let Ad = {
      'values':this.state.values,
      'key':this.state.key,
      'addday':e.target.title,
      'adddayname':e.target.innerHTML
    };
    this.setState({
      adddayname:e.target.innerHTML,
      addday:e.target.title,
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
    let cluelevellist = JSON.parse(Tool.localItem('cluelevellist'));
    // let cluelevellist =[
    //   {"key":"A  重点","value":"2","isdropdownshow":1},
    //   {"key":"B  一般","value":"3","isdropdownshow":1},
    //   {"key":"C  潜在","value":"4","isdropdownshow":1},
    //   {"key":"O  已成交","value":"5","isdropdownshow":1},
    //   {"key":"F  战败","value":"6","isdropdownshow":1},
    //   {"key":"N  无效线索","value":"7","isdropdownshow":1}
    // ];
    this.setState({
      L:cluelevellist.cluelevellist
    });
    if(typeof(nextProps.Datas) == 'number'){
      this.setState({
        visible: true
      });
    }
  }
  closeSold(){
    this.setState({
      visible:false
    });
  }
  render(){
    let self = this;
    let Fes = this.state.key;
    let Ges = this.state.adddayname;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>客户级别</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {this.state.L.map(function(e,indexs){
                  return(
                    <li key={indexs} 
                    className={e.key == Fes ? "active" :''}
                    >
                      <span 
                      title={e.value}
                      onClick={self.upDatas}
                      >
                        {e.key}
                      </span>
                      <Icon value="success" />
                    </li>
                  )
                })}
              </ul>
              <ul className="Lnav" style={{'display':this.state.active?'block':'none'}}>
                {this.state.R.map(function(el,index){
                  return(
                    <li key={index} 
                    className={el.adddayname == Ges ? "active" :''} 
                    >
                      <span
                      title={el.addday}
                      onClick={self.goDatas}
                      >
                        {el.adddayname}
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
