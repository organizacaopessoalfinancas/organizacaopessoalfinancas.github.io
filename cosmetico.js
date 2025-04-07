document.getElementById("hidecontentwithoutjs").style.display="block";

for (var i = 0; i < document.getElementsByClassName("amountbar").length; i++ ) {
	document.getElementsByClassName("amountbar")[i].firstChild.addEventListener("mousemove", function (e) {
		this.firstChild.style.left = (e.clientX - this.getBoundingClientRect().left) + "px";
		this.firstChild.style.top = (e.clientY - this.getBoundingClientRect().top) + "px";
	});
	document.getElementsByClassName("amountbar")[i].firstChild.addEventListener("click", function (e) {
		var obj = this.firstChild;
		obj.style.display = "inline-block";
		setTimeout(function (){
			obj.style.display = "none";
		}, 800);
	});
}

atualizarDados();
