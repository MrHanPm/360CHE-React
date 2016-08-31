"use strict";

import React from 'react';
import './page.less';
import ShowAlert from './Alert.js'

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        clearTimeout(t)
    }
    render() {
        const {title, subTitle, spacing, className, children} = this.props;

        return (
            <section className={`page ${className}`}>
                <div className="hd">
                    <h1 className="title">{title}</h1>
                    <p className="sub_title">{subTitle}</p>
                </div>
                <div className={`bd ${spacing ? 'spacing' : ''}`}>
                    {children}
                </div>
                <ShowAlert />
            </section>
        );
    }
};
