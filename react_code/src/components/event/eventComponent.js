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
import createAction from '../../actions/event';
import UserAction from '../../actions/student';
import AssetAction from '../../actions/assets';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../asset/css/plugins.min.css';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import './event.css';
import mock from '../../asset/img/Cool-Break-Dance.jpg';
import { Footer } from '../footer';
import { HomeHeader } from '../homeHeader';
import { SubHeader } from '../subheader';
import { AdminMenu } from '../../components/adminPage/adminMenu';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import category from '../../actions/category';
import AlertContainer from 'react-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



class EventComponent extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            assetid: '',
            asset_name: '',
            host: '',
            description: '',
            host_id: '',
            status: '',
            event_date: '',
            event_type: '',
            title: '',
            category_id: '',
            category_name: '',
            location: '',
            userList: [],
            assetList: [],
            categoryList: []
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeEventDate = this.changeEventDate.bind(this);
        this.changeEventType = this.changeEventType.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeAssertId = this.changeAssertId.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeHost = this.changeHost.bind(this);
        this.eventRegister = this.eventRegister.bind(this);
        this.selectedUser = this.selectedUser.bind(this);
        this.selectedAsset = this.selectedAsset.bind(this);
    }

    componentWillMount() {
        this.props.UserAction.getUser();
        this.props.AssetAction.getAssets();
        this.props.category.getCategory();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
       
        if (nextProps.eventResponse !== undefined) {
           
            if (nextProps.eventResponse.status == 'SUCCESS') {
                toast("Event created Successfully");
            } 
         } 
         if(nextProps.eventError !== undefined){
         if(nextProps.eventError.status == 'NOT SUCCESS'){
            toast.error("Event is not created Successfully");
        }
    }
        if(nextProps.getCategory !== undefined){
        var category = nextProps.getCategory.result;
        this.setState({ categoryList: category })
        }

        if (nextProps.getUser !== undefined) {
            var user = nextProps.getUser.result;
            for (var i = 0; i < user.length; i++) {
                if (user[i].user_type === "USER") {
                    this.state.userList.push(user[i]);
                }
            }
        }
        if (nextProps.getAssets !== undefined) {
            var assets = nextProps.getAssets.result;
            this.setState({ assetList: assets });
        }



    };

    changeAssertId(event, index, value) {
        console.log('assert id', event)
        this.setState({ assetid: value, asset_name: value });
    }

    handleCategorySelect(data) {

        this.setState({ category_name: data.name, category_id: data._id })
    }

    changeHost = (event, index, value) => this.setState({ host: value });

    changeTitle(e) {
        this.setState({ title: e.target.value });
    }

    changeEventDate = (event, date) => {
        this.setState({
            event_date: date,
        });
    };

    changeEventType(e) {
        this.setState({ event_type: e.target.value });
    }

    changeStatus(e) {
        this.setState({ status: e.target.value });
    }

    changeDescription(e) {
        this.setState({ description: e.target.value });
    }

    changeLocation(e) {
        this.setState({ location: e.target.value });
    }

    eventRegister() {
        var result = {

            "title": this.state.title,
            "location": this.state.location,
            "event_type": this.state.event_type,
            "status": this.state.status,
            "business_id": this.state.business_id,
            "category_id": this.state.category_id,
            "host_id": this.state.host_id,
            "asset_id": this.state.asset_id,
            "description": this.state.description,
            "event_date": this.state.event_date,


        }
        this.props.createAction.addEvent(result);

    }

    selectedUser(obj) {
        console.log(obj)

        this.setState({ host: obj.name, host_id: obj._id });
    }

    selectedAsset(obj) {
        this.setState({ assetid: obj._id, asset_name: obj.asset_name });
    }


    render() {
        return (
            <div>
                <HomeHeader />
                <AdminMenu />
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
                            <img src={mock} alt="" className="img-responsive wow animated zoomIn animation-delay-8 eventImg" />
                        </div>
                        <div className="col-md-6">
                            <Card>
                                <center><CardTitle title="Create Event" />
                                    <CardText>
                                        <div className="form-horizontal" >
                                            <fieldset>
                                                <div className="form-group" >
                                                    <div className="row">
                                                        <div className='col-md-offset-1'>
                                                            <div className='col-md-3'>
                                                                <TextField
                                                                    hintText="Enter Title"
                                                                    floatingLabelText="Title"
                                                                    onChange={this.changeTitle}
                                                                    value={this.state.title}
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
                                                    <div className="row">
                                                        <div className='col-md-offset-1'>
                                                            <div className='col-md-3'>
                                                                <TextField
                                                                    hintText="Enter Event Type"
                                                                    floatingLabelText="Event Type"
                                                                    onChange={this.changeEventType}
                                                                    value={this.state.event_type}
                                                                /><br />
                                                            </div>
                                                            <div className='col-md-3 textboxAlign'>
                                                                <TextField
                                                                    hintText="Enter Status"
                                                                    floatingLabelText="Status"
                                                                    onChange={this.changeStatus}
                                                                    value={this.state.status}
                                                                /><br />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group" >
                                                    <div className="row">
                                                        <div className='col-md-offset-1'>
                                                            <div className='col-md-3'>
                                                                <SelectField
                                                                    hintText="Enter Asset"
                                                                    value={this.state.asset_name}
                                                                >
                                                                    {
                                                                        this.state.assetList.map((obj, index) => {
                                                                            return (<MenuItem value={obj.asset_name} primaryText={obj.asset_name} onClick={this.selectedAsset.bind(this, obj)} />
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectField><br />
                                                            </div>
                                                            <div className='col-md-3 textboxAlign'>
                                                                <SelectField value={this.state.category_name} hintText="Select Category">
                                                                    {
                                                                        this.state.categoryList.map((obj, index) => {
                                                                            return (<MenuItem key={index} value={obj.name} primaryText={obj.name} onClick={this.handleCategorySelect.bind(this, obj)} />)
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
                                                                    hintText="Enter Host"
                                                                    value={this.state.host}
                                                                >
                                                                    {
                                                                        this.state.userList.map((obj, index) => {
                                                                            return (<MenuItem value={obj.name} primaryText={obj.name} onClick={this.selectedUser.bind(this, obj)} />
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectField><br />
                                                            </div>
                                                            <div className='col-md-3 textboxAlign'>
                                                                <TextField
                                                                    hintText="Enter Description"
                                                                    multiLine={true}
                                                                    rows={1}
                                                                    rowsMax={4}
                                                                    onChange={this.changeDescription}
                                                                    value={this.state.description}
                                                                /><br />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group" >
                                                    <div className="row">
                                                        <DatePicker hintText="Event Date" mode="landscape" onChange={this.changeEventDate} value={this.state.event_date} />
                                                    </div>
                                                </div>
                                                <div className="form-group" >
                                                    <div style={{ marginLeft: "25%" }} className="col-md-6">
                                                        <RaisedButton label="Create" primary={true} onClick={this.eventRegister} />
                                                        <RaisedButton label="Cancel" secondary={true} onClick={browserHistory.goBack} style={{ marginLeft: '10px' }} />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </CardText>
                                </center>
                            </Card>
                        </div>
                    </div>
                </MuiThemeProvider>
                <Footer />

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    console.log('his state', state)
    return {
        createEvent: state.createEvent,
        eventResponse: state.event.createSuccess,
        eventError: state.event.createrejected,
        getUser: state.student.getUserSuccess,
        getAssets: state.assets.getAssetSuccess,
        getCategory: state.category.getSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createAction: bindActionCreators(createAction, dispatch),
        UserAction: bindActionCreators(UserAction, dispatch),
        AssetAction: bindActionCreators(AssetAction, dispatch),
        category: bindActionCreators(category, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventComponent);