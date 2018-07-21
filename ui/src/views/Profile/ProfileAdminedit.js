import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MyCaledar from "./tool/Caledar";
import proflieData from './tool/ProfileData'
 class ProfileAdminedit extends Component {

     constructor(props) {
         super(props);
         console.log("contructor");
         this.state = {

             user_id:'',
             full_name: '',
             phone_number:'',
             birth_date:'',
             address: '',
             gmail:'',
             job_title_id:'',
             job_position_id:'',
             status:'stt',
             time_join:'',
             gender:'',
             created_at:'',
             updated_at:'',
             created_by:'',
             updated_by:'',


             dd:123,
             mm:456,
             yy:789,


         }
         this.handleChange1 = this.handleChange1.bind(this);
         this.handleSubmit1 = this.handleSubmit1.bind(this);
     }

     handleChange(e) {
         this.setState({[e.target.name]: e.target.value});
     }




     handleChange1(event) {

         this.setState({gender: event.target.value});
     }

     handleSubmit1(event) {
         event.preventDefault();
     }

     onFormSubmit = (e) => {
         e.preventDefault()
         console.log(this.emailInputValue);
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
         + " " + this.state.gender);

     }

     getGender = (status) => {
         return status === 0 ? 'Nam' :
             status === 1 ? 'Nu' :
                 'Nam/nu'
     }

     render() {


        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)


        return (
            <div id={"thuonght_div_center7_20_2018"}>
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Tài Khoản</Label>
                    <Input
                        value={this.state.user_id}
                        onChange={(e) => this.handleChange(e)}
                        name="user_id"
                        innerRef={(node) => this.emailInputValue = node}
                        placeholder= {user.user_id} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Họ và Tên</Label>
                    <Input
                        value={this.state.full_name}
                        onChange={(e) => this.handleChange(e)}
                        name="full_name"
                        innerRef={(node) => this.emailInputValue = node}
                        placeholder= {user.full_name}


                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Số điện thoại</Label>
                    <Input
                        value={this.state.phone_number}
                        onChange={(e) => this.handleChange(e)}
                        name="phone_number"
                        innerRef={(node) => this.emailInputValue = node}
                        placeholder= {user.phone_number} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Ngày sinh</Label>
                    <MyCaledar   />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Địa chỉ</Label>
                    <Input
                        value={this.state.address}
                        onChange={(e) => this.handleChange(e)}
                        name="address"
                        innerRef={(node) => this.emailInputValue = node}
                        placeholder={user.address} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Gmail</Label>
                    <Input
                        value={this.state.gmail}
                        onChange={(e) => this.handleChange(e)}
                        name="gmail"
                        innerRef={(node) => this.emailInputValue = node}
                        placeholder= {user.Gmail} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Nghề nghiệp (job_title_id)</Label>
                    <Input
                        value={this.state.job_title_id}
                        onChange={(e) => this.handleChange(e)}
                        name="job_title_id"
                        innerRef={(node) => this.emailInputValue = node}

                        placeholder={user.job_title_id} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Bộ phận</Label>
                    <Input
                        value={this.state.job_position_id}
                        onChange={(e) => this.handleChange(e)}
                        name="job_position_id"
                        innerRef={(node) => this.emailInputValue = node}

                        placeholder= {user.job_position_id} />
                </FormGroup>

                <FormGroup>

                    <Label for="exampleEmail">Trạng thái(status)</Label>
                    <Input
                        value={this.state.status}
                        onChange={(e) => this.handleChange(e)}
                        name="status"
                        innerRef={(node) => this.emailInputValue = node}

                        placeholder= {user.status} />

                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Ngày vào làm</Label>
                    <MyCaledar
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
                        <option value={""}>{this.getGender(user.gender)} </option>
                        <option value={1}>Nam</option>
                        <option value={2}>Nu</option>
                        <option value={3}>Nam/Nam</option>
                        <option value={4}>Nữ/Nữ</option>

                    </Input>
                </FormGroup>


                <FormGroup>
                    <Label for="exampleEmail">Created_at</Label>
                    <Input disabled placeholder={user.created_at}/>
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Updated_at</Label>
                    <Input disabled placeholder={user.updated_at}/>
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Created_by</Label>
                    <Input disabled placeholder={user.created_by}/>
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Updated_by</Label>
                    <Input disabled placeholder={user.updated_by}/>
                </FormGroup>



                <Button id={"buttonsubmit"}>Submit</Button>

            </Form>
            </div>
        );
    }
}
export default ProfileAdminedit;