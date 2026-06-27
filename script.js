// =========================================================
// PORTFOLIO — MAXIME LECLERC — interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav ---- */
  const burger = document.querySelector('.nav-burger');
  const drawer = document.querySelector('.mobile-drawer');
  if (burger && drawer){
    burger.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Project modal ---- */
  const overlay = document.getElementById('modal-overlay');
  const modalBox = document.getElementById('modal-box');

  const projectData = window.PROJECT_DATA || {};

  function openModal(key){
    const data = projectData[key];
    if (!data || !modalBox) return;
    modalBox.innerHTML = `
      <button class="modal-close" data-close>FERMER ✕</button>
      <span class="label">${data.eyebrow}</span>
      <h3>${data.title}</h3>
      <p>${data.intro}</p>
      <ul class="modal-list">
        ${data.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <div class="proj-stack" style="margin-top:18px;">
        ${data.stack.map(s => `<span>${s}</span>`).join('')}
      </div>
    `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(card.getAttribute('data-project'));
    });
  });

  if (overlay){
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.hasAttribute('data-close')){
        closeModal();
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-drawer a');
  if ('IntersectionObserver' in window && sections.length){
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--blue-deep)' : '';
          });
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navObserver.observe(s));
  }

  /* ---- Current year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
