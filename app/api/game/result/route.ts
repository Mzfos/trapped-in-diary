import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.userId !== 'string' || typeof body.scenarioId !== 'string' ||
        typeof body.score !== 'number' || typeof body.completed !== 'boolean' ||
        typeof body.playTime !== 'number') {
      return NextResponse.json({ message: 'ข้อมูลผลการเล่นไม่ถูกต้อง' }, { status: 400 });
    }

    // Mock API adapter: replace this response with a call to the backend service.
    return NextResponse.json({ accepted: true, result: body }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'ไม่สามารถอ่านข้อมูลผลการเล่นได้' }, { status: 400 });
  }
}
