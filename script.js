// ─── Skill database (built-in) ──────────────────────────
const SKILLS_DB = [
  {name:"UI/UX 设计师",keywords:["设计","美术","心理学","编程","前端"],description:"融合设计美学、用户心理学与前端技术的综合职业",url:"https://www.uisdc.com"},
  {name:"技术美术 (TA)",keywords:["美术","编程","3D","游戏"],description:"连接艺术家与程序员的桥梁，负责着色器、工具链与渲染管线",url:"https://www.ta.place"},
  {name:"数据新闻记者",keywords:["新闻","写作","数据分析","可视化","统计"],description:"用数据讲故事的新型记者，融合调查新闻与数据科学",url:"https://www.datajournalism.com"},
  {name:"生物信息学家",keywords:["生物","编程","数据分析","统计","医学"],description:"运用计算机技术解析生物大数据的前沿交叉学科",url:"https://en.wikipedia.org/wiki/Bioinformatics"},
  {name:"教育科技设计师",keywords:["教育","编程","设计","心理学","产品"],description:"融合教育学、认知心理学与软件开发，打造新一代学习工具",url:"https://www.learningscientists.org"},
  {name:"法务工程师",keywords:["法律","编程","自动化","AI"],description:"将法律知识与软件开发结合，构建合规自动化系统",url:"https://www.legaltechnology.com"},
  {name:"音乐科技制作人",keywords:["音乐","编程","声音","AI","电子"],description:"运用编程和AI创作音乐，探索生成式音频与交互式声音艺术",url:"https://www.musictech.net"},
  {name:"数字营销分析师",keywords:["营销","数据分析","广告","文案","编程"],description:"将数据科学注入营销策略，用算法优化投放与转化",url:"https://www.marketingaiinstitute.com"},
  {name:"医疗 UX 研究员",keywords:["医学","设计","心理学","产品","研究"],description:"在医疗场景中应用用户研究与人因工程",url:"https://www.hfes.org"},
  {name:"气候数据科学家",keywords:["气候","数据","编程","地理","统计"],description:"融合气候科学、大数据与机器学习，为应对气候变化提供数据洞察",url:"https://www.climatechange.ai"},
  {name:"叙事游戏设计师",keywords:["游戏","写作","心理学","美术","设计"],description:"将文学叙事、心理学原理与游戏机制融合，创造沉浸式互动体验",url:"https://www.gamedeveloper.com/design"},
  {name:"金融量化分析师",keywords:["金融","编程","数学","统计","AI"],description:"用数学模型和算法在金融市场中寻找规律与交易机会",url:"https://www.quantnet.com"},
  {name:"建筑可视化专家",keywords:["建筑","3D","美术","设计","编程"],description:"融合建筑设计、3D渲染与编程，创造逼真的建筑可视化作品",url:"https://www.archdaily.com"},
  {name:"XR 交互设计师",keywords:["设计","编程","3D","心理学","硬件"],description:"在 VR/AR/MR 领域融合空间设计、人机交互与实时渲染技术",url:"https://www.xrdconf.com"},
  {name:"食品科学家",keywords:["食品","化学","生物","营养","烹饪"],description:"从分子层面理解食物，创造新食材、风味与可持续食品方案",url:"https://www.ift.org"},
  {name:"SEO 内容策略师",keywords:["写作","营销","数据分析","编程","SEO"],description:"融合内容创作、SEO技术与数据分析，驱动有机流量增长",url:"https://www.contentmarketinginstitute.com"},
  {name:"RPA 工程师",keywords:["编程","自动化","AI","运维","流程"],description:"将编程与自动化思维结合，为企业打造数字员工与智能工作流",url:"https://www.uipath.com"},
  {name:"数字人设计师",keywords:["3D","美术","AI","编程","动画"],description:"融合角色设计、实时渲染与AI对话，创造逼真的虚拟数字人",url:"https://www.unrealengine.com/zh-CN/digital-humans"},
  {name:"可持续发展顾问",keywords:["环境","商业","政策","工程","设计"],description:"融汇环境科学、商业策略与工程设计，为企业提供碳中和转型方案",url:"https://www.sustainability.com"},
  {name:"刑侦画像师",keywords:["美术","刑侦","心理学","解剖"],description:"融合美术功底、刑事侦查知识与人像心理学，协助案件侦破",url:"https://www.theiai.org"},
  {name:"提示词工程师",keywords:["AI","编程","写作","语言","心理学"],description:"精心设计AI大模型输入提示，以精确控制输出质量与风格",url:"https://www.promptingguide.ai"},
  {name:"感官体验设计师",keywords:["设计","心理学","食品","声音","气味"],description:"调动多重感官创造沉浸式品牌体验",url:"https://www.sensorytrust.org.uk"},
  {name:"计算语言学家",keywords:["语言","编程","AI","数据","数学"],description:"在语言学与计算机科学交汇处，构建自然语言处理系统",url:"https://www.aclweb.org"},
  {name:"数字文化遗产保护师",keywords:["历史","3D","编程","考古","美术"],description:"用3D扫描、建模与VR技术对文化遗产进行数字化保存与展示",url:"https://www.cyark.org"},
  {name:"运动科学家",keywords:["运动","生物","数据","物理","医学"],description:"运用生物力学与数据分析优化运动员表现，降低伤病风险",url:"https://www.acsm.org"},
  {name:"生成式AI艺术家",keywords:["AI","美术","编程","设计","创意"],description:"以AI模型为创作媒介，探索人机协作的全新艺术表达形式",url:"https://www.aiartists.org"},
  {name:"智慧城市规划师",keywords:["城市规划","IoT","数据","设计","环境"],description:"将物联网、大数据与城市规划融合，设计可持续的智能城市",url:"https://www.smartcitiesworld.net"},
  {name:"科技伦理顾问",keywords:["哲学","AI","法律","科技","伦理"],description:"在技术发展前沿提供伦理评估与治理框架",url:"https://www.techpolicy.com"},
];

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
  apiKeyInput: $('#apiKeyInput'),
  apiKeyToggle: $('#apiKeyToggle'),
  apiKeySection: $('#apiKeySection'),
};

