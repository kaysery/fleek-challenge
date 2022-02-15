import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes, { Nodes } from "./Nodes";
import Node from "../components/Node";
import Block from "../components/Block";

describe("<Nodes />", () => {
  const actions = {
    checkNodeStatuses: jest.fn()
  };

  const nodes = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false,
        blocks: {
          loading: false,
          error: false,
          list: [{id: '1', attributes: {index: 1, data: 'Lorem ipsum'}}],
        }
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false,
        blocks: {
          loading: false,
          error: false,
          list: [],
        }
      }
    ]
  };

  it("should contain <Node />", () => {
    const wrapper = shallow(
      <Nodes
        actions={actions}
        nodes={nodes}
      />
    );

    expect(wrapper.find(Node).length).toEqual(2);
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({nodes});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should contain <Block /> in <Node /> when blocks are fetched", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({nodes});
    const component = mount(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );

    const node = component.find(ConnectedNodes).find(Nodes);;

    node.instance().toggleNodeExpanded(nodes.list[0]);

    expect(node.find(Node).first().find(Block).length).toEqual(1);
  });
});
