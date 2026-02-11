# NocoDB Dockerfile Analysis

This repository contains a reverse-engineered Dockerfile for the NocoDB image based on analysis of the official `nocodb/nocodb:latest` image.

## Components

The Dockerfile recreates the official NocoDB image with the following components:

### Base Image
- Debian Bookworm (minimal version)

### Runtime Environment
- Node.js v22.20.0
- Yarn package manager v1.22.22
- Production environment mode

### Database Layer
- SQLite as the primary database
- Litestream for replication and backup capabilities
- Automatic snapshotting and retention policies

### System Utilities
- dumb-init as the process supervisor
- curl and wget for downloads
- dasel for data selection in JSON/YAML/TOML/XML

### Security Features
- Non-root execution (runs as user with UID 1000)
- Minimal attack surface with only necessary packages

### Configuration
- Port 8080 exposed for the web interface
- Various environment variables for customization
- Proper signal handling with dumb-init

## Building the Image

To build this image, you would need the actual NocoDB application files, which are not included in this repository due to licensing considerations. The Dockerfile serves as a reference for understanding the official image structure.

```bash
# This would be the command, assuming you have the necessary files
docker build -f Dockerfile.nocodb.corrected -t nocodb-custom .
```

## Notes

- This Dockerfile is for educational purposes to understand the structure of the official NocoDB image
- Actual NocoDB application files are not included
- For production use, it's recommended to use the official `nocodb/nocodb` image