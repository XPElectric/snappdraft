import { db } from '../../firebase-config.js';  // From public/modules/clients to public/
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('clientForm');
  const list = document.getElementById('clientList');

  // Load existing clients
  try {
    const querySnapshot = await getDocs(collection(db, 'clients'));
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const p = document.createElement('p');
      p.textContent = `${data.name} - ${data.contact}`;
      list.appendChild(p);
    });
  } catch (error) {
    console.error('Error loading clients:', error);
    list.innerHTML = '<p>Error loading clients. Check console.</p>';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      address: document.getElementById('address').value,
      contact: document.getElementById('contact').value
    };

    try {
      await addDoc(collection(db, 'clients'), data);
      form.reset();
      location.reload();
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Failed to add client. Check console.');
    }
  });
});