window.addEventListener('load', function (event) {
  const el = document.querySelector('#board')

  if (el) {
    console.log(el.dataset.lists)
    console.log(JSON.parse(el.dataset.lists))
    new Vue({
      el,
      delimiters: ['${', '}'],
      data: {
        lists: JSON.parse(el.dataset.lists)
      }
    })
  }
})
