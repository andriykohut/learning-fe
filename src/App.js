import uuidv4 from 'uuid/v4';
import React, { Component } from 'react';
import { Button, List, Form, TextArea, Icon, Item } from 'semantic-ui-react';
import './App.css';

class CreateForm extends Component {
  state = {
    title: '',
    text: '',
    id: uuidv4(),
  }

  handleChange = (event, target) => {
    this.setState({[target]: event.target.value});
  }


  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(Object.assign({}, this.state));
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Title:</label>
          <input key="title" type="text" value={this.state.title} onChange={e => this.handleChange(e, "title")} />
        </Form.Field>
        <Form.Field>
          <label>Text:</label>
          <TextArea key="text" value={this.state.text} onChange={e => this.handleChange(e, "text")} />
        </Form.Field>
        <Button.Group>
          <Button positive>Save</Button>
          <Button.Or/>
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </Button.Group>
      </Form>
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
  renderPosts = () => {
    const items =  Object.entries(this.state.posts).map(entries => {
      let [id, post] = entries;
      return (
        <Item.Group key={id}>
          <Item>
            <Item.Content>
              <Item.Header>{post.title}</Item.Header>
              <Item.Description>{post.text}</Item.Description>
              <Button icon onClick={() => this.handleDelete(id)}>
                <Icon name="delete" />
              </Button>
            </Item.Content>
          </Item>
        </Item.Group>
      );
    });
    return (
      <List selection>
        {items}
      </List>
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Blog</h1>
        </header>
        {this.state.createFormVisible ?
          <CreateForm
            onSubmit={this.handleSubmit}
            onCancel={() => this.setState({createFormVisible: false})}
          /> :
          <Button onClick={() => this.setState({createFormVisible: true})}>+</Button>}
        {this.renderPosts()}
      </div>
    );
  }
}

export default App;
