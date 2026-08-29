// script.js - सिर्फ कोडिंग और लॉजिक

const SUPABASE_URL = 'https://neybyzqjnqmbbjxruzdv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leWJ5enFqbnFtYmJqeHJ1emR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzOTY0NDcsImV4cCI6MjEwMDk3MjQ0N30.upk2GSCavQEMGp1pzgbsbV-6Pe0I54n2gYlJRmqYXOY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. पेज स्विच करने का लॉजिक (लॉगिन से फॉरगॉट पासवर्ड)
document.getElementById('showForgot').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('forgotSection').classList.add('active');
});

document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgotSection').classList.remove('active');
    document.getElementById('loginSection').classList.add('active');
});

// 2. लॉगिन करने का असली सुरक्षित लॉजिक (Supabase के साथ)
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // पेज को रिफ्रेश होने से रोकें
    
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');

    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> लॉगिन हो रहा है...";
    loginBtn.disabled = true;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput,
        });

        if (error) throw error; // अगर पासवर्ड गलत हो तो यहीं रोक दें

        loginBtn.innerHTML = "<i class='fas fa-check-circle'></i> सफल! डैशबोर्ड खुल रहा है...";
        
        // डैशबोर्ड पर भेजने से पहले आधा सेकंड रुकें ताकि टोकन सेव हो सके
        setTimeout(() => {
            window.location.href = 'agent.html';
        }, 500);

    } catch (error) {
        alert("लॉगिन फेल: ईमेल या पासवर्ड गलत है!");
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }
});

// 3. पासवर्ड रीसेट करने का लॉजिक
document.getElementById('forgotForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const resetBtn = document.getElementById('resetBtn');

    resetBtn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> भेज रहे हैं...";
    resetBtn.disabled = true;

    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;

        alert("पासवर्ड रीसेट लिंक आपकी ईमेल पर भेज दिया गया है!");
        document.getElementById('showLogin').click(); // वापस लॉगिन पर भेजें
    } catch (error) {
        alert("एरर: " + error.message);
    } finally {
        resetBtn.innerHTML = "<i class='fas fa-envelope'></i> रीसेट लिंक भेजें";
        resetBtn.disabled = false;
    }
});
