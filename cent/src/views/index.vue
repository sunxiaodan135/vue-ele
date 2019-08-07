<template>
    <div class="index">
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <div class="rightContain">
            <router-view></router-view>

        </div>
       
    </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
import LeftMenu from '../components/LeftMenu'
export default {
    name:'index',
    components:{
        HeadNav,
        LeftMenu
     }
}
</script>
<style scoped>

.index{
 width: 100%;
 height: 100%;
 overflow: hidden;

}
.rightContain{
position: fixed;
top:71px;
left: 200px;
width: 100%;
height: 100%;
overflow: auto;

}
</style>
