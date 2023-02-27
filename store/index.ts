// @ts-ignore
import {defineStore} from 'pinia'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    mainUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.istrameddiagnostika.ru',
    api: '/api/',
    loadData: false,
    showMenu: false,
    showRecord: false,
    accessToken: null as string | null,
    notification: {text: '', type: '', active: false},
    navigation: [
      {title: 'Главная', path: ''},
      {
        title: 'Медицинский центр', path: 'about', sub: [
          {title: 'О медицинском центре', path: 'about'},
          {title: 'Реквизиты', path: 'requisites'}
        ]
      },
      {title: 'Услуги и цены', path: 'services', sub: []},
      {title: 'Новости и акции', path: 'news'},
      {title: 'Специалисты', path: 'staff'},
      {title: 'Контакты', path: 'contacts'}
    ],
    footerNavigation: [
      {title: 'О медицинском центре', path: '/about'},
      {title: 'Услуги и цены', path: '/services'},
      {title: 'Новости и акции', path: '/news'},
      {title: 'Специалисты', path: '/staff'}
    ],
    staffList: [],
    servicesList: [],
    newsList: [],
    sliderList: [],
    requisitesList: []
  }),

  getters: {
    token: state => state.accessToken,
    apiLink: state => state.mainUrl + state.api,
    notify: state => state.notification,
    isShowMenu: state => state.showMenu,
    isShowRecord: state => state.showRecord,
    staff: state => state.staffList,
    services: state => state.servicesList,
    requisites: state => state.requisitesList,
    news: state => state.newsList,
    sliders: state => state.sliderList,
    nav: state => state.navigation,
  },

  actions: {
    setToken(token: string | null) {
      this.accessToken = token
    },
    removeToken() {
      this.accessToken = null
    },
    getServices() {
      const {data: servicesList} = useFetch(`${this.apiLink}services/get`) || []
      // @ts-ignore
      this.servicesList = servicesList
      const servicesIndex = this.navigation.findIndex(item => item.path === 'services')
      // @ts-ignore
      this.navigation[servicesIndex].sub = servicesList
    },
    getStaff() {
      const {data: staffList} = useFetch(`${this.apiLink}staff/get`) || []
      // @ts-ignore
      this.staffList = staffList
    },
    getNews() {
      const {data: newsList} = useFetch(`${this.apiLink}news/get`) || []
      // @ts-ignore
      this.newsList = newsList
    },
    getRequisites() {
      const {data: requisites} = useFetch(`${this.apiLink}requisites/get`) || [{}]
      // @ts-ignore
      this.requisitesList = requisites
    },
    getSliders() {
      const {data: sliderList} = useFetch(`${this.apiLink}site/getSlider`) || []
      // @ts-ignore
      this.sliderList = sliderList
    },
    showMenuAction(action: boolean) {
      this.showMenu = action
    },
    showRecordAction(action: boolean) {
      this.showRecord = action
    },
    setNotify(notification: { text: string, type: string, active: boolean }) {
      this.notification = notification
    },
  }
})