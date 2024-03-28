// TASK #2: Import the required modules
// TASK #3: Write a request handler
// TASK #4: Create the web server
// Add your implementation below.
import http from 'http';
import url from 'url';


let count = 0
function requestHandler(req, res) {
    
    let pathname = url.parse(req.url).pathname;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (pathname === "/inc") {
        
        count++
        
        res.end(`<strong>Count: ${count}</strong>`)
    }
    else {
        res.end('Server is running')
        
    }
}
const server = http.createServer(requestHandler);
server.listen(3000, () => {
    console.log(`Server started on port 3000`);
  });