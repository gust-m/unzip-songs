import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --color-blue: #40A9FF;
    --color-background-button: #1890ff;
    --color-red: #FF7875;
    --color-dark-blue: #597ef7;
    --color-green: #52c41a;
    --color-dark-green: #429e16;
    --color-white: #f0f0f0;
    --color-purple: #722ED1;
    --color-black: #181818;
    --color-shadow: rgba(0,0,0,0.3);
  }

  * {
    margin:0;
    padding: 0;
    box-sizing:border-box;
    outline:0;
    text-decoration: none; 
    font-family: 'Mulish', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  body {
    background: #f0f0f0;
    -webkit-font-smoothing: antialiased;

    .ant-modal-header {
      padding: 40px;
    }

    .ant-modal-title {
      font-size: 2rem;
    }

    .ant-input-number-handler-wrap {
      display: none;
    }
  }

  body, input, button, textarea {
    font-family: 400 1rem 'Mulish', sans-serif; 
  }
    
  button {
    cursor: pointer;
    border: 0;

  }

  @media(max-width: 1440px) {
    html {
      font-size: 95%;
    }
  }

  @media(max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media(max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

`
