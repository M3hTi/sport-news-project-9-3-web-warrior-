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
        showArticles(data)
    })
} catch (error) {
    console.log(error);
}

function showArticles(obj) {
    const articles = obj.articles
    for (const newsItem of articles) {
        const div = document.createElement('div')
        
        const img = document.createElement('img')
        img.src = newsItem.urlToImage
        img.style.width = '100%'
        div.appendChild(img)

        const h2 = document.createElement('h2')
        h2.textContent = newsItem.title
        div.appendChild(h2)

        const p = document.createElement('p')
        p.textContent = newsItem.description
        div.appendChild(p)


        const span = document.createElement('span')
        span.textContent = '(' + newsItem.publishedAt + ')'
        div.appendChild(span)


        const a = document.createElement('a')
        a.href = newsItem.url
        a.textContent = 'Read more'
        div.appendChild(a)

        article.appendChild(div)
    }
}

function getLastVisit() {
    const lastVisit = new Date().toLocaleString()
    localStorage.setItem('lastVisit', lastVisit)
    return lastVisit
}


function showVisitTime(message) {
    const lastVisitElement = document.getElementById('last-visit')
    lastVisitElement.textContent = 'Last visit: ' + message
}
