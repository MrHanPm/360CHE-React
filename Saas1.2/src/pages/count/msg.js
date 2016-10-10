"use strict";

import React from 'react';
import {Tool,Alert} from '../../tool.js';

class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            visible:false,
            DATA:[],
        }
        this.closD = this.closD.bind(this);
    }
    upDATA(Stdat,Endat){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.startdate = Stdat.replace(/-/g,'/');
        json.enddate = Endat.replace(/-/g,'/');
        Tool.get('Statistics/DateList.aspx',json,
            (res) => {
                if(res.status === 1){
                    this.setState({
                        DATA:res.data.detaillist
                    });
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }
    closD(){

        this.setState({
            visible: false
        },()=> this.props.onChange());
    }
    componentDidMount(){
        document.title="线索详细数据";
    }
    componentWillReceiveProps(nextProps) {
        if(typeof(nextProps.Drandoms) == 'number'){
            this.upDATA(nextProps.startdate,nextProps.enddate);
            this.setState({
                visible: true
            });
        }
    }
    render() {
        const {visible,DATA} = this.state;
        return (
            <div className="contMesBox" style={{'display':visible?'block':'none'}}>
                <div className="closD" onClick={this.closD}>关闭</div>
                <div className="tables">
                    <ul className="titles">
                        <li className="dates">日期</li>
                        <li className="adds">新增</li>
                        <li className="oks">成交</li>
                        <li className="nos">战败</li>
                        <li className="dels">无效</li>
                    </ul>
                    {DATA.map(function(e,index){
                        return(
                        <ul key={index}>
                            <li className="dates">{e.datetime}</li>
                            <li className="adds">{e.newcluestotal}</li>
                            <li className="oks">{e.finshcluestotal}</li>
                            <li className="nos">{e.failcluestotal}</li>
                            <li className="dels">{e.invalidcluestotal}</li>
                        </ul>
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default Clues
