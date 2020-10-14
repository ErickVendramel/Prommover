console.log("Carreguei o Validation");

errors = [];

// NOME
function validaNome() {
  // CAMPO VAZIO
  if (campoVazio(nome)) {
    adicionaErro(nome, nomeError, errors, "Campo obrigatório", "nome_blank");
    return false;
  } else {
    removeErro(nome, nomeError, errors, "nome_blank");
  }

  // CARACTERE ESTRANHO
  if (regexCampo(nome, /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g)) {
    adicionaErro(nome, nomeError, errors, "Nome inválido", "nome_invalido");
    return false;
  } else {
    removeErro(nome, nomeError, errors, "nome_invalido");
  }

  // NOME E SOBRENOME
  if (
    !regexCampo(
      nome,
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{3,}[ ][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}/
    )
  ) {
    adicionaErro(nome, nomeError, errors, "Nome e sobrenome", "nome_sobrenome");
    return false;
  } else {
    removeErro(nome, nomeError, errors, "nome_sobrenome");
  }
}

function validaEmail() {
  // CAMPO VAZIO
  if (campoVazio(email)) {
    adicionaErro(email, emailError, errors, "Campo obrigatório", "email_blank");
    return false;
  } else {
    removeErro(email, emailError, errors, "email_blank");
  }

  // INVÁLIDO
  if (
    !regexCampo(
      email,
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    )
  ) {
    adicionaErro(
      email,
      emailError,
      errors,
      "E-mail inválido",
      "email_invalido"
    );
    return false;
  } else {
    removeErro(email, emailError, errors, "email_invalido");
  }
}

function validaTelefoneCelular() {
  // VERIFICA SE TEM ALGO ESCRITO
  if (campoVazio(telefonecelular)) {
    adicionaErro(
      telefonecelular,
      telefonecelularError,
      errors,
      "Campo obrigatório",
      "telefonecelular_blank"
    );
    return false;
  } else {
    removeErro(
      telefonecelular,
      telefonecelularError,
      errors,
      "telefonecelular_blank"
    );
  }

  // CELULAR INCOMPLETO
  if (telefonecelular.val().length < 15) {
    adicionaErro(
      telefonecelular,
      telefonecelularError,
      errors,
      "Telefone incompleto",
      "telefonecelular_incompleto"
    );
    return false;
  } else {
    removeErro(
      telefonecelular,
      telefonecelularError,
      errors,
      "telefonecelular_incompleto"
    );
  }

  // CELULAR INVALIDO
  if (!verificaTelefone(telefonecelular.val())) {
    adicionaErro(
      telefonecelular,
      telefonecelularError,
      errors,
      "Telefone invalido",
      "telefonecelular_invalido"
    );
    return false;
  } else {
    removeErro(
      telefonecelular,
      telefonecelularError,
      errors,
      "telefonecelular_invalido"
    );
  }
}
function validaEmpresa() {
  if (campoVazio(empresa)) {
    adicionaErro(
      empresa,
      empresaError,
      errors,
      "Campo obrigatório",
      "empresa_blank"
    );
    return false;
  } else {
    removeErro(empresa, empresaError, errors, "empresa_blank");
  }
}
function validaSegmento() {
  if (campoVazio(segmento)) {
    adicionaErro(
      segmento,
      segmentoError,
      errors,
      "Campo obrigatório",
      "segmento_blank"
    );
    return false;
  } else {
    removeErro(segmento, segmentoError, errors, "segmento_blank");
  }
}
