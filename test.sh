#!/bin/bash

docker-compose down -v
docker-compose build cronicle
docker-compose up

