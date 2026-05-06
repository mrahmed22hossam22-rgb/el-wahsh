// ===== TRANSFORMATION SLIDESHOW =====
let currentSlide = 0;
const totalSlides = 12;

function goToSlide(index) {
  const slides = document.querySelectorAll('.transform-slide');
  const dots = document.querySelectorAll('.t-dot');
  slides[currentSlide].classList.remove('active', 'zoom-in');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active', 'zoom-in');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
}

// ===== CAPTAIN SLIDESHOW =====
let currentCaptainSlide = 0;
const totalCaptainSlides = 4;

function goToCaptainSlide(index) {
  const slides = document.querySelectorAll('.captain-slide');
  const dots = document.querySelectorAll('.c-dot');
  slides[currentCaptainSlide].classList.remove('active', 'zoom-in');
  dots[currentCaptainSlide].classList.remove('active');
  currentCaptainSlide = index;
  slides[currentCaptainSlide].classList.add('active', 'zoom-in');
  dots[currentCaptainSlide].classList.add('active');
}

function nextCaptainSlide() {
  goToCaptainSlide((currentCaptainSlide + 1) % totalCaptainSlides);
}

document.addEventListener('DOMContentLoaded', function() {
  setInterval(nextSlide, 3500);
  setInterval(nextCaptainSlide, 3800);
});

// ===== CALCULATOR TABS =====
function switchCalc(name, btn) {
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('calc-' + name).classList.add('active');
}

// ===== CALORIES CALCULATOR =====
function calcCalories() {
  const h = parseFloat(document.getElementById('cal-height').value);
  const w = parseFloat(document.getElementById('cal-weight').value);
  const age = parseFloat(document.getElementById('cal-age').value);
  const gender = document.getElementById('cal-gender').value;
  const activity = parseFloat(document.getElementById('cal-activity').value);
  if (!h || !w || !age) { alert('أدخل جميع البيانات'); return; }
  let bmr = gender === 'male' ? 10*w + 6.25*h - 5*age + 5 : 10*w + 6.25*h - 5*age - 161;
  const tdee = Math.round(bmr * activity);
  document.getElementById('cal-tdee').textContent = tdee;
  document.getElementById('cal-cut').textContent = tdee - 500;
  document.getElementById('cal-maintain').textContent = tdee;
  document.getElementById('cal-bulk').textContent = tdee + 300;
  document.getElementById('cal-result').style.display = 'block';
}

// ===== METABOLISM CALCULATOR =====
function calcMetabolism() {
  const h = parseFloat(document.getElementById('met-height').value);
  const w = parseFloat(document.getElementById('met-weight').value);
  const age = parseFloat(document.getElementById('met-age').value);
  const gender = document.getElementById('met-gender').value;
  if (!h || !w || !age) { alert('أدخل جميع البيانات'); return; }
  let bmr = gender === 'male' ? 10*w + 6.25*h - 5*age + 5 : 10*w + 6.25*h - 5*age - 161;
  bmr = Math.round(bmr);
  document.getElementById('met-bmr').textContent = bmr;
  document.getElementById('met-protein').textContent = Math.round(w * 2.2);
  document.getElementById('met-carb').textContent = Math.round((bmr * 0.45) / 4);
  document.getElementById('met-fat').textContent = Math.round((bmr * 0.25) / 9);
  document.getElementById('met-result').style.display = 'block';
}

// ===== BODY FAT CALCULATOR =====
function toggleFatFields() {
  const gender = document.getElementById('fat-gender').value;
  document.getElementById('fat-hip-group').style.display = gender === 'female' ? 'block' : 'none';
}

