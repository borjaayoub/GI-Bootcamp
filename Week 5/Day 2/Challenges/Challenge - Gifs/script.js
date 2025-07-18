const apikey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const limit = 1;

function updateDeleteAllVisibility() {
  const gifContainer = document.getElementById('gifContainer');
  const deleteAllBtn = document.getElementById('deleteAllBtn');
  if (gifContainer && deleteAllBtn) {
    if (gifContainer.children.length === 0) {
      deleteAllBtn.style.display = 'none';
    } else {
      deleteAllBtn.style.display = '';
    }
  }
}

document.getElementById('btn').onclick = function(e) {
  e.preventDefault();
  const query = document.getElementById('categoryInput').value;
  if (!query) return;

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${encodeURIComponent(query)}&limit=${limit}`;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let gifContainer = document.getElementById('gifContainer');
      if (!gifContainer) {
        gifContainer = document.createElement('div');
        gifContainer.id = 'gifContainer';
        document.body.appendChild(gifContainer);
      }
      // Create DELETE ALL button if it doesn't exist
      let deleteAllBtn = document.getElementById('deleteAllBtn');
      if (!deleteAllBtn) {
        deleteAllBtn = document.createElement('button');
        deleteAllBtn.id = 'deleteAllBtn';
        deleteAllBtn.textContent = 'DELETE ALL';
        deleteAllBtn.onclick = function() {
          gifContainer.innerHTML = '';
          updateDeleteAllVisibility();
        };
        document.body.insertBefore(deleteAllBtn, gifContainer);
      }
      if (data.data && data.data.length > 0) {
        // Create a wrapper for each gif and its delete button
        const gifWrapper = document.createElement('div');
        gifWrapper.style.display = 'inline-block';
        gifWrapper.style.margin = '10px';

        const img = document.createElement('img');
        img.src = data.data[0].images.original.url;
        img.alt = query + ' gif';
        img.style.display = 'block';
        img.style.maxWidth = '200px';
        img.style.maxHeight = '200px';

        // Create DELETE button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'DELETE';
        delBtn.onclick = function() {
          gifWrapper.remove();
          updateDeleteAllVisibility();
        };

        gifWrapper.appendChild(img);
        gifWrapper.appendChild(delBtn);
        gifContainer.appendChild(gifWrapper);
        updateDeleteAllVisibility();
      } else {
        // Optionally, show a message for no GIF found
        alert('No GIF found.');
      }
    });
};