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
      this.closeSold = this.closeSold.bind(this)
      this.upDatas = this.upDatas.bind(this)
      this.CLXB = this.CLXB.bind(this)
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

  }
  CLXB (e) {
    let x = e.pageX
    if( x < 68 ){
      this.closeSold()
    }
  }
  componentWillReceiveProps(nextProps) {
    let isloanlist = JSON.parse(Tool.localItem('isloanlist'));
    // let carusagelist =[
      // {"key":"渣土运输","value":"1","isdropdownshow":1},
      // {"key":"快递","value":"2","isdropdownshow":1},
      // {"key":"蔬菜水果","value":"3","isdropdownshow":1},
      // {"key":"日用百货","value":"4","isdropdownshow":1},
      // {"key":"集装箱","value":"5","isdropdownshow":1},
      // {"key":"其它","value":"6","isdropdownshow":1}];
    this.setState({
      L:isloanlist.isloanlist
    });
    if(typeof(nextProps.Datas) == 'number'){
      this.setState({
        visible: true
      });
    }
  }
  closeSold(){this.setState({visible:false}, () => this.props.onClose())}
  render(){
    let self = this;
    let Fes = this.state.key;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"} onClick={this.CLXB}>
              <header>
                  <span>是否贷款</span>
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
