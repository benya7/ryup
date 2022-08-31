# ryup - Universal Profile Social Recovery

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/en0c-026/ryup">
    <img src="public/favicon.png" alt="Logo" width="48" height="48">
  </a>

<h3 align="center">ryup</h3>

  <p align="center">
    Recover your Universal Profile
    <br />
    <a href="https://github.com/en0c-026/ryup/tree/master/docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ryup.vercel.app">Live Dapp Demo</a>
    ·
    <a href="https://youtu.be/1wi7zcAYTsw">View Demo</a>

    ·
    <a href="https://github.com/en0c-026/ryup/issues/new?title=Bug: ">Report Bug</a>
    ·
    <a href="https://github.com/en0c-026/ryup/issues/new?title=Feature: ">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![](https://github.com/en0c-026/ryup/blob/master/public/logo-large.png)

**Deploy, manage, vote and recover on RyUP.**
This is a decentralized application that implements the [LSP11BasicSocialRecovery](https://github.com/YamenMerhi/LIPs/blob/docs/lsp11/LSPs/LSP-11-BasicSocialRecovery.md) standard, to recover access to a [**LUKSO Universal Profile**](https://docs.lukso.tech/standards/universal-profile/introduction).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org)
* [tailwindcss](https://v2.tailwindcss.com)
* [flowbite-react](https://flowbite-react.com)
* [Ethers.js](https://github.com/ethers-io/ethers.js/)
* [ryup-social-recocery-tool](https://github.com/en0c-026/up-basic-social-recovery)
* [@lukso/lsp-smart-contracts](https://github.com/lukso-network/lsp-smart-contracts)
* [@erc725/erc725.js](https://github.com/ERC725Alliance/erc725.js)
* 
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
* yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/en0c-026/ryup.git
   ```
2. Install NPM packages
   ```sh
   cd ryup
   yarn install
   ```
4. Run the project
   ```sh
   yarn dev
   ```
  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
Note:
Version compatible with Metamask.
Version not compatible with Lukso Browser Wallet.

The universal profile must be owned by a Key Manager that implements the standard [LSP6KeyManager](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager)
For more information on how the LSP11BasicSocial Recovery standard works, [click here](https://github.com/YamenMerhi/LIPs/blob/docs/lsp11/LSPs/LSP-11-BasicSocialRecovery.md).


### Deploy
Implement a new contract with the LSP11 standard. It grants permissions and registers the address in the Universal Profile storage keys.

### Manage
Manage the social recovery tool linking to the address of the Universal Profile. Add or remove guardians, change the secret or change the threshold.

### Vote
Vote a new candidate address to recover access to the Universal Profile. The caller has to be a guardian.

### Recover
Vote a new candidate address to recover access to the Universal Profile. The caller has to be a guardian.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap


See the [open issues](https://github.com/en0c-026/ryup/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/en0c-026/ryup/blob/master/LICENSE.md) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Participant

Name: Lucas Jovanovich | en0c-026
Email: bitup.games@gmail.com

<!-- CONTACT -->
## Contact

en0c-026 - [Twitter](https://twitter.com/ben_ya_1) - bitup.games@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
