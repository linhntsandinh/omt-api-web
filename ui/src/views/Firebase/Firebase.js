import React, {Component} from 'react';
import firebase from '../../firebase_config'
import notify from './../../notification'
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


} from 'reactstrap';
import {connect} from "react-redux";
class Firebase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            sender: 'Đại',
            receiver: 'Quy',
            des: 'Xin nghỉ về ăn cưới bạn',
            path: 'https://www.facebook.com/vu.t.dai.56',
            status:false,
            choise: 'push',
            data: {},
            firebase:firebase.database().ref().child('/test/'+this.props.profile.username)
        }
        this.state.firebase.on('value', (vl) => {
            this.setState({
                data: vl.val()
            })
            // if (vl.val()) {
            //     for (var v in vl.val()['test']) {
            //         for (var l in vl.val()['test'][v]) {
            //             console.log(vl.val()['test'][[v]])
            //             console.log(vl.val()['test'][v][l]);
            //         }
            //     }
            // }
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeChoise(e) {
        this.setState({
            choise: e.target.value
        })
    }

    onUpdate() {
        if (this.state.choise === 'detele') {
            this.state.firebase.remove()
        }
        else {
            if (this.state.location != '') {
                this.state.firebase.child(this.state.location)[this.state.choise](new notify(this.state.sender, this.state.receiver, this.state.des, this.state.path,this.state.status));
            }
            else {
                this.state.firebase[this.state.choise](new notify(this.state.sender, this.state.receiver, this.state.des, this.state.path,this.state.status));
            }
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md="6">
                                Test Nofiy
                            </Col>
                            <Col md="4">
                                <Input value={this.state.choise} onChange={(e) => this.handleChangeChoise(e)}
                                       type="select"
                                       name="titleform" id="selectLg" bsSize="small">
                                    <option  value={'push'}>push</option>
                                    <option  value={'set'}>set</option>
                                    <option  value={'update'}>update</option>
                                    <option  value={'detele'}>detele</option>

                                </Input>

                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <p>Location</p> <Input value={this.state.location} name='location'
                                                   onChange={(e) => this.handleChange(e)}/>
                        </Row>
                        <Row>
                            <p>Sender</p> <Input value={this.state.sender} name='sender'
                                                 onChange={(e) => this.handleChange(e)}/>
                        </Row>
                        <Row>
                            <p>Receiver</p> <Input value={this.state.receiver} name='receiver'
                                                   onChange={(e) => this.handleChange(e)}/>
                        </Row>
                        <Row>
                            <p>Des</p> <Input value={this.state.des} name='des' onChange={(e) => this.handleChange(e)}/>
                        </Row>
                        <Row>
                            <p>Path</p> <Input value={this.state.path} name='path'
                                               onChange={(e) => this.handleChange(e)}/>
                        </Row><Row>
                            <p>Stattus</p> <Input value={this.state.status} name='status'
                                               onChange={(e) => this.handleChange(e)}/>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={(e) => this.onUpdate(e)}>Send</Button>
                    </CardFooter>

                </Card>
                <Card>
                    <p>{JSON.stringify(this.state.data)}</p>
                    {JSON.stringify(this.state.data)['dai']}
                </Card>

            </div>
        )
    }

}

function mapStatetoProps(state) {
    return {profile: state.profile}

}

export default connect(mapStatetoProps)(Firebase);
