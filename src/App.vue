<template>
  <v-app>
    <v-app-bar :flat="true" :height="55" :elevation="2">
      <h2 class="ml-4">Todo</h2>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item link title="Список дел" :to="{ name: 'home' }"></v-list-item>
        <v-list-item link title="О приложении" :to="{ name: 'about' }"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <div class="text-body-14"></div>
      <v-spacer></v-spacer>
      <div class="text-body-14">Todo</div>
    </v-footer>
  </v-app>
</template>
