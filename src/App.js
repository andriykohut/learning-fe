import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './App.css';

import CreateEditForm from './CreateEditForm';
import PostList from './PostList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      createFormVisible: false,
    }
  }
  handleDelete = id => {
    const posts = Object.assign({}, this.state.posts);
    delete posts[id];
    this.setState({
      posts: posts,
    });
  }
  handleSubmit = post => {
    const newPost = {[post.id]: {title: post.title, text: post.text}};
    this.setState({
      posts: Object.assign({}, this.state.posts, newPost),
      createFormVisible: false,
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Blog</h1>
        </header>
        {this.state.createFormVisible ?
          <CreateEditForm
            onSubmit={this.handleSubmit}
            onCancel={() => this.setState({createFormVisible: false})}
          /> :
          <Button onClick={() => this.setState({createFormVisible: true})}>+</Button>}
        <PostList posts={this.state.posts} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
