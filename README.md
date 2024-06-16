```
cmd + ctrl + z  to open the debug in the ioS simulator
```

`npx expo run:ios`

`xcrun simctl list devices`

# Bugs

- `error: Codegen did not run properly in your project. Please reinstall cocoapods with bundle exec pod install.`
  Solution : https://stackoverflow.com/questions/58934022

```sh
cd ios
pod repo update
pod install
```

```sh
❌  (ios/Dispatche/AppDelegate.mm:3:9)

  1 | #import "AppDelegate.h"
  2 | #import "StreamVideoReactNative.h"
> 3 | #import "RNVoipPushNotificationManager.h"
    |         ^ 'RNVoipPushNotificationManager.h' file not found
  4 | #import <PushKit/PushKit.h>
  5 | #import "RNCallKeep.h"
  6 | #import <Firebase/Firebase.h>

› Compiling Dispatche » Dispatche_vers.c
⚠️  Script has ambiguous dependencies causing it to run on every build.
   To fix, go to: Xcode » Dispatche/Dispatche » Build Phases » '[CP-User] [RNFB] Core Configuration'
   Either: Uncheck "Based on dependency analysis", or select output files to trigger the script
```
