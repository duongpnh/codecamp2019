import React, { createRef, Component } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import hljs from "highlight.js/lib/highlight"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)

class Card extends Component {

    constructor(props) {
        super(props)
        this.nodeRef = createRef()
    } 

    componentDidMount() {
        this.highlight();
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
        return (
            <div className="custom-card">
                <div className="card__top">
                    <div className="card__top--left">
                        <img 
                            src={this.props.authorAvatar}
                            alt=""
                            className="author-avatar"
                        />
                        <Link to="/posts/1">{this.props.authorName}</Link>
                    </div>
                    <div className="card__top--right">
                        {this.props.postCreatedTime}
                    </div>
                </div>
                <div className="card__middle">
                    <div className="card-title">
                        <h4>{this.props.postTitle}</h4>
                    </div>
                    <div ref={this.nodeRef} dangerouslySetInnerHTML={{__html: this.props.postContent}} className="card-content" />
                </div>
                <div className="card__bottom">
                    <div className="card-vote">
                        <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
                        <span>{this.props.voteQuantity}</span>
                        <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                    </div>
                    <div className="card-comment">
                        <i className="fa fa-comment" aria-hidden="true"></i>
                        <span>{this.props.commentQuantity}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
