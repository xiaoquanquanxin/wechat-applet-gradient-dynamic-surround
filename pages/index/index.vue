<template>
    <view class="wrap">
        <View class="background-wrap">
            <View class="house"
                  :style="{
                              backgroundImage:getBackgroundNext(),
                              }"
            ></View>
            <View class="house"
                  :style="{
                              backgroundImage:getBackground(),
                              opacity:opacity
                              }"
            ></View>
        </View>
        <View class="line">

        </View>
        <swiper class="swiper" :autoplay="false"
                @transition="transitionFn"
                @animationfinish="animationfinishFn"
                @change="change"
                :current="current"
        >
            <swiper-item v-for="item in list">
                <view class="swiper-item">
                    <View class="swiper-item-inner">
                        <View>opacity {{opacity}}</View>
                        <View>current {{current}}</View>
                        <View>overHalf {{overHalf}}</View>
                    </View>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script lang="ts">
    import {ref} from 'vue'
    import {getBackgroundIndex, getBackgroundNextIndex} from "../../utils";
    import background0 from '../../static/img/01.png';
    import background1 from '../../static/img/02.png';
    import background2 from '../../static/img/03.png';

    console.log(background0);


    const list = [
        {
            title: 'red',
            background: 'http://192.168.199.138:8080/img/01.png',
        },
        {
            title: 'green',
            background: 'http://192.168.199.138:8080/img/02.png',
        },
        {
            title: 'blue',
            background: 'http://192.168.199.138:8080/img/03.png'
        }
    ]
    export default {
        setup() {
            //  当前
            const current = ref(0);
            //  位移
            const dx = ref(0);
            //  不透明度
            const opacity = ref(1);
            //  方向，向右
            const turn = ref(true);
            //  滚动过半
            const overHalf = ref(false);
            //  开始改变
            let startChange: boolean = false;
            //  滚动结束
            let stopChange: boolean = false;
            //  位移
            const transitionFn = (e) => {
                //  滚动距离
                dx.value = e.target.dx | 0;
                //  方向
                turn.value = dx.value >= 0;
                //  滚动过半
                overHalf.value = (dx.value >= 375 / 2) || (dx.value <= -375 / 2);
                //  当前图的不透明度
                opacity.value = (1 - (Math.abs(dx.value) / 375))
                if (!opacity.value) {
                    opacity.value = 1;
                }
                opacity.value = opacity.value.toFixed(2);

                //  滚动中
                stopChange = false;
            };
            //  改变current
            const change = (e) => {
                current.value = e.target.current;
                console.log('发生change事件');
                //  开始改变
                startChange = true
            };

            //  获取背景图
            const getBackground = () => {
                const index = getBackgroundIndex(current.value, turn.value, overHalf.value, startChange, stopChange, list);
                console.log('当前index', current.value, '过半', overHalf.value, '开始改变', startChange, '停止滚动', stopChange, '目标', index);
                return `url(${list[index].background})`
            }
            //  获取后一个背景图
            const getBackgroundNext = () => {
                const index = getBackgroundNextIndex(current.value, turn.value, overHalf.value, startChange, stopChange, list);
                // console.log('当前index', current.value, '过半', overHalf.value, '开始改变', startChange, '停止滚动', stopChange, '目标', index);
                return `url(${list[index].background})`
            }

            //  滚动结束
            const animationfinishFn = () => {
                //  停止改变
                startChange = false;
                //  结束滚动
                stopChange = true;
            }
            return {
                list,
                current,
                dx,
                turn,
                opacity,
                overHalf,
                change,
                transitionFn,
                getBackground,
                animationfinishFn,
                getBackgroundNext
            }
        }
    }
</script>

<style lang="less">
    .wrap {
        background-color: blue;

        //  头部背景
        .background-wrap {
            height: 300px;
            position: relative;

            .house {
                width: 100%;
                height: 100%;
                display: block;
                background-size: cover;
                background-repeat: no-repeat;
                transition: .2s background;
                position: absolute;
                top: 0;
                left: 0;
            }

        }


        //  swiper 的内容
        .swiper-like {
            height: 200px;
            background: lightsteelblue;
        }

        .line {
            width: 100%;
            height: 20px;
            background-image: url(/static/img/bottom-border.png);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: top;
        }

        .swiper {
            height: 100vh;
            width: 100vw;
            position: absolute;
            top: 0;
            left: 0;

            .swiper-item {
                padding: 16px;
                margin-top: 320px;

                .swiper-item-inner {
                    border-radius: 16px;
                    background: lightgoldenrodyellow;
                }
            }
        }
    }
</style>