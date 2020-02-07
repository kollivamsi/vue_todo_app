import { mount, shallowMount } from '@vue/test-utils'
import List from "../../src/components/List.vue";
import { dummyTasks } from "../../src/assets/general.json";
import CreateModal from "../../src/components/CreateModal.vue"

const getSampleData = () => {
    dummyTasks.forEach(task => task.dueDate && (task.dueDate = new Date(task.dueDate)));
    return dummyTasks;
}
describe("List.vue", () => {
    let listView;
    beforeEach(() => {
        listView = shallowMount(List, {
            propsData: {
                sampleData: null
            },
            stubs: {
                'CreateModal': CreateModal
            },
            attachToDocument: true
        })
    })

    test("Render List view", () => {
        listView.setProps({sampleData: getSampleData()})
        listView.vm.$nextTick(()=> {
            expect(listView.vm.tasklist).toHaveLength(4)
        })
    })

    test("Achieve one of the task", () => {
        listView.setProps({sampleData: getSampleData()})
        listView.vm.$nextTick(()=> {
            listView.find('#achieve0').trigger('click')
            expect(listView.vm.tasklist[0].achieved).toBe(true)
        })
    })

    test("Edit one of the task", () => {
        listView.setProps({sampleData: getSampleData()})
        listView.vm.$nextTick(()=> {
            listView.find('#edit0').trigger('click')
            expect(listView.vm.createModal).toBe(true)
        })
    })

    test("Open create task modal", () => {
        listView.setProps({sampleData: getSampleData()})
        listView.vm.$nextTick(()=> {
            listView.find('#new-task').trigger('click')
            expect(listView.vm.createModal).toBe(true)
        })
    })

    test("Delete task from list", () => {
        listView.setProps({sampleData: getSampleData()})
        listView.vm.$nextTick(()=> {
            listView.find('#remove0').trigger('click')
            expect(listView.vm.tasklist).toHaveLength(3)
        })
    })

    test("Save edit task", () => {
        listView.setProps({sampleData: getSampleData()})
        listView.vm.$nextTick(()=> {
            listView.find('#edit0').trigger('click')
            listView.vm.$nextTick(()=> {
                const createModal = listView.find(CreateModal)
                createModal.vm.task.detail =  'Testing save edit task'
                createModal.find("[type='submit']").trigger('click')
                listView.vm.$nextTick(()=> {
                    expect(listView.vm.tasklist[0].detail).toContain('Testing save edit task')
                });
                createModal.destroy()
            })
        })
    })
})