import React from 'react';
import { Button, Icon, Item, List } from 'semantic-ui-react';

const PostList = props => {
  const items =  Object.entries(props.posts).map(entries => {
    let [id, post] = entries;
    return (
      <Item.Group key={id}>
        <Item>
          <Item.Content>
            <Item.Header>{post.title}</Item.Header>
            <Item.Description>{post.text}</Item.Description>
            <Button icon onClick={() => props.onDelete(id)}>
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

export default PostList;
