FROM entria/react-native-android

WORKDIR /myrepo/rn_build

RUN rm -rf /node_modules \
    && npm i
RUN npm run build

ENV gradlew=./android/gradlew

RUN chmod +x gradlew

RUN gradlew clean aR -b ./android/app/build.gradle
