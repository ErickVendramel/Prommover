console.log("Carreguei o Main");

recebeAffId();

const nome = $("#name");
const email = $("#email");
const telefonecelular = $("#phone");
const empresa = $("#empresa");
const btnEnviar = $("#send");

const aff_id = localStorage.getItem("aff_id");
const gclid = localStorage.getItem("gclid");
const fbclid = localStorage.getItem("fbclid");
const origem = localStorage.getItem("origem");

const nomeError = $("#error-name");
const emailError = $("#error-email");
const telefonecelularError = $("#error-phone");
const empresaError = $("#error-empresa");

// Máscaras
telefonecelular.mask("(00) 00000-0000");

// BLURS
nome.blur(function () {
  validaNome();
});
email.blur(function () {
  validaEmail();
});
telefonecelular.blur(function () {
  validaTelefoneCelular();
});
empresa.blur(function () {
  validaEmpresa();
});

// ENVIAR BTN
btnEnviar.click(function () {
  validaNome();
  validaEmail();
  validaTelefoneCelular();
  validaEmpresa();

  if (errors.length === 0) {
    $.post(
      "./leads/newLead.php",
      {
        name: nome.val(),
        email: email.val(),
        phone: telefonecelular.val(),
        empresa: empresa.val(),
        url: window.location.href,
      },
      function (data) {
        if (data === "SUCESSO") {
          console.log("Sucesso:", data);
          localStorage.setItem("email", email.val());
          window.location.href = "sucesso.html";
        } else {
          console.log("Erro:", data);
          window.location.href = "error.html";
        }
      }
    );
  }
});
