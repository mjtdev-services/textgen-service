#!/usr/bin/env bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. "${SCRIPT_DIR}/CONFIG"

ROOT="${SCRIPT_DIR}/.."

docker build -t "${IMAGE_TAG}" "${ROOT}"
