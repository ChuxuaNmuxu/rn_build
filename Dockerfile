FROM jenkins:latest

USER root

# JAVA
RUN apt update
RUN apt-get install openjdk-8-jre -y
RUN ls /usr/lib/jvm/
ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk-amd64


# 使用淘宝镜像安装Node.js v8.9.2
RUN wget https://npm.taobao.org/mirrors/node/v8.9.2/node-v8.9.2-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.2-linux-x64.tar.gz && \
    rm node-v8.9.2-linux-x64.tar.gz


# ——————————
# Installs i386 architecture required for running 32 bit Android tools
# ——————————

RUN dpkg --add-architecture i386 && \
    apt-get update -y && \
    apt-get install -y libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove -y && \
    apt-get clean

# Install android sdk 
# RUN mkdir -p opt/android/sdk
# RUN chown -R jenkins.jenkins /opt/android/sdk 
# RUN cd opt/android/sdk/ 
# RUN curl https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip -o android-sdk.zip
# RUN unzip android-sdk.zip -d . 
# RUN rm android-sdk.zip

# RUN echo y | ./tools/bin/sdkmanager "tools" \
#     && ./tools/bin/sdkmanager "build-tools;28.0.3" "build-tools;28.0.2" "build-tools;28.0.1" "build-tools;28.0.0-rc2" "build-tools;28.0.0-rc1" "build-tools;28.0.0" "build-tools;27.0.3" "build-tools;26.0.2" "build-tools;26.0.1" "build-tools;25.0.3" "build-tools;25.0.2" "build-tools;25.0.1" "build-tools;25.0.0" "build-tools;23.0.1" "platforms;android-28" "platforms;android-27" "platforms;android-26" "platforms;android-25" "platforms;android-23" "extras;android;m2repository" "extras;google;m2repository" --no_https \
#     && ./tools/bin/sdkmanager "extras;m2repository;com;android;support;constraint;constraint-layout-solver;1.0.2" "extras;m2repository;com;android;support;constraint;constraint-layout;1.0.2" --no_https \
#     && ./tools/bin/sdkmanager --list 

# Setup environment
# ENV ANDROID_HOME /opt/android/sdk
# ENV PATH ${PATH}:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

ENV ANDROID_HOME="/opt/android-sdk-linux"
ENV ANDROID_SDK="${ANDROID_HOME}"
ENV PATH="${ANDROID_SDK}/tools:${ANDROID_SDK}/platform-tools:${ANDROID_SDK}/tools/bin:${PATH}"
RUN echo "export PATH=${PATH}" > /root/.profile

ENV ANDROID_SDK_URL https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip

RUN curl -L "${ANDROID_SDK_URL}" -o /tmp/android-sdk-linux.zip && \
    unzip /tmp/android-sdk-linux.zip -d /opt/ && \
    chown -R root:root /opt && \
    rm /tmp/android-sdk-linux.zip && \
    mkdir ${ANDROID_HOME} && \
    mv /opt/tools ${ANDROID_HOME}/ && \
    ls ${ANDROID_HOME} && \
    ls ${ANDROID_HOME}/tools && chown -R root:root ${ANDROID_HOME}

# Install Android SDK components
RUN echo y | sdkmanager --proxy='http://mirrors.neusoft.edu.cn' --proxy_host='80' --no_https "platform-tools" "build-tools;26.0.2" "build-tools;25.0.3" "platforms;android-26" "platforms;android-25" \
                "extras;google;m2repository" "extras;android;m2repository" "extras;google;google_play_services"

RUN echo ANDROID_HOME="$ANDROID_HOME" >> /etc/environment
# drop back to the regular jenkins user - good practice
USER jenkins
