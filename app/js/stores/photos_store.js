
export class PhotosStore {

  static withSuccess(data) {
    let unflattenedPhotos = data.filter(function(match) {
      return match.person !== undefined;
    }).map(function(match) {
      return match.person.photos;
    });

    let photosWithSuccess = [].concat.apply([], unflattenedPhotos).filter(function(photo) {
      return photo.successRate !== undefined;
    });

    let sortedPhotos = photosWithSuccess.sort(function(a,b) {
      return parseFloat(b.successRate) - parseFloat(a.successRate);
    });

    return sortedPhotos;
  }

}

