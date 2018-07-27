import React, {Component} from 'react';
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
import ButtonDropdowns from "../../views/Buttons/ButtonDropdowns";

class CardNoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true,
            act: false,
            icon: '',
            title: ''
        }

    }

    componentDidMount() {
        if (this.props.seen === true) {
            this.setState({icon: 'fa fa-dot-circle-o', title: 'Đánh dấu chưa đọc'})

        }
        else {
            this.setState({icon: 'fa fa-circle-o', title: 'Đánh dấu đã đọc'})
        }
    }

    setSeen = (props, e) => {
        if (props.seen != true) {
            props.parent.state.firebase.child(props.data).child('status').set(true);
        }
    }

    render() {
        return (
            <DropdownItem disabled={this.state.act} active={this.state.act} toggle={this.state.toggle} tag="div"
                name={this.props.data}>
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", width: 70, color: "black"}}
                   href={this.props.parent.state.data[this.props.data]['path']}
                >
                    <Row>
                        <Col md={"2"} onClick={(e) => this.setSeen(this.props, e)}> <img
                            src={'assets/img/avatars/6.jpg'} className="img-avatar"
                            alt="admin@bootstrapmaster.com"/>
                        </Col>
                        <Col md={"8"} onClick={(e) => this.setSeen(this.props, e)}>
                            <strong>{this.props.parent.state.data[this.props.data]['sender']}</strong>    &nbsp;
                            <span>{this.props.parent.state.data[this.props.data]['des']}</span>
                        </Col>
                        <Col md={"2"}>
                            <div>
                                <ul className={"setting-noti"}>
                                    <li title={"Ẩn thông báo này"} style={{listStyle: "none"}}>
                                        <i className={"fa fa-trash"} onMouseEnter={() => {
                                            this.setState({
                                                toggle: false,
                                                act: true
                                            })

                                        }} onMouseLeave={() => {
                                            this.setState({
                                                toggle: true,
                                                act: false
                                            })

                                        }}
                                           onClick={() => {
                                               if (window.confirm("Bạn muốn xóa chứ ?")) {
                                                   this.props.parent.state.firebase.child(this.props.data).remove();
                                               }
                                           }}/>
                                    </li>
                                    <li title={this.state.title} style={{listStyle: "none"}}>
                                        <i className={this.state.icon} onMouseEnter={() => {
                                            this.setState({
                                                toggle: false,
                                                act: true
                                            })

                                        }} onMouseLeave={() => {
                                            this.setState({
                                                toggle: true,
                                                act: false
                                            })

                                        }}
                                           onClick={() => {
                                               if (this.props.seen === true) {
                                                   this.setState({icon: 'fa fa-dot-circle-o'})
                                                   this.props.parent.state.firebase.child(this.props.data).child('status').set(false);
                                               }
                                               else {
                                                   this.setState({icon: 'fa fa-circle-o'})
                                                   this.props.parent.state.firebase.child(this.props.data).child('status').set(true);
                                               }
                                           }}/>
                                    </li>
                                </ul>
                            </div>

                        </Col>
                    </Row>
                </a>
            </DropdownItem>
        )
    }

}

export default CardNoti;
