This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
Дедлайн 1 неделя.

---

Нужно сверстать онлайн-сервис по мониторингу и уничтожению опасных астероидов на основе данных API NASA.
АПИ: https://api.nasa.gov (https://api.nasa.gov/) Asteroids - NeoWs

На главной список подлетов астероидов к Земле от текущей даты в бесконечность. Подгрузка при скролле порциями. По каждому астероиду: название, размер, оценка опасности, как близко будет к Земле, точная дата максимального подлёта. Иконка сближения в зависимости от опасности. Фильтр по опасности. И опция вывода расстояний: в километрах или расстояниях до Луны.

В фоне шапки есть изображение, которое должно быть получено в API NASA APOD (картинка дня).

Адаптивная вёрстка.

В подробной информации по астероиду помимо инфы, перечисленной выше, список всех его сближений. По каждому сближению: скорость относительно Земли, время максимального сближения с Землей, расстояние до Земли, по орбите вокруг чего летит.

В списке и на странице астероида есть кнопка добавления астероида в список на уничтожение.

Список на уничтожение — это некая корзина, где отображаются выбранные подлеты астероидов. В конце страницы кнопка заказа бригады им. Брюса Уиллиса на выбранные астероиды. Бригада будет доставлена на астероид в нужный момент и выполнит свою нелёгкую работу.

Дизайн-макет отрисован только для первой страницы, остальные две вы делаете на своё усмотрение.
https://www.figma.com/file/UOdZ5Qzkif1Ideye76OpjA/Armaggedon-V2?node-id=0%3A1

- Использовать Next.js (также принимаются решения на React, если будет реализован SSR);
- Использование redux нежелательно;
- Стилизация с помощью CSS модулей;
- Решение предоставить в виде git репозитория (github/bitbucket/gitlab по выбору);
- Корректное отображение в последних версиях браузеров (chrome, firefox, safari, edge);

Будет плюсом:

- использование TypeScript;
- тесты;
- если вы задеплоите ваш проект на любой удобный для вас хостинг;
- документация/инструкция по сборке проекта (README);
