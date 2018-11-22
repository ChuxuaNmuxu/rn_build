FROM entria/react-native-android

RUN mkdir /myrepo/
WORKDIR /myrepo

RUN git clone https://github.com/ChuxuaNmuxu/rn_build.git \
    && git checkout -b sunb/build origin/sunb/build

WORKDIR /myrepo/rn_build

RUN rm -rf /node_modules \
    && npm i
RUN npm run build

ENV gradlew=./android/gradlew

RUN chmod +x gradlew

RUN gradlew clean aR -b ./android/app/build.gradle
