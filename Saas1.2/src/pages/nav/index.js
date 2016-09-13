"use strict";

import React from 'react';


import {
    Tab,
    TabBody,
    TabBar,
    TabBarItem,
    TabBarIcon,
    Dialog,
    TabBarLabel,
    Article
} from 'react-weui';
const {Confirm} = Dialog;
import {Tool,Alert} from '../../tool.js';
import './index.less';
import Clues from '../clue/index.js';
import Crms from '../crm/index.js';
import Finds from '../find/index.js';
import Count from '../count/index.js';

export default class TabBarDemo extends React.Component {
    state={
        tab:0,
        countdown: 0,
        initData:true,
        showConfirm: false,
        confirm: {
            title: '标题标题',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hideConfirm.bind(this)
                },
                {
                    type: 'primary',
                    label: '我知道了',
                    onClick: this.hideConfirm.bind(this)
                }
            ]
        }
    };
    showConfirm() {
        this.setState({showConfirm: true});
    }
    hideConfirm() {
        this.setState({showConfirm: false});
    }
    initData(asid){
        let i = 0;
        let time;
        let h ;
        let urlKey = Tool.localItem('fingerprint');
        Tool.get('Comm/GetAllCategoryDownUrl.aspx',{sessionid:asid,fingerprint:urlKey},
            (res) => {
                if(res.status == 1){
                    this.forAjax(res.listdata);
                }else{
                    Alert.to(res.msg)
                }
            },
            (err) => {
                Alert.to('网络异常，稍后重试。。');
            }
        );

        // let check = [
        //     {
        //         name: 'failurecaselist',
        //         fingerprint:'customtopmenulist-fb9e3f2950a575110588370265efb4d4dd004c3a',
        //         url:'Comm/GetAllCategory.aspx?sessionid=36859_3f4469a95e968d1c37fe8a55cb3d6b938b34178f&categoryname=customtopmenulist',
        //         ischange:1
        //     },{
        //         name: 'carusagelist',
        //         fingerprint:'customtopmenulist-fb9e3f2950a575110588370265efb4d4dd004c3a',
        //         url:'Comm/GetAllCategory.aspx?sessionid=36859_3f4469a95e968d1c37fe8a55cb3d6b938b34178f&categoryname=carusagelist',
        //         ischange:1
        //     }
        // ];

        // this.forAjax(check);

    }




    forAjax(listdata){
        let ajaxUrls = [];
        let ajaxDataName = [];
        let nameKey ='';
        for(let i=0;i<listdata.length;i++){
            if(listdata[i].ischange == 1){
                ajaxUrls.push(listdata[i].url);
                ajaxDataName.push(listdata[i].name);
                nameKey += listdata[i].fingerprint + '_';
            }
        }
        console.log(ajaxUrls);
        this.setState({
            countdown:ajaxUrls.length
        });

        if(ajaxDataName.length > 0){
            this.loadAllData(ajaxDataName,ajaxUrls);
        }else{
            this.showConfirm();
        }
        //Tool.localItem('fingerprint',nameKey);
    }
    loadAllData(names,urls){
        let t;
        if (this.state.countdown == 0) {
            this.setState({countdown:urls.length,initData:false,});
            this.showConfirm();
            clearTimeout(t);
        } else {
            let s = this.state.countdown;
            let k = s-1;
            Tool.get(urls[k],'',
                (res) => {
                    if(res.status === 1){
                        Tool.localItem(names[k],JSON.stringify(res));
                        //console.log(Tool.localItem(names[k]),names[k]);
                    }else{
                        Alert.to(res.msg);
                    }
                },
                (err) => {
                    Alert.to(err.msg);
                }
            )
            s--;
            this.setState({countdown:s});
            t = setTimeout(() => this.loadAllData(names,urls),10);
        }
    }
    componentDidMount(){
        let oldData =[];//测试用具
        //let oldData = JSON.parse(Tool.localItem('vipLodData'));
        //this.initData(oldData.sessionid);

        this.initData('42018_422bdaf3ca2073292e335c8f507812bd5df94093');


        if(oldData.alermsg !== null || oldData.alermsg.length !== 0){
            this.setState({
                confirm:{
                    title: oldData.alermsg,
                    buttons: [
                        {
                            type: 'default',
                            label: '取消',
                            onClick: this.hideConfirm.bind(this)
                        },
                        {
                            type: 'primary',
                            label: '我知道了',
                            onClick: this.hideConfirm.bind(this)
                        }
                    ]
                }
            });
        }

    }
    render() {
        let Pages;
        switch(this.state.tab){
            case 0 :
                Pages = <Clues />;
                break;
            case 1 :
                Pages = <Crms />;
                break;
            case 2 :
                Pages = <Count />;
                break;
            case 3 :
                Pages = <Finds />;
                break;
        }
        return (
            <Tab>
                <TabBody>
                    <Article style={{height:'100%'}}>
                        {Pages}
                    </Article>
                </TabBody>
                <TabBar>
                    <TabBarItem
                        active={this.state.tab == 0}
                        onClick={e=>this.setState({tab:0})}
                        icon={<i className='clue_ico'></i>}
                        label="线索"
                    />
                    <TabBarItem active={this.state.tab == 1} onClick={e=>this.setState({tab:1})}>
                        <TabBarIcon>
                            <i className='crm_ico'></i>
                        </TabBarIcon>
                        <TabBarLabel>CRM</TabBarLabel>
                    </TabBarItem>
                    <TabBarItem
                        active={this.state.tab == 2}
                        onClick={e=>this.setState({tab:2})}
                        icon={<i className='count_ico'></i>}
                        label="统计"
                    />
                    <TabBarItem
                        active={this.state.tab == 3}
                        onClick={e=>this.setState({tab:3})}
                        icon={<i className='find_ico'></i>}
                        label="发现"
                    />
                </TabBar>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
                <div className="initUrlKey" style={{'display':this.state.initData?'block':'none'}}>初始数据加载中…</div>
            </Tab>
        );
    }
};
