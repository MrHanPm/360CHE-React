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
            productid:'',
            productname:'',
            L:[]
          }
      this.closeSold = this.closeSold.bind(this)
      this.upDatas = this.upDatas.bind(this)
      this.CLXB = this.CLXB.bind(this)
  }

  upDatas(e){
    let citylistData = [];
      let Ad = {
        'productid':e.target.title,
        'productname':e.target.innerHTML
      };
      this.setState({
        productid:e.target.title,
        productname:e.target.innerHTML,
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
    let productlist = JSON.parse(Tool.localItem('productlist'));
    let subidLB = nextProps.subcategoryid;
    let subidPP = nextProps.brandid;
    let subid = nextProps.seriesid;
    // let productlist =[
      // {"seriesextendid":333,"cateid":2,"subcategoryid":60,"brandid":155,"seriesid":1038,"seriesname":"财运300"}];
    let DAtas = [];
    for(let i=0;i<productlist.productlist.length;i++){
        if(productlist.productlist[i].seriesid == subid && productlist.productlist[i].subcategoryid == subidLB && productlist.productlist[i].brandid == subidPP){
          DAtas.push(productlist.productlist[i]);
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
  closeSold(){this.setState({visible:false}, () => this.props.onClose())}
  render(){
    let self = this;
    let Fes = this.state.productname;
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"}  onClick={this.CLXB}>
              <header>
                  <span>选择车型</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav CXlist">
                {this.state.L.map(function(e,indexs){
                  return(
                    <li key={indexs} className={e.productname == Fes ? "active" :''}>
                      <span className="hangP" title={e.productid} onClick={self.upDatas}>
                        {e.productname}
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
