/**
 * Created by Vu Tien Dai on 29/06/2018.
 */
/**
 * Created by Vu Tien Dai on 27/06/2018.
 */
/**
 * Created by Vu Tien Dai on 25/06/2018.
 */
import React, {Component} from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import {getData, formEncode} from '../../DataUser'
function Optioncard(data) {
  let value = data.value.title;
  return (
    <option value={data.value.id}>{value}</option>
  )
}

function curentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds()
  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  var today1 = dd + '/' + mm + '/' + yyyy + '   ' + h + ':' + m + ':' + s;

  return today1;
}


class Absence extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title_form: [],
      receiver: [],
      titleform: '',
      username: getData('full_name'),
      job_position: '',
      job_title: '',
      today: '',
      from_date: '',
      from_time: '',
      to_date: '',
      to_time: '',
      reason: '',
      rec: '',
      ask: '',
      today: ''
    }

  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  Send(e) {
    console.log(this.state);
  }

  componentDidMount() {
    this.setState({
      today: curentDate()
    })
    fetch('https://daivt.000webhostapp.com/get_reason.php').then(function (response) {
        return response.json();
      }
    ).then((result) => {
      // console.log(result)
        this.setState({
          title_form: result
        })
      }
    )
    fetch('https://daivt.000webhostapp.com/get_job_title.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      body: formEncode({id: getData('job_title_id')}),
    }).then(function (response) {
        return response.json();
      }
    ).then((result) => {
        if (result) {
          this.setState({
            job_title: result[0]['title']
          })
        }
      }
    )
    fetch('https://daivt.000webhostapp.com/get_job_position.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      body: formEncode({id: getData('job_position_id')}),
    }).then(function (response) {
        return response.json();
      }
    ).then((result) => {
        if (result) {
          this.setState({
            job_position: result[0]['title']
          })
        }
      }
    )
    fetch('https://daivt.000webhostapp.com/get_receive.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      body: formEncode({id: getData('job_position_id')}),
    }).then(function (response) {
        return response.json();
      }
    ).then((result) => {
      // console.log(result)
        if (result) {
          this.setState({
            receiver: result
          })
        }
      }
    )
  }


  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Basic Form</strong> Elements
        </CardHeader>

        <CardBody>
          <Col >
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="select"><h3>Đơn xin</h3></Label>
                </Col>
                <Col xs="12" md="4">
                  <Input value={this.state.titleform} onChange={(e) => this.handleChange(e)} type="select"
                         name="titleform" id="selectLg" bsSize="small">
                    {this.state.title_form.map((value, index) =>
                      <Optioncard key={index} index={index} value={value}/>
                    )}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="select"><h5>Tôi tên là :</h5></Label>
                </Col>
                <Col>
                  <Label htmlFor="select">{this.state.username}</Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="select"><h5>Bộ phận :</h5></Label>
                </Col>
                <Col md="2">
                  <Label htmlFor="select">{this.state.job_title}</Label>
                </Col>
                <Col md="2">
                  <Label htmlFor="select"><h5>Chức vụ :</h5></Label>
                </Col>
                <Col md="2">
                  <Label htmlFor="select">{this.state.job_position}</Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="select"><h5>Hôm nay là ngày :</h5></Label>
                </Col>
                <Col>
                  <Label>{this.state.today}</Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="date-input">Từ :</Label>
                </Col>
                <Col xs="12" md="4">
                  <Input value={this.state.from_date} name="from_date" onChange={(e) => this.handleChange(e)}
                         type="date" placeholder="date"/>
                </Col>
                <Col xs="12" md="3">
                  <Input value={this.state.from_time} name="from_time" onChange={(e) => this.handleChange(e)}
                         type="time" placeholder="time"/>
                </Col>

              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="date-input">Đến :</Label>
                </Col>
                <Col xs="12" md="4">
                  <Input value={this.state.to_date} name="to_date" onChange={(e) => this.handleChange(e)} type="date"
                         placeholder="date"/>
                </Col>
                <Col xs="12" md="3">
                  <Input value={this.state.to_time} name="to_time" onChange={(e) => this.handleChange(e)} type="time"
                         placeholder="time"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="textarea-input">Lý Do</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input value={this.state.reason} onChange={(e) => this.handleChange(e)} type="textarea"
                         name="reason" id="textarea-input" rows="5"
                         placeholder="Content..."/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="select">Người nhận</Label>
                </Col>
                <Col xs="12" md="4">
                  <Input value={this.state.rec} onChange={(e) => this.handleChange(e)} type="select" name="rec"
                         id="selectLg" bsSize="small">
                    {this.state.receiver.map((value, index) =>
                      <Optioncard key={index} index={index} value={value}/>
                    )}
                  </Input>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </CardBody>
        <CardFooter>
          <Button onClick={(e) => this.Send(e)} type="submit" size="lg" color="primary"><i
            className="icon-cursor"></i> Send</Button>
          <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
        </CardFooter>
      </Card>

    )
  }
}
export default Absence;
