import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import createSchedulerAction from '../../actions/scheduler';
import UserAction from '../../actions/student';
import eventAction from '../../actions/event';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import './scheduler.css';
import mock from '../../asset/img/dance-new2.jpg';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
//import { Navigation } from '../navigation';
import { AdminMenu } from '../../components/adminPage/adminMenu';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import AlertContainer from 'react-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


var time = [
    { value: '12 PM', label: '12 PM' },
    { value: '1 PM', label: '1 PM' },
    { value: '2 PM', label: '2 PM' },
    { value: '3 PM', label: '3 PM' },
    { value: '4 PM', label: '4 PM' },
    { value: '5 PM', label: '5 PM' },
    { value: '6 PM', label: '6 PM' },
    { value: '7 PM', label: '7 PM' },
    { value: '8 PM', label: '8 PM' },
    { value: '9 PM', label: '9 PM' },
    { value: '10 PM', label: '10 PM' },
    { value: '11 PM', label: '11 PM' },
    { value: '12 AM', label: '12 AM' },
    { value: '1 AM', label: '1 AM' },
    { value: '2 AM', label: '2 AM' },
    { value: '3 AM', label: '3 AM' },
    { value: '4 AM', label: '4 AM' },
    { value: '5 AM', label: '5 AM' },
    { value: '6 AM', label: '6 AM' },
    { value: '7 AM', label: '7 AM' },
    { value: '8 AM', label: '8 AM' },
    { value: '9 AM', label: '9 AM' },
    { value: '10 AM', label: '10 AM' },
    { value: '11 AM', label: '11 AM' }
    
  ];

