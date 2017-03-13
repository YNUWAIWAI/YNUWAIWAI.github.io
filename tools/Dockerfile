FROM ubuntu
RUN sed -ie s/archive/jp.archive/ /etc/apt/sources.list
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y \
  build-essential \
  nodejs \
  ruby-bundler \
  ruby-dev \
  yarn \
  zlib1g-dev
EXPOSE 4000
