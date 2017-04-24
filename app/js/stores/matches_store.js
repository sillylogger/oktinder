
export class MatchesStore {

  static sorted(data) {
    return data.filter((m) => {
      return m.person !== undefined;
    }).sort((a, b) => {
      return (new Date(b.last_activity_date)) - (new Date(a.last_activity_date));
      // return (new Date(b.person.birth_date)) - (new Date(a.person.birth_date));
    });
  }

}

