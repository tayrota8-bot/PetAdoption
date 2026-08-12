async function loadFeaturedDogs() {
  const grid = document.getElementById('featured-grid');
  try {
    const dogs = await api.getDogs();
    const featured = dogs.slice(0, 3);
    grid.innerHTML = featured.map(dogCardHTML).join('');
  } catch {
    grid.innerHTML = '<p class="empty-state">Could not load dogs.</p>';
  }
}

function dogCardHTML(dog) {
  const traits = (dog.personality || '').split(',').slice(0, 2);
  return `
    <div class="dog-card">
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
          <a href="dog-detail.html?id=${dog.id}" class="btn btn-primary btn-sm" style="flex:1;justify-content:center">View Details</a>
        </div>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', loadFeaturedDogs);