import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTask as addTaskAction } from '../actions/tasks';

class AddTask extends PureComponent {
  onFormSubmit(e) {
    e.preventDefault();

    const { addTask } = this.props;

    if (!this.input.value.trim()) {
      return;
    }

    addTask(this.input.value);
    this.input.value = '';
  }

  render() {
    return (
      <div className="task-create-form">
        <h2>Add task</h2>
        <form onSubmit={this.onFormSubmit}>
          <input className="task-create-form__title" placeholder="Title" ref={(node) => { this.input = node; }} />
          <textarea className="task-create-form__description" placeholder="Description" />
          <button className="task-create-form__button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addTask: value => dispatch(addTaskAction(value)),
});

export default connect(null, mapDispatchToProps)(AddTask);
