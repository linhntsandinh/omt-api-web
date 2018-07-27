import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {formEncode} from '../../DataUser'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new Array()
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        fetch("https://daivt.000webhostapp.com/get_user.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: formEncode({id: this.props.match.params.id}),
        }).then(function (response) {
                console.log ("response 1: " + response);
                return response.json();
            }
        ).then((result) => {
                console.log("setState")
                this.setState({data: result});
                console.log( "result "+this.state.data);
            }
        )
        console.log("end component");

    }

    render() {
        console.log("render 1: " + this.state.data);
        const user = this.state.data.find(user => user.user_id.toString() === this.props.match.params.id);
        console.log("render 2: " + user);
        const userDetails = user ? Object.entries(user) : [['id', (
            <span><i className="text-muted icon-ban"></i> Not found</span>)]]
        console.log("render 3: " + userDetails);
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={5}>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                    {

                                        userDetails.map(([key, value], index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{`${key}:`}</td>
                                                    <td><strong>{value}</strong></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default User;
