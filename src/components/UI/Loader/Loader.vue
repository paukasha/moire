<template>
  <div class="loader">
    <div class="ring">
      <span></span>
    </div>
    <div class="load-text">Загрузка</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 220px;
}

.load-text {
  color: #e02d71;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: transparent;
  border: 3px solid transparent;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 12px;
  color: #e02d71;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #e02d71;
}

.ring:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #e02d71;
  border-right: 3px solid #e02d71;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}

span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}

span:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e02d71;
  top: -2px;
  right: -4px;
  box-shadow: 0 0 20px #e02d71;
}

@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
</style>
