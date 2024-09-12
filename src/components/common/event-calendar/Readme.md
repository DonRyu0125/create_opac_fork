# Event Calendar function (version 1.0) 2024-05-30

## Introduction

Event Calendar for showing events and make the user register the events

\*This is separate component from main OPAC, this component share webuser mwi profile but it has own
website profile ...

## MINISIS STRUCTURE

#Report needs

-   MONTHLY_CALENDAR_NEW.REPORT : For calendar
-   LIBRARY_LOCATION_NEW.REPORT: For library info and location

#Database needs

-   M2L_TAG : MAIN EVENT DB
-   LIBRARY_LOCATION : LIBRARY INFO
-   TAG_RSVP_PATRON_LOG : For RSVP LOG

#Virtual Directory needs

-  CALENDAR: C:\INETPUB\create_opac\src\components\common\event-calendar\


## Installation

1.MWI SETTING
-   WEB_CALENDAR site profile - webuser - M2L_TAG (Main), TAG_RSVP_PATRON_LOG_SYN (Log)
-   WEB_LIBRARY_LOC site profile - webuser - LIBRARY_LOCATION



## Feature

-   ✅Dynamic view (Monthly, Weekly)
-   ✅Event filtering (By location)
-   ✅RSVP Events
-   ✅Email confirmation
-   ✅Email cancellation
-   ✅RSVP history log
-   ✅Waitlist --- On progress

## RSVP process scenario

-   ✅ Non user received unique unit number called ID
-   ✅ User can't register exact date of event 
    ex) Chinese cooking class start 9:00 AM 21st May. User can't register the event at 21st May
-   ✅ Confirm landing page has expiration time (default 24 hrs)

-To Register: Non login user Do register => get confirmation email => go to confirm landing page => click confirm => store record and log data => registration is done


-To Cancel: Non login user After confirm user, get the registration confirm email => go to cancel
landing page =>click cancel => delete the record and adding cancel log data => user get cancel
confirm email

## React Component Structure

```
── src > constants > en,fr
  ├── home.json, library.json, museum.json, archives.json 
── Event-calendar
  ├── Constants                               Variables: SMA fields etc...
  ├── EC-Util                                 Util func only for calendar
  ├── Spinner                                 Loading view spinner
  ├── Service                                 AJAX Calls
  ├── EventCalendar                           Root
      ├── EventCalendarFilter                 location filtering
      └── EventCalendarEventList              Month View or Week View
          ├── EventSumButton                  Month:event summary modal
              └── EventRSVPForm
          ├── EventButton                     Month and Week:event common 
              └── EventRSVPForm
          └── EventAllButton                  REMOVED
              └── EventRSVPForm
  ├── RSVPCancelConfirmTmp.txt                Email tmp for cancellation confirm(3)
  ├── RSVPRegConfirmTmp.txt                   Email tmp for Registration confirm(2)
  └── RSVPVerificationConfirmTmp.txt          Email tmp for email verification(1)

── Page
    └── RSVP
        ├──Cancellation.tsx                   Component for cancellation landing
        └──Confirmation.tsx                   Component for confirmation landing

── rsvp_cancel.html                           Html page for cancellation landing page
── rsvp_confirm.html                          Html page for confirmation landing

──store
    └──index.ts                               Adding global state calendarEvents,calendarWeekType,calendarCurrDate

──router
    └──index.ts                               Adding route for rsvp_cancel,rsvp_confirm
```


