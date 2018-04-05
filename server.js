var http = require("http");
var url = require("url");

function iniciar(route, handle)
{
	function onRequest(request,response) 
	{
		var dataPosteada = ""
		var pathname = url.parse(request.url).pathname;
		console.log("Peticion para " + pathname + " Recibida.");

		request.setEncoding("utf8");
		
		request.addListener("data", function(trozoPosteado){
			dataPosteada += trozoPosteado;
			console.log("Recibido trozo POST '" + trozoPosteado + "'.");
		});

		request.addListener("end", function(){
			route(pathname, handle, response, dataPosteada);
		});
		
		

		/*response.writeHead(200, {"Content-Type":"text/html"});
		response.write("Hola Mundo");
		response.end()*/
	}

http.createServer(onRequest).listen(8888);

console.log("Servidor iniciado");
}

exports.iniciar = iniciar;