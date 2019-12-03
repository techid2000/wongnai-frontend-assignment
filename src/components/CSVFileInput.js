import React,{useRef,useState} from 'react'
import {StyledButton} from '../styles/Styled.js';
import {FaRegCheckCircle} from 'react-icons/fa';
import csv from 'csvtojson';

function CSVFileInput({buttonMsg,fileName,onReadData}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if(!file) {
      return;
    }
    if(file.type !== 'application/vnd.ms-excel') {
      alert('กรุณาเลือกไฟล์นามสกุล .csv เท่านั้น');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      csv({header:true, trim: true})
        .fromString(reader.result)
        .then((json) => onReadData(json, file.name));
    }
    reader.readAsText(file);
    inputRef.current.value = '';
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
