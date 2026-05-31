(function () {
  var formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  function readNumber(id) {
    var input = document.getElementById(id);
    var value = Number(input && input.value ? input.value : 0);
    return Number.isFinite(value) ? value : 0;
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = formatter.format(value);
  }

  function updateCalculator() {
    var users = readNumber("users");
    var price = readNumber("price");
    var vatRate = readNumber("vat") / 100;
    var feeRate = readNumber("fee") / 100;
    var base = users * price;
    var vat = base * vatRate;
    var fee = (base + vat) * feeRate;
    var net = base - fee;

    setText("base-revenue", base);
    setText("vat-output", vat);
    setText("fee-output", fee);
    setText("net-output", net);
  }

  document.querySelectorAll("#revenue-calculator input").forEach(function (input) {
    input.addEventListener("input", updateCalculator);
  });

  updateCalculator();
})();
