import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {formEncode} from '../../DataUser'
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new Array()
    }
  }

  componentDidMount() {
    fetch("https://daivt.000webhostapp.com/get_user.php", {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      body: formEncode({id:this.props.match.params.id}),
    }).then(function (response) {
        return response.json();
      }
    ).then((result) => {
      this.setState({data:result});
      console.log(this.state.data);
      }

    )
  }
  render() {
    const user = this.state.data.find( user => user.user_id.toString() === this.props.match.params.id);

    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
console.log(userDetails);
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
                        userDetails.map(([key, value],index) => {
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

export default User ;
