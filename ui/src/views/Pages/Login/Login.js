import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import {formEncode} from '../../../DataUser'
class Login extends Component {
    constructor(props) {
        super(props)

        this.state={
            username:'',
            password:''
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleClick(pop,e) {
        fetch("https://daivt.000webhostapp.com/login.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode({user:this.state.username,pass:this.state.password}),
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson){
                localStorage.setItem('data',JSON.stringify(responseJson));
                localStorage.setItem('Login','false')
                pop.parent.HandleChange();
                console.log(responseJson)
            }})
        const {history} = this.props.props;
        // history.push('/dashboard');
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={(e)=>this.handleChange(e)} name="username" type="text" placeholder="Username"/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={(e)=>this.handleChange(e)} name="password" type="password" placeholder="Password"/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4"
                                                        onClick={(e) => this.handleClick(this.props,e)}>Login</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0">Forgot password?</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut
                                                labore et dolore magna aliqua.</p>
                                            <Button color="primary" className="mt-3" active>Register Now!</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
