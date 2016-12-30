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
            subcategoryid:'',
            subcategoryname:'',
            L:[]
          }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
  }

  upDatas(e){
    let citylistData = [];
      let Ad = {
        'subcategoryid':e.target.title,
        'subcategoryname':e.target.innerHTML
      };
      this.setState({
        subcategoryid:e.target.title,
        subcategoryname:e.target.innerHTML,
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
    let subcategorylist = JSON.parse(Tool.localItem('subcategorylist'));
    // let subcategorylist =[
      // {"cateid":2,"subcategoryid":60,"subcategoryname":"皮卡"},
      // {"cateid":1,"subcategoryid":63,"subcategoryname":"自卸车"},
      // {"cateid":1,"subcategoryid":64,"subcategoryname":"载货车"},
      // {"cateid":1,"subcategoryid":66,"subcategoryname":"牵引车"},
      // {"cateid":6,"subcategoryid":93,"subcategoryname":"微面"}]];
    this.setState({
      L:subcategorylist.subcategorylist
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
    let Fes = this.state.subcategoryname;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>选择类别</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {this.state.L.map(function(e,indexs){
                  return(
                    <li key={indexs} 
                    className={e.subcategoryname == Fes ? "active" :''}
                    >
                      <span 
                      title={e.subcategoryid}
                      onClick={self.upDatas}
                      >
                        {e.subcategoryname}
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
