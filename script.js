// Translations Data
const translations = {
  en: JSON.parse(JSON.stringify(enTranslations)),
  ur: JSON.parse(JSON.stringify(urTranslations))
};

// Initialize with English as default
let currentLang = 'en';
let currentMarja = 'sistani';

// Currency Formatter
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

// Language Switcher
function switchLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.textContent = translations[lang][key];
  });
}

// Calculation Function
function calculateKhums(income, expenses) {
  const netSavings = parseFloat(income) - parseFloat(expenses);
  if(netSavings <= 0) return 0;
  return currentMarja === 'khamenei' ? netSavings * 0.18 : netSavings * 0.2;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  switchLanguage('en');
  
  document.getElementById('khumsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const income = document.getElementById('income').value;
    const expenses = document.getElementById('expenses').value;

    if(!income || !expenses) {
      alert(currentLang === 'en' ? 'Please fill all fields' : 'براہ کرم تمام فیلڈز بھریں');
      return;
    }

    const khums = calculateKhums(income, expenses);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `${translations[currentLang].result_text} <strong class="text-green-500">${formatter.format(khums)}</strong>`;
    resultDiv.classList.remove('hidden');
  });
});
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("لاگ ان میں خرابی:", error);
    }
}
