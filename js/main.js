import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth } from './firebase-config.js';

let isAuthenticated = false;

// Global auth listener (runs once on load)
onAuthStateChanged(auth, (user) => {
    isAuthenticated = !!user;
    console.log('Auth state:', isAuthenticated ? 'Logged in' : 'Guest');
    // Optional: Update UI (e.g., add "Logout" to Settings if auth'd)
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-nav');
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Safe nav handlers (load modules only if clicked; auth guard inline)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            const mainContent = document.getElementById('main-content');
            
            if (section === 'engineers' && !isAuthenticated) {
                mainContent.innerHTML = `
                    <h1>Engineers</h1>
                    <p>Login required for firm management. <a href="#settings">Go to Settings</a> to sign up/log in.</p>
                `;
                return;
            }

            // Stub for non-Engineers/Settings (expand later)
            if (section !== 'engineers' && section !== 'settings') {
                mainContent.innerHTML = `<h1>${section.charAt(0).toUpperCase() + section.slice(1)}</h1><p>Module for ${section} loads here.</p>`;
                return;
            }

            if (section === 'settings') {
                mainContent.innerHTML = `
                    <h1>Settings: Account</h1>
                    <div id="auth-section">
                        ${isAuthenticated ? `
                            <p>Logged in as: <span class="success-accent">${auth.currentUser.email}</span></p>
                            <button id="logout-btn" class="btn-secondary">Logout</button>
                        ` : `
                            <p>Not logged in. Create/login to manage data.</p>
                            <form id="auth-form">
                                <label>Email: <input type="email" id="email" required></label>
                                <label>Password: <input type="password" id="password" required></label>
                                <button type="submit" class="btn-primary">Sign Up / Login</button>
                            </form>
                        `}
                    </div>
                `;
                
                if (isAuthenticated) {
                    document.getElementById('logout-btn').addEventListener('click', () => {
                        signOut(auth).then(() => location.reload());
                    });
                } else {
                    document.getElementById('auth-form').addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
                        try {
                            await createUserWithEmailAndPassword(auth, email, password).catch(() => 
                                signInWithEmailAndPassword(auth, email, password)
                            );
                            // Reload to update auth state
                            location.reload();
                        } catch (error) {
                            console.error('Auth error:', error);
                            alert('Auth failed—check console.');
                        }
                    });
                }
                return;
            }

            // Load Engineers module
            try {
                const { loadEngineers } = await import('./modules/engineers.js');
                await loadEngineers();
            } catch (error) {
                console.error('Engineers module load error:', error);
                mainContent.innerHTML = `<h1>Engineers</h1><p>Module error—check console.</p>`;
            }
        });
    });
});