import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchMessages, onSubmitMessage} from "../../store/actions/messagesActions";
import PostMessage from '../../components/PostMessage/PostMessage';
import GetMessages from '../../components/GetMessages/GetMessages';
import {Alert} from 'reactstrap';

class Messages extends Component {
  interval = null;
  
  state = {
    author: '',
    message: '', 
    image: ''
	};
	
	submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.onSubmit(formData);
    this.setState({author: '', message: '', image: ''});
    this.resetFile();
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
    });
  };
  
  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

  resetFile = () => {
    const file = document.querySelector('.file');
    file.value = '';
  }

  async componentDidMount() {
    this.props.FetchMessages(this.props.lastTime);
    this.interval = setInterval(() => this.props.FetchMessages(this.props.lastTime), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    let showDivWithAttention = 'none';
    if(this.props.error) {
      showDivWithAttention = 'block';
    } 

    return (
      <div className='Message' style={{paddingBottom: '40px', color: 'white'}}>  
        <div className='MessagesAll' style={{height: '400px', overflowY: 'scroll', marginBottom: '40px'}}>
        {this.props.messages.map(message => (
          <GetMessages
            key={message.id}
            date={message.datetime}
            author={message.author}
            message={message.message}
            image={message.image}
          />
        )).reverse()}
        </div>

        <Alert color="danger" style={{display: showDivWithAttention, maxWidth: '895px'}}>
          <p>{this.props.error}</p>
        </Alert>

        <PostMessage 
          change={this.inputChangeHandler}
          submit={(event) => this.submitFormHandler(event)}
          author={this.state.author}
          message={this.state.message}
          imageUpload={this.fileChangeHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    lastTime: state.messages.lastTime,
    error: state.messages.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FetchMessages: (date) => dispatch(fetchMessages(date)),
    onSubmit: (message) => dispatch(onSubmitMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);