// ─── API Key management ────────────────────────────────
function getApiKey() {
  return localStorage.getItem('skf_apikey') || '';
}

function setApiKey(key) {
  localStorage.setItem('skf_apikey', key.trim());
}

dom.apiKeyToggle.addEventListener('click', () => {
  dom.apiKeySection.classList.toggle('hidden');
  if (!dom.apiKeySection.classList.contains('hidden')) {
    dom.apiKeyInput.value = getApiKey();
    dom.apiKeyInput.focus();
  }
});

dom.apiKeyInput.addEventListener('change', () => {
  setApiKey(dom.apiKeyInput.value);
  showToast('API Key 已保存', 'success');
});

// ─── Tag rendering ─────────────────────────────────────
function renderTags() {
  dom.tagsContainer.innerHTML = state.skills
    .map((skill, idx) => `
        <span class="tag">
          ${escapeHtml(skill)}
          <button class="tag-remove" data-index="${idx}" aria-label="删除 ${skill}">&times;</button>
        </span>`)
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
  if (trimmed.length > 20) { showToast('技能名称不能超过20个字'); return; }
  if (state.skills.length >= 8) { showToast('最多添加8个技能'); return; }
  if (state.skills.some(s => s === trimmed)) { showToast('该技能已添加'); return; }
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

dom.tagsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.tag-remove');
  if (!btn) return;
  removeSkill(parseInt(btn.dataset.index, 10));
});

dom.skillInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); addSkill(dom.skillInput.value); }
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

// ─── Loading ───────────────────────────────────────────
function setLoading(loading) {
  state.isLoading = loading;
  dom.fuseBtn.classList.toggle('loading', loading);
  dom.spinner.classList.toggle('hidden', !loading);
  dom.btnText.classList.toggle('hidden', loading);
  dom.fuseBtn.disabled = loading || state.skills.length < 2;
}

// ─── Skill matching ────────────────────────────────────
function matchExistingSkill(fusedName, inputSkills) {
  const inputLower = inputSkills.map(s => s.toLowerCase());
  let bestMatch = null, bestScore = 0;
  for (const entry of SKILLS_DB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (inputLower.some(s => s.includes(kw) || kw.includes(s))) score++;
    }
    const nameMatch = entry.name.toLowerCase().split(/[\s\/\(\)\-]+/).some(
      w => w.length > 1 && fusedName.toLowerCase().includes(w)
    );
    if (nameMatch) score += 2;
    if (score > bestScore) { bestScore = score; bestMatch = entry; }
  }
  return (bestMatch && bestScore >= Math.max(2, inputSkills.length * 0.4)) ? bestMatch : null;
}

// ─── Call API via Netlify function ──────────────────────
async function fuseSkills() {
  if (state.isLoading || state.skills.length < 2) return;

  setLoading(true);
  dom.resultCard.classList.add('hidden');

  try {
    const apiKey = getApiKey();
    const resp = await fetch('/.netlify/functions/fuse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills: state.skills, apiKey }),
    });
    const textContent = await resp.json();
    if (!resp.ok) throw new Error(textContent.error || `服务器错误 ${resp.status}`);
    const textBlock = textContent.content?.find(b => b.type === 'text');
    if (!textBlock) throw new Error('AI 未返回有效内容');

    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI 返回格式异常');

    const result = JSON.parse(jsonMatch[0]);
    const existing = matchExistingSkill(result.name, state.skills);
    renderResult({ ...result, existing });

  } catch (err) {
    showToast(err.message || '融合失败，请重试');
  } finally {
    setLoading(false);
  }
}

// ─── Render result ─────────────────────────────────────
function renderResult(data) {
  const icons = ['✨','🚀','💎','⚡','🌟','🔮','🪐','🔥'];
  dom.resultIcon.textContent = icons[Math.floor(Math.random() * icons.length)];
  dom.resultName.textContent = data.name;
  dom.resultTagline.textContent = data.tagline || '';
  dom.resultDesc.textContent = data.description;
  dom.featuresList.innerHTML = (data.features || []).map(f => `<li>${escapeHtml(f)}</li>`).join('');

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

dom.fuseBtn.addEventListener('click', fuseSkills);

// ─── Init ──────────────────────────────────────────────
if (getApiKey()) dom.apiKeyInput.value = getApiKey();
renderTags();
dom.skillInput.focus();
