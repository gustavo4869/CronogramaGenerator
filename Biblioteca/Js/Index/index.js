$(document).ready(function () {	
	$("#btnAdicionar").click(function(){
		if(validaFormulario()){
			var etapa = $("#inputEtapa");
			var duracao = $("#inputDuracao");
			var atividade = $("#inputAtividade");
			var descricaoAtividade = $("#inputDescricaoAtividade");
			
			var maxDuracao = $("#maxDuracao");		
			var valorMaxDuracao = parseInt(maxDuracao.val());		

			var html = "	<tr> \
								<td id='tdEtapa"+etapa.val()+"' class='tdEtapa' onclick='tdClick();' contenteditable='true'>"+etapa.val()+"</td> \
								<td id='tdAtividade"+etapa.val()+"' onclick='tdClick();' contenteditable='true'>"+atividade.val()+"</td>";
			
			var cont = 0;
			while(cont < valorMaxDuracao){
				if(duracao.val() == '0' && cont == (valorMaxDuracao - 1)){
					html = html + "<td>X</td>";
				} else {
					html = html + "<td></td>";
				}			
				cont = cont + 1;
			}
			
			maxDuracao.val(parseInt(maxDuracao.val())+parseInt(duracao.val()));
			valorMaxDuracao = parseInt(maxDuracao.val());		

			cont = 1;		
			while(cont <= duracao.val()){			
				$("#rowHeadTabela").append("<th>"+((valorMaxDuracao-duracao.val())+cont)+"º dia</th>")
				html = html + "<td>X</td>";
				cont = cont + 1;
			}
			
			html = html + "</tr>"
			$("#bodyTabela").append(html);		

			html = "<tr> \
						<td id='tdDescricaoEtapa"+etapa.val()+"' contenteditable='true'>"+etapa.val()+"</td> \
						<td id='tdDescricaoAtividade"+etapa.val()+"' contenteditable='true'>"+descricaoAtividade.val()+"</td> \
					</tr>";
			$("#bodyDescricaoTabela").append(html);

			$("#cabecalhoTitulo").attr('colspan', $("#bodyTabela tr:last td").length)
			$("#cabecalhoTitulo").text($("#inputNomePlanilha").val())

			$("#cabecalhoDiasUteis").attr('colspan', valorMaxDuracao);
			$("#cabecalhoDiasUteis").text('Dias úteis');

			etapa.val(parseInt(getUltimaEtapa()) + 1);
			duracao.val(0);
			atividade.val('');
			descricaoAtividade.val('');
		} else{
			alert('Verifique o formulário')
		}
	})	

	$("#btnExportar").click(function(){
		/* create new workbook */
		var workbook = XLSX.utils.book_new();

		/* convert table 'table1' to worksheet named "Sheet1" */
		var sheet1 = XLSX.utils.table_to_sheet(document.getElementById('sheetjs'));
		XLSX.utils.book_append_sheet(workbook, sheet1, "Cronograma " + moment().format("DD-MM-YYYY"));			
		
		var nomePlanilha = 'Cronograma - ' + $("#inputNomePlanilha").val() + '.xlsx';
		
		XLSX.writeFile(workbook, nomePlanilha);
	})
})

function tdClick(){
	console.log('ola')
}

function validaFormulario(){
	var etapa = $("#inputEtapa");
	var duracao = $("#inputDuracao");
	var nomePlanilha = $("#inputNomePlanilha");
	
	if(nomePlanilha.val() == "")

	if(etapa.val() == '' || etapa.val() === undefined || parseInt(etapa.val()) <= 0){
		etapa.focus();
		return false;
	}

	if(duracao.val() == '' || duracao.val() === undefined){
		duracao.focus();
		return false;
	}		

	if((getUltimaEtapa() == 0 || getUltimaEtapa() === undefined) && duracao.val() == '0'){
		return false;
	}

	return true;
}

function getUltimaEtapa(){
	var ultimaEtapa;
	var ultimaEtapaAux;
	$(".tdEtapa").each(function(index){
		ultimaEtapa = $(this).text();
		
		if(index == 0){			
			ultimaEtapaAux = ultimaEtapa;
		}
		
		if(ultimaEtapa < ultimaEtapaAux)
			ultimaEtapa = ultimaEtapaAux

		ultimaEtapaAux = ultimaEtapa;
	})

	return ultimaEtapa;
}