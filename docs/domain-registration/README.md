# Pending free subdomain: jeypitch.is-a.dev

The requested name is not registered by this project yet. On October 9, 2026, the registry had no `domains/jeypitch.json`, and `jeypitch` did not match its reserved or internal name lists. Availability remains subject to the registry's review.

The proposed DNS configuration is in `jeypitch.json`. The CNAME points to `jeypitchai.github.io`, with no scheme, repository path, or trailing slash. The owner email is the portfolio's existing public contact address.

## Current registration blocker

On October 9, 2026, the [upstream registry](https://github.com/is-a-dev/register) displayed **PULL REQUESTS ARE DISABLED UNTIL FURTHER NOTICE** and allowed only collaborators to create pull requests. The requested subdomain cannot be registered while this restriction is in place. No DNS mapping is active for this request.

The owner's fork is [jeypitchai/register](https://github.com/jeypitchai/register). Prepared ownership and DNS details are saved in [domains/jeypitch.json on codex/jeypitch-domain](https://github.com/jeypitchai/register/blob/codex/jeypitch-domain/domains/jeypitch.json), commit `1e8403387d1b14e6dc23511a0c36cefc1ffd4730`. Recheck availability and the provider's registration status before submitting a request when registrations reopen.

## Registration preview configuration

On October 9, 2026, Pages settings were changed to GitHub Actions and the unapproved custom domain was cleared. The obsolete root `CNAME` file was also removed. The deployment now reads the default Pages URL and uses `/whoIam/`. [Deployment 37883862202](https://github.com/jeypitchai/whoIam/actions/runs/37883862202) passed build checks and deployment, and `https://jeypitchai.github.io/whoIam/` returned HTTP 200. Verify it still loads before submitting the registration request.

## Registration requires the owner's submission

The provider's current [Terms of Service, section 6](https://github.com/is-a-dev/register/blob/main/TERMS_OF_SERVICE.md) state that AI-created pull requests may be closed and the author may be blocked or limited. No registration pull request has been created by this assistant. The owner should read and accept the terms themselves and submit their own request.

Follow the [official quickstart](https://docs.is-a.dev/quickstart/): fork `is-a-dev/register`, add `domains/jeypitch.json` with the DNS and ownership details, and create a pull request using the unmodified upstream template. Personally complete the required declarations and describe the portfolio in your own words. Include the working GitHub Pages preview URL. The site is a personal software-engineering portfolio with project descriptions, skills, experience, certificates, and contact information.

## Map the approved subdomain

After the maintainers merge the registration request:

1. In `jeypitchai/whoIam` Settings → Pages, set the custom domain to `jeypitch.is-a.dev`.
2. Wait for GitHub's DNS check to succeed.
3. Rerun **Build and deploy portfolio**. The existing workflow reads the configured Pages URL automatically; it will build with `/` and `https://jeypitch.is-a.dev`.
4. Enable Enforce HTTPS once GitHub provisions the certificate.
5. Verify Home and each page, logo and portrait loading, video playback, and the resume download at the new domain.

Do not set the new custom domain before the registration is merged. The [provider's GitHub Pages guide](https://docs.is-a.dev/guides/github-pages/) requires this order. Domain ownership verification through GitHub account settings can be added using the provider's documented TXT-record process.
