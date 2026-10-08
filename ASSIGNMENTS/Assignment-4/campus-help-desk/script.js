// Campus Help Desk - Client Side Logic (Vanilla JS & fetch)

const API_BASE = '/api/requests';

// DOM Element references
const requestForm = document.getElementById('requestForm');
const editIdInput = document.getElementById('editId');
const studentNameInput = document.getElementById('studentName');
const emailInput = document.getElementById('email');
const categoryInput = document.getElementById('category');
const priorityInput = document.getElementById('priority');
const descriptionInput = document.getElementById('description');

const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formHeading = document.getElementById('formHeading');
const formStatusBadge = document.getElementById('formStatusBadge');
const requestsList = document.getElementById('requestsList');
const ticketCount = document.getElementById('ticketCount');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchRequests();
});

// 1. GET ALL: Fetch and render all requests
async function fetchRequests() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch requests');
    
    const requests = await response.json();
    renderRequests(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    requestsList.innerHTML = `<div class="empty-state"><p>Could not load requests from server.</p></div>`;
    ticketCount.textContent = 'Error loading tickets';
  }
}

// Render request cards in the DOM
function renderRequests(requests) {
  ticketCount.textContent = `${requests.length} ${requests.length === 1 ? 'Ticket' : 'Tickets'} Registered`;

  if (!requests || requests.length === 0) {
    requestsList.innerHTML = `
      <div class="empty-state">
        <strong>No Campus Requests Found</strong>
        <p>Use the form above to log a new help desk ticket.</p>
      </div>
    `;
    return;
  }

  requestsList.innerHTML = requests
    .map((item) => {
      const priorityClass = `priority-${item.priority.toLowerCase()}`;
      return `
        <article class="ticket-card" id="ticket-${item.id}">
          <div class="ticket-top">
            <div class="ticket-identity">
              <span class="ticket-id">#TKT-${item.id}</span>
              <div>
                <h3 class="student-title">${escapeHtml(item.studentName)}</h3>
                <span class="student-email">${escapeHtml(item.email)}</span>
              </div>
            </div>
            <div class="ticket-tags">
              <span class="badge-tag category-tag">${escapeHtml(item.category)}</span>
              <span class="badge-tag ${priorityClass}">${escapeHtml(item.priority)}</span>
            </div>
          </div>

          <p class="ticket-body">${escapeHtml(item.description)}</p>

          <div class="ticket-footer">
            <span>Logged: ${escapeHtml(item.date || 'Recent')}</span>
            <div class="ticket-actions">
              <button class="btn btn-outline" onclick="loadRequestForEdit('${item.id}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteRequest('${item.id}')">Resolve / Delete</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

// 2. CREATE or UPDATE on Form Submit
requestForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = editIdInput.value;
  const payload = {
    studentName: studentNameInput.value.trim(),
    email: emailInput.value.trim(),
    category: categoryInput.value,
    priority: priorityInput.value,
    description: descriptionInput.value.trim()
  };

  try {
    if (id) {
      // PUT /api/requests/:id
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update request');
      }

      alert(`Ticket #TKT-${id} updated successfully!`);
    } else {
      // POST /api/requests
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create request');
      }

      const created = await response.json();
      alert(`Ticket #TKT-${created.id} submitted successfully!`);
    }

    resetForm();
    fetchRequests();
  } catch (error) {
    alert(error.message);
  }
});

// 3. GET SINGLE: Fetch single request by ID to populate edit form
async function loadRequestForEdit(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Could not find ticket details');

    const item = await response.json();

    // Populate inputs
    editIdInput.value = item.id;
    studentNameInput.value = item.studentName;
    emailInput.value = item.email;
    categoryInput.value = item.category;
    priorityInput.value = item.priority;
    descriptionInput.value = item.description;

    // Switch UI into Edit mode
    formHeading.textContent = `Update Ticket #TKT-${item.id}`;
    formStatusBadge.textContent = `Editing #${item.id}`;
    formStatusBadge.className = 'mode-badge edit-mode';
    submitBtn.textContent = 'Save Changes';
    cancelBtn.classList.remove('hidden');

    // Smooth scroll up to form
    requestForm.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    alert(error.message);
  }
}

// 4. CANCEL EDIT: Restore original form state
cancelBtn.addEventListener('click', () => {
  resetForm();
});

function resetForm() {
  requestForm.reset();
  editIdInput.value = '';
  formHeading.textContent = 'Log New Campus Request';
  formStatusBadge.textContent = 'New Entry';
  formStatusBadge.className = 'mode-badge new-mode';
  submitBtn.textContent = 'Submit Ticket';
  cancelBtn.classList.add('hidden');
}

// 5. DELETE: Remove request by ID
async function deleteRequest(id) {
  const confirmed = confirm(`Are you sure you want to resolve and delete ticket #TKT-${id}?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete ticket');
    }

    // If currently editing the ticket being deleted, reset form
    if (editIdInput.value === id) {
      resetForm();
    }

    fetchRequests();
  } catch (error) {
    alert(error.message);
  }
}

// Helper: Escape HTML to prevent basic XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
