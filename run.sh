#!/bin/sh


DIRS='
/opt/lua
'

for line in $(pgrep -f /opt/stkrush-bot)
do
  kill -9 $line
#  rm $line
done


for run_dir in ${DIRS}
do
  pgrep -f "${run_dir}" > /dev/null || uwsgi -b 32768 --plugins lua51 --socket 127.0.0.1:82 --lua /opt/stkrush-bot/pippo.lua --processes 2 --master --chdir /opt/stkrush-bot --daemonize /var/log/uwsgi/stkrush-bot.log --pidfile /var/run/uwsgi/stkrush-bot.pid
done







