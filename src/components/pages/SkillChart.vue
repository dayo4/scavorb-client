<template>
    <section class="CanvasCont flex j-c-center">
        <canvas ref="Canvas" width="400" height="290"></canvas>
    </section>
</template>
<script lang="ts">
// import Vue from "vue"
// export default Vue.extend({})
// export default class SCHT extends Vue {
//     $refs!: {
//         Canvas: HTMLCanvasElement
//     }

//     mounted () {
//         this.createCanvas()
//     }

//     createCanvas () {
//         const Canvas = this.$refs.Canvas
//         let width = Canvas.width
//         const ctx = Canvas.getContext("2d")

//         const values = [ 0.93, 0.94, 0.93, 0.91, 0.92, 0.90, 0.82, 0.60, 0.68, 0.62 ]
//         const text = [
//             'JAVASCRIPT',
//             'CSS',
//             'HTML',
//             'TYPESCRIPT',
//             'VUEJS',
//             'NODEJS',
//             'UI DESIGN',
//             'PYTHON',
//             'GRAPHICS',
//             'PHP'
//         ]

//         drawRails()
//         function drawRails () {

//             for (let i = 0; i < values.length; i++)
//             {
//                 ctx.fillStyle = "#bdbdbd"
//                 ctx.fillRect(0, i * 30, width, 20)
//                 ctx.fillStyle = "#ad1457"
//                 ctx.fillRect(0, i * 30, width * values[ i ], 20)
//                 ctx.fillStyle = "#c2185b"
//                 ctx.fillRect(0, i * 30, 72, 20)
//                 ctx.fillStyle = "white"
//                 ctx.fillText(text[ i ], 3, i * 30 + 13)
//             }
//         }
//     }
// }
</script>
<style lang="scss" scoped>
.CanvasCont {
    // background-color: $blue-grey--3;
    // background-image: url("/defaults/pgs/cd.jpg");
    background-image: url("/defaults/pgs/p.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
canvas {
    width: 400px;
    border-left: solid crimson 1px;
    //   color: rgb(126, 174, 190);
}
@media only screen and (max-width: 410px) {
    canvas {
        width: 95%;
    }
}
</style>