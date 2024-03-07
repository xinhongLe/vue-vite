<template>
    <div>
        <slot-demo></slot-demo>
    </div>
</template>

<script>
import SlotDemo from "./components/slot-demo";
export default {
    name: "index",
    components: {SlotDemo}
}
</script>

<style scoped>

</style>
