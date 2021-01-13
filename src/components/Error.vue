<template>
    <div class="status">
        <h3>{{ errorsMessage }}</h3>
    </div>
</template>

<script>
export default {
    name: 'MvError',
    props: {
        errorsMessage: {
            // указываем тип пропсов и их обязательность
            type: String, // тип будет строка
            required: false, //  необязательно должно  быть
            default: 'Something went wrong' // что то пошло нет
        }
    }
}
</script>

<style>
.status {
    text-align: center;
    color: red;
}

.status h3 {
    margin: 0 auto;
}
</style>
