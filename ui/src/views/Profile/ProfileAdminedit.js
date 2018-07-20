import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MyCaledar from "./tool/Caledar";
import proflieData from './tool/ProfileData'
 class ProfileAdminedit extends Component {

     onFormSubmit = (e) => {
         e.preventDefault()
         console.log(this.emailInputValue)
     }

    render() {

        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)


        return (
            <div id={"thuonght_div_center7_20_2018"}>
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Tài Khoản</Label>
                    <Input  placeholder= {user.user_id} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Họ và Tên</Label>
                    <Input innerRef={(node) => this.emailInputValue = node} placeholder= {user.full_name} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Số điện thoại</Label>
                    <Input  placeholder= {user.phone_number} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Ngày sinh</Label>
                    <MyCaledar/>
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Địa chỉ</Label>
                    <Input  placeholder={user.address} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Gamil</Label>
                    <Input  placeholder= {user.Gmail} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Nghề nghiệp (job_title_id)</Label>
                    <Input  placeholder={user.job_title_id} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Bộ phận</Label>
                    <Input  placeholder= {user.job_position_id} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Trạng thái(status)</Label>
                    <Input  placeholder= {user.status} />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Ngày vào làm</Label>
                    <MyCaledar />
                </FormGroup>



                <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Nam</option>
                        <option>Nu</option>
                        <option>Nam/Nam</option>
                        <option>Nữ/Nữ</option>

                    </Input>
                </FormGroup>


                <Button id={"buttonsubmit"}>Submit</Button>

            </Form>
            </div>
        );
    }
}
export default ProfileAdminedit;