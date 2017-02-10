import React,{Component} from 'react'

class LoadAd extends Component{
  render(){
    return(
        <div className="loading visible" style={{'marginTop':this.props.DATA?'50%':'0'}}>
            <span className="loading-ring"> </span>
        </div>
    )
  }
}
// <div className="spinner">
//   <div className="bounce1"></div>
//   <div className="bounce2"></div>
//   <div className="bounce3"></div>
// </div>
class NoMor extends Component{
  render(){
    return(
        <p className="noMor">～我是有底线嘀～</p>
    )
  }
}
class Reccount extends Component{
  render(){
    return(
        <p className="noMor">～共{this.props.DATA}位联系人～</p>
    )
  }
}

class NoDataS extends Component{
  render(){
    return(
        <div className="noDataBox"></div>
    )
  }
}
export default {LoadAd,NoMor,NoDataS,Reccount}
