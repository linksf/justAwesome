# Outline

## Firestorm document structure

### Users

{

- email: string,  
   uuid: string,  
   games: [string],  
   events: [reference],  
   friends: [reference],  
   profile:
  - {  
     name: string,  
     location: string,  
     bio: string,  
     image: string  
    }

}

### Games

{

- name: string,  
  id: string,  
  description: string,  
  image: string,  
  minPlayers: number,  
  maxPlayers: number,  
  minPlayTime: number,  
  maxPlayTime: number,  
  minAge: number,  
  categories: [string],  
  mechanics: [string],  
  expansions: [reference],

}

`events: { name: string, description: string, image: string, startTime: date, endTime: date, location: string, attendees: [ { person: reference, status: string } ] }`

`games: [ { name: string, description: string, minPlayers: number, maxPlayers: number, minPlayTime: number, maxPlayTime: number, minAge: number, owner: reference } ], host: reference, options: { allowGameScheduling: boolean, allowGameVoting: boolean, allowGameVoting: boolean, isPublic: boolean, isRSVPRequired: boolean, isRSVPLimited: boolean, RSVPMax: number, }`

Workflows:

1. User signs up
   a. User enters email and password
   b. [check if email is already in use]
   i. if email is already in use redirect to sign in
   c. [check if password is valid]
   d. [create user in firebase authentication]
   e. [create user in Firestorm]
   f. [redirect to edit profile page]
   i. user adds bio information
   ii. user adds profile picture
   iii. user adds location
   g. [update user in Firestorm]
   h. [redirect to home page]

2. User signs in
   a. User enters email and password
   b. [login user in firebase authentication]
   c. [get user from Firestorm]
   d. [redirect to home page]

3. User signs out
   a. [sign out user from firebase authentication]
   b. [redirect to sign in page]

4. User creates event
   a. User enters event name, date, description, start time, end time, location, and options
   b. [add current user to attendees with status: "host"]
   c. [create event in Firestorm]
   d. [redirect to event page]

5. User invites friend to event
   a. User enters friend's email
   b. [check if friend's email is in database]
   i. [if friend's email is not in database, ask user to send invite link]
   c. [add friend to attendees with status: "invited"]
   d. [add event to friend's events with status: "invited"]
   e. [update event in Firestorm]
   f. [update friend in Firestorm]

6. User accepts event invite
   a. User clicks on invite link
   b. [check if friend's email is in database]
   i. [if friend's email is not in database, redirect to sign up page - include event invite]
   c. [check if user is signed in]
   i. [if user is not signed in, redirect to sign in page - include event invite]
   d. [add user to attendees with status: "attending"]
   e. [add event to user's events with status: "attending"]
   f. [update event in Firestorm]
   g. [update user in Firestorm]

7. User adds game to profile
   a. User enters game name
   b. [check if game is in database]
   i. [if game is not in database, search for game in API] 1. user selects game from search results 2. [add game to database]
   c. [add game to user's games]
   d. [update user in Firestorm]
