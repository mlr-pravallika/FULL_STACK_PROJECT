document.addEventListener('DOMContentLoaded', () => {
  // Populate year dynamically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Product filtering - buttons and product cards
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#productGrid .card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and add to clicked one
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Get filter from clicked button
      const filter = btn.dataset.filter;

      // Show/hide cards based on filter
      cards.forEach(card => {
        const cat = card.dataset.category;
        card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });

  // Theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Set theme function (syncs checkbox and data-theme attribute)
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggleBtn.checked = (theme === 'dark');
    localStorage.setItem('theme', theme);
  }

  // Respond to toggle changes
  themeToggleBtn.addEventListener('change', () => {
    const newTheme = themeToggleBtn.checked ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // Load saved theme on page load and sync toggle state
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Default to light theme if none saved
    setTheme('light');
  }

  // Modal view elements
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalAction = document.getElementById('modalAction');
  const closeModal = document.getElementById('closeModal');

  // Open modal function – populate modal with card info
  function openModal(card) {
    const img = card.querySelector('img').src;
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.price').textContent;
    const desc = card.querySelector('.card-excerpt').textContent;

    modalImg.src = img;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDesc.textContent = desc;
    modalAction.href = `mailto:info@example.com?subject=Interested%20in%20${encodeURIComponent(title)}`;
    modal.setAttribute('aria-hidden', 'false');
  }

  // Close modal function
  function close() {
    modal.setAttribute('aria-hidden', 'true');
  }

  // Add open modal listeners on all view buttons inside cards
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      openModal(card);
    });
  });

  // Close modal event listeners
  closeModal.addEventListener('click', close);

  modal.addEventListener('click', e => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
});
