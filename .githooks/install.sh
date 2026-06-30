#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
HOOK_SOURCE="${SCRIPT_DIR}/pre-commit"
HOOK_TARGET="${PROJECT_ROOT}/.git/hooks/pre-commit"

if [ -f "${HOOK_TARGET}" ]; then
    echo "[warn] Existing pre-commit hook found at ${HOOK_TARGET}"
    echo "[warn] Backing up to ${HOOK_TARGET}.bak"
    cp "${HOOK_TARGET}" "${HOOK_TARGET}.bak"
fi

cp "${HOOK_SOURCE}" "${HOOK_TARGET}"
chmod +x "${HOOK_TARGET}"

echo "[done] Pre-commit hook installed successfully."
echo ""
echo "       To uninstall: rm ${HOOK_TARGET}"
