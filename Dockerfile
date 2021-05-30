# Artistic Style (AStyle) + Emscripten build environment
# Copyright (C) 2020, 2021, Uri Shaked. Published under the MIT license.

FROM ubuntu:20.04

RUN apt-get update
RUN DEBIAN_FRONTEND="noninteractive" apt-get install -y wget python git cmake xz-utils lsb-release sudo

## Install EMScripten SDK

WORKDIR /opt

RUN git clone https://github.com/emscripten-core/emsdk.git

WORKDIR /opt/emsdk

RUN ./emsdk install 1.40.1
RUN ./emsdk activate 1.40.1

RUN echo "source $(pwd)/emsdk_env.sh" >> ~/.bashrc

# Build AStyle

RUN apt-get install -y subversion

RUN mkdir -p /build/astyle
WORKDIR /build/astyle
RUN svn checkout https://svn.code.sf.net/p/astyle/code/trunk/AStyle astyle-code

WORKDIR /build/astyle/astyle-code/build/gcc
RUN bash -c 'source /opt/emsdk/emsdk_env.sh && emmake make static'
RUN bash -c 'source /opt/emsdk/emsdk_env.sh && emcc -o bin/libastyle.js -s EXPORTED_FUNCTIONS=["_AStyleGetVersion","_AStyleMain","_AStyleMainUtf16"] -s EXTRA_EXPORTED_RUNTIME_METHODS=["ccall","cwrap","addFunction","UTF8ToString"] -s RESERVED_FUNCTION_POINTERS=20 bin/libastyle.a'
