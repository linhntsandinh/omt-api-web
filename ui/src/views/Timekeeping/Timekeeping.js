import usersData from './UsersData'
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Attend from '../AttendTable/AttendTable'
import UserCard from "./UserCard"
import {formEncode} from "../../DataUser";
import {Bar, Line} from 'react-chartjs-2';
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
import {connect} from "react-redux";

BigCalendar.momentLocalizer(moment);


function Pagin(data) {
    let p = data.parent;
    let check = data.check;
    let pagin = data.pagin;
    return (
        <PaginationItem active={(check - pagin) === (data.index)}>
            <PaginationLink tag="button"
                            onClick={(e) => p.handleClick((pagin + data.index), e)}>{pagin + data.index}</PaginationLink>
        </PaginationItem>
    )

}

function More(data) {
    return (
        <Row>
            <Col md="7">
            </Col>
            <Col md="5">
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="4">
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Email
                                    </InputGroupText>
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Số điện thoại
                                    </InputGroupText>
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Chuyên môn
                                    </InputGroupText>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="email" value={data.pr.state.email}
                                               onChange={(e) => data.pr.handleChange(e)} onKeyPress={(ev, e) => {
                                            console.log(`Pressed keyCode ${ev.key}`);
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="phone_number"
                                               value={data.pr.state.phone_number}
                                               onChange={(e) => data.pr.handleChange(e)} onKeyPress={(ev, e) => {
                                            console.log(`Pressed keyCode ${ev.key}`);
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="job_position"
                                               value={data.pr.state.job_position}
                                               onChange={(e) => data.pr.handleChange(e)} onKeyPress={(ev, e) => {
                                            console.log(`Pressed keyCode ${ev.key}`);
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </Col>
        </Row>
    )
}


function UserRow(props) {
    const user = props.user
    const index = props.index
    const userLink = `#/users/${user.id}`
    /* const getBadge = (status) => {
         return status === 'Active' ? 'success' :
             status === 'Inactive' ? 'secondary' :
                 status === 'Pending' ? 'warning' :
                     status === 'Banned' ? 'danger' :
                         'primary'
     }*/

    return (
        <tr key={user.id.toString()}>
            <th>
                <a>{index}</a>
            </th>
            <th><img src={"assets/img/avatars/2.jpg"} className={"img-avatar"} id={"idavataUser1"}/></th>
            <th scope="row"><a href={userLink}>{user.id}</a></th>
            <td><a href={userLink}>{user.name}</a></td>
            <td>
                {user.show === true ?
                    <i className="icon-trash" onClick={() => {
                        console.log("Xoa nha")
                    }}/> : null}  &nbsp;  &nbsp;
                {user.show === true ?
                    <i className="i icon-note" onClick={() => {
                        console.log("Fix nha")
                    }}/> : null}</td>
            <td>{user.team}</td>
            <td>{user.timecheckin}</td>
            <td>{user.timecheckout}</td>
            <td><Badge href={userLink}>{user.date}</Badge></td>
        </tr>
    )
}

class Timekeeping extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
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
                                        this.props.dispatch({type: 'UP'})
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

