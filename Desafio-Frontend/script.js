document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-name");
    const taskCompleted = document.getElementById("task-completed");
    const filterCompleted = document.getElementById("filter-completed");
    const searchInput = document.getElementById("search-task");
    const searchButton = document.getElementById("search-button");

    let currentFilter = "";
    let currentSearch = "";

    function fetchTasks(filter = "", search = "") {
        let url = "http://127.0.0.1:8000/task";
        let queryParams = [];

        if (filter !== "") queryParams.push(`completed=${filter}`);
        if (search !== "") queryParams.push(`search=${search}`);

        if (queryParams.length) url += "?" + queryParams.join("&");

        fetch(url)
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = "";
                tasks.forEach(task => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.completed ? "Yes" : "No"}</td>
                        <td>
                            <button class="edit" data-id="${task.id}">Edit</button>
                            <button class="delete" data-id="${task.id}">Delete</button>
                        </td>
                    `;
                    taskList.appendChild(row);
                });
            });
    }

    taskForm.addEventListener("submit", event => {
        event.preventDefault();

        const newTask = {
            name: taskInput.value,
            completed: taskCompleted.checked ? 1 : 0
        };

        fetch("http://127.0.0.1:8000/task/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(() => {
            taskInput.value = "";
            taskCompleted.checked = false;
            fetchTasks(currentFilter, currentSearch);
        });
    });

    filterCompleted.addEventListener("change", () => {
        let newFilter = filterCompleted.value;
        if (newFilter !== currentFilter) {
            currentFilter = newFilter;
            fetchTasks(currentFilter, currentSearch);
        }
    });

    searchButton.addEventListener("click", () => {
        let newSearch = searchInput.value.trim();
        if (newSearch !== currentSearch) {
            currentSearch = newSearch;
            fetchTasks(currentFilter, currentSearch);
        }
    });

    taskList.addEventListener("click", event => {
        event.preventDefault();

        if (event.target.classList.contains("delete")) {
            const id = event.target.dataset.id;
            fetch(`http://127.0.0.1:8000/task/${id}`, { method: "DELETE" })
                .then(() => fetchTasks(currentFilter, currentSearch));
        }

        if (event.target.classList.contains("edit")) {
            const id = event.target.dataset.id;
            const newName = prompt("Enter new name:", event.target.closest("tr").children[1].innerText);
            const newCompleted = confirm("Mark as completed?");

            if (newName !== null) {
                fetch(`http://127.0.0.1:8000/task/${id}/edit`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: newName, completed: newCompleted ? 1 : 0 })
                }).then(() => fetchTasks(currentFilter, currentSearch));
            }
        }
    });

    fetchTasks();
});
