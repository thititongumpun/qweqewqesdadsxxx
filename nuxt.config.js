export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "Healthy Application",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/date-thai.js" },
    { src: "~/plugins/chart.js", mode: "client" },
    { src: "~/plugins/vue-sweetalert2.js" },
    { src: "~/plugins/pwa-update.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/onesignal",
    "@nuxtjs/pwa",
    "@nuxtjs/moment",
  ],

  moment: {
    timezone: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://api.thiti.live/api/v1",
  },

  // Authenticated routes
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/dashboard",
    },
    strategies: {
      local: {
        token: {
          property: "jwtToken",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: "/Accounts/authenticate", method: "post" },
          logout: false,
          user: { url: "/Accounts/authenticate/me", method: "get" },
        },
      },
    },
  },

  oneSignal: {
    init: {
      appId: "5f965ecd-82cc-42d6-8144-77767d4e46d4",
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false,
        Text: "Welcome to Healthy",
      },
      autoRegister: true,
      notifyButton: {
        enable: true,
      },
    },
    cdn: true,
    OneSignalSDK: "https://cdn.onesignal.com/sdks/OneSignalSDK.js",
  },

  // Router Auth
  router: {
    middleware: ["auth"],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      fileName: "healthy-whitebg.png",
      purpose: ["any", "maskable"],
    },
    manifest: {
      name: "Healthy Application",
      short_name: "Healthy App",
      lang: "en",
      description: "management healthy for better life",
    },
    meta: {
      name: "Healthy Application",
    },
    workbox: {
      dev: false,
      cachingExtensions: "@/plugins/cachepwa.js",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
