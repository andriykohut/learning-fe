import uuidv4 from 'uuid/v4';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class CreateForm extends Component {
  state = {
    title: '',
    text: '',
    id: uuidv4(),
  }

  handleChange = (event, target) => {
    const state = {};
    state[target] = event.target.value;
    this.setState(state);
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(Object.assign({}, this.state));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title:
          <input key="title" type="text" value={this.state.title} onChange={e => this.handleChange(e, "title")} />
        </label>
        <label>Text:
          <input key="text" type="text" value={this.state.text} onChange={e => this.handleChange(e, "text")} />
        </label>
        <input type="submit" value="Create post" />
        <button onClick={this.props.onCancel}>Cancel</button>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      createFormVisible: false,
    }
  }
  handleSubmit = post => {
    const newPost = {post.id: {post.title, post.text}};
    this.setState({
      posts: Object.assign({}, this.state.posts, newPost),
      createFormVisible: false,
    })
  }
  renderPosts = () => {
    return this.state.posts.map((id, post) => {
      return (
        <div key={id}>
          <div>{post.title}</div>
          <div>{post.text}</div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Blog</h1>
        </header>
        {this.state.createFormVisible ?
          <CreateForm
            onSubmit={this.handleSubmit}
            onCancel={() => this.setState({createFormVisible: false})}
          /> :
          <button onClick={() => this.setState({createFormVisible: true})}>+</button>}
        {this.renderPosts()}
      </div>
    );
  }
}

export default App;
