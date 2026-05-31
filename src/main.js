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

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function updateJourney() {
    var scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = clamp(window.scrollY / scrollMax, 0, 1);
    var earthOpacity = clamp(0.28 - progress * 0.45, 0.02, 0.28);
    var marsOpacity = clamp((progress - 0.18) * 0.62, 0, 0.34);
    document.documentElement.style.setProperty("--travel", progress.toFixed(4));
    document.documentElement.style.setProperty("--earth-opacity", earthOpacity.toFixed(4));
    document.documentElement.style.setProperty("--mars-opacity", marsOpacity.toFixed(4));
  }

  document.querySelectorAll("#revenue-calculator input").forEach(function (input) {
    input.addEventListener("input", updateCalculator);
  });

  updateCalculator();
  updateJourney();
  window.addEventListener("scroll", updateJourney, { passive: true });
  window.addEventListener("resize", updateJourney);
})();
