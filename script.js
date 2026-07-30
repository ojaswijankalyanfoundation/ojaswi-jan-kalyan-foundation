// Supabase की डिटेल्स
const SUPABASE_URL = 'https://neybyzqjnqmbbjxruzdv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leWJ5enFqbnFtYmJqeHJ1emR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzOTY0NDcsImV4cCI6MjEwMDk3MjQ0N30.upk2GSCavQEMGp1pzgbsbV-6Pe0I54n2gYlJRmqYXOY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// फॉर्म सबमिट होने का कोड
document.getElementById('leadForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // ⚠️ पेज को रिफ्रेश होने से रोकना
    
    const btn = document.getElementById('submitBtn');
    const msgBox = document.getElementById('statusMessage');
    
    btn.innerText = "कृपया प्रतीक्षा करें...";
    btn.disabled = true;
    
    const leadData = {
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        pincode: document.getElementById('pincode').value,
        scheme_name: document.getElementById('scheme').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value
    };

    const { data, error } = await supabase.from('leads').insert([leadData]);

    if (error) {
        msgBox.style.color = "red";
        msgBox.innerText = "कुछ गड़बड़ हो गई: " + error.message;
        btn.innerText = "सबमिट करें";
        btn.disabled = false;
    } else {
        msgBox.style.color = "green";
        msgBox.innerText = "✅ आपकी रिक्वेस्ट सफलतापूर्वक भेज दी गई है! हमारे एजेंट जल्द ही आपसे संपर्क करेंगे।";
        document.getElementById('leadForm').reset(); // फॉर्म खाली करना
        btn.innerText = "सबमिट करें";
        btn.disabled = false;
    }
});
