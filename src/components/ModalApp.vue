<template>
  <div @click="closeDialog" class="modal show fade" v-if="show">
    <Transition appear name="bounce">
      <div @click.stop class="modal-content">
        <div class="modal-title">
          <slot name="header"></slot>
          <button type="button" class="btn-close" @click="closeDialog"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(53, 54, 71, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  &-content {
    width: auto;
  }
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 10px;
    .btn-close {
      font-size: 10px;
      margin-top: -7px;
    }
  }
  &-body {
    padding: 0;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
