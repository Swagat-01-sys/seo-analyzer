FROM python:3.12-slim

# Install Node.js, npm and Chromium
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    chromium \
    chromium-driver \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY package*.json ./

RUN npm install

COPY . .

ENV CHROME_PATH=/usr/bin/chromium

EXPOSE 10000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]