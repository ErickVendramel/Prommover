console.log("Carreguei o Main");

recebeAffId();

const nome = $("#name");
const email = $("#email");
const telefonecelular = $("#phone");
const empresa = $("#empresa");
const segmento = $("#segment");
const btnEnviar = $("#send");

const aff_id = localStorage.getItem("aff_id");
const gclid = localStorage.getItem("gclid");
const fbclid = localStorage.getItem("fbclid");
const origem = localStorage.getItem("origem");

const nomeError = $("#error-name");
const emailError = $("#error-email");
const telefonecelularError = $("#error-phone");
const empresaError = $("#error-empresa");
const segmentoError = $("#error-segment");

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
segmento.on('change', function () {
  validaSegmento();
});

// ENVIAR BTN
btnEnviar.click(function () {
  validaNome();
  validaEmail();
  validaTelefoneCelular();
  validaEmpresa();
  validaSegmento();

  if (errors.length === 0) {
    btnEnviar.attr("disabled", "true");

    $.ajax({
      type: "POST",
      // url: "http://localhost:3333/lead",
      url: "https://api.meudireitolegal.com.br/lead",
      // url: "https://jsonplaceholder.typicode.com/posts/",
      data: JSON.stringify({
        name: nome.val(),
        email: email.val(),
        mobile: telefonecelular.val().replace(/[ -\(\)-]/g, ""),
        prommoverLead: {
          company: empresa.val(),
          segment: segmento.val(),
        },
        url: window.location.href,
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        if (data.id) {
          localStorage.setItem("isEmailDuplicated", data.isEmailDuplicated);
          localStorage.setItem("name", nome.val());
          localStorage.setItem("email", email.val());
          localStorage.setItem(
            "mobile",
            telefonecelular.val().replace(/[ -\(\)-]/g, "")
          );
          localStorage.setItem("url", window.location.href);
          localStorage.setItem("id", data.id);

          let url = new URL(window.location.href);
          localStorage.setItem("mktCode", url.searchParams.get("MktCode"));
          localStorage.setItem("pass", url.searchParams.get("Pass"));
          localStorage.setItem("tid", url.searchParams.get("tid"));
          localStorage.setItem(
            "utm_source",
            url.searchParams.get("utm_source")
          );

          window.location.href = "sucesso.html";

        } else {
          window.location.href = "error.html";
        }
      },
      failure: function (err) {
        window.location.href = "error.html";
      },
    });
  }
});
