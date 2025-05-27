FROM python:3.10

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libx11-6 \
    libxcursor1 \
    libxi6 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    x11-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
