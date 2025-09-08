# # Use official Python base
# FROM python:3.11-slim

# # Set workdir
# WORKDIR /app

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     curl \
#     && rm -rf /var/lib/apt/lists/*

# # Copy requirements and install
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy backend source
# COPY . .

# # Expose port
# EXPOSE 8000

# # Start FastAPI app with uvicorn
# CMD ["uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"]


FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
