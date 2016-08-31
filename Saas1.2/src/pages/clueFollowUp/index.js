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
    ActionSheet,
    CellFooter,
    Button,
} from 'react-weui';

import './index.less';

export default class Clues extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <div className="clueBody">
                <Panel>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxHeader>
                                <CellFooter/>
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>标题7878一</MediaBoxTitle>
                                <MediaBoxDescription>
                                    由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>最后跟进:2016-08-30</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>成交价格:12万元</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
};
