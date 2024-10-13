#!/usr/bin/env bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

. "${SCRIPT_DIR}/CONFIG"

ENV_FILE="${SCRIPT_DIR}/../.env"

  # -v "$(pwd)/${CONFIG_FILE}:/app/vendor/xmrig/build/config.json:ro" \
docker run -it --rm \
  --name "${NAME}" \
  --env-file "${ENV_FILE}" \
  --entrypoint /bin/sh  "${IMAGE_TAG}"