import React, { Component}  from 'react';
import profileData from './tool/ProfileData';
import ProfileCard from './tool/ProfileCard';

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


}from 'reactstrap';


class Profiles extends Component {

    constructor(props) {
        super(props);
        console.log("contructor");

    }




    render() {
        console.log("render");
        const listProfile = profileData.filter((user)=> user.id<10)

        return (
            <div>

                <Row id={"idtable"}>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="7">
                                        <i className="fa fa-align-justify"></i> Danh sách
                                    </Col>
                                    <Col md="5">


                                    </Col>
                                </Row>

                            </CardHeader>
                            <CardBody>
                                <Table className="private-table" id={"tablemount"}responsive>
                                    <thead>
                                    <tr>
                                        <th  width="10%">Stt</th>
                                        <th  width="20%">Name</th>
                                        <th  width="10%">Phone</th>
                                        <th  width="10%">Gmail</th>
                                        <th  width="20%">Address</th>
                                        <th  width="10%">Join date</th>
                                        <th  width="10%">Gender</th>
                                        <th  width="10%">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        listProfile.map((user, index) =>
                                            < ProfileCard key={index} user={user}
                                                          stt={index+1}/>)
                                    }
                                    </tbody>
                                </Table>
                                <Pagination  >
                                    <PaginationItem>

                                    </PaginationItem>

                                    <PaginationItem>

                                    </PaginationItem>
                                </Pagination>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </div>
        )
    }
}
export default Profiles;