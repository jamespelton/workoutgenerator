// CSP-safe print handler. An inline `javascript:` href or inline onclick is
// blocked under a strict Content-Security-Policy, so the print control is wired
// up here from an external script served by the app (script-src 'self').
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('print-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      window.print();
    });
  }
});
