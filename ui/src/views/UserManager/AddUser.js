import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
function Optioncard(data) {
    let value = data.value.title;
    return (
        <option value={data.value.id}>{value}</option>
    )
}
class AddUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        }
    }
    render(){
        return(
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Thêm tài khoản</h1>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Tài khoản" />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Password" />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Repeat password" />
                                    </InputGroup>
                                    <InputGroup className="mb-3">

                                    </InputGroup>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button block><span>Hủy</span></Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button  color='success' block><span>Hoàn thành</span></Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };


}
export default AddUser;