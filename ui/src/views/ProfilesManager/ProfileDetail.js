import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {formEncode} from '../../DataUser'
import {connect} from "react-redux";

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }

    // componentDidMount() {
    //     fetch("https://daivt.000webhostapp.com/get_user.php", {
    //         method: 'POST',
    //         headers: {"Content-type": "application/x-www-form-urlencoded"},
    //         body: formEncode({id: this.props.match.params.id}),
    //     }).then(function (response) {
    //             return response.json();
    //         }
    //     ).then((result) => {
    //             this.setState({data: result});
    //             console.log(this.state.data);
    //         }
    //     )
    // }
    //
    componentDidMount() {
        fetch(`/profile/info/${this.props.match.params.id}`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({data: responseJson});
            })
    }

    render() {
        // const user = this.state.data.find(user => user.user_id.toString() === this.props.match.params.id);

        // const userDetails = user ? Object.entries(user) : [['id', (
        {/*<span><i className="text-muted icon-ban"></i> Not found</span>)]]*/
        }
        // console.log(userDetails);
        // const birth_day =
        const {data} = this.state
        return (
            <div className="animated fadeIn">
                {data && data.status ==='OK' ? <Card style={{height: 'auto'}}>
                    <CardBody>
                        <Row>
                            <Col md={5}>
                                <div style={{overflow: 'hidden', position: 'relative', boxSizing: 'border-box'}}><img
                                    style={{width: '100%'}} src={'assets/img/avatars/dai.jpg'}/></div>
                                <div style={{textAlign: 'center', fontFamily: 'Forte'}}>
                                    <h3>{this.state.data.profile.full_name}</h3>
                                </div>
                            </Col>
                            <Col style={{paddingLeft: '5%'}}>
                                <Card><CardBody>
                                    <Col className={'info-profile'}>
                                        <Row><Col md={4}><h5><strong>Họ và Tên</strong></h5></Col><Col>
                                            <h5> {this.state.data.profile.full_name}</h5></Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Giới tính</strong></h5>
                                        </Col><Col>
                                            <h5> {(this.state.data.profile.gender == 0 ? 'Nữ' : this.state.data.profile.gender == 1 ? 'Nam' : 'Không xác đinh ')}</h5>
                                        </Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Sinh năm</strong></h5></Col><Col>
                                            <h5> {curentDate(this.state.data.profile.birth_date)}</h5></Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Địa chỉ</strong></h5>
                                        </Col><Col>
                                            <h5>{this.state.data.profile.address}</h5></Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Số điện thoại</strong></h5>
                                        </Col><Col>
                                            <h5>{this.state.data.profile.phone_number}</h5></Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Chuyên ngành</strong></h5>
                                        </Col><Col>
                                            <h5>{this.state.data.job_title.title}</h5></Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Chức vụ</strong></h5>
                                        </Col><Col>
                                            <h5>{this.state.data.job_position.title}</h5></Col></Row>
                                        <Row style={{marginTop: 8}}><Col md={4}><h5><strong>Ngày gia nhập</strong></h5>
                                        </Col><Col>
                                            <h5>{curentDate(this.state.data.profile.join_date)}</h5></Col></Row>
                                    </Col>
                                </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> : <Card><CardBody><span><i className="text-muted icon-ban"></i> Not found</span></CardBody></Card>}
            </div>
        )
    }
}

function curentDate(date) {

    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    var today1 = dd + '/' + mm + '/' + yyyy
    return today1;
}

function mapStatetoProps(state) {
    return {profile: state.profile, limit: state.limit}

}

export default connect(mapStatetoProps)(ProfileDetail);
