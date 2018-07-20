


import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input} from 'reactstrap';

import proflieData from './tool/ProfileData'

class ProflieUser extends Component {
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
            <div className="animated fadeIn">
                <Row>
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


                                <Col  md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Tài khoản</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label  >{user.user_id}</label>
                                    </InputGroup>
                                </Col>


                            </Row>

                            <Row >
                                <Col md={"6"} className={"Colabcprofile1"} ><label  className={"lableabc"} >Họ và Tên</label></Col>
                                <Col md={"6"}>
                                    <InputGroup >
                                        <label >{user.full_name}</label>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}>
                                    <label  className={"lableabc"}>Số điện thoại</label>
                                </Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label >{user.phone_number} </label>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col  md={"6"} className={"Colabcprofile1"}>
                                    <label  className={"lableabc"}>Ngày sinh</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{user.birth_date}</label>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Địa chỉ</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <lable>{ user.address } </lable>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Gmail</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{ user.Gmail }</label>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <label  className={"lableabc"}>Nghề nghiệp (job_title_id)</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{ user.job_title_id }</label>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <label  className={"lableabc"}>Bộ phận (job_position_id)</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{user.job_position_id} </label>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <label  className={"lableabc"}>Trạng thái(status)</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{user.status}</label>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <label  className={"lableabc"}>Ngày vào làm</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{user.join_date}</label>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <label className={"lableabc"}>Giới Tính</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <label>{user.gender}</label>
                                    </InputGroup>
                                </Col>
                            </Row>



                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProflieUser;
