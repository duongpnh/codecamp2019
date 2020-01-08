import React from 'react'
import { Link }from 'react-router-dom'
import './Details.scss'
import { connect } from 'react-redux'
import { fetchPostById } from '../actions/posts'
import hljs from "highlight.js/lib/highlight"
import 'highlight.js/styles/atom-one-light.css'
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)

class Details extends React.Component {

    constructor(props) {
        super(props)
        this.nodeRef = React.createRef()
    } 

    componentDidMount() {
        this.highlight();
        this.props.getPostById(this.props.match.params.id)
    }

    componentDidUpdate() {
        this.highlight();
    }

    highlight = () => {
        if (this.nodeRef) {
            const nodes = this.nodeRef.current.querySelectorAll('pre');
            nodes.forEach((node) => {
                hljs.highlightBlock(node);
            });
        }
    }

    render() {
        const { post: { data, isFetching } } = this.props
    
        let timeCreatedPost = null;
        if (data && data.updated_at) {
            const dt = new Date(data.updated_at)
            timeCreatedPost = `${
                (dt.getMonth()+1).toString().padStart(2, '0')}/${
                dt.getDate().toString().padStart(2, '0')}/${
                dt.getFullYear().toString().padStart(4, '0')} ${
                dt.getHours().toString().padStart(2, '0')}:${
                dt.getMinutes().toString().padStart(2, '0')}:${
                dt.getSeconds().toString().padStart(2, '0')}`
        }
        return (
            <div className="post">
                <div className="post__title">{data && data.title}</div>
                <div className="post__info">
                    <div className="post__author">
                        <img 
                            src="https://a.thumbs.redditmedia.com/E0Bkwgwe5TkVLflBA7WMe9fMSC7DV2UOeff-UpNJeb0.png"
                            alt=""
                            className="author-avatar"
                        />
                        <Link to="/">r/news</Link>
                    </div>
                    <div className="post__created-time">
                        {timeCreatedPost}
                    </div>
                </div>
                <div 
                    ref={this.nodeRef} 
                    dangerouslySetInnerHTML={{__html: data && data.content}} 
                    className="post__content" 
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    post: state.post
})

const mapDispatchFromProps = dispatch => ({
    getPostById: (id) => dispatch(fetchPostById(id))
})

export default connect(mapStateToProps, mapDispatchFromProps)(Details);