import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TaskView extends PureComponent {
  render() {
    const {
      id, title, description, activateEditMode, deleteTask,
    } = this.props;

    return (
      <div className="task">
        <div className="task__title">
          <button type="button" title="delete task" className="task__delete" onClick={deleteTask}>&times;</button>
          <button type="button" title="edit task" className="task__edit" onClick={activateEditMode}>&#9998;</button>
          {`${id}. ${title}`}
        </div>
        <div className="task__description">
          {description}
        </div>
      </div>
    );
  }
}

TaskView.defaultProps = {
  description: '',
};

TaskView.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  activateEditMode: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskView;
