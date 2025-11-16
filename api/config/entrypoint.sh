#!/bin/sh

echo 'Esperando o PostgreSQL iniciar...'

while ! nc -z $DB_HOSTNAME $DB_PORT; do
    sleep 0.1
done

echo 'PostgreSQL iniciado'

python manage.py migrate
python manage.py collectstatic --no-input

# CORREÇÃO: Trocamos o scraper ao vivo pelo mock
# python manage.py updatedb
python manage.py updatemock

exec "$@"