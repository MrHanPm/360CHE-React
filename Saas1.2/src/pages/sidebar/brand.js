"use strict";

import React from 'react';




class Sidebar extends Component{
    constructor(props) {
          super(props);
          this.Datas = this.props.Datas;
          this.NewDatas = this.props.NewDatas
          this.ABC ={
            'A':['A','B','C','F','C','F'],
            'B':[['A','B','B','B','B','B','B','B'],['C','D','E','D','E','D','E','D','E','D','E','D','E'],['sdsd','sdd','122',,'sdd','122',,'sdd','122',,'sdd','122','455'],['sdsd','sdd','122',,'sdd','122',,'sdd','122',,'sdd','122','455'],['C','D','E','D','E','D','E','D','E','D','E','D','E'],['C','D','E','D','E','D','E','D','E','D','E','D','E']]
          }
    }

   render(){
    let Datas = this.ABC
       return(
          <div>
           <aside className="sidebar brand" id="sidebar">
              <header>
                  <span>品牌筛选</span>
                  <span className="close" id="sidebar_close"  onClick={this.props.HidSidebar}></span>
             </header>
             <div className="sidebar-container">
                {Datas.A.map(function(e,indexs){
                    return(
                      <div className="sidebar-module" key={indexs}>
                         <header id={e}>{e}</header>
                         <ul>
                         {
                            Datas.B[indexs].map(function(ele,index){
                                return(
                                    <li key={index}>
                                       <a href="javascript:;" alt={ele}>
                                           <figure><img src="http://imga.360che.com/imgc/m/c/b/201605230115411fdc15f07033.png" alt="奥驰汽车" /></figure>
                                           <span>{ele}</span>
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
                    {Datas.A.map(function(e,indexs){
                      return(
                       <li key={indexs}>{e}</li>
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
