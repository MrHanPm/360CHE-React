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
            L:[]
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
    this.setState({
    });
  }
  componentWillReceiveProps(nextProps) {
    let clueresourcelist = JSON.parse(Tool.localItem('clueresourcelist'));
    // let clueresourcelist =[
      // {"key":"电话咨询","value":"2","isdropdownshow":1},
      // {"key":"到店咨询","value":"3","isdropdownshow":1},
      // {"key":"活动推广","value":"4","isdropdownshow":1},
      // {"key":"他人介绍","value":"5","isdropdownshow":1},
      // {"key":"上门拜访","value":"6","isdropdownshow":1}];
    this.setState({
      L:clueresourcelist.clueresourcelist
    });
    if(typeof(nextProps.Datas) == 'number'){
      this.setState({
        visible: true
      });
    }
  }
  closeSold(){this.setState({visible:false});}
  render(){
    let self = this;
    let Fes = this.state.key;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>线索来源</span>
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
          </aside>
      )
  }
}

export default Sidebar 
