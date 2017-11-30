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
import AssetAction from '../../actions/assets';



class ListAssets extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          assetsDetails:[],
          selected: [],
        }
        this.isSelected = this.isSelected.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.AssetAction.getAssets();
      localStorage.setItem('selectedAssets', '');
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps',nextProps)
        var assets = nextProps.getAssets.result;
        
        this.setState({assetsDetails:assets})
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
        browserHistory.push('/CreateAssets')
    };
    

    render() {
        return (
          <div>
            <HomeHeader />
            <AdminMenu/>
            <MuiThemeProvider>
            <Card>
              <center><CardTitle title="List of Assets"/></center>
              <CardText>
              <Table  className="table-hover" onRowSelection={this.handleRowSelection}>
                <TableHeader>
                  <TableRow>
                      <TableHeaderColumn>Assets Name</TableHeaderColumn>
                      <TableHeaderColumn>Assets Cost</TableHeaderColumn>
                      <TableHeaderColumn>Purchase Cost</TableHeaderColumn> 
                      <TableHeaderColumn>Revenue for Business</TableHeaderColumn>
                      <TableHeaderColumn>Orgin Date</TableHeaderColumn>
                      <TableHeaderColumn>Expire Date</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.assetsDetails.map(( listValue, index ) => {
                      return (
                        <TableRow selected={this.isSelected(index)} key={index} onChange={(e) => this.handleChange(e, listValue)}>
                            <TableRowColumn>{listValue.asset_name}</TableRowColumn>
                            <TableRowColumn>{listValue.asset_cost}</TableRowColumn>
                            <TableRowColumn>{listValue.purchase_cost}</TableRowColumn>
                            <TableRowColumn>{listValue.revenue_for_business}</TableRowColumn>
                            <TableRowColumn>{listValue.origin_date}</TableRowColumn>
                            <TableRowColumn>{listValue.expire_date}</TableRowColumn>
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
        getAssets: state.assets.getAssetSuccess,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        AssetAction : bindActionCreators(AssetAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAssets);