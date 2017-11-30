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
import studentRegister from '../../actions/student';
import categoryById from '../../actions/category';
import moment from 'moment';
import Moment from 'react-moment';
import * as Actions from '../../actions/loginActions';


class ListTrainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trainers: [],
            selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
    
        var token = localStorage.getItem('token');
        this.props.actions.getTrainers(token);
    
        
    }

    componentWillReceiveProps(nextProps) {
        console.log('necxxProps',nextProps)
        var allPersons = nextProps.allTrainers.data.result;
        var trainersAlone = [];
        for (var i = 0; i < allPersons.length; i++) {
          if (allPersons[i].user_type == 'TRAINER') {
            trainersAlone.push(allPersons[i]);
          }
        }
        console.log("trainersAlone  ", trainersAlone);
        this.setState({ trainers: trainersAlone }); 
    };

    isSelected = (index) => {

        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    handleChange = (e,obj) => {
        console.log('the hghghg ',obj)
        
        // localStorage.setItem('selectedCategory', JSON.stringify(data));
        browserHistory.push('/CreateCategory')
    };


    render() {
        return (
            <div>
                <HomeHeader />
                <AdminMenu />
                <MuiThemeProvider>
                    <Card>
                        <center><CardTitle title="List of Trainers" /></center>
                        <CardText>
                            <Table   className="table-hover" onRowSelection={this.handleRowSelection}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Date of Birth </TableHeaderColumn> 
                                        <TableHeaderColumn>Email</TableHeaderColumn>
                                        <TableHeaderColumn>Phone No</TableHeaderColumn>
                                        <TableHeaderColumn>Register Date</TableHeaderColumn>
                                        {/* <TableHeaderColumn>Category Name</TableHeaderColumn>
                                        <TableHeaderColumn>Register date</TableHeaderColumn> */}

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.state.trainers.map((listValue, index) => {
                                        return (
                                            <TableRow selected={this.isSelected(index)} key={index} onChange={(e) => this.handleChange(e, listValue)}>
                                                <TableRowColumn>{listValue.name}</TableRowColumn>
                                                <TableRowColumn>{moment(listValue.dob).format('YYYY-MM-DD')}</TableRowColumn>
                                                <TableRowColumn>{listValue.email}</TableRowColumn>
                                                <TableRowColumn>{listValue.phone}</TableRowColumn>
                                                <TableRowColumn>{moment(listValue.created_date).format('YYYY-MM-DD')}</TableRowColumn>
                                               
                                                

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
    console.log("state>>>>>>>>>" , state);
    return {
        allTrainers: state.login.allTrainers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTrainer);