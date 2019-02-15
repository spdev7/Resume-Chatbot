import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import {DB_CONFIG} from './config/config';
import firebase from 'firebase/app';

import styled from 'styled-components';

import './App.css';

const Tile = styled.div`
display:grid;
align-items:center;
justify-content:center;
padding-top:120px;
overflow: hidden;

`;
const Wrapper = styled.section`
  
   min-height: 100vh;
    padding:0;
    margin:0;
    background: linear-gradient(to bottom, #9933ff 0%, #3333ff 100%);
    
`;
/////////////////////////////////////////////////
firebase.initializeApp(DB_CONFIG);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots : true});

// db.collection('users').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     console.log(doc.data())
//   })
// })
////////////////////////////////////////////////////////////////
class Review extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      message: '',
      emailid: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name,message, emailid } = steps;

    this.setState({ name, message,emailid });
    db.collection('users').add({
      name:name.value,
      message:message.value,
      emailid:emailid.value
    });
  }
  
  render() {
    const { name,message,emailid } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Message</td>
              <td>{message.value}</td>
            </tr>
            <tr>
              <td>Email-Id</td>
              <td>{emailid.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Tile>
        <ChatBot contentStyle={{}} headerTitle={'Bot'} steps={[
    {
      id: '1',
      message: 'Hey there ,',
      trigger:'2',
    },
    {
      id:'2',
      message:'My name is Saurav Prakash. This is the bot version of my CV,I am so happy you are here and would love to tell you more about me Lets begin',
      trigger:'3',
    },
    {
      id: '3',
      user: true,
      placeholder:'Yes/No',
      validator: (value)=>{
        if(value === 'No') {
          return 'Hope to see you next time around';
        }
        return true;
      },
      trigger:'4',
    },
    {
      id: '4',
      message: 'I am Full Stack Developer and I use many tools listed below',
      trigger:'5',
    },
    {
      id: '5',
      options: [
        { value: 1, label: 'Frontend Tools', trigger: '6' },
        { value: 2, label: 'Backend Tools', trigger: '7' },
        { value: 3, label: 'Designing', trigger: '8' },
      ],
    },
    {
      id: '6',
      message: 'HTML , CSS , JAVASCRIPT , REACTJS , REDUX , MATERIALIZE AND BOOTSTRAP',
      trigger:'10',
    },
    {
      id: '7',
      message: 'NodeJS , Express , REST API, GraphQL,MongoDB,SQL',
      trigger:'10',
    },
    
    {
      id: '8',
      message: 'Adobe Photoshop , Adobe Illustrator, Adobe XD',
      trigger:'10',
    },
    {
    id: '9',
    message: 'For Projects go to www.github.com/spdev7',
    trigger:'11',
    },
    {
      id:'10',
      options: [
        { value: 1, label: 'Go Back', trigger: '5' },
        { value: 2, label: 'Projects', trigger: '9' },
      ],
    },
    {
      id: '11',
      message: 'What is your name?',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: 'message1',
    },
    {
      id: 'message1',
      message: 'Hi {previousValue}! Please drop a message or feedback',
      trigger: 'message',
    },
    {
      id: 'message',
      user:true,
      trigger:'emailid1'
    },
    {
      id: 'emailid1',
      message: 'Your Email Id',
      trigger: 'emailid',
    },
    {
       id:'emailid',
       user:true,
       trigger:'email2',
    },
    {
      id: 'email2',
      message: 'Great! Check out your summary',
      trigger: 'review',
    },
    {
      id: 'review',
      component: <Review />,
      asMessage: true,
      end:true,
    },

    
  ]}
/>
        </Tile>
      </Wrapper>
    );
  }
}

export default App;
