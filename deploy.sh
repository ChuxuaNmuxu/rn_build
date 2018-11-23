#!/bin/bash

chmod +x /myrepo/rn_build/android/gradlew

/myrepo/rn_build/android/gradlew clean aR -b /myrepo/rn_build/android/app/build.gradle
