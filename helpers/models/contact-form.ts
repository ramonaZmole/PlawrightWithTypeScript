import { faker } from '@faker-js/faker'

export default class ContactForm {
    name: string = faker.person.firstName();
    email: string = faker.internet.email();
    phone: string = "89123749157";
    subject: string = faker.lorem.sentence();
    message: string = faker.lorem.paragraph();
}