import AddForm from '../components/information/AddForm.vue'
import Account from '../views/Account.vue'
import AccountDetail from '../views/AccountDetail.vue'
import AccountEdit from '../views/AccountEdit.vue'

export const routes = [
  { path: '/account/add', name: 'addForm', component: AddForm },
  {
    path: '/account/:id',
    component: Account,
    props: true,
    children: [
      { path: '', name: 'detail', component: AccountDetail, props: true },
      { path: 'edit', name: 'edit', component: AccountEdit, props: true },
    ],
  },
]
