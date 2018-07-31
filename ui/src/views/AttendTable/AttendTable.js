/**
 * Created by Vu Tien Dai on 27/06/2018.
 */
/**
 * Created by Vu Tien Dai on 25/06/2018.
 */
import React, {Component} from 'react';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ButtonDropdown,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Row,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import Select from 'react-select';
import AttendCard from "./AttendCard"
import {formEncode} from '../../DataUser'

const list_limit=[10,20,30,40,50]
function Optioncard(data) {
    let value = data.value;
    return (
        <option value={value}>{value}</option>
    )
}
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
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Team
                                    </InputGroupText>
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Ngày
                                    </InputGroupText>
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search">
                                        Status
                                    </InputGroupText>
                                </Row>

                            </Col>
                            <Col md="8">
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="team"
                                               value={props.data.state.team}
                                               onChange={(e) => props.data.handleChange(e)}
                                               onKeyPress={(ev, e) => {
                                                   if (ev.key === 'Enter') {
                                                       document.getElementById("btn-search").click();
                                                       ev.preventDefault();
                                                   }
                                               }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input className="lable_search" name="date"
                                               value={props.data.state.date}
                                               onChange={(e) => props.data.handleChange(e)} onKeyPress={(ev, e) => {
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input value={props.data.state.status} name="status"
                                               onChange={(e) => props.data.handleChange(e)}
                                               onKeyPress={(ev, e) => {
                                                   if (ev.key === 'Enter') {
                                                       document.getElementById("btn-search").click();
                                                       ev.preventDefault();
                                                   }
                                               }}
                                        />
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

class AttendTable extends Component {
    constructor(props) {
        super(props);
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
            pagin: 1,
            check: 1,
            pagin_number: 8

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
                    limit: this.state.limit,
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
                    limit: this.state.limit,
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

    onLeft() {
        if (this.state.check > 1 && this.state.pagin !== this.state.check) {
            this.setState(
                {check: this.state.check - 1}, function () {
                    this.getData();
                }
            )

        }
        else if (this.state.check > 1 && this.state.pagin === this.state.check) {
            this.setState(
                {
                    pagin: this.state.pagin - this.state.pagin_number,
                    check: this.state.check - 1
                }, function () {
                    this.getData()
                }
            )
        }
    }

    onRight() {
        if (this.state.check < Math.ceil(this.state.length / this.state.limit)) {
            this.setState(
                {
                    check: this.state.check + 1
                }, function () {
                    this.getData();
                }
            )
            if (this.state.pagin + this.state.pagin_number - 1 === this.state.check) {
                this.setState(
                    {
                        pagin: this.state.pagin + this.state.pagin_number,
                    }
                )
            }

        }

    }

    handleClick(value) {
        this.setState({
            check: value
        }, function () {
            this.getData();
        })

    }

    handleChange(e) {
        // console.log(e.target.name)
        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeLimit(e) {
        if (e) {
            let check = Math.ceil(((this.state.limit * this.state.check) - this.state.limit + 1) / e.target.value);
            let pagin = Math.floor(((this.state.limit * this.state.check) - this.state.limit + 1) / (e.target.value * this.state.pagin_number)) * this.state.pagin_number + 1;
            this.setState({limit: e.target.value, check: check, pagin: pagin}, function () {
                this.getData();
            });
            localStorage.setItem('limit', e.target.value);

        }
        else {
            this.setState({limit: 10, check: 1, pagin: 1}, function () {
                this.getData();
            });
            localStorage.setItem('limit', 10);

        }
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
        // console.log(this.state.orderby + ":" + this.state.ordervalue)
    }

    render() {
        const {
            check, data, username, length, limit, pagin, search, sort, pagin_number
        } = this.state
        const data_pagin = [];
        for (let i = 0; i < Math.ceil(length / limit); i++) {
            if (i >= (pagin - 1) && i < pagin + pagin_number - 1 && data_pagin.length < pagin_number)
                data_pagin.push(i);
        }
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
                        {search ? <More data={this}/> : null}
                    </CardHeader>

                    <CardBody>
                        <Table bordered responsive className="private-table">
                            <thead>
                            <tr className="header-table text-center">
                                <th width="6%" name="id"
                                    onClick={(e) => this.handleSort("id", 0, e)}>STT
                                    <a className="icon-sort">
                                        {(sort[0] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[0] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="15%" onClick={(e) => this.handleSort("username", 1, e)}>Họ và Tên
                                    <a className="icon-sort">
                                        {(sort[1] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[1] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="15%" onClick={(e) => this.handleSort("team", 2, e)}>Team
                                    <a className="icon-sort">
                                        {(sort[2] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[2] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="13%" onClick={(e) => this.handleSort("check_in", 3, e)}>Time Check in
                                    <a className="icon-sort">
                                        {(sort[3] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[3] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="13%" className="text-lg-center"
                                    onClick={(e) => this.handleSort("check_out", 4, e)}>Time Check out
                                    <a className="icon-sort">
                                        {(sort[4] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[4] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="10%" onClick={(e) => this.handleSort("date", 5, e)}>Ngày
                                    <a className="icon-sort">
                                        {(sort[5] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[5] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th width="7%" onClick={(e) => this.handleSort("status", 6, e)}>Status
                                    <a className="icon-sort">
                                        {(sort[6] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[6] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                            </tr>
                            </thead>
                            <tbody>{
                                data.map((attend, index) =>
                                    < AttendCard key={index} attend={attend}
                                                 stt={index + (check - 1) * limit + 1}/>)}
                            </tbody>
                        </Table>
                        <Row>
                            <Col md="11">
                                <Pagination>
                                    <PaginationItem>
                                        <PaginationLink previous tag="button"
                                                        onClick={(e) => this.onLeft(e)}></PaginationLink>
                                    </PaginationItem>
                                    {
                                        data_pagin.map((value, index) =>
                                            <Pagin key={index} index={index} parent={this} pagin={pagin}
                                                   check={check}/>
                                        )
                                    }
                                    <PaginationItem>
                                        <PaginationLink next tag="button"
                                                        onClick={(e) => this.onRight(e)}></PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </Col>
                            <Col>
                                <Input value={limit} onChange={(e) => this.handleChangeLimit(e)}
                                       type="select"
                                       name="titleform" id="selectLg" bsSize="small">
                                    {list_limit.map((value, index) =>
                                        <Optioncard key={index} index={index} value={value}/>
                                    )}
                                </Input>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default AttendTable;
