﻿
$(document).ready(function () {
  $("input[data-mask='cpf']").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });

  $('#formCadastro').submit(function (e) {
    e.preventDefault();

    var cpfValue = $("#CPF").val();
    cpfValue = cpfValue.replace('.', '').replace('-', '').replace('.', '');

    // se CPF igual a valido Envia requisição caso contrario exibe mensagem CPF in
    if (validaCPF(cpfValue)) {
      $.ajax({
        url: urlPost,
        method: "POST",
        data: {
          "NOME": $(this).find("#Nome").val(),
          "CEP": $(this).find("#CEP").val(),
          "Email": $(this).find("#Email").val(),
          "Sobrenome": $(this).find("#Sobrenome").val(),
          "Nacionalidade": $(this).find("#Nacionalidade").val(),
          "Estado": $(this).find("#Estado").val(),
          "Cidade": $(this).find("#Cidade").val(),
          "Logradouro": $(this).find("#Logradouro").val(),
          "Telefone": $(this).find("#Telefone").val(),
          "CPF": $(this).find("#CPF").val()
        },
        error:
          function (r) {
            if (r.status == 400)
              ModalDialog("Ocorreu um erro", r.responseJSON);
            else if (r.status == 500)
              ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
          },
        success:
          function (r) {
            if (r == "Digite um CPF válido.") {
              ModalDialog("Erro", r);
            }
            else {
              ModalDialog("Sucesso!", r);
              $("#formCadastro")[0].reset();
            }
            
          }
      });
    }
    else {
      ModalDialog("Ocorreu um erro", "Digite um CPF válido.");
    }

  })

})

function validaCPF(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

function ModalDialog(titulo, texto) {
  var random = Math.random().toString().replace('.', '');
  var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
    '        <div class="modal-dialog">                                                                                 ' +
    '            <div class="modal-content">                                                                            ' +
    '                <div class="modal-header">                                                                         ' +
    '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
    '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
    '                </div>                                                                                             ' +
    '                <div class="modal-body">                                                                           ' +
    '                    <p>' + texto + '</p>                                                                           ' +
    '                </div>                                                                                             ' +
    '                <div class="modal-footer">                                                                         ' +
    '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
    '                                                                                                                   ' +
    '                </div>                                                                                             ' +
    '            </div><!-- /.modal-content -->                                                                         ' +
    '  </div><!-- /.modal-dialog -->                                                                                    ' +
    '</div> <!-- /.modal -->                                                                                        ';

  $('body').append(texto);
  $('#' + random).modal('show');
}
