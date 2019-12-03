import React from 'react'

import TasksTableRow from './TasksTableRow'
import { LogDiv } from '../styles/Styled';

function TasksTable({tasksList}) {
  const getStatusRow = () => {
    let components = [];
    for(let index in tasksList) {
      components.push(
        <TasksTableRow
          email={tasksList[index].email}
          body={tasksList[index].body}
          status={tasksList[index].status}
          underline={index < tasksList.length - 1}
          key={index}
        />
      )
    }
    return components;
  }
  return (
    <div>
      <TasksTableRow
        email="อีเมล"
        body="ข้อความ"
        status="สถานะ"
        underline={true}
      />
      <LogDiv>
        {getStatusRow()}
      </LogDiv>
    </div>
  )
}

export default TasksTable
