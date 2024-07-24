import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Post from '../../src/components/Post';

const postProps = {
  imgURL: 'imgURL',
  profilePic: 'profilePic',
  username: 'username',
  createdAt: new Date(),
};

beforeEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<Post />', () => {
  it('when component mounts provided props are displayed ', () => {
    const wrapper = mount(<Post {...postProps} />);
    expect(wrapper.props().username).toEqual(postProps.username);
    expect(wrapper.props().imgURL).toEqual(postProps.imgURL);
    expect(wrapper.props().profilePic).toEqual(postProps.profilePic);
    expect(wrapper.props().description).toEqual(postProps.description);
    expect(wrapper.props().createdAt).toEqual(postProps.createdAt);
  });
});
