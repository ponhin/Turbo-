document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const quickLinks = document.querySelectorAll('.quick-links a');

  // Проверка сохранённой темы и системных предпочтений
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem("theme");

  // Установка начальной темы
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    enableDarkTheme();
  }

  // Обработчик переключения темы
  toggleBtn.addEventListener("click", toggleTheme);

  // Обработчик быстрых ссылок
  quickLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const searchQuery = this.getAttribute('data-search');
      if (searchQuery) {
        const searchBox = document.querySelector('.gsc-input input');
        if (searchBox) {
          searchBox.value = searchQuery;
          const searchButton = document.querySelector('.gsc-search-button');
          if (searchButton) searchButton.click();
        }
      }
    });
  });

  // Функции для работы с темой
  function enableDarkTheme() {
    body.classList.replace("light-theme", "dark-theme");
    toggleBtn.textContent = "☀ Светлая тема";
    localStorage.setItem("theme", "dark");
  }

  function enableLightTheme() {
    body.classList.replace("dark-theme", "light-theme");
    toggleBtn.textContent = "🌙 Темная тема";
    localStorage.setItem("theme", "light");
  }

  function toggleTheme() {
    if (body.classList.contains("light-theme")) {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
  }

  // Слушатель изменений системных предпочтений
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        enableDarkTheme();
      } else {
        enableLightTheme();
      }
    }
  });
});