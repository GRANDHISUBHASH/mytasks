import React, {Component} from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid' // Import UUID package

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    taskInputValue: '',
    tagsInputValue: 'HEALTH', // Setting default value to 'Health'
    tagsAndTaskList: [],
    filterdValues: [],
  }

  onSubmitButtonIsClicked = event => {
    event.preventDefault()
    const {taskInputValue, tagsInputValue, tagsAndTaskList} = this.state
    const taskId = uuidv4() // Generate unique ID for the task
    this.setState({
      tagsAndTaskList: [
        ...tagsAndTaskList,
        {id: taskId, taskInputValue, tagsInputValue},
      ],
      taskInputValue: '',
      tagsInputValue: 'HEALTH', // Resetting to default value after submission
    })
  }

  tagsInput = event => {
    this.setState({
      tagsInputValue: event.target.value,
    })
  }

  taskInput = event => {
    this.setState({taskInputValue: event.target.value})
  }

  GetingTaskInputes = () => {
    const {taskInputValue, tagsInputValue} = this.state
    return (
      <form onSubmit={this.onSubmitButtonIsClicked}>
        <h1>Create a task</h1>
        <div>
          <label htmlFor="task">Task</label>
          <input
            id="task"
            type="text"
            value={taskInputValue}
            onChange={this.taskInput}
            placeholder="Enter the task here"
          />
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <select
            id="tags"
            type="text"
            value={tagsInputValue}
            onChange={this.tagsInput}
          >
            {tagsList.map(tag => (
              <option key={tag.optionId} value={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    )
  }

  TagItemIsClicked = id => {
    const {tagsAndTaskList} = this.state
    const filterdList = tagsAndTaskList.filter(
      eachItem => eachItem.tagsInputValue.toLowerCase() === id.toLowerCase(),
    )
    this.setState({filterdValues: filterdList})
  }

  getingTagsAndTaskList = () => {
    const {tagsAndTaskList, filterdValues} = this.state

    let taskItems
    if (tagsAndTaskList.length === 0) {
      taskItems = (
        <div>
          <p>No Tasks Added Yet</p>
        </div>
      )
    } else if (filterdValues.length === 0) {
      taskItems = tagsAndTaskList.map(eachItem => (
        <li key={eachItem.id}>
          <p>{eachItem.taskInputValue}</p>
          <p>{eachItem.tagsInputValue}</p> {/* Display tag names */}
        </li>
      ))
    } else {
      taskItems = filterdValues.map(eachItem => (
        <li key={eachItem.id}>
          <p>{eachItem.taskInputValue}</p>
          <p>{eachItem.tagsInputValue}</p> {/* Display tag names */}
        </li>
      ))
    }

    return (
      <div>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(eachItem => (
              <li key={eachItem.optionId}>
                <button
                  type="button"
                  onClick={() => this.TagItemIsClicked(eachItem.optionId)}
                >
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Tasks</h1>
          <ul>{taskItems}</ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.GetingTaskInputes()}
        {this.getingTagsAndTaskList()}
      </div>
    )
  }
}

export default App
