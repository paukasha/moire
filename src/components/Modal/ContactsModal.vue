<template>
  <div class="fixed-overlay fixed-overlay__modal"
  @click="$emit('close', $event)">
    <div class="modal">
      <slot></slot>

    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.fixed-overlay__modal {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ea73cb2b;
  position: fixed;
  z-index: 60;
}

.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #e02d71;
  border-radius: 1px;
  background: #fff;
  padding: 40px;
  max-width: 600px;
  width: 100%;
}

</style>
