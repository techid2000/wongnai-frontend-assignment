import React, {useRef, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import {GlobalStyle, AppDiv, AppWrapperDiv, StyledButton, MarginDiv} from './styles/Styled.js';

import CSVFileInput from './components/CSVFileInput';
import StatusTable from './components/StatusTable';

function App() {
  const [bundle, setBundle] = useState({});
  const [emailsStatus, setEmailsStatus] = useState([]);
  const [working, setWorking] = useState(0);
  const [success, setSuccess] = useState(0);
  const [unsent, setUnsent] = useState(false);
  const [emailFileName, setEmailFileName] = useState('');
  const [ranksFileName, setRanksFileName] = useState('');
  const bundleReady = () => bundle['emails'] && bundle['ranks'];

  const addToBundle = (data, object) => {
    setBundle(bundle => ({...bundle, [data]:object}));
    console.log(bundle);
  }

  const getRankName = (id) => {
    for(let rank of bundle['ranks']) {
      if(rank.id === id) {
        return rank.name;
      }
    }
  }

  useEffect(() => {
    console.log(emailsStatus);
  }, [emailsStatus])

  const sendEmail = async () => {
    setEmailsStatus(current => {
      const next = current.map((a) => {
        if(a.status === 'fail') {
          return {
            ...a,
            status: 'unsent'
          }
        } else {
          return a;
        }
      })
      return next;
    })
    try {
      for(let index in emailsStatus) {
        if(emailsStatus[index].status === 'unsent' ||
        emailsStatus[index].status === 'fail') {
          console.log(emailsStatus[index]['email']);
          setWorking(n => n + 1);
          setEmailsStatus(current => {
            const next = current.map((a, j) => {
              if(j == index) {
                return {
                  ...a,
                  status: 'sending'
                }
              } else {
                return a;
              }
            })
            return next;
          })
          const response = await fetch('https://us-central1-frontend-assignment-d6597.cloudfunctions.net/sendMail',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: emailsStatus[index]['email'],
              subject: emailsStatus[index]['subject'],
              body: emailsStatus[index]['message']
            })
          })
          const state = await response.status;
          if(state === 204) setSuccess(n => n + 1);
          setWorking(n => n - 1);
          setEmailsStatus(current => {
            const next = current.map((a, j) => {
              if(j == index) {
                return {
                  ...a,
                  status: state === 500 ? 'fail' : 'success'
                }
              } else {
                return a;
              }
            })
            return next;
          })
        }
      }
    } catch(error) {
      setWorking(0);
      setEmailsStatus(current => {
        const next = current.map((a) => {
          if(a.status === 'sending' || a.status === 'unsent') {
            return {
              ...a,
              status: 'fail'
            }
          } else {
            return a;
          }
        })
        return next;
      })
      alert("เซิฟเวอร์รับข้อมูลมากเกินไป โปรดลองใหม่ภายหลัง");
    }
  }

  const handleSendEmails = () => {
    if(success === emailsStatus.length) {
      setEmailsStatus([]);
      setEmailFileName('');
      setRanksFileName('');
      setBundle({});
    } else {
      setUnsent(false);
      sendEmail();
    }
  }

  useEffect(() => {
    if(bundleReady()) {
      setUnsent(true);
      setSuccess(0);
      setWorking(0);
      setEmailsStatus(bundle['emails'].map((each) => ({
        email: each['email'],
        subject: `สวัสดีคุณ ${each['user_name']}`,
        message: `สวัสดีคุณ ${each['user_name']}\n\nอีก ${each['reviews_left_to_uprank']} รีวิว คุณจะได้เป็น ${getRankName(each['user_next_rank_id'])}\nร่วมแบ่งปันรีวิวกับเพื่อนสมาชิกกันนะคะ`,
        status: 'unsent'
        })));
    }
  }, [bundle]);


  const getButtonText = () => {
    if(unsent) return 'ส่งเมล';
    else {
      if(success < emailsStatus.length) {
        return 'ลองส่งเมลล์ที่ล้มเหลวอีกครั้ง'
      } else {
        return 'ปิด'
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
            onReadData={(obj, fn) => {
              addToBundle('emails',obj)
              setEmailFileName(fn);
            }}
            fileName={emailFileName}
          />
        </MarginDiv>
        <MarginDiv bottom='29px'>
          <CSVFileInput
            buttonMsg="เลือกไฟล์ Rank"
            onReadData={(obj, fn) => {
              addToBundle('ranks',obj)
              setRanksFileName(fn);
            }}
            fileName={ranksFileName}
          />
        </MarginDiv>
        <StatusTable status={emailsStatus}/>
        <MarginDiv top='24px'>
          {
            emailsStatus.length > 0 && 
            <StyledButton confirm onClick={handleSendEmails} disabled={working > 0}>
              {getButtonText()}
            </StyledButton>
          }
        </MarginDiv>
      </AppDiv>
    </AppWrapperDiv>
  );
}

export default App;
