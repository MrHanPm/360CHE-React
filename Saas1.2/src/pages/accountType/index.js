import React from 'react'
import {Button,
    Toast,
    TextArea,
    ButtonArea,
    Form,
    FormCell,
    CellHeader,
    Label,
    Input,
    Cells,
    Cell,
    CellFooter,
    Dialog,
    CellBody,
    pre
} from 'react-weui'
const { Confirm } = Dialog
import Page from '../../component/page'
import {Tool,Alert} from '../../tool.js'
import './index.less'

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            accountsType:""
        }
    }
    componentWillMount(){ 
        // render之前执行的操作
        let sessionid
        let _this = this
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId
        }else{
            sessionid = Tool.SessionId.get()
        }
        Tool.get('/User/GetAccountDetail.aspx',{'sessionid':sessionid},
            (res) => {
                if(res.status){
                    _this.setState({
                        accountsType:res.data.saasusertypeDescription,               
                    })
                }
            },
            (err) => {
                Alert.to('加油包信息加载失败')            
            }
        )

    }

    componentWillUnmount(){

    }
    render() {
        return (
            <Page className="accountType">
                <p dangerouslySetInnerHTML={{__html: this.state.accountsType}}></p>
            </Page>
        )
    }
}

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo 
