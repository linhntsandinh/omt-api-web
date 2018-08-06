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
    Dropdown
} from 'reactstrap';
import firebase from '../../firebase_config'
import PropTypes from 'prop-types';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

import {logout} from '../../DataUser'
import {connect} from "react-redux";
import Buttons from "../../views/Buttons/Buttons";
import CardNoti from "./CardNoti";

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

    }
    componentDidMount(){
        this.state.firebase.on('value', (vl) => {
            this.setState({
                data: vl.val()
            })
        });
    }
    Logout() {
        this.props.dispatch({type:"logout",data: []});
        localStorage.clear();
    }

    setSeen = (e) => {
        console.log(e.target)
        // this.state.firebase.child(e.target.name).child('status').set(true);
    }

    render() {
        const {children, ...attributes} = this.props;
        const list_1 = [];
        const list_2 = [];
        var count = 0;

        if (this.state.data) {
            for (var v in this.state.data) {
                if (this.state.data[v]['status'] == false) {
                    list_1.push(
                      <CardNoti seen={false} key={v} data={v} parent={this}/>
                    )
                }
                else {
                    list_2.push(
                        <CardNoti seen={true}  key={v} data={v} parent={this}/>
                    )
                }
                if (this.state.data[v]['status'] == false) {
                    count++;
                }
            }
        }
        list_1.push(
            <DropdownItem className={"label-icon"} disabled key={"label"}
                          style={{backgroundColor: "#f3f3f3", padding: "0.35em"}}>
                MỚI
            </DropdownItem>)
        list_2.push(
            <DropdownItem className={"label-icon"} disabled key={"label"}
                          style={{backgroundColor: "#f3f3f3", padding: "0.35em"}}>
                TRƯỚC ĐÓ
            </DropdownItem>)
        list_1.reverse();
        list_2.reverse();
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
                    <AppHeaderDropdown  direction="down">
                        <DropdownToggle  nav>
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
                                    {
                                        list_1
                                    }
                                    {
                                        list_2
                                    }
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

