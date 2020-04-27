<template>
	<div id="app">
		<h1>Tarefas</h1>
		<TasksProgress :progress="progress"/>
		<NewTask @taskAdded="addTask" />
		<TaskGrid @taskDeleted="deleteTask" 
			@taskStatedChanged="toggleTaskState"
			:tasks="tasks" />
	</div>
</template>

<script>
import TasksProgress from './components/TasksProgress'
import TaskGrid from './components/TaskGrid'
import NewTask from './components/NewTask'

export default {
	components: {TaskGrid, NewTask, TasksProgress}, 
	data() {
		return {
			tasks: []
		}
	},
	computed: {
		progress() {
			const total = this.tasks.length
			const done = this.tasks.filter(t => !t.pending).length
			return Math.round(done / total * 100) || 0
		}
	},
	watch: {
		tasks: {
			deep: true,
			handler() {
				localStorage.setItem('tasks', JSON.stringify(this.tasks))
			}
		}
	},
	methods: {
		addTask(task) {
			const sameName = t => t.name === task.name
			const isNew =  this.tasks.filter(sameName).length === 0
			isNew && this.tasks.push({
				name: task.name,
				pending: task.pending || true
			});
		},
		deleteTask(index) {
			this.tasks.splice(index, 1)
		},
		toggleTaskState(index) {
			this.tasks[index].pending = !this.tasks[index].pending
		}
	},
	created() {
		const json = localStorage.getItem('tasks')
		this.tasks = JSON.parse(json) || []
	}
}
</script>

<style>
	body {
		font-family: 'Lato', sans-serif;
		background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115));
		color: #FFF;
	}

	#app {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	#app h1 {
		margin-bottom: 5px;
		font-weight: 300;
		font-size: 3rem;
	}
</style>