class SchedulerComponent extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
          id:'',
          startTime:'',
          endTime:'',
          event:'',
          event_id:'',
          scheduledRate:'',
          schedulerDate:'',
          filledSlot:'',
          availableSlot:'',
          location:'',
          host:'',
          host_id:'',
          targetAvenue:'',
          totalAvenue:'',
          userList:[],
          eventList:[]
        }
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
        this.changeSchedularDate = this.changeSchedularDate.bind(this);
        this.changeFilledSlot = this.changeFilledSlot.bind(this);
        this.changeAvailableSlot= this.changeAvailableSlot.bind(this);
        this.changeScheduledRate = this.changeScheduledRate.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeHost = this.changeHost.bind(this);
        this.schedulerRegister = this.schedulerRegister.bind(this);
        this.changeTargetAvenue = this.changeTargetAvenue.bind(this);
        this.changeTotalAvenue = this.changeTotalAvenue.bind(this);
        this.selectedUser = this.selectedUser.bind(this);
    }

    componentWillMount() {
    // let selectedEvent = JSON.parse(localStorage.getItem('selectedScheduler'));
    //    if(selectedEvent) {
    //        this.setState({
    //         id: selectedEvent._id,
    //         schedulerDate: selectedEvent.schedule_date,
    //         totalAvenue: selectedEvent.total_revenue,
    //         targetAvenue: selectedEvent.target_revenue,
    //         scheduledRate: selectedEvent.schedule_rate,
    //         availableSlot: selectedEvent.available_slot,
    //         filledSlot: selectedEvent.filled_slot,
    //         endTime: selectedEvent.endtime,
    //         startTime: selectedEvent.starttime,
    //         location: selectedEvent.location
    //      });
    //    } else {
    //      localStorage.setItem('selectedScheduler', '');
    //    }
    this.props.UserAction.getUser();
    this.props.eventAction.getEvent();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps value',nextProps)
        var user = nextProps.getUser.result;
        for(var i=0;i<user.length;i++) {
            if(user[i].user_type === "USER") {
                this.state.userList.push(user[i]);
            }
        }
        if(nextProps.scheduleResponse !== undefined ){
            if(nextProps.scheduleResponse.status == 'SUCCESS'){
                toast("Schedule created Successfully");
            }
        }    
        if(nextProps.errorResponse !== undefined){
            if(nextProps.errorResponse.status == "NOT SUCCESS"){
                toast.error("Schedule created is not successfully");
            }
        }
        var event = nextProps.getEvent.result;
        this.setState({eventList:event})
    };
    
    changeStartTime = (event, index, value) => this.setState({startTime:value});

    changeEndTime = (event, index, value) => this.setState({endTime:value});

    changeHost(event, index, value) {
        this.setState({host:value._id});

    }

    changeEvent (obj) {
      console.log('the value',obj)
     this.setState({event:obj.title,event_id:obj._id});
    }

    changeFilledSlot(e) {
      this.setState({filledSlot:e.target.value});
    }

    changeSchedularDate = (event, date) => {
      this.setState({
        schedulerDate: date,
      });
    };

    changeAvailableSlot(e) {
      this.setState({availableSlot:e.target.value});
    }

    changeTargetAvenue(e) {
      this.setState({targetAvenue:e.target.value});
    }

    changeTotalAvenue(e) {
      this.setState({totalAvenue:e.target.value});
    }

    changeScheduledRate(e) {
        this.setState({scheduledRate:e.target.value});
      }

    changeLocation(e) {
      this.setState({location:e.target.value});
    //   this.setState({assetid:"5a0b0435e510ee1fbc6c0f8b"});
    //this.setState({event:"5a0b0899e510ee1fbc6c0f92"});
    //this.setState({host:"5a0b09b2e510ee1fbc6c0f93"});
    }

    selectedUser(obj) {
        this.setState({host:obj.name,host_id:obj._id});
    }

    schedulerRegister() {
    if(this.state.id === '') {
        var obj = {
            "location": this.state.location,
            "schedule_date": this.state.schedulerDate,
            "eventid": this.state.event_id,
            "starttime": this.state.startTime,
            "endtime": this.state.endTime,
            "host": this.state.host_id,
            "filled_slot": this.state.filledSlot,
            "available_slot": this.state.availableSlot,
            "schedule_rate": this.state.scheduledRate,
            "target_revenue":this.state.targetAvenue,
            "total_revenue":this.state.totalAvenue
        }
        this.props.createSchedulerAction.addScheduler(obj);
    } else {
        var obj = {
            "_id": this.state.id,
            "location": this.state.location,
            "schedule_date": this.state.schedulerDate,
            "eventid": this.state.event_id,
            "starttime": this.state.startTime,
            "endtime": this.state.endTime,
            "host": this.state.host_id,
            "filled_slot": this.state.filledSlot,
            "available_slot": this.state.availableSlot,
            "schedule_rate": this.state.scheduledRate,
            "target_revenue":this.state.targetAvenue,
            "total_revenue":this.state.totalAvenue
        }
        this.props.createSchedulerAction.updateScheduler(obj);
    }
    }


    render() {
        return (
          <div>
                <HomeHeader />
                <AdminMenu/>
                <ToastContainer
                    position="top-center"
                    autoClose={800}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <MuiThemeProvider>
                <div className="row">
                <div className="col-md-6">
                <Card>
                <center><CardTitle title="Create Schedule"/>
                <CardText>
                <div className="form-horizontal" >
                                    <fieldset>
                                        <div className="form-group" >
                                        <div className="row">
                                                <DatePicker hintText="Select Schedule Date" floatingLabelText="Scheduler Date" mode="landscape" onChange={this.changeSchedularDate}/>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                        <div className="row">
                                        <div className='col-md-offset-1'>
                                                    <div className='col-md-3'>
                                                        <SelectField
                                                            hintText="Enter Start Time"
                                                            onChange={this.changeStartTime}
                                                            value={this.state.startTime}
                                                        >
                                                        {
                                                        time.map((obj, index) => {
                                                            return (<MenuItem key={index} value={obj.value} primaryText={obj.label} />)
                                                        })
                                                        }
                                                        </SelectField><br />
                                                    </div>
                                                    <div className='col-md-3 textboxAlign'>
                                                        <SelectField
                                                            hintText="Enter End Time"
                                                            onChange={this.changeEndTime}
                                                            value={this.state.endTime}
                                                        >
                                                        {
                                                        time.map((obj, index) => {
                                                             return (<MenuItem value={obj.value} primaryText={obj.label} />)
                                                        })
                                                        }
                                                        </SelectField><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                        <div className="row">
                                        <div className='col-md-offset-1'>
                                                    <div className='col-md-3'>                                                        
                                                        <SelectField
                                                          hintText="Enter Event"
                                                          value={this.state.event}
                                                        >
                                                        {this.state.eventList.map((obj,index)=>{
                                                            return (<MenuItem value={obj.title} primaryText={obj.title} onClick={this.changeEvent.bind(this, obj)}/>
                                                        )
                                                        })
                                                        }
                                                       
                                                        </SelectField><br />
                                                    </div>
                                                    <div className='col-md-3 textboxAlign'>
                                                        <SelectField
                                                            hintText="Enter Host"
                                                            value={this.state.host}
                                                            >
                                                            {
                                                                this.state.userList.map((obj, index) => {
                                                                return (<MenuItem value={obj.name} primaryText={obj.name} onClick={this.selectedUser.bind(this, obj)}/>
                                                            )
                                                            })
                                                            }
                                                            </SelectField><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                        <div className="row">
                                        <div className='col-md-offset-1'>
                                                    <div className='col-md-3'>                                                        
                                                    <TextField
                                                    hintText="Enter Filled Slot"
                                                    floatingLabelText="Filled Slot"
                                                    onChange={this.changeFilledSlot}
                                                    value={this.state.filledSlot}
                                                    />
                                                    </div>
                                                    <div className='col-md-3 textboxAlign'>
                                                    <TextField
                                                    hintText="Enter Available Slot"
                                                    floatingLabelText="Available Slot"
                                                    onChange={this.changeAvailableSlot}
                                                    value={this.state.availableSlot}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                        <div className="row">
                                        <div className='col-md-offset-1'>
                                                    <div className='col-md-3'>                                                        
                                                    <TextField
                                                    hintText="Enter Scheduled Rate"
                                                    floatingLabelText="Scheduled Rate"
                                                    onChange={this.changeScheduledRate}
                                                    value={this.state.scheduledRate}
                                                    />
                                                    </div>
                                                    <div className='col-md-3 textboxAlign'>
                                                    <TextField
                                                    hintText="Enter Target Avenue"
                                                    floatingLabelText="Target Avenue"
                                                    onChange={this.changeTargetAvenue}
                                                    value={this.state.targetAvenue}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div className="row">
                                            <div className='col-md-offset-1'>
                                                    <div className='col-md-3'>
                                                    <TextField
                                                        hintText="Enter Total Avenue"
                                                        floatingLabelText="Total Avenue"
                                                        onChange={this.changeTotalAvenue}
                                                        value={this.state.totalAvenue}
                                                    /> 
                                                    </div>
                                                    <div className='col-md-3 textboxAlign'>
                                                        <TextField
                                                            hintText="Enter Location"
                                                            floatingLabelText="Location"
                                                            onChange={this.changeLocation}
                                                            value={this.state.location}
                                                        /><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div style={{ marginLeft: "25%" }} className="col-md-6">
                                                <RaisedButton label="Create" primary={true} onClick={this.schedulerRegister}/>
                                                <RaisedButton label="Cancel" secondary={true} onClick={browserHistory.goBack} style={{marginLeft:'10px'}}/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                </CardText>
                                </center>
                                </Card>
                </div>
                <div className="col-md-6">
                <img src={mock} alt="" className="img-responsive wow animated zoomIn animation-delay-8"/>
                </div>
                </div>
                </MuiThemeProvider>
                <Footer />

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    console.log('state',state)
    return {
        getUser: state.student.getUserSuccess,
        scheduleResponse:state.scheduler.createSuccess,
        errorResponse:state.scheduler.createRejected,
        getEvent: state.event.getEventSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSchedulerAction : bindActionCreators(createSchedulerAction, dispatch),
        UserAction : bindActionCreators(UserAction, dispatch),
        eventAction : bindActionCreators(eventAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerComponent);