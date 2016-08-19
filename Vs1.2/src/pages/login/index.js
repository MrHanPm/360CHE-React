"use strict";

import React from 'react';
import { ButtonArea,
    Button,
    Cells,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    Uploader
} from 'react-weui';
import Page from '../../component/page';
import iconSrc from './images/icon.png';
import vcodeSrc from './images/vcode.jpg';
import avatarSrc from './images/icon.png';

export default class CellDemo extends React.Component {
    state = {
        demoFiles : [
            {
                url: avatarSrc,
                onClick: e=>alert('事件测试')
            },
            {
                url: avatarSrc
            },
            {
                url: avatarSrc
            },
            {
                url: avatarSrc,
                error: true
            },
            {
                url: avatarSrc,
                status: '50%'
            }
        ]
    };

    render() {
        return (
            <Page className="cell" title="手机验证">

                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入手机号"/>
                        </CellBody>
                    </FormCell>

                    <FormCell vcode={true}>
                        <CellHeader>
                            <Label>图形码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入图形码"/>
                        </CellBody>
                        <CellFooter>
                            <Icon value="warn" />
                            <img src={vcodeSrc} />
                        </CellFooter>
                    </FormCell>

                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入验证码"/>
                        </CellBody>
                        <CellFooter>
                            <Button size="small">获取验证码</Button>
                        </CellFooter>
                    </FormCell>
                </Form>

                <ButtonArea>
                    <Button>确定</Button>
                </ButtonArea>
                <p className="FootTxt">验证手机号码，使用升级版营销助手<br/>手机号码仅用于登录和保护账号安全</p>
            </Page>
        );
    }
};

/*
<FormCell vcode={true} warn={true}>
<CellFooter>
    <Icon value="warn" />
    <img src={vcodeSrc} />
</CellFooter>
<Button type="default">取消</Button>
*/
