import { useState } from 'react';

const Form = () => {
  const [summary, setSummary] = useState('');
  const [demand, setDemand] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/generateIndictment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ summary, demand }),
    });
    
    const data = await response.json();
    setResult(data.text);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Dilekçe Oluşturucuu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="summary" className="block font-medium mb-1">Olay Özetii</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="demand" className="block font-medium mb-1">Talepler</label>
          <textarea
            id="demand"
            value={demand}
            onChange={(e) => setDemand(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Gönder</button>
      </form>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Dilekçe</h2>
          <textarea
            value={result}
            readOnly
            className="w-full p-2 border rounded-md"
            rows={6}
          />
        </div>
      )}
    </div>
  );
};

export default Form;
