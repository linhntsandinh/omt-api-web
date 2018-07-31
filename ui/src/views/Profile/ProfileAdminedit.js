import React, {Component} from 'react';
import { Button, Col, Row, Form, FormGroup, Label, InputGroup, Input, FormText,Card,CardHeader,CardBody } from 'reactstrap';
import MyCaledar from "./tool/Caledar";
import proflieData from './tool/ProfileData'
 class ProfileAdminedit extends Component {

     constructor(props) {
         super(props)
         this.state =
             {
                 id:'',
                 user_id:'',
                 full_name:'',
                 phone_number:'',
                 birth_date:'',
                 address:'',
                 departmenti_id:'',
                 job_title_id:'',
                 job_position_id:'',
                 status:'',
                 join_date:'',
                 gender:'',
                 job_position:'',
                 job_title:'',

                 created_at:'',
                 updated_at:'',
                 created_by:'',
                 updated_by:''
             };
     }



     componentDidMount() {
         const ul = "/profile/info/"+this.props.match.params.id;


         fetch(ul, {
             method: 'GET',
         }).then((response) =>
             response.json())
             .then((responseJson) => {


                console.log(responseJson.status + "  kq" + JSON.stringify(responseJson))
                 if (responseJson.status === "OK") {

                     const profile = {
                         id: responseJson.profile.id,
                         full_name: responseJson.profile.full_name,
                         phone_number: responseJson.profile.phone_number,
                         birth_date: responseJson.profile.birth_date,
                         address: responseJson.profile.address,
                         departmenti_id: responseJson.profile.departmenti_id,
                         job_title_id: responseJson.profile.job_title_id,
                         job_position_id: responseJson.profile.job_position_id,
                         status: responseJson.profile.status,
                         join_date: responseJson.profile.join_date,
                         gender: responseJson.profile.gender,
                         job_position: responseJson.job_position.title,
                         job_title: responseJson.job_title.title,
                         created_at: responseJson.profile.created_at,
                         updated_at: responseJson.profile.updated_at,
                         created_by: responseJson.profile.created_by,
                         updated_by: responseJson.profile.updated_by

                     };

                     this.setState(profile)
                 }
             })


     }








     handleChange(e) {
         this.setState({[e.target.name]: e.target.value});

         this.handleSubmit1 = this.handleSubmit1.bind(this);}




     handleChange1(event) {
         this.handleChange1 = this.handleChange1.bind(this);
         this.setState({gender: event.target.value});
     }

     handleChang2(event) {

         this.setState({[event.target.name]: event.target.value});
         alert(   event.target.value);

     }

     handleSubmit1(event) {
         event.preventDefault();
     }

     onFormSubmit = (e) => {
         e.preventDefault()

         console.log(this.state.user_id+ " " +
             this.state.full_name + " " +
         this.state.phone_number
         + " " + this.state.birth_date
         + " " + this.state.address
         + " " + this.state.gmail
         + " " + this.state.job_title_id
         + " " + this.state.job_position_id
         + " " + this.state.status
         + " " + this.state.time_join
         + " " + this.state.gender
         + " " + this.state.dd
         + " " + this.state.mm
         + " " + this.state.yy);

     }

     getGender = (status) => {
         return status === 0 ? 'Nam' :
             status === 1 ? 'Nu' :
                 'Nam/nu'
     }

     render() {

        const permit = "admin";
        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)

         if (permit==="admins"){
            return (
                <div className="animated fadeIn">
                    <Row>
                        <Col lg={6}>
                            <Card>

                                <CardHeader>
                                    <Row>
                                        <Col md="7">
                                            <i className="fa fa-align-justify"></i> Thông tin
                                        </Col>
                                        <Col md="5">
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <Row >
                                    <Col  md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Tài khoản</label></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p disabled>{this.state.id}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={"6"} className={"Colabcprofile1"} ><label  className={"lableabc"} >Họ và Tên</label></Col>
                                    <Col md={"6"}>
                                        <InputGroup >
                                            <p >{this.state.full_name}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={"6"} className={"Colabcprofile1"}>
                                        <p  className={"lableabc"}>Số điện thoại</p>
                                    </Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p >{this.state.phone_number} </p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col  md={"6"} className={"Colabcprofile1"}>
                                        <p  className={"lableabc"}>Ngày sinh</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.birth_date}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>Địa chỉ</label></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{ this.state.address } </p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={"6"} className={"Colabcprofile1"}><label  className={"lableabc"}>departmenti_id</label></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{ this.state.departmenti_id }</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Chức vụ(job title)</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{ this.state.job_title }</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Chức vụ (job position)</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.job_position} </p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Trạng thái(status)</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.status}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p  className={"lableabc"}>Ngày vào làm</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.join_date}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p className={"lableabc"}>Giới Tính</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.gender}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p className={"lableabc"}>Created_at</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.created_at}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p className={"lableabc"}>Update_at</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.updated_at}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p className={"lableabc"}>Created_by</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.created_by}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row> <Col md={"6"} className={"Colabcprofile1"}>
                                    <p className={"lableabc"}>Updated_by</p></Col>
                                    <Col md={"6"}>
                                        <InputGroup>
                                            <p>{this.state.updated_by}</p>
                                        </InputGroup>
                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                    </Row>

                </div>
            );
         }
         else {
             return (
                 <Card>
                     <CardBody>
                         <div id={"thuonght_div_center7_20_2018"}>
                             <Form onSubmit={this.onFormSubmit}>
                                 <FormGroup>
                                     <Label for="exampleEmail">Tài Khoản</Label>
                                     <Input
                                         value={this.state.user_id}
                                         onChange={(e) => this.handleChange(e)}
                                         name="user_id"
                                         innerRef={(node) => this.emailInputValue = node}
                                         placeholder={""}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Họ và Tên</Label>
                                     <Input
                                         value={this.state.full_name}
                                         onChange={(e) => this.handleChange(e)}
                                         name="full_name"
                                         innerRef={(node) => this.emailInputValue = node}
                                         placeholder={this.state.full_name}


                                     />
                                 </FormGroup>
                                 <FormGroup>
                                     <Label for="exampleEmail">Số điện thoại</Label>
                                     <Input
                                         value={this.state.phone_number}
                                         onChange={(e) => this.handleChange(e)}
                                         name="phone_number"
                                         innerRef={(node) => this.emailInputValue = node}
                                         placeholder={this.state.phone_number}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Ngày sinh</Label>
                                     <MyCaledar
                                         onChange={(e) => this.handleChang2(e)}
                                         dd={this.state.dd}
                                         mm={this.state.mm}
                                         yy={this.state.yy}

                                     />
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Địa chỉ</Label>
                                     <Input
                                         value={this.state.address}
                                         onChange={(e) => this.handleChange(e)}
                                         name="address"
                                         innerRef={(node) => this.emailInputValue = node}
                                         placeholder={this.state.address}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Gmail</Label>
                                     <Input
                                         value={this.state.gmail}
                                         onChange={(e) => this.handleChange(e)}
                                         name="gmail"
                                         innerRef={(node) => this.emailInputValue = node}
                                         placeholder={user.Gmail}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Nghề nghiệp (job_title_id)</Label>
                                     <Input
                                         value={this.state.job_title_id}
                                         onChange={(e) => this.handleChange(e)}
                                         name="job_title_id"
                                         innerRef={(node) => this.emailInputValue = node}

                                         placeholder={user.job_title_id}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Bộ phận</Label>
                                     <Input
                                         value={this.state.job_position_id}
                                         onChange={(e) => this.handleChange(e)}
                                         name="job_position_id"
                                         innerRef={(node) => this.emailInputValue = node}

                                         placeholder={user.job_position_id}/>
                                 </FormGroup>

                                 <FormGroup>

                                     <Label for="exampleEmail">Trạng thái(status)</Label>
                                     <Input
                                         value={this.state.status}
                                         onChange={(e) => this.handleChange(e)}
                                         name="status"
                                         innerRef={(node) => this.emailInputValue = node}

                                         placeholder={this.state.status}/>

                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Ngày vào làm</Label>
                                     <MyCaledar
                                         onChange={(e) => this.handleChang2(e)}
                                         dd={this.state.dd}
                                         mm={this.state.mm}
                                         yy={this.state.yy}
                                     />
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleSelect">Giới tính</Label>
                                     <Input
                                         value={this.state.gender}
                                         onChange={(e) => this.handleChange1(e)}
                                         name="gender"
                                         innerRef={(node) => this.emailInputValue = node}

                                         type="select" name="select" id="exampleSelect">
                                         <option value={""}>{this.getGender(this.state.gender)} </option>
                                         <option value={1}>Nam</option>
                                         <option value={2}>Nu</option>
                                         <option value={3}>Nam/Nam</option>
                                         <option value={4}>Nữ/Nữ</option>

                                     </Input>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Created_at</Label>
                                     <Input disabled placeholder={this.state.created_at}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Updated_at</Label>
                                     <Input disabled placeholder={this.state.updated_at}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Created_by</Label>
                                     <Input disabled placeholder={this.state.created_by}/>
                                 </FormGroup>

                                 <FormGroup>
                                     <Label for="exampleEmail">Updated_by</Label>
                                     <Input disabled placeholder={this.state.updated_by}/>
                                 </FormGroup>


                                 <Button id={"buttonsubmit"}>Submit</Button>

                             </Form>
                         </div>
                     </CardBody>
                 </Card>
             );
         }
    }
}
export default ProfileAdminedit;