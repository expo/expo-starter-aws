This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.


## Using AWS

#### `npm install aws-sdk --save`
#### `npm install amazon-cognito-auth-js --save`

### Creating AWS Mobile Hub Project

Visit the [AWS Mobile Hub](https://aws.amazon.com/mobile/) and enter the Mobile Hub Console.

In the Mobile Hub dashboard, click the "Import your project" button. Next, find the `mobile-hub-project.zip` included
in this starter project, and drag and drop it to the import modal. Set the name of the project, and then click "Import project." This zip file contains a configuration yml file that sets up our mobile hub project on amazon. 

Once the project is imported, you'll be directed to the dashboard for this Mobile Hub project. To continue configuring the app, you'll need to find the name of the Amazon S3 bucket auto generated through the App Content Delivery system. To do this, click the "Resources" button on the left side of the Mobile Hub project dashboard, find the "Amazon S3 Buckets" card, and then copy the bucket name that contains `hosting-mobilehub`.

Next, assuming your terminal is still open inside of the `myApp` folder, run:

```bash
aws s3 cp s3://BUCKET_NAME/aws-config.js src/assets
```

Replacing `BUCKET_NAME` with the full name of the S3 bucket found above. This will copy the auto-generated `aws-exports.js` file into the base folder of your Expo App. Delete all the code in `aws-exports.js` that is outside the `export` statement (the last couple of lines). Those lines of code are not compatible with React Native because React Native uses a different `aws-sdk`. This exports all of the configuration variables to configure the AWS SDK. 

You may have to find you public and private key credentials, and register using the AWS command line interface to link you account.


### AWS Problems
#### Cognito-Identity-Js compatibility issues with React Native
[Issue] (https://github.com/aws/amazon-cognito-identity-js/issues/327)
The require modules inside this library directly refer to the default 'aws-sdk'. However, if we want to integrate the aws-sdk-js library with react native we have to use the sdk located 'aws-sdk/dist/aws-sdk-react-native'.
#### ASyncStorage
[Issue] (https://github.com/aws/amazon-cognito-identity-js/issues/327)
A lot of the logic in saving/loading user sessions is baked in with using a synchronous call to `window.localStorage`. However, there is no way to access this using React Native. The closet alternative is `AsyncStorage`
#### Slow login times
The authentication workflow is slow because the library rolls their own 'BigInteger.js' for hashing/bitcrunching calls. A native bridge to a BigInteger library would make this much faster.
#### CRC32 Validation
When the response from a DynamoDB request is above a certain size threshold, the CRC32 check for data corruption fails no matter what on iOS. This could be attributed to either bugs in the validation code, the BigInteger library, or just unsupported behavior on an iOS device. This can be fixed by disabling the validation code when initiating the DynamoDB instance.
[Issue] (https://github.com/aws/aws-sdk-js/issues/405)


