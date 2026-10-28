# Trapped in Diary

พอร์ทัลต้นแบบสำหรับการเรียนรู้การพยาบาลจิตเวชผ่านสถานการณ์จำลอง ใช้ Next.js App Router, TypeScript, Tailwind CSS และข้อมูล Mock เพื่อให้ต่อ REST API และ GameMaker HTML5/Web Build ได้ในภายหลัง

## เริ่มใช้งาน

ต้องติดตั้ง Node.js 20.9 ขึ้นไปก่อน จากนั้นเปิด Terminal ในโฟลเดอร์โปรเจกต์และรัน:

```bash
npm.cmd install
npm.cmd run dev
```

เปิด `http://localhost:3000` ในเบราว์เซอร์

## หน้าสำคัญ

- `/` หน้าแนะนำโครงการ
- `/login` และ `/register` หน้าตัวอย่างการเข้าสู่ระบบและสมัครสมาชิก
- `/dashboard` ภาพรวมผู้เรียน
- `/scenarios` และ `/scenarios/SC001` คลังและรายละเอียดสถานการณ์
- `/assistant` AI Learning Assistant สำหรับทบทวนเรื่องการสื่อสารเชิงบำบัดและการลดการตีตรา
- `/game/SC001` หน้าจำลองสำหรับเล่นและเชื่อมต่อ GameMaker ภายหลัง
- `/results`, `/analytics`, `/profile` ผลการเรียน การวิเคราะห์ และโปรไฟล์
- `/admin/dashboard`, `/admin/users`, `/admin/lessons`, `/admin/scenarios`, `/admin/analytics` หน้าผู้ดูแลระบบ

การเข้าสู่ระบบเป็น mock: เลือกบทบาทในหน้า Login แล้วส่งฟอร์มเพื่อเปิด Dashboard ตามบทบาท ไม่มีการตรวจบัญชีหรือบันทึกข้อมูลกับเซิร์ฟเวอร์

## AI Learning Assistant

หน้า `/assistant` บน GitHub Pages ใช้คำตอบตัวอย่างในเครื่อง ไม่ต้องมีฐานข้อมูลหรือ API key ส่วนการรัน Next.js บนเครื่องยังเปิดใช้ Gemini ได้ โดยคัดลอก `.env.local.example` เป็น `.env.local` ใส่ `GEMINI_API_KEY` แล้วเริ่มเซิร์ฟเวอร์ใหม่ ค่าเริ่มต้นของโมเดลอยู่ใน `GEMINI_MODEL`

บทสนทนายังไม่ถูกจัดเก็บลงฐานข้อมูล และระบบ RAG ยังไม่เชื่อมต่อ คำตอบในหน้านี้มีไว้เพื่อการเรียนรู้เท่านั้น ไม่ใช้แทนการประเมินหรือดูแลผู้ป่วยจริง

## เชื่อมต่อเกม GameMaker

คัดลอกไฟล์ GameMaker HTML5/Web Build ไปไว้ใน `public/game-build/` แล้วกำหนด URL ใน `.env.local`:

```env
NEXT_PUBLIC_GAMEMAKER_GAME_URL=/game-build/index.html
```

หน้า `/game/[scenarioId]` จะแสดง build ใน iframe แบบ responsive และรองรับเต็มหน้าจอ GitHub Pages จะแสดงพื้นที่ตัวอย่างและจำลองผลการเล่นโดยไม่บันทึกลงฐานข้อมูล

## GitHub Pages

Workflow ใน `.github/workflows/nextjs.yml` สร้าง static prototype และเผยแพร่เมื่อ push ไปที่ `main` ไปที่ **Repository Settings → Pages** แล้วตั้ง **Build and deployment → Source** เป็น **GitHub Actions** จากนั้นดูสถานะที่แท็บ **Actions** เมื่อเสร็จแล้วเว็บจะอยู่ที่ `https://mzfos.github.io/trapped-in-diary/`

GitHub Pages ใช้แสดงต้นแบบแบบ static เท่านั้น: แชต AI ใช้คำตอบตัวอย่าง เกมยังเป็น placeholder และไม่มีการบันทึกข้อมูลจริง
