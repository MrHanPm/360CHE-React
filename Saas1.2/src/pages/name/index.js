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


export default class CellDemo extends React.Component {
    state = {

    };

    render() {
        return (
            <Page className="name" title="销售信息">

                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入真实姓名"/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Cells access>
                    <Cell href="javascript:;">
                        <CellBody>
                            选择您的销售品牌
                        </CellBody>
                        <CellFooter></CellFooter>
                    </Cell>
                </Cells>

                <ButtonArea>
                    <Button>进入营销助手</Button>
                </ButtonArea>
                <p className="FootTxt">如遇登录问题，欢迎致电 <i>4006-136-188</i><br/>致电时间：周一至周日09:00~18:00</p>
            </Page>
        );
    }
};
