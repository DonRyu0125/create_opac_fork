# Event Calendar function (version 1.0) 2024-05-30

## Introduction

This is the Event Calendar for showing events and make the user register the events

## Feature

* ✅Dynamic view (Monthly, Weekly)
* ✅Event filtering (By location)
* ✅RSVP Events
* ✅Email confirmation
* ✅Email cancellation
* ✅RSVP history log

## RSVP process

* ✅ Non user received unique unit number called ID
* ✅ User can't register exact date of event  ex) Chinese cooking class start 9:00 AM 21st May. User can't register the event at 21st May

-To Register: non login user
 Do register => get confirmation email  => go to 
 confirm landing page => click confirm => store record and log data => 
 registration is done

 -To Cancel: non login user
 After confirm user, get the registration confirm email => go to cancel landing page =>click cancel => delete the record and adding cancel log data => user get cancel confirm email


## Component List

```
── event-calendar                         
  ├── EventCalendar               JSON files that store the pages data
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


