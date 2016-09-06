"use strict";

import React from 'react';
import {Tool,Alert} from '../../tool.js';
import './brand.less';


class Sidebar extends React.Component{
    constructor(props) {
      super(props);
      this.state ={
        visible:false,
        active:false,
        brandid:'',
        L:[],
        R:[]
      }
      this.closeSold = this.closeSold.bind(this);
      this.upDatas = this.upDatas.bind(this);
      this.Liclick = this.Liclick.bind(this);
    }
    componentDidMount(){
        let allbrandlist = JSON.parse(Tool.localItem('allbrandlist'));
        var AZ = [];
        var BZ = [];
        for(let i=0;i < allbrandlist.allbrandlist.length; i++){
          let item = allbrandlist.allbrandlist[i].firstnameletter;
          let her = AZ.indexOf(item);
          if ( her === -1) {
            AZ.push(item);
          }
          for(let j=0; j< AZ.length; j++){
            BZ[j] = [];
          }
        }
        for(let i=0;i < allbrandlist.allbrandlist.length; i++){
          let json = {
                        'brandid':allbrandlist.allbrandlist[i].brandid,
                        'brandname':allbrandlist.allbrandlist[i].brandname
                      };
          let item = allbrandlist.allbrandlist[i].firstnameletter;
          let her = AZ.indexOf(item);
          if(her !== -1 ){
            BZ[her].push(json);
          }
        }
        //console.log(AZ,BZ);
        this.setState({
          L:BZ,
          R:AZ
        });
        let self = this;
        [].forEach.call(document.querySelectorAll('#sidebar'), function (el) {  
          el.addEventListener('touchend', function(e) {
            var x = e.changedTouches[0].pageX;
            if( x < 68 ){
                self.closeSold();
            }
          }, false);
        });
        
        //touchstart
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchstart', function(e) {
            this.setAttribute('class','nav');
          }, false);
        });
        //touchmove
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchmove', function(e) {
                let y = e.changedTouches[0].pageY - this.getBoundingClientRect().top;
                let Nums = this.querySelectorAll('li').length;
                let ContHeight = this.getBoundingClientRect().height;
                let itemHt = ContHeight/Nums;
                let target;
                if(y > 0 && y < ContHeight){
                    for(let i=0; i < Nums; i++){
                        let hts = itemHt * (i+1);
                        let oldhts = hts - itemHt;
                        if(i == 0 && y < itemHt){
                           target = this.children[0];
                        }else if(oldhts == itemHt && y < hts){
                            target = this.children[1];
                        }else if(y > oldhts && y < hts){
                            target = this.children[i];
                        }
                    }
                    //console.log(oldhts,y,target);
                }else{
                    target = this.children[Nums-1];
                }
                self.showScale(target.innerHTML);
          }, false);
        });
        //touchend
        [].forEach.call(document.querySelectorAll('#index_nav'), function (el) {  
          el.addEventListener('touchend', function(e) {
            this.removeAttribute('class');
          }, false);
        });
    }
    Liclick(e){
      this.showScale(e.target.innerHTML);
    }
    showScale(val){
        var toastTimer;
        toastTimer && clearTimeout(toastTimer);
        this.UlScroll(val);
        var Scale = document.getElementById('index_selected');
            Scale.innerHTML = val;
            setTimeout(function(){
                Scale.setAttribute('style','display:block;opacity:1');
            },10);
            toastTimer = setTimeout(function(){
                Scale.removeAttribute('style');
            },500);
    }
    UlScroll(el){
        var goUl = document.getElementById(el);
        var Uls = document.querySelector('.sidebar-container');
        var ulHeight = goUl.parentNode.offsetTop;
        Uls.scrollTop = ulHeight - 44;
    }
    upDatas(e){
      //console.log(e.target,e.target.title);
      let tit = e.target.title;
        this.setState({
          brandid:e.target.title,
          visible:false
        }, ()=> this.props.onChange(tit));
    }
    closeSold(){this.setState({visible:false});}
    componentWillReceiveProps(nextProps) {
      if(typeof(nextProps.Datas) == 'number'){
        this.setState({
          visible: true
        });
      }
    }
    render(){
       const {visible,active,L,R} = this.state;
       let self = this;
       return(
          <div>
           <aside className={visible?"sidebar visible":"sidebar"} id="sidebar">
              <header>
                  <span>品牌筛选</span>
                  <span className="close" id="sidebar_close"  onClick={this.closeSold}></span>
             </header>
             <div className="sidebar-container">
                {R.map(function(e,indexs){
                    return(
                      <div className="sidebar-module" key={indexs}>
                         <header id={e}>{e}</header>
                         <ul>
                            {L[indexs].map(function(ele,index){
                                return(
                                    <li key={index}>
                                       <a href="javascript:;" title={ele.brandid} onClick={self.upDatas}>
                                           {ele.brandname}
                                       </a>
                                    </li>
                                  )
                              })
                            }
                         </ul>
                      </div>
                    )
                  })
                }
                <aside className="scale" id="index_selected">A</aside>
                <ul id="index_nav">
                  {R.map(function(e,indexs){
                      return(
                       <li key={indexs} onClick={self.Liclick}>{e}</li>
                     )})
                  }
                </ul>
            </div>
          </aside>
        </div>
        )
    }
}

export default Sidebar 
