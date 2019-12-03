import styled,{ createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Kanit', sans-serif;
    font-size: 12px;
  }
  #moonloader-wrapper {
    display: inline-block;
    position: absolute;
    padding-left: 20px;
  }
`;

export const StyledButton = styled.button`
  font-family: 'Kanit', sans-serif;
  font-size: 12px;
  line-height: 14px;
  height: 31px;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  transition: font-size 0.1s;
  :active {
    font-size: 13px;
  }
  ${props => props.selectfile && `
    border: 1px solid #000000;
    min-width: 129px;
    background: #F1F1F1;
    :hover {
      background: #DDDDDD;
    }
  `}
  ${props => props.confirm && `
    border: none;
    min-width: 175px;
    background: #81CC75;
    font-weight: bold;
    border-radius: 2px;
    color: #FFFFFF;
    :hover {
      background: #93e386;
    }
    :disabled {
      background: #DDDDDD;
    }
  `}
`;

export const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  h1 {
    font-size: 24px;
    margin-bottom: 38px;
  }
`

export const AppWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const LogDiv = styled.div`
  max-height: 500px;
  overflow-y: auto;
`
export const RowDiv = styled.div`
  display: flex;
  ${props => props.underline && 'border-bottom: 1px solid #F1E5E5'}
`

export const RowFieldDiv = styled.div`
  flex: ${props => props.grow} 0
  word-break: break-all
`

export const MarginDiv = styled.div`
  margin-top: ${props => props.top};
  margin-bottom: ${props => props.bottom};
  margin-left: ${props => props.left};
  margin-right: ${props => props.right};
`

export const StatusSpan = styled.span`
  ${props => props.status === 'sending' && 'color: #3656C7; font-weight:bold'}
  ${props => props.status === 'success' && 'color: #3F922A; font-weight:bold'}
  ${props => props.status === 'failure' && 'color: #FF0000; font-weight:bold'}
`