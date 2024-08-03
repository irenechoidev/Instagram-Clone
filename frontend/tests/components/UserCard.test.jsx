import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserCard from '../../src/components/UserCard';

const userCardProps = {
  imgURL: 'imgURL',
  username: 'username',
};

beforeEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<UserCard />', () => {
  it('when component mounts provided props are displayed', () => {
    const wrapper = mount(<UserCard {...userCardProps} />);
    expect(wrapper.props().username).toEqual(userCardProps.username);
    expect(wrapper.props().imgURL).toEqual(userCardProps.imgURL);
  });
});
