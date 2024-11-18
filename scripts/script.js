const article = document.querySelector('article')
const key = '79697bbc60444a72b2d951cef9e404fe'
const api = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${key}`

try {
    fetch(api)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const lastVisit = getLastVisit()
        showVisitTime(lastVisit)
        showArticles(data, new Date(lastVisit))
    })
} catch (error) {
    console.log(error);
}

function showArticles(obj, lastVisitDate) {
    const articles = obj.articles
    for (const newsItem of articles) {
        const div = document.createElement('div')
        
        // Check if article is new
        const publishDate = new Date(newsItem.publishedAt)
        const isNew = publishDate > lastVisitDate
        
        if (isNew) {
            const newBadge = document.createElement('span')
            newBadge.className = 'new-badge'
            newBadge.textContent = 'NEW'
            div.appendChild(newBadge)
        }

        const img = document.createElement('img')
        img.src = newsItem.urlToImage
        img.alt = newsItem.title || 'News image';
        img.style.width = '100%'
        div.appendChild(img)

        const h2 = document.createElement('h2')
        h2.textContent = newsItem.title
        div.appendChild(h2)

        const p = document.createElement('p')
        p.textContent = newsItem.description
        div.appendChild(p)

        const span = document.createElement('span')
        const formattedDate = new Date(newsItem.publishedAt).toLocaleString()
        span.textContent = `(${formattedDate})`
        div.appendChild(span)

        const a = document.createElement('a')
        a.href = newsItem.url
        a.textContent = 'Read more'
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        div.appendChild(a)

        article.appendChild(div)
    }
}

function getLastVisit() {
    const previousVisit = localStorage.getItem('lastVisit');
    const currentVisit = new Date().toLocaleString()
    localStorage.setItem('lastVisit', currentVisit)
    return previousVisit || currentVisit
}

function showVisitTime(message) {
    const lastVisitElement = document.getElementById('last-visit')
    lastVisitElement.textContent = 'Last visit: ' + message
}
