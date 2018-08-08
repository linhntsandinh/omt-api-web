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

import FormCard from "./FormCard"
import {connect} from "react-redux";
import {formEncode} from '../../../DataUser'
import PaginBar from '../../ExtendComponent/PaginBar'
import HeaderTable from '../../ExtendComponent/HeaderTable'
import SearchMore from '../../ExtendComponent/SearchMore'

const headerTable = [
    {title: 'STT', id: 'id', width: '6%'},
    {title: 'Người gửi', id: 'writer', width: '17%'},
    {title: '', id: '', width: '10%'},
    {title: 'Người nhận', id: 'receiver', width: '17%'},
    {title: 'Loại', id: 'receiver', width: '15%'},
    {title: 'Ngày viết', id: 'start', width: '15%'},
    {title: 'Số ngày', id: 'total', width: '10%'},
    {title: 'Status', id: 'status', width: '10%'}
]
const searchMore_admin = [
    {title: 'Người nhận', id: 'receiver'},
    {title: 'Loại', id: 'reason'},
    {title: 'Ngày viết', id: 'start', type: 'date'},
    {title: 'Số ngày', id: 'total'},
    {
        title: 'Status',
        id: 'status',
        type: 'select',
        option: [{id: 0, title: 'Chưa duyệt'}, {id: 1, title: 'Duyệt'}, {id: 2, title: 'Không duyệt'}]
    }
]
const searchMore_user = [
    {title: 'Loại', id: 'reason'},
    {title: 'Ngày viết', id: 'start', type: 'date'},
    {title: 'Số ngày', id: 'total'},
    {
        title: 'Status',
        id: 'status',
        type: 'select',
        option: [{id: 0, title: 'Chưa duyệt'}, {id: 1, title: 'Duyệt'}, {id: 2, title: 'Không duyệt'}]
    }
]

class AbsenceSend extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            id: '',
            writer: '',
            receiver: '',
            reason: '',
            start: '',
            total: '',
            length: 0,
            order: '',
            by: '',
            data: [],
            search: false,
            check: 1,
            permission: true
        }

    }

    componentDidMount() {

        fetch('https://daivt.000webhostapp.com/get_profile.php', {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode(
                {
                    id: this.state.id,
                    writer: this.state.writer,
                    receiver: this.state.receiver,
                    reason: this.state.reason,
                    start: this.state.start,
                    total: this.state.total,
                    limit: this.props.limit,
                    offset: ((this.state.check - 1) * this.props.limit)
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
                    full_name: this.state.writer,
                    receiver: this.state.receiver,
                    reason: this.state.reason,
                    start: this.state.start,
                    total: this.state.total,
                    limit: this.props.limit,
                    offset: ((this.state.check - 1) * this.props.limit)
                })

        }).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                this.setState({data: result}, () => {
                    window.scroll({
                        top: 0,
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
        const {check, data, writer, length, search, sort} = this.state
        const limit = this.props.limit
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
                                    {this.state.permission === true ?
                                        <Input value={writer} onChange={(e) => this.handleChange(e)}
                                               type="text"
                                               id="input1-group2"
                                               name="writer" placeholder="Người gửi"
                                               bsSize="lg"
                                               onKeyPress={(ev, e) => {
                                                   if (ev.key === 'Enter') {
                                                       document.getElementById("btn-search").click();
                                                       ev.preventDefault();
                                                   }
                                               }}/> :
                                        <Input value={this.state.receiver} onChange={(e) => this.handleChange(e)}
                                               type="text"
                                               id="input1-group2"
                                               name="receiver" placeholder="Người nhận"
                                               bsSize="lg"
                                               onKeyPress={(ev, e) => {
                                                   if (ev.key === 'Enter') {
                                                       document.getElementById("btn-search").click();
                                                       ev.preventDefault();
                                                   }
                                               }}/>
                                    }
                                    <InputGroupAddon addonType="prepend">
                                        <Button
                                            id="btn-search" onClick={(e) => {
                                            this.handleSearch(e)
                                        }}
                                            color="primary"><i className="fa fa-writer"> Search</i></Button>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="prepend">
                                        <Button size="sm" onClick={(e) => {
                                            if (search === true) {
                                                this.setState({reason: '', receiver: '', start: '', total: ''})
                                            }
                                            this.setState({search: !search})
                                        }} color="info"><i
                                            className="fa fa-plus"></i></Button>
                                    </InputGroupAddon>
                                </InputGroup>

                            </Col>
                        </Row>
                        {search ? <Col md={5} style={{float: 'right', paddingTop: 2}}>
                            <SearchMore data={(this.state.permission === true ? searchMore_admin : searchMore_user)}
                                        onChange={(e) => {
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
                            <HeaderTable data={headerTable} onChange={(e) => {
                                // console.log(e.target.order + "  " + e.target.by)
                                this.setState({
                                    order: e.target.order,
                                    by: e.target.by
                                }, () => {
                                    this.getData()
                                })
                            }}/>
                            <tbody>{
                                data.map((absence, index) =>
                                    < FormCard key={index} data={absence} permission={this.state.permission}
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
    return {profile: state.profile, limit: state.limit}

}

export default connect(mapStatetoProps)(AbsenceSend);
