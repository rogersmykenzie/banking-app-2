import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { setBalance, setUsername } from '../redux/reducer';
import { connect } from 'react-redux';

class Register extends Component {
    constructor() {
        super(); //runs the parent constructor
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            redirect: false,
            error: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.placeholder.toLowerCase()]: e.target.value
        })
    }

    handleClick = (e) => {
        axios.post('/auth/register/user', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name
        }).then(response => {
            console.log(response);
            this.props.setUsername(response.data.username);
            this.props.setBalance(response.data.balance);
            this.setState({redirect: true});
        }).catch(error => {
            this.setState({error: error.response.data.error});
        })
    }

    render() {
        console.log('props', this.props)
        if(this.state.redirect === true) {
            return <Redirect to='/dashboard' />
        }

        return (
            <div>
                <h3>{this.state.error}</h3>
                {this.props.loginFirst ? <h5>Please Login or Register First</h5> : null}
                <h1>Register Today!</h1>
                <input placeholder="Username" onChange={this.handleChange} />
                <input placeholder="Password" onChange={this.handleChange} />
                <input placeholder="Email" onChange={this.handleChange} />
                <input placeholder="Name" onChange={this.handleChange} />
                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = state => { //Take in redux state
    return { 
        username: state.username, //Keys - the Prop names
        balance: state.balance, // Values - The prop values
        loginFirst: state.loginFirst
    }
}

export default connect(mapStateToProps, {setBalance,setUsername})(Register);