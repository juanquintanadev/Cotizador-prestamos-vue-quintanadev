<script setup>
  // importamos los state de vue y el computed
  import { ref, computed, watch } from 'vue';

  // importamos un componente para agregarlo al template
  import Header from './components/Header.vue';
  import Button from './components/Button.vue';
  import { calcularTotalPagar } from './helpers'

  const cantidad = ref(10000);
  const meses = ref(6);
  const total = ref(0); // aca mismo calculamos el total a pagar y con esta fomra obtenemos un resultado
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  // colocamos el watch para ver cuando cambia la cantidad y los meses
  watch([cantidad, meses], () => {
    // como estamos en la parte del script tenemos que usar los value
    total.value = calcularTotalPagar(cantidad.value, meses.value);
  });

  // los computed en este caso van a realizar un cambio en el state y a su vez se reprensenta en el template
  // lo sacamos a computed para que pueda tomar un valor y asi reutilizarlo en el template con diferentes variables
  const formatearDinero = (valor) => {
    const formatter = Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(valor);
  };

  // calculamos el monto a pagar mensual donde va a ser un computed property ya que este mismo se muestra en el template
  const pagoMensual = computed(() => {
    return total.value / meses.value;
  });

  // en cambio esta funcion solo realiza un cambio en el state por lo tanto no es computed
  const handleClickDecremento = (texto) => {
    const valor = cantidad.value - STEP;

    if(valor < MIN) {
      alert('Cantidad no válida');
      return;
    };
    cantidad.value = valor;
    console.log(texto);
  };
  const handleClickIncremento = (texto) => { // texto es la variable que mandamos desde el componente que estamos trabajando 
    const valor = cantidad.value + STEP;

    if(valor > MAX) {
      alert('Cantidad no válida');
      return;
    };
    cantidad.value = valor;
    console.log(texto);
  };

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header/>
    <div class="flex justify-between mt-10">
      <Button
        :operador="'-'"
        @fn="handleClickDecremento"
      />
      <Button
        :operador="'+'" 
        @fn="handleClickIncremento"
      />
    </div>
    <div class="my-5">
      <input 
        type="range" 
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN" 
        :max="MAX"
        :step="STEP"
        v-model.number="cantidad"
      >
      <p class="text-center text-6xl text-indigo-600 my-10 font-extrabold">{{formatearDinero(cantidad)}}</p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">Elige un <span class="text-indigo-600">plazo</span> a pagar.</h2>

      <select
        class="w-full p-2 bg-white border border-gray-200 text-center text-xl font-bold text-gray-500 mt-5 rounded-lg"
        :value="meses"
        v-model.number="meses"
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
    </div>
    <div v-if="total > 0" class="my-5 space-y-3 bg-gray-100 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Resumen <span class="text-indigo-500">de pagos</span>
      </h2>
      <p class="text-center font-bold text-gray-500 text-xl">{{ meses }} Meses</p>
      <p class="text-center font-bold text-gray-500 text-xl">{{ formatearDinero(total) }} Total a pagar: </p>
      <p class="text-center font-bold text-gray-500 text-xl">{{ formatearDinero(pagoMensual) }}Mensuales</p>
    </div>
    <p v-else class="text-center">Añade cantidad o meses para ir calculando el total</p>
  </div>
</template>

