/**
 * Created by Vu Tien Dai on 07/07/2018.
 */
import React, {Component} from 'react';
import {
    Badge
} from 'reactstrap';

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
        const absence = this.props.absence;
        const absenceLink = `#/absencemanage/${absence.user_id}&&${absence.user_id}`
            return (
                <tr className="text-center" onDoubleClick={() => {
                    document.location = absenceLink
                }} onMouseEnter={(e) => {
                    if (this.state.show === false)
                        this.setState({show: true})
                }} onMouseLeave={(e) => {
                    if (this.state.show === true)
                        this.setState({show: false})
                }}>
                    <td>{this.props.stt}</td>
                    <td><a href={absenceLink}><font color="0003FF">{absence.full_name}</font></a></td>
                    <td>
                        {(this.state.show === true && absence.status === '0') ?
                            <i className="icon-trash" onClick={() => {
                                console.log("Xoa nha")
                            }}/> : null}  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                        {(this.state.show === true && absence.status === '0') ?
                            <i className="i icon-note" onClick={() => {
                                console.log("Fix nha")
                            }}/> : null}</td>
                    <td>{absence.to}</td>
                    <td>{absence.reasonTitle}</td>
                    <td> {absence.startTime}</td>
                    <td> {absence.totalTime}</td>
                    <td><Badge href={absenceLink}
                               color={this.getBadge(absence.status)}>{this.setStatus(absence.status)}</Badge></td>
                </tr>)

        }
}

export default FormCard;
