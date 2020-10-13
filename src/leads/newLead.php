<?php

require_once "config.php";

$errors = [];

$nome = trim($_POST['name']);
$email = strtolower(trim($_POST['email']));
$mensagem = trim($_POST['message']);

$url = $_POST['url'];

$telefoneraw = trim($_POST['phone']);
$telefone = substr(str_replace(array("(",")","-"," "), "", $telefoneraw), 2);
$telefoneddd = str_replace(array("(",")","-"," "), "", $telefoneraw);
$ddd = substr($telefoneddd, 0, 2);

# VALIDAÇÕES NOME

// Verifica se o nome foi enviado
if($nome == '') {
    array_push($errors, 'NOME_BLANK');
}

// Verifica se o nome é válido
if(preg_match_all('/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/', $nome)) {
    array_push($errors, 'NOME_INVALIDO');
}

// Verifica se o nome foi preenchido nome e sobrenome
if(!preg_match_all('/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{3,}[ ][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}/', $nome)) {
    array_push($errors, 'NOME_INCOMPLETO');
}

# VALIDAÇÕES EMAIL

// Verifica se o email foi enviado
if($email == '') {
    array_push($errors, 'EMAIL_BLANK');
}

// Verifica se o e-mail é válido
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    array_push($errors, 'EMAIL_INVALIDO');
}

# VALIDAÇÕES TELEFONE

// Verifica se o telefone foi enviado
if($telefone == '') {
    array_push($errors, 'TELEFONE_BLANK');
}

# DEVOLVE RESPOSTA

if($errors == []) {

  if(mysqli_query($link, "INSERT INTO `leads` (`name`, `email`, `ddd`, `phone`, `message`, `timestamp`, `url`) VALUES ('{$nome}', '{$email}', '{$ddd}', '{$telefone}', '{$mensagem}', CURRENT_TIMESTAMP, '{$url}')")) {

    echo "SUCESSO";

  } else {
    echo "ERROR";
  }
    
} else {
    echo json_encode($errors);
}

mysqli_close($link);
