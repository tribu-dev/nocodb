###########
# Litestream Builder
###########
FROM golang:bullseye AS lt-builder

WORKDIR /usr/src/

RUN apt-get update && apt-get install -y \
    git \
    make \
    gcc \
    libc-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# build litestream
RUN git clone https://github.com/benbjohnson/litestream.git litestream
RUN cd litestream && go install ./cmd/litestream
RUN cp $GOPATH/bin/litestream /usr/src/lt

###########
# Builder
###########
FROM node:22-slim AS builder
WORKDIR /usr/src/app

# Install dependencies required for node-gyp and other build tools
RUN apt-get update && apt-get install -y \
    python3 \
    python3-distutils \
    python-is-python3 \
    make \
    g++ \
    libssl-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN python3 --version && python --version

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Copy workspace and package files
COPY --link ./package.json ./package.json
COPY --link ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY --link ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --link ./packages ./packages

# Ensure @types/jest is available for the SDK build (added to local package.json before build)
# RUN pnpm add -Dw @types/jest # Removed to avoid lockfile mutation during build if possible

# Configure pnpm to use hoisted node_modules for modclean compatibility
RUN echo "node-linker=hoisted" > .npmrc

# Install all dependencies and allow scripts to run for native module compilation
RUN pnpm install --no-frozen-lockfile

# Build the NocoDB SDK, backend, and frontend
RUN cd packages/nocodb-sdk && pnpm run build:main && pnpm run build:module && \
    cd /usr/src/app && pnpm --filter=nocodb run build && \
    cd /usr/src/app && NODE_OPTIONS="--max-old-space-size=4096" pnpm --filter=nc-gui run generate && \
    mkdir -p packages/nocodb/docker/public && cp -r packages/nc-gui/dist/* packages/nocodb/docker/public/

# Prune dev dependencies to keep the image smaller
# RUN pnpm prune --prod

# Copy start script and give it execute permission
COPY --link ./packages/nocodb/docker/start-litestream.sh /usr/src/appEntry/start.sh
RUN chmod +x /usr/src/appEntry/start.sh

##########
# Runner
##########
FROM node:22-slim
WORKDIR /usr/src/app

ENV LITESTREAM_S3_SKIP_VERIFY=false \
    LITESTREAM_RETENTION=1440h \
    LITESTREAM_RETENTION_CHECK_INTERVAL=72h \
    LITESTREAM_SNAPSHOT_INTERVAL=24h \
    LITESTREAM_SYNC_INTERVAL=60s \
    NC_DOCKER=0.6 \
    NC_TOOL_DIR=/usr/app/data/ \
    NODE_ENV=production \
    PORT=8080

# Install additional runtime dependencies
RUN apt-get update && apt-get install -y \
    dumb-init \
    curl \
    wget \
    && curl -L "https://github.com/TomWright/dasel/releases/download/v2.8.1/dasel_linux_$(dpkg --print-architecture)" -o /usr/local/bin/dasel \
    && chmod +x /usr/local/bin/dasel \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy litestream binary and config file
COPY --link --from=lt-builder /usr/src/lt /usr/local/bin/litestream
COPY --link ./packages/nocodb/docker/litestream.yml /etc/litestream.yml

# Copy production code & main entry file
COPY --link --from=builder /usr/src/app/ /usr/src/app/
COPY --link --from=builder /usr/src/appEntry/ /usr/src/appEntry/

# Create data directory and set ownership for non-root user
RUN mkdir -p /usr/app/data \
    && chown -R node:node /usr/src/app \
    && chown -R node:node /usr/src/appEntry \
    && chown -R node:node /usr/app/data \
    && chown node:node /etc/litestream.yml

EXPOSE 8080

# Run as non-root user
USER node

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start Nocodb
CMD ["/usr/src/appEntry/start.sh"]
