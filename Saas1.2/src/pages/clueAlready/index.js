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
                                <MediaBoxTitle>标题一2564</MediaBoxTitle>
                                <MediaBoxDescription>
                                    由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>3分钟前</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta>湖南</MediaBoxInfoMeta>
                                    <MediaBoxInfoMeta extra>长沙</MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
};
