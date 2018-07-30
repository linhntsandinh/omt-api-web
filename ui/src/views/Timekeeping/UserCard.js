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
    const userLink = `#/usersmanage/${user.user_id}`

    return (
      <tr onDoubleClick={() => {

      }} onMouseEnter={(e) => {
        if (this.state.show === false)
          this.setState({show: true})
      }} onMouseLeave={(e) => {
        if (this.state.show === true)
          this.setState({show: false})
      }}>
        <td>{this.props.stt}</td>
          <td  > {user.name}</td>

        <td>{user.team}</td>
        <td>{user.timecheckin}</td>
          <td>
              {this.state.show === true ?
                  <i  className="icon-trash" onClick={()=>{console.log("Xoa")}}/> : null}  &nbsp;  &nbsp;  &nbsp;  &nbsp;
              {this.state.show === true ?
                  <i  className="i icon-note" onClick={()=>{console.log("edit")}}/> : null}</td>
        <td>{user.timecheckout}</td>
          <td>
              {this.state.show === true ?
                  <i  className="icon-trash" onClick={()=>{console.log("Xoa")}}/> : null}  &nbsp;  &nbsp;  &nbsp;  &nbsp;
              {this.state.show === true ?
                  <i  className="i icon-note" onClick={()=>{console.log("edit")}}/> : null}</td>
        <td>{user.date}</td>
          <td  ><Badge href={userLink} color={this.getBadge(user.status)}> {user.status} </Badge> </td>
      </tr>)

  }
}
export default FormCard;
