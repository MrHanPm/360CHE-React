"use strict";

import React from 'react';
import {Button, Msg} from 'react-weui';
import ShowAlert from '../../component/Alert.js'
import {Tool,Alert} from '../../tool.js';
import './loading.less';
class MsgDemo extends React.Component {
    state = {
    }
    componentWillMount(){

    }
    componentDidMount() {
        this.context.router.push({pathname: '/inquire'});
    }
    render() {
        return (
            <div className="jump-cover" id="jump_cover">
                <div className="loading visible">
                    <span className="loading-ring"> </span>
                </div>
                <ShowAlert />
            </div>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo
