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
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
} from 'react-weui'
import './index.less'
import {Tool,Alert} from '../../tool.js'
import {SAASDEV} from '../../config.js'
export default class MsgDemo extends React.Component {
    constructor(){
        super()
        this.state = {
            showR: false,
            showC: false,
            showK: false
        }
        this.Ga = this.Ga.bind(this)
        this.GaCar = this.GaCar.bind(this)
    }
    componentWillMount(){
        let oldData = JSON.parse(localStorage.getItem('vipLodData')) || null
        if(oldData !== null){
            if(oldData.permission.length > 0){
                for(let i=0;i<oldData.permission.length;i++){
                    if(oldData.permission[i].key == 'recharge' && oldData.permission[i].value == '1'){
                        this.setState({showR: true})
                    }
                    if(oldData.permission[i].key == 'cluespage' && oldData.permission[i].value == '1'){
                        this.setState({showC: true})
                    }
                    if(oldData.permission[i].key == 'chuespage' && oldData.permission[i].value == '1'){
                        this.setState({showK: true})
                    }
                }
            }
        }
    }
    componentDidMount(){
        // document.title = '发现';
        // var body = document.getElementsByTagName('body')[0];
        // var iframe = document.createElement("iframe");
        // iframe.style.display="none";
        // iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        // var d = function() {
        //   setTimeout(function() {
        //     iframe.removeEventListener('load', d);
        //     document.body.removeChild(iframe);
        //   }, 0);
        // };
        // iframe.addEventListener('load', d);
        // document.body.appendChild(iframe);
    }
    Ga(){
       Tool.gaTo('点击进入抢线索页面','发现-速抢线索','');
    }
    GaCar(){
       Tool.gaTo('点击车商城入口','发现页','');
    }
    render() {
        let {showR, showC, showK} = this.state
        return (
        <div className="findBodys findBoxs">
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#rob" onClick={this.Ga}>
                                <CellHeader><i className='findIcos knock'></i></CellHeader>
                                <CellBody>
                                    <p>速抢线索</p>
                                </CellBody>
                                <CellFooter>
                                    
                                </CellFooter>
                            </Cell>
                            <Cell href="#share">
                                <CellHeader><i className='findIcos fenx'></i></CellHeader>
                                <CellBody>
                                    <p>分享店铺</p>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
            <Panel style={{display: showC || showR || showK ? '' : 'none'}}>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#myacut" style={{display: showR?'':'none'}}>
                                <CellHeader><i className='findIcos star-icon'></i></CellHeader>
                                <CellBody>
                                    <p>我的账户</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                            <Cell href="#myclues" style={{display: showK?'':'none'}}>
                                <CellHeader><i className='findIcos star-icon'></i></CellHeader>
                                <CellBody>
                                    <p>我的账户</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#account">
                                <CellHeader><i className='findIcos manage'></i></CellHeader>
                                <CellBody>
                                    <p>账号管理</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>

                            <Cell href="#feedback">
                                <CellHeader><i className='findIcos'></i></CellHeader>
                                <CellBody>
                                    <p>意见反馈</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>

            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href={SAASDEV} onClick={this.GaCar}>
                                <CellHeader><i className='findIcos buys-icon'></i></CellHeader>
                                <CellBody>
                                    <p style={{color: '#DA242A'}}> &nbsp;&nbsp;车商城</p>
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        </Cells>
                    </MediaBox>
                </PanelBody>
            </Panel>
        </div>
        );
    }
};
