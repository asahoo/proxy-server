let http = require('http')
let request = require('request')
let fs = require('fs')
let argv = require('yargs')
	.default('host', '127.0.0.1')
	.argv
let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ? 8000 : 80
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logStream = argv.logfile ? fs.createWriteStream(argv.logfile) : process.stdout

http.createServer((req, res) => {
	logStream.write('\nEcho server request headers: \n' + JSON.stringify(req.headers))
	for (let header in req.headers) {
		res.setHeader(header, req.headers[header])
	}
	req.pipe(logStream)
	req.pipe(res)
 }).listen(8000)

logStream.write('Listening at '+ destinationUrl)

http.createServer((req, res) => {
	let url = destinationUrl
	if (req.headers['x-destination-url']) {
		url = req.headers['x-destination-url']
	}
	let options = {
		headers: req.headers,
		url: url + req.url
	}
	logStream.write('\n proxy server request headers: \n' + JSON.stringify(req.headers))
	let destinationResponse = req.pipe(request(options))
	logStream.write('\n proxy server response header: \n' + JSON.stringify(destinationResponse.headers))
	destinationResponse.pipe(res)
}).listen(8001)