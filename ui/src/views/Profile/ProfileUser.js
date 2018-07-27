


import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input, Label, Table} from 'reactstrap';

import proflieData from './tool/ProfileData'

class ProflieUser extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                data: new Array()
            };
    }



    componentDidMount() {
        console.log("componentDidMount ")
        fetch("/profile/info/1", {
            method: 'GET',
        }).then((response) => response.json())
            .then((responseJson) => {

                console.log(JSON.stringify(responseJson));
                this.setState({data: JSON.stringify(responseJson)})
            })


    }
    render() {

        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)
        console.log()
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
                                        <p  >{user.user_id}</p>
                                    </InputGroup>
                                </Col>


                            </Row>

                            <Row >
                                <Col md={"6"} className={"Colabcprofile1"} ><label  className={"lableabc"} >Họ và Tên</label></Col>
                                <Col md={"6"}>
                                    <InputGroup >
                                        <p >{user.full_name}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Số điện thoại</p>
                                </Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p >{user.phone_number} </p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col  md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Ngày sinh</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.birth_date}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Địa chỉ</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{ user.address } </p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Gmail</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{ user.Gmail }</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Nghề nghiệp (job_title_id)</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{ user.job_title_id }</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Bộ phận (job_position_id)</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.job_position_id} </p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Trạng thái(status)</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.status}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Ngày vào làm</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.join_date}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Giới Tính</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.gender}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Created_at</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.created_at}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Update_at</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.updated_at}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Created_by</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.created_by}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Updated_by</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{user.updated_by}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={5}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i></strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                    {

                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProflieUser;
