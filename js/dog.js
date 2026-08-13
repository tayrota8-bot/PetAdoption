let allDogs = [];
let editingId = null;

async function loadDogs(search = '') {
  const grid = document.getElementById('dogs-grid');
  const count = document.getElementById('result-count');
  grid.innerHTML = '<div class="loading">Loading dogs...</div>';
  try {
    allDogs = await api.getDogs(search);
    applyFilters();
  } catch {
    grid.innerHTML = '<div class="empty-state">Could not load dogs.</div>';
  }
}

function applyFilters() {
  const size = document.getElementById('size-filter').value;
  const gender = document.getElementById('gender-filter').value;
  const grid = document.getElementById('dogs-grid');
  const count = document.getElementById('result-count');

  let dogs = allDogs;
  if (size) dogs = dogs.filter(d => d.size === size);
  if (gender) dogs = dogs.filter(d => d.gender === gender);

  count.textContent = `Showing ${dogs.length} of ${allDogs.length} dogs`;

  if (dogs.length === 0) {
    grid.innerHTML = '<div class="empty-state">No dogs match your filters.</div>';
    return;
  }

  grid.innerHTML = dogs.map(dogCardHTML).join('');
}

function dogCardHTML(dog) {
  const traits = (dog.personality || '').split(',').slice(0, 2);
  return `
    <div class="dog-card" id="card-${dog.id}">
      <img src="${dog.imageUrl || 'https://placehold.co/400x300?text=' + dog.name}" alt="${dog.name}" loading="lazy" onerror="this.src='https://placehold.co/400x300?text=${dog.name}'">
      <div class="dog-card-body">
        <div class="dog-card-header">
          <div>
            <div class="dog-card-name">${dog.name}</div>
            <div class="dog-card-breed">${dog.breed}</div>
          </div>
          <span class="badge badge-primary">${dog.adoptionFee || ''}</span>
        </div>
        <div class="dog-card-badges">
          <span class="badge badge-outline">${dog.age || ''}</span>
          <span class="badge badge-outline">${dog.gender || ''}</span>
          <span class="badge badge-outline">${dog.size || ''}</span>
        </div>
        <p class="dog-card-desc">${dog.description || ''}</p>
       <div class="dog-card-actions">
  <a href="dog-detail.html?id=${dog.id}" class="btn btn-outline btn-sm">Details</a>
</div>
      </div>
    </div>`;
}





function fillForm(dog) {
  document.getElementById('f-name').value = dog.name || '';
  document.getElementById('f-breed').value = dog.breed || '';
  document.getElementById('f-age').value = dog.age || '';
  document.getElementById('f-gender').value = dog.gender || '';
  document.getElementById('f-size').value = dog.size || '';
  document.getElementById('f-fee').value = dog.adoptionFee || '';
  document.getElementById('f-image').value = dog.imageUrl || '';
  document.getElementById('f-personality').value = dog.personality || '';
  document.getElementById('f-medical').value = dog.medicalInfo || '';
  document.getElementById('f-desc').value = dog.description || '';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

document.getElementById('dog-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('f-name').value,
    breed: document.getElementById('f-breed').value,
    age: document.getElementById('f-age').value,
    gender: document.getElementById('f-gender').value,
    size: document.getElementById('f-size').value,
    adoptionFee: document.getElementById('f-fee').value,
    imageUrl: document.getElementById('f-image').value,
    personality: document.getElementById('f-personality').value,
    medicalInfo: document.getElementById('f-medical').value,
    description: document.getElementById('f-desc').value,
  };

  try {
    if (editingId) {
      await api.updateDog(editingId, data);
      
    } else {
      await api.createDog(data);
      
    }
    closeModal();
    loadDogs();
  } catch {
    
  }
});

function showToast(msg, error = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (error ? ' toast-error' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

let searchTimer;
document.getElementById('search-input').addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => loadDogs(e.target.value), 300);
});

document.getElementById('size-filter').addEventListener('change', applyFilters);
document.getElementById('gender-filter').addEventListener('change', applyFilters);

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) closeModal();
});

document.addEventListener('DOMContentLoaded', () => loadDogs());