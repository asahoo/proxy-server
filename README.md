Time spent: [2 hrs]

Completed:

[] Required: Requests to port 8000 are echoed back with the same HTTP headers and body
[] Required: Requests/reponses are proxied to/from the destination server
[] Required: The destination server is configurable via the --host, --port or --url arguments
[] Required: The destination server is configurable via the x-destination-url header
[] Required: Client requests and respones are printed to stdout
[] Required: The --logfile argument outputs all logs to the file specified instead of stdout

![Video Walkthrough](proxyserver-demo.gif)

# proxy-server
proxy server listens at http://127.0.0.1:8001
echo server is at http://127.0.0.1:8000

Client sends request to proxy server, the default destination server is http://127.0.0.1:8000. Client can pass different destination server address that will proxied by proxy server, client can use request header x-destination-url to pass the desired server address, for an example:

curl -v http://127.0.0.1:8001 -H "x-destination-url:http://www.google.com"

the above request would be forwarded to google.com.

Logging is being handled by the proxy server by passing the configutation during server start up as argument

babel-node -- index.js --logfile=/tmp/proxy-server.log

The above command start the server with argument logfile that is being used as path to the log file that application uses to log all the events. The application logs echo and proxy server requests as well as other few basic events.

proxyserver-demo.gif is included for the application walk through






