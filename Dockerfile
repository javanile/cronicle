FROM intelliops/cronicle:0.8.28

USER root
COPY docker-*.sh /
RUN npm install -g cronicle-task

USER cronicle
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
CMD ["sh", "/docker-foreground.sh"]
