
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Attend from '../AttendTable/AttendTable'
import {connect} from "react-redux";
import firebase from '../../firebase_config'
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Pagination,
    PaginationItem,
    PaginationLink,


} from 'reactstrap';
BigCalendar.momentLocalizer(moment);

class Timekeeping extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props)
        this.state = {
            pagin: 1,
            check: 1,
            data: [],
            length: 20,
            id: '',
            full_name: '',
            phone_number: '',
            email: '',
            job_title: '',
            job_position: '',
            limit: 30,
            search: false
        }
        const noti = firebase.database().ref().child('test')
        noti.on('value', (vl) => {
            // this.setState({
            //     noti_count: vl.val()['dai']
            // })
            console.log(vl.val())
        });
    }

    componentDidMount() {
        fetch('https://daivt.000webhostapp.com/get_info.php').then(function (response) {
                return response.json();
            }
        ).then((result) => {
            let x = result.filter((value, index) => (value.start = new Date(result[index].start)) && (value.end = new Date(result[index].end)))
            this.setState({
                data: x
            })
        })
    }

    onUpdate() {
        // const noti = firebase.database().ref('/test')
        // noti.child('dai').update(new notify(1,2,'Chao ban','/home/'));
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col md="4">
                            <Row>
                                <div size="sm" className=" text-center card-body">
                                    <img src={'assets/img/avatars/test.jpg'} className="main-avatar img-avatar"></img>
                                </div>
                            </Row>
                            <Row className="btn-tk ">
                                <div className=" text-center card-body">
                                    <Button className="btn-timekeeping" color="success" size="lg" onClick={() => {
                                        this.onUpdate()
                                    }}>Chấm công</Button>
                                </div>
                            </Row>
                            <Row>
                                <div className="card-body">
                                    <p>Số ngày đi muộn trong tháng : </p>
                                    <p> Sô ngày về sớm trong tháng : </p>
                                    <p> Số ngày nghỉ trong tháng : </p>
                                </div>
                            </Row>

                        </Col>
                        <Col md="8">
                            <BigCalendar
                                events={this.state.data}
                                defaultDate={new Date(2018, 5, 12)}
                            />
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="attend-table">
                    <Row>
                        <Attend/>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}
function mapStatetoProps(state) {
    return {profile: state.profile}

}

export default connect(mapStatetoProps)(Timekeeping);

