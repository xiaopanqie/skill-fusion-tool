import 'dotenv/config';
import express from 'express';
import { Anthropic } from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const skillsDb = JSON.parse(readFileSync('./skills.json', 'utf-8'));

// ─── Claude client ──────────────────────────────────────
function getClaudeClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('请在 .env 文件中设置 ANTHROPIC_API_KEY');
  }
  return new Anthropic({ apiKey });
}

// ─── Skill matching ─────────────────────────────────────
function matchExistingSkill(fusedName, inputSkills) {
  const inputLower = inputSkills.map(s => s.toLowerCase());
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of skillsDb) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (inputLower.some(s => s.includes(kw) || kw.includes(s))) {
        score++;
      }
    }
    // Also fuzzy match the generated name against existing name
    const nameMatch = entry.name.toLowerCase().split(/[\s\/\(\)\-]+/).some(
      w => w.length > 1 && fusedName.toLowerCase().includes(w)
    );
    if (nameMatch) score += 2;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Threshold: need at least half the keywords to match
  if (bestMatch && bestScore >= Math.max(2, inputSkills.length * 0.4)) {
    return bestMatch;
  }
  return null;
}

// ─── Build prompt ───────────────────────────────────────
function buildPrompt(skills) {
  const skillList = skills.join('、');
  return `你是一个跨学科的创新顾问。用户提供了以下技能：${skillList}。

请创造性地融合这些技能，生成一个全新的职业或项目。以JSON格式返回，不要包含其他文字：

{
  "name": "融合后的职业/项目名称（简洁有创意，3-8个字）",
  "description": "这个职业/项目的详细描述（80-150字，说明它是什么、解决了什么问题、为什么有价值）",
  "features": ["特点1", "特点2", "特点3", "特点4", "特点5"],
  "tagline": "一句话slogan（15字以内）"
}

要求：
- 名称要有创意但不是凭空编造，让人一听就觉得合理
- 描述要具体，有应用场景
- 特点要体现各项原始技能的交叉点
- 用中文输出`;
}

// ─── API endpoint ───────────────────────────────────────
app.post('/api/fuse', async (req, res) => {
  const { skills } = req.body;

  if (!Array.isArray(skills) || skills.length < 2) {
    return res.status(400).json({ error: '请提供至少2个技能' });
  }

  try {
    const anthropic = getClaudeClient();
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      temperature: 0.9,
      thinking: { type: 'disabled' },
      system: '你是一个擅长跨学科创新的创意顾问。你的输出必须严格遵循JSON格式。',
      messages: [{ role: 'user', content: buildPrompt(skills) }],
    });

    // Parse Claude's response — find the first text block
    const textBlock = response.content.find(b => b.type === 'text');
    if (!textBlock) throw new Error('AI 未返回有效文本，请重试');
    const text = textBlock.text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI 返回格式异常，请重试');

    const result = JSON.parse(jsonMatch[0]);

    // Check against local skill database
    const existing = matchExistingSkill(result.name, skills);

    res.json({
      name: result.name,
      description: result.description,
      features: result.features || [],
      tagline: result.tagline || '',
      existing,
    });
  } catch (err) {
    console.error('Fusion error:', err.message);
    if (err.message.includes('ANTHROPIC_API_KEY')) {
      return res.status(500).json({ error: '服务端 API Key 未配置' });
    }
    res.status(500).json({ error: '融合失败，请稍后重试' });
  }
});

// ─── Health check ───────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', skillsCount: skillsDb.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`技能融合器已启动: http://localhost:${PORT}`);
});
