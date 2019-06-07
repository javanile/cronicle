#!/bin/sh
set -e

unknown() {
  for cmd in "apply" "help"; do
    if [ -z "${cmd#"$1"}" ]; then
      return 1
    fi
  done
}

if [ "$(printf %c "$1")" = '-' ]; then
  set -- /sbin/tini -s -- cronicle-task "$@"
elif [ "$1" = 'cronicle-task' ]; then
  set -- /sbin/tini -s -- "$@"
elif ! unknown "$1"; then
  set -- /sbin/tini -s -- cronicle-task "$@"
fi

exec "$@"
