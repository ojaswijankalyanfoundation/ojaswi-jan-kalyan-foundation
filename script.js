const SUPABASE_URL = 'https://neybyzqjnqmbbjxruzdv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leWJ5enFqbnFtYmJqeHJ1emR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzOTY0NDcsImV4cCI6MjEwMDk3MjQ0N30.upk2GSCavQEMGp1pzgbsbV-6Pe0I54n2gYlJRmqYXOY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function submitLead(event) {
    // 1. यह पेज को रिफ्रेश होने से रोकेगा
    event.preventDefault(); 
    
    // 2. टेस्टिंग अलर्ट: अगर यह दिखा, तो मतलब फाइल जुड़ गई!
    alert("बधाई हो! आपका कोड कनेक्ट हो गया है। अब डेटा जा रहा है...");
    
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
        msgBox.innerText = "✅ आपकी रिक्वेस्ट सफलतापूर्वक भेज दी गई है!";
        document.getElementById('leadForm').reset();
        btn.innerText = "सबमिट करें";
        btn.disabled = false;
    }
}
