


import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input, Button} from 'reactstrap';

import proflieData from './tool/ProfileData'
import Gender from './tool/Gender'
import MyCaledar from "./tool/Caledar";
class Proflie extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                show: false
            };
    }




    render() {

        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)

        const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

        return (
            <div className="animated fadeIn"  id={"idrowprofileadmin123"}>
                <Row id={"idrowprofileadmin"} className="text-lg-center">
                    <Col lg={6}>
                        <Card>

                            <CardHeader>
                                <Row>
                                    <Col md="7">
                                        <i className="fa fa-align-justify"></i> Thông tin
                                    </Col>
                                    <Col md="5">


                                    </Col>
                                </Row>

                            </CardHeader>



                                        <Row >


                                            <Col  md={"6"} className={"Colabcprofile"}><label  className={"lableabc"}>Tài khoản</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input  placeholder={user.user_id} />
                                                </InputGroup>
                                            </Col>


                                        </Row>

                                        <Row >
                                            <Col md={"6"} className={"Colabcprofile"} ><label  className={"lableabc"} >Họ và Tên</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup >
                                                    <Input  placeholder={user.full_name}/>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={"6"} className={"Colabcprofile"}>
                                            <label  className={"lableabc"}>Số điện thoại</label>
                                            </Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input placeholder={user.phone_number} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col  md={"6"} className={"Colabcprofile"}>
                                                <label  className={"lableabc"}>Ngày sinh</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                   <MyCaledar/>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={"6"} className={"Colabcprofile"}><label  className={"lableabc"}>Địa chỉ</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input placeholder={ user.address }/>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={"6"} className={"Colabcprofile"}><label  className={"lableabc"}>Gmail</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input placeholder={ user.Gmail }/>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row> <Col md={"6"} className={"Colabcprofile"}>
                                            <label  className={"lableabc"}>Nghề nghiệp (job_title_id)</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input placeholder={ user.job_title_id } />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row> <Col md={"6"} className={"Colabcprofile"}>
                                            <label  className={"lableabc"}>Bộ phận (job_position_id)</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input placeholder={user.job_position_id} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row> <Col md={"6"} className={"Colabcprofile"}>
                                            <label  className={"lableabc"}>Trạng thái(status)</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Input placeholder={user.status} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row> <Col md={"6"} className={"Colabcprofile"}>
                                            <label  className={"lableabc"}>Ngày vào làm</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <MyCaledar/>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row> <Col md={"6"} className={"Colabcprofile"}>
                                            <label className={"lableabc"}>Giới Tính</label></Col>
                                            <Col md={"6"}>
                                                <InputGroup>
                                                    <Gender />
                                                </InputGroup>
                                            </Col>
                                        </Row>

                            <CardHeader>
                                <Row>
                                    <Col>

                                    </Col>
                                <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                    <Button block color="success">Chỉnh sửa</Button>
                                </Col>

                                </Row>
                            </CardHeader>

                        </Card>
                    </Col>
                </Row>
                <Row>

                </Row>

            </div>
        )
    }
}

export default Proflie;
