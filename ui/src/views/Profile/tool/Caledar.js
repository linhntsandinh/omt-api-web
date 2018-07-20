import React, { Component } from 'react';

import { FormGroup, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input} from 'reactstrap';



class MyCaledar extends Component {
    state = {
        dd:0,
        mm:0,
        yy:0,
    }

    input123 (e){
        return this.state;
    }


    render() {
        return (
            <Row id={"rowcaleda"}>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>1990</option>
                        <option>1991</option>
                        <option>1992</option>

                    </Input>
                </FormGroup>
            </Row>
        );
    }
}

export default MyCaledar;