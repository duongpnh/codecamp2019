import React, { Component } from 'react';
import { fetchCommunities } from '../actions/communities'
import { connect } from 'react-redux'
import Loading from '../components/Loading'

class Community extends Component {

    componentDidMount() {
        this.props.getCommunities()
    }

    render() {
        
        const { communities: { data, isFetching } } = this.props
        const userInfo = this.props.userInfo.data
        if (isFetching) {
            return <Loading />
        }
        return (
            <div className="community-wrapper">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ? data.map(community => (
                                <tr key={community.id}>
                                    <th scope="row">{community.id}</th>
                                    <td>{community.banner}</td>
                                    <td>{community.name}</td>
                                    <td>{community.description}</td>
                                    <td>{community.user_id === userInfo.id ? (
                                        <button className="btn btn-dark">Joined</button>
                                    ) : <button className="btn btn-primary">Join</button>}</td>
                                </tr>
                            )): <tr><td colSpan='5'>No data to display</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        communities: state.communities,
        userInfo: state.userInfo
    }
}

const mapDispatchFromProps = dispatch => ({
    getCommunities: () => dispatch(fetchCommunities())
})

export default connect(mapStateToProps, mapDispatchFromProps)(Community);
