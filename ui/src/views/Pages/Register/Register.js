import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import {formEncode} from "../../../DataUser";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            rep_password: '',
            email: '',
            avatar: 'default',
            holidayRemaining: 12,
            status: 1


        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    Register() {
        if (this.state.password === this.state.rep_password) {
            fetch('http://localhost:9000/user/insert', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        avatar: this.state.avatar,
                        holidayRemaining: this.state.holidayRemaining,
                        status: this.state.status
                    }
                )

            }).then(function (response) {
                console.log(response)
                    return response.json();
                }
            ).then((result) => {
                    console.log(result)
                }
            )
        }
        else {
            alert("sai con me no roi")
        }
    }


    render() {
        const {avatar, email, holidayRemaining, password, status, rep_password, username} = this.state;
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Username" value={username} name={"username"}
                                               onChange={(e) => this.handleChange(e)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Email" value={email} name={"email"}
                                               onChange={(e) => this.handleChange(e)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Password" value={password} name={"password"}
                                               onChange={(e) => this.handleChange(e)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Repeat password" value={rep_password}
                                               name={"rep_password"} onChange={(e) => this.handleChange(e)}/>
                                    </InputGroup>
                                    <Button color="success" block onClick={(e)=>this.Register(e)}>Create Account</Button>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-facebook" block><span>facebook</span></Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-twitter" block><span>twitter</span></Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Register;
