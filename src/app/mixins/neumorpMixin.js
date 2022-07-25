export const neumorpMixin = {
  directives: {
    click: {
      inserted(el, binding, vnode) {
        el.classList.add(`${binding.arg}-btn`)
        el.addEventListener('click', () => {
          el.classList.toggle('clicked')
          setTimeout(() => {
            binding.value()
            el.classList.toggle('clicked')
          }, 350)
        })
      },
    },
  },
}
