<template>
    <div id="panigation" class="fen">
        <span @click="toPage(1);">
            <i v-if="page == 1" class="homePage glyphicon glyphicon-step-backward"></i>
            <i v-else class="glyphicon glyphicon-step-backward"></i>
        </span>
        <span @click="optPage(0)" class="fen-left">
            <i v-if="page == 1" class="homePage glyphicon glyphicon-backward"></i>
            <i v-else class="glyphicon glyphicon-backward"></i>
        </span>
        <span>
            <input type="text" ref='pageInput' @input='toPage($event.target.value)' :value="page" />
        </span>
        <span class="fen-total">共{{total}}页</span>
        <span @click="optPage(1)" class="fen-right">
            <i v-if="page == total" class="homePage glyphicon glyphicon glyphicon-forward"></i>
            <i v-else class="glyphicon glyphicon glyphicon-forward"></i>
        </span>
        <span @click="toPage(total)">
            <i v-if="page == total" class="homePage glyphicon glyphicon-step-forward"></i>
            <i v-else class="glyphicon glyphicon-step-forward"></i>
        </span>
        <span class="fenye">
            <select :value="rows" @change='select($event.target.value)'>
                <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <span class="caret"></span>
        </span>
    </div>
</template>

<script>
    export default {
        props: ['rows', 'page', 'total', 'options'], // page当前页数 rows显示行数 total总页数 options 可供选择的行数(数组)
        data() {
            return {}
        },
        mounted() {
            // console.log(this.page,this.total,this.rows,this.options)
        },
        methods: {
            toPage(page) {
                if (typeof (page) !== 'number') { //翻页操作时 page 为 number类型
                    page = page.replace(/\D/g, '');
                    if (page.length != 0) {
                        if (page > this.total) {
                            page = this.total;
                        } else if (page < 1) {
                            page = 1;
                        }
                    }
                }
                this.$refs.pageInput.value = page;
                this.$emit('changePage', page);
            },
            optPage(opt) {
                this.$emit('operatePage', opt);
            },
            select(rows) {
                this.$emit('changeRows', rows)
            }
        }
    }
</script>

<style scoped="scoped">
    .homePage {
        color: #C8C7C7 !important;
    }

    .fen {
        width: 100%;
        display: flex;
        justify-content: center;
        height: 60px;
        align-items: center;
    }

    .fen-left {
        border-right: #C8C7C7 solid 2px;
        padding-right: 15px;
    }

    .fen-right {
        border-left: #C8C7C7 solid 2px;
        padding-left: 15px;
    }

    .fen span {
        display: inline-block;
        margin: 5px;
    }

    .fen-total {
        font: 14px "microsoft yahei";
        color: #666666;
    }

    .fen span input,
    .fen span select{
    	width: 50px;
        height: 22px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #a9a9a9;
    }
    .fen span input {
    	text-align: center;
    }
    .fen span select{
    	text-indent: 3px;
		padding: 0 !important;
        /* background: rgba(255,255,255,0); */
        background: hsla(0,0%,100%,0);
    }
    .glyphicon {
        color: #333333;
    }

    .caret {
		/* position: relative;
		top: -1px;
		right: 24px;
		z-index: -99999;
        display: inline-block;
        margin-left: 2px;
        border-top: 6px solid #666666;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent; */
        position: relative;
        top: -1px;
        right: 25px;
        z-index: -99999;
        display: inline-block;
        margin-left: 2px;
        border-top: 6px solid #666;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
    }
    input, select, textarea {
    font-size: 12px !important;
    color: #666666 !important;
}
</style>
