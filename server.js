var http=require('http'),
 qs = require('querystring');
var fs = require('fs')

//logger.write('some data') // append string to your file
var server=http.createServer((function(request,response) {
    var logger = fs.createWriteStream('log.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })

    //logger.write('more data') // again
    console.log(request)
    if (request.method === "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./public/form.html", "UTF-8").pipe(response);
        console.log(request)
    }
    else if (request.method === 'POST' /*&& req.url === '/login'*/) {
        // Open member.json
        let rawdata = fs.readFileSync('members.json');
        let members_file = JSON.parse(rawdata);
        console.log(members_file);

        var body = '';
        request.on('data', function(chunk) {
            body += chunk;
        });
        
        request.on('end', function() {
            var data = qs.parse(body);
            // now you can access `data.id`
            console.log(data.id);

            var found = false;
            members_file.members.forEach( function(member) 
            { 
                //console.log(member) 
                if(member.id == data.id) {
                    console.log(`Velkommen ${member.firstName}`);
                    //logger.write(`Velkommen ${member.firstName} \r\n`);
                    found = true;
                    response.writeHead(200);
                    response.end(JSON.stringify(member));
                }

            })
            if(!found) {
                response.writeHead(200);
                response.end("Member not found");
            }
        });
    } 
    /*else {
        res.writeHead(404);
        res.end()
    }*/
}));
server.listen(7000);


//logger.end() // close string