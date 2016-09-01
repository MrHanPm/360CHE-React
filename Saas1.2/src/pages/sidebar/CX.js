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
            DATE:{
              'L':['A','B','C','F','O','P'],
              'R':[0,1,2,3,4,5,6]
            }
          }
          this.closeSold = this.closeSold.bind(this);
    }
  componentDidMount(){
    this.setState({

    });
  }
  closeSold(){
    this.setState({
      visible:false
    });
  }
  render(){
      let Datas = this.state.DATE;
      let acts = Tool.localItem('Pactive');
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>品牌筛选</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {Datas.L.map(function(e,indexs){
                  return(
                    <li key={indexs} className={e == acts ? "active" :''}
                        >
                      {e}
                    </li>
                  )
                })}
              </ul>
              <ul className="Lnav" style={{'display':this.state.active?'block':'none'}}>
                {Datas.R.map(function(e,indexs){
                  return(
                    <li key={indexs} className={e == acts ? "active" :''}>
                      {e}<Icon value="success" />
                    </li>
                  )
                })}
              </ul>
          </aside>
      )
  }
}

export default Sidebar 
