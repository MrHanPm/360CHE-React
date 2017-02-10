import React from 'react'
import {Icon} from 'react-weui'
import {Tool,Alert} from '../../tool.js'
import './sidebar.less'

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

  componentWillMount () {
    let json={}
    if(typeof(Tool.SessionId) == 'string'){
        json.sessionid = Tool.SessionId
    }else{
        json.sessionid = Tool.SessionId.get()
    }
    json.categoryname = 'allsubcategorylist'
    Tool.get('Comm/GetAllCategory.aspx',json,
      (res) => {
        if (res.status == 1) {
          this.setState({
            L: res.allsubcategorylist
          })
        } else if(res.status == 901){
            alert(res.msg);
            this.context.router.push({pathname: '/loading'})
        } else{
            Alert.to(res.msg)
        }
      },
      (err) => {
        Alert.to('请求超时，稍后重试。。')
      }
    )
  }

  upDatas(e){
    let citylistData = []
      let Ad = {
        'values':e.target.title,
        'key':e.target.innerHTML
      };
      this.setState({
        values:e.target.title,
        key:e.target.innerHTML,
        visible:false
      }, ()=> this.props.onChange(Ad))
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
    if(typeof(nextProps.Datas) == 'number'){
      this.setState({
        visible: true
      })
    }
  }
  closeSold(){this.setState({visible:false}, () => this.props.onClose())}
  render(){
    let self = this
    let Fes = this.state.key
      return(
          <aside className={this.state.visible ? "PubSidebar visible":"PubSidebar"} onClick={this.CLXB}>
              <header>
                  <span>车辆类别</span>
                  <span className="closeBtn" onClick={this.closeSold}></span>
              </header>
              <ul className="Fnav">
                <li>
                  <span title="" onClick={self.upDatas}>
                    所有类别
                  </span>
                </li>
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
