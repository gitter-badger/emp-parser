#keytool -genkey -v -keystore mika.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
path="platforms/android/build/outputs/apk"

cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mika.keystore $path/android-release-unsigned.apk alias_name
rm $path/go.apk
/Users/doelia/Library/Android/sdk/build-tools/23.0.2/zipalign -v 4 $path/android-release-unsigned.apk $path/go.apk
