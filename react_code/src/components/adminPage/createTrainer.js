import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../asset/css/plugins.min.css';
import studentRegister from '../../actions/student';
import avatar from '../../asset/img/reg.png';
import '../../asset/css/style.themed.css';
import '../../asset/css/preload.css';
import '../../asset/css/style.light-blue-500.min.css';
import '../../asset/css/ng2-select.css';
import { Footer } from '../footer';
import { SubHeader } from '../subheader';
import DatePicker from 'material-ui/DatePicker';
import { HomeHeader } from '../homeHeader';
import { Navigation } from '../navigation';
import { CardBlock } from '../cardblock';
import { PanelBlock } from '../panelblock';
import { FeedBack } from '../feedback';
import { Activity } from '../activity';
import { Carousals } from '../carousal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import category from '../../actions/category';
import { AdminMenu } from './adminMenu';

const style = {
    margin: 12,
};
const styles = {
    customWidth: {
        width: 150,
    },
};



class CreateTrainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
                name: '',
                dob: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                qualification: '',
                category_id: '',
                categoryList:[]

        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleQualificationChange = this.handleQualificationChange.bind(this);
        this.saveStudentRegistration = this.saveStudentRegistration.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.selectDOB=this.selectDOB.bind(this);
    }


    handleNameChange(event) {
        this.setState({name:event.target.value})

    }

    handleEmailChange(event) {
        this.setState({email:event.target.value})

     }
     handlePhoneChange(event) {
        this.setState({phone:event.target.value})

     }
     handlePasswordChange(event) {
        this.setState({password:event.target.value})

     }
     handleAddressChange(event) {
        this.setState({address:event.target.value})

     }
     handleQualificationChange(event) {
        this.setState({qualification:event.target.value})

     }


    saveStudentRegistration() {
        var result = {
            "name":this.state.name,
            "email":this.state.email,
            "dob":this.state.dob,
            "address":this.state.address,
            "phone":this.state.phone,
            "password":this.state.password,
            "qualification":this.state.qualification,
            "category":this.state.category,
            "user_type":"TRAINER"

        }
        this.props.studentRegister.addStudentRegistration(result);
    }

    handleCategorySelect(data) {
        console.log('the target value',data.name);
        this.setState({ value: data.name})
    }


    selectDOB(event, date) {
        this.setState({
          dob: date
        })
      }

    componentWillMount() {
        this.props.category.getCategory();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps',nextProps)
        var category=nextProps.getCategory.result;
        
         this.setState({categoryList:category})
      
    //   if(nextProps.reponseData.message == 'Account Created Successfully') {
    //       browserHistory.push('/Dashboard');
    //   }else{
    //     alert('failed to create');
    //   }

  }

    render() {
        return (
            <div>
                <HomeHeader />
               <AdminMenu />
                <MuiThemeProvider>
                    <Card>
                        <center>
                            <CardTitle title="Create Trainers" subtitle="Trainers for the Dance!" />
                            <CardText>
                                <div className="form-horizontal" >
                                    <fieldset>

                                        <div className="form-group" >
                                            <div className="row">
                                                <div className='col-md-offset-4'>
                                                    <div className='col-md-3'>
                                                        <TextField
                                                            hintText="Enter Name"
                                                            floatingLabelText="Name"
                                                            onChange={this.handleNameChange}
                                                            name="name"
                                                        /><br />
                                                    </div>
                                                    <div className='col-md-3'style={{ paddingLeft: "55px" }}>
                                                        <TextField
                                                            hintText="Enter Email"
                                                            floatingLabelText="Email"
                                                            onChange={this.handleEmailChange}
                                                            name="email"
                                                        /><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div className="row">
                                                <div className='col-md-offset-4'>
                                                    <div className='col-md-3'>
                                                        <TextField
                                                            hintText="Enter Mobile Number"
                                                            floatingLabelText="Mobile Number"
                                                            onChange={this.handlePhoneChange}
                                                            name="phone"
                                                        /><br />
                                                    </div>
                                                    <div className='col-md-3'style={{ paddingLeft: "55px" }}>
                                                        <TextField
                                                            hintText="Enter Qualification"
                                                            floatingLabelText="Qualification"
                                                            onChange={this.handleQualificationChange}
                                                            name="qualification"
                                                        /><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div className="row">
                                                <div className='col-md-offset-4'>
                                                    <div className='col-md-3'>
                                                        <TextField
                                                            hintText="Enter Password"
                                                            type="password"
                                                            floatingLabelText="Password"
                                                            onChange={this.handlePasswordChange}
                                                            name="password"
                                                        /><br />
                                                    </div>
                                                    <div className='col-md-3'style={{ paddingLeft: "55px" }}>
                                                        <TextField
                                                            hintText="Enter Password Again"
                                                            type="password"
                                                            floatingLabelText="Password Again"
                                                            name="password"
                                                        /><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div className="row">
                                                <div className='col-md-offset-4'>
                                                    <div className='col-md-3'>
                                                    <SelectField value={this.state.value} hintText="Select Category">
                                                        {
                                                        this.state.categoryList.map((obj, index) => {
                                                        return ( <MenuItem key={index} value={obj.name} primaryText={obj.name} onClick={this.handleCategorySelect.bind(this, obj)}/>)
                                                                })
                                                          }
                                                             </SelectField>

                                                    </div>
                                                    <div className='col-md-3'style={{ paddingLeft: "55px" }}>
                                                        <DatePicker hintText="Date Of Birth" mode="landscape" autoOk={true} onChange={this.selectDOB} />
                                                        <br />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div className='col-md-offset-5'>
                                                <div className='col-md-3'>
                                                    <TextField
                                                        hintText="Enter Address"
                                                        floatingLabelText="Address"
                                                        onChange={this.handleAddressChange}
                                                        name='address'
                                                    /><br />

                                                </div>


                                            </div>
                                        </div>
                                        <div className="form-group" >
                                            <div style={{ marginLeft: "23%" }} className="col-md-6">
                                                <RaisedButton label="Create" onClick={this.saveStudentRegistration} primary={true} style={style} />
                                                <RaisedButton label="Cancel" secondary={true} style={style} />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </CardText>
                        </center>

                    </Card>
                </MuiThemeProvider>

                <Footer />

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
      reponseData:state.student.createSuccess,
      getCategory:state.category.getSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentRegister: bindActionCreators(studentRegister, dispatch),
        category: bindActionCreators(category,dispatch)
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrainer);
