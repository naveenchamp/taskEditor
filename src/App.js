import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class App extends Component {
  state = {
    taskInput: '',
    selectedTag: tagsList[0].optionId,
    activeTag: null,
    tasksList: [],
  }

  onEnterTaskName = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()

    const {taskInput, selectedTag, tasksList} = this.state

    if (taskInput.trim() === '') return

    const newTask = {
      id: uuidv4(),
      name: taskInput,
      tag: selectedTag,
    }

    this.setState({
      tasksList: [...tasksList, newTask],
      taskInput: '',
      selectedTag: tagsList[0].optionId,
    })
  }

  onFilterTag = tag => {
    this.setState(prev => ({
      activeTag: prev.activeTag === tag ? null : tag,
    }))
  }

  render() {
    const {taskInput, selectedTag, tasksList, activeTag} = this.state

    const filteredTasks =
      activeTag !== null
        ? tasksList.filter(each => each.tag === activeTag)
        : tasksList

    return (
      <div className="app-container">
        <form className="create-task-container" onSubmit={this.onAddTask}>
          <h1 className="heading">Create a Task!</h1>

          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            id="task"
            type="text"
            className="task-input"
            placeholder="Enter the task here"
            value={taskInput}
            onChange={this.onEnterTaskName}
          />

          <label htmlFor="tagSelect" className="label">
            Tags
          </label>
          <select
            id="tagSelect"
            className="tag-select"
            value={selectedTag}
            onChange={this.onChangeTag}
          >
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>

          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </form>

        <div className="tags-container">
          <h1 className="sub-heading">Tags</h1>
          <ul className="fliterTags">
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  className={`tag-btn ${
                    activeTag === each.optionId ? 'active' : ''
                  }`}
                  onClick={() => this.onFilterTag(each.optionId)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>

          <h1 className="sub-heading">Tasks</h1>

          {filteredTasks.length === 0 ? (
            <p className="no-tasks-text">No Tasks Added Yet</p>
          ) : (
            <ul className="tasks-list">
              {filteredTasks.map(eachTask => (
                <li key={eachTask.id} className="task-item">
                  <p className="task-text">{eachTask.name}</p>
                  <p className="task-tag-label">{eachTask.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
