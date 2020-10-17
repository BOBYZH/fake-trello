import List from '../components/list.vue'

window.addEventListener('load', function (event) {
  const el = document.querySelector('#board')

  if (el) {
    new Vue({
      el,
      delimiters: ['${', '}'],
      data: {
        lists: JSON.parse(el.dataset.lists)
      },
      components: { List }
    })
  }
})
