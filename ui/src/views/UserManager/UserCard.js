/**
 * Created by Vu Tien Dai on 07/07/2018.
 */
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

  getBadge = (status) => {
    return status === '0' ? 'secondary' :
      status === '1' ? 'success' :
        'danger'
  }

  setStatus = (status) => {
    return status === '0' ? 'Chưa duyệt' :
      status === '1' ? 'Đã duyệt' :
        'Không duyệt'
  }

  render() {
    const user = this.props.user;
    const userLink = `#/users/${user.user_id}`

    return (
      <tr onDoubleClick={() => {
        document.location = userLink
      }} onMouseEnter={(e) => {
        if (this.state.show === false)
          this.setState({show: true})
      }} onMouseLeave={(e) => {
        if (this.state.show === true)
          this.setState({show: false})
      }}>
        <td>{this.props.stt}</td>
        <td className="text-center">
          <div className="avatar">
            <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
            <span className="avatar-status badge-success"></span>
          </div>
        </td>
        <td><a href={userLink}><font color="0003FF">{user.full_name}</font></a></td>
        <td>
          {this.state.show === true ?
          <i  className="icon-trash" onClick={()=>{console.log("Xoa nha")}}/> : null}  &nbsp;  &nbsp;  &nbsp;  &nbsp;
          {this.state.show === true ?
          <i  className="i icon-note" onClick={()=>{console.log("Fix nha")}}/> : null}</td>
        <td>{user.email}</td>
        <td className="text-lg-center">{user.phone_number}</td>
        <td> {user.position}</td>
        <td><Badge href={userLink} color={this.getBadge(user.status)}>{this.setStatus(user.status)}</Badge></td>
      </tr>)

  }
}
export default FormCard;
