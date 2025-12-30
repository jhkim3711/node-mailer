'use client';
import { useState } from 'react';

export default function MailPage() {
  const [form, setForm] = useState({ to: '', cc: '', subject: '', content: '' });
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('발송 중...');
    const res = await fetch('/api/send-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    setStatus(result.success ? '✅ 발송 완료!' : '❌ 실패: ' + result.error);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">메일 보내기 (AWS SES)</h1>
        <form onSubmit={handleSend} className="space-y-4">
          <input type="email" placeholder="받는 사람" required className="w-full p-3 border rounded-lg"
            onChange={e => setForm({...form, to: e.target.value})} />
          <input type="email" placeholder="참조 (선택)" className="w-full p-3 border rounded-lg"
            onChange={e => setForm({...form, cc: e.target.value})} />
          <input type="text" placeholder="제목" required className="w-full p-3 border rounded-lg"
            onChange={e => setForm({...form, subject: e.target.value})} />
          <textarea placeholder="내용을 입력하세요" required rows="6" className="w-full p-3 border rounded-lg"
            onChange={e => setForm({...form, content: e.target.value})} />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            보내기
          </button>
        </form>
        {status && <p className="mt-4 text-center font-medium">{status}</p>}
      </div>
    </main>
  );
}
