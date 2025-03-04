// Translations Data
const translations = {
    en: {
        select_marja: "Select Jurist",
        income_placeholder: "Annual Income (USD)",
        expenses_placeholder: "Expenses (USD)",
        calculate_btn: "Calculate Khums",
        result_text: "Khums Payable:",
        download_btn: "Download PDF"
    },
    ur: {
        select_marja: "مرجع منتخب کریں",
        income_placeholder: "سالانہ آمدنی (امریکی ڈالر)",
        expenses_placeholder: "خرچے (امریکی ڈالر)",
        calculate_btn: "خُمس حساب کریں",
        result_text: "واجب خُمس:",
        download_btn: "پی ڈی ایف ڈاؤنلوڈ کریں"
    }
};

// App State
let currentLanguage = 'en';
let selectedMarja = 'sistani';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Marja Selection
    document.querySelectorAll('.marja-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.marja-btn').forEach(b => b.classList.remove('bg-green-200'));
            e.target.classList.add('bg-green-200');
            selectedMarja = e.target.dataset.marja;
        });
    });

    // Form Submission
    document.getElementById('khumsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        calculateKhums();
    });

    updateTranslations();
});

// Language Switcher
function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.dir = lang === 'ur' ? 'rtl' : 'ltr';
    updateTranslations();
}

// Update All Translations
function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        element.textContent = translations[currentLanguage][key];
    });
}

// Calculate Khums
function calculateKhums() {
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);

    if (!income || !expenses) {
        alert(currentLanguage === 'en' ? "Please fill all fields!" : "براہ کرم تمام فیلڈز بھریں!");
        return;
    }

    const khums = (income - expenses) * (selectedMarja === 'sistani' ? 0.2 : 0.18);
    document.getElementById('khumsAmount').textContent = khums.toFixed(2);
    document.getElementById('results').classList.remove('hidden');
}
// Add to your script.js
const categoryRules = {
  salary: { taxable: true, needsDeduction: true },
  gift: { 
    taxable: (amount) => amount > 2000, // Example threshold
    needsDeduction: false
  },
  inheritance: {
    taxable: true,
    deductiblePortion: 0.3 // 30% exempt
  },
  property: {
    taxable: function() {
      return !document.getElementById('essentialProperty').checked;
    }
  },
  investment: { taxable: true, flatRate: 0.2 },
  other: { taxable: true }
};

function calculateByCategory() {
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  let taxableAmount = amount;

  // Apply category-specific rules
  switch(category) {
    case 'gift':
      if(amount <= 2000) taxableAmount = 0;
      break;
      
    case 'inheritance':
      taxableAmount = amount * 0.7; // 30% exempt
      break;

    case 'property':
      if(categoryRules.property.taxable()) {
        taxableAmount = amount;
      } else {
        taxableAmount = 0;
      }
      break;
  }

  return taxableAmount * 0.2; // 20% Khums
}

// Update UI based on category selection
document.getElementById('category').addEventListener('change', function() {
  document.getElementById('propertyType').classList.toggle('hidden', this.value !== 'property');
});
// Add Marja check to rules
if(selectedMarja === 'khamenei' && category === 'gift') {
  taxableThreshold = 5000; // Different threshold for Khamenei
}
