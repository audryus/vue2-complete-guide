<template>
  <div class="task-grid">
    <template v-if="tasks.length">
      <Task v-for="(task, i) in tasks" 
        :key="task.name" 
        :task="task"
        @taskDeleted="$emit('taskDeleted', i)"
        @taskStatedChanged="$emit('taskStatedChanged', i)"
        />
    </template>
    <p v-else class="no-task">Sua vida esta em dia =D</p>
  </div>
</template>

<script>
  import Task from './Task'
export default {
  components: {Task},
  props: {
    tasks: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style>

  .task-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .task-grid .task {
    margin: 10px;
  }

  .no-taks {
    color: #AAA;
    font-size: 1.7rem;
  }
</style>