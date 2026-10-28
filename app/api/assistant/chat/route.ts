import { NextResponse } from 'next/server';
import { getAssistantDemoReply } from '../../../assistant-demo';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const systemInstruction = `คุณคือ AI Learning Assistant ในแพลตฟอร์มเรียนรู้สำหรับนักศึกษาพยาบาล ตอบเป็นภาษาไทยอย่างสุภาพ กระชับ และช่วยให้ผู้เรียนคิดต่อได้ อธิบายแนวคิดด้านการสื่อสารเชิงบำบัด การลดการตีตรา การสะท้อนคิด และการเรียนรู้ผ่านสถานการณ์จำลองในเชิงการศึกษาเท่านั้น

ขอบเขตความปลอดภัย: คุณไม่ใช่เครื่องมือวินิจฉัยหรือรักษา ห้ามวินิจฉัยบุคคลจริง แนะนำให้หยุดยา หรือสั่งการรักษา หากผู้ใช้ถามถึงผู้ป่วยจริง ให้แนะนำให้ปรึกษาอาจารย์พยาบาลหรือบุคลากรสุขภาพที่รับผิดชอบ หากมีภาวะฉุกเฉินให้ขอความช่วยเหลือจากทีมรักษาหรือหน่วยฉุกเฉินทันที หลีกเลี่ยงภาษาตีตรา ใช้ภาษาที่เคารพศักดิ์ศรีของผู้ป่วย และยอมรับอย่างตรงไปตรงมาเมื่อไม่แน่ใจหรือไม่มีข้อมูลอ้างอิงที่ผ่านการตรวจสอบ อย่าอ้างว่าได้ค้นเอกสารหรือฐานความรู้แล้ว เพราะ prototype นี้ยังไม่มีระบบ RAG เชื่อมต่อ`;

export async function POST(request: Request) {
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'รูปแบบคำขอไม่ถูกต้อง' }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 20) {
    return NextResponse.json({ message: 'กรุณาส่งบทสนทนาไม่เกิน 20 ข้อความ' }, { status: 400 });
  }
  const messages = body.messages as ChatMessage[];
  if (messages.some((message) => !message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 2000)) {
    return NextResponse.json({ message: 'ข้อความต้องมีเนื้อหาและยาวไม่เกิน 2,000 ตัวอักษร' }, { status: 400 });
  }
  const latest = messages[messages.length - 1];
  if (latest.role !== 'user') return NextResponse.json({ message: 'ข้อความล่าสุดต้องมาจากผู้เรียน' }, { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ reply: getAssistantDemoReply(latest.content), mode: 'demo' });

  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  if (!/^[a-zA-Z0-9.-]+$/.test(model)) return NextResponse.json({ message: 'ชื่อโมเดล Gemini ไม่ถูกต้อง' }, { status: 500 });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: messages.map((message) => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })),
        generationConfig: { temperature: 0.5, maxOutputTokens: 900 },
      }),
      signal: AbortSignal.timeout(30_000),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = response.status === 429
        ? 'ตอนนี้มีคำขอใช้งานมากเกินไป รอสักครู่แล้วลองใหม่ค่ะ'
        : 'เชื่อมต่อ Gemini ไม่สำเร็จ ตรวจสอบ API key และการตั้งค่าโมเดลค่ะ';
      return NextResponse.json({ message }, { status: response.status === 429 ? 429 : 502 });
    }
    const reply = data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('').trim();
    if (!reply) return NextResponse.json({ message: 'Gemini ยังไม่สามารถตอบคำถามนี้ได้ ลองปรับคำถามแล้วส่งอีกครั้งค่ะ' }, { status: 502 });
    return NextResponse.json({ reply, mode: 'gemini' });
  } catch {
    return NextResponse.json({ message: 'ติดต่อ Gemini ไม่ได้ในขณะนี้ ตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้งค่ะ' }, { status: 502 });
  }
}
