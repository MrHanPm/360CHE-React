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
    Button,
} from 'react-weui';


import './index.less';

export default class Clues extends React.Component {
    state={

    };

    render() {
        return (
            <div>
                <ul className="clueNav">
                    <li className="active">待处理</li>
                    <li>跟进中</li>
                    <li>已成交</li>
                    <li>已战败</li>
                </ul>
                <section className="clueBody">
                    <Panel>
                        <PanelBody>
                            <MediaBox type="text">
                                <MediaBoxHeader>
                                    <Button type="primary" plain>立即抢</Button>
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>标题一</MediaBoxTitle>
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
                </section>
                <span className="butX"></span>
                <div className="clueBtnX">
                    <span></span>
                    <span className="butX_add"></span>
                </div>
                <div className="bgBox"></div>
            </div>
        );
    }
};
