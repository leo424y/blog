#!/bin/bash

/usr/bin/rsync -av \
	--delete \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude 'Runtime' \
    -e 'ssh -p 22' \
    ./dist/ root@159.65.132.247:/usr/share/nginx/html
