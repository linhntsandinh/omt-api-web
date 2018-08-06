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
            status: '',
            titleform: '',
            username: '',
            job_position: '',
            job_title: '',
            today: '',
            from: '',
            to: '',
            reason: 'Chan vc',
            rec: '',

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
                        status: '',
                        titleform: 'Nghỉ làm',
                        username: 'Đại',
                        job_position: '',
                        job_title: '',
                        today: curentDate(0),
                        from: curentDate(1),
                        to: curentDate(2),
                        reason: 'chan vcc',
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

    Send(e) {
        console.log(this.state);
    }

    render() {
        const {
            titleform,
            username,
            job_position,
            job_title,
            today,
            from,
            to,
            reason,
            rec,
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
                        <Row>
                            <Col md="2">
                                <Button type="reset" size="lg" color="success" onClick={() => {
                                    if (window.confirm('Bạn duyệt đơn này chứ ?')){
                                        console.log("Dm may");
                                    }
                                }}>Chấp nhận</Button>
                            </Col>
                            <Col md="2">
                                <Button type="reset" size="lg" color="danger" onClick={() => {
                                    if (window.confirm('Bạn không phê duyệt đơn này chứ ?')){
                                        console.log("Dm may");
                                    }
                                }}>&nbsp;&nbsp;Từ chối&nbsp;&nbsp;&nbsp;</Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            )
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
