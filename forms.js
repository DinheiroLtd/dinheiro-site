// Dinheiro — shared form submission handler
// Uses Web3Forms (web3forms.com) — free, no server required

async function dinhSubmitForm(event) {
  event.preventDefault();
  const form = event.target;
  const btn  = form.querySelector('.btn-submit');
  if (!btn) return;

  // Basic required-field validation
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    if (!el.value.trim()) {
      el.style.outline = '2px solid #ef4444';
      el.style.borderColor = '#ef4444';
      valid = false;
    } else {
      el.style.outline = '';
      el.style.borderColor = '';
    }
  });
  if (!valid) {
    const err = form.querySelector('.dinh-form-error') || (() => {
      const e = document.createElement('p');
      e.className = 'dinh-form-error';
      e.style.cssText = 'color:#ef4444;font-size:0.82rem;margin-top:8px;';
      btn.parentNode.insertBefore(e, btn);
      return e;
    })();
    err.textContent = 'Please fill in all required fields.';
    return;
  }

  const originalText = btn.textContent;
  btn.textContent    = 'Sending…';
  btn.disabled       = true;

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body:   new FormData(form),
    });
    const data = await res.json();

    if (data.success) {
      // Replace form content with a clean success message
      const card = form.closest('.quote-form-card');
      if (card) {
        card.innerHTML = `
          <div style="text-align:center; padding:56px 32px;">
            <div style="width:60px; height:60px; background:#f0fdf4; border-radius:50%;
                        display:flex; align-items:center; justify-content:center;
                        margin:0 auto 20px; border:2px solid #86efac;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                   stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style="color:#1C3C57; font-size:1.25rem; font-weight:700; margin-bottom:10px;">
              Message received
            </h3>
            <p style="color:#666; font-size:0.9rem; line-height:1.6; max-width:320px; margin:0 auto;">
              Thank you for getting in touch. A member of our team will be in contact within one business hour.
            </p>
          </div>`;
      }
    } else {
      throw new Error('Web3Forms returned failure');
    }
  } catch (e) {
    btn.textContent = originalText;
    btn.disabled    = false;
    const err = form.querySelector('.dinh-form-error') || (() => {
      const el = document.createElement('p');
      el.className = 'dinh-form-error';
      el.style.cssText = 'color:#ef4444;font-size:0.82rem;margin-top:8px;';
      btn.parentNode.insertBefore(el, btn);
      return el;
    })();
    err.textContent = 'Something went wrong — please try again or call us directly.';
  }
}
