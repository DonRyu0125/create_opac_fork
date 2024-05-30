# Event Calendar function (version 1.0) 2024-05-30

## Introduction

This is the Event Calendar for showing events and make the user register the events

## Feature

* ✅Dynamic view (Monthly, Weekly)
* ✅Event filtering (By location)
* ✅RSVP Events
* ✅Email confirmation
* ✅Email cancellation

## Component List

1.can't register exact date
2.user should confirm the event
  -two register at the same time, first confirm user first register
  use could complain if they don't know they have to confirm

  -User forgot to confirm, they try to register exact that date => no

3.no branch address at the library location database => private property

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


