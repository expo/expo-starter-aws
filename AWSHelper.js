import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AWS, {Config, CognitoIdentityServiceProvider} from 'aws-sdk/dist/aws-sdk-react-native';
import * as config from './aws-config'


export default class Cognito {
  constructor() {
    this.config = config
    console.log(this.config.get)
  }
  getUserPool() {
    let self = this;
    return new CognitoUserPool({
      "UserPoolId": self.config['aws_user_pools_id'],
      "ClientId": self.config['aws_user_pools_web_client_id']
    });
  }
  getCurrentUser() {

    return this.getUserPool().getCurrentUser();
  }

  makeAuthDetails(username, password) {
    return new AuthenticationDetails({
      'Username': username,
      'Password': password
    });
  }

  makeAttribute(name, value) {
    return new CognitoUserAttribute({
      'Name': name,
      'Value': value
    });
  }

  makeUser(username) {
    return new CognitoUser({
      'Username': username,
      'Pool': this.getUserPool()
    });
  }

  login(username, password) {
    this.makeUser(username).authenticateUser(this.makeAuthDetails(username,password), {
      onSuccess: (result) => {
        console.log('access token + ' + result.getAccessToken().getJwtToken())
      },
      onFailure: (err) => {
        alert(err);
      }
    })
  }
  confirmRegistration(username, code) {
    this.makeUser(username).confirmRegistration(code, true, (err, result) => {
      if (err) {
        alert(err)
        return
      }
      console.log('confirm registration' + result)
    })
  }

  signUp(username, password, email) {
    pool = this.getUserPool()
    let attributeList = []
    attributeList.push(this.makeAttribute('email',email))
    this.getUserPool().signUp(username, password, attributeList, null, (err,result) => {
      if (err) {
        alert(err);
        return;
      }
      let cognitoUser = result.user;
      console.log('username is ' + cognitoUser.getUsername())
    })
  }
}




