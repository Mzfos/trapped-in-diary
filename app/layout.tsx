import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Trapped in Diary — พื้นที่เรียนรู้ผ่านเรื่องเล่า', description: 'ฝึกทักษะการพยาบาลจิตเวชผ่านสถานการณ์จำลองและเรื่องเล่าแบบโต้ตอบ' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
