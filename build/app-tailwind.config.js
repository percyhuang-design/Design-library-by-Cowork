module.exports = {
  darkMode: 'class',
  content: ["./App.jsx","./previews.jsx"],
  theme: { extend: { colors: { indigo: {
    50:'#f1f6ff',100:'#e3efff',200:'#c5d8fe',300:'#98bcff',400:'#659aff',
    500:'#3d75ff',600:'#1c4dfb',700:'#0c2fd0',800:'#05099d',900:'#03006a',950:'#02003d'
  } } } },
  plugins: [], corePlugins: { preflight: true }
}
