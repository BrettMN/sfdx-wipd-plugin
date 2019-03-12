# sfdx-waw-plugins [![Build Status](https://travis-ci.org/wadewegner/sfdx-waw-plugin.svg?branch=master)](https://travis-ci.org/wadewegner/sfdx-waw-plugin)

A plugin for the Salesforce CLI built by Wade Wegner and containing a lot of helpful commands.

## Setup

### Install from source

1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:brettmn/sfdx-wipd-plugin.git`

3. Install npm modules: `npm install`

4. Link the plugin: `sfdx plugins:link .`

### Install as plugin

1. Install plugin: `sfdx plugins:install sfdx-wipd-plugin`

## Get Changesets 

Simple example: `sfdx wipd:changeset:list -u <username>`

> sometimes I get an error about missing a visualforce context to workaround that I use the `sfdx force:org:open -u <username>` command to open the org then it seems to work for a bit more 