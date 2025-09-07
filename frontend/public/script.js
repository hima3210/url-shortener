document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('urlForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const urlsList = document.getElementById('urlsList');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const originalUrl = document.getElementById('originalUrl').value;
        
        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ original_url: originalUrl })
            });

            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }

            const data = await response.json();
            
            showResult(data);
            document.getElementById('originalUrl').value = '';
            loadUrls();
            
        } catch (error) {
            showError('Error shortening URL. Please try again.');
        }
    });

    function showResult(data) {
        const shortUrl = `http://localhost:8000/${data.short_code}/`;
        resultDiv.innerHTML = `
            <h3>Success!</h3>
            <p><strong>Original URL:</strong> ${data.original_url}</p>
            <p><strong>Short URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
            <p><strong>Short Code:</strong> ${data.short_code}</p>
        `;
        resultDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    }

    function showError(message) {
        errorDiv.innerHTML = `<h3>Error</h3><p>${message}</p>`;
        errorDiv.style.display = 'block';
        resultDiv.style.display = 'none';
    }

    async function loadUrls() {
        try {
            const response = await fetch('/api/urls');
            const urls = await response.json();
            
            urlsList.innerHTML = '';
            
            urls.forEach(url => {
                const urlItem = document.createElement('div');
                urlItem.className = 'url-item';
                
                const shortUrl = `http://localhost:8000/${url.short_code}/`;
                const createdDate = new Date(url.created_at).toLocaleString();
                
                urlItem.innerHTML = `
                    <div>
                        <a href="${shortUrl}" target="_blank" class="short-url">${shortUrl}</a>
                    </div>
                    <div class="original-url">${url.original_url}</div>
                    <div class="stats">
                        Created: ${createdDate} | Clicks: ${url.clicks}
                    </div>
                `;
                
                urlsList.appendChild(urlItem);
            });
            
        } catch (error) {
            console.error('Error loading URLs:', error);
        }
    }

    loadUrls();
});