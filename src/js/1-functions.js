console.log('Carreguei o Functions');

function animaPlaceholder(campo, placeholder) {
    
  if (!campoVazio(campo)) {
      placeholder.addClass('placeholder-ativo');        
  }
  
  campo.focus(function(){
      placeholder.addClass('placeholder-ativo');
  })
  
  campo.blur(function() {
      if (campo.val() === "") {
          placeholder.removeClass('placeholder-ativo');
      }
  })
}

function animaPlaceholderSelect(campo, placeholder) {
  
  campo.focus(function(){
      placeholder.addClass('placeholder-select-ativo');
  })
  
  campo.blur(function() {
      if (campo.val() === "") {
          placeholder.removeClass('placeholder-select-ativo');
      }
  })
}

var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
  }
};

function campoVazio(campo) {
  if (campo.val() === "" && campo.val().length === 0 || campo.val() == null)  {
      return true;
      
  } else {
      return false;
      
  } 
}

function adicionaErro(campo, campoError, array, mensagem, stringError) {
  campo.addClass('error-campo');
  
  campoError.addClass('error-ativo');
  campoError.text(mensagem);
  
  array.push(stringError);
  
}

function removeErro(campo, campoError, array, stringError) {
  campo.removeClass('error-campo');
  campoError.removeClass('error-ativo');
  campoError.text('');
  
  index = array.indexOf(stringError);
  
  while (index != -1) {
      array.splice(index, 1);
      
      index = array.indexOf(stringError);
  };
  
}

function regexCampo(valor, regex){
  if (valor.val().match(regex)) {
      return true;
  } else {
      return false;
  }
}

function verificaTelefone(telefone) {
  //retira todos os caracteres menos os numeros
  telefone = telefone.replace(/\D/g, '');
  
  //verifica se tem a qtde de numero correto
  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;
  
  //Se tiver 11 caracteres, verificar se comeÃ§a com 9 o celular
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;
  
  //verifica se nÃ£o Ã© nenhum numero digitado errado (propositalmente)
  for (var n = 0; n < 10; n++) {
      //um for de 0 a 9.
      //estou utilizando o metodo Array(q+1).join(n) onde "q" Ã© a quantidade e n Ã© o
      //caractere a ser        repetido
      if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
  }
  //DDDs validos
  var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
      21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73,
      74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99];
      //verifica se o DDD Ã© valido (sim, da pra verificar rsrsrs)
      if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;
      
      //  E por ultimo verificar se o numero Ã© realmente vÃ¡lido. AtÃ© 2016 um celular pode
      //ter 8 caracteres, apÃ³s isso somente numeros de telefone e radios (ex. Nextel)
      //vÃ£o poder ter numeros de 8 digitos (fora o DDD), entÃ£o esta funÃ§Ã£o ficarÃ¡ inativa
      //atÃ© o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serÃ£o
      //validados corretamente apÃ³s esse perÃ­odo.
      //NÃƒO ADICIONEI A VALIDAÃ‡Ã‚O DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃƒO FARÃ DIFERENÃ‡A
      //NÃ£o se preocupe, o cÃ³digo irÃ¡ ativar e desativar esta opÃ§Ã£o automaticamente.
      //Caso queira, em 2017, Ã© sÃ³ tirar o if.
      if (new Date().getFullYear() < 2017) return true;
      if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;
      
      //se passar por todas as validaÃ§Ãµes acima, entÃ£o estÃ¡ tudo certo
      return true;
}

function recebeAffId() {
  const url_string = window.location.href;
  const url = new URL(url_string);
  
  const gclid = url.searchParams.get("gclid") || ""; // Google Ads
  const fbclid = url.searchParams.get("fbclid") || ""; // Google Ads
  const aff_id = url.searchParams.get("aff_id") || ""; // HasOffers aff_id
      
  localStorage.setItem("gclid",gclid);
  localStorage.setItem("fbclid",fbclid);
  localStorage.setItem("aff_id",aff_id);
      
  if (fbclid == "" && gclid == "" && aff_id == "") { 
      console.log("DIRETO"); 
      localStorage.setItem("origem","DIRETO");

  } else if (fbclid != "" && aff_id == "" && gclid == "") { 
      console.log("FACEBOOK"); 
      localStorage.setItem("origem","FACEBOOK");
  
  } else if (fbclid == "" && gclid == "" && aff_id != "") { 
      console.log("AFILIACAO"); 
      localStorage.setItem("origem","AFILIACAO");
      
  } else { 
      console.log("GOOGLE"); 
      localStorage.setItem("origem","GOOGLE");
  }
      
      
}

function verificaCNPJ(cnpj) {

  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj == '') return false;

  if (cnpj.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;

  return true;

}

function testaCPF(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
if (strCPF == "00000000000") return false;
if (strCPF == "11111111111") return false;
if (strCPF == "22222222222") return false;
if (strCPF == "33333333333") return false;
if (strCPF == "44444444444") return false;
if (strCPF == "55555555555") return false;
if (strCPF == "66666666666") return false;
if (strCPF == "77777777777") return false;
if (strCPF == "88888888888") return false;
if (strCPF == "99999999999") return false;
   
for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
Resto = (Soma * 10) % 11;
 
  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
 
Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;
 
  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
  
}