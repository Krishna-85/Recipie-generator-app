FROM node:18-alpine as frontend-builder


WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./

RUN npm run build

 

FROM node:18-alpine as backend

WORKDIR /app/backend
COPY  Backend/package*.json ./
RUN npm install

COPY Backend/ ./

COPY --from=frontend-builder /app/frontend/dist ./public

ENV PORT=3000
ENV MONGO_URI=mongodb+srv://vaibhavchauhan658:32tGKsx1MRhYunbc@cluster1.ru4od.mongodb.net/recipe
ENV JWT_SECRET=krishna
ENV GOOGLE_GEMINI_KEY=AIzaSyDpzCWWA1_kh6GTWtuuFfzWd48zO44-jAI


 EXPOSE 3000 

 CMD ["node", "server.js"]