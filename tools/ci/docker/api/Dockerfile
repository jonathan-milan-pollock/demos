FROM ubuntu:rolling
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]

RUN apt-get update
RUN apt-get install -y nodejs

#
# Update repos and install dependencies
#
RUN set -e \
  && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends --yes \
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
  libgl1 \
  libglib2.0-0 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb-shm0 \
  libxcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxrender1 \
  libxt6 \
  libjack-jackd2-0 \
  netsurf-common \
  xdg-utils \
  #
  # Add mimetypes
  #
  &&  mkdir -p /usr/share/applications \
  &&  printf '%s\n' \
  "[MIME Cache]" \
  "text/html=netsurf-gtk.desktop;" \
  "text/xml=netsurf-gtk.desktop;" \
  "x-scheme-handler/http=netsurf-gtk.desktop;" \
  "x-scheme-handler/https=netsurf-gtk.desktop;" > /usr/share/applications/mimeinfo.cache \
  #
  # Clean-up
  #
  &&  rm --recursive --force \
  /usr/share/doc/* \
  /usr/share/man/* \
  /var/cache/apt/archives/*.deb \
  /var/cache/apt/archives/partial/*.deb \
  /var/cache/apt/*.bin \
  /var/cache/debconf/*.old \
  /var/lib/apt/lists/* \
  /var/lib/dpkg/info/* \
  /var/log/apt \
  /var/log/*.log \
  #
  # Install application
  #
  &&  curl --location --silent --url \
  https://github.com/mltframework/shotcut/releases/download/v21.10.31/shotcut-linux-x86_64-211031.txz | \
  tar --extract --xz --directory /opt \
  &&  chown --recursive "${uid}:${gid}" /opt/Shotcut

RUN groupadd -r shotcut && useradd -r -g shotcut -G audio,video shotcut \
  && mkdir -p /home/shotcut/Downloads \
  && chown -R shotcut:shotcut /home/shotcut

WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]
