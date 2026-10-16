FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM build AS test
# Los tests usan fetch simulado y la URL predeterminada, igual que la medición local.
ENTRYPOINT ["env", "-u", "VITE_API_URL", "npm", "run", "test:coverage", "--", "--coverage.reportsDirectory=/out/coverage", "--reporter=default", "--reporter=junit", "--outputFile.junit=/out/tests.xml"]

FROM nginx:1.27-alpine AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
