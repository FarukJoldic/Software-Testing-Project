# Software Testing Project

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Scenarios](#scenarios)
- [Acknowledgments](#acknowledgments)

## Introduction

This repository contains automated tests for the DemoBlaze website. The tests are written in TypeScript using Playwright.

## Prerequisites

-Node.js installed on your machine

-npm (Node Package Manager)

## Setup
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FarukJoldic/Software-Testing-Project.git
   cd Software-Testing-Project

2. **Initialize the project with npm:**
   ```bash
   npm init

3. **Install Playwright:**
   ```bash
   npm install @playwright/test
   npx playwright install

  ## Usage

### Run all tests at once
```bash
npx playwright test
```
### Run all tests (Headed Mode)
```bash
npx playwright test --headed
```
### Run all tests (Headed Mode)
```bash
npx playwright test --browser=YourBrowserOfChoice
```
### Run smoke tests only
```bash
npm run tests:smoke
```
### Run regression tests only
```bash
npm run tests:regression
```
## Scenarios

### Smoke tests
```bash
Add to Cart
Checkout
Home Page
Log In
Sign Up
```
### Regression tests
```bash
Carousel
Cart Total
Categories
Contact
Currency
Footer
Logo Redirect
Pagination
Product Details
Remove From Cart
```

## Acknowledgments
We would like to thank our Proffessor and our assistant for their guidance and support during this project. 
Their feedback and advice have been invaluable in helping us improve our understanding of software testing and refine our work.

We appreciate the time and effort you have dedicated to helping us succeed! 🫶




