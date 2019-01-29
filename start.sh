#!/bin/sh
docker pull ynuwaiwai/ynuwaiwai.github.io
docker run -ti --rm -v "$(pwd)":/src -w /src -p 4000:4000 ynuwaiwai/ynuwaiwai.github.io bash tools/build.sh
