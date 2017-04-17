import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";

// A simple tab polyfill similar to PR https://github.com/Semantic-Org/Semantic-UI-React/pull/430
class Pane extends Component {
  render () {
    return <Segment attached>
      {this.props.children}
    </Segment>
  }
}

export default class Tab extends Component {
  static Pane = Pane;

  state = { activeIndex: 0 };

  createOnTabClick = (index) => (event) => {
    this.setState({ activeIndex: index });
  }

  render () {
    const { children, ...props} = this.props;
    const { activeIndex } = this.state;

    return <div>
      <Menu tabular attached {...props}>
        {React.Children.toArray(children).map((child, index) => {
          return <Menu.Item key={index} onClick={this.createOnTabClick(index)} active={this.state.activeIndex === index}>
            {child.props.name}
          </Menu.Item>;
        })}
      </Menu>
      {children[activeIndex]}
    </div>
  }
}
