# Health Check and Load Testing Utility

## Overview

The **Health Check and Load Testing Utility** is a Node.js application designed to monitor the health of your web servers and perform load testing. It provides functions to check the health of a server, simulate concurrent requests, and gather system metrics, making it an essential tool for developers and system administrators who want to ensure their services are running smoothly and efficiently.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
  - [checkServerHealth(url)](#checkserverhealthurl)
  - [simulateLoad(url, requestCount)](#simulateloadurl-requestcount)
  - [getSystemMetrics()](#getsystemmetrics)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Server Health Checks**: Monitor the health status of your server with detailed response time and status information.
- **Load Testing**: Simulate multiple requests to assess server performance under load.
- **System Metrics**: Gather and display important system metrics, including memory usage and uptime.
- **Dynamic Imports**: Use modern JavaScript features to handle dependencies like `chalk` and `table` dynamically.
- **Support for HTTP and HTTPS**: Works seamlessly with both protocols for flexible server monitoring.

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/themohitbharti/hostcare.git
cd your-repo-name
npm install
```

Ensure you have Node.js installed on your machine. This utility is compatible with Node.js version 14 and above.

## Usage

To use the utility, you can import the functions into your Node.js application. Below are examples of how to use each function.

### Functions

#### `checkServerHealth(url)`

Checks the health of a server by sending an HTTP/HTTPS GET request to the specified URL. It returns a summary of the server's status, response time, and HTTP status code.

**Parameters:**
- `url` (String): The URL of the server to check.

**Returns:**
- A promise that resolves to an object containing `isHealthy`, `duration`, and `statusCode`.

#### `simulateLoad(url, requestCount)`

Simulates a specified number of requests to a server to test its load handling capabilities. It summarizes the results, indicating how many requests were successful and how many failed.

**Parameters:**
- `url` (String): The URL of the server to test.
- `requestCount` (Number): The number of requests to simulate.

**Returns:**
- A promise that resolves when all requests have been processed.

#### `getSystemMetrics()`

Retrieves and formats system metrics, including uptime, memory usage, and load averages.

**Returns:**
- An object containing formatted system metrics.

## Example

```javascript
const { checkServerHealth, simulateLoad, getSystemMetrics } = require('./path/to/your/module');

// Check server health
checkServerHealth('http://example.com')
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Simulate load
simulateLoad('http://example.com', 100)
    .then(() => console.log('Load test completed'));

// Get system metrics
const metrics = getSystemMetrics();
console.log(metrics);
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your changes.

## License

This project is licensed under the MIT License.
