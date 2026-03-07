const contentData = {
    about: document.querySelector('[data-content="about"]').innerHTML,
    game: document.querySelector('[data-content="game"]').innerHTML,
    location: document.querySelector('[data-content="location"]').innerHTML,
    visit: document.querySelector('[data-content="visit"]').innerHTML
};

const balls = document.querySelectorAll('.ball');
const contentPanel = document.getElementById('content-panel');
const panelContent = document.getElementById('panel-content');
const closeBtn = document.getElementById('close-btn');

balls.forEach(ball => {
    ball.addEventListener('click', () => {
        const section = ball.getAttribute('data-section');
        panelContent.innerHTML = contentData[section];
        contentPanel.classList.add('active');
    });
});

closeBtn.addEventListener('click', () => {
    contentPanel.classList.remove('active');
});

contentPanel.addEventListener('click', (e) => {
    if (e.target === contentPanel) {
        contentPanel.classList.remove('active');
    }
});