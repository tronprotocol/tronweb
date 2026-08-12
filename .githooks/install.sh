#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
HOOKS=(pre-commit pre-push)

for HOOK in "${HOOKS[@]}"; do
    HOOK_SOURCE="${SCRIPT_DIR}/${HOOK}"
    HOOKS_DIR="$(git -C "${PROJECT_ROOT}" rev-parse --git-path hooks)"
    HOOK_TARGET="${HOOKS_DIR}/${HOOK}"

    if [ -f "${HOOK_TARGET}" ]; then
        echo "[warn] Existing ${HOOK} hook found at ${HOOK_TARGET}"
        echo "[warn] Backing up to ${HOOK_TARGET}.bak"
        cp "${HOOK_TARGET}" "${HOOK_TARGET}.bak"
    fi

    cp "${HOOK_SOURCE}" "${HOOK_TARGET}"
    chmod +x "${HOOK_TARGET}"

    echo "[done] ${HOOK} hook installed successfully."
    echo ""
    echo "       To uninstall: rm ${HOOK_TARGET}"
done
