import React, { Component } from 'react';

import { FormGroup, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon,Input} from 'reactstrap';



class MyCaledar extends Component {

    render() {

        const dd = [1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,31
        ];

        const mm = [1,2,3,4,5,6,7,8,9,10,11,12];
        const yy = [
            1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,
            1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,
            2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,
            2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,
            2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];

        return (
            <Row id={"rowcaleda"}>
                <FormGroup>
                    <Input onChange={this.props.onChange}
                        type="select" name="dd" id="exampleSelect">
                        <option  >{this.props.dd}</option>

                        {
                            dd.map( (number)=> <option key={number.toString()}>{number}</option> )
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input onChange={this.props.onChange}
                        type="select" name="mm" id="exampleSelect">
                        <option >{this.props.mm}</option>
                        {
                            mm.map((number)=><option key={number.toString()}>{number}</option>)
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input onChange={this.props.onChange}
                        type="select" name="yy" id="exampleSelect">
                        <option >{this.props.yy}</option>
                        {
                            yy.map((number)=><option key={number.toString()}>{number}</option>)
                        }
                    </Input>
                </FormGroup>
            </Row>
        );
    }
}

export default MyCaledar;