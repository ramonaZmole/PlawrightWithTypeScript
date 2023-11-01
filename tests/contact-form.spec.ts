import { expect, test } from '@playwright/test';
import Env from '../helpers/env';
import Homepage from '../pages/homepage';
import ContactForm from '../helpers/models/contact-form';
import { faker } from '@faker-js/faker';
import { contactFormEmptyFieldsErrorMessages, contactFormInvalidDataErrorMessages } from "../helpers/messages"


let homepage: Homepage;
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

test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
});

const testCases = [
    { caseValue: "empty", formData: emptyData, expectedErrors: contactFormEmptyFieldsErrorMessages },
    { caseValue: "invalid", formData: invalidData, expectedErrors: contactFormInvalidDataErrorMessages },
];

for (const { caseValue, formData, expectedErrors: expectedErrors } of testCases)
    test(`Send message with ${caseValue} data`, async ({ page }) => {
        await page.goto(Env.URL!)
        await homepage.sendMessage(formData);

        let actualErrors = await homepage.getErrorMessages();
        expect(actualErrors).toHaveLength(expectedErrors.length);
        expect(actualErrors).toEqual(expect.arrayContaining(expectedErrors));
    });

test.afterEach(async ({ page }) => {
    await page.close();
});