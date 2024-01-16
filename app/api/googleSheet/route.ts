import { google } from 'googleapis';

import { NextResponse } from 'next/server';

const GOOGLE_CLIENT_EMAIL = process.env
  .NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL as string;
const GOOGLE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY as string;
const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID as string;

export async function POST(req: Request) {
  const body = await req.json();
  const cleanedPhoneNumber = body.phoneNumber.replace(/[+()\-]/g, '');

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'A1:H1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            body.date,
            body.userName,
            cleanedPhoneNumber,
            body.userMessage,
            body.utm_source,
            body.utm_medium,
            body.utm_campaign,
            body.utm_content,
          ],
        ],
      },
    });

    if (response.data) {
      return NextResponse.json({ status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
