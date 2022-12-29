import AccountCreate from '../views/AccountCreate.vue'
import AccountDetail from '../views/AccountDetail.vue'
import AccountEdit from '../views/AccountEdit.vue'
import AccountHome from '../views/AccountHome.vue'
import Page404 from '../components/404/404.vue'

export const routes = [
  { path: '/', name: 'home', redirect: { path: '/account' } },
  {
    path: '/account',
    component: AccountHome,
    props: true,
    children: [
      {
        path: 'create',
        name: 'account-create',
        component: AccountCreate,
      },
      {
        path: ':id',
        name: 'account-detail',
        component: AccountDetail,
        props: true,
        children: [
          {
            path: 'edit',
            name: 'account-edit',
            component: AccountDetail,
            props: true,
            beforeEnter: (routeTo, routeFrom, next) => {
              if (routeFrom.name != 'account-detail') {
                next({
                  name: 'account-detail',
                  params: { id: routeTo.params.id },
                })
              } else next()
            },
          },
        ],
      },
    ],
  },
  { path: '/404', name: '404', component: Page404 },
  { path: '*', redirect: { name: '404' } },
]
