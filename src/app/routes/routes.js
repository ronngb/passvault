import AccountCreate from '../views/AccountCreate.vue'
import AccountDetail from '../views/AccountDetail.vue'
import AccountEdit from '../views/AccountEdit.vue'
import AccountInfo from '../views/AccountInfo.vue'
import AccountInfoDates from '../views/AccountInfoDates.vue'
import AccountInfoButtons from '../views/AccountInfoButtons.vue'

export const routes = [
  { path: '/account/create', name: 'account-create', component: AccountCreate },
  {
    path: '/account/:id/info',
    component: AccountInfo,
    props: true,
    children: [
      {
        path: '',
        name: 'account-info',
        component: AccountInfoDates,
        props: true,
      },
      {
        path: 'edit',
        name: 'account-edit',
        component: AccountInfoButtons,
        props: true,
      },
    ],
  },
]
