#!/usr/bin/env bash
set -euo pipefail

: "${ALIYUN_OSS_BUCKET:?ALIYUN_OSS_BUCKET is required}"
: "${ALIYUN_OSS_ENDPOINT:?ALIYUN_OSS_ENDPOINT is required}"

SOURCE_DIR="${SOURCE_DIR:-source}"
OSS_PREFIX="${OSS_PREFIX:-media/}"

if ! command -v ossutil >/dev/null 2>&1; then
  echo "ossutil is required. Install and configure it before running this script." >&2
  exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory '$SOURCE_DIR' does not exist." >&2
  exit 1
fi

ossutil cp "$SOURCE_DIR/" "oss://${ALIYUN_OSS_BUCKET}/${OSS_PREFIX}" \
  --endpoint "$ALIYUN_OSS_ENDPOINT" \
  --recursive \
  --update

echo "Uploaded $SOURCE_DIR to oss://${ALIYUN_OSS_BUCKET}/${OSS_PREFIX}"
