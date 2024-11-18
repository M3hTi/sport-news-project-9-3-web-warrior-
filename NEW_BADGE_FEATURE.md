# Adding "NEW" Badge Feature to News Articles

This document explains how we implemented the "NEW" badge feature that shows which articles were published after the user's last visit.

## Feature Overview

When a user visits the site:
1. Their visit time is stored
2. Articles published after their last visit are marked with a "NEW" badge
3. The badge has a pulsing animation to draw attention

## Implementation Steps

### 1. Tracking User Visits

```javascript
function getLastVisit() {
    const previousVisit = localStorage.getItem('lastVisit');
    const currentVisit = new Date().toLocaleString()
    localStorage.setItem('lastVisit', currentVisit)
    return previousVisit || currentVisit
}
```

This function:
- Retrieves the last visit time from localStorage
- Stores the current visit time
- Returns the previous visit time (or current time if first visit)

### 2. Checking for New Articles

```javascript
function showArticles(obj, lastVisitDate) {
    for (const newsItem of articles) {
        // Check if article is new
        const publishDate = new Date(newsItem.publishedAt)
        const isNew = publishDate > lastVisitDate
        
        if (isNew) {
            const newBadge = document.createElement('span')
            newBadge.className = 'new-badge'
            newBadge.textContent = 'NEW'
            div.appendChild(newBadge)
        }
        // ... rest of the article creation code
    }
}
```

Key points:
- Compares article publish date with user's last visit
- Creates and adds NEW badge for newer articles
- Badge is added before other article content

### 3. Styling the Badge

```css
.new-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff4757;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: pulse 2s infinite;
}

article div {
    position: relative;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
```

CSS features:
- Absolute positioning in top-right corner
- Eye-catching red background
- Subtle shadow for depth
- Pulsing animation
- Container needs relative positioning

## How It Works

1. **First Visit**
   - Current time is stored in localStorage
   - All articles might show as new (no previous visit time)

2. **Subsequent Visits**
   - Last visit time is retrieved
   - Only articles published after last visit show NEW badge
   - Current visit time becomes new "last visit" time

3. **Visual Feedback**
   - NEW badge appears in top-right of article card
   - Pulsing animation draws attention
   - Red color makes it stand out

## Technical Considerations

1. **Date Handling**
   - Dates are converted to comparable format
   - Uses JavaScript Date object for comparisons
   - Handles timezone differences automatically

2. **Storage**
   - Uses localStorage for persistence
   - Falls back gracefully if storage is unavailable
   - Lightweight storage solution

3. **Performance**
   - Minimal DOM operations
   - Animation uses CSS instead of JavaScript
   - Efficient date comparisons

## Possible Enhancements

1. **Customization**
   - Make badge colors configurable
   - Allow different animation styles
   - Add ability to dismiss NEW badges

2. **Features**
   - Add "time since published" information
   - Show exact time difference
   - Add filter for new articles only

3. **UX Improvements**
   - Add tooltip with publish time
   - Make badges clickable for more info
   - Add sound effects for new articles

## Troubleshooting

1. **No Badges Appearing**
   - Check localStorage is working
   - Verify date comparisons
   - Check article publish dates

2. **Style Issues**
   - Ensure container has position: relative
   - Check z-index if badge is hidden
   - Verify CSS classes are applied

3. **Date Issues**
   - Check date format from API
   - Verify timezone handling
   - Check date parsing logic
