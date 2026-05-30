import { defineStore } from 'pinia';
import { ref ,computed } from 'vue';
   const STATUS = Object.freeze({
    TO_DO: 'To Do',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed'
   });
   export const CATEGORIES = Object.freeze({
    WORK: 'Work',
    PERSONAL: 'Personal',
    SHOPPING: 'Shopping',
    STUDIES: 'Studies',
    HOME: 'Home'
});
export const useTaskStore = defineStore('taskStore', () => {
 
   const tasks = ref([
        { id: 1, title: 'Learn Express.js', category: CATEGORIES.STUDIES, status: STATUS.IN_PROGRESS },
        { id: 2, title: 'Buy groceries', category:CATEGORIES.SHOPPING, status: STATUS.COMPLETED },
         { id: 3, title: 'Clean the house', category: CATEGORIES.HOME, status: STATUS.TO_DO },
        { id: 4, title: 'Call the doctor', category: CATEGORIES.PERSONAL, status: STATUS.COMPLETED },
         { id: 5, title: 'Finish the project', category: CATEGORIES.WORK, status: STATUS.IN_PROGRESS },
        { id: 6, title: 'Buy groceries', category: CATEGORIES.PERSONAL, status: STATUS.TO_DO },
         { id: 7, title: 'Read a book', category: CATEGORIES.PERSONAL, status: STATUS.TO_DO },
         { id: 8, title: 'Go for a run', category: CATEGORIES.PERSONAL, status: STATUS.IN_PROGRESS },
         { id: 9, title: 'Prepare presentation', category: CATEGORIES.WORK, status: STATUS.COMPLETED },
         { id: 10, title: 'Organize files', category: CATEGORIES.WORK, status: STATUS.TO_DO }
    ]);
    const filterCategory = ref('All');
    const searchQuery = ref('');
    const filteredTasks = computed(() => {
            let filtered = filterCategory.value === 'All'
                ? tasks.value
                : tasks.value.filter(task => task.category === filterCategory.value);

            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                filtered = filtered.filter(task => task.title.toLowerCase().includes(query));
            }
            return filtered;
        });
  
   function addTask(title, category) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        return {
            success: false,
            message: 'Task title is required'
        };
    }

    const taskExists = tasks.value.some(task =>
        task.title.toLowerCase() === trimmedTitle.toLowerCase() &&
        task.category === category
    );

    if (taskExists) {
        return {
            success: false,
            message: 'Task already exists in this category'
        };
    }

    const newTask = {
        id: Date.now(),
        title: trimmedTitle,
        category,
        status: STATUS.TO_DO
    };

    tasks.value.push(newTask);

    return {
        success: true
    };
}
       function deleteTask(id) {
            tasks.value = tasks.value.filter(task => task.id !== id);
        }
     function advanceTaskStatus(id) {
    const task = tasks.value.find(task => task.id === id);
    if (!task) return;

   
    const transitions = {
        [STATUS.TO_DO]: STATUS.IN_PROGRESS,
        [STATUS.IN_PROGRESS]: STATUS.COMPLETED,
        [STATUS.COMPLETED]: STATUS.COMPLETED 
    };

    task.status = transitions[task.status] || STATUS.TO_DO;
}
        return {
        STATUS,
        CATEGORIES,
        tasks,
        filterCategory,
        searchQuery,
        filteredTasks,
        addTask,
        deleteTask,
        advanceTaskStatus
    };
});

