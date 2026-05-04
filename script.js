/* ============================================================
   script.js — Dra. Raele LP (redesign)
   ============================================================ */

// Ano dinâmico
const anoEl = document.getElementById('ano');
if (anoEl) anoEl.textContent = new Date().getFullYear();

/* ── Máscara WhatsApp ─────────────────────────────────────── */
const wppInput = document.getElementById('whatsapp');
if (wppInput) {
  wppInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length >= 7)      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length >= 3) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length >= 1) v = `(${v}`;
    e.target.value = v;
  });
}

/* ── Validação ────────────────────────────────────────────── */
const form = document.getElementById('contato-form');

function setError(id, msg) {
  const err = document.getElementById(`${id}-error`);
  const inp = document.getElementById(id);
  if (err) err.textContent = msg;
  if (inp) inp.classList.toggle('is-invalid', !!msg);
}

function sanitize(v) { return v.replace(/[<>"']/g, '').trim(); }

function isPhone(v) {
  const d = v.replace(/\D/g, '');
  return d.length >= 10 && d.length <= 11;
}

function validate() {
  let ok = true;

  const nome = sanitize(document.getElementById('nome').value);
  if (nome.length < 3) { setError('nome', 'Informe seu nome completo.'); ok = false; }
  else setError('nome', '');

  const wpp = document.getElementById('whatsapp').value;
  if (!isPhone(wpp)) { setError('whatsapp', 'Informe um WhatsApp válido com DDD.'); ok = false; }
  else setError('whatsapp', '');

  const checked = form.querySelectorAll('input[name="procedimento"]:checked');
  const procErr = document.getElementById('procedimento-error');
  if (checked.length === 0) { if (procErr) procErr.textContent = 'Selecione ao menos um procedimento.'; ok = false; }
  else { if (procErr) procErr.textContent = ''; }

  return ok;
}

/* ── Envio → WhatsApp ─────────────────────────────────────── */
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const nome      = sanitize(document.getElementById('nome').value);
    const wpp       = document.getElementById('whatsapp').value.replace(/\D/g, '');
    const historico = document.getElementById('historico').value;
    const procs     = [...form.querySelectorAll('input[name="procedimento"]:checked')]
                        .map(c => c.closest('label').textContent.trim()).join(', ');

    const msg = encodeURIComponent(
      `Olá! Vim pelo site da Dra. Raele.\n\n` +
      `*Nome:* ${nome}\n` +
      `*WhatsApp:* ${wpp}\n` +
      `*Procedimento(s):* ${procs || 'Não informado'}\n` +
      `*Fez procedimento antes:* ${historico || 'Não informado'}\n\n` +
      `Gostaria de agendar uma avaliação.`
    );

    // Etapa 5 — descomentar quando Pixel estiver configurado:
    // if (typeof fbq !== 'undefined') fbq('track', 'Lead', { content_name: procs });

    // Substituir pelo número real (somente dígitos, com DDI 55)
    const NUMERO = '5511999999999';
    window.open(`https://wa.me/${NUMERO}?text=${msg}`, '_blank', 'noopener,noreferrer');

    const btn = document.getElementById('submit-btn');
    const orig = btn.textContent;
    btn.textContent = 'Redirecionando…';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 4000);
  });
}

/* ── Galeria Antes / Depois ───────────────────────────────── */
document.querySelectorAll('.bento__toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.bento__img-wrap').querySelector('.bento__img');
    const isAntes = img.dataset.state === 'antes';

    // Fade suave ao trocar imagem
    img.style.opacity = '0';
    setTimeout(() => {
      img.src        = isAntes ? img.dataset.depois : img.dataset.antes;
      img.alt        = isAntes ? img.alt.replace('Antes', 'Depois') : img.alt.replace('Depois', 'Antes');
      img.dataset.state = isAntes ? 'depois' : 'antes';
      img.style.opacity = '1';
    }, 200);

    btn.textContent = isAntes ? 'Antes' : 'Resultado';
    btn.classList.toggle('is-depois', isAntes);
  });
});

/* ── Intersection Observer (fade-up) ─────────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => obs.observe(el));

// Garante que elementos já visíveis na carga inicial sejam revelados
const revealVisible = () => {
  fadeEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('in');
      obs.unobserve(el);
    }
  });
};
revealVisible();
window.addEventListener('load', revealVisible);
