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
import Brand from '../sidebar/brand';//品牌
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './index.less';
import {LoadAd,NoMor,NoDataS} from '../../component/more.js';
import ShowAlert from '../../component/Alert.js';

class Inquire extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            topBar:0,
            sidebarShow:false,
            sidebarSelected:false,
            selectedContent:'请选择',
            inquireDatas:{},
            submitData:true,
            loading:false
        };

        this.selectTopBar = this.selectTopBar.bind(this);
        this.ClickSidebar = this.ClickSidebar.bind(this);
        this.seletdBrand = this.seletdBrand.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    componentWillMount(){ 
        // render之前执行的操作
    }
    componentDidMount() {
        // render之后执行的操作
    }

    // 头部tab切换
    selectTopBar(e){
        this.setState({
            topBar:e.target.dataset.index,
            sidebarSelected:false,
            selectedContent:'请选择',
            inquireDatas:{}
        })
    }

    ClickSidebar(e){  //选择排放标准
        var target = e.target;
        if(target.tagName == 'ASIDE'){
            this.setState({
                 sidebarShow:false,
            })
        }else if(target.tagName == 'LI'){
            this.setState({
                sidebarSelected:target.dataset.index,
                sidebarShow:false,
                selectedContent:target.innerHTML
            })
            if(this.state.topBar == 0){
                let o = this.state.inquireDatas;
                o.pfstd = target.innerHTML;
                this.setState({
                    inquireDatas:o 
                })
            }else{
                let o = this.state.inquireDatas;
                o.pfstd = target.innerHTML;
                this.setState({
                    inquireDatas:o 
                })
            }
        }
    }
    seletdBrand(e){  //显示隐藏侧边栏
        this.setState({
             sidebarShow:true,
        })
    }

    handleInput(e){
        let target = e.target;
        let o = this.state.inquireDatas;
        o[target.id] = target.value;
        this.setState({
            inquireDatas:o 
        })
        console.log(this.state.inquireDatas)
    }
    submitData(){
        if(this.state.submitData){

            this.setState({
                submitData:false,
                loading :true,

            })

            let ajaxurl = '';

            if(this.state.topBar == 0){
                console.log(this.state.inquireDatas)
                ajaxurl = 'tools/gonggao/Announcement/AnnouncementList.aspx';
                
            }else if(this.state.topBar == 1){
                console.log(this.state.inquireDatas)
                ajaxurl = 'tools/gonggao/Chassis/ChassisList.aspx';
            }else{
                console.log(this.state.inquireDatas)
                ajaxurl = 'tools/gonggao/FuelOil/FuelOilList.aspx';
            }
            // 请求数据
            getData(this,ajaxurl,this.state.inquireDatas)

            function getData(_this,ajaxurl,datas){
                console.log(_this)
                Tool.get(ajaxurl,_this.state.inquireDatas,
                    (res) => {
                        if(res.status == 1){

                            //保存请求的类型、请求的对象、请求的结果
                            let InquireAjax = {
                                type:_this.state.topBar,   
                                data:datas,
                                result:res
                            }
                            Tool.localItem('InquireDatas',JSON.stringify(InquireAjax))

                            //重新筛选时，清空保存的滚动高度
                            Tool.localItem('scrollTop',0)
                            _this.context.router.push({pathname: '/inquireResult'})
                        }else{
                            _this.setState({
                                submitData:true,
                                loading :false,
                            })   
                            Alert.to(res.msg);                         
                        }
                    },
                    (err) => {
                        Alert.to('请求超时，稍后重试。。');

                        _this.setState({
                            submitData:true,
                            loading :false,
                        })
                    }
                )               
            }
        }      
    }

    render() {
        if(!this.state.loading){
            return (
                <div className="inquire">
                    <ul className="clueNav" onClick={this.selectTopBar}>
                        <li data-index="0" className={this.state.topBar == 0 ? "active" : ""}>公告号查询</li>
                        <li data-index="1" className={this.state.topBar == 1 ? "active" : ""}>底盘查询</li>
                        <li data-index="2" className={this.state.topBar == 2 ? "active" : ""}>燃油查询</li>
                    </ul>
                    <Form>
                        <div data-index="0" className={this.state.topBar == 0 ? "active" : ""}>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="protype">整车类型</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="protype" type="text" placeholder="例：洒水车" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="model">整车型号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="model" type="text" placeholder="例：CLW" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dpmdoel">底盘型号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dpmdoel" type="text" placeholder="例：EQ" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="brand">产品商标</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="brand" type="text" placeholder="例：程力维牌" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="factory">企业名称</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="factory" type="text" placeholder="例：程力专用车股份有限公" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dpfactory">底牌厂家</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dpfactory" type="text" placeholder="例：东风汽车股份有限公司" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dpbrand">底牌商标</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dpbrand" type="text" placeholder="例：福田牌" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label>排放标准</Label>
                                </CellHeader>
                                <CellBody>
                                    <div className={this.state.sidebarSelected ? "emission-standard" : "emission-standard not-select"} onClick={this.seletdBrand}>{this.state.selectedContent}</div>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="zhoushu">轴数</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="zhoushu" type="tel" placeholder="例：2" onChange={this.handleInput} />
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="enginemodel">发动机</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="enginemodel" type="text" placeholder="例：YC6L330" onChange={this.handleInput} />
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="tyrenum">轮胎数</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="tyrenum" type="tel" placeholder="例：6" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                        </div>
                        <div data-index="1" className={this.state.topBar == 1 ? "active" : ""}>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dpname">底牌名称</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dpname" type="text" placeholder="例：载货汽车" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dpbrand">底盘商标</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dpbrand" type="text" placeholder="例：东风" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dptpe">底盘类别</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dptpe" type="text" placeholder="例：二类"  onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="dpmodel">底牌型号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="dpmodel" type="text" placeholder="例：EQ" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>  
                            <FormCell>
                                <CellHeader>
                                    <Label>排放标准</Label>
                                </CellHeader>
                                <CellBody>
                                    <div className={this.state.sidebarSelected ? "emission-standard" : "emission-standard not-select"} onClick={this.seletdBrand}>{this.state.selectedContent}</div>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="zhoushu">轴数</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="zhoushu" type="text" placeholder="例：2" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="enginemodel">发动机型号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="enginemodel" type="text" placeholder="例：YC6L330" onChange={this.handleInput} />
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="tyrenum">轮胎数</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="tyrenum" type="text" placeholder="例：6" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell> 
                        </div>
                        <div data-index="2" className={this.state.topBar == 2 ? "active" : ""}>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="promodel">整车型号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="promodel" type="text" placeholder="例：CLW" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="company">企业名称</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="company" type="text" placeholder="例：程力专用车股份有限公司" onChange={this.handleInput}/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label htmlFor="enginemodel">发动机型号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input id="enginemodel" type="text" placeholder="例：ISB" onChange={this.handleInput} />
                                </CellBody>
                            </FormCell>
                        </div>
                    </Form>              
                    <div>
                        <aside className={this.state.sidebarShow ? "sidebar visible" : 'sidebar'} id="sidebar" onClick={this.ClickSidebar}>
                            <div className="sidebar-container">
                                <div className="sidebar-module">
                                    <ul>
                                        <li data-index="0" className={this.state.sidebarSelected === '0' ? 'selected' : ''}>国三</li>
                                        <li data-index="1" className={this.state.sidebarSelected === '1' ? 'selected' : ''}>国四</li>
                                        <li data-index="2" className={this.state.sidebarSelected === '2' ? 'selected' : ''}>国五</li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    </div>
                    <div className="rule">
                        * 请任意输入一个或多个条件查询
                    </div>
                    <ButtonArea>
                        <Button onClick={this.submitData}>查询</Button>
                    </ButtonArea>
                    <ShowAlert />
                </div>
            )
        }else{
            return(
                <div className="inquire load-state">
                    <LoadAd/>
                </div>
            )
        }
    }
};

Inquire.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Inquire 
