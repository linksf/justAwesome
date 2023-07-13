/*

***Firestore document structure***

*users* 

email: {
    email: string,  
    uuid: string,  
    games: [string],  
    events: [reference],  
    friends: [reference],  
    profile: {  
        name: string,  
        location: string,  
        bio: string,  
        image: string  
        }
    }

*games* 

id: {
        name: string,  
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

*events* 

id: { 
        name: string, 
        id: string,
        description: string, 
        image: string, 
        startTime: string, 
        endTime: string,
        date: string,
        dateObject: {
            year: string,
            month: string,
            day: string,
            date: string,
        } 
        street: string, 
        city: string, 
        state: string, 
        zip: string, 
        attendees: [ 
            {
                person: reference, 
                status: string 
            } 
        ] 
        games: [ 
            { 
                name: string, 
                description: string, 
                minPlayers: number, 
                maxPlayers: number, 
                minPlayTime: number, 
                maxPlayTime: number, 
                minAge: number, 
                owner: reference,
                <startTime: date>,
                <players: [reference]>,
                <votes: number>,
            } 
        ], 
        host: reference, 
        options: { 
            allowGameScheduling: boolean, 
            allowGameSignups: boolean, 
            allowGameVoting: boolean, 
            isPublic: boolean,
            isRSVPRequired: boolean, 
            isRSVPLimited: boolean,
            allowGuestInvites: boolean,
            RSVPMax: number,
        }
    }

***Workflows***

1. User signs up
   a. User enters email and password
   b. [check if email is already in use]
        i. [if email is already in use redirect to sign in]
   c. [check if password is valid]
   d. [create user in firebase authentication]
   e. [create user in Firestore]
   f. [redirect to edit profile page]
        i. user adds bio information
        ii. user adds profile picture
        iii. user adds location
   g. [update user in Firestore]
   h. [redirect to home page]

2. User signs in
   a. User enters email and password
   b. [login user in firebase authentication]
   c. [get user from Firestore, assign to context state]
   d. [redirect to home page]

3. User signs out
   a. [sign out user from firebase authentication]
   b. [redirect to sign in page]

4. User creates event
   a. User enters event name, date, description, start time, end time, location, and options
   b. [add current user to attendees with status: "host"]
   c. [create event in Firestore]
   d. [add event to current user's events with status: "host"]
   e. [redirect to event page]

5. User invites friend to event
   a. User enters friend's email
   b. [check if friend's email is in database]
   i. [if friend's email is not in database, ask user to send invite link]
   c. [add friend to attendees with status: "invited"]
   d. [add event to friend's events with status: "invited"]
   e. [update event in Firestore]
   f. [update friend in Firestore]

6. User accepts event invite
   a. User clicks on invite link
   b. [check if friend's email is in database]
   i. [if friend's email is not in database, redirect to sign up page - include event invite]
   c. [check if user is signed in]
   i. [if user is not signed in, redirect to sign in page - include event invite]
   d. [add user to attendees with status: "attending"]
   e. [add event to user's events with status: "attending"]
   f. [update event in Firestore]
   g. [update user in Firestore]

7. User adds game to profile
   a. User enters game name
   b. [check if game is in database]
        i. [if game is not in database, search for game in API]     
            1. user selects game from search results 
            2. [add game to database]
   c. [add game to user's games]
   d. [update user in Firestore]

8. User adds game to event
    a. User clicks on "add game" button on event page
    b. [get user's games from Firestore]
    c. [generate popup with list of user's games]
    d. User selects game from list
    e. [add game to event's games]
    f. [check if event's options allow game scheduling]
        i. If yes, user selects start time
    g. [check if event's options allow game voting]
        i. If yes, user can check "allow voting" checkbox
    h. [check if event's options allow game RSVP]
        i. If yes, user can check "allow RSVP" checkbox
        ii. If yes, user enters max number of players
    i. [set status for game to one of the following: 
        "available", 
        "scheduled", 
        "RSVPOpen", 
        "RSVPFull", 
        "votable"]
    j. [update event in Firestore]

***Contexts***

    *Firebase*

        globals: auth, db, storage, userAuth, currentUser
        
        functions:

            auth:
                signUp,
                signIn,
                signOut,
                resetPassword,
                updateEmail,
                updatePassword,
                validatePassword,
                validateEmail,

            firestore:

                users:
                    createUser,
                    getUser,
                    deleteCurrentUser,
                    updateUserEventStatus,
                    addGameToCurrentUser,
                    removeGameFromCurrentUser,
                    updateCurrentUserProfile,

                events:
                    createEvent,
                    getEvent,
                    updateEvent,
                    deleteEvent,
                    addGameToEvent,
                    removeGameFromEvent,
                    addAttendeeToEvent,
                    removeAttendeeFromEvent,
                    addVoteToGame,
                    removeVoteFromGame,
                    addCurrentPlayrtToGameRSVP,
                    removeCurrentPlayerFromGameRSVP,
                    scheduleGame,
                    unscheduleGame,
                    getGameRSVP,
                    getGameVotes,
                    getRSVPSpotsRemaining,

                games:
                    createGame,
                    getGame,
                    updateGame,
                    deleteGame,
                    retrieveGameFromAPI,

    
   

   


***Pages***

    *Sign Up / Sign In*

    *Home*
        State: 

        Components:

            EventCard
            GameCard

    *Events*
        State:

        Components:
            CreateEventForm
            Calendar
                EventCard


    *Event*
        params: eventId
        
        useEffect: check to ensure user is allowed to view event. redirect to home if not.

    *Profile*

    *Edit Profile*

    *Games*
        State:

    *Game*



***Components***

    *EventCard*
        props: event: object

    *GameCard*
        props: game: object

    *CreateEventForm*
        props: none

    *Calendar*
        props: none

    *GameSearch*
        props: none

    *GameSearchResult*
        props: [results: object]

    *GameSearchResultItem*
        props: [result: object]

    *Nav*
        props: none
        sections:
            Logo: svg
                to: <Home/>
            Events: <p>
                to: <Events/>
            Games: <p>
                to: <Games/>
            Profile: icon
                to: <Profile/>

    *Modal*
        props: {title: string, children: object, onClose: function}

    *Toast*
        props: {message: string, type: string, onClose: function}

***Hooks***

***Utilities***
        colors: object
        fonts: object
        breakpoints: object
        mediaQueries: object
        mixins: object
        transitions: object
        shadows: object
        zIndices: object
        utils: object
     
***Constants***

***Contexts***

***Elements***

        Card: div
        Button: button
        Form: form
            Input: input
            Label: label
            Select: select
            Textarea: textarea 
        Text: p
        Heading: h1
        Link: a
        Image: img
        Icon: Fontawesome
        
        

***APIs***

***Libraries***

***Styles***

***Tests***

***Other***

*/