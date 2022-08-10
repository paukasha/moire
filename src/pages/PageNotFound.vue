<template>
  <div class="pageNotFound">
    <h4>Страница не найдена!
      Поищите, пожалуйста, другую!
    </h4>

    <h2>или вместо поиска страниц вы можете поискать подходящий
      товар в нашем магазине.
      У нас есть всё! </h2>

    <button class="cart__button button button--primery"
            type="button"
            @click.prevent="goToCatalog"
    >
      Поискать товар в каталоге
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goToCatalog() {
      this.$router.push({ name: 'MainPage' });
    }
  }
};
</script>

<style scoped>
.cart__button {
  display: block;
  margin: 0 auto;
  max-width: 400px;
  animation: btn-animation  infinite 5s linear;
}

.pageNotFound {
  text-align: center;
}

@keyframes btn-animation {
  0% {
    background-color: #e02d71;
  }

  20% {
    background-color: #150c26;
  }

  40% {
    background-color: aqua;
  }

  60% {
    background-color: darkgreen;
  }

  80% {
    background-color: magenta;
  }

  100% {
    background-color: #e02d71;
  }
}
</style>
