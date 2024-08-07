import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePost from '../../src/components/HomePost';

const homePostProps = {
  imgURL: 'imgURL',
  profilePic: 'profilePic',
  username: 'username',
  description: 'description',
  createdDate: new Date(),
};

beforeEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<HomePost />', () => {
  it('when component mounts provided props are displayed ', () => {
    const wrapper = mount(<HomePost {...homePostProps} />);
    expect(wrapper.props().username).toEqual(homePostProps.username);
    expect(wrapper.props().imgURL).toEqual(homePostProps.imgURL);
    expect(wrapper.props().profilePic).toEqual(homePostProps.profilePic);
    expect(wrapper.props().description).toEqual(homePostProps.description);
    expect(wrapper.props().createdDate).toEqual(homePostProps.createdDate);
  });
});
