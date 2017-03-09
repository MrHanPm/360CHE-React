import React from 'react'
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

export default class MsgDemo extends React.Component {
    constructor(){
        super()
        this.state = {
            showR: false,
            showC: false
        }
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
                }
            }
        }
    }
    render() {
        let {showR, showC} = this.state
        return (
        <div className="findBodys findBoxs">
            <Panel>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
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
            <Panel style={{display: showC || showR ? '' : 'none'}}>
                <PanelBody>
                    <MediaBox type="small_appmsg">
                        <Cells access>
                            <Cell href="#clueBag" style={{display: showC?'':'none'}}>
                                <CellHeader><i className='findIcos clue-bag'></i></CellHeader>
                                <CellBody>
                                    <p>线索加油包</p>
                                </CellBody>
                                <CellFooter />
                            </Cell>
                            <Cell href="#myacut" style={{display: showR?'':'none'}}>
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
                            <Cell href="https://didi.360che.com/saas/CC_CAR/index.html">
                                <CellHeader><i className='findIcos buys-icon'></i></CellHeader>
                                <CellBody>
                                    <p style={{color: '#DA242A'}}>车商城</p>
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
