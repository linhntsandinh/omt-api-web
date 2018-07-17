/**
 * Created by Vu Tien Dai on 07/07/2018.
 */
import React, {Component} from 'react';
import {
    Badge
} from 'reactstrap';

class AttendCard extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                show: false
            };
    }

    getBadge = (status) => {
        return status === '0' ? 'secondary' :
            'success'
    }

    setStatus = (status) => {
        return status === '0' ? 'Chưa diểm danh' :
                'Đã điểm danh'
    }

    render() {
        const attend = this.props.attend;
        let className = "text-center";
        if (attend.status !== '0') {
            className = "text-center block-formcard";
        }
        return (
            <tr className={className}>
                <td>{this.props.stt}</td>
                <td><a><font color="0003FF">{attend.full_name}</font></a></td>
                <td>{attend.to}</td>
                <td>{attend.reasonTitle}</td>
                <td> {attend.startTime}</td>
                <td> {attend.totalTime}</td>
                <td><Badge
                    color={this.getBadge(attend.status)}>{this.setStatus(attend.status)}</Badge></td>
            </tr>)

    }
}

export default AttendCard;
