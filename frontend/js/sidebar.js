/* Shared sidebar HTML injected by each page */
function renderSidebar(activePage) {
  const items = [
    { page: 'dashboard.html',  icon: '🏠', label: 'Dashboard' },
    { page: 'attendance.html', icon: '📋', label: 'Attendance' },
    { page: 'energy.html',     icon: '⚡', label: 'Energy Monitoring' },
    { page: 'security.html',   icon: '🔒', label: 'Security Alerts' },
    { page: 'ai_insights.html',icon: '🤖', label: 'AI Insights' },
  ];
  const navLinks = items.map(item => `
    <a href="${item.page}" class="nav-item${activePage === item.page ? ' active' : ''}" data-page="${item.page}">
      <span class="nav-icon">${item.icon}</span> ${item.label}
    </a>
  `).join('');

  return `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="images/logo.png" alt="ClassSense Logo">
        <div class="sidebar-logo-text">
          <span class="brand">ClassSense</span>
          <span class="tagline">Smart Classroom</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main Menu</div>
        ${navLinks}
        <div class="nav-section-label" style="margin-top:8px;">System</div>
        <a href="#" class="nav-item" onclick="showToast('Settings coming soon','⚙️'); return false;">
          <span class="nav-icon">⚙️</span> Settings
        </a>
      </nav>
      <div class="sidebar-footer">
        <a href="login.html" class="nav-item">
          <span class="nav-icon">🚪</span> Logout
        </a>
      </div>
    </aside>`;
}
