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
import {getData, formEncode} from '../../../DataUser'
import * as Datetime from 'react-datetime';

var yesterday = Datetime.moment().subtract(1, 'day');
var valid1 = function (current) {
    return current.day() !== 0 && current.day() !== 6;
};


class Absence extends Component {

    constructor(props) {
        super(props);
        console.log(yesterday)
        this.state = {
            user_id: this.props.match.params.user_id,
            absence_id: this.props.match.params.absence_id,
            reasonTitle: [],
            receiver: [],
            status: '',
            titleform: '',
            username: '',
            job_position: '',
            job_title: '',
            today: '',
            from: '',
            to: '',
            reason: '',
            rec: '',
            fadeIn: false,

        }

    }

    componentDidMount() {
        fetch('https://daivt.000webhostapp.com/get_job_position.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: JSON.stringify({
                user_id: this.state.user_id,
                absence_id: this.state.absence_id,
            }),
        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                if (result) {
                    this.setState({
                        reasonTitle: [],
                        receiver: [],
                        status: '',
                        titleform: 'Nghỉ làm',
                        username: 'Đại',
                        job_position: '',
                        job_title: '',
                        today: curentDate(0),
                        from: curentDate(1),
                        to: curentDate(2),
                        reason: '',
                        rec: '',
                    })
                }
            }
        )
        // fetch('https://daivt.000webhostapp.com/get_reason.php').then(function (response) {
        //         return response.json();
        //     }
        // ).then((result) => {
        //         // console.log(result)
        //         this.setState({
        //             reasonTitle: result,
        //             titleform: result[0]['id']
        //         })
        //     }
        // )
        // fetch('https://daivt.000webhostapp.com/get_job_title.php', {
        //     method: 'POST',
        //     headers: {"Content-type": "application/x-www-form-urlencoded"},
        //     body: formEncode({id: getData('job_title_id')}),
        // }).then(function (response) {
        //         return response.json();
        //     }
        // ).then((result) => {
        //         if (result) {
        //             this.setState({
        //                 job_title: result[0]['title']
        //             })
        //         }
        //     }
        // )
        //
        // fetch('https://daivt.000webhostapp.com/get_receive.php', {
        //     method: 'POST',
        //     headers: {"Content-type": "application/x-www-form-urlencoded"},
        //     body: formEncode({id: getData('job_position_id')}),
        // }).then(function (response) {
        //         return response.json();
        //     }
        // ).then((result) => {
        //         console.log(result)
        // if (result) {
        //     this.setState({
        //         receiver: result,
        //         rec: result[0]['id']
        //     })
        // }
        // }
        // )

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeDateFrom(e) {

        if (e._d) {
            this.setState({from: e._d.getTime(), fadeIn: false});
            if (e._d.getTime() >= this.state.to) {
                this.setState({fadeIn: true});
            }
        } else {

            this.setState({from: '', fadeIn: true});
        }
    }

    handleChangeDateTo(e) {
        if (e._d) {
            this.setState({to: e._d.getTime(), fadeIn: false});
            if (this.state.from >= e._d.getTime()) {
                this.setState({fadeIn: true});
            }
        } else {
            document.getElementById('to').value = ''
            this.setState({to: '', fadeIn: true});
        }
    }

    Send(e) {
        console.log(this.state);
    }

    render() {
        const {
            reasonTitle,
            receiver,
            titleform,
            username,
            job_position,
            job_title,
            today,
            from,
            to,
            reason,
            rec,
            fadeIn,
            status,
            user_id,
            absence_id

        } = this.state;
        var valid2 = function (current, from) {
            return current.isSameOrAfter(from) && current.day() !== 0 && current.day() !== 6;
        };
        console.log("ID" + absence_id);
        if (!absence_id) {
            return (
                <Card>
                    <CardBody>
                        <div>Loading...</div>
                    </CardBody>
                </Card>
            )
        }
        else (absence_id)
        {
            if (absence_id === '0') {
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
                                            <Input value={reason}
                                                   onChange={(e) => this.handleChange(e)}
                                                   type="textarea"
                                                   name="reason" id="textarea-input" rows="5"
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
                        <CardFooter style={{float: "right"}}>
                            <Button onClick={(e) => this.Send(e)} type="submit" size="lg" color="primary"><i
                                className="icon-cursor"></i> Send</Button>
                            <Button type="reset" size="lg" color="danger" onClick={() => {
                                document.location = "#/absencemanage"
                            }}><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                )
            }
            else {
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
                                            <Input value={titleform}
                                                   name="titleform"
                                                   id="selectLg"
                                                   bsSize="small"
                                                   disabled={true}/>

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
                                            <Input
                                                value={from}
                                                disabled={true}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="date-input">Đến :</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input value={to}
                                                   disabled={true}
                                            />

                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="textarea-input">Lý Do</Label>
                                        </Col>
                                        <Col xs="12" md="8">
                                            <Input value={reason}
                                                   disabled={true}
                                                   type="textarea"
                                                   name="reason" id="textarea-input" rows="5"
                                                   placeholder="Content..."/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="select">Người nhận</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input value={rec}
                                                   name="rec"
                                                   id="selectLg"
                                                   bsSize="small"
                                                   disabled={true}/>

                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </CardBody>
                        <CardFooter>
                            <Button type="reset" size="lg" color="primary" onClick={() => {
                                document.location = "#/absencemanage"
                            }}><i className="	fa fa-angle-double-left">&nbsp;</i> Back</Button>
                        </CardFooter>
                    </Card>
                )
            }
        }

    }
}

function

Optioncard(data) {
    let value = data.value.title;
    return (
        <option value={data.value.id}>{value}</option>
    )
}

function

curentDate(x) {
    var today = new Date(x);
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
    var today1 = dd + '/' + mm + '/' + yyyy + '    ' + h + ':' + m + ':' + s;

    return today1;
}

export default Absence;
