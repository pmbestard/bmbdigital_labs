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
    var surfaceOpacity = clamp(0.48 - Math.abs(progress - 0.34) * 0.28, 0.22, 0.48);
    var surfaceY = -160 + progress * 420;
    var surfaceScale = 1.14 - progress * 0.12;
    var marsOpacity = clamp((progress - 0.18) * 0.62, 0, 0.34);
    document.documentElement.style.setProperty("--travel", progress.toFixed(4));
    document.documentElement.style.setProperty("--earth-opacity", earthOpacity.toFixed(4));
    document.documentElement.style.setProperty("--surface-opacity", surfaceOpacity.toFixed(4));
    document.documentElement.style.setProperty("--surface-y", surfaceY.toFixed(1) + "px");
    document.documentElement.style.setProperty("--surface-scale", surfaceScale.toFixed(4));
    document.documentElement.style.setProperty("--mars-opacity", marsOpacity.toFixed(4));
  }

  function initMagneticNetwork() {
    var canvas = document.querySelector(".network-canvas");
    if (!canvas) return function () {};
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = canvas.getContext("2d");
    if (!ctx) return function () {};

    var width = 0;
    var height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = [];
    var edges = [];
    var rotX = -0.3;
    var rotY = 0;
    var autoRotY = reduceMotion ? 0.0004 : 0.0018;
    var autoRotX = reduceMotion ? 0.0001 : 0.00055;
    var mouse = { x: -9999, y: -9999, active: false, nx: 0, ny: 0 };
    var raf = 0;
    var proj = [];

    function fibonacciSphere(count) {
      var pts = [];
      var phi = Math.PI * (Math.sqrt(5) - 1);
      for (var i = 0; i < count; i += 1) {
        var y = 1 - (i / Math.max(1, count - 1)) * 2;
        var r = Math.sqrt(Math.max(0, 1 - y * y));
        var theta = phi * i;
        pts.push({ x: Math.cos(theta) * r, y: y, z: Math.sin(theta) * r });
      }
      return pts;
    }

    function build() {
      var rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var density = Math.min(150, Math.max(70, Math.floor((width * height) / 10500)));
      var pts = fibonacciSphere(density);
      nodes = pts.map(function (p) {
        return {
          bx: p.x,
          by: p.y,
          bz: p.z,
          dx: 0,
          dy: 0,
          dz: 0,
          vx: 0,
          vy: 0,
          vz: 0,
        };
      });

      edges = [];
      var seen = new Set();
      for (var i = 0; i < nodes.length; i += 1) {
        var a = nodes[i];
        var dists = [];
        for (var j = 0; j < nodes.length; j += 1) {
          if (j === i) continue;
          var b = nodes[j];
          var dx = a.bx - b.bx;
          var dy = a.by - b.by;
          var dz = a.bz - b.bz;
          dists.push({ j: j, d: dx * dx + dy * dy + dz * dz });
        }
        dists.sort(function (p, q) {
          return p.d - q.d;
        });
        for (var k = 0; k < 3; k += 1) {
          var next = dists[k].j;
          var key = i < next ? i + "-" + next : next + "-" + i;
          if (seen.has(key)) continue;
          seen.add(key);
          edges.push([i, next]);
        }
      }
    }

    function updateMouse(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.nx = (mouse.x / Math.max(1, width)) * 2 - 1;
      mouse.ny = (mouse.y / Math.max(1, height)) * 2 - 1;
      mouse.active = true;
    }

    function onMove(event) {
      updateMouse(event.clientX, event.clientY);
    }

    function onTouch(event) {
      var touch = event.touches[0];
      if (touch) updateMouse(touch.clientX, touch.clientY);
    }

    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.nx = 0;
      mouse.ny = 0;
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      var targetRotY = autoRotY + (mouse.active ? mouse.nx * 0.008 : 0);
      var targetRotX = autoRotX + (mouse.active ? -mouse.ny * 0.006 : 0);
      rotY += targetRotY;
      rotX += targetRotX;
      var cosY = Math.cos(rotY);
      var sinY = Math.sin(rotY);
      var cosX = Math.cos(rotX);
      var sinX = Math.sin(rotX);

      var cx = width * 0.72;
      var cy = height * 0.42;
      var sphereR = Math.min(width, height) * 0.28;
      var camZ = 3;
      var focal = 2.2;

      proj.length = 0;
      for (var i = 0; i < nodes.length; i += 1) {
        var n = nodes[i];
        var wx = n.bx + n.dx;
        var wy = n.by + n.dy;
        var wz = n.bz + n.dz;
        var x1 = wx * cosY + wz * sinY;
        var z1 = -wx * sinY + wz * cosY;
        var y2 = wy * cosX - z1 * sinX;
        var z2 = wy * sinX + z1 * cosX;
        var zCam = camZ + z2;
        var s = focal / zCam;
        var sx = cx + x1 * sphereR * s;
        var sy = cy + y2 * sphereR * s;
        proj.push({ x: sx, y: sy, z: z2, s: s });

        if (mouse.active && !reduceMotion) {
          var ddx = mouse.x - sx;
          var ddy = mouse.y - sy;
          var dist = Math.hypot(ddx, ddy);
          var radius = 190;
          if (dist < radius && dist > 0.01) {
            var force = (1 - dist / radius) * 0.00085;
            var lx = ddx / (sphereR * s);
            var ly = ddy / (sphereR * s);
            var iy = ly * cosX;
            var iz = -ly * sinX;
            var ix = lx * cosY - iz * sinY;
            var iz2 = lx * sinY + iz * cosY;
            n.vx += ix * force;
            n.vy += iy * force;
            n.vz += iz2 * force;
          }
        }

        n.vx += -n.dx * 0.04;
        n.vy += -n.dy * 0.04;
        n.vz += -n.dz * 0.04;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.vz *= 0.88;
        n.dx += n.vx;
        n.dy += n.vy;
        n.dz += n.vz;
      }

      for (var e = 0; e < edges.length; e += 1) {
        var edge = edges[e];
        var pa = proj[edge[0]];
        var pb = proj[edge[1]];
        var avgZ = (pa.z + pb.z) * 0.5;
        var depth = 1 - (avgZ + 1) / 2;
        var mx = (pa.x + pb.x) * 0.5;
        var my = (pa.y + pb.y) * 0.5;
        var md = mouse.active ? Math.hypot(mouse.x - mx, mouse.y - my) : 9999;
        var glow = Math.max(0, 1 - md / 230);
        var alpha = 0.035 + depth * 0.22 + glow * 0.34;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = glow > 0.08 ? "rgba(255, 106, 0, " + alpha + ")" : "rgba(247, 247, 244, " + alpha + ")";
        ctx.lineWidth = 0.45 + depth * 0.45 + glow * 0.65;
        ctx.stroke();
      }

      var order = proj
        .map(function (p, idx) {
          return { idx: idx, z: p.z };
        })
        .sort(function (a, b) {
          return a.z - b.z;
        });
      for (var o = 0; o < order.length; o += 1) {
        var p = proj[order[o].idx];
        var pointDepth = 1 - (p.z + 1) / 2;
        var pointDist = mouse.active ? Math.hypot(mouse.x - p.x, mouse.y - p.y) : 9999;
        var pointGlow = Math.max(0, 1 - pointDist / 190);
        var radius = 0.7 + pointDepth * 1.35 + pointGlow * 1.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = pointGlow > 0.08
          ? "rgba(255, 106, 0, " + (0.34 + pointDepth * 0.34 + pointGlow * 0.38) + ")"
          : "rgba(29, 124, 255, " + (0.16 + pointDepth * 0.22) + ")";
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    build();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    return function cleanup() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }

  document.querySelectorAll("#revenue-calculator input").forEach(function (input) {
    input.addEventListener("input", updateCalculator);
  });

  updateCalculator();
  updateJourney();
  var cleanupNetwork = initMagneticNetwork();
  window.addEventListener("scroll", updateJourney, { passive: true });
  window.addEventListener("resize", updateJourney);
  window.addEventListener("pagehide", cleanupNetwork);
})();
