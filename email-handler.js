// Email.js configuration mirrored from twiddl approach.
const emailjsConfig = {
  publicKey: "N1FpZBJr30Yt8HVFl",
  serviceId: "service_s4demlz",
  templateId: "template_xay64zb",
};

(function () {
  emailjs.init(emailjsConfig.publicKey);
})();

const langConfig = {
  en: {
    subject: "New website inquiry",
    messagePrefix: "Please contact me back at: ",
    sending: "Sending...",
    sent: "Submitted!",
    retry: "Try Again",
    success: "Thank you! We will contact you soon.",
    error: "Something went wrong. Please try again.",
  },
  ru: {
    subject: "Новая заявка с сайта",
    messagePrefix: "Пожалуйста, свяжитесь со мной: ",
    sending: "Отправка...",
    sent: "Отправлено!",
    retry: "Повторить",
    success: "Спасибо! Мы скоро с вами свяжемся.",
    error: "Что-то пошло не так. Попробуйте еще раз.",
  },
  he: {
    subject: "פנייה חדשה מהאתר",
    messagePrefix: "נא לחזור אליי לכתובת: ",
    sending: "שולח...",
    sent: "נשלח!",
    retry: "נסו שוב",
    success: "תודה! נחזור אליכם בקרוב.",
    error: "משהו השתבש. נסו שוב.",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".lead-form");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = form.querySelector('input[name="replyEmail"]');
      const submitButton = form.querySelector('button[type="submit"]');
      const lang = form.dataset.lang || "en";
      const cfg = langConfig[lang] || langConfig.en;
      const originalText = submitButton.textContent;

      if (!emailInput || !emailInput.value.trim()) return;

      const existingMessages = form.parentNode.querySelectorAll(".success-message, .error-message");
      existingMessages.forEach((msg) => msg.remove());

      submitButton.disabled = true;
      submitButton.textContent = cfg.sending;

      const templateParams = {
        to_email: "contact@67rd.com",
        from_email: emailInput.value.trim(),
        subject: cfg.subject,
        message: cfg.messagePrefix + emailInput.value.trim(),
      };

      emailjs
        .send(emailjsConfig.serviceId, emailjsConfig.templateId, templateParams)
        .then(function () {
          emailInput.value = "";
          submitButton.textContent = cfg.sent;

          const successMsg = document.createElement("div");
          successMsg.className = "success-message";
          successMsg.textContent = cfg.success;
          form.parentNode.insertBefore(successMsg, form.nextSibling);

          setTimeout(function () {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 2500);
        })
        .catch(function () {
          submitButton.textContent = cfg.retry;
          submitButton.disabled = false;

          const errorMsg = document.createElement("div");
          errorMsg.className = "error-message";
          errorMsg.textContent = cfg.error;
          form.parentNode.insertBefore(errorMsg, form.nextSibling);
        });
    });
  });
});
