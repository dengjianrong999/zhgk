import Vue from 'vue'
import Router from 'vue-router'
import HeadPage from '@/components/Head'
import actxTaskDefinitionForm from '@/components/activity/actxTaskDefinitionForm'
import dbtaskForm from  '@/components/sign/dbtaskForm'
import bjtaskForm from '@/components/sign/bjtaskForm'
import UserSelectTree from '@/components/activity/UserSelectTree'
import zdwryForm from '@/components/yearReport/zdwryForm'
import importFileForm from '@/components/yearReport/importFileForm'
import wrypkForm from '@/components/yearReport/wrypkForm'
import gfjcxForm from '@/components/yearReport/gfjcxForm'
import pjxmqForm from '@/components/yearReport/pjxmqForm'
import pjxmsForm from '@/components/yearReport/pjxmsForm'
import pjbzForm from '@/components/yearReport/pjbzForm'
import jcsjForm from '@/components/yearReport/jcsjForm'
import pfqxForm from '@/components/yearReport/pfqxForm'
import industryTypeTree from '@/components/yearReport/industryTypeTree'
import wrypkqForm from '@/components/yearReport/wrypkqForm'
import jcsjqForm from '@/components/yearReport/jcsjqForm'
import jcsjcjdqForm from '@/components/yearReport/jcsjcjdqForm'
import gfstyForm from '@/components/yearReport/gfstyForm'
import gfdxsForm from '@/components/yearReport/gfdxsForm'
import createReport from '@/components/yearReport/createReport'
import fsjczbTree from '@/components/yearReport/fsjczbTree'
import defData from '@/components/yearReport/defData'
import factorSelectPage from '@/components/yearReport/factorSelectPage'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HeadPage',
            component: HeadPage
        },
        {
            path:"/createReport",
            name:"createReport",
            component:createReport
        },
        {
            path:"/defData",
            name:"defData",
            component:defData
        },
        {
            path:"/actxTaskDefinitionForm/:id",
            name:"actxTaskDefinitionForm",
            component:actxTaskDefinitionForm
        },
        {
            path:"/dbtaskForm/:id",
            name:"dbtaskForm",
            component:dbtaskForm

        },
        {
            path:"/bjtaskForm/:id",
            name:"bjtaskForm",
            component:bjtaskForm
        },
        {
           path:"/UserSelectTree",
           name:"UserSelectTree",
           component:UserSelectTree
        },
        {
            path:"/zdwryForm/:id",
            name:"zdwryForm",
            component:zdwryForm       
        },
        {
            path:"/importFileForm",
            name:"importFileForm",
            component:importFileForm
        },
        {
            path:"/wrypkForm/:id",
            name:"wrypkForm",
            component:wrypkForm
        },
        {
            path:"/gfjcxForm/:id",
            name:"gfjcxForm",
            component:gfjcxForm
        },
        {
            path:"/pjxmqForm/:id",
            name:"pjxmqForm",
            component:pjxmqForm
        },
        {
            path:"/pjxmsForm/:id",
            name:"pjxmsForm",
            component:pjxmsForm
        },
        {
            path:"/pjbzForm/:id",
            name:"pjbzForm",
            component:pjbzForm
        },
        {
            path:"/jcsjForm/:id",
            name:"jcsjForm",
            component:jcsjForm
        },
        {
            path:"/pfqxForm/:id",
            name:"pfqxForm",
            component:pfqxForm
        },
        {
            path:"/industryTypeTree",
            name:"industryTypeTree",
            component:industryTypeTree
        },
        {
            path:"/wrypkqForm/:id",
            name:"wrypkqForm",
            component:wrypkqForm
        },
        {
            path:"/jcsjqForm/:id",
            name:"jcsjqForm",
            component:jcsjqForm
        },
        {
            path:"/jcsjcjdqForm/:id",
            name:"jcsjcjdqForm",
            component:jcsjcjdqForm
        },
        {
            path:"/gfstyForm/:id",
            name:"gfstyForm",
            component:gfstyForm
        },
        {
            path:"/gfdxsForm/:id",
            name:"gfdxsForm",
            component:gfdxsForm
        },
        {
            path:"/fsjczbTree",
            name:"fsjczbTree",
            component:fsjczbTree
        },
        {
            path:"/factorSelectPage",
            name:"factorSelectPage",
            component:factorSelectPage
        }
        

    ]
})
