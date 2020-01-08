import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { connect } from 'react-redux'
import { fetchUserInfo, actReceiveUserInfo } from '../../actions/user'
import Loading from '../Loading'


class Navigation extends Component {

    componentDidMount() {
        if (!this.props.userInfo.data) {
            this.props.getUSerInfo()
        }
    }

    logout = () => {
        if ("token" in localStorage) {
            localStorage.removeItem("token")
        }
        this.props.logout()
    }

    render() {
        const { userInfo: { data, isFetching } } = this.props
        if (isFetching) {
            return <Loading />
        }
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                    <Link to="/" className="navbar-brand">
                        <img 
                            src="https://wwwtechnical.com/images/anonymous.png" 
                            width="40" 
                            height="40"
                            style={{marginRight: "1rem", objectFit: "cover"}}
                        />
                        NSL
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src=""
                                        width="30"
                                        height="30"
                                        alt=""
                                    />
                                    <img 
                                        src={!data ? "https://www.w3schools.com/howto/img_avatar.png" : data.image_path}
                                        width="30px"
                                        height="30px" 
                                        style={{marginRight: '0.5rem', borderRadius: '50%', objectFit: 'cover'}}
                                    />
                                    { data ? `${data &&data.first_name} ${data.last_name}` : "Display Name" }
                                    <i 
                                        title="First Blood"
                                        className="fa fa-first-order perk" 
                                        aria-hidden="true"
                                    ></i>
                                    <i 
                                        title="Informative Guy"
                                        className="fa fa-first-order text-info perk" 
                                        aria-hidden="true"
                                    ></i>
                                    <i 
                                        title="Easy-going Girl"
                                        className="fa fa-first-order text-warning perk" 
                                        aria-hidden="true"
                                    ></i>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {!data ? (
                                        <>
                                            <Link to="/login" className="dropdown-item">Login</Link>
                                            <Link to="/register" className="dropdown-item">Register</Link>
                                        </>
                                    ) : 
                                    <>
                                        <Link to="/user/profile" className="dropdown-item">User Profile</Link>
                                        <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                    </> 
                                    }
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
})

const mapDispatchFromProps = dispatch => ({
    getUSerInfo: () => dispatch(fetchUserInfo()),
    logout: () => dispatch(actReceiveUserInfo(null))
})

export default connect(mapStateToProps, mapDispatchFromProps)(Navigation);