<template>
  <div id="app">

  </div>
</template>

<script>
import { useToasted } from '../../src/useApi';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    setup() {
        const toasted = useToasted();

        toasted.success('Composition Toasted', {
            position: 'bottom-right',
            duration: 2000,
        });
    },
    mounted() {
        toasted.success('Vue2 Toasted', {
            position: 'bottom-right',
            duration: 2000,
        });
    }
})
</script>

<style>

</style>
