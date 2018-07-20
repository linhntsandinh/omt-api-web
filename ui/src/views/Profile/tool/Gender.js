import React ,{Component} from 'react';
import { Label, Input, FormGroup } from 'reactstrap';

 class Gerder extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (

            <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Nam/Nữ</option>

                </Input>
            </FormGroup>
        );
    }
}
export default Gerder;