function calcFat() {
  const h = parseFloat(document.getElementById('fat-height').value);
  const waist = parseFloat(document.getElementById('fat-waist').value);
  const neck = parseFloat(document.getElementById('fat-neck').value);
  const gender = document.getElementById('fat-gender').value;
  if (!h || !waist || !neck) { alert('أدخل جميع البيانات'); return; }
  let fatPct;
  if (gender === 'male') {
    fatPct = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450;
  } else {
    const hip = parseFloat(document.getElementById('fat-hip').value) || 95;
    fatPct = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450;
  }
  fatPct = Math.max(3, Math.min(60, fatPct)).toFixed(1);
  const estW = Math.round(h * 0.4);
  const fatMass = (estW * fatPct / 100).toFixed(1);
  const leanMass = (estW - fatMass).toFixed(1);
  let category = gender === 'male'
    ? (fatPct < 6 ? 'رياضي محترف' : fatPct < 14 ? 'لياقة ممتازة' : fatPct < 18 ? 'متوسط' : fatPct < 25 ? 'زيادة' : 'سمنة')
    : (fatPct < 14 ? 'رياضية محترفة' : fatPct < 21 ? 'لياقة ممتازة' : fatPct < 25 ? 'متوسط' : fatPct < 32 ? 'زيادة' : 'سمنة');
  document.getElementById('fat-percent').textContent = fatPct;
  document.getElementById('fat-lean').textContent = leanMass;
  document.getElementById('fat-mass').textContent = fatMass;
  document.getElementById('fat-category').textContent = category;
  document.getElementById('fat-result').style.display = 'block';
}

// ===== BOOKING =====
function submitBooking(e) {
  e.preventDefault();
  const type  = document.getElementById('bookType').value;
  const name  = document.getElementById('bookName').value;
  const notes = document.getElementById('bookNotes').value;

  const typeMap = { personal:'تدريب شخصي', group:'تدريب جماعي', online:'تدريب أونلاين', nutrition:'استشارة تغذية' };
  const text = [
    '📋 *طلب حجز جديد – HULK GYM*',
    `👤 الاسم: ${name}`,
    `📋 النوع: ${typeMap[type] || type}`,
    notes ? `📝 ملاحظات: ${notes}` : ''
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/201149694169?text=${encodeURIComponent(text)}`, '_blank');
  e.target.reset();
}

// ===== MOBILE NAV =====
function toggleMenu() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  const isOpen = nav.style.display === 'flex';
  if (isOpen) { nav.style.display = ''; nav.style.position = ''; return; }
  Object.assign(nav.style, { display:'flex', flexDirection:'column', position:'absolute', top:'80px', right:'0', left:'0', background:'rgba(5,10,5,0.98)', padding:'20px', gap:'16px', zIndex:'100', borderBottom:'1px solid rgba(57,255,20,0.2)' });
}

// ===== T-SHIRTS =====
let cartItems = [];

function filterTshirts(color, btn) {
  document.querySelectorAll('.tshirt-ctrl-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tshirt-card').forEach(card => {
    card.style.display = (color === 'all' || card.dataset.color === color) ? 'block' : 'none';
  });
}

function addToCartTshirt(btn) {
  const card = btn.closest('.tshirt-card');
  const name = card.querySelector('h4').textContent;
  const activeSize = card.querySelector('.size-btn.active')?.textContent || 'M';
  const price = card.querySelector('.tshirt-price').textContent;
  const id = Date.now();
  cartItems.push({ id, name, size: activeSize, price });
  updateCartBar();
  btn.textContent = '✅ تمت الإضافة';
  btn.style.background = '#1a4a1a';
  setTimeout(() => { btn.textContent = 'أضف للسلة 🛒'; btn.style.background = ''; }, 1500);
}

function removeFromCart(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  updateCartBar();
}

function updateCartBar() {
  const bar = document.getElementById('tshirtCartBar');
  const countEl = document.getElementById('cartCount');
  const listEl = document.getElementById('cartItemsList');
  countEl.textContent = cartItems.length;
  if (cartItems.length === 0) {
    bar.style.display = 'none';
    listEl.innerHTML = '';
    return;
  }
  bar.style.display = 'flex';
  listEl.innerHTML = cartItems.map(item =>
    `<div class="cart-item-row">
      <span>${item.name} – مقاس ${item.size} – ${item.price}</span>
      <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">✕ حذف</button>
    </div>`
  ).join('');
}

function checkoutTshirts() {
  if (!cartItems.length) return;
  const itemsList = cartItems.map(i => `• ${i.name} - مقاس ${i.size} - ${i.price}`).join('\n');
  window.open(`https://wa.me/201149694169?text=${encodeURIComponent('طلب تيشيرتات HULK GYM:\n' + itemsList + '\nأرجو التواصل لتأكيد الطلب')}`, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.tshirt-sizes').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  document.querySelectorAll('.supp-cat-card, .trainer-card, .tshirt-card').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } }); }, { threshold: 0.1 }).observe(el);
  });
});
