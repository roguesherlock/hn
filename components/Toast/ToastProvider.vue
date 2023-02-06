<script setup lang="ts">
const { toasts, dismiss, pauseTimer, startTimer } = useToast()
</script>
<template>
  <Teleport to="body">
    <HeadlessTransitionRoot
      :show="toasts.length > 0"
      tag="div"
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 z-40 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <template v-for="toast in toasts" :key="toast.id">
          <HeadlessTransitionChild
            :show="true"
            enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <Toast
              :title="toast.title"
              :description="toast.description"
              :type="toast.type"
              @mouseenter="pauseTimer(toast.id)"
              @mouseleave="startTimer(toast.id)"
              @dismiss="dismiss(toast.id)"
            >
            </Toast>
          </HeadlessTransitionChild>
        </template>
      </div>
    </HeadlessTransitionRoot>
  </Teleport>
</template>
