document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-nav');
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    // Nav link stubs (load modules later)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            document.getElementById('main-content').innerHTML = `<h1>${section.charAt(0).toUpperCase() + section.slice(1)}</h1><p>Module content for ${section} loads here via Firestore.</p>`;
        });
    });
});