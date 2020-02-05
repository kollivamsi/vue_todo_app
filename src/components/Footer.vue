<template>
    <div class="footer">
        <button id="handleSampleData" @click.prevent="handleSampleData">Get Example Todos</button>
        <button @click.prevent="removeExampleView">Remove Examples</button>
    </div>
</template>

<script>
export default {
    name: "Footer",
    props: {
        getSampleData: Function
    },
    methods: {
        handleSampleData() {
            return this.$props.getSampleData();
        },
        removeExampleView() {
            location.reload();
        }
    }
};
</script>