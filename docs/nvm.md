# Node version manager

Use [NVM](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows)
to have multiple Node.JS versions on your machine.

## Why to use that?

For example, [Strapi](https://strapi.io/) CMS requires you to install LTS version
of NodeJS, but your project may be running on latest version.

The next section describes how to install NVM for Windows.

## Install NVM for Windows

Check [this section](https://github.com/coreybutler/nvm-windows#installation--upgrades)
in NVM for Windows repository. Delete existing `NodeJS` folders under `Program Files` and `npm` folder in `%APPDATA%` so there are no conflicts.

Install [latest version](https://github.com/coreybutler/nvm/releases) of NVM for Windows.

After install, run `cmd.exe` with Administrator privileges.

Run the next command to install latest NodeJS:

```bat
nvm install latest
```

Also, install LTS version:

```bat
nvm install lts
```

Use lts version with (for the moment of this docs written):

```bat
nvm use 18.15.0
```

Close `cmd.exe` and open it without Administrator privileges.

Check NodeJS version with:

```bat
node -v
```

> **Warning**
> All global NPM packages you install on one NodeJS version
> you should reinstall on another, as mentioned [here](https://github.com/coreybutler/nvm-windows#reinstall-any-global-utilities)

[Next section (Strapi CMS) →](./strapi.md)
