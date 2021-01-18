<template>
    <ul v-if="tagList" class="tag-list">
        <li
            v-for="tag in tagList"
            :key="tag"
            class="tag-default tag-pill tag-outline"
        >
            {{ tag }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MvTaglist',
    props: {
        tagList: {
            type: Array,
            required: false
        }
    }
}
</script>
