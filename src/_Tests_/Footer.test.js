import { mount } from '@vue/test-utils'
import Footer from "../components/Footer.vue"

describe("Footer.vue", () => {
    test("Render view properly", () =>{
        const footer = mount(Footer);
        expect(footer.text()).toContain('Get Example Todos')
    })
})