// ─── State ─────────────────────────────────────────────
const state = {
  skills: [],
  isLoading: false,
};

// ─── DOM refs ──────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const dom = {
  tagsContainer: $('#tagsContainer'),
  skillInput: $('#skillInput'),
  skillCount: $('#skillCount'),
  fuseBtn: $('#fuseBtn'),
  spinner: $('#spinner'),
  btnText: $('.btn-text'),
  clearAllBtn: $('#clearAllBtn'),
  resultCard: $('#resultCard'),
  resultName: $('#resultName'),
  resultTagline: $('#resultTagline'),
  resultDesc: $('#resultDesc'),
  resultIcon: $('#resultIcon'),
  featuresList: $('#featuresList'),
  existingHint: $('#existingHint'),
  hintDesc: $('#hintDesc'),
  hintLink: $('#hintLink'),
  emptyState: $('#emptyState'),
  toast: $('#toast'),
};

// ─── Tag rendering ─────────────────────────────────────
function renderTags() {
  dom.tagsContainer.innerHTML = state.skills
    .map(
      (skill, idx) => `
        <span class="tag">
          ${escapeHtml(skill)}
          <button class="tag-remove" data-index="${idx}" aria-label="删除 ${skill}">&times;</button>
        </span>`
    )
    .join('');

  dom.skillCount.textContent = state.skills.length;
  dom.fuseBtn.disabled = state.skills.length < 2;
  dom.emptyState.classList.toggle('hidden', state.skills.length > 0);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── Add / Remove skills ───────────────────────────────
function addSkill(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  if (trimmed.length > 20) {
    showToast('技能名称不能超过 20 个字', 'error');
    return;
  }
  if (state.skills.length >= 8) {
    showToast('最多添加 8 个技能', 'error');
    return;
  }
  if (state.skills.some(s => s === trimmed)) {
    showToast('该技能已添加', 'error');
    return;
  }
  state.skills.push(trimmed);
  renderTags();
  dom.skillInput.value = '';
  dom.skillInput.focus();
}

function removeSkill(index) {
  state.skills.splice(index, 1);
  renderTags();
}

function clearAll() {
  if (state.skills.length === 0) return;
  state.skills = [];
  renderTags();
  dom.resultCard.classList.add('hidden');
  dom.skillInput.focus();
}

// ─── Event delegation for tag removal ──────────────────
dom.tagsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.tag-remove');
  if (!btn) return;
  const index = parseInt(btn.dataset.index, 10);
  if (!isNaN(index)) removeSkill(index);
});

// ─── Input handling ────────────────────────────────────
dom.skillInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addSkill(dom.skillInput.value);
  }
  // Backspace on empty input removes last tag
  if (e.key === 'Backspace' && dom.skillInput.value === '' && state.skills.length > 0) {
    removeSkill(state.skills.length - 1);
  }
});

dom.clearAllBtn.addEventListener('click', clearAll);

// ─── Toast ─────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = 'error') {
  clearTimeout(toastTimer);
  dom.toast.textContent = msg;
  dom.toast.className = 'toast';
  if (type === 'success') dom.toast.classList.add('success');
  toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), 2500);
}

// ─── Loading state ─────────────────────────────────────
function setLoading(loading) {
  state.isLoading = loading;
  dom.fuseBtn.classList.toggle('loading', loading);
  dom.spinner.classList.toggle('hidden', !loading);
  dom.btnText.classList.toggle('hidden', loading);
  dom.fuseBtn.disabled = loading || state.skills.length < 2;
}

// ─── API call ──────────────────────────────────────────
async function fuseSkills() {
  if (state.isLoading || state.skills.length < 2) return;

  setLoading(true);
  dom.resultCard.classList.add('hidden');

  try {
    const res = await fetch('/api/fuse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills: state.skills }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '未知错误');

    renderResult(data);
  } catch (err) {
    showToast(err.message || '网络错误，请检查后端是否启动');
  } finally {
    setLoading(false);
  }
}

// ─── Render result ─────────────────────────────────────
function renderResult(data) {
  const icons = ['✨', '🚀', '💎', '⚡', '🌟', '🔮', '🪐', '🔥'];
  dom.resultIcon.textContent = icons[Math.floor(Math.random() * icons.length)];
  dom.resultName.textContent = data.name;
  dom.resultTagline.textContent = data.tagline || '';
  dom.resultDesc.textContent = data.description;
  dom.featuresList.innerHTML = (data.features || [])
    .map(f => `<li>${escapeHtml(f)}</li>`)
    .join('');

  // Existing skill hint
  if (data.existing) {
    dom.existingHint.classList.remove('hidden');
    dom.hintDesc.textContent = data.existing.description;
    dom.hintLink.href = data.existing.url;
  } else {
    dom.existingHint.classList.add('hidden');
  }

  dom.resultCard.classList.remove('hidden');
  dom.resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── Button click ──────────────────────────────────────
dom.fuseBtn.addEventListener('click', fuseSkills);

// ─── Initial render ────────────────────────────────────
renderTags();
dom.skillInput.focus();
