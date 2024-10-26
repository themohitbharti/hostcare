
# HostCare

**HostCare** is a command-line tool designed to monitor and test the health, load, and system metrics of servers. It provides easy access to critical information like server health status, load test summaries, and system resource usage in a clean, tabular format.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Health Check](#health-check)
  - [Load Testing](#load-testing)
  - [System Metrics](#system-metrics)
- [Examples](#examples)
- [License](#license)

---

## Installation

To install **HostCare**, clone this repository and install the dependencies:

```bash
git clone <repository_url>
cd hostcare
npm install
```

Once installed, you can run `hostcare` directly from the command line.

## Usage

Run `hostcare` with the following command structure:

```bash
node hostcare <command> <arguments>
```

### Commands:

- **Health Check**: Check if a server is online and receiving requests.
  ```bash
  node hostcare healthcheck <url>
  ```
  Example:
  ```bash
  node hostcare healthcheck http://example.com
  ```

- **Load Testing**: Simulate multiple requests to test server load capacity.
  ```bash
  node hostcare loadtest <url> <requestCount>
  ```
  Example:
  ```bash
  node hostcare loadtest http://example.com 100
  ```

- **System Metrics**: Display system metrics like uptime, memory usage, and CPU load averages.
  ```bash
  node hostcare metrics
  ```

### Available Commands

| Command       | Description                              |
|---------------|------------------------------------------|
| `healthcheck` | Check if a server is healthy.            |
| `loadtest`    | Simulate a number of requests to a URL.  |
| `metrics`     | Show system-level metrics.               |

## Examples

1. **Checking Server Health**
    ```bash
    node hostcare healthcheck http://example.com
    ```

2. **Running a Load Test**
    ```bash
    node hostcare loadtest http://example.com 100
    ```

3. **Displaying System Metrics**
    ```bash
    node hostcare metrics
    ```

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
