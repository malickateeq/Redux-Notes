import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends Component 
{
    componentDidMount()
    {
        this.props.fetchPostsAndUsers();
    }
    renderList()
    {
        return this.props.posts.map( (post, index) => {
            return (
                <div className="item" key={index}>
                    <i className="large middle aligned icon user"></i>
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    </div>
                    <UserHeader userId={post.userId} />
                </div>
            );
        });
    }
    render() 
    {
        return (
            <div>
                { this.renderList() }
            </div>
        )
    }
}

const mapStateToProps = (state) =>
{
    return { posts: state.posts, users: state.users };
}

export default connect(
    mapStateToProps, 
    { fetchPostsAndUsers }
)(PostList);