#!/usr/bin/env bash

set -eu

rustup target add wasm32-unknown-unknown --toolchain nightly
git submodule update --init
git submodule foreach rustup run nightly cargo test
git submodule foreach rustup run nightly cargo build --target wasm32-unknown-unknown
