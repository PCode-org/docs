---
title: Installation
description: Learn how to install and set up PCode on your local machine.
sidebar_position: 10
---

# Installation

This guide will walk you through the process of installing and setting up PCode on your local machine. PCode requires a few prerequisites to be installed before you can begin.

## Prerequisites

Before installing PCode, make sure you have the following software installed on your system:

### PostgreSQL Database

PCode uses PostgreSQL as its database. The recommended way to run PostgreSQL is through Docker.

#### Installing Docker

- **Windows**: Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- **macOS**: Download and install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
- **Linux**: Install Docker using your package manager

```bash title="Install Docker on Ubuntu/Debian"
sudo apt-get update
sudo apt-get install docker.io docker-compose
```

#### Running PostgreSQL with Docker

Once Docker is installed, you can run PostgreSQL with the following command:

```bash
docker run --name pcode-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pcode \
  -p 5432:5432 \
  -d postgres:16
```

This command:
- Creates a container named `pcode-postgres`
- Sets the username to `postgres`
- Sets the password to `postgres`
- Creates a database named `pcode`
- Maps port 5432 on your host to the container

:::note Security Note
The default credentials (`postgres/postgres`) are intended for local development only. For production environments, use strong, unique passwords.
:::

### Node.js and npm

PCode requires Node.js version 18.0 or higher.

#### Verify Node.js Installation

```bash
node --version
```

If Node.js is not installed or your version is below 18.0:

