
This todo app is a demonstration of using Expo in conjunction with AWS Mobile Hub, Amazon Cognito, and DynamoDB.
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Setting up AWS

This todo app uses Amazon Cognito to manage user sessions, and DynamoDB to store a list of todos for each authenticated user. For this app to have these functionalities it needs to be linked with an Amazon Mobile Hub project. 

### Installing the AWS CLI

```
pip install awscli
```
or if you have a Mac,
```
brew install awscli
```
to download the latest version of the AWS command line interface. 

### Configuirng AWS CLI

If you don't have an AWS account yet, you can register online. 
Type
```
aws configure
```
and follow the interactive prompt. Enter your access keys linked to your AWS account so you can use the CLI. 

### Creating AWS Mobile Hub Project

Visit the [AWS Mobile Hub](https://aws.amazon.com/mobile/) and enter the Mobile Hub Console.

In the Mobile Hub dashboard, click the "Import your project" button.  Next, find the `mobile-hub-project-expo.zip` included
in this starter project, and drag and drop it to the import modal. Set the name of the project, and then click "Import project." This zip file contains a configuration `.yml` file that contains information such as the database schema. 

Once the project is imported, you'll be directed to the dashboard for this Mobile Hub project. To continue configuring the app, you'll need to find the name of the Amazon S3 bucket auto generated through the App Content Delivery system. To do this, click the "Resources" button on the left side of the Mobile Hub project dashboard, find the "Amazon S3 Buckets" card, and then copy the bucket name that contains `hosting-mobilehub`.

### Importing AWS configuration variables

Next, assuming your terminal is still open inside of the project folder, run:

```bash
aws s3 cp s3://BUCKET_NAME/aws-exports.js .
```

Where `BUCKET_NAME` is the full name of the S3 bucket found above. This will copy the auto-generated `aws-exports.js` file into the base folder of your Expo App. Delete all the code in `aws-exports.js` that is outside of the `export` statement (the last couple of lines). These lines of code are not compatible with React Native because React Native uses a different `aws-sdk`. This exports all of the configuration variables to configure the AWS SDK, such as the server location and authentication pool id.  

To use the above command, you need a linked AWS account in your AWS command line interface.

### Install dependencies and run

Type 
```
npm install 
```
to install all dependencies, such as the AWS SDK. 

```
npm start
```

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

### AWS Problems

#### Cognito-Identity-Js compatibility issues with React Native
[Issue](https://github.com/aws/amazon-cognito-identity-js/issues/327). The require modules inside this library directly refer to the default 'aws-sdk'. However, if we want to integrate the aws-sdk-js library with react native we have to use the sdk located 'aws-sdk/dist/aws-sdk-react-native'. I have created a fork of Cognito-Identity-Js to fix thses issues. 

#### AsyncStorage
[Issue](https://github.com/aws/amazon-cognito-identity-js/issues/327). A lot of the logic in saving/loading user sessions is baked in with using a synchronous call to `window.localStorage`. However, there is no way to access this using React Native. The closet alternative is `AsyncStorage.` This app persists the user session by saving the `jwtToken` and `username` in `AsyncStorage.`

#### Slow login times
The authentication workflow is slow because the library rolls their own 'BigInteger.js' for hashing/bitcrunching calls. A native bridge to a BigInteger library would make this much faster.

#### Login on Android devices
Authentication for Android devices seems to be buggy. Authentication works on both the V8 engine and JSC in IOS but not on Android.

#### CRC32 Validation
[Issue](https://github.com/aws/aws-sdk-js/issues/405). When the response from a DynamoDB request is above a certain size threshold, the CRC32 check for data corruption fails no matter what on iOS. This could be attributed to either bugs in the validation code, the BigInteger library, or just unsupported behavior on an iOS device. This can be fixed by disabling the validation code when initiating the DynamoDB instance.
