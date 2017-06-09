import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AWS, {Config, CognitoIdentityServiceProvider} from 'aws-sdk/dist/aws-sdk-react-native';
import {awsmobile} from './aws-exports'
import * as config from './aws-config'


export default class CognitoHelper {
  constructor() {
    this.config = awsmobile
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

  // Wrappers for cognito identity to transform them into promises
  login(username, password) {
    let self = this
    return new Promise((resolve, reject) => {
      self.makeUser(username).authenticateUser(self.makeAuthDetails(username,password), {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err)
      })
    })
  }

  confirmRegistration(username, code) {
    return new Promise((resolve, reject) => {
      this.makeUser(username).confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }

  signUp(username, password, email) {
    let self = this
    return new Promise((resolve, reject) => {
      pool = self.getUserPool()
      let attributeList = []
      attributeList.push(self.makeAttribute('email',email))
      // async
      self.getUserPool().signUp(username, password, attributeList, null, (err,result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result);
      })
    })
  }
}






