FROM node:24.22.0-bookworm-slim AS verify
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY app.js ./
COPY test ./test
RUN npm test

FROM node:24.22.0-bookworm-slim AS runtime
WORKDIR /app
# This copy makes the runtime image depend on the completed test stage.
COPY --from=verify --chown=node:node /app/app.js ./app.js
USER node
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=5 CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "app.js"]
