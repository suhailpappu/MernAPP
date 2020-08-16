import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { getSinglePost } from '../../actions/post'
import PostItem from './PostItem'
import { Spinner } from '../layout/Spinner'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const SinglePost = ({getSinglePost,post:{post,loading},match}) => {

    useEffect(()=>{
        getSinglePost(match.params.id)
    },[getSinglePost])

    return (
        loading || post ===null ? <Spinner/> :
        <Fragment>
            <Link to='/posts' className='btn'>Back To Posts</Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id} />
            {
                post.comments.map(comment => (
                    <CommentItem key={comment._id} comment = {comment} postId={post._id} />
                ))
            }

        </Fragment>
    )
}

SinglePost.propTypes = {
    getSinglePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post:state.postState
})

export default  connect(mapStateToProps,{getSinglePost})(SinglePost)
