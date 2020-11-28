import React, { Component } from "react";
// import axios from "axios";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: null,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const { data } = response;
        const posts = data.slice(0, 4);
        const updatedProps = posts.map((post) => ({
          ...post,
          author: "Daniel",
        }));
        this.setState({
          posts: updatedProps,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          posts: null,
          error: "Something went wrong! No data fetched!",
        });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({
      selectedPostId: id,
    });
  };

  render() {
    const { posts, selectedPostId, error } = this.state;
    return (
      <div className={"Blog"}>
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/new-post">New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="Posts">
          {error && <p>{error}</p>}
          {posts &&
            posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={this.postSelectedHandler.bind(this, post.id)}
              />
            ))}
        </section>
        <section>
          <FullPost id={selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
