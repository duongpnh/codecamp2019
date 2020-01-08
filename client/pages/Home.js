import React, { Fragment, Component } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import Loading from '../components/Loading';
import './Home.scss';

class Home extends Component {

    state = {
        page: 1
    }

    componentDidMount() {
        this.props.getPosts(this.state.page)
    }

    loadPostsBelongToPage = (e, page, totalPage) => {
        e.preventDefault()
        this.setState({page: page})
        if (page > totalPage) {
            this.props.getPosts(page-1)
        } else if (page < 1) {
            this.props.getPosts(1)
        } else {
            this.props.getPosts(page)
        }
    }

    render() {
        const { posts: { data: { totalPage, rs }, isFetching } } = this.props
        if (isFetching) {
            return <Loading />
        }
        let dataIsNotLocked = []
        if (rs && rs.length > 0) {
            dataIsNotLocked = rs.filter(post => !post.is_locked)
        }
        return (
            <Fragment>
                <div className="post__creator">
                    <Link to="/submit">
                        <input type="text" className="form-control" placeholder="Create Post" />
                    </Link>
                </div>
                {dataIsNotLocked && dataIsNotLocked.length > 0 ? dataIsNotLocked.map(post => (
                    <Link key={post.id} to={`/posts/${post.id}`} className="custom-link">
                        <Card
                            authorAvatar="https://a.thumbs.redditmedia.com/E0Bkwgwe5TkVLflBA7WMe9fMSC7DV2UOeff-UpNJeb0.png"
                            authorName="r/news"
                            postCreatedTime="6 hours ago" 
                            postTitle={post.title}
                            postContent={post.content}
                            voteQuantity="2.7k"
                            commentQuantity="99 Comments"
                        />
                    </Link>
                )) : <div className="mt-3 text-center">No data to display</div> }
                <nav aria-label="Page navigation example" className="mt-3 custom-pagination">
                    <ul className="pagination">
                        <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous" onClick={(e) => this.loadPostsBelongToPage(e, this.state.page--, totalPage)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        {totalPage ? [...Array(totalPage).keys()].map(page =>(
                            <li key={page} className="page-item"><a className="page-link" href="#" onClick={(e) => this.loadPostsBelongToPage(e, page, totalPage)}>{++page}</a></li>
                        )) : <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.loadPostsBelongToPage(e, 1, totalPage)}>1</a></li> }
                        <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next" onClick={(e) => this.loadPostsBelongToPage(e, this.state.page++, totalPage)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

const mapDispatchFromProps = dispatch => ({
    getPosts: (page) => dispatch(fetchPosts(page))
})

export default connect(mapStateToProps, mapDispatchFromProps)(Home);