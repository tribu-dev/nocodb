<script setup lang="ts">
import type { WelcomeEventType } from 'nocodb-sdk'

const props = defineProps<{
  item: WelcomeEventType
}>()

const item = toRef(props, 'item')
</script>

<template>
  <NotificationItemWrapper :item="item">
    <div>Bienvenido a <span class="font-semibold">Lizz Dress!</span> Estamos emocionados de tenerte a bordo.</div>
  </NotificationItemWrapper>
</template>
