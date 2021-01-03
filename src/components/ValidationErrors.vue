<template>
    <ul class="error-messages">
        <li v-for="errorMessage in errorMessages" :key="errorMessage">
            {{ errorMessage }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MvValidationErrors',
    props: {
        validationErrors: {
            type: Object,
            required: true
        }
    },
    computed: {
        errorMessages() {
            // получаем ключи из объекта
            return Object.keys(this.validationErrors).map(name => {
                const messages = this.validationErrors[name].join(', ') // текст сообщения
                return `${name}: ${messages}`
            })
        }
    }
}
</script>
