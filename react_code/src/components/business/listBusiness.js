import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import createSchedulerAction from '../../actions/scheduler';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import { AdminMenu } from '../../components/adminPage/adminMenu';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import businessAction from '../../actions/business';



class ListBusiness extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          businessDetails:[],
          selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.businessAction.getBusiness();
      localStorage.setItem('selectedBusiness', '');
    }

    componentWillReceiveProps(nextProps) {
        var business=nextProps.getBusiness
        this.setState({businessDetails:business})
    };

    isSelected = (index) => {

        return this.state.selected.indexOf(index) !== -1;
    };
    
    handleRowSelection = (selectedRows) => {
        this.setState({
          selected: selectedRows,
        });
    };

    handleChange = (e, data) => {
        localStorage.setItem('selectedBusiness', JSON.stringify(data));
        browserHistory.push('/CreateBusiness')
    };
    

    render() {
        return (
          <div>
            <HomeHeader />
            <AdminMenu/>
            <MuiThemeProvider>
            <Card>
              <center><CardTitle title="List of Business"/></center>
              <CardText>
              <Table  className="table-hover" onRowSelection={this.handleRowSelection}>
                <TableHeader>
                  <TableRow>
                      <TableHeaderColumn>Buisess Name</TableHeaderColumn>
                      <TableHeaderColumn>Open Hours</TableHeaderColumn>
                      <TableHeaderColumn>City</TableHeaderColumn> 
                      <TableHeaderColumn>State</TableHeaderColumn>
                      <TableHeaderColumn>Country</TableHeaderColumn>
                      <TableHeaderColumn>Phone No</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.businessDetails.map(( listValue, index ) => {
                      return (
                        <TableRow selected={this.isSelected(index)} key={index} onChange={(e) => this.handleChange(e, listValue)}>
                            <TableRowColumn>{listValue.name}</TableRowColumn>
                            <TableRowColumn>{listValue.openhours}</TableRowColumn>
                            <TableRowColumn>{listValue.city}</TableRowColumn>
                            <TableRowColumn>{listValue.state}</TableRowColumn>
                            <TableRowColumn>{listValue.country}</TableRowColumn>
                            <TableRowColumn>{listValue.phone}</TableRowColumn>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              </CardText>
              </Card>
              </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    console.log("state>>>>>>>>>"+state);
    return {
        getBusiness :state.business.getSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        businessAction: bindActionCreators(businessAction,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBusiness);