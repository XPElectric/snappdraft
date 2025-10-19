import { collection, getDocs, addDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { auth } from '../firebase-config.js';

const MODAL_ID = 'engineer-modal';
const TABLE_ID = 'engineers-table';

export async function loadEngineers() {
    const user = auth.currentUser;
    if (!user) {
        document.getElementById('main-content').innerHTML = '<h1>Engineers</h1><p>Login required.</p>';
        return;
    }

    try {
        const engineersCol = collection(db, `users/${user.uid}/engineers`);
        const snapshot = await getDocs(engineersCol);
        const engineers = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

        document.getElementById('main-content').innerHTML = `
            <h1>Engineers: Firm Directory</h1>
            <button id="new-engineer" class="btn-primary">+ New Engineer</button>
            <table id="${TABLE_ID}">
                <thead>
                    <tr>
                        <th>Firm Name</th>
                        <th>Address</th>
                        <th>Website</th>
                        <th>Phone</th>
                        <th>Stamping Engineer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${engineers.map(e => `
                        <tr>
                            <td>${e.firmName}</td>
                            <td>${e.address}</td>
                            <td><a href="${e.website}" target="_blank">${e.website}</a></td>
                            <td>${e.phone}</td>
                            <td>${e.stampingFirst} ${e.stampingLast}</td>
                            <td><button class="btn-secondary edit-btn" data-id="${e.id}">Edit</button></td>
                        </tr>
                    `).join('') || '<tr><td colspan="6">No firms added. Create one to start.</td></tr>'}
                </tbody>
            </table>
            ${createModal()}
        `;

        // Event listeners
        document.getElementById('new-engineer').addEventListener('click', () => openModal(null));
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const engineer = engineers.find(e => e.id === id);
                openModal(engineer);
            });
        });

        // Form submit (in modal)
        document.getElementById('engineer-form').addEventListener('submit', handleSubmit);
        document.getElementById('close-modal').addEventListener('click', closeModal);
        document.getElementById(MODAL_ID).addEventListener('click', (e) => e.target === e.currentTarget && closeModal());
    } catch (error) {
        console.error('Load engineers error:', error);
        document.getElementById('main-content').innerHTML = '<h1>Engineers</h1><p>Error loading firms. Check console.</p>';
    }
}

function createModal(engineer = null) {
    const isEdit = !!engineer;
    return `
        <div id="${MODAL_ID}" class="modal-overlay">
            <div class="modal-content">
                <h2>${isEdit ? 'Edit' : 'New'} Engineering Firm</h2>
                <form id="engineer-form">
                    <label>Firm Name: <input type="text" name="firmName" value="${engineer?.firmName || ''}" required></label>
                    <label>Address: <input type="text" name="address" value="${engineer?.address || ''}" required></label>
                    <label>Website: <input type="url" name="website" value="${engineer?.website || ''}"></label>
                    <label>Phone: <input type="tel" name="phone" value="${engineer?.phone || ''}" required></label>
                    <label>Stamping First Name: <input type="text" name="stampingFirst" value="${engineer?.stampingFirst || ''}" required></label>
                    <label>Stamping Last Name: <input type="text" name="stampingLast" value="${engineer?.stampingLast || ''}" required></label>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">${isEdit ? 'Update' : 'Create'}</button>
                        <button type="button" id="close-modal" class="btn-secondary">Cancel</button>
                    </div>
                </form>
                <input type="hidden" name="id" value="${engineer?.id || ''}">
            </div>
        </div>
    `;
}

function openModal(engineer) {
    document.getElementById(MODAL_ID).style.display = 'flex';
    // Populate if edit (already in HTML via value attrs)
}

function closeModal() {
    document.getElementById(MODAL_ID).style.display = 'none';
}

async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const user = auth.currentUser;
    const engineersCol = collection(db, `users/${user.uid}/engineers`);

    try {
        if (data.id) {
            // Edit
            await updateDoc(doc(db, `users/${user.uid}/engineers`, data.id), data);
        } else {
            // Add
            await addDoc(engineersCol, { ...data, createdAt: new Date() });
        }
        closeModal();
        loadEngineers(); // Reload list
    } catch (error) {
        console.error('Save error:', error);
        alert('Save failed—check console.');
    }
}