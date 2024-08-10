import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Comment from '../../src/components/Comment';

const commentProps = {
  imgURL: 'imgURL',
  username: 'username',
  createdDate: new Date(),
};

beforeEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<Comment />', () => {
  it('when component mounts provided props are displayed', () => {
    const wrapper = mount(<Comment {...commentProps} />);
    expect(wrapper.props().imgURL).toEqual(commentProps.imgURL);
    expect(wrapper.props().username).toEqual(commentProps.username);
    expect(wrapper.props().createdDate).toEqual(commentProps.createdDate);
  });
});
