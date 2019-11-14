var socket=io("http://localhost:3000");

socket.on("server-send-dki-thatbai",function(){
	alert("sai username  da co nguoi dki");
});
socket.on("server-send-dki-thanhcong",function(data){
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
});
socket.on("server-send-message", function(data){
	$("#ListMessages").append("<div class='ms'>" + data.un + ":"  +  data.nd + "</div>");
}); 
socket.on("server-send-danhsach-Users",function(data){
	$("#boxContent").html("");
	data.forEach(function(i){
		$("#boxContent").append("<div class='user' >" + i + "</div>");
	});
});
	socket.on("ai-do-dang-go-chu",function(data){
		$("#thongbao").html(data);
	});
	socket.on("ai-do-stop-go",function(){
		$("#thongbao").html(" ");
	});
$(document).ready(function(){
$("#loginForm").show();
$("#chatForm").hide();
$("#btnSendMessage").click(function(){
	socket.emit("user-send-message",$("#txtMessage").val());
});
$("#btnRegister").click(function(){
	socket.emit("client-send-Username",$("#txtUsername").val());
});
$("#txtMessage").focusin(function(){
	socket.emit("dang-nhap-chu");
});

$("#txtMessage").focusout(function(){
	socket.emit("dung-nhap-chu");
});
	$("#btnLogout").click(function(){
socket.emit("logout");
	$("#loginForm").show(2000);
	$("#chatForm").hide(1000);
	});

	
	});