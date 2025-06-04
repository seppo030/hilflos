
document.getElementById('heForm').addEventListener('submit', function(e){
  e.preventDefault();
  const resident = document.getElementById('resident').checked;
  const ahv = document.getElementById('ahvRenter').checked;
  const help = document.getElementById('needHelp').checked;
  const otherIns = document.getElementById('otherIns').checked;
  const living = this.querySelector('input[name="living"]:checked')?.value;
  const grade  = this.querySelector('input[name="grade"]:checked')?.value;
  const result = document.getElementById('result');

  // Grundprüfung
  if(!resident || !ahv || !help){
    result.textContent = 'Voraussetzungen nicht erfüllt ➔ kein Anspruch.';
    result.style.color = '#c00';
    return;
  }
  if(!otherIns){
    // user didn't tick 'I do NOT receive other ins' means they might have other ins? 
    // For simplicity ask that they tick
    result.textContent = 'Bitte bestätigen Sie, dass Sie keine andere Hilflosenentschädigung beziehen.';
    result.style.color = '#c00';
    return;
  }

  // Beträge (Stand 01.01.2025)
  const amounts = { light:252, medium:630, severe:1008 }; // CHF pro Monat
  let entitlement = 0;

  if(grade === 'light' && living === 'institution'){
    result.textContent = 'Bei leichter Hilflosigkeit während eines Heimaufenthalts besteht kein Anspruch.';
    result.style.color = '#c00';
    return;
  }
  entitlement = amounts[grade];

  result.textContent = `Voraussichtliche Hilflosenentschädigung: CHF ${entitlement.toLocaleString('de-CH')} pro Monat.`;
  result.style.color = '#006400';
});
