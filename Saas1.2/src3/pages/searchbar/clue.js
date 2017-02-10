import React from 'react'
import Page from '../../component/page'

import {
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    CellFooter,
    MediaBoxInfoMeta,
} from 'react-weui'

import './index.less'
import {Tool,Alert} from '../../tool.js'
export default class SearchBarDemo extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor () {
        super();
        this.state={
            searchText: '',
            isNull: false,
            DATA:[]
        }
        this.clearTxt = this.clearTxt.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.goSearch = this.goSearch.bind(this)
        this.RobLine = this.RobLine.bind(this)
    }
    clearTxt () {
        this.setState({
            searchText:'',
            DATA:[],
            isNull: false
        })
        this.refs.search.focus()
    }
    handleChange(e){
        this.setState({
            searchText: e.target.value,
        })
    }
    goSearch () {
        let txt = this.state.searchText.trim()
        if (txt == '') {
            Alert.to('搜索不能为空')
            this.clearTxt()
        } else {
            let json={}
            this.setState({
                DATA: [],
                isNull: false
            })
            if(typeof(Tool.SessionId) == 'string'){
                json.sessionid = Tool.SessionId
            }else{
                json.sessionid = Tool.SessionId.get()
            }
            json.cluesstatus = 1
            json.s_keyword = txt
            Tool.get('Clues/GetCluesList.aspx',json,
                (res) => {
                    if(res.status == 901){
                        alert(res.msg)
                        this.context.router.push({pathname: '/loading'})
                        return false
                    }
                    if ( res.status == 1) {
                        this.setState({
                            DATA: res.listdata,
                            isNull: true
                        })
                    } else {
                        Alert.to(res.msg)
                    }
                },
                (err) => {
                    Alert.to('请求超时，稍后重试。。')
                }
            )
        }
    }
    RobLine(e){
        // let GAs = '无|' + e.target.title + '|无|无|'
        // Tool.gaTo('点击跟进中线索','红/未提醒',GAs)
        // let clusUrl = window.location.hash.replace(/#/g,'')
        // let goUrlclus = clusUrl.split("?")
        // Tool.localItem('clueURl',goUrlclus[0])
        let urlTxt
        let nac = JSON.parse(Tool.localItem('vipLodData'))
        if(nac.usercategory == '1'){
            urlTxt = '/robClue?id=' + e.target.title
        }
        if(nac.usercategory == '2'){
            urlTxt = '/boss/robClue?id=' + e.target.title
        }
        this.context.router.push({
            pathname: urlTxt
        })
    }
    componentDidMount() {
        this.refs.search.focus()
    }
    render() {
        const {searchText, DATA, isNull} = this.state
        let style = {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: '233',
        }
        let self = this
        return (
            <Page className="SearBoxs">
                <div className="weui_search_bar weui_search_focusing" style={style}>
                    <form className="weui_search_outer">
                        <div className="weui_search_inner">
                            <i className="weui_icon_search"></i>
                            <input type="search" className="weui_search_input" placeholder="搜索" value={searchText} ref="search" onChange={this.handleChange} />
                            <a className="weui_icon_clear" onClick={this.clearTxt}></a>
                        </div>
                    </form>
                    <a className="weui_search_cancel" onClick={this.goSearch}>搜索</a>
                </div>
                <div className="clueFollo">
                { DATA.map((e,index) =>
                    <Panel key={index}>
                        <PanelBody>
                            <MediaBox className="Follov" title={e.cluesextendid} onClick={self.RobLine}></MediaBox>
                            <MediaBox type="text">
                                <MediaBoxHeader>
                                    <CellFooter />
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>
                                        {e.realname}
                                        <i className={e.nextvisitday ==0 ? 'reds' : ''}>{e.nextvisitlisttitle}</i>
                                    </MediaBoxTitle>
                                    <MediaBoxDescription>{e.truckname}</MediaBoxDescription>
                                    <MediaBoxInfo>
                                        <MediaBoxInfoMeta style={{display: e.saleprice > 0 ? '' : 'none'}}>{e.saleprice}元</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta>已跟进{e.follownum}次 最后跟进:{e.lastlinktime}</MediaBoxInfoMeta>
                                        <MediaBoxInfoMeta>购买:{e.expectedbycarnum}台</MediaBoxInfoMeta>
                                    </MediaBoxInfo>
                                </MediaBoxBody>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                )}
                <Panel access style={{display: isNull && DATA.length === 0 ? null : 'none'}}>
                    <PanelBody>
                        <MediaBox>抱歉！没搜到联系人～</MediaBox>
                    </PanelBody>
                </Panel>
                <dl className="SearWell" style={{display: isNull ? 'none' : null}}>
                    <dt>可搜索跟进中的</dt>
                    <dd>联系人</dd>
                    <dd className="pon">手机号</dd>
                </dl>
            </div>
            </Page>
        );
    }
};
