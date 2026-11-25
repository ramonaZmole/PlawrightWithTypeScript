import { type Locator, type Page } from "@playwright/test";
import ContactForm from "../helpers/models/contact-form";
import BasePage from "./base-page";
import apiPaths from "../helpers/api-paths";

export default class Homepage extends BasePage {

    readonly #page: Page;

    readonly #nameInput: Locator;
    readonly #contactEmailInput: Locator;
    readonly #contactPhoneInput: Locator;
    readonly #subjectInput: Locator;
    readonly #messageInput: Locator;
    readonly #submitContactButton: Locator;

    constructor(page: Page) {
        super(page);
        this.#page = page;

        this.#nameInput = page.locator("#name");
        this.#contactEmailInput = page.locator("#email");
        this.#contactPhoneInput = page.locator("#phone");
        this.#subjectInput = page.locator("#subject");
        this.#messageInput = page.locator("#description");
        this.#submitContactButton = page.getByRole("button", { name: "Submit" });
    }

    async sendMessage(formData: ContactForm) {

        await this.#nameInput.fill(formData.name);
        await this.#contactEmailInput.fill(formData.email);
        await this.#contactPhoneInput.fill(formData.phone);
        await this.#subjectInput.fill(formData.subject);
        await this.#messageInput.fill(formData.message);

        const response = this.#page.waitForResponse(
            response => response.url().includes(apiPaths.message)
                && response.request().method() === "POST"
        );
        await this.#submitContactButton.click();
        await response;
    }
}