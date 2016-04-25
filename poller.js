var http = require('http');

setInterval(function () {

    console.log("Polling now...");
    var rest_options = {
        host: '192.168.10.100',
        port: 9000,
        path: '/Encoders/1',
        method: 'GET'
    };

    var request = http.request(rest_options, function(response) {
        var content = "";

        // Handle data chunks
        response.on('data', function(chunk) {
            content += chunk;
        });

        // Once we're done streaming the response, parse it as json.
        response.on('end', function() {
            var data = JSON.parse(content);
            console.log(data);
            // Do something with `data`.
            //var fs = require('fs');
            //var stream = fs.createWriteStream("output.txt");
            //    stream.once('open', function(fd) {
            //        stream.write(data);
            //        stream.end();
            //    });
        });
    });

    // Report errors
    request.on('error', function(error) {
        console.log("Error while calling endpoint.", error);
    });

    request.end();
}, 10);
