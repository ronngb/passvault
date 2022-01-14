import Account from '../views/Account.vue'
import AccountCreate from '../views/AccountCreate.vue'
import AccountDetail from '../views/AccountDetail.vue'
import AccountEdit from '../views/AccountEdit.vue'

// TODO: rename all name property i.e create -> account-create
export const routes = [
  { path: '/account/create', name: 'account-create', component: AccountCreate },
  {
    path: '/account/:id',
    component: Account,
    props: true,
    children: [
      {
        path: '',
        name: 'account-detail',
        component: AccountDetail,
        props: true,
      },
      {
        path: 'edit',
        name: 'account-edit',
        component: AccountEdit,
        props: true,
      },
    ],
  },
]
