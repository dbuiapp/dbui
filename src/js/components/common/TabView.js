import React, { Component, PropTypes } from 'react';
import { Tabs, TabItem, TabsContent, TabPanel } from 'react-foundation';

export default class TabView extends Component {
  static propTypes = {
    defaultTab: PropTypes.string
  };

  state = {activeTab: null};

  componentDidMount () {
    const { defaultTab } = this.props;
    if (defaultTab) {
      this.setState({activeTab: defaultTab});
    }
  }

  activeTab = (tabId) => {
    return {isActive: this.state.activeTab == tabId};
  }

  activeTabTitle = (tabId) => {
    return {"aria-selected": this.state.activeTab == tabId};
  }

  activePanel = (tabId) => {
    return {isActive: this.state.activeTab == tabId, "aria-hidden": this.state.activeTab != tabId};
  }

  tabClick = (event) => {
    const tab = event.target.getAttribute('data-tab');
    if (tab) {
      this.setState({activeTab: tab});
    }
  }

  render () {
    const { children } = this.props;

    return (
      <div>
        <Tabs onClick={this.tabClick}>
          {(Array.isArray(children) ? children : [children]).map(child => {
            const { tabId, label } = child.props;
            return (
              <TabItem key={tabId} {...this.activeTab(tabId)}>
                <a {...this.activeTabTitle(tabId)} data-tab={tabId}>{label}</a>
              </TabItem>
            );
          })}
        </Tabs>
        <TabsContent>
          {(Array.isArray(children) ? children : [children]).map(child => {
            const { tabId } = child.props;
            return (
              <TabPanel key={tabId} {...this.activePanel(tabId)}>
                {child.props.children}
              </TabPanel>
            );
          })}
        </TabsContent>
      </div>
    );
  }
}
