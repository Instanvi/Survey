import { NextResponse } from "next/server";

import { buildSheetRow, getSheetHeaders } from "@/lib/sheet-columns";

/**
 * Forwards payload to a Google Apps Script Web App (or any webhook) so rows
 * can be appended to a spreadsheet.
 *
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script → paste a doPost that reads JSON and appendsRow.
 * 3. Deploy → Web app → execute as you, accessible to anyone (or add a secret).
 * 4. Set GOOGLE_SHEETS_WEB_APP_URL in .env.local to the deployment URL.
 *
 * Forwards `sheetHeaders` + `sheetRow` (one cell per answer + meta). See `lib/sheet-columns.ts`.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const url = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  if (!url) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      message:
        "GOOGLE_SHEETS_WEB_APP_URL is not set; answers were not forwarded to Google Sheets.",
    });
  }

  const base =
    body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  const forward = {
    ...base,
    sheetHeaders: getSheetHeaders(),
    sheetRow: buildSheetRow(base as Parameters<typeof buildSheetRow>[0]),
  };

  try {
    const secret = process.env.SHEETS_WEBHOOK_SECRET;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "x-webhook-secret": secret } : {}),
      },
      body: JSON.stringify(forward),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: text || `Webhook returned ${res.status}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Forward failed",
      },
      { status: 502 },
    );
  }
}
