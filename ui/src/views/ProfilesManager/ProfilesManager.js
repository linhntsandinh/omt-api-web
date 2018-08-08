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
    Input,
    Row,
} from 'reactstrap';
import UserCard from "./ProfileCard"
import {formEncode} from '../../DataUser'
import {connect} from "react-redux";
import PaginBar from '../ExtendComponent/PaginBar';
import HeaderTable from '../ExtendComponent/HeaderTable'
import SearchMore from '../ExtendComponent/SearchMore'
const headerTable = [
    {title: 'STT', id: 'id', width: '6%'},
    {title: '', id: '', width: '4%'},
    {title: 'Họ và Tên', id: 'full_name', width: '20%'},
    {title: '', id: '', width: '15%'},
    {title: 'Email', id: 'email', width: '15%'},
    {title: 'Số điện thoại', id: 'phone_number', width: '15%'},
    {title: 'Chuyên môn', id: 'job_position', width: '15%'},
    {title: 'Status', id: 'status', width: '10%'}
]
const searchMore = [
    {title: 'Loại', id: 'reason'},
    {title: 'Ngày viết', id: 'start', type: 'date'},
    {title: 'Số ngày', id: 'total'},
    {title: 'Status', id: 'status',type:'select',option:[{id:0,title:'Chưa duyệt'},{id:1,title:'Duyệt'},{id:2,title:'Không duyệt'}]}
]
class UsersManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagin: 1,
            check: 1,
            pagin_number:8,
            data: [],
            length: 20,
            id: '',
            full_name: '',
            phone_number: '',
            email: '',
            job_title: '',
            job_position: '',
            limit: 10,
            search: false,
            sort: new Array(6).fill(0),
            orderby: '',
            ordervalue: ''
        }
    }

    componentDidMount() {
        console.log("getAll");
        fetch('https://daivt.000webhostapp.com/get_profile.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode(
                {
                    id: this.state.id,
                    full_name: this.state.full_name,
                    phone_number: this.state.phone_number,
                    address: this.state.address,
                    job_title: this.state.job_title,
                    job_position: this.state.job_position,
                    limit: this.state.limit,
                    offset: ((this.state.check - 1) * this.state.limit)
                })

        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
            console.log(result)
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
                    full_name: this.state.full_name,
                    phone_number: this.state.phone_number,
                    email: this.state.email,
                    job_title: this.state.job_title,
                    job_position: this.state.job_position,
                    limit: this.state.limit,
                    offset: ((this.state.check - 1) * this.state.limit)
                })

        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                this.setState({data: result});
                console.log(result);
            }
        )
    }
    handleChange(e) {

        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {
            check, data, full_name, length, limit, pagin, search, sort, orderby, ordervalue
        } = this.state
        const data_pagin = [];
        for (let i = 0; i < Math.ceil(length / limit); i++) {
            if (i >= (pagin - 1) && i < pagin + this.state.pagin_number-1 && data_pagin.length < this.state.pagin_number)
                data_pagin.push(i);
        }
        return (
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md="7">
                                <i className="fa fa-align-justify"></i> Danh sách
                            </Col>
                            <Col md="5">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend" disabled><Button>
                                        <i className="fa fa-search"></i>
                                    </Button></InputGroupAddon>
                                    <Input value={full_name} onChange={(e) => this.handleChange(e)}
                                           type="text"
                                           id="input1-group2"
                                           name="full_name" placeholder="Username"
                                           bsSize="lg"
                                           onKeyPress={(ev, e) => {
                                               console.log(`Pressed keyCode ${ev.key}`);
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
                                            color="primary"><i className="fa fa-full_name"> Search</i></Button>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="prepend">
                                        <Button size="sm" onClick={(e) => {
                                            if (search === true) {
                                                this.setState({
                                                    email: '',
                                                    phone_number: '',
                                                    job_title: '',
                                                    job_position: ''
                                                })
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
                        <Table bordered className="private-table small-table" responsive>
                            <HeaderTable data={headerTable} onChange={(e) => {
                                this.setState({
                                    order: e.target.order,
                                    by: e.target.by
                                }, () => {
                                    this.getData()
                                })
                            }}/>

                            <tbody>{
                                data.map((value, index) =>
                                    < UserCard key={index} index={index} data={value}
                                               stt={index + (check - 1) * limit + 1}/>)}
                            </tbody>
                        </Table>
                        <PaginBar name={"check"} onChange={(e) => {
                            this.props.dispatch({type: 'set_limit', data: e.target.limit})
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

export default connect(mapStatetoProps)(UsersManage);
