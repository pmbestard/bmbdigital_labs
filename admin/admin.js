(function () {
  var encoder = new TextEncoder();
  var decoder = new TextDecoder();
  var iterations = 210000;
  var vault = null;
  var passphrase = "";

  var loginPanel = document.getElementById("login-panel");
  var workspace = document.getElementById("workspace");
  var fileInput = document.getElementById("vault-file");
  var passInput = document.getElementById("passphrase");
  var statusNode = document.getElementById("login-status");

  var serviceForm = document.getElementById("service-form");
  var serviceList = document.getElementById("service-list");
  var documentForm = document.getElementById("document-form");
  var documentList = document.getElementById("document-list");

  function bytesToBase64(bytes) {
    var binary = "";
    bytes.forEach(function (byte) {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  function base64ToBytes(value) {
    var binary = atob(value);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function randomBytes(length) {
    var bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  function deriveKey(secret, salt) {
    return crypto.subtle.importKey("raw", encoder.encode(secret), "PBKDF2", false, ["deriveKey"])
      .then(function (baseKey) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: salt, iterations: iterations, hash: "SHA-256" },
          baseKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt", "decrypt"]
        );
      });
  }

  function encryptVault(data, secret) {
    var salt = randomBytes(16);
    var iv = randomBytes(12);
    return deriveKey(secret, salt).then(function (key) {
      return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encoder.encode(JSON.stringify(data)));
    }).then(function (encrypted) {
      return JSON.stringify({
        format: "BMBVAULT",
        version: 1,
        kdf: "PBKDF2-SHA256",
        iterations: iterations,
        cipher: "AES-GCM",
        salt: bytesToBase64(salt),
        iv: bytesToBase64(iv),
        data: bytesToBase64(new Uint8Array(encrypted)),
      }, null, 2);
    });
  }

  function decryptVault(text, secret) {
    var payload = JSON.parse(text);
    if (!payload || payload.format !== "BMBVAULT") {
      throw new Error("Formato de bóveda no reconocido.");
    }
    var salt = base64ToBytes(payload.salt);
    var iv = base64ToBytes(payload.iv);
    var encrypted = base64ToBytes(payload.data);
    return deriveKey(secret, salt).then(function (key) {
      return crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
    }).then(function (plain) {
      return JSON.parse(decoder.decode(plain));
    });
  }

  function emptyVault() {
    var now = new Date().toISOString();
    return {
      version: 1,
      createdAt: now,
      updatedAt: now,
      services: [
        {
          name: "Web profesional con criterio de marca",
          status: "Listo para presentar",
          description: "Presencia digital seria para negocios que necesitan dominio, estructura, textos, diseño y publicación cuidada.",
        },
        {
          name: "Sistema documental corporativo",
          status: "Validación",
          description: "Membrete, cartas, presupuestos, notas legales y trazabilidad de versiones para trabajar con orden.",
        },
      ],
      documents: [],
    };
  }

  function setStatus(message, isError) {
    statusNode.textContent = message || "";
    statusNode.style.color = isError ? "#ffb08a" : "#f7f7f4";
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  function touchVault() {
    vault.updatedAt = new Date().toISOString();
  }

  function render() {
    document.getElementById("vault-updated").textContent = formatDate(vault.updatedAt);
    document.getElementById("vault-count").textContent = String(vault.services.length + vault.documents.length);
    renderList(serviceList, vault.services, "services");
    renderList(documentList, vault.documents, "documents");
  }

  function renderList(container, rows, key) {
    container.innerHTML = "";
    rows.forEach(function (row, index) {
      var article = document.createElement("article");
      var status = document.createElement("span");
      var title = document.createElement("h4");
      var description = document.createElement("p");
      var remove = document.createElement("button");

      status.textContent = row.status || row.type || "Registro";
      title.textContent = row.name || row.title;
      description.textContent = row.description || row.body;
      remove.type = "button";
      remove.textContent = "Archivar";
      remove.addEventListener("click", function () {
        vault[key].splice(index, 1);
        touchVault();
        render();
      });

      article.append(status, title, description, remove);
      container.appendChild(article);
    });
  }

  function enterWorkspace(data, secret) {
    vault = data;
    passphrase = secret;
    loginPanel.hidden = true;
    workspace.hidden = false;
    render();
  }

  function download(filename, content) {
    var blob = new Blob([content], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function vaultFilename() {
    var stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return "bmb-office-" + stamp + ".bmbvault";
  }

  function openBackupEmail(filename) {
    var target = document.getElementById("backup-email").value.trim();
    if (!target) {
      alert("Introduce primero el correo de respaldo.");
      return;
    }
    var subject = encodeURIComponent("Respaldo cifrado BMB Digital Labs - " + filename);
    var body = encodeURIComponent(
      "Adjuntar manualmente el archivo " + filename + " generado por la oficina privada BMB.\n\n" +
      "Importante:\n" +
      "- No incluir documentos en claro.\n" +
      "- No escribir la frase de paso en este correo.\n" +
      "- Guardar también una copia offline en USB.\n"
    );
    window.location.href = "mailto:" + encodeURIComponent(target) + "?subject=" + subject + "&body=" + body;
  }

  document.getElementById("open-vault").addEventListener("click", function () {
    var file = fileInput.files[0];
    var secret = passInput.value;
    if (!file) {
      setStatus("Selecciona tu archivo .bmbvault del USB.", true);
      return;
    }
    if (secret.length < 12) {
      setStatus("Usa una frase de paso larga, mínimo 12 caracteres.", true);
      return;
    }
    file.text().then(function (text) {
      return decryptVault(text, secret);
    }).then(function (data) {
      enterWorkspace(data, secret);
    }).catch(function () {
      setStatus("No se pudo abrir la bóveda. Revisa archivo y frase de paso.", true);
    });
  });

  document.getElementById("new-vault").addEventListener("click", function () {
    var secret = passInput.value;
    if (secret.length < 12) {
      setStatus("Define una frase de paso larga antes de crear la bóveda.", true);
      return;
    }
    enterWorkspace(emptyVault(), secret);
  });

  document.getElementById("export-vault").addEventListener("click", function () {
    touchVault();
    encryptVault(vault, passphrase).then(function (content) {
      download(vaultFilename(), content);
      render();
    });
  });

  document.getElementById("mail-backup").addEventListener("click", function () {
    var filename = vaultFilename();
    touchVault();
    encryptVault(vault, passphrase).then(function (content) {
      download(filename, content);
      render();
      openBackupEmail(filename);
    });
  });

  document.getElementById("lock-vault").addEventListener("click", function () {
    vault = null;
    passphrase = "";
    passInput.value = "";
    fileInput.value = "";
    workspace.hidden = true;
    loginPanel.hidden = false;
    setStatus("Bóveda bloqueada. Recuerda guardar el archivo actualizado.", false);
  });

  serviceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    vault.services.unshift({
      name: document.getElementById("service-name").value.trim(),
      status: document.getElementById("service-status").value,
      description: document.getElementById("service-description").value.trim(),
    });
    touchVault();
    serviceForm.reset();
    render();
  });

  documentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    vault.documents.unshift({
      title: document.getElementById("document-title").value.trim(),
      type: document.getElementById("document-type").value,
      body: document.getElementById("document-body").value.trim(),
      createdAt: new Date().toISOString(),
    });
    touchVault();
    documentForm.reset();
    render();
  });
})();
