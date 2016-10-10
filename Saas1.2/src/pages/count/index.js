"use strict";

import React from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    Cells,
    Cell,
    Input,
    Label,
    CellHeader,
    CellBody,
    CellFooter,
    Button,
} from 'react-weui';
import Echarts from 'echarts';
import {Tool,Alert} from '../../tool.js';
import {Views} from '../../component/charts.min.js';
import './index.less';
import MsgBox from './msg.js';

class Clues extends React.Component {
    constructor(){
        super();
        this.state = {
            DATA:[],
            startdate:'',
            enddate:'',
            userid:'',
            Drandoms:'',
            name:'',
            loadShow:true,
            actvs:0,
            briefingData:[
                {title:'',value:0},
                {title:'',value:0},
                {title:'',value:0},
                {title:'',value:0},
            ],
            successData:[],
            addData:[],
            brandData:[{name:'',value:0},],
            salesData:[{name:'',value:0},],
            successRankData:[{name:'',value:0},],
            tryRankData:[{name:'',value:0},],
            addRankData:[{name:'',value:0},],
        }
        this.Sdate = this.Sdate.bind(this);
        this.goSea = this.goSea.bind(this);
        this.goEea = this.goEea.bind(this);
        this.goMessage = this.goMessage.bind(this);
    }
    goSea(e){
        let Stdat = e.target.value;
        let Endat = this.state.enddate;
        this.setState({
            actvs:0,
            startdate: Stdat
        });
        this.upDATA(Stdat,Endat);
    }
    goEea(e){
        let Endat = e.target.value;
        let Stdat = this.state.startdate;
        this.setState({
            actvs:0,
            enddate: Endat
        });
        this.upDATA(Stdat,Endat);
    }
    GetDateStr(AddDayCount) {
        let dd = new Date(); 
        dd.setDate(dd.getDate()+AddDayCount);
        let y = dd.getFullYear(); 
        let m = dd.getMonth()+1;
        let d = dd.getDate();
        if(m<10){m='0'+m;}
        if(d<10){d='0'+d;}
        return y+"-"+m+"-"+d;
    }
    GetDateYes() {
        let dd = new Date();
        let d = dd.getDate();
        if(d < 4){dd.setDate(dd.getMonth()-1);}
        let y = dd.getFullYear(); 
        let m = dd.getMonth()+1;
        if(m<10){m='0'+m;}
        return y+"-"+m+"-"+"01";
    }
    GetDateEes() {
        let dd = new Date();
        let mm,ds,y,m,d;
        d = dd.getDate();
        if(d < 4){
            dd.setDate(dd.getMonth()-1);
            y = dd.getFullYear(); 
            m = dd.getMonth()+1;
            let new_y = y;
            let new_m = m++;
            if(new_m > 12){
                new_m -= 12;
                new_y++;
            }
            let new_dd = new Date(new_y,new_m,1);
            ds = (new Date(new_dd.getTime()-1000*60*60*24)).getDate();
        }else{
            y = dd.getFullYear(); 
            m = dd.getMonth()+1;
            ds = d-1;
        }
        if(m<10){m='0'+m;}
        if(ds<10){ds='0'+ds;}
        return y+"-"+m+"-"+ds;
    }
    Sdate(e){
        let nb = parseInt(e.target.title);
        let Stdat = this.GetDateStr(-nb);
        let Endat = this.GetDateStr(0);
        this.setState({
            actvs:nb,
            startdate: Stdat,
            enddate: Endat
        });
        this.upDATA(Stdat,Endat);
    }
    goMessage(){
        this.setState({
            Drandoms: Math.random()
        });
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
        Tool.get('Statistics/StatisticsList.aspx',json,
            (res) => {
                if(res.status == 1){
                    this.setState({
                        Drandoms:'',
                        loadShow:false,
                        name:res.data.accountTotalList.username,
                        briefingData:res.data.briefingData,
                        successData:res.data.successData,
                        addData:res.data.addData,
                        brandData:res.data.brandData,
                        salesData:res.data.salesData,
                        successRankData:res.data.successRankData,
                        tryRankData:res.data.tryRankData,
                        addRankData:res.data.addRankData,
                    });
                    // 销售简报图形 
                    [].forEach.call(document.querySelector('#pie_charts').children,function(chart,index){
                        var data = res.data.briefingData[index];
                        Echarts.init(chart).setOption(Views.pie(data.title,data.value,index));
                    });

                    // 趋势图形
                    Echarts.init(document.querySelector('#success_chart')).setOption(Views.line(res.data.successData));
                    Echarts.init(document.querySelector('#add_chart')).setOption(Views.line(res.data.addData));

                    // 线索品牌图形
                    Echarts.init(document.querySelector('#brand_chart')).setOption(Views.cicle(res.data.brandData));

                    // 销售漏斗图形
                    Views.funnel(document.querySelector('#sales_chart'),res.data.salesData);

                    // 排行榜图形
                    Echarts.init(document.querySelector('#success_rank_chart')).setOption(Views.bar(res.data.successRankData));
                    Echarts.init(document.querySelector('#try_rank_chart')).setOption(Views.bar(res.data.tryRankData));
                    Echarts.init(document.querySelector('#add_rank_chart')).setOption(Views.bar(res.data.addRankData));
                }else if(res.status == 901){
                    Alert.to(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        )
    }

    componentDidMount(){
        document.title="数据统计";
        let Stdat = this.GetDateYes();
        let Endat = this.GetDateEes();
        this.setState({
            startdate: Stdat,
            enddate: Endat
        });
        this.upDATA(Stdat,Endat);
        
    }
    render() {
        const {loadShow,name,actvs,startdate,enddate} = this.state;
        return (
            <div className="countBox">
                <div style={{'display':loadShow?'none':'block'}} className="BoxC">
                    <h3 className="user-title">{name}</h3>
                    <Cells>
                        <Cell>
                            <CellHeader><Label>开始时间</Label></CellHeader>
                            <CellBody>
                                <Input type="date" value={startdate} onChange={this.goSea} />
                            </CellBody>
                        </Cell>
                        <Cell>
                            <CellHeader><Label>结束时间</Label></CellHeader>
                            <CellBody>
                                <Input type="date" value={enddate} onChange={this.goEea} />
                            </CellBody>
                        </Cell>
                    </Cells>
                    <div className="button_sp_area">
                        <Button type="default" className={actvs == 3?'actv':''} title="3" onClick={this.Sdate}>近3天</Button>
                        <Button type="default" className={actvs == 7?'actv':''} title="7" onClick={this.Sdate}>近7天</Button>
                        <Button type="default" className={actvs == 15?'actv':''} title="15" onClick={this.Sdate}>近15天</Button>
                    </div>


                    <div className="weui_cells_title">
                        <span>销售简报</span>
                        <i onClick={this.goMessage}>详细 ></i>
                    </div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <ul className="charts-list clearfix" id="pie_charts">
                                    <li></li>   
                                    <li></li>   
                                    <li></li>   
                                    <li></li>  
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="weui_cells_title">成交线索量趋势</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart line" id="success_chart"></div>
                            </div>
                        </div>
                    </div>

               
                    <div className="weui_cells_title">新增线索量趋势</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart line" id="add_chart"></div>
                            </div>
                        </div>
                    </div>
                    
     
                    <div className="weui_cells_title">线索品牌统计</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart pie" id="brand_chart"></div>
                            </div>
                        </div>
                    </div>

                    <div className="weui_cells_title">销售漏斗</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart funnel" id="sales_chart"></div>
                            </div>
                        </div>
                    </div>
                    
   
                    <div className="weui_cells_title">成交线索排行榜</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart bar" id="success_rank_chart"></div>
                            </div>
                        </div>
                    </div>


                    <div className="weui_cells_title">抢线索排行榜</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart bar" id="try_rank_chart"></div>
                            </div>
                        </div>
                    </div>


                    <div className="weui_cells_title">新增线索排行榜</div>
                    <div className="weui_cells">
                        <div className="weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">
                                <div className="chart bar" id="add_rank_chart"></div>
                            </div>
                        </div>
                    </div>
                    <div className="weui_cells_title"> </div>
                </div>
                
                <div className="jump-cover" id="jump_cover" style={{'display':loadShow?'block':'none'}}>
                    <div className="loading visible">
                        <span className="loading-ring"> </span>
                    </div>
                </div>
                <MsgBox startdate={this.state.startdate}
                        enddate={this.state.enddate}
                        Drandoms={this.state.Drandoms}
                        onChange={()=> this.setState({Drandoms:''})} />
            </div>
        );
    }
};

export default Clues
