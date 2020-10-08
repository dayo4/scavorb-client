// import { $Notify, $Axios, $LSAgent, $Router } from '@/plugins'
import { $Navs } from '@/myStore'
export class Container {

    element: Window = null  /* This will be used to point to the MainContainer component from other components */
    scrolled: boolean = false

    ScrollingHandler () {
        let topNav = $Navs.$top.element
        // let bottomNav = $Navs.$bottom.element
        let scrollPos = this.element.pageYOffset

        let _this = this
        this.element.addEventListener('scroll', function () {
            var subsequentScrollPos = _this.element.pageYOffset

            /* For monitoring the container scrolled status */
            if (subsequentScrollPos > 50)
            {
                _this.scrolled = true
            } else
            {
                _this.scrolled = false
            }

            /* For hiding the TopNav when scrolling downward*/
            if (subsequentScrollPos > 60)
            {
                scrollPos > subsequentScrollPos
                    ? topNav.classList.remove('rotated')
                    : topNav.classList.add('rotated')
                scrollPos = subsequentScrollPos
            }
        }, false)
    }
}
