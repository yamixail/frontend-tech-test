import React from 'react';
import { shallow } from 'enzyme';

import TaskView from './TaskView';

const noop = () => {};

describe('TaskView', () => {
  it('should render', () => {
    const wrapper = shallow(
      <TaskView
        id={1}
        title="Title"
        description="Lorem ipsum dolor sit amet"
        activateEditMode={noop}
        deleteTask={noop}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
