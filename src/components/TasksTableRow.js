import React from 'react'

import {RowDiv, RowFieldDiv, StatusSpan} from '../styles/Styled.js';

function TasksTableRow({underline, email, body, status}) {
  const statusToThai = (status) => {
    switch(status) {
      case 'unsent': return 'รอส่ง';
      case 'sending': return 'กำลังส่ง';
      case 'success': return 'ส่งสำเร็จ';
      case 'failure': return 'ส่งล้มเหลว';
      default: return status;
    }
  }
  return (
    <RowDiv underline={underline}>
      <RowFieldDiv grow={1}>{email}</RowFieldDiv>
      <RowFieldDiv grow={2} dangerouslySetInnerHTML={{__html:body.replace(/\n/g,'<br>')}}/>
      <RowFieldDiv grow={1}>
        <StatusSpan status={status}>
          {statusToThai(status)}
        </StatusSpan>
      </RowFieldDiv>
    </RowDiv>
  )
}

export default TasksTableRow;
