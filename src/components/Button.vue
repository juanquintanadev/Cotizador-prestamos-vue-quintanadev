<script setup>
    // estos props son los que pasamos desde el archivo principal y los definimos aca utilizando una funcion ya definida de vue.
    const props = defineProps({
        operador: String, // pasamos en forma de objeto todos los parametros que le pasamos desde el app principal y estos los especificamos con su tipo de dato o si es funcion
        fn: Function,
    });
    const valor = 'hola'; // esta es una variable que vamos a pasar por medio del emit a la funcion que tenemos en el componente principal
</script>

<template>
    <button 
        type="button" 
        class="flex h-10 w-10 rounded-full justify-center items-center font-bold bg-lime-500 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-lime-500 text-white text-2xl" 
        @click="$emit('fn', valor)"
        >{{ operador }}</button>
</template>