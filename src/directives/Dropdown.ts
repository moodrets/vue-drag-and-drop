import { DirectiveBinding } from 'vue'

const removeActiveDropdowns = () => {
    document.querySelectorAll('[data-dropdown]').forEach((item) => item.classList.remove('is-active'))
}

const removeActiveDropdownsListener = function (event: Event) {
    const target = event.target as HTMLElement
    if (!target.dataset['dropdown'] && !target.closest('[data-dropdown]')) {
        removeActiveDropdowns()
    }
}

export const DropdownDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding, vnode: any, prevNode: any) {
        if (binding.value.action) {
            el.dataset['dropdown'] = binding.value.action
        }

        if (binding.value.position) {
            el.dataset['dropdownPosition'] = binding.value.position
        }

        if (binding.value.action === 'click') {
            document.removeEventListener('click', removeActiveDropdownsListener)
            document.addEventListener('click', removeActiveDropdownsListener)
            el.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                if (target.classList.contains('.app-dropdown') || target.closest('.app-dropdown')) {
                    return
                }
                if (el.classList.contains('is-active')) {
                    el.classList.remove('is-active')
                } else {
                    removeActiveDropdowns()
                    el.classList.add('is-active')
                }
            })
        }
    },
}

export const DropdownDirectiveClickConfig = {
    action: 'click',
    position: 'right',
}

export const DropdownDirectiveHoverConfig = {
    action: 'hover',
    position: 'right',
}
