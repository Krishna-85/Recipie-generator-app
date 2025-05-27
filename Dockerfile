# -------------------------------
# Step 1: Build Frontend with ARG
# -------------------------------
FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend

# Accept environment variable from outside during build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./

# Build with the env variable injected
RUN npm run build

# -------------------------------
# Step 2: Build Backend
# -------------------------------
FROM node:18-alpine as backend

WORKDIR /app/backend

COPY Backend/package*.json ./
RUN npm install

COPY Backend/ ./

# Copy frontend build into backend's public directory
COPY --from=frontend-builder /app/frontend/dist ./public

# Set environment variables
ENV PORT=3000
ENV MONGO_URI=mongodb+srv://vaibhavchauhan658:32tGKsx1MRhYunbc@cluster1.ru4od.mongodb.net/recipe
ENV JWT_SECRET=krishna
ENV GOOGLE_GEMINI_KEY=AIzaSyDpzCWWA1_kh6GTWtuuFfzWd48zO44-jAI

# Expose and start server
EXPOSE 3000
CMD ["node", "server.js"]
