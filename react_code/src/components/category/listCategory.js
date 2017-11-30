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
import category from '../../actions/category';



class ListCategory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryDetails: [],
            selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.category.getCategory();
        localStorage.setItem('selectedCategory', '');
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextPROPS', nextProps)
        var category = nextProps.getCategory.result;
        this.setState({
            categoryDetails: category,
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
        localStorage.setItem('selectedCategory', JSON.stringify(data));
        browserHistory.push('/CreateCategory')
    };


    render() {
        return (
            <div>
                <HomeHeader />
                <AdminMenu />
                <MuiThemeProvider>
                    <Card>
                        <center><CardTitle title="List of Category" /></center>
                        <CardText>
                            <Table   className="table-hover" onRowSelection={this.handleRowSelection}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Description</TableHeaderColumn>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.state.categoryDetails.map((listValue, index) => {
                                        return (
                                            <TableRow selected={this.isSelected(index)} key={index} onChange={(e) => this.handleChange(e, listValue)}>
                                                <TableRowColumn>{listValue.name}</TableRowColumn>
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
    console.log("state>>>>>>>>>" + state);
    return {
        getCategory: state.category.getSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        category: bindActionCreators(category, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategory);