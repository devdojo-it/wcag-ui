# wcagUI - Making Accessibility... Accessible - Security Policy

**Last updated: 31 July 2025**

wcagUI is committed to protecting the security and privacy of our users. This document explains how we handle security issues and how you can help keep the project safe.

---

## Supported Versions

We follow [Semantic Versioning](https://semver.org). Only the latest patch release of each **minor** series receives security updates.

| Version          | Status         | Support Window                              |
| ---------------- | -------------- | ------------------------------------------- |
| `0.1.0` (latest) | ✅ Supported   | -                                           |
| `< 0.1.0`        | ❌ End‑of‑life | -                                           |


> **Note** We may back‑port critical fixes to older branches on a best‑effort basis, but we encourage all users to upgrade promptly.

---

## Reporting a Vulnerability

If you believe you have discovered a security vulnerability in **wcagUI**, **do not open a public issue**. Instead, choose **one** of the following private channels:

- GitHub’s **“Report a Vulnerability”** form, which opens a private Security Advisory.

Please include the following:

* Description of the issue and potential impact.
* Steps to reproduce or proof‑of‑concept code.
* Which versions are affected.
* Your preferred contact information and PGP key (optional).
* Whether you wish to be publicly credited.

### Response & Disclosure Timeline

| Stage                         | Target SLA                                     |
| ----------------------------- | ---------------------------------------------- |
| **Acknowledgement**           | Within **2 business days** (Mon–Fri, CET)      |
| **Status updates**            | At least **once every 7 days**                 |
| **Fix & coordinated release** | Critical: **≤ 30 days** · Other: **≤ 90 days** |

We will coordinate a public disclosure once a patch is available and users have had reasonable time to upgrade (usually 24–48 hours). Reporters will be credited in release notes unless anonymity is requested.

### Scope

This policy covers code, build scripts, and documentation within the **devdojo‑it/wcag-ui** GitHub organisation. Vulnerabilities in third‑party dependencies should be reported upstream unless they can be exploited solely through wcagUI.

### Out‑of‑Scope Issues

* Vulnerabilities that require unrealistic resources (e.g., billions of requests).
* Best‑practice headers missing in demo pages or tests.
* Previously disclosed or fixed issues.

---

## Security Hall of Fame

We currently do **not** run a paid bug‑bounty program, but we applaud responsible disclosure. Valid reports earn a place in our **Security Hall of Fame** and occasional swag (budget permitting).

---

## Attribution

This policy draws inspiration from the security guidelines of Kubernetes, Django, Node.js, and the GitHub default security policy.

*Thank you for helping us keep wcagUI safe and accessible for everyone!*
