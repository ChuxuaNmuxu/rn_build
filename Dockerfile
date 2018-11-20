# Pull base image.
FROM entria/react-native-android

RUN git clone https://github.com/ChuxuaNmuxu/rn_build.git \
    && cd rn_build \
    && git checkout -b sunb/build origin/sunb/build \
    && yarn add \
    && npm run build

