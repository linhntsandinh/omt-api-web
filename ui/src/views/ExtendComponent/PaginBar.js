import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Input,
    Row,
} from 'reactstrap';
import {connect} from "react-redux";

const list_limit = [10, 20, 30, 40, 50]

function Optioncard(data) {
    let value = data.value;
    return (
        <option value={value}>{value}</option>
    )
}

function Pagin(data) {
    let p = data.parent;
    let check = data.check;
    let pagin = data.pagin;
    return (
        <PaginationItem active={(check - pagin) === (data.index)}>
            <PaginationLink tag="button"
                            onClick={(e) => p.handleClick((pagin + data.index), e)}>{pagin + data.index}</PaginationLink>
        </PaginationItem>
    )

}

class PaginBar extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        let pagin =Math.floor(((props.limit * props.value) - props.limit + 1) / (props.limit * props.pagin_number)) * props.pagin_number + 1;
        this.state = {
            check: props.value,
            pagin: pagin,
            limit:props.limit,
            pagin_number: props.pagin_number
        }
    }
    onLeft() {
        if (this.state.check > 1 && this.state.pagin !== this.state.check) {
            this.setState(
                {check: this.state.check - 1}, function () {
                    this.onChange();
                }
            )

        }
        else if (this.state.check > 1 && this.state.pagin === this.state.check) {
            this.setState(
                {
                    pagin: this.state.pagin - this.state.pagin_number,
                    check: this.state.check - 1
                }, function () {
                    this.onChange()
                }
            )
        }
    }

    onRight() {
        if (this.state.check < Math.ceil(this.props.length / this.state.limit)) {
            this.setState(
                {
                    check: this.state.check + 1
                }, function () {
                    this.onChange()

                }
            )
            if (this.state.pagin + this.state.pagin_number - 1 === this.state.check) {
                this.setState(
                    {
                        pagin: this.state.pagin + this.state.pagin_number,
                    }
                )
            }
        }
    }

    handleClick(value) {
        this.setState({
            check: value
        }, function () {
            this.onChange();

        })
    }

    onChange() {
        if(this.props.onChange) {
            var target = {"target": {name:this.props.name,check:this.state.check,limit:this.state.limit}}
            this.props.onChange(target)
        }
    }

    handleChangeLimit(e) {
        if (e) {
            let check = Math.ceil(((this.state.limit * this.state.check) - this.state.limit + 1) / e.target.value);
            let pagin = Math.floor(((this.state.limit * this.state.check) - this.state.limit + 1) / (e.target.value * this.state.pagin_number)) * this.state.pagin_number + 1;
            localStorage.setItem('limit', e.target.value);
            this.setState({limit: e.target.value, check: check, pagin: pagin}, function () {
                this.onChange();
            });
        }
        else {
            localStorage.setItem('limit', 10);
            this.setState({limit: 10, check: 1, pagin: 1}, function () {
                this.onChange();
            });


        }
    }

    render() {
        const data_pagin = [];
        for (let i = 0; i < Math.ceil(this.props.length / this.state.limit); i++) {
            if (i >= (this.state.pagin - 1) && i < this.state.pagin + this.state.pagin_number - 1 && data_pagin.length < this.state.pagin_number)
                data_pagin.push(i);
        }
        return (
            <Row>
                <Col md="10">
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink previous tag="button"
                                            onClick={(e) => this.onLeft(e)}></PaginationLink>
                        </PaginationItem>
                        {
                            data_pagin.map((value, index) =>
                                <Pagin key={index} index={index} parent={this} pagin={this.state.pagin}
                                       check={this.state.check}/>
                            )
                        }
                        <PaginationItem>
                            <PaginationLink next tag="button"
                                            onClick={(e) => this.onRight(e)}></PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Col>
                {this.props.show ?<Col md={"2"}>
                    <Input value={this.state.limit} onChange={(e) => this.handleChangeLimit(e)}
                           type="select"
                           name="titleform" id="selectLg" bsSize="small">
                        {list_limit.map((value, index) =>
                            <Optioncard key={index} index={index} value={value}/>
                        )}
                    </Input>
                </Col>:null}

            </Row>
        );
    }
}

PaginBar.defaultProps = {
    value:1,
    length:0,
    limit: 10,
    pagin_number:8,
    show:true
};

export default connect(null)(PaginBar);
