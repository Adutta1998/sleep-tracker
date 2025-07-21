<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/report">Report</router-link>
    </nav>
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>