import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailsPost from '../../src/components/DetailsPost';

const detailsPostProps = {
  imgURL: 'imgURL',
  profilePic: 'profilePic',
  username: 'username',
  description: 'description',
  createdDate: new Date(),
};

beforeEach(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('<DetailsPost />', () => {
  it('when component mounts provided props are displayed', () => {
    const wrapper = mount(<DetailsPost {...detailsPostProps} />);
    expect(wrapper.props().imgURL).toEqual(detailsPostProps.imgURL);
    expect(wrapper.props().profilePic).toEqual(detailsPostProps.profilePic);
    expect(wrapper.props().username).toEqual(detailsPostProps.username);
    expect(wrapper.props().description).toEqual(detailsPostProps.description);
    expect(wrapper.props().createdDate).toEqual(detailsPostProps.createdDate);
  });
});
