"use strict";

import React from 'react';
import {Button,
Toast,
TextArea,
ButtonArea,
Form,
FormCell,
CellHeader,
Label,
Input,
Cells,
Cell,
CellFooter,
Dialog,
CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './index.less';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import ShowAlert from '../../component/Alert.js';

class Inquire extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type:'',
            data:{},
            error:false,
        };
    }
    componentWillMount(){
        let infoData = Tool.localItem('infoData');
        let InquireDatas = Tool.localItem('InquireDatas')
        if(infoData){
            this.setState({
                data:JSON.parse(infoData).data.AnnouncementDetail || JSON.parse(infoData).data.chassismodel || JSON.parse(infoData).data.FuelOilDetail
            })
        }else{
            this.setState({
                error:true
            })
        }

        if(InquireDatas){
            this.setState({
                type:JSON.parse(InquireDatas).type
            })
        }else{
            this.setState({
                error:true
            })
        }
    }
    componentDidMount() {
        if(this.state.error){
            Alert.to('加载错误...');
            this.context.router.push({pathname: '/inquireResult'})
        }

        var img = document.querySelector('img');
        img.addEventListener('error', function(){
            img.src='http://static.360che.com/gonggao/default360.jpg';
        })
    }

    render() {
        let data = this.state.data;
        let _this = this;
        console.log(this.state.data)
        if(this.state.type != 2){
            return (
                <div className="inquireResultInfo">
                    <div className="product-img">
                        <figure>
                            <img src={data.picture[0] || 'http://static.360che.com/gonggao/default360.jpg'}/>
                        </figure>
                    </div>
                    <header className="title">
                        车型
                    </header>
                    <FormCell>
                        <CellHeader>
                            公告标题
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.title}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            公告型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.model}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            公告批次
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.pcsn}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            品牌
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.brand}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            车型
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.protype}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            额定质量
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.edweight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            总质量
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.totalweight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            整备质量
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.zbweight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            燃料种类
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.fueltype}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            排放依据标准
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.pfstd}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            轴数
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.zhoushu}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            轴距
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.zhouju}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            轴荷
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.zhouhe}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            弹簧片数
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.thpnum}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            轮胎数
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.tyrenum}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            轮胎规格
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.tyretype}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            接近离去角
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.liqujiao}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            前悬后悬
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.qianhouxuan}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            前轮距
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.qianlunju}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            后轮距
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.houlunju}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            识别代号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.sbsn}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            整车长
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.trucklength}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            整车宽
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.truckwidth}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            整车高
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.truckheight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            货厢长
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.boxlength}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            货厢宽
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.boxwidth}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            货厢高
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.boxheight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            最高车速
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.maxrate}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            额定载客
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.peoplenum}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            驾驶室准乘人数
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.drivernum}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            转向形式
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.turntype}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            准拖挂车总质量
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.gcweight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            载质量利用系数
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.useratio}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            半挂车鞍座最大承载质量
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.maxczweight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            企业名称
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.factory}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            企业地址
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.address}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            电话号码
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.telephone}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            传真号码
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.fax}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            邮政编码
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.postcode}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            底盘1
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.chassis1}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            底盘2
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.chassis2}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            底盘3
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.chassis3}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            底盘4
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.chassis4}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            描述
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.remarks}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            发动机型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html:data.engine.length ? data.engine[0] :''}}>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            发动机生产企业
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.engine.length ? data.engine[1] :''}}>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            发动机商标
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.engine.length ? data.engine[2] :''}}>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            发动机排量
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.engine.length ? data.engine[3] :''}}>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            发动机功率
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.engine.length ? data.engine[4] :''}}>
                        </CellBody>
                    </FormCell>
                    <ShowAlert/>
                </div>
            )
        }else{
            console.log(data.engine,'data.engine')
            return(
                <div className="inquireResultInfo">
                    <div className="product-img">
                        <figure>
                            <img src={data.picture[0] || 'http://static.360che.com/gonggao/default360.jpg'}/>
                        </figure>
                    </div>
                    <header className="title">
                        基本信息
                    </header>
                    <FormCell>
                        <CellHeader>
                            企业名称
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.company}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            产品名称
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.proname}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            产品型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.promodel}}>

                        </CellBody>
                    </FormCell>
                    <header className="title">
                        整车参数
                    </header>
                    <FormCell>
                        <CellHeader>
                           外形尺寸(长×宽×高) mm
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.shapesize}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            货厢栏板内尺寸(长×宽×高) mm或容积m3
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.innersize}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            整备质量KG
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.zbweight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            总质量 kg
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.weight}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            驱动形式
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.drivermodel}}>

                        </CellBody>
                    </FormCell>
                    <header className="title">
                        底盘配置与技术参数
                    </header>
                    <FormCell>
                        <CellHeader>
                            底盘生产企业
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.pancompany}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            底盘型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.panmodel}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                           发动机生产企业
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.enginecompany}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            发动机型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.enginemodel}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            变速器型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.bsqmodel}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            主减速器对比(驱动桥速比)
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.jsqrate}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            轮胎规格型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.tyremodel}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            综合燃料消耗量L/100km
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.avecost}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            60km/h空载等速燃料消耗量L/100km
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.emptycost}}>

                        </CellBody>
                    </FormCell>
                    <header className="title">
                        燃料消耗参数表
                    </header>
                    <FormCell>
                        <CellHeader>
                            产品型号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.promodel}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            执行标准
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.prostd}}>

                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            燃油消耗量达标车型编号
                        </CellHeader>
                        <CellBody dangerouslySetInnerHTML={{__html: data.prosn}}>

                        </CellBody>
                    </FormCell>
                    <div className="car-speed">
                        <header className="title">
                            满载等速 燃料消耗量
                        </header>
                        <FormCell>
                            <CellHeader>
                                车速,km/h
                            </CellHeader>
                            <CellBody>
                                档位
                            </CellBody>
                            <CellFooter>
                                油耗，L/100km
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader dangerouslySetInnerHTML={{__html: data.fullcost[0][0]}}>
                                
                            </CellHeader>
                            <CellBody dangerouslySetInnerHTML={{__html: data.fullcost[1][0]}}>

                            </CellBody>
                            <CellFooter dangerouslySetInnerHTML={{__html: data.fullcost[2][0]}}>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader dangerouslySetInnerHTML={{__html: data.fullcost[0][1]}}>
                                
                            </CellHeader>
                            <CellBody dangerouslySetInnerHTML={{__html: data.fullcost[1][1]}}>

                            </CellBody>
                            <CellFooter dangerouslySetInnerHTML={{__html: data.fullcost[2][1]}}>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader dangerouslySetInnerHTML={{__html: data.fullcost[0][2]}}>
                                
                            </CellHeader>
                            <CellBody dangerouslySetInnerHTML={{__html: data.fullcost[1][2]}}>

                            </CellBody>
                            <CellFooter dangerouslySetInnerHTML={{__html: data.fullcost[2][2]}}>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader dangerouslySetInnerHTML={{__html: data.fullcost[0][3]}}>
                                
                            </CellHeader>
                            <CellBody dangerouslySetInnerHTML={{__html: data.fullcost[1][3]}}>

                            </CellBody>
                            <CellFooter dangerouslySetInnerHTML={{__html: data.fullcost[2][3]}}>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader dangerouslySetInnerHTML={{__html: data.fullcost[0][4]}}>
                                
                            </CellHeader>
                            <CellBody dangerouslySetInnerHTML={{__html: data.fullcost[1][4]}}>

                            </CellBody>
                            <CellFooter dangerouslySetInnerHTML={{__html: data.fullcost[2][4]}}>
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader dangerouslySetInnerHTML={{__html: data.fullcost[0][5]}}>
                                
                            </CellHeader>
                            <CellBody dangerouslySetInnerHTML={{__html: data.fullcost[1][5]}}>

                            </CellBody>
                            <CellFooter dangerouslySetInnerHTML={{__html: data.fullcost[2][5]}}>
                            </CellFooter>
                        </FormCell>
                    </div>
                </div>
            )
        }

    }
};

Inquire.contextTypes = {
router: React.PropTypes.object.isRequired
}

export default Inquire
