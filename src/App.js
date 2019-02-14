import React, { Component } from 'react';

import ChatBot from 'react-simple-chatbot';


import styled from 'styled-components';

import './App.css';

const Tile = styled.div`
display:grid;
align-items:center;
justify-content:center;
padding-top:120px;
`;
const Wrapper = styled.section`
  
   min-height: 100vh;
    padding:0;
    margin:0;
    background: linear-gradient(to bottom, #9933ff 0%, #3333ff 100%);
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Tile>
        <ChatBot steps={[
    {
      id: 'hello-world',
      message: 'Hello World!',
      end: true,
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, Thanks for stopping by!',
      end: true,
    },
  ]}
/>
        </Tile>
      </Wrapper>
    );
  }
}

export default App;
