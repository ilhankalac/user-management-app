import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0F172A',
          secondary: '#233039',
          darkText: '#374355',
          greyText: '#BFC4D4'
        },
      },
    },
  },
})
