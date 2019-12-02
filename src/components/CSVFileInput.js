import React,{useRef,useState} from 'react'
import {StyledButton} from '../styles/Styled.js';
import {FaRegCheckCircle} from 'react-icons/fa';
import csv from 'csvtojson';

function CSVFileInput({buttonMsg,onReadData}) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];

    if(!file || file.type !== "application/vnd.ms-excel") {
      return;
    }
      
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      csv({header:true, trim: true})
        .fromString(reader.result)
        .then((json) => onReadData(json));
    }
    reader.readAsText(file);
  }

  const handleClick = () => {
    inputRef.current.click();
  }

  return (
    <div>
      <label>
        <StyledButton selectfile onClick={handleClick}>{buttonMsg}</StyledButton>
        {` ${fileName} `}{fileName && <FaRegCheckCircle color='#81CC75'/>}
      </label>
      <input
        type='file'
        accept='.csv'
        ref={inputRef}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </div>
  )
}

export default CSVFileInput;
