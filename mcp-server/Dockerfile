FROM python:3.11-slim

# Install core system dependencies required for our tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    apt-transport-https \
    ca-certificates \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Docker CLI (We only need the CLI, we will mount the docker.sock from the host VM)
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bookworm stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && apt-get install -y docker-ce-cli && rm -rf /var/lib/apt/lists/*

# Install kubectl (So our k8s tools can run, though python kubernetes client does most of the work)
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Trivy (For vulnerability scanning)
RUN curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Set up the application
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy our MCP tool files and router
COPY . .

# Run the FastMCP + FastAPI unified server
ENV PORT=8080
EXPOSE 8080

CMD ["python", "main.py"]
