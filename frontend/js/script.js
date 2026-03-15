/* =============================================
   ClassSense – Smart Classroom System
   Main JavaScript
   ============================================= */

// ---- Active nav link ----
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initToggles();
  animateStats();
  startClock();
  initToast();
});

function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    if (item.dataset.page === page) item.classList.add('active');
  });
}

// ---- Toggle switches ----
function initToggles() {
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => {
      t.classList.toggle('on');
      const label = t.dataset.label || 'Device';
      const state = t.classList.contains('on') ? 'ON' : 'OFF';
      showToast(`${label} turned ${state}`);
    });
  });
}

// ---- Stat counter animation ----
function animateStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

// ---- Real-time clock ----
function startClock() {
  const el = document.getElementById('live-time');
  if (!el) return;
  const update = () => {
    el.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  update();
  setInterval(update, 1000);
}

// ---- Toast notification ----
let toastTimer;
function showToast(msg, icon = '✅') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = `<span>${icon}</span> ${msg}`;
  el.style.display = 'flex';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = 'none'; }, 3000);
}
function initToast() {
  // Expose globally
  window.showToast = showToast;
}

// ---- Simulate refresh ----
function refreshData() {
  showToast('Data refreshed successfully', '🔄');
}

// ---- Login form ----
function handleLogin(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('email')?.value;
  const pass  = document.getElementById('password')?.value;
  if (!email || !pass) { alert('Please fill all fields.'); return; }
  // Simulate login
  const btn = document.getElementById('login-btn');
  if (btn) {
    btn.textContent = 'Logging in…';
    btn.disabled = true;
  }
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}

// ---- Forgot password ----
function forgotPassword() {
  alert('A password reset link has been sent to your email.');
}

// ---- Mobile sidebar toggle ----
function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}

// ---- Mark alert as resolved ----
function resolveAlert(btn) {
  const row = btn.closest('tr');
  if (row) {
    row.style.opacity = '.4';
    btn.textContent = 'Resolved';
    btn.disabled = true;
    showToast('Alert marked as resolved', '✔️');
  }
}

// ---- Dismiss insight ----
function dismissInsight(btn) {
  const card = btn.closest('.insight-card');
  if (card) {
    card.style.transition = 'all .3s ease';
    card.style.opacity = '0';
    card.style.transform = 'scale(.95)';
    setTimeout(() => card.remove(), 300);
  }
}
