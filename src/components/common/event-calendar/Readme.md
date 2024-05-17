# Event Calendar function (version 1.0)

## Introduction

This is the Event Calendar for showing events and make the user register the events

## Feature

* ✅Dynamic view (Monthly, Weekly)
* ✅Event filtering (By location)
* ✅RSVP Events
* ✅Email confirmation

## Component List

```
── event-calendar                         
  ├── constants               JSON files that store the pages data
  ├── hooks                   Custom hooks
  ├── lib                     External libraries, helper functions, etc.
  ├── providers               Providers for any React.Context
  ├── router                  Routes handler for the project
  ├── schema                  Generated JSON schema from /constants folder
  ├── store                   State management library store
  ├── styles                  Styling
  ├── themes                  Custom theme
  └── tools                   Code generation tools
```

## Components Structure

Every building block components for the UI will be put inside the `components/` folder. As you
continue to add more components to the OPAC, keep in mind each of the sub folders serve a different
purpose. Please refer to this diagram below while deciding where your React component lives.

<span style="height:200px">![Components Decision](./images/folder-decision.png)</span>

Another way to decide where to put your React component should be is by asking these following
questions

* Are you building a page ? => `/page-template`
* Will I need to reuse this components on different pages with different data ? => `/layout` or
`/common`
    * Does this component take any data from the `constants` folder
        * Yes: `/layout`
        * No: `/common`
* Otherwise, `/ui` is for headless UI component, consider this if your component checks out the
following:
    * Minimum styling and easy to customize
    * Have no dependencies on any other components (if it does, it can only import from some from
    `/ui` itself and only the neccessary ones)

## Setup the backend

### IIS

### MWI

## Routing

