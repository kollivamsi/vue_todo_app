<template>
    <div class="list" @click="closeModal">
        <div class="demo" v-if="sampleView">
            <h3>Demo Play</h3>
            <p>Please remove the examples before use the app</p>
        </div>
        <ul>
            <li v-for="(task, index) in tasklist" :key="index">
                <div :class="[task.achieved && 'achieved', 'list-inner']">
                    <button :id="'remove'+index" class="remove-button" @click.prevent="removeTask(index)">
                        <FontAwesomeIcon icon="times" />
                    </button>
                    <h3>{{ task.title }}</h3>
                    <div>{{ task.detail }}</div>
                    <div class="due-date" v-if="task.dueDate">
                        <div :class="['inner', handleDueDate(task.dueDate) ? 'fine' : 'overdue']">
                            <span class="icon">
                                <FontAwesomeIcon :icon="['far', 'clock']" />
                            </span>
                            <span class="date">
                                {{ handleDate(task.dueDate) }}
                            </span>
                        </div>
                    </div>
                    <div :class="handleLabel(task.label)"></div>
                    <div class="inner-btn-wrapper">
                        <button :id="'achieve'+index" @click.prevent="achieveTask(index)">Achieve</button>
                        <button :id="'edit'+index" @click.prevent="editCurrTask(index)">Edit</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="btn-wrapper">
            <button id="new-task" @click.prevent="popCreateModal">New Task</button>
        </div>
         <CreateModal
            v-if="createModal"
            :addTask="addTask"
            :toggleModal="popCreateModal"
            :editTask="editTask"
            :existingTask="existingTask"
            :saveEditTask="saveEditTask"
        />
    </div>
</template>

<script>
 import CreateModal from "./CreateModal.vue";
import { renderLabel, renderDate, renderDueDate, renderStringifyDate, renderParseDate } from "../assets/helper.js";
import { dummyTasks } from "../assets/general.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes, faClock);

export default {
    name: "List",
    data: () => ({
        tasklist: [],
        createModal: false,
        title: "",
        editTask: false,
        existingTask: null,
        editIndex: null,
        sampleView: false
    }),
    props: {
        sampleData: Array
    },
    watch: {
        sampleData() {
            if (this.sampleData) {
                this.tasklist = this.sampleData;
                this.sampleView = true;
            } else {
                this.sampleView = false;
            }
        }
    },
    methods: {
        getTasksFromStorage() {
            const tasksFromStorage = localStorage.getItem("vueTodoTasks");

            if (tasksFromStorage) {
                const parsed = JSON.parse(tasksFromStorage);
                this.tasklist = this.handleParseDate(parsed);
            }
        },
        achieveTask(index) {
            this.tasklist[index].achieved = !this.tasklist[index].achieved;
            if (!this.sampleView) {
                const stringifiedTask = JSON.stringify(this.tasklist);
                localStorage.setItem("vueTodoTasks", stringifiedTask);
            }
        },
        editCurrTask(index) {
            const currTask = this.tasklist[index];

            this.editTask = true;
            this.existingTask = currTask;
            this.editIndex = index;

            this.popCreateModal();
        },
        saveEditTask(task) {
            this.tasklist[this.editIndex] = task;
            if (!this.sampleView) {
                const stringifiedTask = JSON.stringify(this.tasklist);
                localStorage.setItem("vueTodoTasks", stringifiedTask);
            }
            this.initEditState();
        },
        initEditState() {
            this.editTask = false;
            this.existingTask = null;
            this.editIndex = null;
        },
        popCreateModal() {
            this.createModal = !this.createModal;
            if(!this.createModal) {
                this.initEditState();
            }
        },
        closeModal(event) {
            if (this.createModal && event.target.id === "veil") {
                this.initEditState();
                this.createModal = false;
            }
        },
        addTask(task) {
            this.tasklist.push(task);
            if (!this.sampleView) {
                const stringifiedTask = JSON.stringify(this.tasklist);
                localStorage.setItem("vueTodoTasks", stringifiedTask);
            }
        },
        removeTask(index) {
            const confirm = window.confirm("Remove the task?");
            if (confirm) {
                this.tasklist.splice(index, 1);
                if (!this.sampleView) {
                    const stringifiedTask = JSON.stringify(this.tasklist);
                    localStorage.setItem("vueTodoTasks", stringifiedTask);
                }
            }
        },
        handleLabel(index) {
            return renderLabel(index);
        },
        handleDate(date) {
            return renderDate(date);
        },
        handleDueDate(date) {
            return renderDueDate(date);
        },
        handleStringifyDate(tasks) {
            return renderStringifyDate(tasks);
        },
        handleParseDate(tasks) {
            return renderParseDate(tasks);
        }
    },
    mounted() {
        this.getTasksFromStorage();
    },
    components: {
         CreateModal,
        FontAwesomeIcon
    }
};
</script>