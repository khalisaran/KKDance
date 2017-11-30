import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Moment from 'react-moment';
import createSchedulerAction from '../../actions/scheduler';
import EventAction from '../../actions/event';
import UserAction from '../../actions/student';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import './scheduler.css';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import { AdminMenu } from '../../components/adminPage/adminMenu';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';


const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
  };


class ScheduleSlotsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eventList: [],
            eventData:'',
            categoryData:'',
            userList: [],
            selected: [],
            categoryList: [],
            listOfStudent: [],
            selectedStudent: [],
            scheduleDetails:[],
            allotment:''
        }
        this.selectedEvent = this.selectedEvent.bind(this);
        this.selectedCategory = this.selectedCategory.bind(this);
        this.selectedUser = this.selectedUser.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleChangeStudent = this.handleChangeStudent.bind(this);
        this.selectedScheduleAllot = this.selectedScheduleAllot.bind(this);
        this.scheduleAllotment = this.scheduleAllotment.bind(this);
    }

    componentWillMount() {
        //this.props.UserAction.getUser();
        this.props.createSchedulerAction.getCategory();
        this.props.EventAction.getEvent();
        this.props.createSchedulerAction.getScheduler();
    }

    componentWillReceiveProps(nextProps) {
        var category = nextProps.getCategory.result;
        var event = nextProps.getEvent.result;
        var schedule = nextProps.getSchedule.result;
        this.setState({
          scheduleDetails: schedule,
        });
        // var user = nextProps.getUser.result;
        if(nextProps.getUserById) {
            var user = nextProps.getUserById.result;
                var listOfStudent = []
                user.forEach(function (entry) {
                    if(entry.user_type === "STUDENT") {
                        listOfStudent.push({
                            value: entry._id,
                            label: entry.name,
                        })
                    }
                });
    
                this.setState({
                    listOfStudent: listOfStudent
                })
        }
        this.setState({eventList:event, categoryList:category});
    };

    selectedEvent(obj) {
        this.setState({eventData:obj.title});
    }

    handleChangeStudent(value) {
        this.setState({
            selectedStudent: value
        })
    }

    selectedCategory(obj) {

        this.state.userList = [];
        this.state.selectedStudent = [];
        this.props.createSchedulerAction.getUserById(obj._id);
        this.setState({categoryData:obj.name});
    }

    selectedScheduleAllot(obj) {
        this.setState({allotment:obj});
    }

    scheduleAllotment() {
        var scheduleId = this.state.allotment._id;
        var students = this.state.selectedStudent
        for(var i=0;i<students.length;i++) {
            var data = {
                "host": students[i].value,
                "schedule_id":scheduleId,
                "paid_status": "PAID",
                "status":"CONFIRMED"
            }
            this.props.createSchedulerAction.addScheduleDetails(data);
    }
    }

    selectedUser = (e, data) => {
    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    render() {
        return (
          <div>
                <HomeHeader />
                <AdminMenu/>
                <MuiThemeProvider>
                    <Card>
                        <center><CardTitle title="Schedule Allotment"/></center>
                            <CardText>
                                <div className="container">
                                <div className="form-horizontal" >
                                    <div className="form-group" >
                                        <div className="row">
                                        <SelectField
                                        hintText="Select Category"
                                        value={this.state.categoryData}
                                        >
                                        {
                                            this.state.categoryList.map((obj, index) => {
                                            return (<MenuItem value={obj.name} primaryText={obj.name} onClick={this.selectedCategory.bind(this, obj)}/>
                                        )
                                        })
                                        }
                                        </SelectField><br />
                                        </div>
                                    </div>
                                    {/* <div className="form-group" >
                                        <div className="row">
                                        <SelectField
                                        hintText="Select Event"
                                        value={this.state.eventData}
                                        >
                                        {
                                            this.state.eventList.map((obj, index) => {
                                            return (<MenuItem value={obj.title} primaryText={obj.title} onClick={this.selectedEvent.bind(this, obj)}/>
                                        )
                                        })
                                        }
                                        </SelectField><br />
                                        </div>
                                    </div> */}
                                    {this.state.categoryData == ''? '':<div className="form-group col-xs-12" >
                                        <div className="col-md-8">
                                        {
                                        this.state.scheduleDetails.map((obj, index) => {
                                        return (
                                        <div className="col-md-4">
                                                <Card>
                                                <CardText><Moment format="YYYY/MM/DD">{obj.schedule_date}</Moment>
                                                <RadioButtonGroup name="shipSpeed" style={{display: 'inline-flex',marginLeft:'60px'}}>
                                                <RadioButton
                                                    value="reverse"
                                                    label=""
                                                    style={styles.radioButton}
                                                    onClick={this.selectedScheduleAllot.bind(this, obj)}
                                                />
                                                </RadioButtonGroup></CardText>
                                                <CardText>{obj.starttime} - {obj.endtime}
                                                </CardText>
                                              </Card><br/>
                                        </div>
                                        )
                                        })
                                        }
                                        </div>
                                        <div className="col-md-4">
                                        <Select
                                        name="form-field-name"
                                        value={this.state.selectedStudent}
                                        options={this.state.listOfStudent}
                                        multi={true}
                                        onChange={this.handleChangeStudent}
                                        clearable={false}
                                       /><br />
                                        <RaisedButton label="Allotment" primary={true} className="pull-right" onClick={this.scheduleAllotment}/>
                                        </div>
                                    </div>}
                                    {/* <div className="form-group" >
                                        <Table onRowSelection={this.handleRowSelection}>
                                            <TableHeader>
                                                <TableRow>
                                                <TableHeaderColumn>Name</TableHeaderColumn>
                                                <TableHeaderColumn>Email</TableHeaderColumn>
                                                <TableHeaderColumn>Qualification</TableHeaderColumn> 
                                                <TableHeaderColumn>Date Of Birth</TableHeaderColumn>
                                                <TableHeaderColumn>Phone</TableHeaderColumn>
                                                <TableHeaderColumn>Address</TableHeaderColumn>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {this.state.userList.map(( listValue, index ) => {
                                             return (
                                            <TableRow selected={this.isSelected(index)} onChange={(e) => this.selectedUser(e, listValue)}>
                                                   <TableRowColumn>{listValue.name}</TableRowColumn>
                                                   <TableRowColumn>{listValue.email}</TableRowColumn>
                                                   <TableRowColumn>{listValue.qualification}</TableRowColumn>
                                                   <TableRowColumn>{listValue.dob}</TableRowColumn>
                                                   <TableRowColumn>{listValue.phone}</TableRowColumn>
                                                   <TableRowColumn>{listValue.address}</TableRowColumn>
                                            </TableRow>
                                            );
                                            })}
                                            </TableBody>
                                        </Table>
                                    </div> */}
                                </div>
                                </div>
                            </CardText>
                </Card>
                </MuiThemeProvider>
                <Footer />

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        getEvent: state.event.getEventSuccess,
        getUser: state.student.getUserSuccess,
        getCategory: state.scheduler.getCategorySuccess,
        getUserById: state.scheduler.getUserByIdSuccess,
        getSchedule: state.scheduler.getSchedulerSuccess

    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSchedulerAction : bindActionCreators(createSchedulerAction, dispatch),
        EventAction : bindActionCreators(EventAction, dispatch),
        UserAction : bindActionCreators(UserAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSlotsComponent);