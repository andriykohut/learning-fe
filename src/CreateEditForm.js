import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { Button, TextArea, Form } from 'semantic-ui-react';


class CreateEditForm extends Component {
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

export default CreateEditForm;
