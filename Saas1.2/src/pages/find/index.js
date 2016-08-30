"use strict";

import React from 'react';
import Imgse from './find.png';
import './index.less';
export default class MsgDemo extends React.Component {

    state = {

    };

    render() {
        return (
            <div className="wrapper">
			<div className="saas-contents other">
				<div className="weui_cells weui_cells_access">
				    <a className="weui_cell" href="#/filter">
				        <div className="weui_cell_hd">铃</div>
				        <div className="weui_cell_bd weui_cell_primary">
				            <p>速抢线索</p>
				        </div>
				        <div className="weui_cell_ft">322条线索<em></em></div>
				    </a>
				    <a className="weui_cell" href="#setup">
				        <div className="weui_cell_hd">设</div>
				        <div className="weui_cell_bd weui_cell_primary">
				            <p>账号管理</p>
				        </div>
				        <div className="weui_cell_ft"></div>
				    </a>
				    <a className="weui_cell" href="#feedback">
				        <div className="weui_cell_hd">馈</div>
				        <div className="weui_cell_bd weui_cell_primary">
				            <p>意见反馈</p>
				        </div>
				        <div className="weui_cell_ft"></div>
				    </a>
				</div>	
			</div>
		</div>
        );
    }
};
