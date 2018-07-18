


import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import proflieData from './ProfileData'

class Proflie extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                show: false
            };
    }
    render() {

        const user = proflieData.find( user => user.id.toString() === this.props.match.params.id)

        const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Card>

                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table  responsive striped hover>
                                    <tbody>
                                    {
                                        userDetails.map(([key, value]) => {
                                            return (
                                                <tr   onMouseEnter={(e) => {
                                                    if (this.state.show === false)
                                                        this.setState({show: true})
                                                }} onMouseLeave={(e) => {
                                                    if (this.state.show === true)
                                                        this.setState({show: false})
                                                }}>
                                                    <td>{`${key}:`}</td>
                                                    <td><strong>{value}</strong></td>
                                                    <td>
                                                        {this.state.show === true ?
                                                            <i  className="icon-trash" onClick={()=>{console.log("Xoa")}}/> : null}  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                                                        {this.state.show === true ?
                                                            <i  className="i icon-note" onClick={()=>{console.log("edit")}}/> : null}</td>
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

export default Proflie;