- **Windows**: Download and install from [nodejs.org](https://nodejs.org/)
- **macOS**: Using Homebrew: `brew install node`
- **Linux**: Using your package manager:

```bash title="Ubuntu/Debian"
sudo apt-get install nodejs npm
```

#### Verify npm Installation

```bash
npm --version
```

### OpenSpec CLI

OpenSpec is a tool for managing proposals and specifications. Install it globally:

```bash
npm install -g @openspec/cli
```

Verify the installation:

```bash
openspec --version
```

### Claude Code CLI

Claude Code CLI is required for PCode's AI-powered features. Install it globally:

```bash
npm install -g @anthropic-ai/claude-code
```

Verify the installation:

```bash
claude --version
```

## Verify Your Environment

Before proceeding, use this script to verify all prerequisites are properly installed:

```bash title="check-environment.sh"
#!/bin/bash

echo "Checking PCode Prerequisites..."
echo ""

# Check Node.js
echo -n "Node.js: "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ $NODE_VERSION"
else
    echo "✗ Not installed"
fi

# Check npm
echo -n "npm: "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ $NPM_VERSION"
else
    echo "✗ Not installed"
fi

# Check Docker
echo -n "Docker: "
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✓ $DOCKER_VERSION"
else
    echo "✗ Not installed"
fi

# Check PostgreSQL
echo -n "PostgreSQL: "
if docker ps --filter "name=pcode-postgres" --format "{{.Names}}" | grep -q "pcode-postgres"; then
    echo "✓ Running (pcode-postgres container)"
else
    echo "✗ Not running"
fi

# Check OpenSpec CLI
echo -n "OpenSpec CLI: "
if command -v openspec &> /dev/null; then
    OPENSPEC_VERSION=$(openspec --version)
    echo "✓ $OPENSPEC_VERSION"
else
    echo "✗ Not installed"
fi

# Check Claude Code CLI
echo -n "Claude Code CLI: "
if command -v claude &> /dev/null; then
    CLAUDE_VERSION=$(claude --version)
    echo "✓ $CLAUDE_VERSION"
else
    echo "✗ Not installed"
fi

echo ""
echo "Environment check complete!"
```

Save this script as `check-environment.sh`, make it executable, and run it:

```bash
chmod +x check-environment.sh
./check-environment.sh
```

## Deploy the Software Package

PCode is distributed as a software package that you need to download and extract to your local machine.

### Windows

1. Download the PCode package (`.zip` format)
2. Extract the package to your desired location, for example: `D:\code\pcode`
3. Open a Command Prompt or PowerShell and navigate to the extracted directory:

```powershell
cd D:\code\pcode
```

### Linux

1. Download the PCode package (`.tar.gz` format)
2. Extract the package:

```bash
tar -xzf pcode-package.tar.gz
cd pcode
```

Or use a graphical archive manager to extract to your desired location.

### macOS

1. Download the PCode package (`.tar.gz` format)
2. Extract the package:

```bash
tar -xzf pcode-package.tar.gz
cd pcode
```

Or double-click the archive in Finder to extract it.

## Configure Database Connection

PCode needs to connect to your PostgreSQL database. The database connection is configured in the `appsettings.Production.json` file.

1. Navigate to the PCode directory
2. Open `appsettings.Production.json` in a text editor
3. Locate the connection string section:

```json
{
  "ConnectionStrings": {
    "Default": "Host=127.0.0.1;Port=5432;Database=pcode;Username=postgres;Password=postgres"
  }
}
```

4. Update the connection string if you're using different credentials:
   - `Host`: Your PostgreSQL host (default: `127.0.0.1`)
   - `Port`: Your PostgreSQL port (default: `5432`)
   - `Database`: Your database name (default: `pcode`)
   - `Username`: Your PostgreSQL username (default: `postgres`)
   - `Password`: Your PostgreSQL password (default: `postgres`)

:::tip
If you're using the Docker PostgreSQL command from above, the default configuration will work without any changes.
:::

## Start the Service

PCode provides startup scripts for different platforms.

### Windows

Use the provided batch file to start the service:

```powershell
start.bat
```

This script will:
1. Check if PostgreSQL is running
2. Apply database migrations
3. Start the PCode service
4. Display the access URL

### Linux/macOS

Use the provided shell script to start the service:

```bash
chmod +x start.sh
./start.sh
```

This script will:
1. Check if PostgreSQL is running
2. Apply database migrations
3. Start the PCode service
4. Display the access URL

### Troubleshooting Startup

If the service fails to start:

1. **Check PostgreSQL is running**:
   ```bash
   docker ps | grep pcode-postgres
   ```

2. **Start PostgreSQL if stopped**:
   ```bash
   docker start pcode-postgres
   ```

3. **Check the logs** for detailed error messages:
   ```bash
   tail -f logs/pcode.log
   ```

4. **Verify your connection string** in `appsettings.Production.json`

5. **Check port availability**: Ensure port `34567` is not in use by another application

## Access the Interface

Once the service is running, you can access the PCode web interface through your browser.

### Open in Browser

Navigate to:

```
http://127.0.0.1:34567
```

The PCode interface should load, displaying the main dashboard.

### Default Access

- **URL**: `http://127.0.0.1:34567`
- **Port**: `34567` (default)
- **Host**: `127.0.0.1` (localhost)

:::note
The port `34567` is the default port used by PCode. If you need to change it, you can modify the configuration in `appsettings.Production.json`.
:::

### Stopping the Service

To stop the PCode service:

- **Windows**: Press `Ctrl+C` in the command window where the service is running
- **Linux/macOS**: Press `Ctrl+C` in the terminal where the service is running, or use:
  ```bash
  ./stop.sh
  ```

To stop PostgreSQL:

```bash
docker stop pcode-postgres
```

## Next Steps

Now that you have PCode installed and running, continue to [Create Your First Project](/docs/quick-start/create-first-project) to start using PCode.

## Troubleshooting

### PostgreSQL Connection Issues

If you see connection errors:

1. Verify PostgreSQL is running: `docker ps | grep pcode-postgres`
2. Check the connection string in `appsettings.Production.json`
3. Ensure port `5432` is not blocked by a firewall

### Port Already in Use

If port `34567` is already in use:

1. Find the process using the port:
   ```bash
   lsof -i :34567  # Linux/macOS
   netstat -ano | findstr :34567  # Windows
   ```
2. Either stop the conflicting process or change the port in the configuration

### Migration Failures

If database migrations fail:

1. Drop and recreate the database:
   ```bash
   docker exec -it pcode-postgres psql -U postgres -c "DROP DATABASE IF EXISTS pcode;"
   docker exec -it pcode-postgres psql -U postgres -c "CREATE DATABASE pcode;"
   ```
2. Run the startup script again

### Need More Help?

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/pcode/pcode-docs/issues) for similar problems
2. Visit our [community forum](https://github.com/pcode/pcode-docs/discussions) for assistance
