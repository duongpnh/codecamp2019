import React from 'react';
import './Register.scss';
import { connect } from 'react-redux';
import { userRegister } from '../actions/user';
import axios from 'axios';
import API from '../constants/API';
import { ROOT_STORAGE } from '../constants/API';

class Register extends React.Component {

    state = {
        first_name: "",
        last_name: "",
        gender: 1,
        email: "",
        password: "",
        confirm_password: "",
        uploadProgress: 0,
        selectedFile: null,
        image_path: "",
        message: ""
    }

    onChangeListener = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    registerUser = (e, push) => {
        e.preventDefault()
        const { first_name, last_name, gender, email, password, image_path } = this.state 
        if (this.state.password === this.state.confirm_password) {
            const user = {
                first_name,
                last_name,
                gender,
                email,
                password,
                image_path
            }
            this.props.register(user, push);
        }
    }

    selectFile = e => {
        this.setState({
            selectedFile: e.target.files[0],
            uploadProgress: 0
        })
    }

    uploadAvatar = (e) => {
        e.preventDefault()
        if (this.state.selectedFile) {
            const formData = new FormData()
            formData.append("file", this.state.selectedFile);
            return axios.post(
                `${ROOT_STORAGE}/${API.UPLOAD_AVATAR}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: (progressEvent) => this.setState({
                        uploadProgress: progressEvent.loaded
                    })
                }
            )
            .then(res => {
                const url = `${ROOT_STORAGE}/images/${res.data.location.split("/").pop()}`
                this.setState({
                    image_path: url,
                    message: res.data.message
                })
            })
            .catch(error => console.log(error))
        }
    }

    render() {
        const { push } = this.props.history
        return (
            <div className="col-xs-12 col-sm-12 col-md-8 register-form">
                <form>
                    <h1>Register</h1>

                    <div className="form-group">
                        <label htmlFor="inputFirstName">First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputFirstName" 
                            name="first_name"
                            onChange={this.onChangeListener}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputLastName" 
                            name="last_name"
                            onChange={this.onChangeListener}
                        />
                    </div>
                    <div className="form-group gender">
                        <div className="custom-control custom-radio">
                            <input 
                                type="radio" 
                                className="custom-control-input" 
                                name="gender" 
                                id="female" 
                                value={0} 
                                checked={this.state.gender === 0}
                                onChange={this.onChangeListener}
                            />
                            <label className="custom-control-label" htmlFor="female">Female</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input 
                                type="radio" 
                                className="custom-control-input" 
                                name="gender" 
                                id="male" 
                                value={1}
                                checked={this.state.gender === 1}
                                onChange={this.onChangeListener}
                            />
                            <label className="custom-control-label" htmlFor="male">Male</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input 
                                type="radio" 
                                className="custom-control-input" 
                                name="gender" 
                                id="other" 
                                value={2}
                                checked={this.state.gender === 2}
                                onChange={this.onChangeListener}
                            />
                            <label className="custom-control-label" htmlFor="other">Other</label>
                        </div> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            id="inputEmail" 
                            aria-describedby="emailHelp"
                            onChange={this.onChangeListener}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            id="inputPassword" 
                            onChange={this.onChangeListener}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputConfirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirm_password" 
                            className="form-control" 
                            id="inputConfirmPassword"
                            onChange={this.onChangeListener}
                         />
                    </div>
                    <div className="form-group">
                        <input 
                            type="file" 
                            name="avatar" 
                            className="form-control-file border mb-3" 
                            onChange={this.selectFile}
                        />
                        <div className="upload">
                            <button 
                                className="btn btn-primary" 
                                onClick={this.uploadAvatar}
                            >
                                Upload
                            </button>
                            {this.state.message && this.state.message !== "" ? (
                                <div className="alert alert-success" role="alert">
                                    {this.state.message}
                                </div>
                            ) : null }
                            
                        </div>
                    </div>
                    <div className="progress mb-3">
                        <div 
                            className="progress-bar" 
                            role="progressbar" 
                            aria-valuenow="0" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                            style={{width: `${this.state.uploadProgress}%`}}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={(e) => this.registerUser(e, push)}>Register</button>
                </form>
            </div>
        );
    }
}

const mapDispatchFromProps = dispatch => ({
    register: (user, push) => dispatch(userRegister(user, push))
})

export default connect(null, mapDispatchFromProps)(Register);
