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



class ListStudent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            studentDetails: [],
            selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.studentRegister.getUser();
    
        localStorage.setItem('selectedCategory', '');
    }
    componentWillUpdate(props){
      
    }
    componentWillReceiveProps(nextProps) {
        // console.log('nextPROPS', nextProps)
        var user = nextProps.getUser.result;
        //   console.log('the user',user)
          var tempdata=user;
         var student=[];
     for( var i=0;i<user.length;i++){
          tempdata[i].firstName =user[i].firstName +" "+user[i].lastName
         student.push(tempdata);
        
     }

        this.setState({
            studentDetails: tempdata
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

    handleChange = (e,obj) => {
        // console.log('the hghghg ',obj)
        
        // localStorage.setItem('selectedCategory', JSON.stringify(data));
        browserHistory.push('/StudentRegister')
        this.props.studentRegister.getUser();
    };


    render() {
     
        return (
            <div>
                <HomeHeader />
                <AdminMenu />
                <MuiThemeProvider>
                    <Card>
                        <center><CardTitle title="List of Student" /></center>
                        <CardText>
                            <Table   className="table-hover" onRowSelection={this.handleRowSelection}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>Student Name</TableHeaderColumn>
                                        <TableHeaderColumn>Gender </TableHeaderColumn> 
                                        <TableHeaderColumn>Email</TableHeaderColumn>
                                        <TableHeaderColumn>Contact Number</TableHeaderColumn>
                                        <TableHeaderColumn>Interested Dance Form</TableHeaderColumn>
                                        <TableHeaderColumn>Prefer Batch</TableHeaderColumn>
                                        <TableHeaderColumn>Prefer Batch Time</TableHeaderColumn>
                                        <TableHeaderColumn>Register Date</TableHeaderColumn>
                                        

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    { this.state.studentDetails.filter(function (listValue, index) {
                                        console.log('yejj ',listValue.user_type)
                                    if ( listValue.user_type != "ADMIN" &&listValue.user_type != "TRAINER" ) return true
                                           
                                            }).map((listValue, index) =>
                                       

                                    
                                            <TableRow selected={this.isSelected(index)} key={index} onChange={(e) => this.handleChange(e, listValue)}>
                                                <TableRowColumn>{listValue.firstName}</TableRowColumn>
                                                <TableRowColumn>{listValue.gender}</TableRowColumn>
                                                <TableRowColumn>{listValue.email}</TableRowColumn>
                                                <TableRowColumn>{listValue.phone}</TableRowColumn>
                                                <TableRowColumn>{listValue.category_id}</TableRowColumn> 
                                                <TableRowColumn>{listValue.batch_schedule}</TableRowColumn> 
                                                <TableRowColumn>{listValue.batch_time}</TableRowColumn> 
                                                
                                                <TableRowColumn>{moment(listValue.created_date).format('YYYY-MM-DD')}</TableRowColumn>
                                            </TableRow>
                                    
                                    )}
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
        getUser: state.student.getUserSuccess,
        getCategoryById:state.category.getSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentRegister: bindActionCreators(studentRegister, dispatch),
        categoryById: bindActionCreators(categoryById, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudent);