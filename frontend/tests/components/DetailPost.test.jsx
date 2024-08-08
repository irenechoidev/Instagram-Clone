import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailPost from '../../src/components/DetailsPost';

const detailPostProps = {
  imgURL: 'imgURL',
  profilePic: 'profilePic',
  username: 'username',
  description: 'description',
  createdDate: new Date(),
};

beforeEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<DetailPost />', () => {
  it('when component mounts provided props are displayed', () => {
    const wrapper = mount(<DetailPost {...detailPostProps} />);
    expect(wrapper.props().imgURL).toEqual(detailPostProps.imgURL);
    expect(wrapper.props().profilePic).toEqual(detailPostProps.profilePic);
    expect(wrapper.props().username).toEqual(detailPostProps.username);
    expect(wrapper.props().description).toEqual(detailPostProps.description);
    expect(wrapper.props().createdDate).toEqual(detailPostProps.createdDate);
  });
});
