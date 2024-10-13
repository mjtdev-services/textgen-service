#!/usr/bin/env bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

. "${SCRIPT_DIR}/CONFIG"

ENV_FILE="${SCRIPT_DIR}/../.env"

docker stop "${NAME}" || true

docker run -it --rm -d \
  --name "${NAME}" \
  --network "${NETWORK_NAME}" \
  --env-file "${ENV_FILE}" \
   "${IMAGE_TAG}"
