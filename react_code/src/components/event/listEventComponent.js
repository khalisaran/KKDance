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
import createAction from '../../actions/event';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import { Navigation } from '../navigation';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import { AdminMenu } from '../../components/adminPage/adminMenu';



class ListEventComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          eventDetails:[],
          selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
      this.props.createAction.getEvent();
      localStorage.setItem('selectedEvent', '');
    }

    componentWillReceiveProps(nextProps) {
      console.log('NextPrps evvent',nextProps)
      var event = nextProps.getEvent.result;
      for(var i=0;i<event.length;i++) {
        var data =  {
          "event_date": event[i].event_date,
          "status": event[i].status,
          "event_type": event[i].event_type,
          "location": event[i].location,
          "description": event[i].description,
          "title": event[i].title
        }
        this.state.eventDetails.push(data);
      }
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
        localStorage.setItem('selectedEvent', JSON.stringify(data));
        browserHistory.push('/CreateEvent')
    };
    

    render() {
        return (
          <div>
            <HomeHeader />
            <AdminMenu />
            <MuiThemeProvider>
            <Card>
              <center><CardTitle title="Event Details"/></center>
              <CardText>
              <Table  className="table-hover" onRowSelection={this.handleRowSelection}>
                <TableHeader>
                  <TableRow>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Event date</TableHeaderColumn>
                      <TableHeaderColumn>Event Type</TableHeaderColumn>
                      <TableHeaderColumn>Status</TableHeaderColumn>
                      <TableHeaderColumn>Location</TableHeaderColumn>
                      <TableHeaderColumn>Description</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.eventDetails.map(( listValue, index ) => {
                      return (
                        <TableRow selected={this.isSelected(index)} onChange={(e) => this.handleChange(e, listValue)}>
                            <TableRowColumn>{listValue.title}</TableRowColumn>
                            <TableRowColumn>{listValue.event_date}</TableRowColumn>
                            <TableRowColumn>{listValue.event_type}</TableRowColumn>
                            <TableRowColumn>{listValue.status}</TableRowColumn>
                            <TableRowColumn>{listValue.location}</TableRowColumn>
                            <TableRowColumn>{listValue.description}</TableRowColumn>
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
    return {
      createEvent: state.createEvent,
      getEvent: state.event.getEventSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
      createAction : bindActionCreators(createAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEventComponent);