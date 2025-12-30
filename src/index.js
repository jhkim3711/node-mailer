// src/index.js
const express = require('express');
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 클라이언트 초기화
const sesClient = new SESClient({ region: process.env.AWS_REGION || 'ap-northeast-2' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/api/send-mail', async (req, res) => {
  const { to, cc, subject, content } = req.body;

  try {
    // 1. AWS SES 메일 발송
    const sesCommand = new SendEmailCommand({
      Destination: { ToAddresses: [to], CcAddresses: cc ? [cc] : [] },
      Message: {
        Body: { Html: { Data: content } },
        Subject: { Data: subject },
      },
      Source: process.env.SES_SENDER_EMAIL,
    });
    await sesClient.send(sesCommand);

    // 2. Supabase 저장
    const { error: dbError } = await supabase
      .from('mail_logs')
      .insert([{ to_email: to, cc_email: cc, subject, content }]);

    if (dbError) throw dbError;

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => console.log(`Server is running on ${port}`));
