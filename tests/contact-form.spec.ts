import test, { expect } from "../helpers/fixtures/test-fixture";
import Env from '../helpers/env';
import ContactForm from '../helpers/models/contact-form';
import { faker } from '@faker-js/faker';
import { contactFormEmptyFieldsErrorMessages, contactFormInvalidDataErrorMessages } from "../helpers/messages"


let emptyData: ContactForm = {
    email: "",
    name: "",
    phone: "",
    message: "",
    subject: ""
}

let invalidData: ContactForm = {
    email: faker.number.int(50).toString(),
    name: faker.number.int(50).toString(),
    phone: faker.number.int(50).toString(),
    message: faker.number.int(50).toString(),
    subject: faker.number.int(50).toString(),
}

const testCases = [
    { caseValue: "empty", formData: emptyData, expectedErrors: contactFormEmptyFieldsErrorMessages },
    { caseValue: "invalid", formData: invalidData, expectedErrors: contactFormInvalidDataErrorMessages },
];

for (const { caseValue, formData, expectedErrors: expectedErrors } of testCases)
    test(`Send message with ${caseValue} data`, async ({ page, homepage }) => {
        await page.goto(Env.URL!)
        await homepage.sendMessage(formData);

        let actualErrors = await homepage.getErrorMessages();
        expect(actualErrors).toHaveLength(expectedErrors.length);
        expect(actualErrors).toEqual(expect.arrayContaining(expectedErrors));
    });
