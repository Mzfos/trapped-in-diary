import Portal from '../portal';
export default function RoutedPage() { return <Portal />; }

import Portal from '../portal';

// เพิ่มฟังก์ชัน 3 บรรทัดนี้เข้าไปเพื่อให้ Build ผ่าน
export function generateStaticParams() {
  return []; 
}

export default function RoutedPage() { 
  return <Portal />; 
}