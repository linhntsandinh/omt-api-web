/**
 * Created by Vu Tien Dai on 22/06/2018.
 */
import React, {Component} from 'react';
import usersData from './UsersData'
import {Bar, Line} from 'react-chartjs-2';
import {
  Badge,
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
}  from 'reactstrap';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
const brandInfo = getStyle('--danger')
function UserBox(props) {
  const user = props.user
  const key = props.keys;
  const userLink = `#/users/${user.id}`
  let arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(Math.floor(Math.random() * 50));
  }
  const cardChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data: arr,
      },
    ],
  };
  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }
  return (
    <Col xs="12" sm="6" lg="3">
      <Card className="text-white bg-info">
        <CardBody className="pb-0">
          <ButtonGroup className="float-right">
            <ButtonDropdown isOpen={props.parent.state.dropdownOpen[key]} toggle={() => {
              props.parent.toggle(key);
            }}>
              <DropdownToggle caret className="p-0" color="transparent">
                <i className="icon-settings"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem disabled>Disabled action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
          <div className="text-value">{user.name}</div>
          <div> {user.registered}</div>
          <Badge href={userLink} color={getBadge(user.status)}>{user.status}</Badge>
        </CardBody>
        <div className="chart-wrapper mx-3" style={{height: '70px'}}>
          <Line data={cardChartData} options={ props.style} height={70}/>
        </div>
      </Card>
    </Col>
  )
}
class Test extends Component {
  arr;

  constructor(props) {
    super(props);
    this.arr = []
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(usersData.length).fill(false),
      data:[]
    };
  }


  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  random() {
    this.arr = []
    for (let i = 0; i < 7; i++) {
      this.arr.push(Math.floor(Math.random() * 50));
    }

  }

  render() {
    this.random();
    const cardChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Số ngày nghỉ',
          backgroundColor: brandInfo,
          borderColor: 'rgba(255,255,255,.55)',
          data: this.arr,
        },
      ],
    };


    const cardChartOpts = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            }, barPercentage: 0.6,

          }],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, cardChartData.datasets[0].data) - 5,
              max: Math.max.apply(Math, cardChartData.datasets[0].data) + 5,
            },
          }],

      },
      elements: {
        line: {
          tension: 0.00001,
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      },
    };

    const userList = usersData.filter((user) => user.id)

    return (
      <Row>{
        userList.map((user, index) =>
          < UserBox key={index} keys={index} user={user} parent={this} data={cardChartData} style={cardChartOpts}/>
        )
      }
      </Row>
    )
  }
}

export default Test;

