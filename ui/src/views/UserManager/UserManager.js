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
  Label
} from 'reactstrap';
import UserCard from "./UserCard"
import {formEncode} from '../../DataUser'
function Pagin(data) {
  let p = data.parent;
  let check = data.check;
  let pagin = data.pagin;
    console.log(data.index + " ahihi 1" + pagin);
    return (
    <PaginationItem >
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
class Users extends Component {
  constructor(props) {
    super(props);
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

    const data = [];
    for (let i = 0; i < Math.ceil(this.state.length / this.state.limit); i++) {
      if (i >= (this.state.pagin - 1) && i < this.state.pagin + 4 && data.length < 5)
        data.push(i);
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
                <th  width="5%">STT</th>
                <th width="10%" className="text-center"><i className="icon-people"></i></th>
                <th  width="20%">Họ và Tên</th>
                <th  width="10%"></th>
                <th  width="20%">Email</th>
                <th  width="10%" className="text-lg-center">Số điện thoại</th>
                <th  width="15%">Chuyên môn</th>
                <th  width="10%">Status</th>
              </tr>
              </thead>
              <tbody>{
                this.state.data.map((user, index) =>
                  < UserCard key={index} user={user} stt={index+(this.state.check-1)*this.state.limit+1}/>)}
              </tbody>
            </Table>
            <Pagination  >
              <PaginationItem>
                <PaginationLink previous tag="button" onClick={(e) => this.onLeft(e)}></PaginationLink>
              </PaginationItem>
              {
                data.map((value, index) =>
                  <Pagin key={index} index={index} parent={this} pagin={this.state.pagin} check={this.state.check}/>
                )
              }

              <PaginationItem>
                <PaginationLink next tag="button" onClick={(e) => this.onRight(e)}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
export default Users;
