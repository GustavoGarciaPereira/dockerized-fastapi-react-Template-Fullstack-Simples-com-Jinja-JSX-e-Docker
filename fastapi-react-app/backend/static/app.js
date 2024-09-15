function App() {
    const [tasks, setTasks] = React.useState([]);
    const [taskText, setTaskText] = React.useState("");

    React.useEffect(() => {
        fetch("/api/tasks")
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const addTask = (e) => {
        e.preventDefault();
        if (taskText.trim() === "") return;

        const newTask = { id: uuidv4(), text: taskText };

        fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(data => {
            setTasks([...tasks, newTask]);
            setTaskText("");
        });
    };

    const deleteTask = (id) => {
        fetch(`/api/tasks/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            setTasks(tasks.filter(task => task.id !== id));
        });
    };

    return (
        <div>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Adicione uma nova tarefa"
                />
                <button type="submit">Adicionar</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>Done</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Função para gerar IDs únicos no frontend
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

ReactDOM.render(<App />, document.getElementById('root'));
