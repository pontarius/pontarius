# Pontarius web service

## Architecture

* Docker container running prosody (handles BOSH and XMPP over TCP)
* Docker container running nginx; proxies requests to /http-bind/ to the BOSH
  server and serves the webapp from /

* Uses webpack to handle imports etc.

## Getting started

* `npm install` to get required modules
* `npm run build` to assamble bundle files etc.
* `docker-compose up` to start the server (Default web port is 8000, set env
  variable PORT to override
* Open your browser at `http://localhost:8000/` (or the chosen port)

## Development

* Write in ES6.
* Use ES6 includes whenever possible
* Use eslint (.eslintrc.yml included). When style changes are necessary, patch
  the .eslintrc file
