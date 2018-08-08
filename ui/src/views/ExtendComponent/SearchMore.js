import React, {Component} from 'react';
import {CardBody, Card, Col, Row, InputGroupText, InputGroup, InputGroupAddon, Input, Label} from 'reactstrap'
import {connect} from "react-redux";


class SearchMore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: '',
            by: '',
        }
    }

    render() {
        const {sort} = this.state
        return (

            <Card style={this.props.style}>
                <CardBody>
                    <Col>
                        {
                            this.props.data.map((value, index) => {
                                    return (
                                        <Row key={index}>
                                            <InputGroup>
                                                <InputGroupAddon style={{width: '25%'}} addonType="prepend" disabled>
                                                    <InputGroupText
                                                        className="lable_search">
                                                        {value.title}
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <InputGroupAddon style={{width: '75%'}} addonType="prepend">
                                                    <Input className="lable_search" name={value.id} type={value.type}
                                                           onChange={(e) => this.props.onChange(e)}
                                                           onKeyPress={(ev, e) => this.props.onKeyPress(ev)}>
                                                        {
                                                            value.option ?
                                                                value.option.map((vl, index) =>
                                                                    <option  key={index} value={vl.id}>{vl.title}</option>
                                                                ) : null
                                                        }
                                                    </Input>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Row>
                                    )
                                }
                            )
                        }
                    </Col>
                </CardBody>
            </Card>

        );
    }
}

SearchMore.defaultProps = {
    data: []
};
export default connect(null)(SearchMore);
