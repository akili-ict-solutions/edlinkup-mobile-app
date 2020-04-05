Email: spmelimu2015@gmail.com.................................spm@2015

ALIAS NAME : edlinkupkey

KEYSTORE : my-release-keystore.keystore

KEYSTORE PASSWORD : edlinkup123

Enter Passphrase for keystore: edlinkup123

allpassword goes by : edlinkup123

myUserNameIonicHub : emmanuelmaro
myPasswordIonicHub : this is ionic password

WHEN YOU DOWNLOAD THE PACKAGE ON GITHUB, SETUP FOR LOCAL USE:::

    -> npm install

    -> ionic serve

    -> get [ERROR] Cannot load Cordova config.
        -> You can re-add the Cordova integration with the following command:
            -> ionic integrations enable cordova --add

PREPARE YOUR APP FOR PRDUCTION USE:::

	-> Now, let add our native platform to our application, and see how its look on different platform.
		-> ionic cordova platform add android@7.1.3 OR

		-> ionic cordova platform add android

    -> Checks and print out all the requirements for platforms
        -> ionic cordova requirements [<platform>]

    -> Let�s add resources files to our top level project by running;
        -> ionic cordova resources [<platform>] [options] or ionic cordova resources [<platform>]

            -> [options] can be --icon (-i) or --splash (-s)
            -> [<platform>] can be android or ios
            -> it will automatically update your config.xml file

    ->  We recommend using Cordova directly to manage Cordova plugins and platforms.
        The following commands fulfill the old ionic state functionality: [old command: ionic state save]

        -> ionic cordova platform save   | save existing installed platforms to config.xml
        -> ionic cordova plugin save     | save existing installed plugins to config.xml
        -> ionic cordova platform --help | view help page for managing Cordova platforms
        -> ionic cordova plugin --help   | view help page for managing Cordova plugins
        -> ionic cordova prepare         | install platforms and plugins listed in config.xml

    -> Let�s Specifies details about what plugin to restore during a prepare
        -> ionic cordova prepare

	-> Let�s Change android gradle plugin version from {{ ionic provided == 4.10.3 }} to {{ latest == 3.5.1 }} and make sure that, set SDK Build Tools 28.0.3 or higher.
		-> files to change, android/build.gradle, CordovaLib/build.gradle, android/app/build.gradle

	-> Let�s Change android gradle compiler version from {{ ionic provided == 4.10.3 }} to {{ latest == 5.6.1 }}
		-> files to change, cordova/lib/builders/ProjectBuilder.js [line: 232], android/app/build.gradle

	-> Let�s Change these line 293 on ImageFetcher to be this,
		-> protected boolean removeEldestEntry(HashMap.Entry<Integer, Bitmap> eldest)

	-> Configuration 'compile' in project ':app' is deprecated. Use 'implementation' instead.
		-> file to be edited, ~platforms\android\app\build.gradle:297

	-> The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.
		-> edit ~platforms\android\app\build.gradle:170

GET READY TO DEPLOY YOUR APP IN PLAYSTORE:::

	step[1] -> ionic cordova build android --prod --release

	step[2] -> keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

		[Note]: The above step 2, performed initialially when you create your keystore, but after that must be skipped in order to keep it synchronizable with keystore signature of the uploaded already app in playstore.

	step[3] -> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk edlinkupkey

	step[4] -> zipalign -v 4 app-release-unsigned.apk app.apk

IF YOU HAVE LOSS YOUR KEYSTORE FILE, REGENERATE AGAIN:::

	Get information about signed apk

	        -> jarsigner -verify -verbose:summary -certs original.apk
	        -> jarsigner -verify -verbose:summary -certs update.apk

	Get generated key information

	        -> keytool -list -printcert -jarfile original.apk
	        -> keytool -list -printcert -jarfile update.apk
