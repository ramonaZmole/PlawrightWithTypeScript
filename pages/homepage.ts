import { type Locator, type Page } from "@playwright/test";
import ContactForm from "../helpers/models/contact-form";
import BasePage from "./base-page";

export default class Homepage extends BasePage {

    readonly #page: Page;

    readonly #nameInput: string;
    readonly #contactEmailInput: string;
    readonly #contactPhoneInput: string;
    readonly #subjectInput: string;
    readonly #messageInput: string;
    readonly #submitContactButton: string;

    constructor(page: Page) {
        super(page);
        this.#page = page;

        // this.#nameInput = page.locator("#name");
        // this.#contactEmailInput = page.locator("#email");
        // this.#contactPhoneInput = page.locator("#phone");
        // this.#subjectInput = page.locator("#subject");
        // this.#messageInput = page.locator("#description");
        // this.#submitContactButton = page.locator("#submitContact");

        this.#nameInput = "#name";
        this.#contactEmailInput = "#email";
        this.#contactPhoneInput = "#phone";
        this.#subjectInput = "#subject";
        this.#messageInput = "#description";
        this.#submitContactButton = "#submitContact";
    }

    // async sendMessage(formData: ContactForm) {

    //     await this.#nameInput.fill(formData.name);
    //     await this.#contactEmailInput.fill(formData.email);
    //     await this.#contactPhoneInput.fill(formData.phone);
    //     await this.#subjectInput.fill(formData.subject);
    //     await this.#messageInput.fill(formData.message);

    //     await this.#submitContactButton.click();
    //     await  this.#page.waitForEvent("requestfinished");
    // }

    async sendMessage(formData: ContactForm) {

        await this.#page.locator(this.#nameInput).fill(formData.name);
        await this.#page.locator(this.#contactEmailInput).fill(formData.email);
        await this.#page.locator(this.#contactPhoneInput).fill(formData.phone);
        await this.#page.locator(this.#subjectInput).fill(formData.subject);
        await this.#page.locator(this.#messageInput).fill(formData.message);

        await this.#page.locator(this.#submitContactButton).click();
        await this.#page.waitForEvent("requestfinished");
    }
}