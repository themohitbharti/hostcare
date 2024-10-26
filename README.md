
# Hostcare

Hostcare is a command-line tool designed to help you monitor server health, simulate load testing, and gather system metrics efficiently. With a user-friendly interface, Hostcare enables developers and system administrators to ensure their servers are running optimally.

## Table of Contents
- [Features](#features)
  - [1. Server Health Check](#1-server-health-check)
  - [2. Load Testing](#2-load-testing)
  - [3. System Metrics](#3-system-metrics)
- [Installation](#installation)
  - [Option 1: Global Installation](#option-1-global-installation)
  - [Option 2: Local Installation](#option-2-local-installation)
- [Usage](#usage)
- [Examples](#examples)
- [License](#license)

## Features

### 1. Server Health Check
- **Description**: This feature allows you to check the health of a server by sending an HTTP request to a specified URL. It reports the server's status, HTTP status code, response time, and a timestamp.
- **Usage**: 
    ```bash
    hostcare healthcheck <url>
    ```

### 2. Load Testing
- **Description**: Simulate load on your server by sending multiple requests simultaneously. This feature helps you understand how your server handles high traffic and identifies potential performance bottlenecks.
- **Usage**:
    ```bash
    hostcare loadtest <url> <requestCount>
    ```

### 3. System Metrics
- **Description**: Gather and display essential system metrics, such as uptime, load averages, memory usage, and more. This helps you monitor your server's performance and resource consumption.
- **Usage**:
    ```bash
    hostcare metrics
    ```

## Installation

To install Hostcare, you can use npm. There are two ways to install:

### Option 1: Global Installation
This option makes the `hostcare` command available from any directory in your terminal.

```bash
npm install -g hostcare
```

### Option 2: Local Installation
If you prefer to install Hostcare locally within a project, use the following command:

```bash
npm install hostcare
```

To use the command after local installation, prefix it with `npx` everytime you use it:

```bash
npx hostcare <command>
```

## Usage

After installation, you can use Hostcare commands as follows:

- For server health checks:
    ```bash
    hostcare health <url>
    ```

- For load testing:
    ```bash
    hostcare load <url> <requestCount>
    ```

- For system metrics:
    ```bash
    hostcare metrics
    ```


## Examples

1. **Checking Server Health**
    
bash
    hostcare healthcheck http://example.com


2. **Running a Load Test**
    
bash
    hostcare loadtest http://example.com 100


3. **Displaying System Metrics**
    
bash
    hostcare metrics


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
