const CONFIG = {
    SUPABASE_URL: 'https://ozkaaiqfhubfipblvpvf.supabase.co/rest/v1/',
    SUPABASE_KEY: 'sb_publishable_VjbJf-m0xPpkErymktQF3w_dKxjQXMB',
    OFFICE_LAT: 14.3532,       // ละติจูดจุดศูนย์กลางบริษัท
    OFFICE_LNG: 100.5684,      // ลองจิจูดจุดศูนย์กลางบริษัท
    MAX_RADIUS_METERS: 50,     // รัศมีที่อนุญาตให้เช็คอิน (เมตร)
    SHIFT_END_HOUR: 18         // เวลาปลดล็อกปุ่มเลิกงาน (18 = 18:00 น.)
};

const isConfigured = CONFIG.SUPABASE_URL.startsWith('http');
const db = isConfigured ? window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY) : null;