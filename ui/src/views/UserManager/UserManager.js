/**
 * Created by Vu Tien Dai on 27/06/2018.
 */
/**
 * Created by Vu Tien Dai on 25/06/2018.
 */
import React, {Component} from 'react';
import Select from 'react-select';
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
    Label
} from 'reactstrap';
import UserCard from "./UserCard"
import {formEncode} from '../../DataUser'

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

class Users extends Component {
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
            console.log("Dm");
            this.setState(
                {
                    check: this.state.check + 1
                }, function () {
                    this.getData();
                }
            )
            if (this.state.pagin + this.state.pagin_number-1 === this.state.check) {
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
        this.setState({[e.target.name]: e.target.value});
    }

    handleSearch(e) {
        this.setState({check: 1, pagin: 1}, function () {
            this.getData()
        });
    }

    handleChangeLimit(e) {
        // console.log(e)
        if (e) {
            let check = Math.ceil(((this.state.limit * this.state.check)-this.state.limit+1) / e.value);
            let pagin =Math.floor(((this.state.limit * this.state.check)-this.state.limit+1) / (e.value*this.state.pagin_number))*this.state.pagin_number+1 ;
            console.log(this.state.check+"  "+this.state.pagin)
            console.log(check+"  "+pagin)
            this.setState({limit: e.value, check: check, pagin: pagin}, function () {
                this.getData();
            });
        }
        else {
            this.setState({limit: 10, check: 1, pagin: 1}, function () {
                this.getData();
            });
        }
    }

    handleSort(name, i, e) {
        console.log(e.target.name);
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
        console.log(this.state.orderby + ":" + this.state.ordervalue)
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
                        {search ? <More pr={this}/> : null}
                    </CardHeader>

                    <CardBody>
                        <Table className="private-table" responsive>
                            <thead>
                            <tr className="header-table text-center">
                                <th  width="6%"
                                    onClick={(e) => this.handleSort("id", 0, e)}>STT
                                    <a className="icon-sort">
                                        {(sort[0] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                            (sort[0] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                                <i className="fa fa-sort-up"></i>
                                        }</a>
                                </th>
                                <th className=" text-center"  width="10%"><i className="icon-people"></i></th>
                                <th  width="15%"
                                    onClick={(e) => this.handleSort("full_name", 1, e)}>Họ và Tên
                                    <a className="icon-sort">
                                    {(sort[1] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                        (sort[1] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                            <i className="fa fa-sort-up"></i>
                                    }</a>
                                </th>
                                <th  width="10%"></th>
                                <th  width="20%"
                                    onClick={(e) => this.handleSort("email", 2, e)}>Email
                                    <a className="icon-sort">
                                    {(sort[2] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                        (sort[2] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                            <i className="fa fa-sort-up"></i>
                                    }</a>
                                </th>
                                <th className=" text-lg-center" width="15%"
                                    onClick={(e) => this.handleSort("phone_number", 3, e)}>Số điện thoại
                                    <a className="icon-sort">
                                    {(sort[3] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                        (sort[3] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                            <i className="fa fa-sort-up"></i>
                                    }</a>
                                </th>
                                <th  width="15%"
                                    onClick={(e) => this.handleSort("jpb_position", 4, e)}>Chuyên môn
                                    <a className="icon-sort">
                                    {(sort[4] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                        (sort[4] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                            <i className="fa fa-sort-up"></i>
                                    }</a>
                                </th>
                                <th  width="10%"
                                    onClick={(e) => this.handleSort("status", 5, e)}>Status
                                    <a className="icon-sort">
                                    {(sort[5] % 3 == 0) ? <i className="fa fa-sort"></i> :
                                        (sort[5] % 3 == 1) ? <i className="fa fa-sort-down"></i> :
                                            <i className="fa fa-sort-up"></i>
                                    }</a>
                                </th>
                            </tr>
                            </thead>
                            <tbody>{
                                data.map((user, index) =>
                                    < UserCard key={index} user={user}
                                               stt={index + (check - 1) * limit + 1}/>)}
                            </tbody>
                        </Table>
                        <Row>
                            <Col md="9">
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
                                <Select
                                    name="limit"
                                    value={limit}
                                    onChange={(e) => this.handleChangeLimit(e)}
                                    options={[
                                        {value: 10, label: '10'},
                                        {value: 20, label: '20'},
                                        {value: 30, label: '30'},
                                        {value: 40, label: '40'},
                                        {value: 50, label: '50'},
                                    ]}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default Users;
