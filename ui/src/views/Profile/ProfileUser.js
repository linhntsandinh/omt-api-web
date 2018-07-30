


import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input, Label, Table} from 'reactstrap';

import proflieData from './tool/ProfileData'

class ProflieUser extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                id:'',
                user_id:'',
                full_name:'',
                phone_number:'',
                birth_date:'',
                address:'',
                departmenti_id:'',
                job_title_id:'',
                job_position_id:'',
                status:'',
                join_date:'',
                gender:'',
                job_position:'',
                job_title:'',

                created_at:'',
                updated_at:'',
                created_by:'',
                updated_by:''
            };
    }



    componentDidMount() {
        const ul = "/profile/info/"+this.props.match.params.id;
        console.log("componentDidMoun011t " + ul)
        fetch(ul, {
            method: 'GET',
        }).then((response) =>
            response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));
               // console.log("repo ", responseJson.profile.id)

                if (responseJson) {
                    const profile = {
                        id: responseJson.profile.id,
                        full_name: responseJson.profile.full_name,
                        phone_number: responseJson.profile.phone_number,
                        birth_date: responseJson.profile.birth_date,
                        address: responseJson.profile.address,
                        departmenti_id: responseJson.profile.departmenti_id,
                        job_title_id: responseJson.profile.job_title_id,
                        job_position_id: responseJson.profile.job_position_id,
                        status: responseJson.profile.status,
                        join_date: responseJson.profile.join_date,
                        gender: responseJson.profile.gender,
                        job_position: responseJson.job_position.title,
                        job_title: responseJson.job_title.title,
                        created_at: responseJson.profile.created_at,
                        updated_at: responseJson.profile.updated_at,
                        created_by: responseJson.profile.created_by,
                        updated_by: responseJson.profile.updated_by

                    };
                    //this.setState({data: JSON.stringify(responseJson)})
                    // console.log(profile.id + " demo " + profile.name)
                    // console.log("ket " + Object.entries(profile)[1])
                    this.setState(profile)
                }
            })


    }
    render() {

        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)
      
        const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
       // const pr = this.state.data ? Object.entries(this.state.data) :  [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
        console.log("1 "+this.state.id);
        if (this.state.data){
            console.log("2 " + this.state.id + "  "+ this.state.name )

        }


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
                                        <p  >{this.state.id}</p>
                                    </InputGroup>
                                </Col>


                            </Row>

                            <Row >
                                <Col md={"6"} className={"Colabcprofile1"} ><label  className={"lableabc"} >Họ và Tên</label></Col>
                                <Col md={"6"}>
                                    <InputGroup >
                                        <p >{this.state.full_name}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Số điện thoại</p>
                                </Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p >{this.state.phone_number} </p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col  md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Ngày sinh</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.birth_date}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Địa chỉ</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{ this.state.address } </p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>departmenti_id</label></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{ this.state.departmenti_id }</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Chức vụ(job title)</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{ this.state.job_title }</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Chức vụ (job position)</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.job_position} </p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Trạng thái(status)</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.status}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p  className={"lableabc"}>Ngày vào làm</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.join_date}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Giới Tính</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.gender}</p>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Created_at</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.created_at}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Update_at</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.updated_at}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Created_by</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.created_by}</p>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                <p className={"lableabc"}>Updated_by</p></Col>
                                <Col md={"6"}>
                                    <InputGroup>
                                        <p>{this.state.updated_by}</p>
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
