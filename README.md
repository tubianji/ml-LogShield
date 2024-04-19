# ml-LogShield

ml-LogShield is a top-notch machine learning project harnessing the power of TensorFlow.js to track and identify harmful activities in web server access and login logs. It provides an effective defense mechanism for your server, spotting and flagging suspect behaviors to help guard against possible security breaches.

Driven by a complex Recurrent Neural Network (RNN) model, ml-LogShield specializes in sequential data understanding, allowing it to grasp the temporal dependencies in the logs and accurately identify patterns of harmful activity. This approach is especially effective for login logs, where the sequence of attempts may indicate harmful intent.

By integrating a machine learning model, ml-LogShield transcends traditional rule-based systems to offer dynamic and adaptable protection. It is designed to learn and improve over time, refining its ability to discern legitimate from malicious activity, and delivering a progressively robust defense for your web server.

Whether it's protection from Distributed Denial of Service (DDoS) attacks, brute-force login attempts, or other types of harmful activity, ml-LogShield provides a state-of-the-art, machine learning-powered solution to bolster your web server's security.

![image](./display.png)

# How It Works

It includes a rate limiter feature to prevent web server abuse by limiting requests from a single IP address within a certain time period. The rate limiter uses Redis as a storage backend to monitor each IP address's request count.

## Environmental Variables

Various environment variables utilized in the application are listed below:

- SECRET: Session encryption secret key
- DIFFICULTY: Proxy server difficulty level
- PORT: Proxy server port number
- TARGETURL: Proxy target server URL
- WHITELISTED: Whitelisted IP addresses
- Redis_Username: Redis database connection username
- Redis_Password: Redis database connection password
- Redis_Host: Redis database 