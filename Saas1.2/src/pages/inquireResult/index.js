"use strict";

import React from 'react';
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    Dialog,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from 'react-weui';
const { Confirm } = Dialog;
import {Tool,Alert} from '../../tool.js';
import './index.less';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import ShowAlert from '../../component/Alert.js';

class InquireResult extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            total:'',
            type:'',        //请求的类型：0 公告号 、 1 底盘 、 2 燃油
            data:'',        //请求的对象
            resultData:[],  //请求的结果
            isLoadPage:true,//限制每次只能加载一次
            loading:false,
            clickList:true,
            error:false,
        };
        this.getListInfo = this.getListInfo.bind(this);
    }
    componentWillMount(){ 
        // render之前执行的操作
        let resultDate = Tool.localItem('InquireDatas');
        if(resultDate){
            resultDate = JSON.parse(resultDate);
            this.setState({
                type:resultDate.type,
                data:resultDate.data,
                total:resultDate.result.reccount,
                resultData:resultDate.result.data.announcementlist || resultDate.result.data.chassislist || resultDate.result.data.fueloillist
            })
            console.log(resultDate.result.data.announcementlist,'resultDate.result.data.announcementlist')
        }else{
            this.setState({
               error:true, 
            })
        }
    }
    componentDidMount() {
        // render之后执行的操作
        if(this.state.error){
            Alert.to('加载错误...请重新筛选');
        }else{
            this.scrollLoad(this)
            var wrapper = document.querySelector('#wrapper');
            if(wrapper){
                let scrollToping = Tool.localItem('scrollToping');

                if(scrollToping == 0){
                    let scrollDistance = Tool.localItem('scrollTop');
                    if(scrollDistance){
                        wrapper.scrollTop = scrollDistance;
                    }               
                }else{
                    wrapper.scrollTop = scrollToping;                
                }
            }

        }
    }
    scrollLoad(_this){
     
        var wrapper = document.querySelector('#wrapper')
        var result_list = document.getElementById('result_list');
        var loading = document.querySelector('#loading');
        var nowpage = 2;        //分页
        var Datas = _this.state.data;   //请求的对象
        wrapper && wrapper.addEventListener('scroll',function(e){
            Tool.localItem('scrollToping',wrapper.scrollTop)  //存储滚动的高度
            let ajaxUrl = '' //请求地址
            if(result_list.getBoundingClientRect().bottom <= document.documentElement.offsetHeight + 162 && _this.state.isLoadPage){
                Datas.nowpage = nowpage;
                loading.classList.add('visible');

                _this.setState({
                    isLoadPage:false
                })

                let ajaxUrl = ''
                if(_this.state.type == 0){                    
                    ajaxUrl = 'tools/gonggao/Announcement/AnnouncementList.aspx';
                }else if(_this.state.type == 1){
                    ajaxUrl = 'tools/gonggao/Chassis/ChassisList.aspx';
                }else{
                    ajaxUrl = 'tools/gonggao/FuelOil/FuelOilList.aspx';
                }
                getDate(_this,ajaxUrl,Datas)
            }            
        })

        function getDate(_this,ajaxUrl,datas){
            Tool.get(ajaxUrl,Datas,
                (res) => {
                    if(res.status == 1){
                        let scrollData = res.data.announcementlist || res.data.chassislist || res.data.fueloillist;
                        _this.setState({
                            resultData:_this.state.resultData.concat(scrollData)
                        })

                        //存储下拉加载的数据，下拉加载在刷新页面后可以直接读取
                        let resultDate = Tool.localItem('InquireDatas');
                        if(resultDate){
                            resultDate = JSON.parse(resultDate)
                            resultDate.result.data.announcementlist = _this.state.resultData;
                            Tool.localItem('InquireDatas',JSON.stringify(resultDate))
                        }
                        _this.setState({
                            isLoadPage:true
                        })
                        nowpage++;
                        loading.classList.remove('visible');
                    }else if(res.status == 901){
                        Alert.to(res.msg);
                        this.context.router.push({pathname: '/phone'});
                    }
                },
                (err) => {
                    Alert.to('加载错误...');
                    _this.setState({
                        isLoadPage:true
                    })
                    loading.classList.remove('visible');
                }
            )
        }
    }

    //点击进入详情页
    productInfo(id){
        if(this.state.clickList){
            Tool.localItem('scrollTop',Tool.localItem('scrollToping'))  //存储滚动的高度
            this.setState({
                clickList:false,
                loading :true,
                isLoadPage:false
            })
            let ajaxUrl = ''
            if(this.state.type == 0){
                ajaxUrl = 'tools/gonggao/Announcement/AnnouncementDetail.aspx';
            }else if(this.state.type == 1){
                ajaxUrl = 'tools/gonggao/Chassis/ChassisDetail.aspx';
            }else{
                ajaxUrl = 'tools/gonggao/FuelOil/FuelOilDetail.aspx';
            }
            this.getListInfo(ajaxUrl,id)
        }
    }

    getListInfo(ajaxUrl,id){
        let _this = this;
        Tool.get(ajaxUrl,{'Id':id},
            (res) => {
                console.log(res)
                if(res.status == 1){
                    Tool.localItem('infoData',JSON.stringify(res))
                    _this.context.router.push({pathname: '/inquireResultInfo'})
                }else{
                    _this.setState({
                        clickList:true,
                        loading :false,
                    }) 
                   Alert.to(res.msg); 
                }
            },
            (err) => {
                _this.setState({
                    clickList:true,
                    loading :false,
                }) 
                Alert.to('加载错误...');                
            }
        )
    }

    render() {
        let _this = this;
        let ranyou = false;
        if(this.state.type == 2){
            ranyou = true
        }
        if(!this.state.loading){
            return (
                <div className="inquire-result" id="wrapper">
                    <Panel className={this.state.resultData.length ? 'total visible' : 'total'} >
                        <PanelBody>
                            <MediaBox type="small_appmsg">
                                <Cells>
                                    <Cell>
                                        <CellBody>
                                            公获得{this.state.total}条结果
                                        </CellBody>
                                    </Cell>
                                </Cells>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                    <div id="result_list">
                        {
                            this.state.resultData.map(function(ele,index){
                                return(
                                    <Panel key={index} onClick={_this.productInfo.bind(_this,ele.id)}>
                                        <PanelBody>
                                            <MediaBox type="text">
                                                <MediaBoxBody>

                                                    <MediaBoxTitle>
                                                        {ele.title}
                                                    </MediaBoxTitle>
                                                    <Cells>
                                                        <Cell>
                                                            <CellHeader>
                                                                <img data-src="" src={ele.picture} onerror="javascript:this.src='http://static.360che.com/gonggao/default90.jpg'"/>
                                                            </CellHeader>
                                                            <CellBody>
                                                                <p>{ranyou ? '发动机：' : '发动机型号：'}<em>{ranyou ? ele.enginemodel : ele.engine}</em></p>
                                                                <p>{ranyou ? '变速箱：' : '染料类型：'}<em>{ranyou ? ele.bsqmodel : ele.fueltype}</em></p>
                                                                <p>{ranyou ? '驱动形式：' : '排放标准：'}<em>{ranyou ? ele.drivermodel : ele.pfstd}</em></p>
                                                            </CellBody>
                                                            <CellFooter>
                                                                
                                                            </CellFooter>
                                                        </Cell>
                                                    </Cells>
                                                </MediaBoxBody>
                                            </MediaBox>
                                        </PanelBody>
                                    </Panel>
                                )
                            })

                        }
                    </div>
                    <div className="loading" id="loading">
                        <span className="loading-ring"> 
                        </span>
                    </div>
                    <ShowAlert />
                </div>
            );
        }else{
            return(
                <div className="inquire load-state">
                    <LoadAd/>
                </div>
            )
        }
    }
};
InquireResult.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default InquireResult 
