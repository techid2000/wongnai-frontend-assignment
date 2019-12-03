import React from 'react'

import TasksTableRow from './TasksTableRow'
import { LogDiv } from '../styles/Styled';

function TasksTable({status}) {
  const getStatusRow = () => {
    let components = [];
    for(let index in status) {
      components.push(
        <TasksTableRow
          email={status[index].email}
          body={status[index].body}
          status={status[index].status}
          underline={index < status.length - 1}
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
