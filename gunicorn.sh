#!/bin/bash

set -e

HOME=/home/tim
APP_NAME=djropbox
DOMAIN_NAME=djropbox.jadedraver.club
LOGFILE=$HOME/$DOMAIN_NAME/logs/$APP_NAME.log
LOGDIR=$(dirname $LOGFILE)
NUM_WORKERS=3

NGINX_TIMEOUT=90
GUNICORN_PORT=8001

# user/group to run as
USER=tim
GROUP=$USER

DJANGO_DIR=$HOME/$APP_NAME/$APP_NAME

cd $DJANGO_DIR
source $HOME/.virtualenvs/$APP_NAME/bin/activate

test -d $LOGDIR || mkdir -p $LOGDIR
set -x
exec gunicorn $APP_NAME.wsgi:application \
     --workers $NUM_WORKERS \
     --timeout=$NGINX_TIMEOUT \
     --user=$USER \
     --group=$GROUP \
     --log-level=debug \
     --bind localhost:$GUNICORN_PORT \
     --access-logfile ${LOGDIR}/access.log \
     --error-logfile ${LOGDIR}/error.log \
     --log-file=${LOGFILE} 2>>${LOGFILE}
