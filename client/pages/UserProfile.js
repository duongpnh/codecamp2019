import React, { Component } from 'react';
import './UserProfile.scss';
import { fetchUserInfo } from '../actions/user'
import { connect } from 'react-redux'
import Community from './Community';

class UserProfile extends Component {

    componentDidMount() {
        this.props.getUserInfo()
    }

    render() {
        const { userInfo: { data, isFetching } } = this.props
        return data ?
        (
            <div className="user__profile--wrapper">
                <div className="user__profile">
                    <div className="user__profile--front">
                        <img src={data.image_path} />
                    </div>
                    <div className="user__profile--back">
                        <div className="displayName">
                            {`${data.first_name} ${data.last_name}`}
                        </div>
                        <div className="perk-wrapper">
                            <div className="perk perk-blood">
                                <i 
                                    title="First Blood"
                                    className="fa fa-first-order perk fa-3x" 
                                    aria-hidden="true"
                                ></i>
                                <span>5</span>
                            </div>
                            <div className="perk perk-blood">
                                <i 
                                    title="Informative Guy"
                                    className="fa fa-first-order text-info perk fa-3x" 
                                    aria-hidden="true"
                                ></i>
                                <span>1</span>
                            </div>
                            <div className="perk perk-blood">
                                <i 
                                    title="Easy-going Girl"
                                    className="fa fa-first-order text-warning perk fa-3x" 
                                    aria-hidden="true"
                                ></i>
                                <span>1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userInfo">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="community-tab" data-toggle="tab" href="#community" role="tab" aria-controls="home" aria-selected="true">Communities</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">My Posts</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="community" role="tabpanel" aria-labelledby="community-tab">
                            <Community />
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">b...</div>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
})

const mapDispatchFromProps = dispatch => ({
    getUserInfo: () => dispatch(fetchUserInfo())
})

export default connect(mapStateToProps, mapDispatchFromProps)(UserProfile);
