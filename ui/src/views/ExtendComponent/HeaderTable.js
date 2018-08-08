import React, {Component} from 'react';

import {connect} from "react-redux";


class HeaderTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sort: new Array(7).fill(0),
            order: '',
            by: '',
        }
    }

    handleSort(name, i) {
        const newArray = this.state.sort.map((element, index) => {
            if (index === i) {
                element = element + 1;
            }
            else {
                element = 0
            }
            return element;
        });
        this.setState({
            sort: newArray,
            order: (newArray[i] % 3 !== 0 ? name : 'id'),
            by: (newArray[i] % 3 === 1 || newArray[i] % 3 === 0 ? 'ASC' : newArray[i] % 3 === 2 ? 'DESC' : '')
        }, () => {
            this.onChange();
        })

    }

    onChange() {
        if (this.onChange) {
            var target = {"target": {order: this.state.order, by: this.state.by}}
            this.props.onChange(target)
        }
    }

    render() {
        const {sort} = this.state
        return (
            <thead>
            <tr className="header-table text-center">
                {
                    this.props.data.map((value, index) => {
                            return (
                                <th key={index} width={value.width} name={value.id}
                                    onClick={(e) => this.handleSort(value.id, index)}>
                                    {value.title}
                                    {value.id != '' ? <a className="icon-sort">
                                        {
                                            (sort[index] % 3 === 0) ?
                                                <i className="fa fa-sort"></i> :
                                                (sort[index] % 3 === 1) ?
                                                    <i className="fa fa-sort-up"></i> :
                                                    <i className="fa fa-sort-down"></i>
                                        }</a> : null}
                                </th>)
                        }
                    )
                }

            </tr>
            </thead>

        );
    }
}

HeaderTable.defaultProps = {
    data: []
};
export default connect(null)(HeaderTable);
