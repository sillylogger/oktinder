
export class MatchesStore {

  static byPingTime(data) {
    return data.filter(function(m) {
      return m.person !== undefined;
    }).sort(function(a, b) {
      return (new Date(b.person.ping_time)) - (new Date(a.person.ping_time));
    });
  }

}

