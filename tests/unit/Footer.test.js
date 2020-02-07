import { mount } from '@vue/test-utils'
import Footer from "../../src/components/Footer.vue"

describe("Footer.vue", () => {
    const mockMethods = {
        removeExampleView: jest.fn(),
        handleSampleData: jest.fn()
    }

    test("Render view properly", () =>{
        const footer = mount(Footer);
        expect(footer.text()).toContain('Get Example Todos')
    })

    test("Testing remove examples", () =>{
        const footer = mount(Footer, {
            methods: mockMethods
        });
        footer.find('#RemoveExamples').trigger('click')
        expect(mockMethods.removeExampleView).toHaveBeenCalled();
    })
})