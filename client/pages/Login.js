import React from 'react';
import './Login.scss'
import { connect } from 'react-redux'
import { userLogin } from '../actions/user'

class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }

    onChange = e => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    login = (e, push) => {
        e.preventDefault()
        this.props.login(this.state, push)
    }

    render() {
        const { push } = this.props.history
        return (
            <React.Fragment>
                <div className="col-xs-12 col-sm-12 col-md-8 login-form">
                    <form onSubmit={(e) => this.login(e, push)}>
                        <h1>Login</h1>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input onChange={this.onChange} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input onChange={this.onChange} name="password" type="password" className="form-control" id="inputPassword" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchFromProps = dispatch => ({
    login: (user, push) => dispatch(userLogin(user, push))
})

export default connect(mapStateToProps, mapDispatchFromProps)(Login);
