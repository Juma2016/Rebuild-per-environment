FROM node:24.22.0-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY app.js control.js probe.js ./
COPY test ./test
RUN npm test
USER node
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=2s --start-period=20s --start-interval=2s --retries=3 \
  CMD ["node", "probe.js", "http://127.0.0.1:3000/health/live"]
CMD ["node", "app.js"]
