/** @type {import('tailwindcss').Config} */
  
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}", 
    "./src/screens/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: '#00266F',
        error: '#E31003',
        text: '#414141',
        secondary:'#DFE8FB',
        subtitulo:'#868686',
        transparent: 'transparent' 
      },
      
    },
  },
  plugins: [],
}

