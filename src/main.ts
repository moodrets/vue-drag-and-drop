import { createApp } from 'vue'
import '@/styles/styles.scss'
import App from '@/App.vue'
import { DropdownDirective } from '@/directives/Dropdown'

const app = createApp(App)

app.directive('dropdown', DropdownDirective)

app.mount('#app')