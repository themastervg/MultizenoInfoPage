document.addEventListener('DOMContentLoaded', async () => {
  try {
    const grid = document.getElementById('grid');
    const count = document.getElementById('count');
    const tabs = document.querySelectorAll('.tab');
    const searchInput = document.getElementById('search');
    const loader = document.getElementById('loader');

    loader.style.display = 'block';
    const res = await fetch('/assets/commands.json', { cache: 'no-store' });
    const commands = await res.json();
    loader.style.display = 'none';

    let activeCategory = (document.querySelector('.tab[aria-selected="true"]')?.dataset.cat) || 'All';
    let term = '';

    function observe() {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }});
      }, { threshold: 0.15 });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

    function render() {
      const list = commands.filter(x => (activeCategory === 'All' || x.category === activeCategory) &&
        (x.command.toLowerCase().includes(term) || x.description.toLowerCase().includes(term)));

      count.textContent = list.length + ' commands';

      grid.innerHTML = list.map(x => `
        <div class="card reveal">
          <div>
            <div class="badge">${x.category}</div>
            <div class="cmd" style="margin-top:6px">${x.emoji} ${x.command}</div>
            <div class="desc">${x.description}</div>
          </div>
          <div class="copy"><button data-copy="${x.command}">Copy</button></div>
        </div>
      `).join('');

      observe();
    }

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(b => b.setAttribute('aria-selected', 'false'));
        t.setAttribute('aria-selected', 'true');
        activeCategory = t.dataset.cat;
        render();
      });
    });

    searchInput.addEventListener('input', e => {
      term = e.target.value.trim().toLowerCase();
      render();
    });

    document.addEventListener('click', e => {
      const btn = e.target.closest('button[data-copy]');
      if (!btn) return;
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
      setTimeout(() => (btn.textContent = 'Copy'), 900);
    });

    render();
  } catch (e) {
    console.error('Error loading commands:', e);
  }
});
