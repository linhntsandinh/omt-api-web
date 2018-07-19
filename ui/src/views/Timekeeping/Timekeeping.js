import usersData from './UsersData'
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
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


}from 'reactstrap';
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
                                    <InputGroupText className="lable_search" >
                                        Email
                                    </InputGroupText >
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search" >
                                        Số điện thoại
                                    </InputGroupText >
                                </Row>
                                <Row>
                                    <InputGroupText className="lable_search"  >
                                        Chuyên môn
                                    </InputGroupText>
                                </Row>
                            </Col>
                            <Col >
                                <Row>
                                    <Col >
                                        <Input className="lable_search" name ="email" value={data.pr.state.email} onChange={(e)=>data.pr.handleChange(e)}  onKeyPress={(ev, e) => {
                                            console.log(`Pressed keyCode ${ev.key}`);
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Input className="lable_search" name ="phone_number" value={data.pr.state.phone_number} onChange={(e)=>data.pr.handleChange(e)}   onKeyPress={(ev, e) => {
                                            console.log(`Pressed keyCode ${ev.key}`);
                                            if (ev.key === 'Enter') {
                                                document.getElementById("btn-search").click();
                                                ev.preventDefault();
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Input className="lable_search" name ="job_position" value={data.pr.state.job_position} onChange={(e)=>data.pr.handleChange(e)}  onKeyPress={(ev, e) => {
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
    const user =  props.user
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
            <th><img src={"assets/img/avatars/2.jpg" } className={"img-avatar"} id={"idavataUser1"} /></th>
            <th scope="row"><a href={userLink}>{user.id}</a></th>
            <td><a href={userLink}>{user.name}</a></td>
            <td>
                {user.show === true ?
                    <i  className="icon-trash" onClick={()=>{console.log("Xoa nha")}}/> : null}  &nbsp;  &nbsp;
                {user.show === true ?
                    <i  className="i icon-note" onClick={()=>{console.log("Fix nha")}}/> : null}</td>
            <td>{user.team}</td>
            <td>{user.timecheckin}</td>
            <td>{user.timecheckout}</td>
            <td><Badge href={userLink} >{user.date}</Badge></td>
        </tr>
    )
}

class Timekeeping extends Component {

    constructor(props) {
        super(props);
        console.log("contructor");
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

    getData(check) {
        console.log("getData");
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
                    offset: ((check - 1) * this.state.limit)
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

    getLength() {
        fetch('https://daivt.000webhostapp.com/get_lengthprofile.php', {}).then(function (response) {
                return response.json();
            }
        ).then((result) => {
                this.setState({length: result[0]['count']});
                console.log(result[0]['count']);
            }
        )
    }

    onLeft() {
        if (this.state.check > 1 && this.state.pagin !== this.state.check) {
            this.setState(
                {check: this.state.check - 1}
            )
            this.getData(this.state.check - 1);
        }
        else if (this.state.check > 1 && this.state.pagin === this.state.check) {
            this.setState(
                {
                    pagin: this.state.pagin - 5,
                    check: this.state.check - 1
                }
            )
            this.getData(this.state.check - 1);
        }
    }

    onRight() {

        if (this.state.check < Math.ceil(this.state.length / this.state.limit)) {
            console.log("Dm");
            this.setState(
                {check: this.state.check + 1}
            )
            if (this.state.pagin + 4 === this.state.check) {
                this.setState(
                    {
                        pagin: this.state.pagin + 5,
                    }
                )
            }
            this.getData(this.state.check + 1);
        }

    }

    handleClick(value) {
        this.setState({
            check: value
        })
        this.getData(value);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSearch(e) {
        this.getData(1);
        this.setState({check :1,pagin:1});
    }

  render() {
        console.log("render");
      const {
          check, data, full_name, length, limit, pagin, search, sort, orderby, ordervalue
      } = this.state
      const userList = usersData.filter((user) => user.id < 10)
      const data_pagin = [];
      for (let i = 0; i < Math.ceil(this.state.length / this.state.limit); i++) {
          if (i >= (this.state.pagin - 1) && i < this.state.pagin + 4 && data_pagin.length < 5)
              data_pagin.push(i);
      }
    // this.componentDidMount();
    // console.log(this.state.data);
    return (
        <div>
      <div className="card">
        <div className="card-body">
          <Row>
            <Col md="4">
              <Row>
                <div size="sm" className=" text-center card-body">
                  <img src={'assets/img/avatars/img_avatar2.png'} className="main-avatar img-avatar" id={"idavata"} ></img>
                </div>
              </Row>
              <Row className="btn-tk ">
                <div className=" text-center card-body">
                <Button className="btn-timekeeping" color="success" size="lg" onClick={()=>{}}   id={"idbuton"}>Chấm công</Button>
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
                  events={[]}
                  defaultDate = {new Date()}
              />
            </Col>
          </Row>



        </div>

      </div>
            <Row id={"idtable"}>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="7">
                                    <i className="fa fa-align-justify"></i> Danh sách
                                </Col>
                                <Col md="5">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend" disabled  ><Button >
                                            <i className="fa fa-search"></i>
                                        </Button></InputGroupAddon>
                                        <Input value={this.state.full_name} onChange={(e) => this.handleChange(e)} type="text"
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
                                                if(this.state.search===true){
                                                    this.setState({email:'',phone_number:'',job_title:'',job_position:''})
                                                }
                                                this.setState({search: !this.state.search})
                                            }} color="info"><i
                                                className="fa fa-plus"></i></Button>
                                        </InputGroupAddon>
                                    </InputGroup>

                                </Col>
                            </Row>
                            { this.state.search ? <More pr={this}/> : null }
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th  width="5%">Stt</th>


                                    <th  width="20%">Name</th>

                                    <th  width="10%">Team</th>
                                    <th  width="12.5%">Time checkin</th>
                                    <th  width="10%"></th>
                                    <th  width="12.5%">Time checkout</th>
                                    <th  width="10%"></th>
                                    <th  width="10%">Date</th>
                                    <th  width="10%">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userList.map((user, index) =>
                                        < UserCard key={index} user={user}
                                                   stt={index + (check - 1) * limit + 1}/>)
                                }
                                </tbody>
                            </Table>
                            <Pagination  >
                                <PaginationItem>
                                    <PaginationLink previous tag="button" onClick={(e) => this.onLeft(e)}></PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink next tag="button" onClick={(e) => this.onRight(e)}></PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>

            </Row>


        </div>
    )
  }
}
export default Timekeeping;
