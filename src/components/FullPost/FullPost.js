import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidUpdate() {
    const { id } = this.props;
    const { loadedPost } = this.state;
    if (id) {
      if (!loadedPost || (loadedPost && id !== loadedPost.id)) {
        axios.get(`/posts/${id}`).then((response) => {
          const { data } = response;
          this.setState({
            loadedPost: data,
          });
        });
      }
    }
  }

  deletePostHandler = (id) => {
    axios.delete(`/posts/${id}`).then((response) => {
      console.log(response);
    });
  };

  render() {
    const { id } = this.props;
    const { loadedPost } = this.state;

    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    if (loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className="Edit">
            <button
              className="Delete"
              onClick={this.deletePostHandler.bind(this, id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
