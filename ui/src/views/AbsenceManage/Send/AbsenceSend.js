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
import PaginBar from '../../PaginBar/PaginBar'

function More(props) {
    return (
        <Row>
            <Col md="7">
            </Col>
            <Col md="4">
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="4">
                                {props.parent.state.permission === true ?
                                    <Row>
                                        <InputGroupText className="lable_search">
                                            Người nhận
                                        </InputGroupText>
                                    </Row> : null}
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Loại
                                    </InputGroupText>
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Ngày viết
                                    </InputGroupText>
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Số ngày
                                    </InputGroupText>
                                </Row>
                            </Col>
                            <Col md="8">
                                {props.parent.state.permission === true ?
                                    <Row>
                                        <Col>
                                            <Input className="lable_search" name="receiver"
                                                   value={props.parent.state.receiver}
                                                   onChange={(e) => props.parent.handleChange(e)}
                                                   onKeyPress={(ev, e) => {
                                                       if (ev.key === 'Enter') {
                                                           document.getElementById("btn-search").click();
                                                           ev.preventDefault();
                                                       }
                                                   }}/>
                                        </Col>
                                    </Row> : null}
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="reason"
                                               value={props.parent.state.reason}
                                               onChange={(e) => props.parent.handleChange(e)} onKeyPress={(ev, e) => {
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input value={props.parent.state.start} name="start"
                                               onChange={(e) => props.parent.handleChange(e)} type="date"
                                               placeholder="date"
                                               onKeyPress={(ev, e) => {
                                                   if (ev.key === 'Enter') {
                                                       document.getElementById("btn-search").click();
                                                       ev.preventDefault();
                                                   }
                                               }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="total"
                                               value={props.parent.state.total}
                                               onChange={(e) => props.parent.handleChange(e)}
                                               onKeyPress={(ev, e) => {
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

class AbsenceSend extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            id: '',
            writer: '',
            receiver: '',
            reason: '',
            start: '',
            total: '',
            length: 0,
            orderby: '',
            ordervalue: '',
            data: [],
            search: false,
            sort: new Array(7).fill(0),
            check: 1,
            permission: false
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

    handleSort(name, i, e) {
        const newArray = this.state.sort.map((element, index) => {
            if (index === i) {
                element = element + 1;
            }
            else {
                element = 0
            }
            return element;
        });
        this.setState({
            sort: newArray,
            orderby: name,
            ordervalue: (this.state.sort[i] % 3 === 1 ? 'ASC' : this.state.sort[i] % 3 === 2 ? 'DESC' : '')
        })
    }

    render() {
        const {check, data, writer, length, search, sort} = this.state
        const limit= this.props.limit
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
                        {search ? <More parent={this}/> : null}
                    </CardHeader>

                    <CardBody>
                        <Table bordered responsive className="private-table small-table">
                            <thead>
                            <tr className="header-table text-center">
                                <th width="6%" name="id"
                                    onClick={(e) => this.handleSort("id", 0, e)}>STT
                                    <a className="icon-sort">
                                        {(sort[0] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[0] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="15%" onClick={(e) => this.handleSort("writer", 1, e)}>Người gửi
                                    <a className="icon-sort">
                                        {(sort[1] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[1] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="8%"></th>
                                <th width="15%" onClick={(e) => this.handleSort("receiver", 2, e)}>Nguời nhận
                                    <a className="icon-sort">
                                        {(sort[2] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[2] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="13%" onClick={(e) => this.handleSort("reason", 3, e)}>Loại
                                    <a className="icon-sort">
                                        {(sort[3] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[3] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="13%" className="text-lg-center"
                                    onClick={(e) => this.handleSort("start", 4, e)}>Ngày viết
                                    <a className="icon-sort">
                                        {(sort[4] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[4] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="10%" onClick={(e) => this.handleSort("total", 5, e)}>Số ngày
                                    <a className="icon-sort">
                                        {(sort[5] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[5] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="7%" onClick={(e) => this.handleSort("status", 6, e)}>Status
                                    <a className="icon-sort">
                                        {(sort[6] % 3 === 0) ? <i className="fa fa-sort"></i> :
                                            (sort[6] % 3 === 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                            </tr>
                            </thead>
                            <tbody>{
                                data.map((absence, index) =>
                                    < FormCard key={index} data={absence} permission={this.state.permission}
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

export default connect(mapStatetoProps)(AbsenceSend);
