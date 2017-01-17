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
            provincesn:'',
            provincename:'',
            citysn:'',
            cityname:'',
            L:[],
            R:[]
          }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
      this.goDatas = this.goDatas.bind(this);
      this.goSFA = this.goSFA.bind(this);
  }

  upDatas(e){
    //let Ad = {'provincesn':e.target.title,'provincename':e.target.innerHTML};
    //console.log(Ad);
    let citylist = JSON.parse(Tool.localItem('citylist'));
    let citylistData = [];
    for(let i=0;i < citylist.citylist.length; i++){
      if(citylist.citylist[i].provincesn == e.target.title){
          citylistData.push(citylist.citylist[i]);
      }
    }
    this.setState({
      provincesn:e.target.title,
      provincename:e.target.innerHTML,
      citysn:'',
      cityname:'',
      R:citylistData,
      active: true,
    });
    citylistData = [];
  }
  goDatas(e){
    let Ad = {
      'provincesn':this.state.provincesn,
      'provincename':this.state.provincename,
      'citysn':e.target.title,
      'cityname':e.target.innerHTML
    };
    // this.setState({
    //   visible:false,
    //   cityname:e.target.innerHTML,
    //   citysn:e.target.title
    // });
    this.setState({
      cityname:e.target.innerHTML,
      citysn:e.target.title,
      visible:false
    }, ()=> this.props.onChange(Ad));
  }
  goSFA(){
    let Ad = {
      'provincesn':'',
      'provincename':'',
      'citysn':'',
      'cityname':''
    };
    this.setState({
      provincesn:'',
      provincename:'',
      cityname:'',
      citysn:'',
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
    let provincelist = JSON.parse(Tool.localItem('provincelist'));
    this.setState({
      L:provincelist.provincelist
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
    let Fes = this.state.provincename;
    let Ges = self.state.cityname;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>省份城市</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                <li><span title="" onClick={self.goSFA}>全部省份</span></li>
                {this.state.L.map(function(e,indexs){
                  return(
                    <li key={indexs} className={e.provincename == Fes ? "active" :''}>
                      <span title={e.provincesn} onClick={self.upDatas}>
                        {e.provincename}
                      </span>
                      <Icon value="success" />
                    </li>
                  )
                })}
              </ul>
              <ul className="Lnav" style={{'display':this.state.active?'block':'none'}}>
                <li><span title="" onClick={self.goDatas}>全部城市</span></li>
                {this.state.R.map(function(el,index){
                  return(
                    <li key={index} className={el.cityname == Ges ? "active" :''}>
                      <span key={index} title={el.citysn} onClick={self.goDatas}>
                        {el.cityname}
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
