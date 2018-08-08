/**
 * Created by Vu Tien Dai on 27/06/2018.
 */
/**
 * Created by Vu Tien Dai on 25/06/2018.
 */
import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Table,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Row,
} from 'reactstrap';
import AttendCard from "./AttendCard"
import {connect} from "react-redux";
import {formEncode} from '../../DataUser'
import PaginBar from '../ExtendComponent/PaginBar'
import HeaderTable from '../ExtendComponent/HeaderTable'
import SearchMore from '../ExtendComponent/SearchMore'
const headerTable = [
    {title: 'STT', id: 'id', width: '6%'},
    {title: 'Họ và tên ', id: 'username', width: '20%'},
    {title: 'Team', id: 'team', width: '15%'},
    {title: 'Time Check in', id: 'check_in', width: '13%'},
    {title: 'Time Check out', id: 'check_out', width: '13%'},
    {title: 'Ngày', id: 'date', width: '10%'},
    {title: 'Status', id: 'status', width: '8%'}
]
const searchMore = [
    {title: 'Loại', id: 'reason'},
    {title: 'Ngày viết', id: 'start', type: 'date'},
    {title: 'Số ngày', id: 'total'},
    {title: 'Status', id: 'status',type:'select',option:[{id:0,title:'Chưa duyệt'},{id:1,title:'Duyệt'},{id:2,title:'Không duyệt'}]}
]

class AbsenceTable extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            id: '',
            username: '',
            team: '',
            check_in: '',
            check_out: '',
            date: new Date().getTime(),
            status: '',
            limit: 10,
            length: 0,
            orderby: '',
            ordervalue: '',
            data: [],
            search: false,
            sort: new Array(7).fill(0),
            check: 1,
            permission:true
        }

    }


    componentDidMount() {
        fetch('https://daivt.000webhostapp.com/get_profile.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode(
                {
                    id: this.state.id,
                    username: this.state.username,
                    team: this.state.team,
                    check_in: this.state.check_in,
                    check_out: this.state.check_out,
                    date: this.state.date,
                    limit: this.props.limit,
                    offset: ((this.state.check - 1) * this.state.limit),
                    orderby: this.state.orderby,
                    ordervalue: this.state.ordervalue,
                })

        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                this.setState({data: result});
            }
        )
        fetch('https://daivt.000webhostapp.com/get_lengthprofile.php', {}).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                this.setState({length: result[0]['count']});

            }
        )

    }

    getData() {
        fetch('https://daivt.000webhostapp.com/get_profile.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode(
                {
                    id: this.state.id,
                    username: this.state.username,
                    team: this.state.team,
                    check_in: this.state.check_in,
                    check_out: this.state.check_out,
                    date: this.state.date,
                    limit: this.props.limit,
                    offset: ((this.state.check - 1) * this.state.limit),
                    orderby: this.state.orderby,
                    ordervalue: this.state.ordervalue,
                })

        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                this.setState({data: result},()=>{
                    window.scroll({
                        top: 670,
                        left: 0,
                        behavior: 'smooth'
                    });
                });
            }
        )
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    handleSearch(e) {
        this.setState({check: 1, pagin: 1}, function () {
            this.getData();
        });
    }


    render() {
        const {
            check, data, username, length, search, sort
        } = this.state
        const limit= this.props.limit
        return (
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md="7">
                                <h4><i className="fa fa-align-justify"></i> Danh sách chấm công</h4>
                            </Col>
                            <Col md="5">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend" disabled><Button>
                                        <i className="fa fa-search"></i>
                                    </Button></InputGroupAddon>
                                    <Input value={username} onChange={(e) => this.handleChange(e)}
                                           type="text"
                                           id="input1-group2"
                                           name="username" placeholder="Họ và Tên"
                                           bsSize="lg"
                                           onKeyPress={(ev, e) => {
                                               if (ev.key === 'Enter') {
                                                   document.getElementById("btn-search").click();
                                                   ev.preventDefault();
                                               }
                                           }}/>
                                    <InputGroupAddon addonType="prepend">
                                        <Button
                                            id="btn-search" onClick={(e) => {
                                            this.handleSearch(e)
                                        }}
                                            color="primary"><i className="fa fa-username"> Search</i></Button>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="prepend">
                                        <Button size="sm" onClick={(e) => {
                                            if (search === true) {
                                                this.setState({check_in: '', team: '', check_out: '', date: ''})
                                            }
                                            this.setState({search: !search})
                                        }} color="info"><i
                                            className="fa fa-plus"></i></Button>
                                    </InputGroupAddon>
                                </InputGroup>

                            </Col>
                        </Row>
                        {search ? <Col md={5} style={{float: 'right', paddingTop: 2}}>
                            <SearchMore data={searchMore}
                                        onChange={(e) => {
                                            // console.log(e.target.value)
                                            this.handleChange(e)
                                        }}
                                        onKeyPress={(ev, e) => {
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }
                                        }
                            />
                        </Col> : null}
                    </CardHeader>


                    <CardBody>
                        <Table bordered responsive className="private-table small-table">
                            <HeaderTable data={headerTable} onChange={(e)=>{
                                // console.log(e.target.order+ "  "+e.target.by)
                                this.setState({
                                    order:e.target.order,
                                    by:e.target.by
                                },()=>{
                                    this.getData()
                                })
                            }}/>

                            <tbody>{
                                data.map((attend, index) =>
                                    < AttendCard key={index} attend={attend}
                                                 stt={index + (check - 1) * limit + 1}/>)}
                            </tbody>
                        </Table>
                        <PaginBar name={"check"} onChange={(e) => {
                            this.props.dispatch({type:'set_limit',data:e.target.limit})
                            this.setState({
                                check: e.target.check,
                            }, () => {
                                this.getData()
                            })
                        }} value={this.state.check} limit={limit} pagin_number={8} length={length}/>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

function mapStatetoProps(state) {
    return {profile: state.profile,limit:state.limit}

}

export default connect(mapStatetoProps)(AbsenceTable);
