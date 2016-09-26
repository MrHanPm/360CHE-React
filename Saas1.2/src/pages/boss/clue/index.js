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
import ShowAlert from '../../../component/Alert.js'
import Already from '../clueAlready/index.js';
import Defeat from '../clueDefeat/index.js';
import FollowUp from '../clueFollowUp/index.js';
import Pending from '../cluePending/index.js';

class Clues extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab:0,
            red:false
        }
    }

    componentDidMount(){
        document.title="线索";
    }
    render() {
        let Pages;
        switch(this.state.tab){
            case 0 :
                Pages = <Pending />;
                break;
            case 1 :
                Pages = <FollowUp />;
                break;
            case 2 :
                Pages = <Already />;
                break;
            case 3 :
                Pages = <Defeat />;
                break;
        }
        return (
            <div style={{height:'100%'}}>
                <ul className="clueNav">
                    <li className={this.state.tab == 0 ? 'active':''} onClick={e=>this.setState({tab:0})}>待处理</li>
                    <li className={this.state.tab == 1 ? 'active':''} onClick={e=>this.setState({tab:1})}>跟进中</li>
                    <li className={this.state.tab == 2 ? 'active':''} onClick={e=>this.setState({tab:2})}>已成交</li>
                    <li className={this.state.tab == 3 ? 'active':''} onClick={e=>this.setState({tab:3})}>已战败</li>
                </ul>
                {Pages}
                <ShowAlert />
            </div>
        );
    }
};


Clues.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Clues

