FROM python:3.11.6-alpine3.18

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# CORREÇÃO: Adicionado libffi-dev
RUN apk update && apk add --no-cache \
    build-base \
    postgresql-dev \
    libffi-dev \
    netcat-openbsd

WORKDIR /usr/src/api
COPY ./api/requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r /usr/src/api/requirements.txt

COPY ./api /usr/src/api
COPY ./api/config/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]