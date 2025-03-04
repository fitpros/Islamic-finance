// مراجع کا ڈیٹا (public/maraja/.. سے fetch کیا جا سکتا ہے)
const maraja = {
    sistani: {
        name: "آیت اللہ سیستانی",
        khumsRate: 0.2,
        conditions: {
            jewelryNisab: 5000000, // 50 لاکھ روپے
            debtDeduction: true
        }
    },
    khamenei: {
        name: "رہبر معظم خامنہ ای",
        khumsRate: 0.2,
        conditions: {
            expensePercentage: 0.7 // 70% تک
        }
    }
};

// Initialize App
let currentMarja = 'sistani';
let darkMode = false;

// مرجع سلیکٹر بنائیں
function renderMaraja() {
    const container = document.getElementById('marajaSelector');
    container.innerHTML = Object.entries(maraja).map(([key, marja]) => `
        <div class="marja-card" data-marja="${key}" onclick="selectMarja('${key}')">
            <h3 class="font-bold">${marja.name}</h3>
            <p class="text-sm text-gray-600">${marja.conditions.jewelryNisab ? 'زیورات نصاب: ' + marja.conditions.jewelryNisab : ''}</p>
        </div>
    `).join('');
}

// خُمس کیلکولیٹ کریں
function calculateKhums(income, expenses) {
    const marjaData = maraja[currentMarja];
    let taxable = income - expenses;
    
    if(marjaData.conditions?.expensePercentage) {
        taxable = income - (expenses * marjaData.conditions.expensePercentage);
    }
    
    return taxable > 0 ? taxable * marjaData.khumsRate : 0;
}

// ایونٹ لسٹنرز
document.getElementById('khumsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    
    if(!income || !expenses) {
        alert('برائے مہربانی تمام فیلڈز بھریں');
        return;
    }

    const khums = calculateKhums(income, expenses);
    document.getElementById('khumsAmount').textContent = khums.toLocaleString();
    document.getElementById('results').classList.remove('hidden');
});

// Initial Render
renderMaraja();
// PDF جنریٹر (jsPDF لائبریری استعمال کریں)
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text(`خُمس رپورٹ (${maraja[currentMarja].name})`, 10, 10);
    doc.text(`واجب خُمس: ${document.getElementById('khumsAmount').textContent}`, 10, 20);
    doc.save('khums-report.pdf');
}

document.getElementById('downloadPDF').addEventListener('click', generatePDF);
// Firebase Authentication مثال
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = { /* آپ کی کنفیگریشن */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// لاگ ان فنکشن
async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("لاگ ان میں خرابی:", error);
    }
}
