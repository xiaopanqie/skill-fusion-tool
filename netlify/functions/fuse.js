export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { skills, apiKey } = await req.json();

    if (!apiKey || !apiKey.startsWith('sk-ant')) {
      return new Response(JSON.stringify({
        error: '请先在页面顶部设置有效的 Anthropic API Key（以 sk-ant 开头）',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const skillList = skills.join('、');
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        temperature: 0.9,
        thinking: { type: 'disabled' },
        system: '你是一个擅长跨学科创新的创意顾问。输出严格遵循JSON格式，不要包含其他文字。',
        messages: [{
          role: 'user',
          content: `技能：${skillList}。创造性地融合这些技能，生成一个全新的职业或项目。返回JSON：{"name":"职业名(3-8字)","description":"描述(80-150字)","features":["特点1","特点2","特点3","特点4","特点5"],"tagline":"slogan(15字内)"}`,
        }],
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return new Response(JSON.stringify({
        error: `API 错误: ${data.error?.message || data.error?.type}`,
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
