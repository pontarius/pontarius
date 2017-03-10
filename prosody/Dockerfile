FROM alpine:latest

RUN apk add --no-cache prosody

COPY prosody.cfg.lua /etc/prosody/prosody.cfg.lua

RUN prosodyctl register user1 pontarius pwd1 && \
    prosodyctl register user2 pontarius pwd2

CMD prosodyctl start
