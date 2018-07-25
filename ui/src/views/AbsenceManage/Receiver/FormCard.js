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
        const absence = this.props.data;
        const absenceLink = `#/absencemanage/receiver/${absence.user_id}&&${absence.status}`
        let className = "text-center";
        if (absence.status !== '0') {
            className = "text-center block-formcard";
        }
        return (
            <tr className={className} style={{height: 20}} onMouseEnter={(e) => {
                if (this.state.show === false)
                    this.setState({show: true})
            }} onMouseLeave={(e) => {
                if (this.state.show === true)
                    this.setState({show: false})
            }}>
                <td onDoubleClick={() => {
                    location(absenceLink);
                }}>{this.props.stt}</td>
                <td onDoubleClick={() => {
                    location(absenceLink);
                }}><a href={absenceLink}><font color="0003FF">{absence.full_name}</font></a></td>
                {absence.status === '0' ?
                    <td>
                        {(this.state.show === true) ?
                            <i className="fa fa-check" onClick={() => {
                                if (window.confirm('Bạn duyệt đơn này chứ ?')){
                                    console.log("Dm may");
                                }
                            }}/> : null}  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                        {(this.state.show === true) ?
                            <i className="fa fa-remove" onClick={() => {
                                if (window.confirm('Bạn không phê duyệt đơn này chứ ?')){
                                    console.log("Dm may");
                                }
                            }}/> : null}</td> :
                    <td onDoubleClick={() => {
                        location(absenceLink);
                    }}/>
                }
                <td onDoubleClick={() => {
                    location(absenceLink);
                }}>{absence.reasonTitle}</td>
                <td onDoubleClick={() => {
                    location(absenceLink);
                }}> {absence.startTime}</td>
                <td onDoubleClick={() => {
                    location(absenceLink);
                }}> {absence.totalTime}</td>
                <td onDoubleClick={() => {
                    location(absenceLink);
                }}><Badge href={absenceLink}
                          color={this.getBadge(absence.status)}>{this.setStatus(absence.status)}</Badge></td>
            </tr>)

    }
}

function location(link) {
    document.location = link
}

export default FormCard;
