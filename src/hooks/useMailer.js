import {useReducer,useEffect} from 'react'

/**
 * * SUMMARY FOR ALL ACTIONS.
 * *  addToBundle: To add an object that parsed from csv file.
 * *  startSending: This will handle when it's currently sending emails.
 * *  stopSending: This will handle when it's finished sending emails.
 * *  increaseCompleted: This will increase the number of completed sending emails.
 * *  setStatusOfTask: This will set the status of each email sending task (unsent/sending/success/failure).
 * *  afterImporting: This will handle when all imported data are ready.
 * *  close: This will terminate the current section.
 */
const reducer = (state, action) => {
  switch(action.type) {
    case 'addToBundle':
      const captialized = action.params.data[0].toUpperCase()+
        action.params.data.slice(1);
      return {
        ...state,
        [`selected${captialized}FileName`]: action.params.fileName,
        bundle: {
          ...state.bundle,
          [action.params.data]: action.params.object
        }
      }
    case 'startSending':
      return {
        ...state,
        process: 'sending',
        tasksList: state.tasksList.map((task) => {
          if(task.status === 'failure') 
            return {...task, status: 'unsent'}
          return task;
        })
      }
    case 'stopSending':
      return {
        ...state,
        process: 'idle',
        tasksList: state.tasksList.map((task) => {
          if(task.status === 'sending' || task.status === 'unsent')
            return {...task, status: 'failure'}
          return task;
        })
      }
    case 'increaseCompleted':
      return {
        ...state,
        success: state.success + 1
      }
    case 'setStatusOfTask':
      return {
        ...state,
        tasksList: state.tasksList.map((task, index) => {
          if(index === action.params.index) {
            return {...task, status: action.params.status};
          }
          return task;
        })
      }
    case 'afterImporting':
      return {
        ...state,
        process: 'idle_afterImporting',
        success: 0,
        tasksList: state.bundle.emails.map(reciever => ({
          email: reciever['email'],
          subject: `สวัสดีคุณ ${reciever['user_name']}`,
          body: `สวัสดีคุณ ${reciever['user_name']}\n\n`+
                   `อีก ${reciever['reviews_left_to_uprank']} รีวิว`+
                   `คุณจะได้เป็น ${getRankName(reciever['user_next_rank_id'],state.bundle.ranks)}\n`+
                   `ร่วมแบ่งปันรีวิวกับเพื่อนสมาชิกกันนะคะ`,
          status: 'unsent'
        }))
      }
    case 'close':
      return initialState;
    default:
      throw new Error();
  }
}
/**
 * Since the number of ranks is negligible, iteration may not cause the large problem. :D
 */
const getRankName = (id, ranks) => {
  for(let rank of ranks) {
    if(rank.id === id) {
      return rank.name;
    }
  }
}

const initialState = {
  bundle: {
    emails: undefined,
    ranks: undefined
  },
  tasksList: [],
  process: '',
  sucess: 0,
  selectedEmailsFileName: '',
  selectedRanksFileName: ''
}

function useMailer() {
  const [state, dispatch] = useReducer(reducer,initialState);
  
  /**
   * The essential feature functions.
   */
  const getTaskListEmpty = () => state.tasksList.length === 0;
  const getSending = () => state.process === 'sending';
  const getCompleted = () => state.success === state.tasksList.length;
  
  /**
   * Handle for the case that emails/ranks bundle are ready.
   */
  useEffect(() => {
    const getBundleReady = () => state.bundle['emails'] && state.bundle['ranks']
    if(getBundleReady()) {
      dispatch({type: 'afterImporting'});
    }
  }, [state.bundle])

  return  [state, dispatch, getTaskListEmpty, getSending, getCompleted]
}

export default useMailer
