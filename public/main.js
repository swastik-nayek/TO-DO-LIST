function fetchTasks() {
    fetch('/api/tasks')
        .then(res => res.json())
        .then(tasks => {
            const tableBody = document.getElementById('taskTableBody');
            tableBody.innerHTML = '';
            tasks.forEach(task => {
                const row = document.createElement('tr');
                if (task.completed) row.classList.add('completed');

                row.innerHTML = `
  <td>${task.id}</td>
  <td>${task.description}</td>
  <td>${task.completed ? 'Completed' : 'Pending'}</td>
  <td>${new Date(task.created_at).toLocaleString()}</td>
  <td>${task.expected_at ? new Date(task.expected_at).toLocaleString() : '-'}</td>
  <td>
    <button class="done" onclick="toggleTask(${task.id})">✔</button>
    <button class="delete" onclick="deleteTask(${task.id})">🗑</button>
  </td>
`;

                tableBody.appendChild(row);
            });
        });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const expectedInput = document.getElementById('expectedInput');

    const desc = input.value.trim();
    const expectedAt = expectedInput.value;

    if (!desc) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc, expectedAt })
    })
        .then(res => res.json())
        .then(() => {
            input.value = '';
            expectedInput.value = '';
            fetchTasks();
        });
}

function deleteTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    }).then(() => fetchTasks());
}

function toggleTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'PUT'
    }).then(() => fetchTasks());
}

fetchTasks();
