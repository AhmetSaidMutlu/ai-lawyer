import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from './openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { summary, demand } = req.body;

  if (!summary || !demand) {
    return res.status(400).json({ text: 'Olay özeti ve talepler gereklidir.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Bir avukat gibi hareket et ve dilekçeye çevir.' },
        { role: 'user', content: `Olay Özeti: ${summary}, Talepler: ${demand}` },
      ],
    });

    // Gelen yanıtın doğru şekilde işlenmesi:
    const generatedText = completion.choices[0]?.message?.content ?? 'Dilekçe oluşturulamadı.';
    
    res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ text: 'Dilekçe oluşturulurken bir hata oluştu.' });
  }
}
