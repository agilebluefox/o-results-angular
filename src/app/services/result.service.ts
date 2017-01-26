// Import the angular modules
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

// Import the non-Angular modules
import { Observable } from 'rxjs/Rx';

// Import the models
import { Entry } from '../models/entry.model';

/**
 * The Result Service handles the API calls to the results collection
 */
@Injectable()
export class ResultService {

  // Store the results for the event in an array of result objects
  public results: Entry[];

  // The url for the results api endpoints
  private resultsUrl = 'http://localhost:3000/results';

  // Setup http headers to send and receive JSON data
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Inject the dependencies required for the class
  constructor(private http: Http) { }

  // Get all of the results stored for the current event selected by the user
  getResultsForCurrentEvent(eventId: string): void {
    this.http.get(`this.resultsUrl/${eventId}`)
      .map((res: Response) => {
        // the response object is an array of the results stored for the event
        this.results = res.json().data;
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  // Add a new result to the database
  addResultToCurrentEvent(entry: Entry) {
    const body = JSON.stringify(entry);
    this.http.post(this.resultsUrl, body, { headers: this.headers })
    .map((res: Response) => {
        return res.json().data;
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

}
