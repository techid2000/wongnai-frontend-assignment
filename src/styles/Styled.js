import styled,{ createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Kanit', sans-serif;
    font-size: 12px;
  }
  .app {
    display: flex;
    flex-direction: column;
    h1 {
      margin-bottom: 38px;
    }
  }
`;

export const StyledButton = styled.button`
  font-family: 'Kanit', sans-serif;
  font-size: 12px;
  line-height: 14px;
  height: 31px;
  background: #F1F1F1;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 3px;
  ${props => props.selectfile && 'width: 129px'}
`;
