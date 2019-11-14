var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers= [];
io.on("connection", function(socket){
	console.log("co nguoi ket noi" + socket.id);
	socket.on("disconnect",function(){
 		console.log(socket.id + "ngat ket noi ")
 	});

	socket.on("client-send-Username",function(data){
		if(mangUsers.indexOf(data)>=0){
			socket.emit("server-send-dki-thatbai");
		}
		else{
			mangUsers.push(data);
			socket.Username = data;
			socket.emit("server-send-dki-thanhcong",data);
			io.sockets.emit("server-send-danhsach-Users",mangUsers);
		}
	});
	socket.on("user-send-message",function(data){
		io.sockets.emit("server-send-message", {un:socket.Username, nd:data } );

	});
	
	socket.on("logout",function(){
		mangUsers.splice(
			mangUsers.indexOf(socket.Username), 1
			);
		socket.broadcast.emit("server-send-danhsach-Users",mangUsers);
	});
	socket.on("dang-nhap-chu",function(){
		var s= socket.Username + " dang nhap";
		io.sockets.emit("ai-do-dang-go-chu",s)
	});
	socket.on("dung-nhap-chu",function(){
		console.log(socket.Username +" dung nhap");
		io.sockets.emit("ai-do-stop-go");
	});
});
app.get("/", function(req,res){
	res.render("trangchu");
});