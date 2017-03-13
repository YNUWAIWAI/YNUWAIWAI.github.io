#!/bin/sh
docker build tools -t nimiusrd/hp
docker run -ti --rm -v "$(pwd)":/src -w /src -p 4000:4000 nimiusrd/hp bash tools/build.sh
