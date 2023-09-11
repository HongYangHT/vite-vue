// import { MockConfig } from 'vite-plugin-mock'
// import { Mock } from 'mockjs' // http://mockjs.com/ 不支持esm, 弃用
import { faker } from '@faker-js/faker' // https://fakerjs.dev/guide/usage.html

export default function () {
  return [
    {
      url: '/mock-api/json',
      method: 'get',
      response: {
        code: 200,
        data: [
          {
            userId: faker.string.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past()
          }
        ]
      }
    }
  ]
}
