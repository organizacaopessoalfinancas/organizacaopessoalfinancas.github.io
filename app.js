function save_cookie(arr) {
	var cookie_expiry = new Date(Date.now() + (60*60*24*365 * 1000));
	document.cookie = "data="+btoa(JSON.stringify(arr))+";expires="+cookie_expiry.toUTCString();
}

data = [
	/* renda: */ [],
	/* gastos: */ [],
	/* economias: */ []
];
dti=0;

if (document.cookie == "") {
	save_cookie(data);
	location.reload();
}

data = JSON.parse(atob(document.cookie.split("=")[1]));

function valores(desp, rend, despabs, rendabs) {
	document.getElementById("barrendaperc").style.height = rend + "%";
	document.getElementById("bardespesasperc").style.height = desp + "%";
	document.getElementById("percdespval").innerHTML = "R$ " + despabs;
	document.getElementById("percrendval").innerHTML = "R$ " + rendabs;
}
function debug(val) {
	if (val == "on") {
		document.getElementsByTagName("link")[1].href="debug.css";
	} else {
		document.getElementsByTagName("link")[1].href="";
	}
}
function getLinhaString(idnum, desc, val) {
	if (!desc) { desc = "" }
	if (!val) { val = "" }
	return "<td><input type='text' id='vdescricao"+idnum+"' value='"+desc+"'/></td><td><input type='number' step='any' id='vvalor"+idnum+"' value='"+val+"'/></td><td><input type='button' value='×' onclick='removerLinha("+idnum+")'/></td>";
}
function getLastLineId() {
	return parseInt(document.getElementsByTagName("table")[0].lastChild.id.substr(5) || 1);
}
function adicionarLinha(idnum, desc, val) {
	var tr = document.createElement("tr");
	tr.innerHTML = getLinhaString(idnum, desc, val);
	tr.id = "linha"+idnum;
	document.getElementsByTagName("table")[0].appendChild(tr);
	//document.getElementById("vvalor"+idnum).addEventListener();
}
function novaLinha() {
	var lastId = getLastLineId();
	adicionarLinha(lastId + 1);
}
function removerLinha(idnum) {
	var linha = document.getElementById("linha"+idnum);
	if (linha) {
		linha.parentElement.removeChild(linha);
	}
}
function openModal(title, dataindex) {
	dti=dataindex;
	document.getElementById("modaltitle").innerHTML = title;
	if (data[dataindex].length == 0) {
		adicionarLinha(1);
	} else {
		for (var i = 1; i < data[dataindex].length; i++) {
			adicionarLinha(i, data[dataindex][i][0], data[dataindex][i][1]);
		}
	}
	document.getElementById("modal").style.display="block";
}
function atualizarDados() {
	var totalsum = [0, 0, 0];
	for (var y = 0; y < 3; y++) {
		for (var i = 1; i < data[y].length; i++) {
			totalsum[y]+=parseFloat(data[y][i][1]);
		}
	}
	document.getElementById("valrenda").innerHTML = "R$ " + totalsum[0];
	document.getElementById("valdespesas").innerHTML = "R$ " + totalsum[1];
	document.getElementById("valeconomias").innerHTML = "R$ " + totalsum[2];
	document.getElementById("valsaldo").innerHTML = "R$ " + (totalsum[0] - (totalsum[1] + totalsum[2]));
	if (totalsum[0] >= totalsum[1]) {
		valores(Math.round((totalsum[1]/totalsum[0]) * 100), 100, totalsum[1], totalsum[0]);
	} else {
		valores(100, Math.round((totalsum[0]/totalsum[1]) * 100), totalsum[1], totalsum[0]);
	}
}
function hideModal() {
	atualizarDados();
	document.getElementById("modal").style.display="none";
	for (var i = 1; i <= getLastLineId(); i++) {
		removerLinha(i);
	}
}
function salvar() {
	for (var i = 1; i <= getLastLineId(); i++) {
		if (document.getElementById("linha"+i)) {
			data[dti][i] = [document.getElementById("vdescricao"+i).value, document.getElementById("vvalor"+i).value];
		} else {
			data[dti][i] = null;
		}
	}
	var tmparray = [];
	for (var i = 1, y = 1; i <= data[dti].length; i++) {
		if (data[dti][i] != null) {
			if (i <= getLastLineId()) {
				tmparray[y++] = data[dti][i];
			}
		}
	}
	data[dti] = tmparray;
	save_cookie(data);
	hideModal();
}
