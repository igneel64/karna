var staticServer = require('node-static');
var file = new staticServer.Server("./test/e2e/mock_project_browser/public");

const server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

export {
    server
}

export default () => new Promise((resolve, reject) => {
    server
        .on("listening", () => resolve())
        .listen(8080, () => console.log("Static server for e2e ready on port 8080")); 
});
