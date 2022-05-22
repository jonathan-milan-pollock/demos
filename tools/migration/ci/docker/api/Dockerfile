FROM ubuntu:rolling
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]

RUN apt-get update
RUN apt-get install -y nodejs

#
# Dependencies for glvnd, X11 and shotcut
#
RUN apt-get update \
  && apt-get install -y -qq --no-install-recommends \
  libglvnd0 \
  libgl1 \
  libglx0 \
  libegl1 \
  libxext6 \
  libx11-6 \
  bzip2 \
  ca-certificates \
  curl \
  libavcodec-extra \
  libasound2 \
  libpulse0 \
  xz-utils \
  libc6 \
  libcairo-gobject2 \
  libcairo2 \
  libcanberra-gtk-module \
  libcanberra-gtk3-module \
  libgcc1 \
  libglib2.0-0 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-xcb1 \
  libxcb-shm0 \
  libxcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrender1 \
  libxt6 \
  libjack-jackd2-0 \
  netsurf-common \
  xdg-utils \
  libsox-dev \
  libopengl0 \
  xvfb \
  && rm -rf /var/lib/apt/lists/*

#
# Env vars for the nvidia-container-runtime
#
ENV NVIDIA_VISIBLE_DEVICES all
ENV NVIDIA_DRIVER_CAPABILITIES graphics,utility,compute

#
# Install application
#
RUN curl --location --silent --url \
  https://github.com/mltframework/shotcut/releases/download/v21.10.31/shotcut-linux-x86_64-211031.txz | \
  tar --extract --xz --directory /opt \
  && chown --recursive "${uid}:${gid}" /opt/Shotcut

#
# install api
#
WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]
