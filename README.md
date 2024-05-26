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
