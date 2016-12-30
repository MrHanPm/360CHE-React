"use strict";

import React from 'react';
import {Tool,Alert} from '../../tool.js';
import {LoadAd} from '../../component/more.js';
import ShowAlert from '../../component/Alert.js'
class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            DATA:''
        }
    }
    upDATA(){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        Tool.get('PublicClues/RobCLuesDescription.aspx',json,
            (res) => {
                if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }
                this.setState({DATA:res.msg})
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    componentWillMount(){
        this.upDATA();
    }
    componentDidMount(){

    }
    render() {
        const {DATA} = this.state;
        let footerS = null;
        if(DATA.length===0){
            footerS = <LoadAd DATA={DATA.length>0?false:true}/>
        }
        return (
            <div className="contMesBox robMsgPd">
                {footerS}
                <p className="robMsgTxt">{DATA}</p> 
                
                <ShowAlert />
            </div>
        );
    }
};

export default Clues
