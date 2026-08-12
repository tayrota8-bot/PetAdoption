async function loadDog() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { location.href = 'dogs.html'; return; }

  try {
    const dog = await api.getDog(id);
    renderDog(dog);
  } catch {
    document.getElementById('detail-container').innerHTML =
      '<div class="empty-state">Dog not found. <a href="dogs.html" style="color:#3b82f6">Back to dogs</a></div>';
  }
}

function renderDog(dog) {
  document.title = `${dog.name} — PawsRescue`;
  const traits = (dog.personality || '').split(',').filter(Boolean);

  document.getElementById('detail-container').innerHTML = `
    <button class="back-btn" onclick="history.back()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      Back
    </button>

    <div class="detail-grid">
      <div class="detail-img">
        <img src="${dog.imageUrl || 'https://placehold.co/600x600?text=' + dog.name}" alt="${dog.name}" onerror="this.src='https://placehold.co/600x600?text=${dog.name}'">
      </div>

      <div class="detail-info">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem">
          <div>
            <div class="detail-name">${dog.name}</div>
            <div class="detail-breed">${dog.breed}</div>
          </div>
          <span class="badge badge-primary" style="font-size:1rem;padding:0.4rem 1rem">${dog.adoptionFee || ''}</span>
        </div>

        <div class="detail-meta">
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <div><div class="meta-label">Age</div><div class="meta-value">${dog.age || '—'}</div></div>
          </div>
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div><div class="meta-label">Gender</div><div class="meta-value">${dog.gender || '—'}</div></div>
          </div>
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 3H3v7l9 9 9-9V3z"/><line x1="9" y1="9" x2="9" y2="9"/></svg>
            <div><div class="meta-label">Size</div><div class="meta-value">${dog.size || '—'}</div></div>
          </div>
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <div><div class="meta-label">Medical</div><div class="meta-value">Up to date</div></div>
          </div>
        </div>

        <div style="margin-bottom:1.25rem">
          <div style="font-size:0.9rem;font-weight:600;margin-bottom:0.5rem">Personality</div>
          <div class="personality-tags">
            ${traits.map(t => `<span class="badge badge-primary">${t.trim()}</span>`).join('')}
          </div>
        </div>

        <a href="adopt.html" class="btn btn-primary btn-lg btn-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Apply to Adopt ${dog.name}
        </a>
      </div>
    </div>

    <div class="detail-panels">
      <div class="panel">
        <h2>About ${dog.name}</h2>
        <p>${dog.description || 'No description available.'}</p>
      </div>
      <div class="panel">
        <h2>Medical Information</h2>
        <p>${dog.medicalInfo || 'Information not available.'}</p>
        <div class="medical-note">
          <strong style="color:#fff">Note:</strong> All our dogs receive complete medical care before adoption, including vaccinations, spay/neuter surgery, and microchipping.
        </div>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', loadDog);