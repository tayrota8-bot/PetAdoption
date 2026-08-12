document.getElementById('adopt-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  const data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    zip: document.getElementById('zip').value,
    homeType: document.getElementById('homeType').value,
    hasYard: document.getElementById('hasYard').checked,
    hasPets: document.getElementById('hasPets').value,
    experience: document.getElementById('experience').value,
    reason: document.getElementById('reason').value,
  };

  try {
    await api.submitAdoption(data);
    document.getElementById('form-wrap').style.display = 'none';
    document.getElementById('success-wrap').style.display = 'block';
  } catch {
    alert('Submission failed. Please try again.');
    btn.disabled = false;
    btn.textContent = 'Submit Application';
  }
});