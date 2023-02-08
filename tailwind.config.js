const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './util/**/*.{js,jsx,ts,tsx}'],
    media: false, // or 'media' or 'class'
    theme: {
        minHeight: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        /*
        From nuowen: I don't understand why this config exists.
        it restricts the full usage of colors from tailwind, and maps the slate color to blue??? Why?
        */
        // colors: {
        //     orange: colors.orange,
        //     gray: colors.gray,
        //     blue: colors.slate,
        //     white: colors.white,
        //     red: colors.red
        // },
        // screens: {
        //     'sm': '300px',
        //     'lg': '700px'
        // },
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: theme => ({
                'hero': "url('~/assets/brown.jpeg')",
                "form_background": "url('../public/form_background.png')"
            }),
        },
    },
    variants: {
        extend: {
            translate: ['hover'],
        },
      extend: {
        fontFamily: {
          'inter': "'Inter', sans-serif"
        },
        backgroundImage: theme => ({
         'hero': "url('~/assets/brown.jpeg')"
        }),
      },
      
  },
  variants: {
    extend: {
      translate: ['hover'],
    },
    plugins: [require('@tailwindcss/aspect-ratio'),],
}
}