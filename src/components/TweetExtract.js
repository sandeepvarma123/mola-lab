import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import * as twitterConstants from '../Constants/TwitterAPIConstants';
import {DownloadTweets} from '../Utils/DownloadTweets'

class TweetExtract extends Component {
  
    constructor(props) {
        super(props);
        this.state = {value: '', isFileDownloaded: false, isError: false, isNoTweets: false, isUnAuthorized: false};
        this.validateUser = this.validateUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    validateUser(e){
        e.preventDefault();
        this.setState({isFileDownloaded: false});
        this.setState({isError: false});
        this.setState({isNoTweets: false});
        this.setState({isUnAuthorized: false});
    
        const token = twitterConstants.AUTH_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(twitterConstants.VALIDATE_USER_URL+this.state.value,config)
        .then(res => {
            var user_data = res.data;
            if(user_data.errors){
                this.setState({isError: true});
            }else{
                axios.get(twitterConstants.USERS_URL+user_data.data.id+twitterConstants.RETRIEVE_TWEETS_URL,config)
                .then(res =>{
                        console.log(res.data);
                        if(res.data.meta && res.data.meta.result_count === 0){
                            this.setState({isNoTweets: true});
                        }else if(res.data.errors){
                            this.setState({isUnAuthorized: true});
                        }else if(!res.data.data){
                            this.setState({isUnAuthorized: true});
                        }
                        else{
                            DownloadTweets(res.data.data);
                            this.setState({isFileDownloaded: true});
                        }
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })      
    }

    render() {
        return (
            
          <Container>
            <Form>
              <br></br>
              <Form.Group controlId="formName" >
                  <Form.Label>Twitter User Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Twitter User Name"  value={this.state.value} onChange={this.handleChange} />
              </Form.Group>
              <br></br>
              <Button variant="primary" type="submit" onClick={this.validateUser}>
                Validate User and Download Tweets
              </Button>
              <br></br>
              <br></br>
              <br></br>
              <Form.Group controlId="formName" >
                { this.state.isFileDownloaded && <Alert variant="success">User Tweets Downloaded Successfully</Alert>}
                { this.state.isError && <Alert variant="danger">Invalid Twitter UserName!</Alert>}
                { this.state.isNoTweets && <Alert variant="info">User Has Zero Tweets!</Alert>}
                { this.state.isUnAuthorized && <Alert variant="info">Cannot View User Tweets! No Access</Alert>}
              </Form.Group>
            </Form>
          </Container>
        );
      }
       
}

export default TweetExtract;