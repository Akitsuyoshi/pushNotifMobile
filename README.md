# boilerplate_for_reactNative
This was created during my time as a student at Code Chrysalis

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).


## Table of Contents

* [Environment](#environment)
* [Prerequisite](#prerequisite)
* [Quick Start](#quick-start)
* [Environment Variables](#set-up-Environmental-Variables)
* [Available Scripts](#here-is-the-scripts-you-can-use)
* [Debugging](#debugging)
* [Customizing App Display Name and Icon](#customizing-app-display-name-and-icon)
* [Sharing and Deployment](#sharing-and-deployment)
  * [Publishing to Expo's React Native Community](#publishing-to-expos-react-native-community)
  * [Building an Expo "standalone" app](#building-an-expo-standalone-app)
  * [Ejecting from Create React Native App](#ejecting-from-create-react-native-app)
* [Issues](#issues)

#### Environment
- Mac OS High Sierra
- installed Xcode with command line tools(if not, this [article](http://railsapps.github.io/xcode-command-line-tools.html) might be helpful to get it)

- I’d prefer VS Code
- I use homebrew when installing dependencies


#### Prerequisite

if homebrew is not installed in local machine, you can get the way to install in [here](https://docs.brew.sh/Installation)
```
 // install node, yarn, watchman, and flow.

 brew install node
 brew install yarn
 brew install watchman
 brew install flow
```

#### Quick Start

Now you have node installed, you can use npm to install create-react-native-app in command line

```
 npm install -g create-react-native-app


 // install dependencies that is neccessary to launch up this app

 yarn
```

#### Set up Environmental Variables
Like react app, environmental variable have to be add 
REACT_NATIVE in the beggining of the name.
For example,
```
// ${variableNames} and ${variableValue} are supposed to be replaced with one you add

REACT_NATIVE_${variableNames}=${variableValue}
```


#### Here is the scripts you can use 

`yarn start`

It runs your app in development mode.

When you might face that your installed library is not working, you need to reset npm cache to start.

```
npm start --reset-cache
# or
yarn start --reset-cache
```

`yarn test`

It runs the jest test runner.

Jest configures test file by its extention(for example: app.test) or files in `__test__` directory.


`yarn ios`

It starts to open ios simulator in mac if xcode is installed.

`yarn eject`

It is used when you publish your app to App Store, Google Play, or Expo.

If you'd like to add native module which is not availabe to write in JS, you may eject the app.
The more information is described in [official documentation](https://facebook.github.io/react-native/docs/getting-started#caveats)



#### Debugging

Although it is a great option to debug in google chrome, I sometimes noticed things insufficient.

I ended it up to use [react native debugger](https://github.com/jhen0409/react-native-debugger), which is full set of debugging tool for mobile development.

To use that, we install it first.

`brew update && brew cask install react-native-debugger`

And, Open react native debugger and wait state.
Your simulator should enables JS remote debugger on developer menu(It can be set by hitting CMD+D on your running app)

Now you have debugger tool and set it up, you can use the tool by hit this script.

`yarn dev`

Basically, you use that script on development with react native debugger.

(You can see what happened in the script [here](https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md#launch-by-cli-or-react-native-packager-macos-only))

In addition to that, you can use flow for type check by this script.
In the setting(.flowconfing), flow supposed to check all logic files without adding @flow.
If you'd like to set it your preference, you may change .flowconfig file.

`yarn flow`


#### Issues
------

Feel free to submit issues and enhancement requests.
If you see some bugs in here, you can contact me at my [twitter account](https://twitter.com/), or pull request.

