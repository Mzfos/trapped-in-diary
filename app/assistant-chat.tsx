'use client';

import Link from 'next/link';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Bot, CircleHelp, MessageCircle, Plus, RotateCcw, Send, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { getAssistantDemoReply } from './assistant-demo';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { id: string; role: ChatRole; content: string; mode?: 'demo' | 'gemini' };
const greeting: ChatMessage = {
  id: 'welcome', role: 'assistant',
  content: 'สวัสดีค่ะ ฉันคือผู้ช่วยการเรียนรู้ Trapped in Diary\n\nฉันช่วยทบทวนแนวคิดเรื่องการสื่อสารเชิงบำบัด การลดการตีตรา และการเรียนรู้จากสถานการณ์จำลองได้ ลองถามสิ่งที่สงสัย หรือเลือกหัวข้อแนะนำด้านล่างได้เลยค่ะ',
};
const prompts = [
  'การสื่อสารเชิงบำบัดเริ่มต้นอย่างไร?',
  'ช่วยอธิบายเรื่องการตีตราผู้ป่วยจิตเวช',
  'การสะท้อนความรู้สึกคืออะไร?',
];

export default function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState<'demo' | 'gemini' | null>(null);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isFresh = messages.length === 1;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, pending]);

  async function sendMessage(value: string) {
    const content = value.trim();
    if (!content || pending) return;
    const history = messages.filter((m) => m.id !== 'welcome');
    const userMessage: ChatMessage = { id: `${Date.now()}-user`, role: 'user', content };
    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setError('');
    setPending(true);

    try {
      let data: { reply: string; mode: 'demo' | 'gemini' };
      if (process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true') {
        await new Promise((resolve) => setTimeout(resolve, 350));
        data = { reply: getAssistantDemoReply(content), mode: 'demo' };
      } else {
        const response = await fetch('/api/assistant/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...history.map(({ role, content: text }) => ({ role, content: text })), { role: 'user', content }] }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'ส่งข้อความไม่สำเร็จ ลองอีกครั้งได้เลยค่ะ');
        data = result;
      }
      if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('ยังไม่ได้รับคำตอบจากผู้ช่วย ลองส่งอีกครั้งนะคะ');
      setMode(data.mode === 'gemini' ? 'gemini' : 'demo');
      setMessages((current) => [...current, { id: `${Date.now()}-assistant`, role: 'assistant', content: data.reply, mode: data.mode === 'gemini' ? 'gemini' : 'demo' }]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  function newChat() {
    if (messages.length > 1 && !window.confirm('เริ่มบทสนทนาใหม่? ข้อความในหน้านี้จะถูกล้าง')) return;
    setMessages([greeting]); setDraft(''); setError(''); setMode(null); inputRef.current?.focus();
  }

  return <div className="assistant-page">
    <div className="assistant-heading">
      <div><span className="eyebrow">YOUR STUDY COMPANION <span className="eyebrow-dot"/></span><h1>AI ผู้ช่วย <em>เรียนรู้</em></h1><p>ถาม ทบทวน และทำความเข้าใจเรื่องสุขภาพจิตได้ในพื้นที่เรียนรู้ที่ปลอดภัย</p></div>
      <button className="assistant-new-chat" onClick={newChat}><Plus size={15}/> เริ่มแชตใหม่</button>
    </div>

    <div className="assistant-layout">
      <section className="assistant-chat panel" aria-label="ห้องสนทนากับ AI">
        <header className="assistant-chat-head">
          <div className="assistant-bot-avatar"><Sparkles size={18}/></div>
          <div className="assistant-chat-title"><b>ผู้ช่วยการเรียนรู้</b><span><i/> {mode === 'gemini' ? 'เชื่อมต่อ Gemini แล้ว' : mode === 'demo' ? 'โหมดตัวอย่าง' : 'พร้อมช่วยทบทวนบทเรียน'}</span></div>
          <button className="assistant-icon-action" title="เริ่มบทสนทนาใหม่" onClick={newChat}><RotateCcw size={15}/></button>
        </header>
        <div className="assistant-thread" role="log" aria-live="polite">
          {messages.map((message) => <article key={message.id} className={`chat-message ${message.role}`}>
            <span className={`chat-avatar ${message.role}`}>{message.role === 'assistant' ? <Bot size={15}/> : <UserRound size={15}/>}</span>
            <div className="chat-message-body"><div className="chat-bubble">{message.content}</div>{message.role === 'assistant' && message.mode && <small>{message.mode === 'gemini' ? 'Gemini AI' : 'คำตอบตัวอย่าง'}</small>}</div>
          </article>)}
          {isFresh && <div className="prompt-suggestions"><span>ลองถามเรื่องเหล่านี้</span>{prompts.map((prompt) => <button key={prompt} onClick={() => void sendMessage(prompt)}>{prompt}<ArrowRight size={13}/></button>)}</div>}
          {pending && <div className="chat-message assistant"><span className="chat-avatar assistant"><Bot size={15}/></span><div className="chat-message-body"><div className="typing-bubble"><i/><i/><i/></div><small>กำลังเรียบเรียงคำตอบ</small></div></div>}
          <div ref={bottomRef}/>
        </div>
        {error && <div className="assistant-error" role="alert">{error}<button onClick={() => setError('')}>ปิด</button></div>}
        <form className="assistant-composer" onSubmit={handleSubmit}>
          <textarea ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} placeholder="พิมพ์คำถามที่อยากทบทวน..." rows={2} maxLength={2000} aria-label="พิมพ์ข้อความ" />
          <div className="assistant-composer-foot"><span>Enter เพื่อส่ง · Shift + Enter เพื่อขึ้นบรรทัดใหม่</span><button type="submit" disabled={!draft.trim() || pending} aria-label="ส่งข้อความ"><Send size={16}/> ส่งคำถาม</button></div>
        </form>
        <div className="assistant-disclaimer"><ShieldCheck size={14}/> ใช้เพื่อการเรียนรู้เท่านั้น ไม่ใช้แทนการประเมิน วินิจฉัย หรือดูแลผู้ป่วยจริง</div>
      </section>

      <aside className="assistant-side">
        <section className="assistant-side-card assistant-context-card"><div className="assistant-side-icon"><BookOpen size={17}/></div><span className="eyebrow">LEARNING CONTEXT</span><h2>พื้นที่เรียนรู้ของเรา</h2><p>ฝึกความเข้าใจและการสื่อสารกับผู้ป่วยจิตเวช ผ่านแนวคิดการเรียนรู้จากประสบการณ์และสถานการณ์จำลอง</p><div className="context-tags"><span>การสื่อสาร</span><span>ลดการตีตรา</span><span>สะท้อนคิด</span></div></section>
        <section className="assistant-side-card"><div className="assistant-side-title"><CircleHelp size={16}/><h3>หัวข้อที่ถามได้</h3></div><ul className="assistant-topics"><li>การสร้างสัมพันธภาพเพื่อการบำบัด</li><li>การรับฟังและสะท้อนความรู้สึก</li><li>การลดอคติและการตีตรา</li><li>การเรียนรู้จากประสบการณ์ของ Kolb</li></ul></section>
        <div className="assistant-privacy"><ShieldCheck size={16}/><span><b>คำนึงถึงความเป็นส่วนตัว</b><small>บทสนทนานี้ยังไม่ถูกบันทึกลงฐานข้อมูล</small></span></div>
        <Link className="assistant-scenario-link" href="/scenarios">ไปยังสถานการณ์ฝึก <ArrowRight size={14}/></Link>
      </aside>
    </div>
    <p className="assistant-footnote"><MessageCircle size={13}/> Prototype · คำตอบ AI อาจไม่ถูกต้องครบถ้วน ควรตรวจสอบกับอาจารย์หรือผู้เชี่ยวชาญ</p>
  </div>;
}
