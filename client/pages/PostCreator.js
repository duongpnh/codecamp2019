import React, { Component } from 'react';
import './PostCreator.scss';
import Editor from '../components/Editor';
import { connect } from 'react-redux'
import { createNewPost } from '../actions/posts'
import { fetchCommunities } from '../actions/communities';

class PostCreator extends Component {

    state = {
        community_id: "",
        title: "",
        text: ""
    }

    componentDidMount() {
        this.props.getCommunities()
    }

    onChange = e => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    onChangeEditorListener = (text) => {
        this.setState({text})
    }

    createPost = (e, push) => {
        e.preventDefault()
        const { community_id, title, text } = this.state
        const {userInfo: { data, isFetching }} = this.props
        if (!data) {
            push('/login')
        } else {
            const newPost = {
                community_id,
                title,
                content: text,
                owner_id: data.id
            }
            this.props.createPost(newPost, push)
        }
    }

    render() {
        const { push } = this.props.history
        const { communities: { data, isFetching } } = this.props
        return (
            <div className="post__creator--container">
                <div className="btn-group select-community">
                    <select className="btn btn-primary" onChange={this.onChange} name="community_id">
                        <option value="" defaultValue>Choose a community</option>
                        {data && data.map(community => (
                            <option key={community.id} value={community.id}>{community.name}</option>
                        ))}
                    </select>
                </div>
                <input 
                    className="form-control post__title mt-3"
                    name="title"
                    onChange={this.onChange}
                    placeholder="Title"
                    maxLength="300"
                />
                <Editor onTextChange={this.onChangeEditorListener}/>
                <button className="btn btn-primary mt-3" onClick={(e) => this.createPost(e, push)}>POST</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    communities: state.communities
})

const mapDispatchFromProps = dispatch => ({
    createPost: (post, push) => dispatch(createNewPost(post, push)),
    getCommunities: () => dispatch(fetchCommunities())
})

export default connect(mapStateToProps, mapDispatchFromProps)(PostCreator);
