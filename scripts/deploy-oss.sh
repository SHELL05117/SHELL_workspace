#!/usr/bin/env bash
set -euo pipefail

: "${ALIYUN_OSS_BUCKET:?ALIYUN_OSS_BUCKET is required}"
: "${ALIYUN_OSS_ENDPOINT:?ALIYUN_OSS_ENDPOINT is required}"

BUILD_DIR="${BUILD_DIR:-build}"
OSS_PREFIX="${OSS_PREFIX:-site/}"

if ! command -v ossutil >/dev/null 2>&1; then
  echo "ossutil is required. Install and configure it before running this script." >&2
  exit 1
fi

if [ ! -d "$BUILD_DIR" ]; then
  echo "Build directory '$BUILD_DIR' does not exist. Run npm run build first." >&2
  exit 1
fi

ossutil cp "$BUILD_DIR/" "oss://${ALIYUN_OSS_BUCKET}/${OSS_PREFIX}" \
  --endpoint "$ALIYUN_OSS_ENDPOINT" \
  --recursive \
  --update

echo "Uploaded $BUILD_DIR to oss://${ALIYUN_OSS_BUCKET}/${OSS_PREFIX}"
