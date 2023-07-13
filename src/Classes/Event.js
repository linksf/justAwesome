export default class Event {
    constructor(id, title, description, startTime, endTime, location, attendees, games) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startTime = new Date(startTime);
        this.time = time;
        this.location = location;
        this.attendees = attendees;
        this.games = games;
    }
    
}