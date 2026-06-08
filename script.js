/* =========================================================
   GS Clinic - Main JavaScript
   ========================================================= */

/* ---------- LOADER ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ---------- NAVBAR SCROLL + PROGRESS ---------- */
const navbar = document.getElementById('navbar');
const progress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  // navbar
  navbar.classList.toggle('scrolled', scrollTop > 50);
  // progress bar
  progress.style.width = (scrollTop / docHeight) * 100 + '%';
  // back to top
  backToTop.classList.toggle('show', scrollTop > 400);
  // active nav link
  highlightNav();
});

/* ---------- MOBILE MENU ---------- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ---------- BACK TO TOP ---------- */
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- REVEAL ON SCROLL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- COUNTER ANIMATION ---------- */
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

function animateCount(el) {
  const target = +el.getAttribute('data-count');
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(timer); }
    el.textContent = count.toLocaleString() + (target >= 1000 ? '+' : '+');
  }, 25);
}

/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

/* ---------- APPOINTMENT FORM ---------- */
const apptForm = document.getElementById('appointmentForm');
const formNote = document.getElementById('formNote');
apptForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = apptForm.name.value.trim();
  formNote.textContent = `Thank you, ${name}! Your appointment request has been received. We'll confirm shortly. ✅`;
  apptForm.reset();
  setTimeout(() => { formNote.textContent = ''; }, 6000);
});

/* ---------- FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   GS CLINIC AI ASSISTANT (Chatbot)
   ========================================================= */
const chatToggle = document.getElementById('chatToggle');
const chatbox = document.getElementById('chatbox');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatText = document.getElementById('chatText');
const chatQuick = document.getElementById('chatQuick');

let chatGreeted = false;

function openChat() {
  chatbox.classList.add('open');
  if (!chatGreeted) {
    botSay("👋 Hello! I'm the <strong>GS Clinic AI Assistant</strong>. I can help with timings, location, services, appointments, doctor availability, and emergencies. How can I help you today?");
    chatGreeted = true;
  }
}
chatToggle.addEventListener('click', () => {
  chatbox.classList.contains('open') ? chatbox.classList.remove('open') : openChat();
});
chatClose.addEventListener('click', () => chatbox.classList.remove('open'));

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.innerHTML = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function botSay(text) {
  // typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg bot';
  typing.textContent = '...';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => {
    typing.remove();
    addMsg(text, 'bot');
  }, 600);
}

/* ---- Knowledge base ---- */
function getBotReply(msg) {
  const m = msg.toLowerCase();

  if (/(hi|hello|hey|namaste|good morning|good evening)/.test(m))
    return "Hello! 😊 How can I assist you with GS Clinic today? You can ask about timings, services, or booking an appointment.";

  if (/(time|timing|hour|open|close|when.*open|schedule)/.test(m))
    return "🕒 <strong>Clinic Timings:</strong><br>Monday to Saturday: 9:00 AM – 8:00 PM.<br>We are closed on Sundays.";

  if (/(where|location|address|reach|direction|map|located)/.test(m))
    return "📍 We are located in <strong>Agra, Uttar Pradesh, India</strong>. Check the map in our Location section for directions!";

  if (/(service|treatment|offer|facilit|department|cardiac|dental|child|lab|vaccin|ortho)/.test(m))
    return "🩺 <strong>Our Services include:</strong><br>• General Consultation<br>• Cardiac Care<br>• Lab & Diagnostics<br>• Vaccinations<br>• Dental Care<br>• Child Care<br>• Orthopedics<br>• Emergency Care";

  if (/(appoint|book|booking|schedule a|visit|register|slot)/.test(m))
    return "📅 You can book an appointment easily! Scroll to the <strong>Appointment</strong> section and fill the form, or call us at <strong>+91 98765 43210</strong>.";

  if (/(doctor|specialist|physician|dr|available|consult)/.test(m))
    return "👨‍⚕️ <strong>Dr. G. Sharma</strong> (MBBS, MD – General Physician) is available Mon–Sat, 9 AM–8 PM, with 15+ years of experience. Book a slot via the Appointment section!";

  if (/(emergency|urgent|accident|critical|serious|help now)/.test(m))
    return "🚨 For emergencies during clinic hours, please come in immediately or call <strong>+91 98765 43210</strong>. For life-threatening situations, dial <strong>108</strong> (ambulance).";

  if (/(phone|call|contact|number|whatsapp|mobile)/.test(m))
    return "📞 <strong>Phone / WhatsApp:</strong> +91 98765 43210<br>✉️ <strong>Email:</strong> contact@gsclinic.in";

  if (/(email|mail)/.test(m))
    return "✉️ You can email us at <strong>contact@gsclinic.in</strong> and we'll get back to you soon!";

  if (/(price|cost|fee|charge|payment|insurance)/.test(m))
    return "💳 We offer affordable, transparent pricing and accept cash, UPI, cards, and major insurance plans. Call us for specific consultation fees.";

  if (/(thank|thanks|great|good|nice|ok)/.test(m))
    return "You're most welcome! 😊 Stay healthy and feel free to ask anything else.";

  if (/(bye|goodbye|see you)/.test(m))
    return "Take care! 👋 Wishing you good health from all of us at GS Clinic.";

  return "I'm here to help! 🤖 You can ask me about <strong>timings, location, services, appointments, doctor availability, contact details, or emergencies</strong>.";
}

function handleUserMessage(text) {
  if (!text.trim()) return;
  addMsg(text, 'user');
  const reply = getBotReply(text);
  botSay(reply);
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatText.value;
  handleUserMessage(text);
  chatText.value = '';
});

chatQuick.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!chatGreeted) openChat();
    handleUserMessage(btn.getAttribute('data-q'));
  });
});
