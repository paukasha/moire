export const connectList = [
  {
    id: 1,
    name: 'Электронная почта',
    value: '',
    rules: 'email',
    placeholder: 'Введите email'
  },
  {
    id: 2,
    name: 'Sms-уведомление',
    value: '',
    rules: 'min:18',
    placeholder: 'Введите номер телефона'
  },
];

export const footerNav = [
  {
    id: 1,
    title: 'Каталог',
    href: {
      name: 'MainPage',
      path: '/'
    }
  },
  {
    id: 2,
    title: '8 800 600 90 09',
    href: 'tel:88006009009'
  },
  {
    id: 3,
    title: 'hi@technozavrrr.com',
    href: 'mailto:hi@technozavrrr.com'
  },
  {
    id: 4,
    title: 'Распродажа',
  },
  {
    id: 5,
    title: 'Заказать звонок',
  },
  {
    id: 6,
    title: 'Информация о заказе'
  },
];

export const productInfoTabsList = [{
  id: 1,
  title: 'Информация о товаре',
  content: ''
}, {
  id: 2,
  title: 'Доставка и возврат'
}];
