FROM intelliops/cronicle:0.8.28

ADD foreground.sh /foreground.sh

CMD ["sh", "/foreground.sh"]
