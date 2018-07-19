
import React, {Component} from 'react';
import {
    Badge
}from 'reactstrap';
class FormCard extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                show: false
            };
    }



    render() {

        const user = this.props.user;
        const userLink = `#/Profile/${user.id}`;
        const profileUserlink = `#/profileUser/${user.id}`;
        return (
            <tr  onDoubleClick={() => {
                document.location = userLink
            }} onMouseEnter={(e) => {
                if (this.state.show === false)
                    this.setState({show: true})
            }} onMouseLeave={(e) => {
                if (this.state.show === true)
                    this.setState({show: false})
            }}>
                <td>{this.props.stt}</td>
                <td> <a href={profileUserlink}><font color="0003FF">{user.full_name}</font></a></td>
                <td>{user.phone_number}</td>
                <td>{user.Gmail}</td>
                <td>{user.address}</td>
                <td>{user.join_date}</td>
                <td>{user.gender}</td>
                <td  ><Badge> {user.status} </Badge> </td>
            </tr>)

    }
}
export default FormCard;
