FROM fluent/fluentd:v1.20.1-debian-1.0
COPY --chown=fluent:fluent fluentd.conf /fluentd/etc/fluent.conf
USER fluent
CMD ["fluentd", "-c", "/fluentd/etc/fluent.conf"]
