import React from 'react'

import StatusTableRow from './StatusTableRow'
import { LogDiv } from '../styles/Styled';

function StatusTable({status}) {
  const getStatusRow = () => {
    let components = [];
    for(let idx in status) {
      components.push(
        <StatusTableRow
          email={status[idx]['email']}
          message={status[idx]['message']}
          status={status[idx]['status']}
          underline={idx < status.length - 1}
        />
      )
    }
    return components;
  }
  return (
    <div>
      <StatusTableRow
        email="อีเมล"
        message="ข้อความ"
        status="สถานะ"
        underline={true}
      />
      <LogDiv>
        {getStatusRow()}
      </LogDiv>
    </div>
  )
}

export default StatusTable
