#!/usr/bin/env bash

set -eu

rustup target add wasm32-unknown-unknown --toolchain nightly
rustup run nightly cargo test
rustup run nightly cargo build --target wasm32-unknown-unknown
