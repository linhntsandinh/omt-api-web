/**
 * Created by Vu Tien Dai on 25/06/2018.
 */
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Attend from '../AttendTable/AttendTable'
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
} from 'reactstrap';

BigCalendar.momentLocalizer(moment);

class Timekeeping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
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
            console.log(this.state.data)
        })
    }

    render() {
        // this.componentDidMount();
        // console.log(this.state.data);
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

export default Timekeeping;
