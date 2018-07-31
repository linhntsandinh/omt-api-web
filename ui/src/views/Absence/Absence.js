/**
 * Created by Vu Tien Dai on 29/06/2018.
 */
/**
 * Created by Vu Tien Dai on 27/06/2018.
 */
/**
 * Created by Vu Tien Dai on 25/06/2018.
 */
import React, {Component} from 'react';
import {formEncode} from '../../DataUser'
import * as Datetime from 'react-datetime';

import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import {connect} from "react-redux";

var yesterday = Datetime.moment().subtract(1, 'day');
var valid1 = function (current) {
    return current.day() !== 0 && current.day() !== 6;
};

function Optioncard(data) {
    let value = data.value.title;
    return (
        <option value={data.value.id}>{value}</option>
    )
}

function curentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds()
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    var today1 = dd + '/' + mm + '/' + yyyy + '   ' + h + ':' + m + ':' + s;

    return today1;
}

class Absence extends Component {

    constructor(props) {
        super(props);
        console.log(props.profile)
        this.state = {
            reasonTitle: [],
            receiver: [],
            titleform: '',
            username: '',
            job_position: '',
            job_title: '',
            today: '',
            from: new Date(),
            to: '',
            des: '',
            rec: '',
            fadeIn: false,
            loading: true
        }

    }

    componentDidMount() {
        this.setState({
            today: curentDate()
        })
        fetch(`/absence/loadForm/${this.props.profile['user_data']['id']}`).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                console.log(result)
                if (result['status'] === 'OK') {
                    this.setState({
                        reasonTitle: result['Reasons'],
                        titleform: result['Reasons'][0]['id'],
                        username: result['profile'][0]['full_name'],
                        rec: result['Receiver'][0]
                    })
                }
                else {
                    this.setState({loading: false})
                }
            }
        )
    }

    handleChange(e) {

        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeDateFrom(e) {
        if (e._d) {
            this.setState({from: e._d.getTime()});
            if (e._d.getTime() >= this.state.to) {
                this.setState({fadeIn: true});
            } else {
                this.setState({fadeIn: false});
            }
        }
        else {
            this.setState({from: new Date()});
        }
    }

    handleChangeDateTo(e) {
        if (e._d) {
            this.setState({to: e._d.getTime()});
            if (this.state.from >= e._d.getTime()) {
                this.setState({fadeIn: true});
            }
            else {
                this.setState({fadeIn: false});
            }
        }

        else {
            this.setState({to: new Date(new Date(this.state.from).getTime() + 86400000)});
        }
    }

    Send(e) {
        console.log("Ahihi"+this.state.from)
        let from =new Date(this.state.from).getTime()
        let to = new Date(this.state.to).getTime()
        fetch(`/absence/insert`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                     {reasonId: this.state.titleform,
                    description: this.state.des,
                    startTime:from,
                    endTime:to,
                    status:0,
                    userId:this.props.profile['user_data']['id'],
                    totalTime:(to-from)/86400000}
                ),
        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                console.log(result)

            }
        )

    }

    render() {
        const {
            reasonTitle, receiver, titleform, username, job_position, job_title, today,
            from, to, des, rec, fadeIn
        } = this.state;
        var valid2 = function (current, from) {
            return current.isSameOrAfter(from) && current.day() !== 0 && current.day() !== 6;
        };
        if (this.state.loading === true) {
            return (
                <Card>
                    <CardHeader>
                        <strong>Basic Form</strong> Elements
                    </CardHeader>

                    <CardBody>
                        <Col>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="select"><h3>Đơn xin</h3></Label>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Input value={titleform} onChange={(e) => this.handleChange(e)}
                                               type="select"
                                               name="titleform" id="selectLg" bsSize="small">
                                            {reasonTitle.map((value, index) =>
                                                <Optioncard key={index} index={index} value={value}/>
                                            )}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="select"><h5>Họ và Tên :</h5></Label>
                                    </Col>
                                    <Col>
                                        <Label htmlFor="select">{username}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="select"><h5>Bộ phận :</h5></Label>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="select">{job_title}</Label>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="select"><h5>Chức vụ :</h5></Label>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="select">{job_position}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="select"><h5>Ngày viết :</h5></Label>
                                    </Col>
                                    <Col>
                                        <Label>{today}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="date-input">Từ :</Label>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Datetime
                                            isValidDate={valid1} value={from} inputProps={{id: "from"}}
                                            onChange={(e) => this.handleChangeDateFrom(e)}/>
                                        {fadeIn ?
                                            <p className="text-danger"> Thời gian không hợp lệ</p> : null}

                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="date-input">Đến :</Label>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Datetime isValidDate={(e) => valid2(e, from)} value={to}
                                                  inputProps={{id: "to"}}
                                                  onChange={(e) => this.handleChangeDateTo(e)}/>
                                        {fadeIn ?
                                            <p className="text-danger"> Thời gian không hợp lệ</p> : null}

                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="textarea-input">Lý Do</Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                        <Input value={des} onChange={(e) => this.handleChange(e)}
                                               type="textarea"
                                               name="des" id="textarea-input" rows="5"
                                               placeholder="Content..."/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="select">Người nhận</Label>
                                    </Col>
                                    <Col xs="12" md="4">
                                        <Input value={rec} onChange={(e) => this.handleChange(e)} type="select"
                                               name="rec"
                                               id="selectLg" bsSize="small">
                                            {receiver.map((value, index) =>
                                                <Optioncard key={index} index={index} value={value}/>
                                            )}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={(e) => this.Send(e)} type="submit" size="lg" color="primary"><i
                            className="icon-cursor"></i> Send</Button>
                        <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                </Card>

            )
        }
        else {
            return (
                <p>Không tải được dữ liệu !!!.</p>
            )
        }

    }

}


function mapStatetoProps(state) {
    return {profile: state.profile}

}

export default connect(mapStatetoProps)(Absence);
