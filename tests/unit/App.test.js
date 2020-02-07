import { mount } from '@vue/test-utils'
import App from "../../src/App.vue"
import Footer from "../../src/components/Footer.vue";

describe("App.vue", () => {
    test("Render view properly", () =>{
        const app = mount(App);
        app.setData({sampleData:null})
        app.find(Footer).find('#handleSampleData').trigger('click')
        expect(app.vm.sampleData).toHaveLength(4)
    })
})
