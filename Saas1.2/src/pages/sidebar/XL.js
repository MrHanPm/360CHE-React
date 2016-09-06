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
            seriesid:'',
            seriesname:'',
            L:[]
          }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
  }

  upDatas(e){
    let citylistData = [];
      let Ad = {
        'seriesid':e.target.title,
        'seriesname':e.target.innerHTML
      };
      this.setState({
        seriesid:e.target.title,
        seriesname:e.target.innerHTML,
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
    let serieslist = JSON.parse(Tool.localItem('serieslist'));
    let subid = nextProps.brandid;
    // let serieslist =[
      // {"seriesextendid":333,"cateid":2,"subcategoryid":60,"brandid":155,"seriesid":1038,"seriesname":"财运300"}];
    let DAtas = [];
    for(let i=0;i<serieslist.serieslist.length;i++){
        if(serieslist.serieslist[i].brandid == subid){
          DAtas.push(serieslist.serieslist[i]);
        }
    }
    this.setState({
      L:DAtas
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
    let Fes = this.state.seriesname;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}>
              <header>
                  <span>选择系列</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                {this.state.L.map(function(e,indexs){
                  return(
                    <li key={indexs} 
                    className={e.seriesname == Fes ? "active" :''}
                    >
                      <span 
                      title={e.seriesid}
                      onClick={self.upDatas}
                      >
                        {e.seriesname}
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
