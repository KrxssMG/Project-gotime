// ==========================================
// ไฟล์ตั้งค่ากลาง Gotime Payroll (config.js)
// ==========================================
window.GOTIME_CONFIG = {
    SUPABASE_URL: 'https://ozkaaiqfhubfipblvpvf.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96a2FhaXFmaHViZmlwYmx2cHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4NTQ2NzUsImV4cCI6MjEwOTQzMDY3NX0.3hYkyH9AkBrdnOGyPSb5a98XKhvlm2ntfDmGZf69jgE', // <-- แก้แค่บรรทัดนี้บรรทัดเดียว!
    COMPANY_LAT: 15.544586,
    COMPANY_LNG: 102.703093,
    MAX_RADIUS_M: 50,
    ORG_QR_TOKEN: 'GOTIME-ORG-2026'
};

// สร้างตัวเชื่อมต่อ Supabase กลางให้ทั้ง index.html และ admin.html เรียกใช้
window.db = window.supabase.createClient(
    window.GOTIME_CONFIG.SUPABASE_URL,
    window.GOTIME_CONFIG.SUPABASE_ANON_KEY
);

// ฟังก์ชันคำนวณระยะห่างพิกัด GPS (Haversine Formula หน่วยเป็นเมตร)
window.calcDistanceMeters = function(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const toRad = deg => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// ฟังก์ชันใส่ Spinner โหลดบนปุ่มอัตโนมัติ (แก้ปัญหาเว็บดูค้างตอนยิงข้อมูลไป Supabase)
window.runWithLoading = async function(btn, loadingText, taskFn) {
    if (!btn) return await taskFn();
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin mr-1.5"></i>${loadingText}`;
    try {
        await taskFn();
    } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
        btn.innerHTML = originalHTML;
    }
};

// แปลงเวลาเป็นรูปแบบไทย
window.formatTimeTH = function(isoStr) {
    if (!isoStr) return '-';
    return new Date(isoStr).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};