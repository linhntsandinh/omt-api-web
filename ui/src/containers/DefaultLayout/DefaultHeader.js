import React, {Component} from 'react';
import {
    Row,
    Table,
    Col,
    Card,
    CardBody,
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Label,
    NavItem,
    NavLink,
} from 'reactstrap';
import firebase from '../../firebase_config'
import PropTypes from 'prop-types';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

import {logout} from '../../DataUser'
import {connect} from "react-redux";
import Buttons from "../../views/Buttons/Buttons";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            firebase: firebase.database().ref('/test/' + this.props.profile['username'])
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

    Logout() {
        this.props.dispatch({type: "logout", data: []});
        localStorage.clear();
    }
    setSeen=(e)=>{
        console.log(e.target)
        // this.state.firebase.child(e.target.name).child('status').set(true);
    }
    render() {
        const {children, ...attributes} = this.props;
        const list_1 = [];
        const list_2 = [];
        var count = 0;
        list_1.push(<tr className={"label-icon"} disabled  key={"label"}>
            <td style={{backgroundColor:"#f3f3f3",padding:"0.35em"}}>
               MỚI
            </td>
        </tr>)
        list_2.push(<tr className={"label-icon"} disabled key={"label"}>
            <td style={{backgroundColor:"#f3f3f3",padding:"0.35em"}}>
                TRƯỚC ĐÓ
            </td>
        </tr>)
        if (this.state.data) {
            for (var v in this.state.data) {
                if (this.state.data[v]['status'] == false) {
                    list_1.push(
                        <tr  namez={v}  key={v} onClick={this.setSeen}>
                            <td>
                                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", width: 70}}
                                    // href={this.state.data['test'][v]['path']}
                                   >
                                    <Row >
                                        <Col md={"2"}> <img src={'assets/img/avatars/6.jpg'} className="img-avatar"
                                                            alt="admin@bootstrapmaster.com"/>
                                        </Col>
                                        <Col md={"8"}>
                                            <strong>{this.state.data[v]['sender']}</strong>    &nbsp;
                                            <span>{this.state.data[v]['des']}</span>
                                        </Col>
                                        <Col md={"2"}>
                                            <Badge color="info">42</Badge>
                                        </Col>
                                    </Row>
                                </a>
                            </td>
                        </tr>
                    )
                }
                else {
                    list_2.push(
                        <tr key={v}>
                            <td>
                                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", width: 70}}
                                    // href={this.state.data['test'][v]['path']}
                                   onClick={() => {
                                       console.log(v)
                                       this.state.firebase.child(v).child('status').set(true);
                                   }}>
                                    <Row>
                                        <Col md={"2"}> <img src={'assets/img/avatars/6.jpg'} className="img-avatar"
                                                            alt="admin@bootstrapmaster.com"/>
                                        </Col>
                                        <Col md={"8"}>
                                            <strong>{this.state.data[v]['sender']}</strong>    &nbsp;
                                            <span>{this.state.data[v]['des']}</span>
                                        </Col>
                                        <Col md={"2"}>
                                            <Badge color="info">42</Badge>
                                        </Col>
                                    </Row>
                                </a>
                            </td>
                        </tr>
                    )
                }
                console.log(v)
                if (this.state.data[v]['status'] == false) {
                    count++;
                }
            }
        }
        // eslint-disable-next-line
        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <AppNavbarBrand
                    full={{src: logo, width: 89, height: 25, alt: 'CoreUI Logo'}}
                    minimized={{src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo'}}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg"/>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="/">Dashboard</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="#/users">Users</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="#">Settings</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <i className="icon-bell"></i><Badge pill color="danger">{count > 0 ? count : null}</Badge>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem header className={"noti-header"}><strong>Thông báo</strong></DropdownItem>
                            <div className={"noti-view"}
                                 style={{
                                     width: "430px",
                                     height: "450px",
                                     overflowY: "auto",
                                     overflowX: "hidden"
                                 }}

                            >
                                <Table className="noti-table">
                                    <tbody style={{width: 430, height: 450}}>
                                    {
                                        list_1
                                    }
                                    {
                                        list_2
                                    }
                                    </tbody>
                                </Table>
                            </div>
                            <DropdownItem header className={"noti-header text-center"}>
                                <a href={""}>Xem thêm</a>
                            </DropdownItem>
                        </DropdownMenu>

                    </AppHeaderDropdown>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-list"></i></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
                    </NavItem>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img src={'assets/img/avatars/6.jpg'} className="img-avatar"
                                 alt="admin@bootstrapmaster.com"/>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem header tag="div"
                                          className="text-center"><strong>Account</strong></DropdownItem>
                            <DropdownItem><img src={'assets/img/avatars/6.jpg'} className="img-avatar"
                                               alt="admin@bootstrapmaster.com"/>
                                Updates<Badge
                                    color="info">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge
                                color="danger">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-comments"></i> Comments<Badge
                                color="warning">42</Badge></DropdownItem>
                            <DropdownItem header tag="div"
                                          className="text-center"><strong>Settings</strong></DropdownItem>
                            <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                            <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                            <DropdownItem><i className="fa fa-usd"></i> Payments<Badge
                                color="secondary">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-file"></i> Projects<Badge
                                color="primary">42</Badge></DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                            <DropdownItem onClick={(e) => {
                                this.Logout(e)
                            }}><i
                                className="fa fa-lock"></i> Logout</DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
                <AppAsideToggler className="d-md-down-none"/>
                <AppAsideToggler className="d-lg-none" mobile/>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStatetoProps(state) {
    return {isLogin: state.isLogin, profile: state.profile}

}

export default connect(mapStatetoProps)(DefaultHeader);

