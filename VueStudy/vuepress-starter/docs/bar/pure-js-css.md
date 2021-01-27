# 原生 JS 和 CSS 语法支持       

<!-- CSS样式 -->
<style>
    .box {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: #fff;
        background-color: #58a;
    }
</style>

<style lang="stylus">
    .box-another 
        width: 100%
        height: 100px
        line-height: 100px
        text-align: center
        color: #fff
        background-color: #fb3
        
</style>

<div id="container"></div>
<div class="box-another">
    師子！我確實教導人家不要做任何壞事，你可以依此而說我是非作業論者。不過，在此同時，我也教人要做所有的好事，所以你也應當說我是作業論者才對。不但這樣，我還教人斷除貪、瞋、癡等一切惡行，也可以被說成是斷滅論者；教人要厭惡種種惡行，也可以被說成是厭惡論者；教人調伏貪、瞋、癡等一切惡行，也可以說成是調伏論者；教人刻苦堅忍，以燒盡自己的惡行，正如斬草除根一樣，也可以被說成是苦行論者；教人捨棄入胎於來世的後有愛，也可以說成是離胎論者；教人最殊勝的安穩法，也可以被說成是安穩論者。
</div>


<!-- js脚本内容 -->
<script>
    window.onload = function () {
        var dom = document.getElementById("container");
        dom.innerHTML = "box content";
        dom.className = "box";
    }
</script>