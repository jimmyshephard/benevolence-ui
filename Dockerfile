# ==========================================
# STAGE 1: Build the Angular Application
# ==========================================
from node:24-alpine AS build

# Install pnpm globally inside the container
RUN npm install -g pnpm@11

# Force non-interactive behavior in CI/headless environments
ENV CI=true

WORKDIR /app

# Copy dependency mappings AND the new build permission rules file
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Run the strict installation cleanly
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile || pnpm install --force

# Copy the rest of the application source code
COPY . .

# ==========================================
# STAGE 2: Production image
# ==========================================
RUN pnpm run build --configuration=docker


FROM nginx:1.25-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/benevolence-ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
