const http=require('http');
const fs=require('fs');
const path=require('path');
const hostname="localhost";
const port=3000;

const server=http.createServer((req,res)=>{
	//console.log(req.headers);
	console.log('request'+req.url+'by method'+req.method);
	//res.statusCode=200;
	//res.setHeader('Content-Type','text/html');
	//res.end('<html> <body> <h1>Server connection sucess: </h1></body> </html>');

if (req.method=='GET'){
	var  fileUrl;
	if(req.url==='/'){
		fileUrl="/index.html"
		}
		else{fileUrl=req.url}

	

	var filePath=path.resolve('./public'+fileUrl);

	const fileExt=path.extname(filePath);

			if(fileExt=='.html'){
				fs.exists(filePath,(exists)=>{
					if(!exists){
					res.statusCode=404;
					res.setHeader('Content-Type','text/html');
					res.end('<html> <body> <h1> error 404:'+fileUrl+'does not exists </h1></body> </html>');

					}

					res.statusCode=200;
					res.setHeader('Content-Type','text/html');
					fs.createReadStream(filePath).pipe(res);
	
				})

		}
		else
		{
		res.statusCode=404;
		res.setHeader('Content-Type','text/html');
		res.end('<html> <body> <h1> error 404:'+fileUrl+'not html file</h1></body> </html>');
		}
	}

		else
		{
		res.statusCode=404;
		res.setHeader('Content-Type','text/html');
		res.end('<html> <body> <h1> error 404:'+fileUrl+'not support</h1></body> </html>');

	}





});


server.listen(port,hostname,()=>{
	console.log('server runnin at http://${hostname}:${port}');
});