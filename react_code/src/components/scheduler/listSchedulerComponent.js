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



class ListSchedulerComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          schedulerDetails:[],
          selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
      this.props.createSchedulerAction.getScheduler();
      localStorage.setItem('selectedScheduler', '');
    }

    componentWillReceiveProps(nextProps) {
      var scheduler = nextProps.getScheduler.result;
      this.setState({
        schedulerDetails: scheduler,
      });
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
        localStorage.setItem('selectedScheduler', JSON.stringify(data));
        browserHistory.push('/CreateSchedule')
    };
    

    render() {
        return (
          <div>
            <HomeHeader />
            <AdminMenu/>
            <MuiThemeProvider>
            <Card>
              <center><CardTitle title="List of Schedule"/></center>
              <CardText>
             
              <Table className="table-hover"  onRowSelection={this.handleRowSelection}>
                <TableHeader>
                  <TableRow>
                      <TableHeaderColumn>Schedule date</TableHeaderColumn>
                      <TableHeaderColumn>Filled Slot</TableHeaderColumn>
                      <TableHeaderColumn>Available Slot</TableHeaderColumn> 
                      <TableHeaderColumn>Schedule Rate</TableHeaderColumn>
                      <TableHeaderColumn>Start Time</TableHeaderColumn>
                      <TableHeaderColumn>End Time</TableHeaderColumn>
                      <TableHeaderColumn>Location</TableHeaderColumn>
                      <TableHeaderColumn>Target Revenue</TableHeaderColumn>
                      <TableHeaderColumn>Total Revenue</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.schedulerDetails.map(( listValue, index ) => {
                      return (
                        <TableRow   selected={this.isSelected(index)} key={index} onChange={(e) => this.handleChange(e, listValue)}>
                            <TableRowColumn>{listValue.schedule_date}</TableRowColumn>
                            <TableRowColumn>{listValue.filled_slot}</TableRowColumn>
                            <TableRowColumn>{listValue.available_slot}</TableRowColumn>
                            <TableRowColumn>{listValue.schedule_rate}</TableRowColumn>
                            <TableRowColumn>{listValue.starttime}</TableRowColumn>
                            <TableRowColumn>{listValue.endtime}</TableRowColumn>
                            <TableRowColumn>{listValue.location}</TableRowColumn>
                            <TableRowColumn>{listValue.target_revenue}</TableRowColumn>
                            <TableRowColumn>{listValue.total_revenue}</TableRowColumn>
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
      getScheduler: state.scheduler.getSchedulerSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSchedulerAction : bindActionCreators(createSchedulerAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSchedulerComponent);