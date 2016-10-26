"use strict";

import React from 'react';
import {Tool,Alert} from '../../tool.js';

class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            DATA:[],
        }
    }
    upDATA(Stdat,Endat,ids){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        json.startdate = Stdat.replace(/-/g,'/');
        json.enddate = Endat.replace(/-/g,'/');
        json.userid = ids;
        Tool.get('Statistics/DateList.aspx',json,
            (res) => {
                if(res.status === 1){
                    this.setState({
                        DATA:res.data.detaillist
                    });
                }else if(res.status == 901){
                        alert(res.msg);
                        this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    componentWillMount(){
        let json = JSON.parse(Tool.localItem('CountMsg'));
        this.upDATA(json.startdate,json.enddate,json.id);
    }
    componentDidMount(){
        document.title="线索详细数据";
        var body = document.getElementsByTagName('body')[0];
        var iframe = document.createElement("iframe");
        iframe.style.display="none";
        iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        var d = function() {
          setTimeout(function() {
            iframe.removeEventListener('load', d);
            document.body.removeChild(iframe);
          }, 0);
        };
        iframe.addEventListener('load', d);
        document.body.appendChild(iframe);
    }
    render() {
        const {DATA} = this.state;
        return (
            <div className="contMesBox">
                <div className="tables">
                    <ul className="titles">
                        <li className="dates">日期</li>
                        <li className="adds">新增</li>
                        <li className="adds">成交</li>
                        <li className="adds">战败</li>
                        <li className="adds">无效</li>
                    </ul>
                    {DATA.map(function(e,index){
                        return(
                        <ul key={index}>
                            <li className="dates">{e.datetime}</li>
                            <li className="adds">{e.newcluestotal}</li>
                            <li className="adds">{e.finshcluestotal}</li>
                            <li className="adds">{e.failcluestotal}</li>
                            <li className="adds">{e.invalidcluestotal}</li>
                        </ul>
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default Clues
