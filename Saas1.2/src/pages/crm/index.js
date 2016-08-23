"use strict";

import React from 'react';
import Imgse from './crm.png';
import './index.less';
export default class MsgDemo extends React.Component {

    state = {

    };

    render() {
        return (
            <div className="crmBox">
                <img src={Imgse}/>
            </div>
        );
    }
};
