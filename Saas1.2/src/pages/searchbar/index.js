"use strict";

import React from 'react';
import Page from '../../component/page';

import {
    SearchBar,
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
} from 'react-weui';
import './index.less';
import {Tool,Alert} from '../../tool.js';
export default class SearchBarDemo extends React.Component {
    state={
        searchText: '',
        results: [],
        DATA:[]
    };

    handleChange(text){
        let regHZ=/^[\u2E80-\u9FFF]+$/;
        let regNB=/^[0-9]+$/;
        let newDB=[];
        if(text.length > 0){
            if(regHZ.test(text)){
                newDB = this.state.DATA.filter(function(item){
                    return item.customname.indexOf(text) !== -1;
                });
            }
            if(regNB.test(text)){
                newDB = this.state.DATA.filter(function(item){
                    return item.customphone.indexOf(text) !== -1;
                });
            }
            //console.log(newDB);
            if(newDB.length > 5) newDB = newDB.slice(0,5);
        }
        this.setState({
            results:newDB,
            searchText:text,
        });
    }
    componentDidMount() {
        document.title="搜索联系人";
        let SearchData = JSON.parse(Tool.localItem('SearchData'));
        if(SearchData == null){
            SearchData = [];
        }
        //console.log(SearchData);
        this.setState({DATA:SearchData});
    }
    render() {
        return (
            <Page className="SearBoxs">
                <SearchBar onChange={this.handleChange.bind(this)} />

                <Panel access style={{display: this.state.searchText ? null: 'none', marginTop: 0}}>
                    <PanelBody>
                        {
                            this.state.results.length > 0 ?
                                this.state.results.map((item,i)=>{
                                    return (
                                        <MediaBox key={i} type="appmsg" href={'#detailTel?id='+item.customid}>
                                            <MediaBoxBody>
                                                <MediaBoxTitle>{item.customname}</MediaBoxTitle>
                                                <MediaBoxDescription>
                                                   <span className="phns">{item.customphone}</span>
                                                   <span>{item.lastlinktime.substring(0,4) < '2000'?'近期无联系':item.lastlinktime}</span>
                                                </MediaBoxDescription>
                                            </MediaBoxBody>
                                        </MediaBox>
                                    )
                                })
                                : <MediaBox>抱歉！没搜到联系人～</MediaBox>
                        }
                    </PanelBody>
                </Panel>
                <dl className="SearWell" style={{display: this.state.searchText ? 'none': null}}>
                    <dt>这里可以搜索</dt>
                    <dd>联系人</dd>
                    <dd className="pon">手机号</dd>
                </dl>
            </Page>
        );
    }
};
