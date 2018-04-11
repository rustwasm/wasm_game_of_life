#!/usr/bin/env bash

set -eu

cd $(dirname "$0")

git submodule foreach 'git checkout $name'
