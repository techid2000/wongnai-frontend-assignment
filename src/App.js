import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

import {GlobalStyle, AppDiv, AppWrapperDiv, StyledButton, MarginDiv} from './styles/Styled.js';

import CSVFileInput from './components/CSVFileInput';
import TasksTable from './components/TasksTable';

import useMailer from './hooks/useMailer';

function App() {
  /**
   * Using custom `useMailer` hook,
   * for extracting some important feature of mailing.
   */
  const [state, dispatch,
    getTaskListEmpty,
    getSending,
    getCompleted] = useMailer();
  /**
   * Asynchronous function for calling API asynchronously.
   */
  const sendEmail = async () => {
    dispatch({type: 'startSending'});
    try {
      /**
       * Gradually send emails one by one.
       * ? Should this method send emails all at once?
       */
      for(let index in state.tasksList) {
        const currentTask = state.tasksList[index];
        /**
         * Checking whether the current email is sent or not?
         * if not then perform sending. 
         */
        if(currentTask.status === 'unsent' ||
          currentTask.status === 'failure') {

          dispatch({type: 'setStatusOfTask',params:{
            index: parseInt(index),
            status: 'sending'
          }});

          const response = await fetch('https://us-central1-frontend-assignment-d6597.cloudfunctions.net/sendMail',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: currentTask.email,
              subject: currentTask.subject,
              body: currentTask.body
            })
          })
          const state = await response.status;

          if(state === 204) dispatch({type: 'increaseCompleted'});

          dispatch({type: 'setStatusOfTask', params:{
            index: parseInt(index),
            status: state === 204 ? 'success' : 'failure'}}
          );
        }
      }
    } catch(error) {
      /**
       * ? I don't know if this is correct or not. Because it occurs when sending data consecutively to the server.
       */
      alert("เซิฟเวอร์รับข้อมูลมากเกินไป โปรดลองใหม่ภายหลัง");
    }
    dispatch({type: 'stopSending'});
  }

  /**
   * This is what the bottom button do when it was clicked.
   */
  const handleBottomButtonClicked = () => {
    if(getCompleted()) {
      dispatch({type: 'close'});
    } else {
      sendEmail();
    }
  }

  /**
   * This will handle the text of the bottom button.
   */
  const getBottomButtonText = () => {
    if(state.process === 'idle_afterImporting') return 'ส่งเมล';
    else {
      if(getCompleted()) {
        return 'ปิด'
      } else {
        return 'ลองส่งเมลล์ที่ล้มเหลวอีกครั้ง'
      }
    }
  }

  return (
    <AppWrapperDiv>
      <AppDiv>
        <GlobalStyle/>
        <h1>Mailer</h1>
        <MarginDiv bottom='14px'>
          <CSVFileInput
            buttonMsg="เลือกไฟล์ E-mail"
            onReadData={(object, fileName) => {
              dispatch({type: 'addToBundle',params:{
                data: 'emails',
                object: object,
                fileName: fileName
              }})
            }}
            fileName={state.selectedEmailsFileName}
            disabled={getSending()}
          />
        </MarginDiv>
        <MarginDiv bottom='29px'>
          <CSVFileInput
            buttonMsg="เลือกไฟล์ Rank"
            onReadData={(object, fileName) => {
              dispatch({type: 'addToBundle',params:{
                data: 'ranks',
                object: object,
                fileName: fileName
              }})
            }}
            fileName={state.selectedRanksFileName}
            disabled={getSending()}
          />
        </MarginDiv>
        <TasksTable tasksList={state.tasksList}/>
        <MarginDiv top='24px'>
          {
            getTaskListEmpty() ||
            <div>
              <StyledButton confirm onClick={handleBottomButtonClicked} disabled={getSending()}>
                {getBottomButtonText()}
              </StyledButton>
              {
                getSending() && 
                <div id='moonloader-wrapper'>
                  <MoonLoader css={{margin: '0 auto'}} size={25}/>
                </div>
              }
            </div>
          }
        </MarginDiv>
      </AppDiv>
    </AppWrapperDiv>
  );
}

export default App;
