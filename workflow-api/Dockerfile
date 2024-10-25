# Dockerfile สำหรับ Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# รัน Migration ทันทีหลังจาก build
RUN npm run build

# เปิด Environment เป็น Development
ENV NODE_ENV=development

# เปิด Port สำหรับการเชื่อมต่อ
EXPOSE 3000

# รัน Migration และเริ่มเซิร์ฟเวอร์
CMD ["sh", "-c", "npm run typeorm:migration:run && npm run start:dev"]
