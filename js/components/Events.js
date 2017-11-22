import { h, Component } from 'preact'

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form id="evogame-controls">
        <label htmlFor="evogame-event">Event</label>
        <select id="evogame-event">
          <option value="sahara">Sahara</option>
        </select>
        <label htmlFor="evogame-event-time">last for</label>
        <input id="evogame-event-time" type="number" min="1" value="1" />
        <label htmlFor="evogame-event-time">days</label>
        <input type="submit" value="Send Event" />
      </form>
    );
  }
}

export default Events;
