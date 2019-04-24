#!/bin/sh

echo "---[ Cronicle ]---"

STORAGE_CLI=/opt/cronicle/bin/storage-cli.js
SERVERS_INFO=$(${STORAGE_CLI} get global/servers/0 2> /dev/null)

if [[ -n "${SERVERS_INFO}" ]]; then
    CONTAINER_IP=$(awk 'END{print $1}' /etc/hosts)
    CONTAINER_HOST=$(node -e 'console.log(require("os").hostname().toLowerCase());')

    echo "Update current HOST and IP to: ${CONTAINER_HOST} (${CONTAINER_IP})"
    ${STORAGE_CLI} get global/server_groups/0 | sed -e "s/\"regexp\": \"^.*\"/\"regexp\": \"^(${CONTAINER_HOST})$\"/" | ${STORAGE_CLI} put global/server_groups/0
    ${STORAGE_CLI} get global/servers/0 | sed -e "s/\"ip\": \".*\"/\"ip\": \"${CONTAINER_IP}\"/" -e "s/\"hostname\": \".*\"/\"hostname\": \"${CONTAINER_HOST}\"/" | ${STORAGE_CLI} put global/servers/0

    [[ -f /opt/cronicle/logs/cronicled.pid ]] && rm /opt/cronicle/logs/cronicled.pid

    /opt/cronicle/bin/control.sh stop > /dev/null
fi

sh /entrypoint.sh
